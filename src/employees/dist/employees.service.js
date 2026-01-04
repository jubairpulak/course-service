"use strict";
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
exports.EmployeesService = void 0;
var common_1 = require("@nestjs/common");
var EmployeesService = /** @class */ (function () {
    function EmployeesService(prisma) {
        this.prisma = prisma;
    }
    EmployeesService.prototype.create = function (dto) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var exists, employee;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.prisma.employee.findUnique({ where: { email: dto.email } })];
                    case 1:
                        exists = _c.sent();
                        if (exists)
                            throw new common_1.BadRequestException('Employee already exists');
                        return [4 /*yield*/, this.prisma.employee.create({
                                data: { authUserId: dto.authUserId, fullName: (_a = dto.fullName) !== null && _a !== void 0 ? _a : null, email: dto.email, phone: (_b = dto.phone) !== null && _b !== void 0 ? _b : null }
                            })];
                    case 2:
                        employee = _c.sent();
                        return [2 /*return*/, { success: true, data: employee }];
                }
            });
        });
    };
    EmployeesService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.employee.findMany({ orderBy: { id: 'desc' } })];
                    case 1:
                        list = _a.sent();
                        return [2 /*return*/, { success: true, data: list }];
                }
            });
        });
    };
    EmployeesService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var emp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.employee.findUnique({ where: { id: id } })];
                    case 1:
                        emp = _a.sent();
                        if (!emp)
                            throw new common_1.NotFoundException('Employee not found');
                        return [2 /*return*/, { success: true, data: emp }];
                }
            });
        });
    };
    EmployeesService.prototype.update = function (id, dto) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var data, updated;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        _g.sent();
                        data = {
                            fatherName: (_a = dto.fatherName) !== null && _a !== void 0 ? _a : undefined,
                            motherName: (_b = dto.motherName) !== null && _b !== void 0 ? _b : undefined,
                            dateOfBirth: dto.dateOfBirth
                                ? new Date(dto.dateOfBirth)
                                : undefined,
                            gender: (_c = dto.gender) !== null && _c !== void 0 ? _c : undefined,
                            // ✅ Json fields → cast to InputJsonValue
                            presentAddress: dto.presentAddress
                                ? dto.presentAddress
                                : undefined,
                            permanentAddress: dto.permanentAddress
                                ? dto.permanentAddress
                                : undefined,
                            education: dto.education
                                ? dto.education
                                : undefined,
                            experiences: dto.experiences
                                ? dto.experiences
                                : undefined,
                            skills: dto.skills
                                ? dto.skills
                                : undefined,
                            trainings: dto.trainings
                                ? dto.trainings
                                : undefined,
                            passportNumber: (_d = dto.passportNumber) !== null && _d !== void 0 ? _d : undefined,
                            passportIssueAt: dto.passportIssueAt
                                ? new Date(dto.passportIssueAt)
                                : undefined,
                            passportExpireAt: dto.passportExpireAt
                                ? new Date(dto.passportExpireAt)
                                : undefined,
                            passportFileUrl: (_e = dto.passportFileUrl) !== null && _e !== void 0 ? _e : undefined,
                            profilePhotoUrl: (_f = dto.profilePhotoUrl) !== null && _f !== void 0 ? _f : undefined,
                            otherDocs: dto.otherDocs
                                ? dto.otherDocs
                                : undefined,
                            isCompleted: typeof dto.isCompleted === 'boolean'
                                ? dto.isCompleted
                                : undefined
                        };
                        return [4 /*yield*/, this.prisma.employee.update({
                                where: { id: id },
                                data: data
                            })];
                    case 2:
                        updated = _g.sent();
                        return [2 /*return*/, { success: true, data: updated }];
                }
            });
        });
    };
    EmployeesService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.prisma.employee["delete"]({ where: { id: id } })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: true }];
                }
            });
        });
    };
    // ✅ NEW: find by authUserId
    EmployeesService.prototype.findByAuthUserId = function (authUserId) {
        return __awaiter(this, void 0, void 0, function () {
            var employee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("hello jp");
                        return [4 /*yield*/, this.prisma.employee.findUnique({
                                where: { authUserId: authUserId }
                            })];
                    case 1:
                        employee = _a.sent();
                        if (!employee) {
                            throw new common_1.NotFoundException('Employee profile not found');
                        }
                        return [2 /*return*/, employee];
                }
            });
        });
    };
    EmployeesService = __decorate([
        common_1.Injectable()
    ], EmployeesService);
    return EmployeesService;
}());
exports.EmployeesService = EmployeesService;
