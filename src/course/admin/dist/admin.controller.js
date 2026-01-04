"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AdminController = void 0;
// src/course/admin/admin.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
var roles_decorator_1 = require("../../common/auth/roles.decorator");
var AdminController = /** @class */ (function () {
    function AdminController(courses) {
        this.courses = courses;
    }
    // Category CRUD
    AdminController.prototype.createCategory = function (dto) { return this.courses.createCategory(dto); };
    AdminController.prototype.listCategories = function () { return this.courses.listCategories(); };
    AdminController.prototype.updateCategory = function (id, dto) { return this.courses.updateCategory(Number(id), dto); };
    AdminController.prototype.deleteCategory = function (id) { return this.courses.deleteCategory(Number(id)); };
    // SubCategory CRUD
    AdminController.prototype.createSub = function (dto) { return this.courses.createSubCategory(dto); };
    AdminController.prototype.listSub = function () { return this.courses.listSubCategories(); };
    AdminController.prototype.updateSub = function (id, dto) { return this.courses.updateSubCategory(Number(id), dto); };
    AdminController.prototype.deleteSub = function (id) { return this.courses.deleteSubCategory(Number(id)); };
    // Course CRUD
    AdminController.prototype.createCourse = function (dto) { return this.courses.createCourse(dto); };
    AdminController.prototype.listCourses = function () { return this.courses.adminListCourses(); };
    AdminController.prototype.getCourse = function (id) { return this.courses.adminGetCourse(Number(id)); };
    AdminController.prototype.updateCourse = function (id, dto) { return this.courses.updateCourse(Number(id), dto); };
    AdminController.prototype.softDeleteCourse = function (id) { return this.courses.softDeleteCourse(Number(id)); };
    // Allowed users for PRIVATE_USERS
    AdminController.prototype.setAllowedUsers = function (id, dto) {
        return this.courses.setAllowedUsers(Number(id), dto.userUuidsCsv);
    };
    __decorate([
        common_1.Post('categories'),
        __param(0, common_1.Body())
    ], AdminController.prototype, "createCategory");
    __decorate([
        common_1.Get('categories')
    ], AdminController.prototype, "listCategories");
    __decorate([
        common_1.Patch('categories/:id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], AdminController.prototype, "updateCategory");
    __decorate([
        common_1.Delete('categories/:id'),
        __param(0, common_1.Param('id'))
    ], AdminController.prototype, "deleteCategory");
    __decorate([
        common_1.Post('subcategories'),
        __param(0, common_1.Body())
    ], AdminController.prototype, "createSub");
    __decorate([
        common_1.Get('subcategories')
    ], AdminController.prototype, "listSub");
    __decorate([
        common_1.Patch('subcategories/:id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], AdminController.prototype, "updateSub");
    __decorate([
        common_1.Delete('subcategories/:id'),
        __param(0, common_1.Param('id'))
    ], AdminController.prototype, "deleteSub");
    __decorate([
        common_1.Post('courses'),
        __param(0, common_1.Body())
    ], AdminController.prototype, "createCourse");
    __decorate([
        common_1.Get('courses')
    ], AdminController.prototype, "listCourses");
    __decorate([
        common_1.Get('courses/:id'),
        __param(0, common_1.Param('id'))
    ], AdminController.prototype, "getCourse");
    __decorate([
        common_1.Patch('courses/:id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], AdminController.prototype, "updateCourse");
    __decorate([
        common_1.Delete('courses/:id'),
        __param(0, common_1.Param('id'))
    ], AdminController.prototype, "softDeleteCourse");
    __decorate([
        common_1.Post('courses/:id/allowed-users'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], AdminController.prototype, "setAllowedUsers");
    AdminController = __decorate([
        swagger_1.ApiTags('Admin'),
        swagger_1.ApiBearerAuth('JWT-auth'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        roles_decorator_1.Roles('ADMIN') // change to your actual admin role string
        ,
        common_1.Controller('admin')
    ], AdminController);
    return AdminController;
}());
exports.AdminController = AdminController;
