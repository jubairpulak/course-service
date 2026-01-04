"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DocumentItemDto = exports.ExperienceItemDto = exports.EducationItemDto = exports.AddressDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var AddressDto = /** @class */ (function () {
    function AddressDto() {
    }
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Dhaka' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], AddressDto.prototype, "division");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Gazipur' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], AddressDto.prototype, "district");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Sreepur' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], AddressDto.prototype, "upazila");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Union Name' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], AddressDto.prototype, "union");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Village / Area' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], AddressDto.prototype, "village");
    return AddressDto;
}());
exports.AddressDto = AddressDto;
var EducationItemDto = /** @class */ (function () {
    function EducationItemDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ example: 'SSC', description: 'SSC/HSC/Bachelor/Masters' }),
        class_validator_1.IsString()
    ], EducationItemDto.prototype, "level");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Science' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], EducationItemDto.prototype, "group");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'ABC School/College/University' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], EducationItemDto.prototype, "institute");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 2018 }),
        class_validator_1.IsOptional(),
        class_validator_1.IsInt(),
        class_validator_1.Min(1900)
    ], EducationItemDto.prototype, "passingYear");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: '4.75' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], EducationItemDto.prototype, "result");
    return EducationItemDto;
}());
exports.EducationItemDto = EducationItemDto;
var ExperienceItemDto = /** @class */ (function () {
    function ExperienceItemDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ example: 'Electrician' }),
        class_validator_1.IsString()
    ], ExperienceItemDto.prototype, "jobTitle");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'ABC Company' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], ExperienceItemDto.prototype, "company");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 3 }),
        class_validator_1.IsOptional(),
        class_validator_1.IsInt(),
        class_validator_1.Min(0)
    ], ExperienceItemDto.prototype, "totalYears");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Work details...' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], ExperienceItemDto.prototype, "description");
    return ExperienceItemDto;
}());
exports.ExperienceItemDto = ExperienceItemDto;
var DocumentItemDto = /** @class */ (function () {
    function DocumentItemDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ example: 'NID' }),
        class_validator_1.IsString()
    ], DocumentItemDto.prototype, "type");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'nid-front.jpg' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], DocumentItemDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty({ example: 'https://cdn.example.com/docs/nid-front.jpg' }),
        class_validator_1.IsUrl()
    ], DocumentItemDto.prototype, "url");
    return DocumentItemDto;
}());
exports.DocumentItemDto = DocumentItemDto;
