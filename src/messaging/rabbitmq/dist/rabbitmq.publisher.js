"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RabbitPublisher = void 0;
var common_1 = require("@nestjs/common");
var amqplib = require("amqplib");
function sleep(ms) {
    return new Promise(function (r) { return setTimeout(r, ms); });
}
var RabbitPublisher = /** @class */ (function () {
    //
    function RabbitPublisher(cfg) {
        this.cfg = cfg;
        this.logger = new common_1.Logger(RabbitPublisher_1.name);
        this.isReady = false;
        this.isClosing = false;
        this.url = this.cfg.getOrThrow('RABBITMQ_URL');
        this.exchange = this.cfg.getOrThrow('RABBITMQ_EXCHANGE');
    }
    RabbitPublisher_1 = RabbitPublisher;
    RabbitPublisher.prototype.onModuleInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connectWithRetry()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RabbitPublisher.prototype.connectWithRetry = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var maxRetries, baseDelayMs, attempt, _c, _d, e_1, msg, wait;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        maxRetries = Number((_a = process.env.RABBITMQ_CONNECT_RETRIES) !== null && _a !== void 0 ? _a : 30);
                        baseDelayMs = Number((_b = process.env.RABBITMQ_CONNECT_DELAY_MS) !== null && _b !== void 0 ? _b : 1000);
                        attempt = 1;
                        _e.label = 1;
                    case 1:
                        if (!(attempt <= maxRetries)) return [3 /*break*/, 9];
                        if (this.isClosing)
                            return [2 /*return*/];
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 6, , 8]);
                        this.logger.log("Connecting to RabbitMQ (attempt " + attempt + "/" + maxRetries + ")...");
                        _c = this;
                        return [4 /*yield*/, amqplib.connect(this.url)];
                    case 3:
                        _c.conn = _e.sent();
                        this.conn.on('close', function () {
                            _this.isReady = false;
                            if (!_this.isClosing)
                                _this.logger.warn('RabbitMQ connection closed');
                        });
                        this.conn.on('error', function (e) {
                            _this.isReady = false;
                            _this.logger.warn("RabbitMQ connection error: " + e.message);
                        });
                        _d = this;
                        return [4 /*yield*/, this.conn.createChannel()];
                    case 4:
                        _d.ch = _e.sent();
                        return [4 /*yield*/, this.ch.assertExchange(this.exchange, 'topic', { durable: true })];
                    case 5:
                        _e.sent();
                        this.isReady = true;
                        this.logger.log("RabbitMQ connected. exchange=\"" + this.exchange + "\"");
                        return [2 /*return*/];
                    case 6:
                        e_1 = _e.sent();
                        msg = e_1.message;
                        this.isReady = false;
                        this.logger.warn("RabbitMQ connect failed: " + msg);
                        wait = Math.min(baseDelayMs * attempt, 10000);
                        return [4 /*yield*/, sleep(wait)];
                    case 7:
                        _e.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        attempt++;
                        return [3 /*break*/, 1];
                    case 9:
                        // at this point: don’t crash app in dev; in prod you may want to crash
                        if (process.env.NODE_ENV === 'production') {
                            throw new Error('RabbitMQ not reachable after retries');
                        }
                        this.logger.error('RabbitMQ not reachable after retries (dev mode). Continuing without MQ.');
                        return [2 /*return*/];
                }
            });
        });
    };
    RabbitPublisher.prototype.publish = function (routingKey, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var body, ok;
            return __generator(this, function (_a) {
                if (!this.isReady || !this.ch) {
                    this.logger.warn("Publish skipped, RabbitMQ not ready rk=\"" + routingKey + "\"");
                    return [2 /*return*/];
                }
                body = Buffer.from(JSON.stringify(payload));
                ok = this.ch.publish(this.exchange, routingKey, body, {
                    persistent: true,
                    contentType: 'application/json'
                });
                if (!ok)
                    this.logger.warn("RabbitMQ backpressure rk=\"" + routingKey + "\"");
                return [2 /*return*/];
            });
        });
    };
    RabbitPublisher.prototype.onModuleDestroy = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.isClosing = true;
                        return [4 /*yield*/, ((_a = this.ch) === null || _a === void 0 ? void 0 : _a.close()["catch"](function () { return undefined; }))];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, ((_b = this.conn) === null || _b === void 0 ? void 0 : _b.close()["catch"](function () { return undefined; }))];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var RabbitPublisher_1;
    RabbitPublisher = RabbitPublisher_1 = __decorate([
        common_1.Injectable()
    ], RabbitPublisher);
    return RabbitPublisher;
}());
exports.RabbitPublisher = RabbitPublisher;
