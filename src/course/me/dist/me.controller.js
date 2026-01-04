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
exports.MeController = void 0;
// src/course/me/me.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
var req_user_decorator_1 = require("../../common/decorators/req-user.decorator");
var MeController = /** @class */ (function () {
    function MeController(courses) {
        this.courses = courses;
    }
    MeController.prototype.enroll = function (user, dto) {
        return this.courses.enroll(user, dto.courseUuid);
    };
    MeController.prototype.myCourses = function (user, status) {
        return this.courses.myCourses(user, status);
    };
    MeController.prototype.curriculum = function (user, courseUuid) {
        return this.courses.curriculumForUser(user, courseUuid);
    };
    MeController.prototype.lecture = function (user, courseUuid, lectureId) {
        return this.courses.getLectureForUser(user, courseUuid, Number(lectureId));
    };
    MeController.prototype.updateProgress = function (user, courseUuid, dto) {
        return this.courses.updateProgress(user, courseUuid, dto);
    };
    MeController.prototype.submitQuiz = function (user, courseUuid, dto) {
        return this.courses.submitQuiz(user, courseUuid, dto);
    };
    MeController.prototype.review = function (user, courseUuid, dto) {
        return this.courses.submitReview(user, courseUuid, dto);
    };
    MeController.prototype.certificate = function (user, courseUuid) {
        return this.courses.getCertificate(user, courseUuid);
    };
    __decorate([
        common_1.Post('enroll'),
        __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Body())
    ], MeController.prototype, "enroll");
    __decorate([
        common_1.Get(),
        __param(0, req_user_decorator_1.ReqUser()),
        __param(1, common_1.Query('status'))
    ], MeController.prototype, "myCourses");
    __decorate([
        common_1.Get(':courseUuid/curriculum'),
        __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param('courseUuid'))
    ], MeController.prototype, "curriculum");
    __decorate([
        common_1.Get(':courseUuid/lectures/:lectureId'),
        __param(0, req_user_decorator_1.ReqUser()),
        __param(1, common_1.Param('courseUuid')),
        __param(2, common_1.Param('lectureId'))
    ], MeController.prototype, "lecture");
    __decorate([
        common_1.Patch(':courseUuid/progress'),
        __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param('courseUuid')), __param(2, common_1.Body())
    ], MeController.prototype, "updateProgress");
    __decorate([
        common_1.Post(':courseUuid/quizzes/submit'),
        __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param('courseUuid')), __param(2, common_1.Body())
    ], MeController.prototype, "submitQuiz");
    __decorate([
        common_1.Post(':courseUuid/review'),
        __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param('courseUuid')), __param(2, common_1.Body())
    ], MeController.prototype, "review");
    __decorate([
        common_1.Get(':courseUuid/certificate'),
        __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param('courseUuid'))
    ], MeController.prototype, "certificate");
    MeController = __decorate([
        swagger_1.ApiTags('Me (User)'),
        swagger_1.ApiBearerAuth('JWT-auth'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Controller('me/courses')
    ], MeController);
    return MeController;
}());
exports.MeController = MeController;
