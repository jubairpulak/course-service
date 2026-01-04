"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RequestIdMiddleware = void 0;
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var RequestIdMiddleware = /** @class */ (function () {
    function RequestIdMiddleware() {
    }
    RequestIdMiddleware.prototype.use = function (req, res, next) {
        var requestId = req.headers['x-request-id'] ||
            crypto_1.randomUUID();
        req.headers['x-request-id'] = requestId;
        res.setHeader('x-request-id', requestId);
        next();
    };
    RequestIdMiddleware = __decorate([
        common_1.Injectable()
    ], RequestIdMiddleware);
    return RequestIdMiddleware;
}());
exports.RequestIdMiddleware = RequestIdMiddleware;
