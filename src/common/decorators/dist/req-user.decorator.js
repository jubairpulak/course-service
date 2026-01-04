"use strict";
exports.__esModule = true;
exports.ReqUser = void 0;
// src/common/decorators/req-user.decorator.ts
var common_1 = require("@nestjs/common");
exports.ReqUser = common_1.createParamDecorator(function (_data, ctx) {
    var req = ctx.switchToHttp().getRequest();
    return req.user;
});
