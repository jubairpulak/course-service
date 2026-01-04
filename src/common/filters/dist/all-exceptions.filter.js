"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AllExceptionsFilter = void 0;
var common_1 = require("@nestjs/common");
var library_1 = require("@prisma/client/runtime/library");
var AllExceptionsFilter = /** @class */ (function () {
    function AllExceptionsFilter() {
    }
    AllExceptionsFilter.prototype["catch"] = function (err, host) {
        var _a;
        var ctx = host.switchToHttp();
        var res = ctx.getResponse();
        var req = ctx.getRequest();
        var requestId = req.headers['x-request-id'];
        var timestamp = new Date().toISOString();
        /* ------------------ 1) Nest HTTP exceptions ------------------ */
        if (err instanceof common_1.HttpException) {
            return res.status(err.getStatus()).json({
                statusCode: err.getStatus(),
                error: err.getResponse(),
                path: req.originalUrl,
                requestId: requestId,
                timestamp: timestamp
            });
        }
        /* ------------------ 2) Prisma known errors ------------------ */
        if (err instanceof library_1.PrismaClientKnownRequestError) {
            // P2002 = unique constraint
            if (err.code === 'P2002') {
                var target = (_a = err.meta) === null || _a === void 0 ? void 0 : _a.target;
                var fields = Array.isArray(target) ? target : typeof target === 'string' ? [target] : undefined;
                return res.status(common_1.HttpStatus.CONFLICT).json({
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: 'Duplicate value',
                    fields: fields,
                    code: err.code,
                    path: req.originalUrl,
                    requestId: requestId,
                    timestamp: timestamp
                });
            }
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Database error',
                code: err.code,
                meta: err.meta,
                path: req.originalUrl,
                requestId: requestId,
                timestamp: timestamp
            });
        }
        /* ------------------ 3) Prisma validation ------------------ */
        if (err instanceof library_1.PrismaClientValidationError) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Invalid database query',
                path: req.originalUrl,
                requestId: requestId,
                timestamp: timestamp
            });
        }
        /* ------------------ 4) Prisma init error ------------------ */
        if (err instanceof library_1.PrismaClientInitializationError) {
            return res.status(common_1.HttpStatus.SERVICE_UNAVAILABLE).json({
                statusCode: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                message: 'Database unavailable',
                path: req.originalUrl,
                requestId: requestId,
                timestamp: timestamp
            });
        }
        /* ------------------ 5) Fallback ------------------ */
        var msg = err instanceof Error ? err.message : 'Internal server error';
        return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message: msg,
            path: req.originalUrl,
            requestId: requestId,
            timestamp: timestamp
        });
    };
    AllExceptionsFilter = __decorate([
        common_1.Catch()
    ], AllExceptionsFilter);
    return AllExceptionsFilter;
}());
exports.AllExceptionsFilter = AllExceptionsFilter;
