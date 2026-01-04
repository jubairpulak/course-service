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
exports.PublicController = void 0;
// src/course/public/public.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var PublicController = /** @class */ (function () {
    function PublicController(courses) {
        this.courses = courses;
    }
    PublicController.prototype.list = function (q) {
        return this.courses.publicList(q);
    };
    PublicController.prototype.detail = function (slug) {
        return this.courses.publicDetailBySlug(slug);
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query())
    ], PublicController.prototype, "list");
    __decorate([
        common_1.Get(':slug'),
        __param(0, common_1.Param('slug'))
    ], PublicController.prototype, "detail");
    PublicController = __decorate([
        swagger_1.ApiTags('Public Courses'),
        common_1.Controller('public/courses')
    ], PublicController);
    return PublicController;
}());
exports.PublicController = PublicController;
