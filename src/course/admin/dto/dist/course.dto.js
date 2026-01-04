"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SetAllowedUsersDto = exports.UpdateCourseDto = exports.CreateCourseDto = exports.CourseStatusDto = exports.CourseVisibilityDto = void 0;
// src/course/admin/dto/course.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var CourseVisibilityDto;
(function (CourseVisibilityDto) {
    CourseVisibilityDto["PUBLIC"] = "PUBLIC";
    CourseVisibilityDto["ORG_ONLY"] = "ORG_ONLY";
    CourseVisibilityDto["PRIVATE_USERS"] = "PRIVATE_USERS";
})(CourseVisibilityDto = exports.CourseVisibilityDto || (exports.CourseVisibilityDto = {}));
var CourseStatusDto;
(function (CourseStatusDto) {
    CourseStatusDto["DRAFT"] = "DRAFT";
    CourseStatusDto["PUBLISHED"] = "PUBLISHED";
    CourseStatusDto["ARCHIVED"] = "ARCHIVED";
})(CourseStatusDto = exports.CourseStatusDto || (exports.CourseStatusDto = {}));
var CreateCourseDto = /** @class */ (function () {
    function CreateCourseDto() {
        this.price = 0;
        this.visibility = CourseVisibilityDto.PUBLIC;
        this.status = CourseStatusDto.DRAFT;
        this.isFeatured = false;
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], CreateCourseDto.prototype, "uuid");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], CreateCourseDto.prototype, "title");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], CreateCourseDto.prototype, "slug");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateCourseDto.prototype, "shortDescription");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateCourseDto.prototype, "description");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateCourseDto.prototype, "language");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateCourseDto.prototype, "level");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateCourseDto.prototype, "thumbnailUrl");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateCourseDto.prototype, "bannerUrl");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0)
    ], CreateCourseDto.prototype, "price");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0)
    ], CreateCourseDto.prototype, "offerPrice");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt()
    ], CreateCourseDto.prototype, "categoryId");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt()
    ], CreateCourseDto.prototype, "subCategoryId");
    __decorate([
        swagger_1.ApiPropertyOptional({ "enum": CourseVisibilityDto }),
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(CourseVisibilityDto)
    ], CreateCourseDto.prototype, "visibility");
    __decorate([
        swagger_1.ApiPropertyOptional({ description: 'Required if ORG_ONLY' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateCourseDto.prototype, "organizationUuid");
    __decorate([
        swagger_1.ApiPropertyOptional({ "enum": CourseStatusDto }),
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(CourseStatusDto)
    ], CreateCourseDto.prototype, "status");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], CreateCourseDto.prototype, "isFeatured");
    return CreateCourseDto;
}());
exports.CreateCourseDto = CreateCourseDto;
var UpdateCourseDto = /** @class */ (function () {
    function UpdateCourseDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateCourseDto.prototype, "title");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateCourseDto.prototype, "slug");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateCourseDto.prototype, "shortDescription");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateCourseDto.prototype, "description");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateCourseDto.prototype, "language");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateCourseDto.prototype, "level");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateCourseDto.prototype, "thumbnailUrl");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateCourseDto.prototype, "bannerUrl");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0)
    ], UpdateCourseDto.prototype, "price");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0)
    ], UpdateCourseDto.prototype, "offerPrice");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt()
    ], UpdateCourseDto.prototype, "categoryId");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt()
    ], UpdateCourseDto.prototype, "subCategoryId");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(CourseVisibilityDto)
    ], UpdateCourseDto.prototype, "visibility");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateCourseDto.prototype, "organizationUuid");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(CourseStatusDto)
    ], UpdateCourseDto.prototype, "status");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], UpdateCourseDto.prototype, "isFeatured");
    return UpdateCourseDto;
}());
exports.UpdateCourseDto = UpdateCourseDto;
var SetAllowedUsersDto = /** @class */ (function () {
    function SetAllowedUsersDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ description: 'List of user UUIDs allowed for PRIVATE_USERS' }),
        class_validator_1.IsString()
    ], SetAllowedUsersDto.prototype, "userUuidsCsv");
    return SetAllowedUsersDto;
}());
exports.SetAllowedUsersDto = SetAllowedUsersDto;
