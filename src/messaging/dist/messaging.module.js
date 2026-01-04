"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessagingModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var rabbitmq_publisher_1 = require("./rabbitmq/rabbitmq.publisher");
var rabbitmq_subscriber_1 = require("./rabbitmq/rabbitmq.subscriber");
var employees_module_1 = require("src/employees/employees.module");
var employees_service_1 = require("src/employees/employees.service");
var MessagingModule = /** @class */ (function () {
    function MessagingModule() {
    }
    MessagingModule = __decorate([
        common_1.Module({
            imports: [config_1.ConfigModule, employees_module_1.EmployeesModule],
            providers: [rabbitmq_publisher_1.RabbitPublisher, rabbitmq_subscriber_1.RabbitSubscriber, employees_service_1.EmployeesService],
            exports: [rabbitmq_publisher_1.RabbitPublisher]
        })
    ], MessagingModule);
    return MessagingModule;
}());
exports.MessagingModule = MessagingModule;
