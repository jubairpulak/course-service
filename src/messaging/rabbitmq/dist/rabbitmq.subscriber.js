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
exports.RabbitSubscriber = void 0;
var common_1 = require("@nestjs/common");
var amqplib = require("amqplib");
var RabbitSubscriber = /** @class */ (function () {
    function RabbitSubscriber(cfg, employeesService) {
        this.cfg = cfg;
        this.employeesService = employeesService;
        this.logger = new common_1.Logger(RabbitSubscriber_1.name);
    }
    RabbitSubscriber_1 = RabbitSubscriber;
    RabbitSubscriber.prototype.onModuleInit = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var routingKeys, _e, _f, prefetch, _i, routingKeys_1, rk;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        // ✅ read config once
                        this.url = (_a = this.cfg.get('RABBITMQ_URL')) !== null && _a !== void 0 ? _a : '';
                        this.exchange = (_b = this.cfg.get('RABBITMQ_EXCHANGE')) !== null && _b !== void 0 ? _b : '';
                        this.queueName = (_c = this.cfg.get('RABBITMQ_QUEUE')) !== null && _c !== void 0 ? _c : 'employee-service.events';
                        this.logger.log("Connecting RMQ url=\"" + this.url + "\"");
                        this.logger.log("Subscribed \u2705 queue=\"" + this.queueName + "\" exchange=\"" + this.exchange + "\"...");
                        routingKeys = ['user.created'];
                        if (!this.url)
                            throw new Error('RABBITMQ_URL is missing');
                        if (!this.exchange)
                            throw new Error('RABBITMQ_EXCHANGE is missing');
                        this.logger.log("Connecting RMQ url=\"" + this.url + "\"");
                        _e = this;
                        return [4 /*yield*/, amqplib.connect(this.url)];
                    case 1:
                        _e.conn = _g.sent();
                        this.conn.on('error', function (err) { return _this.logger.error("RMQ connection error: " + err.message); });
                        this.conn.on('close', function () { return _this.logger.warn('RMQ connection closed'); });
                        _f = this;
                        return [4 /*yield*/, this.conn.createChannel()];
                    case 2:
                        _f.ch = _g.sent();
                        this.ch.on('error', function (err) { return _this.logger.error("RMQ channel error: " + err.message); });
                        this.ch.on('close', function () { return _this.logger.warn('RMQ channel closed'); });
                        prefetch = Number((_d = this.cfg.get('RABBITMQ_PREFETCH')) !== null && _d !== void 0 ? _d : '20');
                        return [4 /*yield*/, this.ch.prefetch(prefetch)];
                    case 3:
                        _g.sent();
                        // ✅ ensure exchange exists (must match auth publisher exchange name)
                        return [4 /*yield*/, this.ch.assertExchange(this.exchange, 'topic', { durable: true })];
                    case 4:
                        // ✅ ensure exchange exists (must match auth publisher exchange name)
                        _g.sent();
                        // ✅ ensure queue exists
                        return [4 /*yield*/, this.ch.assertQueue(this.queueName, { durable: true })];
                    case 5:
                        // ✅ ensure queue exists
                        _g.sent();
                        _i = 0, routingKeys_1 = routingKeys;
                        _g.label = 6;
                    case 6:
                        if (!(_i < routingKeys_1.length)) return [3 /*break*/, 9];
                        rk = routingKeys_1[_i];
                        return [4 /*yield*/, this.ch.bindQueue(this.queueName, this.exchange, rk)];
                    case 7:
                        _g.sent();
                        this.logger.log("Bound queue=\"" + this.queueName + "\" ex=\"" + this.exchange + "\" rk=\"" + rk + "\" \u2705");
                        _g.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9: 
                    // ✅ start consuming
                    return [4 /*yield*/, this.ch.consume(this.queueName, function (msg) { return _this.onMessage(msg); }, { noAck: false })];
                    case 10:
                        // ✅ start consuming
                        _g.sent();
                        this.logger.log("Subscribed \u2705 queue=\"" + this.queueName + "\" exchange=\"" + this.exchange + "\" prefetch=" + prefetch + ". Waiting for messages...");
                        return [2 /*return*/];
                }
            });
        });
    };
    RabbitSubscriber.prototype.onMessage = function (msg) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var rawText, raw, data, e_1, message, permanent;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!msg || !this.ch)
                            return [2 /*return*/];
                        rawText = msg.content.toString('utf-8');
                        this.logger.log("\u2705 Message received rk=\"" + msg.fields.routingKey + "\" content=" + rawText);
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        raw = JSON.parse(rawText);
                        data = (_a = raw === null || raw === void 0 ? void 0 : raw.data) !== null && _a !== void 0 ? _a : raw;
                        if (!(data === null || data === void 0 ? void 0 : data.userId) || !(data === null || data === void 0 ? void 0 : data.email)) {
                            this.logger.warn("Invalid payload. drop. content=" + rawText);
                            this.ch.nack(msg, false, false);
                            return [2 /*return*/];
                        }
                        // ✅ create employee (event-driven)
                        return [4 /*yield*/, this.employeesService.create({
                                authUserId: data.userId,
                                email: data.email,
                                phone: (_b = data.phone) !== null && _b !== void 0 ? _b : null,
                                fullName: (_c = data.fullName) !== null && _c !== void 0 ? _c : data.email
                            })];
                    case 2:
                        // ✅ create employee (event-driven)
                        _f.sent();
                        this.ch.ack(msg);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _f.sent();
                        message = (_e = (_d = e_1) === null || _d === void 0 ? void 0 : _d.message) !== null && _e !== void 0 ? _e : 'unknown error';
                        this.logger.error("\u274C Processing failed: " + message + " content=" + rawText);
                        permanent = message.includes('Unique constraint') ||
                            message.includes('already exists') ||
                            message.includes('Invalid') ||
                            message.includes('missing');
                        this.ch.nack(msg, false, !permanent);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RabbitSubscriber.prototype.onModuleDestroy = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, ((_a = this.ch) === null || _a === void 0 ? void 0 : _a.close()["catch"](function () { return undefined; }))];
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
    var RabbitSubscriber_1;
    RabbitSubscriber = RabbitSubscriber_1 = __decorate([
        common_1.Injectable()
    ], RabbitSubscriber);
    return RabbitSubscriber;
}());
exports.RabbitSubscriber = RabbitSubscriber;
