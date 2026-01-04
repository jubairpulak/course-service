"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateEmployeeDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateEmployeeDto = /** @class */ (function () {
    function CreateEmployeeDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' }),
        class_validator_1.IsUUID()
    ], CreateEmployeeDto.prototype, "authUserId");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Ripon Hossain' }),
        class_validator_1.IsString(),
        class_validator_1.MinLength(2)
    ], CreateEmployeeDto.prototype, "fullName");
    __decorate([
        swagger_1.ApiProperty({ example: '+88017XXXXXXXX' }),
        class_validator_1.IsString()
    ], CreateEmployeeDto.prototype, "phone");
    __decorate([
        swagger_1.ApiProperty({ example: 'ripon@gmail.com' }),
        class_validator_1.IsEmail()
    ], CreateEmployeeDto.prototype, "email");
    __decorate([
        swagger_1.ApiPropertyOptional({ "enum": ['MALE', 'FEMALE', 'OTHER'] }),
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(['MALE', 'FEMALE', 'OTHER'])
    ], CreateEmployeeDto.prototype, "gender");
    return CreateEmployeeDto;
}());
exports.CreateEmployeeDto = CreateEmployeeDto;
