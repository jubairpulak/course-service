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
exports.HttpLoggingInterceptor = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
var HttpLoggingInterceptor = /** @class */ (function () {
    function HttpLoggingInterceptor(logger) {
        this.logger = logger;
    }
    HttpLoggingInterceptor.prototype.intercept = function (context, next) {
        var _this = this;
        var ctx = context.switchToHttp();
        var req = ctx.getRequest();
        var res = ctx.getResponse();
        var start = Date.now();
        var requestId = req.headers['x-request-id'];
        var safeBody = this.sanitize(req.body);
        this.logger.log({
            msg: 'http_request',
            requestId: requestId,
            method: req.method,
            path: req.originalUrl,
            ip: req.ip,
            body: safeBody
        });
        return next.handle().pipe(operators_1.tap(function (responseBody) {
            _this.logger.log({
                msg: 'http_response',
                requestId: requestId,
                method: req.method,
                path: req.originalUrl,
                statusCode: res.statusCode,
                durationMs: Date.now() - start
            });
        }), operators_1.catchError(function (err) {
            _this.logger.error({
                msg: 'http_error',
                requestId: requestId,
                method: req.method,
                path: req.originalUrl,
                statusCode: (err === null || err === void 0 ? void 0 : err.status) || 500,
                durationMs: Date.now() - start,
                error: err === null || err === void 0 ? void 0 : err.message
            });
            throw err;
        }));
    };
    HttpLoggingInterceptor.prototype.sanitize = function (body) {
        if (!body)
            return undefined;
        var clone = __assign({}, body);
        if ('password' in clone)
            clone.password = '***';
        if ('refreshToken' in clone)
            clone.refreshToken = '***';
        return clone;
    };
    HttpLoggingInterceptor = __decorate([
        common_1.Injectable()
    ], HttpLoggingInterceptor);
    return HttpLoggingInterceptor;
}());
exports.HttpLoggingInterceptor = HttpLoggingInterceptor;
