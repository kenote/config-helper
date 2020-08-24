"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useError = void 0;
var util = require("util");
function useError(__ErrorCode, __ErrorMessage, start) {
    if (start === void 0) { start = 1000; }
    var CustomError = function (e) { return e.code && e.code >= start; };
    var ErrorInfo = function (code, opts, json) {
        var info = { code: code };
        for (var e in __ErrorCode) {
            if (__ErrorCode[e] === code) {
                info.message = __ErrorMessage[e];
                break;
            }
        }
        if (Array.isArray(opts)) {
            opts.splice(0, 0, info.message);
            info.message = util.format.apply(util, __spread([opts[0]], opts.slice(1)));
        }
        if (json)
            return info;
        var error = new Error(info.message);
        error.code = info.code;
        return error;
    };
    return { __ErrorCode: __ErrorCode, __ErrorMessage: __ErrorMessage, CustomError: CustomError, ErrorInfo: ErrorInfo };
}
exports.useError = useError;
