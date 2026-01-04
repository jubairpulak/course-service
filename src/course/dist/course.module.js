"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CourseModule = void 0;
// src/course/course.module.ts
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var jwt_strategy_1 = require("../auth/jwt.strategy");
var course_service_1 = require("./course.service");
var access_service_1 = require("./access.service");
var public_controller_1 = require("./public/public.controller");
var me_controller_1 = require("./me/me.controller");
var admin_controller_1 = require("./admin/admin.controller");
var core_1 = require("@nestjs/core");
var roles_guard_1 = require("../common/auth/roles.guard");
var CourseModule = /** @class */ (function () {
    function CourseModule() {
    }
    CourseModule = __decorate([
        common_1.Module({
            imports: [passport_1.PassportModule],
            controllers: [public_controller_1.PublicController, me_controller_1.MeController, admin_controller_1.AdminController],
            providers: [
                jwt_strategy_1.JwtStrategy,
                course_service_1.CourseService,
                access_service_1.AccessService,
                { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
            ]
        })
    ], CourseModule);
    return CourseModule;
}());
exports.CourseModule = CourseModule;
