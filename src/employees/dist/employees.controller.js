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
exports.EmployeesController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var create_employee_dto_1 = require("./dto/create-employee.dto");
var update_employee_dto_1 = require("./dto/update-employee.dto");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var public_decorator_1 = require("../auth/public.decorator");
var EmployeesController = /** @class */ (function () {
    function EmployeesController(employees) {
        this.employees = employees;
    }
    // ✅ NO token verify
    EmployeesController.prototype.create = function (dto) {
        return this.employees.create(dto);
    };
    // ✅ GET ME (JWT required)
    EmployeesController.prototype.getMe = function (req) {
        var user = req.user;
        return this.employees.findByAuthUserId(user.sub);
    };
    // ✅ token verify required
    EmployeesController.prototype.findAll = function () {
        return this.employees.findAll();
    };
    EmployeesController.prototype.findOne = function (id) {
        return this.employees.findOne(Number(id));
    };
    EmployeesController.prototype.update = function (id, dto) {
        return this.employees.update(Number(id), dto);
    };
    EmployeesController.prototype.remove = function (id) {
        return this.employees.remove(Number(id));
    };
    __decorate([
        public_decorator_1.Public(),
        common_1.Post(),
        swagger_1.ApiOperation({ summary: 'Create employee (Public - no token required)' }),
        swagger_1.ApiBody({ type: create_employee_dto_1.CreateEmployeeDto }),
        swagger_1.ApiResponse({ status: 201, description: 'Employee created successfully' }),
        swagger_1.ApiResponse({ status: 400, description: 'Validation failed / already exists' }),
        __param(0, common_1.Body())
    ], EmployeesController.prototype, "create");
    __decorate([
        common_1.Get('me'),
        swagger_1.ApiBearerAuth('JWT-auth'),
        __param(0, common_1.Request())
    ], EmployeesController.prototype, "getMe");
    __decorate([
        common_1.Get(),
        swagger_1.ApiBearerAuth('JWT-auth'),
        swagger_1.ApiOperation({ summary: 'List employees (JWT required)' }),
        swagger_1.ApiResponse({ status: 200, description: 'Employee list' }),
        swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' })
    ], EmployeesController.prototype, "findAll");
    __decorate([
        common_1.Get(':id'),
        swagger_1.ApiBearerAuth('JWT-auth'),
        swagger_1.ApiOperation({ summary: 'Get employee by id (JWT required)' }),
        swagger_1.ApiParam({ name: 'id', example: 1 }),
        swagger_1.ApiResponse({ status: 200, description: 'Employee details' }),
        swagger_1.ApiResponse({ status: 404, description: 'Employee not found' }),
        swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
        __param(0, common_1.Param('id'))
    ], EmployeesController.prototype, "findOne");
    __decorate([
        common_1.Patch(':id'),
        swagger_1.ApiBearerAuth('JWT-auth'),
        swagger_1.ApiOperation({ summary: 'Update employee (JWT required)' }),
        swagger_1.ApiParam({ name: 'id', example: 1 }),
        swagger_1.ApiBody({ type: update_employee_dto_1.UpdateEmployeeDto }),
        swagger_1.ApiResponse({ status: 200, description: 'Employee updated' }),
        swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], EmployeesController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        swagger_1.ApiBearerAuth('JWT-auth'),
        swagger_1.ApiOperation({ summary: 'Delete employee (JWT required)' }),
        swagger_1.ApiParam({ name: 'id', example: 1 }),
        swagger_1.ApiResponse({ status: 200, description: 'Employee deleted' }),
        swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
        __param(0, common_1.Param('id'))
    ], EmployeesController.prototype, "remove");
    EmployeesController = __decorate([
        swagger_1.ApiTags('Employees'),
        common_1.Controller('employees'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard) // default: protected
    ], EmployeesController);
    return EmployeesController;
}());
exports.EmployeesController = EmployeesController;
