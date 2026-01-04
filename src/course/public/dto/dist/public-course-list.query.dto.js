"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PublicCourseListQueryDto = exports.CourseSort = void 0;
// src/course/public/dto/public-course-list.query.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var cursor_pagination_dto_1 = require("../../../common/pagination/cursor-pagination.dto");
var CourseSort;
(function (CourseSort) {
    CourseSort["RELEVANCE"] = "RELEVANCE";
    CourseSort["NEWEST"] = "NEWEST";
    CourseSort["PRICE_LOW"] = "PRICE_LOW";
    CourseSort["PRICE_HIGH"] = "PRICE_HIGH";
    CourseSort["TOP_RATED"] = "TOP_RATED";
    CourseSort["POPULAR"] = "POPULAR";
})(CourseSort = exports.CourseSort || (exports.CourseSort = {}));
var PublicCourseListQueryDto = /** @class */ (function (_super) {
    __extends(PublicCourseListQueryDto, _super);
    function PublicCourseListQueryDto() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sort = CourseSort.NEWEST;
        return _this;
    }
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], PublicCourseListQueryDto.prototype, "q");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt()
    ], PublicCourseListQueryDto.prototype, "categoryId");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt()
    ], PublicCourseListQueryDto.prototype, "subCategoryId");
    __decorate([
        swagger_1.ApiPropertyOptional({ description: 'Optional for org-specific catalog filtering' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], PublicCourseListQueryDto.prototype, "organizationUuid");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.Min(0)
    ], PublicCourseListQueryDto.prototype, "minPrice");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.Min(0)
    ], PublicCourseListQueryDto.prototype, "maxPrice");
    __decorate([
        swagger_1.ApiPropertyOptional({ "enum": CourseSort, "default": CourseSort.NEWEST }),
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(CourseSort)
    ], PublicCourseListQueryDto.prototype, "sort");
    return PublicCourseListQueryDto;
}(cursor_pagination_dto_1.CursorPaginationDto));
exports.PublicCourseListQueryDto = PublicCourseListQueryDto;
