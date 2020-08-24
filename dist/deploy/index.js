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
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
var urlParseLax = require("url-parse-lax");
var path = require("path");
var chalk_1 = require("chalk");
var lodash_1 = require("lodash");
var utils_server_1 = require("../utils.server");
var ssh_1 = require("./ssh");
var sftp_1 = require("./sftp");
var ftp_1 = require("./ftp");
exports.log = utils_server_1.debug('deploy');
var Deploy = (function () {
    function Deploy() {
    }
    Deploy.prototype.command = function (setting) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, cmd, config, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connect = setting.connect, cmd = setting.command;
                        config = serverInfo(connect);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, new ssh_1.default(config).exec(cmd.join(' && '))];
                    case 2:
                        _a.sent();
                        exports.log.info('Command execution completed.\n');
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        exports.log.error(error_1.message);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    Deploy.prototype.upload = function (setting, type) {
        if (type === void 0) { type = 'sftp'; }
        return __awaiter(this, void 0, void 0, function () {
            var server, privateKey, cwd, ignore, rules, deployTo, options, status, files, uploadFiles, client, startime, ftpOptions, times, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        server = setting.server, privateKey = setting.privateKey, cwd = setting.workspace, ignore = setting.ignore, rules = setting.rules, deployTo = setting.deployTo;
                        options = serverInfo({ server: server, privateKey: privateKey });
                        status = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4, utils_server_1.pickFiles(setting.patterns || ['**'], { cwd: cwd, nodir: true, realpath: true, ignore: ignore })];
                    case 2:
                        files = _a.sent();
                        uploadFiles = processFiles(files, { workspace: cwd, deployTo: deployTo, rules: rules });
                        client = void 0;
                        startime = Date.now();
                        if (type === 'sftp') {
                            client = new sftp_1.default(options);
                        }
                        else {
                            ftpOptions = __assign(__assign({}, lodash_1.pick(options, ['host', 'port', 'password'])), { user: options.username });
                            client = new ftp_1.default(ftpOptions);
                        }
                        return [4, client.connect()];
                    case 3:
                        _a.sent();
                        exports.log.info('');
                        exports.log.info('Processing Upload queue ...');
                        exports.log.info('\n');
                        return [4, upload(client, uploadFiles)];
                    case 4:
                        _a.sent();
                        client.end();
                        times = (Date.now() - startime) / 1000;
                        console.log('');
                        exports.log.info("Times: " + times + "s  Files: " + files.length);
                        exports.log.info("Upload Completed.\n");
                        return [2, true];
                    case 5:
                        error_2 = _a.sent();
                        exports.log.error(error_2.message);
                        return [3, 6];
                    case 6: return [2, status];
                }
            });
        });
    };
    return Deploy;
}());
exports.default = Deploy;
function upload(client, files) {
    return __awaiter(this, void 0, void 0, function () {
        var file, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (files.length == 0)
                        return [2];
                    file = files.shift();
                    if (!file) return [3, 6];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4, client.upload(file)];
                case 2:
                    _a.sent();
                    file && success(file);
                    if (!(files.length > 0)) return [3, 4];
                    return [4, upload(client, files)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3, 6];
                case 5:
                    error_3 = _a.sent();
                    file && failure(file);
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
}
function success(file) {
    var desc = chalk_1.default.cyan(file.filename + " " + chalk_1.default.white('===>') + " " + file.dest);
    console.log(chalk_1.default.greenBright('upload success :'), desc);
}
function failure(file) {
    var desc = chalk_1.default.yellow(file.filename + " " + chalk_1.default.white('===>') + " " + file.dest);
    console.log(chalk_1.default.redBright('upload failure :'), desc);
}
function processFiles(files, options) {
    var workspace = options.workspace, deployTo = options.deployTo, rules = options.rules;
    return files.map(function (item) {
        var filename = item.replace(new RegExp("^(" + workspace + ")"), '');
        var filepath = item;
        var dest = path.join(deployTo || '/home', filename);
        var file = { filename: filename, filepath: filepath, dest: dest };
        rules && rules.forEach(function (rule) {
            customDest(file, rule, deployTo);
        });
        return file;
    });
}
function customDest(file, rule, root) {
    if (root === void 0) { root = ''; }
    var pattern = rule.test;
    var matched = file.filepath.match(pattern);
    if (matched) {
        file.dest = rule.dest.replace(/\[\$(\d+)\]/g, function (m, idx) { return matched[idx]; });
        file.dest = path.join(root || '/home', file.dest);
    }
}
function serverInfo(connect) {
    var server = connect.server, privateKey = connect.privateKey;
    var _a = urlParseLax(server), hostname = _a.hostname, port = _a.port, slashes = _a.slashes, auth = _a.auth, protocol = _a.protocol;
    var config = { privateKey: privateKey };
    if (hostname)
        config.host = hostname;
    if (port)
        config.port = Number(port);
    if (slashes) {
        config.username = auth;
    }
    else {
        config.username = (protocol && protocol.replace(/(\:)$/, ''));
        config.password = auth;
    }
    return config;
}
