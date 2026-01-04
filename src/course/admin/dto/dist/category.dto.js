"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateCategoryDto = exports.CreateCategoryDto = void 0;
// src/course/admin/dto/category.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var CreateCategoryDto = /** @class */ (function () {
    function CreateCategoryDto() {
        this.sortOrder = 0;
        this.isActive = true;
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], CreateCategoryDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], CreateCategoryDto.prototype, "slug");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt(),
        class_validator_1.Min(0)
    ], CreateCategoryDto.prototype, "sortOrder");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], CreateCategoryDto.prototype, "isActive");
    return CreateCategoryDto;
}());
exports.CreateCategoryDto = CreateCategoryDto;
var UpdateCategoryDto = /** @class */ (function () {
    function UpdateCategoryDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateCategoryDto.prototype, "name");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateCategoryDto.prototype, "slug");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt(),
        class_validator_1.Min(0)
    ], UpdateCategoryDto.prototype, "sortOrder");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], UpdateCategoryDto.prototype, "isActive");
    return UpdateCategoryDto;
}());
exports.UpdateCategoryDto = UpdateCategoryDto;
