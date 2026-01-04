"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RolesGuard = void 0;
// src/common/auth/roles.guard.ts
var common_1 = require("@nestjs/common");
var roles_decorator_1 = require("./roles.decorator");
var RolesGuard = /** @class */ (function () {
    function RolesGuard(reflector) {
        this.reflector = reflector;
    }
    RolesGuard.prototype.canActivate = function (ctx) {
        var _a, _b;
        var roles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            ctx.getHandler(),
            ctx.getClass(),
        ]);
        if (!roles || roles.length === 0)
            return true;
        var req = ctx.switchToHttp().getRequest();
        var userRoles = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.roles) !== null && _b !== void 0 ? _b : [];
        var ok = roles.some(function (r) { return userRoles.includes(r); });
        if (!ok)
            throw new common_1.ForbiddenException('Insufficient role');
        return true;
    };
    RolesGuard = __decorate([
        common_1.Injectable()
    ], RolesGuard);
    return RolesGuard;
}());
exports.RolesGuard = RolesGuard;
