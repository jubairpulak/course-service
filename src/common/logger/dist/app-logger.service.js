"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppLogger = void 0;
// src/common/logger/app-logger.service.ts
var common_1 = require("@nestjs/common");
var request_context_1 = require("./request-context");
var AppLogger = /** @class */ (function () {
    function AppLogger() {
        // PROD default: log,warn,error
        // DEV default: log,warn,error,debug,verbose
        this.enabledLevels = new Set((process.env.LOG_LEVELS
            ? process.env.LOG_LEVELS.split(',').map(function (x) { return x.trim(); })
            : process.env.NODE_ENV === 'production'
                ? ['log', 'warn', 'error']
                : ['log', 'warn', 'error', 'debug', 'verbose']));
    }
    AppLogger.prototype.setContext = function (context) {
        this.context = context;
    };
    // --- Nest LoggerService compatibility (DO NOT pass object as 2nd arg here) ---
    AppLogger.prototype.log = function (message, context) {
        if (!this.enabledLevels.has('log'))
            return;
        this.write('INFO', message, context);
    };
    AppLogger.prototype.warn = function (message, context) {
        if (!this.enabledLevels.has('warn'))
            return;
        this.write('WARN', message, context);
    };
    AppLogger.prototype.error = function (message, trace, context) {
        if (!this.enabledLevels.has('error'))
            return;
        this.write('ERROR', this.attachTrace(message, trace), context);
    };
    AppLogger.prototype.debug = function (message, context) {
        if (!this.enabledLevels.has('debug'))
            return;
        this.write('DEBUG', message, context);
    };
    AppLogger.prototype.verbose = function (message, context) {
        if (!this.enabledLevels.has('verbose'))
            return;
        this.write('VERBOSE', message, context);
    };
    // --- Domain/Business structured logging (USE THESE in AuthService) ---
    AppLogger.prototype.info = function (event, meta) {
        if (meta === void 0) { meta = {}; }
        this.log(__assign({ event: event }, meta));
    };
    AppLogger.prototype.warnEvent = function (event, meta) {
        if (meta === void 0) { meta = {}; }
        this.warn(__assign({ event: event }, meta));
    };
    AppLogger.prototype.errorEvent = function (event, meta, trace) {
        if (meta === void 0) { meta = {}; }
        this.error(__assign({ event: event }, meta), trace);
    };
    AppLogger.prototype.debugEvent = function (event, meta) {
        if (meta === void 0) { meta = {}; }
        this.debug(__assign({ event: event }, meta));
    };
    // --- Internals ---
    AppLogger.prototype.write = function (level, message, context) {
        var base = this.baseFields(level, context);
        var payload = this.normalizeMessage(message);
        var out = __assign(__assign({}, base), payload);
        var line = this.safeJson(out);
        if (level === 'ERROR')
            console.error(line);
        else if (level === 'WARN')
            console.warn(line);
        else
            console.log(line);
    };
    AppLogger.prototype.baseFields = function (level, context) {
        var _a, _b;
        var req = request_context_1.RequestContextStore.get();
        return {
            level: level,
            timestamp: new Date().toISOString(),
            service: (_a = process.env.SERVICE_NAME) !== null && _a !== void 0 ? _a : 'employee-service',
            env: (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'development',
            context: context !== null && context !== void 0 ? context : this.context,
            requestId: req.requestId,
            traceId: req.traceId,
            userId: req.userId,
            method: req.method,
            path: req.path,
            ip: req.ip
        };
    };
    AppLogger.prototype.attachTrace = function (message, trace) {
        if (!trace)
            return message;
        if (typeof message === 'string')
            return { message: message, trace: trace };
        if (message && typeof message === 'object')
            return __assign(__assign({}, message), { trace: trace });
        return { message: message, trace: trace };
    };
    AppLogger.prototype.normalizeMessage = function (message) {
        // Error instance normalize
        if (message instanceof Error)
            return this.normalizeError(message);
        // string => { message }
        if (typeof message === 'string')
            return { message: message };
        // object/array => merge
        if (message && typeof message === 'object')
            return __assign({}, message);
        // primitive
        return { message: message };
    };
    AppLogger.prototype.normalizeError = function (err) {
        return {
            message: err.message,
            errorName: err.name,
            errorCode: err.code,
            status: err.status,
            meta: err.meta,
            stack: err.stack
        };
    };
    AppLogger.prototype.safeJson = function (obj) {
        var seen = new WeakSet();
        return JSON.stringify(obj, function (_k, v) {
            if (typeof v === 'bigint')
                return v.toString();
            if (v && typeof v === 'object') {
                if (seen.has(v))
                    return '[Circular]';
                seen.add(v);
            }
            return v;
        });
    };
    AppLogger = __decorate([
        common_1.Injectable()
    ], AppLogger);
    return AppLogger;
}());
exports.AppLogger = AppLogger;
