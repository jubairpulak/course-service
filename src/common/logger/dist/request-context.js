"use strict";
exports.__esModule = true;
exports.RequestContextStore = void 0;
var node_async_hooks_1 = require("node:async_hooks");
var als = new node_async_hooks_1.AsyncLocalStorage();
exports.RequestContextStore = {
    run: function (ctx, fn) {
        return als.run(ctx, fn);
    },
    get: function () {
        var _a;
        return (_a = als.getStore()) !== null && _a !== void 0 ? _a : {};
    }
};
