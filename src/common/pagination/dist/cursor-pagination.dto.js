"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CursorPaginationDto = void 0;
// src/common/pagination/cursor-pagination.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var CursorPaginationDto = /** @class */ (function () {
    function CursorPaginationDto() {
        this.limit = 20;
    }
    __decorate([
        swagger_1.ApiPropertyOptional({ description: 'cursor = last item id as string' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CursorPaginationDto.prototype, "cursor");
    __decorate([
        swagger_1.ApiPropertyOptional({ "default": 20, maximum: 50 }),
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt(),
        class_validator_1.Min(1),
        class_validator_1.Max(50)
    ], CursorPaginationDto.prototype, "limit");
    return CursorPaginationDto;
}());
exports.CursorPaginationDto = CursorPaginationDto;
