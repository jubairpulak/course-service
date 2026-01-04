"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RequestContextMiddleware = void 0;
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var request_context_1 = require("./request-context");
var RequestContextMiddleware = /** @class */ (function () {
    function RequestContextMiddleware() {
    }
    RequestContextMiddleware.prototype.use = function (req, res, next) {
        var requestId = req.headers['x-request-id'] ||
            req.headers['x-correlation-id'] ||
            crypto_1.randomUUID();
        res.setHeader('x-request-id', requestId);
        request_context_1.RequestContextStore.run({
            requestId: requestId,
            ip: req.ip,
            method: req.method,
            path: req.originalUrl
        }, next);
    };
    RequestContextMiddleware = __decorate([
        common_1.Injectable()
    ], RequestContextMiddleware);
    return RequestContextMiddleware;
}());
exports.RequestContextMiddleware = RequestContextMiddleware;
