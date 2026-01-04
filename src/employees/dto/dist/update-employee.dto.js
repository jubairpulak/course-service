"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateEmployeeDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var types_1 = require("./types");
var UpdateEmployeeDto = /** @class */ (function () {
    function UpdateEmployeeDto() {
    }
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Father Name' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateEmployeeDto.prototype, "fatherName");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Ripon Hossain' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(3)
    ], UpdateEmployeeDto.prototype, "fullName");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Mother Name' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateEmployeeDto.prototype, "motherName");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: '1997-05-01' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsDateString()
    ], UpdateEmployeeDto.prototype, "dateOfBirth");
    __decorate([
        swagger_1.ApiPropertyOptional({ "enum": ['MALE', 'FEMALE', 'OTHER'] }),
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(['MALE', 'FEMALE', 'OTHER'])
    ], UpdateEmployeeDto.prototype, "gender");
    __decorate([
        swagger_1.ApiPropertyOptional({ type: types_1.AddressDto }),
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return types_1.AddressDto; })
    ], UpdateEmployeeDto.prototype, "presentAddress");
    __decorate([
        swagger_1.ApiPropertyOptional({ type: types_1.AddressDto }),
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return types_1.AddressDto; })
    ], UpdateEmployeeDto.prototype, "permanentAddress");
    __decorate([
        swagger_1.ApiPropertyOptional({ type: [types_1.EducationItemDto] }),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray(),
        class_validator_1.ValidateNested({ each: true }),
        class_transformer_1.Type(function () { return types_1.EducationItemDto; })
    ], UpdateEmployeeDto.prototype, "education");
    __decorate([
        swagger_1.ApiPropertyOptional({ type: [types_1.ExperienceItemDto] }),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray(),
        class_validator_1.ValidateNested({ each: true }),
        class_transformer_1.Type(function () { return types_1.ExperienceItemDto; })
    ], UpdateEmployeeDto.prototype, "experiences");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: ['MS Word', 'Excel', 'Driving'] }),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray()
    ], UpdateEmployeeDto.prototype, "skills");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: ['Safety Training', 'Electrical Basics'] }),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray()
    ], UpdateEmployeeDto.prototype, "trainings");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'BN0123456' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateEmployeeDto.prototype, "passportNumber");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: '2023-01-01' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsDateString()
    ], UpdateEmployeeDto.prototype, "passportIssueAt");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: '2033-01-01' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsDateString()
    ], UpdateEmployeeDto.prototype, "passportExpireAt");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'https://cdn.example.com/passport.jpg' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateEmployeeDto.prototype, "passportFileUrl");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'https://cdn.example.com/profile.jpg' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateEmployeeDto.prototype, "profilePhotoUrl");
    __decorate([
        swagger_1.ApiPropertyOptional({ type: [types_1.DocumentItemDto] }),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray(),
        class_validator_1.ValidateNested({ each: true }),
        class_transformer_1.Type(function () { return types_1.DocumentItemDto; })
    ], UpdateEmployeeDto.prototype, "otherDocs");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: true }),
        class_validator_1.IsOptional()
    ], UpdateEmployeeDto.prototype, "isCompleted");
    return UpdateEmployeeDto;
}());
exports.UpdateEmployeeDto = UpdateEmployeeDto;
