"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var auth_module_1 = require("./auth/auth.module");
var prisma_module_1 = require("./prisma/prisma.module");
var app_logger_service_1 = require("./common/logger/app-logger.service");
var http_logging_interceptor_1 = require("./common/interceptors/http-logging.interceptor");
var all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
var request_context_middleware_1 = require("./common/logger/request-context.middleware");
var employees_controller_1 = require("./employees/employees.controller");
var employees_service_1 = require("./employees/employees.service");
var health_controller_1 = require("./health/health.controller");
var messaging_module_1 = require("./messaging/messaging.module");
var course_module_1 = require("./course/course.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(request_context_middleware_1.RequestContextMiddleware).forRoutes('*');
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule, messaging_module_1.MessagingModule, course_module_1.CourseModule],
            controllers: [health_controller_1.HealthController, employees_controller_1.EmployeesController],
            providers: [
                app_logger_service_1.AppLogger,
                employees_service_1.EmployeesService,
                { provide: core_1.APP_INTERCEPTOR, useClass: http_logging_interceptor_1.HttpLoggingInterceptor },
                { provide: core_1.APP_FILTER, useClass: all_exceptions_filter_1.AllExceptionsFilter },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
