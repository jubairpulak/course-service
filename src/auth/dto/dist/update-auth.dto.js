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
exports.__esModule = true;
exports.UpdateAuthDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var create_auth_dto_1 = require("./create-auth.dto");
var UpdateAuthDto = /** @class */ (function (_super) {
    __extends(UpdateAuthDto, _super);
    function UpdateAuthDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateAuthDto;
}(swagger_1.PartialType(create_auth_dto_1.CreateAuthDto)));
exports.UpdateAuthDto = UpdateAuthDto;
