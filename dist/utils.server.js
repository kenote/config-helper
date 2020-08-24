"use strict";
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
exports.Deploy = exports.debug = exports.pickFiles = exports.loadData = void 0;
var path = require("path");
var fs = require("fs-extra");
var yaml = require("js-yaml");
var validator_1 = require("validator");
var lodash_1 = require("lodash");
var weblog = require("webpack-log");
var colors = require("colors");
var util = require("util");
var glob = require("glob");
var async = require("async");
function loadDataFile(file, options) {
    if (options === void 0) { options = {}; }
    var filePath = path.resolve(options.root || process.cwd(), file);
    var __data = {};
    if (!fs.existsSync(filePath))
        return __data;
    if (!/^\.(json|yaml|yml)$/.test(path.extname(filePath)))
        return __data;
    var filrStr = fs.readFileSync(filePath, 'utf-8');
    if (options.assign) {
        lodash_1.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
        filrStr = lodash_1.template(filrStr)(options.assign);
    }
    if (validator_1.default.isJSON(filrStr)) {
        __data = JSON.parse(filrStr);
    }
    else {
        try {
            __data = yaml.load(filrStr);
        }
        catch (error) {
        }
    }
    return __data;
}
function loadData(file, type, options) {
    var e_1, _a;
    if (type === void 0) { type = false; }
    if (options === void 0) { options = {}; }
    var filePath = path.resolve(options.root || process.cwd(), file);
    var __data = type === 'array' ? [] : {};
    if (!fs.existsSync(filePath))
        return __data;
    var fileStat = fs.statSync(filePath);
    if (fileStat.isFile())
        return loadDataFile(file, options);
    if (fileStat.isDirectory()) {
        var files = fs.readdirSync(filePath).filter(function (o) { return /\.(json|yaml|yml)$/.test(o); });
        try {
            for (var _b = __values(dataFileSort(files)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                var itemdata = loadDataFile(path.resolve(filePath, item), options);
                if (type === 'array') {
                    __data.push(itemdata);
                }
                else {
                    __data = __assign(__assign({}, __data), itemdata);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return __data;
}
exports.loadData = loadData;
function dataFileSort(files) {
    var reg = /^(\S+)\.(default)\.(json|yaml|yml)$/;
    files = files.sort(function (a, b) { return a.replace(reg, '0$1.$3') > b.replace(reg, '0$1.$3') ? 1 : -1; });
    var reg_release = /^(\S+)\.(release)\.(json|yaml|yml)$/;
    var absolute_release = /^(release)\.(json|yaml|yml)$/;
    var files_arr1 = files.filter(function (name) { return !reg_release.test(name); });
    var files_arr2 = files.filter(function (name) { return reg_release.test(name) && !absolute_release.test(name); });
    var files_arr3 = files.filter(function (name) { return absolute_release.test(name); });
    return __spread(files_arr1, files_arr2, files_arr3);
}
function pickFiles(patterns, options) {
    return new Promise(function (resolve, reject) {
        async.map(patterns, function (pattern, next) {
            glob(pattern, options, next);
        }, function (err, results) {
            if (err) {
                reject(err);
            }
            else {
                var files = (results || []).reduce(function (files, item) { return files.concat(item); });
                resolve(files);
            }
        });
    });
}
exports.pickFiles = pickFiles;
function debug(name, isweblog) {
    var log;
    return {
        info: function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            var test = util.format.apply(util, __spread([message], optionalParams));
            if (isweblog) {
                log = weblog({ name: name + ":info" });
                log.info(colors.green(test));
            }
            else {
                console.log(colors.green(("[" + name + ":info]").toLocaleUpperCase()), test);
            }
        },
        warn: function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            var test = util.format.apply(util, __spread([message], optionalParams));
            if (isweblog) {
                log = weblog({ name: name + ":warn" });
                log.info(colors.yellow(test));
            }
            else {
                console.log(colors.yellow(("[" + name + ":warn]").toLocaleUpperCase()), test);
            }
        },
        error: function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            var test = util.format.apply(util, __spread([message], optionalParams));
            if (isweblog) {
                log = weblog({ name: name + ":error" });
                log.info(colors.red(test));
            }
            else {
                console.log(colors.red(("[" + name + ":error]").toLocaleUpperCase()), test);
            }
        }
    };
}
exports.debug = debug;
var deploy_1 = require("./deploy");
Object.defineProperty(exports, "Deploy", { enumerable: true, get: function () { return deploy_1.default; } });
