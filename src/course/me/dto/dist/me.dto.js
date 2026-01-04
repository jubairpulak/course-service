"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubmitReviewDto = exports.SubmitQuizDto = exports.UpdateProgressDto = exports.EnrollDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var EnrollDto = /** @class */ (function () {
    function EnrollDto() {
    }
    __decorate([
        class_validator_1.IsString()
    ], EnrollDto.prototype, "courseUuid");
    return EnrollDto;
}());
exports.EnrollDto = EnrollDto;
var UpdateProgressDto = /** @class */ (function () {
    function UpdateProgressDto() {
    }
    __decorate([
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt()
    ], UpdateProgressDto.prototype, "lectureId");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt(),
        class_validator_1.Min(0)
    ], UpdateProgressDto.prototype, "lastPositionSec");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], UpdateProgressDto.prototype, "isCompleted");
    return UpdateProgressDto;
}());
exports.UpdateProgressDto = UpdateProgressDto;
var SubmitQuizDto = /** @class */ (function () {
    function SubmitQuizDto() {
    }
    __decorate([
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt()
    ], SubmitQuizDto.prototype, "quizId");
    __decorate([
        class_validator_1.IsString()
    ], SubmitQuizDto.prototype, "answersJson");
    return SubmitQuizDto;
}());
exports.SubmitQuizDto = SubmitQuizDto;
var SubmitReviewDto = /** @class */ (function () {
    function SubmitReviewDto() {
    }
    __decorate([
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt(),
        class_validator_1.Min(1),
        class_validator_1.Max(5)
    ], SubmitReviewDto.prototype, "rating");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], SubmitReviewDto.prototype, "comment");
    return SubmitReviewDto;
}());
exports.SubmitReviewDto = SubmitReviewDto;
