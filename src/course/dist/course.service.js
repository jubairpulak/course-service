"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CourseService = void 0;
// src/course/course.service.ts
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var public_course_list_query_dto_1 = require("./public/dto/public-course-list.query.dto");
var CourseService = /** @class */ (function () {
    function CourseService(prisma, access) {
        this.prisma = prisma;
        this.access = access;
    }
    // ---------------------------
    // PUBLIC: LIST (search/sort/filter)
    // ---------------------------
    CourseService.prototype.publicList = function (dto) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var limit, cursorId, baseWhere, min, max, q, cursorClause, rows, hasNext_1, items_1, nextCursor_1, orderBy, items, hasNext, sliced, nextCursor;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        limit = (_a = dto.limit) !== null && _a !== void 0 ? _a : 20;
                        cursorId = dto.cursor ? Number(dto.cursor) : undefined;
                        baseWhere = __assign(__assign(__assign(__assign({ status: client_1.CourseStatus.PUBLISHED, deletedAt: null }, (dto.categoryId ? { categoryId: dto.categoryId } : {})), (dto.subCategoryId ? { subCategoryId: dto.subCategoryId } : {})), (dto.organizationUuid ? { organizationUuid: dto.organizationUuid } : {})), { 
                            // public catalog only: do not leak private org-only unless caller filters orgUuid intentionally
                            visibility: client_1.CourseVisibility.PUBLIC });
                        if (dto.minPrice != null || dto.maxPrice != null) {
                            min = (_b = dto.minPrice) !== null && _b !== void 0 ? _b : 0;
                            max = (_c = dto.maxPrice) !== null && _c !== void 0 ? _c : 99999999;
                            baseWhere.OR = [
                                { offerPrice: { gte: min, lte: max } },
                                { offerPrice: null, price: { gte: min, lte: max } },
                            ];
                        }
                        if (!(dto.q && dto.q.trim())) return [3 /*break*/, 2];
                        q = dto.q.trim();
                        cursorClause = cursorId ? client_1.Prisma.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["AND c.id < ", ""], ["AND c.id < ", ""])), cursorId) : client_1.Prisma.empty;
                        return [4 /*yield*/, this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        SELECT\n          c.id, c.uuid, c.title, c.slug, c.thumbnailUrl,\n          c.price, c.offerPrice, c.currency,\n          c.ratingAvg, c.ratingCount, c.enrollmentCount, c.publishedAt,\n          MATCH(c.title, c.shortDescription, c.description) AGAINST (", " IN NATURAL LANGUAGE MODE) AS relevance\n        FROM Course c\n        WHERE\n          c.status = 'PUBLISHED'\n          AND c.deletedAt IS NULL\n          AND c.visibility = 'PUBLIC'\n          ", "\n          ", "\n          ", "\n          AND MATCH(c.title, c.shortDescription, c.description) AGAINST (", " IN NATURAL LANGUAGE MODE)\n        ORDER BY relevance DESC, c.ratingAvg DESC, c.ratingCount DESC, c.id DESC\n        LIMIT ", "\n      "], ["\n        SELECT\n          c.id, c.uuid, c.title, c.slug, c.thumbnailUrl,\n          c.price, c.offerPrice, c.currency,\n          c.ratingAvg, c.ratingCount, c.enrollmentCount, c.publishedAt,\n          MATCH(c.title, c.shortDescription, c.description) AGAINST (", " IN NATURAL LANGUAGE MODE) AS relevance\n        FROM Course c\n        WHERE\n          c.status = 'PUBLISHED'\n          AND c.deletedAt IS NULL\n          AND c.visibility = 'PUBLIC'\n          ", "\n          ", "\n          ", "\n          AND MATCH(c.title, c.shortDescription, c.description) AGAINST (", " IN NATURAL LANGUAGE MODE)\n        ORDER BY relevance DESC, c.ratingAvg DESC, c.ratingCount DESC, c.id DESC\n        LIMIT ", "\n      "])), q, cursorClause, dto.categoryId ? client_1.Prisma.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["AND c.categoryId = ", ""], ["AND c.categoryId = ", ""])), dto.categoryId) : client_1.Prisma.empty, dto.subCategoryId ? client_1.Prisma.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["AND c.subCategoryId = ", ""], ["AND c.subCategoryId = ", ""])), dto.subCategoryId) : client_1.Prisma.empty, q, limit + 1))];
                    case 1:
                        rows = _d.sent();
                        hasNext_1 = rows.length > limit;
                        items_1 = hasNext_1 ? rows.slice(0, limit) : rows;
                        nextCursor_1 = hasNext_1 ? String(items_1[items_1.length - 1].id) : null;
                        return [2 /*return*/, { items: items_1, nextCursor: nextCursor_1 }];
                    case 2:
                        orderBy = this.mapOrder(dto.sort);
                        return [4 /*yield*/, this.prisma.course.findMany({
                                where: __assign(__assign({}, baseWhere), (cursorId ? { id: { lt: cursorId } } : {})),
                                select: {
                                    id: true, uuid: true, title: true, slug: true,
                                    thumbnailUrl: true, price: true, offerPrice: true, currency: true,
                                    ratingAvg: true, ratingCount: true, enrollmentCount: true, publishedAt: true
                                },
                                orderBy: orderBy,
                                take: limit + 1
                            })];
                    case 3:
                        items = _d.sent();
                        hasNext = items.length > limit;
                        sliced = hasNext ? items.slice(0, limit) : items;
                        nextCursor = hasNext ? String(sliced[sliced.length - 1].id) : null;
                        return [2 /*return*/, { items: sliced, nextCursor: nextCursor }];
                }
            });
        });
    };
    CourseService.prototype.mapOrder = function (sort) {
        switch (sort) {
            case public_course_list_query_dto_1.CourseSort.PRICE_LOW:
                return [{ offerPrice: 'asc' }, { price: 'asc' }, { id: 'desc' }];
            case public_course_list_query_dto_1.CourseSort.PRICE_HIGH:
                return [{ offerPrice: 'desc' }, { price: 'desc' }, { id: 'desc' }];
            case public_course_list_query_dto_1.CourseSort.TOP_RATED:
                return [{ ratingAvg: 'desc' }, { ratingCount: 'desc' }, { id: 'desc' }];
            case public_course_list_query_dto_1.CourseSort.POPULAR:
                return [{ enrollmentCount: 'desc' }, { id: 'desc' }];
            case public_course_list_query_dto_1.CourseSort.NEWEST:
            default:
                return [{ publishedAt: 'desc' }, { id: 'desc' }];
        }
    };
    CourseService.prototype.publicDetailBySlug = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.course.findFirst({
                            where: {
                                slug: slug,
                                deletedAt: null,
                                status: client_1.CourseStatus.PUBLISHED,
                                visibility: client_1.CourseVisibility.PUBLIC
                            },
                            include: {
                                Category: true,
                                SubCategory: true,
                                CourseSection: {
                                    orderBy: { sortOrder: 'asc' },
                                    include: {
                                        Lecture: {
                                            orderBy: { sortOrder: 'asc' },
                                            select: { id: true, title: true, durationSec: true, isPreview: true }
                                        },
                                        Quiz: {
                                            orderBy: { sortOrder: 'asc' },
                                            select: { id: true, title: true, timeLimitSec: true }
                                        }
                                    }
                                },
                                CourseReview: { take: 10, orderBy: { createdAt: 'desc' } }
                            }
                        })];
                    case 1:
                        c = _a.sent();
                        if (!c)
                            throw new common_1.NotFoundException('Course not found');
                        return [2 /*return*/, c];
                }
            });
        });
    };
    // ---------------------------
    // USER (ME): ENROLL & MY COURSES
    // ---------------------------
    CourseService.prototype.enroll = function (user, courseUuid) {
        return __awaiter(this, void 0, void 0, function () {
            var course, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.course.findFirst({
                            where: { uuid: courseUuid, deletedAt: null, status: client_1.CourseStatus.PUBLISHED },
                            select: { id: true, visibility: true, organizationUuid: true }
                        })];
                    case 1:
                        course = _a.sent();
                        if (!course)
                            throw new common_1.NotFoundException('Course not found');
                        return [4 /*yield*/, this.access.assertCanViewCourse(course.id, user)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var existing, created;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tx.enrollment.findUnique({
                                                where: { courseId_userUuid: { courseId: course.id, userUuid: user.sub } },
                                                select: { id: true }
                                            })];
                                        case 1:
                                            existing = _a.sent();
                                            if (existing)
                                                return [2 /*return*/, existing];
                                            return [4 /*yield*/, tx.enrollment.create({
                                                    data: { courseId: course.id, userUuid: user.sub, status: client_1.EnrollmentStatus.NOT_STARTED },
                                                    select: { id: true }
                                                })];
                                        case 2:
                                            created = _a.sent();
                                            return [4 /*yield*/, tx.course.update({
                                                    where: { id: course.id },
                                                    data: { enrollmentCount: { increment: 1 } }
                                                })];
                                        case 3:
                                            _a.sent();
                                            return [2 /*return*/, created];
                                    }
                                });
                            }); })];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, { ok: true, enrollmentId: res.id }];
                }
            });
        });
    };
    CourseService.prototype.myCourses = function (user, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.prisma.enrollment.findMany({
                        where: __assign({ userUuid: user.sub }, (status ? { status: status } : {})),
                        orderBy: { enrolledAt: 'desc' },
                        select: {
                            id: true,
                            status: true,
                            progressPercent: true,
                            enrolledAt: true,
                            completedAt: true,
                            Course: {
                                select: { uuid: true, title: true, slug: true, thumbnailUrl: true, price: true, offerPrice: true, currency: true }
                            }
                        }
                    })];
            });
        });
    };
    CourseService.prototype.curriculumForUser = function (user, courseUuid) {
        return __awaiter(this, void 0, void 0, function () {
            var course, enr, sections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.course.findFirst({
                            where: { uuid: courseUuid, deletedAt: null, status: client_1.CourseStatus.PUBLISHED },
                            select: { id: true }
                        })];
                    case 1:
                        course = _a.sent();
                        if (!course)
                            throw new common_1.NotFoundException('Course not found');
                        return [4 /*yield*/, this.access.assertCanViewCourse(course.id, user)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.access.assertEnrolled(course.id, user)];
                    case 3:
                        enr = _a.sent();
                        return [4 /*yield*/, this.prisma.courseSection.findMany({
                                where: { courseId: course.id },
                                orderBy: { sortOrder: 'asc' },
                                include: {
                                    Lecture: {
                                        orderBy: { sortOrder: 'asc' },
                                        select: { id: true, title: true, durationSec: true, isPreview: true }
                                    },
                                    Quiz: {
                                        orderBy: { sortOrder: 'asc' },
                                        select: { id: true, title: true, timeLimitSec: true, passMark: true }
                                    }
                                }
                            })];
                    case 4:
                        sections = _a.sent();
                        return [2 /*return*/, { enrollment: enr, sections: sections }];
                }
            });
        });
    };
    CourseService.prototype.getLectureForUser = function (user, courseUuid, lectureId) {
        return __awaiter(this, void 0, void 0, function () {
            var course, lecture;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.course.findFirst({
                            where: { uuid: courseUuid, deletedAt: null, status: client_1.CourseStatus.PUBLISHED },
                            select: { id: true }
                        })];
                    case 1:
                        course = _a.sent();
                        if (!course)
                            throw new common_1.NotFoundException('Course not found');
                        return [4 /*yield*/, this.access.assertCanViewCourse(course.id, user)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.prisma.lecture.findFirst({
                                where: { id: lectureId, courseId: course.id },
                                select: {
                                    id: true, title: true, contentType: true, contentUrl: true, articleHtml: true,
                                    durationSec: true, isPreview: true, sectionId: true, sortOrder: true
                                }
                            })];
                    case 3:
                        lecture = _a.sent();
                        if (!lecture)
                            throw new common_1.NotFoundException('Lecture not found');
                        if (!!lecture.isPreview) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.access.assertEnrolled(course.id, user)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, lecture];
                }
            });
        });
    };
    CourseService.prototype.updateProgress = function (user, courseUuid, dto) {
        return __awaiter(this, void 0, void 0, function () {
            var course, enr, lecture, updated;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.course.findFirst({
                            where: { uuid: courseUuid, deletedAt: null, status: client_1.CourseStatus.PUBLISHED },
                            select: { id: true }
                        })];
                    case 1:
                        course = _a.sent();
                        if (!course)
                            throw new common_1.NotFoundException('Course not found');
                        return [4 /*yield*/, this.access.assertEnrolled(course.id, user)];
                    case 2:
                        enr = _a.sent();
                        return [4 /*yield*/, this.prisma.lecture.findFirst({
                                where: { id: dto.lectureId, courseId: course.id },
                                select: { id: true }
                            })];
                    case 3:
                        lecture = _a.sent();
                        if (!lecture)
                            throw new common_1.NotFoundException('Lecture not found');
                        return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var p, total, completed, percent, status;
                                var _a, _b, _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0: return [4 /*yield*/, tx.lectureProgress.upsert({
                                                where: {
                                                    enrollmentId_lectureId: {
                                                        enrollmentId: enr.id,
                                                        lectureId: lecture.id
                                                    }
                                                },
                                                update: __assign({ lastPositionSec: (_a = dto.lastPositionSec) !== null && _a !== void 0 ? _a : 0 }, (dto.isCompleted != null ? { isCompleted: dto.isCompleted } : {})),
                                                create: {
                                                    enrollmentId: enr.id,
                                                    lectureId: lecture.id,
                                                    lastPositionSec: (_b = dto.lastPositionSec) !== null && _b !== void 0 ? _b : 0,
                                                    isCompleted: (_c = dto.isCompleted) !== null && _c !== void 0 ? _c : false
                                                }, satisfies: satisfies, Prisma: client_1.Prisma,
                                                : .LectureProgressUncheckedCreateInput
                                            })];
                                        case 1:
                                            p = _d.sent();
                                            return [4 /*yield*/, tx.lecture.count({ where: { courseId: course.id } })];
                                        case 2:
                                            total = _d.sent();
                                            return [4 /*yield*/, tx.lectureProgress.count({ where: { enrollmentId: enr.id, isCompleted: true } })];
                                        case 3:
                                            completed = _d.sent();
                                            percent = total === 0 ? 0 : Math.floor((completed / total) * 100);
                                            status = percent >= 100 ? client_1.EnrollmentStatus.COMPLETED : percent > 0 ? client_1.EnrollmentStatus.ACTIVE : client_1.EnrollmentStatus.NOT_STARTED;
                                            return [4 /*yield*/, tx.enrollment.update({
                                                    where: { id: enr.id },
                                                    data: __assign({ progressPercent: percent, status: status }, (status === client_1.EnrollmentStatus.COMPLETED ? { completedAt: new Date() } : {}))
                                                })];
                                        case 4:
                                            _d.sent();
                                            return [2 /*return*/, { progress: p, percent: percent, status: status }];
                                    }
                                });
                            }); })];
                    case 4:
                        updated = _a.sent();
                        return [2 /*return*/, updated];
                }
            });
        });
    };
    CourseService.prototype.submitQuiz = function (user, courseUuid, dto) {
        return __awaiter(this, void 0, void 0, function () {
            var course, enr, quiz, answers, correct, wrong, totalQ, _loop_1, _i, _a, q, scorePercent, isPassed, attempt;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.prisma.course.findFirst({
                            where: { uuid: courseUuid, deletedAt: null, status: client_1.CourseStatus.PUBLISHED },
                            select: { id: true }
                        })];
                    case 1:
                        course = _b.sent();
                        if (!course)
                            throw new common_1.NotFoundException('Course not found');
                        return [4 /*yield*/, this.access.assertEnrolled(course.id, user)];
                    case 2:
                        enr = _b.sent();
                        return [4 /*yield*/, this.prisma.quiz.findFirst({
                                where: { id: dto.quizId, courseId: course.id },
                                include: { QuizQuestion: { include: { QuizOption: true } } }
                            })];
                    case 3:
                        quiz = _b.sent();
                        if (!quiz)
                            throw new common_1.NotFoundException('Quiz not found');
                        try {
                            answers = JSON.parse(dto.answersJson);
                        }
                        catch (_c) {
                            throw new common_1.BadRequestException('Invalid answersJson');
                        }
                        correct = 0;
                        wrong = 0;
                        totalQ = quiz.QuizQuestion.length;
                        _loop_1 = function (q) {
                            var picked = answers[String(q.id)];
                            if (!picked) {
                                wrong++;
                                return "continue";
                            }
                            var opt = q.QuizOption.find(function (o) { return o.id === picked; });
                            if (opt === null || opt === void 0 ? void 0 : opt.isCorrect)
                                correct++;
                            else
                                wrong++;
                        };
                        for (_i = 0, _a = quiz.QuizQuestion; _i < _a.length; _i++) {
                            q = _a[_i];
                            _loop_1(q);
                        }
                        scorePercent = totalQ === 0 ? 0 : Math.floor((correct / totalQ) * 100);
                        isPassed = scorePercent >= quiz.passMark;
                        return [4 /*yield*/, this.prisma.quizAttempt.create({
                                data: {
                                    enrollmentId: enr.id,
                                    quizId: quiz.id,
                                    createdAt: new Date(),
                                    scorePercent: scorePercent,
                                    correctCount: correct,
                                    wrongCount: wrong,
                                    isPassed: isPassed,
                                    answersJson: dto.answersJson
                                }
                            })];
                    case 4:
                        attempt = _b.sent();
                        return [2 /*return*/, { attemptId: attempt.id, scorePercent: scorePercent, correct: correct, wrong: wrong, isPassed: isPassed }];
                }
            });
        });
    };
    CourseService.prototype.submitReview = function (user, courseUuid, dto) {
        return __awaiter(this, void 0, void 0, function () {
            var course, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.course.findFirst({
                            where: { uuid: courseUuid, deletedAt: null, status: client_1.CourseStatus.PUBLISHED },
                            select: { id: true }
                        })];
                    case 1:
                        course = _a.sent();
                        if (!course)
                            throw new common_1.NotFoundException('Course not found');
                        // allow only enrolled
                        return [4 /*yield*/, this.access.assertEnrolled(course.id, user)];
                    case 2:
                        // allow only enrolled
                        _a.sent();
                        return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var review, agg;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, tx.courseReview.upsert({
                                                where: { courseId_userUuid: { courseId: course.id, userUuid: user.sub } },
                                                update: { rating: dto.rating, comment: dto.comment },
                                                create: { courseId: course.id, userUuid: user.sub, rating: dto.rating, comment: dto.comment }
                                            })];
                                        case 1:
                                            review = _b.sent();
                                            return [4 /*yield*/, tx.courseReview.aggregate({
                                                    where: { courseId: course.id },
                                                    _avg: { rating: true },
                                                    _count: { rating: true }
                                                })];
                                        case 2:
                                            agg = _b.sent();
                                            return [4 /*yield*/, tx.course.update({
                                                    where: { id: course.id },
                                                    data: {
                                                        ratingAvg: new client_1.Prisma.Decimal(Number((_a = agg._avg.rating) !== null && _a !== void 0 ? _a : 0).toFixed(2)),
                                                        ratingCount: agg._count.rating
                                                    }
                                                })];
                                        case 3:
                                            _b.sent();
                                            return [2 /*return*/, review];
                                    }
                                });
                            }); })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, { ok: true, reviewId: result.id }];
                }
            });
        });
    };
    CourseService.prototype.getCertificate = function (user, courseUuid) {
        return __awaiter(this, void 0, void 0, function () {
            var course, enr, cert, certificateNo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.course.findFirst({
                            where: { uuid: courseUuid, deletedAt: null },
                            select: { id: true, title: true }
                        })];
                    case 1:
                        course = _a.sent();
                        if (!course)
                            throw new common_1.NotFoundException('Course not found');
                        return [4 /*yield*/, this.access.assertEnrolled(course.id, user)];
                    case 2:
                        enr = _a.sent();
                        if (enr.status !== client_1.EnrollmentStatus.COMPLETED)
                            throw new common_1.ForbiddenException('Course not completed');
                        return [4 /*yield*/, this.prisma.certificate.findFirst({
                                where: { enrollmentId: enr.id }
                            })];
                    case 3:
                        cert = _a.sent();
                        if (cert)
                            return [2 /*return*/, cert];
                        certificateNo = "MPX-" + course.id + "-" + enr.id + "-" + Date.now();
                        return [2 /*return*/, this.prisma.certificate.create({
                                data: {
                                    courseId: course.id,
                                    enrollmentId: enr.id,
                                    userUuid: user.sub,
                                    certificateNo: certificateNo,
                                    payloadJson: JSON.stringify({ courseTitle: course.title, userUuid: user.sub }),
                                    qrData: certificateNo
                                }
                            })];
                }
            });
        });
    };
    // ---------------------------
    // ADMIN CRUD
    // ---------------------------
    CourseService.prototype.createCategory = function (dto) {
        return this.prisma.category.create({ data: dto });
    };
    CourseService.prototype.listCategories = function () {
        return this.prisma.category.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }] });
    };
    CourseService.prototype.updateCategory = function (id, dto) {
        return this.prisma.category.update({ where: { id: id }, data: dto });
    };
    CourseService.prototype.deleteCategory = function (id) {
        return this.prisma.category["delete"]({ where: { id: id } });
    };
    CourseService.prototype.createSubCategory = function (dto) {
        return this.prisma.subCategory.create({ data: dto });
    };
    CourseService.prototype.listSubCategories = function () {
        return this.prisma.subCategory.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }], include: { Category: true } });
    };
    CourseService.prototype.updateSubCategory = function (id, dto) {
        return this.prisma.subCategory.update({ where: { id: id }, data: dto });
    };
    CourseService.prototype.deleteSubCategory = function (id) {
        return this.prisma.subCategory["delete"]({ where: { id: id } });
    };
    CourseService.prototype.createCourse = function (dto) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var now, publishedAt;
            return __generator(this, function (_d) {
                if (dto.visibility === 'ORG_ONLY' && !dto.organizationUuid) {
                    throw new common_1.BadRequestException('organizationUuid required for ORG_ONLY');
                }
                now = new Date();
                publishedAt = dto.status === 'PUBLISHED' ? now : null;
                return [2 /*return*/, this.prisma.course.create({
                        data: {
                            uuid: dto.uuid,
                            title: dto.title,
                            slug: dto.slug,
                            shortDescription: dto.shortDescription,
                            description: dto.description,
                            language: dto.language,
                            level: dto.level,
                            thumbnailUrl: dto.thumbnailUrl,
                            bannerUrl: dto.bannerUrl,
                            price: new client_1.Prisma.Decimal((_a = dto.price) !== null && _a !== void 0 ? _a : 0),
                            offerPrice: dto.offerPrice != null ? new client_1.Prisma.Decimal(dto.offerPrice) : null,
                            categoryId: dto.categoryId,
                            subCategoryId: dto.subCategoryId,
                            visibility: dto.visibility,
                            organizationUuid: (_b = dto.organizationUuid) !== null && _b !== void 0 ? _b : null,
                            status: dto.status,
                            publishedAt: publishedAt,
                            isFeatured: (_c = dto.isFeatured) !== null && _c !== void 0 ? _c : false
                        }
                    })];
            });
        });
    };
    CourseService.prototype.adminListCourses = function () {
        return this.prisma.course.findMany({
            where: { deletedAt: null },
            orderBy: { id: 'desc' },
            include: { Category: true, SubCategory: true }
        });
    };
    CourseService.prototype.adminGetCourse = function (id) {
        return this.prisma.course.findFirst({
            where: { id: id, deletedAt: null },
            include: {
                // OutComes: { orderBy: { sortOrder: 'asc' } },
                // : { orderBy: { sortOrder: 'asc' } },
                CourseSection: {
                    orderBy: { sortOrder: 'asc' },
                    include: {
                        Lecture: { orderBy: { sortOrder: 'asc' } },
                        Quiz: { orderBy: { sortOrder: 'asc' }, include: { QuizQuestion: { include: { QuizOption: true } } } }
                    }
                },
                CourseAllowedUser: true
            }
        });
    };
    CourseService.prototype.updateCourse = function (id, dto) {
        return __awaiter(this, void 0, void 0, function () {
            var existing, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (dto.visibility === 'ORG_ONLY' && !dto.organizationUuid) {
                            throw new common_1.BadRequestException('organizationUuid required for ORG_ONLY');
                        }
                        return [4 /*yield*/, this.prisma.course.findFirst({ where: { id: id, deletedAt: null }, select: { status: true } })];
                    case 1:
                        existing = _a.sent();
                        if (!existing)
                            throw new common_1.NotFoundException('Course not found');
                        data = __assign(__assign(__assign({}, dto), (dto.price != null ? { price: new client_1.Prisma.Decimal(dto.price) } : {})), (dto.offerPrice != null ? { offerPrice: new client_1.Prisma.Decimal(dto.offerPrice) } : {}));
                        // publish timestamp when moving to published
                        if (existing.status !== 'PUBLISHED' && dto.status === 'PUBLISHED') {
                            data.publishedAt = new Date();
                        }
                        return [2 /*return*/, this.prisma.course.update({ where: { id: id }, data: data })];
                }
            });
        });
    };
    CourseService.prototype.softDeleteCourse = function (id) {
        return this.prisma.course.update({ where: { id: id }, data: { deletedAt: new Date() } });
    };
    CourseService.prototype.setAllowedUsers = function (courseId, csv) {
        return __awaiter(this, void 0, void 0, function () {
            var uuids;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uuids = csv
                            .split(',')
                            .map(function (s) { return s.trim(); })
                            .filter(Boolean);
                        return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tx.courseAllowedUser.deleteMany({ where: { courseId: courseId } })];
                                        case 1:
                                            _a.sent();
                                            if (!(uuids.length > 0)) return [3 /*break*/, 3];
                                            return [4 /*yield*/, tx.courseAllowedUser.createMany({
                                                    data: uuids.map(function (u) { return ({ courseId: courseId, userUuid: u }); }),
                                                    skipDuplicates: true
                                                })];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { ok: true, count: uuids.length }];
                }
            });
        });
    };
    CourseService = __decorate([
        common_1.Injectable()
    ], CourseService);
    return CourseService;
}());
exports.CourseService = CourseService;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
