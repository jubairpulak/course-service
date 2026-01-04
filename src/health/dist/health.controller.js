"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HealthController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var HealthController = /** @class */ (function () {
    function HealthController() {
    }
    HealthController.prototype.health = function () {
        return {
            status: 'ok',
            service: 'employee-service',
            timestamp: new Date().toISOString(),
            name: "jubair "
        };
    };
    __decorate([
        common_1.Get(),
        swagger_1.ApiOkResponse({
            description: 'Auth service health check',
            schema: {
                example: {
                    status: 'ok',
                    service: 'employee-service',
                    timestamp: '2025-12-31T04:55:00.000Z',
                    name: "jubair "
                }
            }
        })
    ], HealthController.prototype, "health");
    HealthController = __decorate([
        swagger_1.ApiTags('Health'),
        common_1.Controller('health')
    ], HealthController);
    return HealthController;
}());
exports.HealthController = HealthController;
