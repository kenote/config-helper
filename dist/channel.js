"use strict";
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
exports.accessNavs = exports.getChannelId = void 0;
var Channel = (function () {
    function Channel(channel) {
        this.__channelNavs = initMaps(channel.navs);
    }
    Channel.prototype.find = function (index, navs) {
        var e_1, _a;
        if (navs === void 0) { navs = this.__channelNavs; }
        var __nav;
        try {
            for (var navs_1 = __values(navs), navs_1_1 = navs_1.next(); !navs_1_1.done; navs_1_1 = navs_1.next()) {
                var nav = navs_1_1.value;
                if (nav.index === index) {
                    __nav = nav;
                    return __nav;
                }
                else if (nav.children) {
                    __nav = this.find(index, nav.children);
                    if (__nav)
                        return __nav;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (navs_1_1 && !navs_1_1.done && (_a = navs_1.return)) _a.call(navs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return __nav;
    };
    return Channel;
}());
exports.default = Channel;
function getChannelId(channels, routePath) {
    var e_2, _a;
    try {
        for (var channels_1 = __values(channels), channels_1_1 = channels_1.next(); !channels_1_1.done; channels_1_1 = channels_1.next()) {
            var channel = channels_1_1.value;
            if (routePath.replace(/^\/|\/$/g, '') === channel.label) {
                return channel.id;
            }
            if (channel.navs) {
                var __channelId = findChannelId(channel.navs, channel.id, routePath);
                if (__channelId > -1) {
                    return __channelId;
                }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (channels_1_1 && !channels_1_1.done && (_a = channels_1.return)) _a.call(channels_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return -1;
}
exports.getChannelId = getChannelId;
function accessNavs(navs, access) {
    navs.forEach(function (nav) {
        var children = nav.children;
        if (children) {
            nav.children = accessNavs(children, access);
        }
        else {
            nav.disabled = access && access.indexOf(nav.index) === -1;
        }
    });
    return navs;
}
exports.accessNavs = accessNavs;
function initMaps(navs, maps) {
    if (maps === void 0) { maps = []; }
    navs.forEach(function (nav, __v) {
        var index = nav.index, name = nav.name;
        nav.maps = __spread(maps);
        nav.maps.push({ index: index, name: name, __v: __v });
        if (nav.children) {
            return initMaps(nav.children, nav.maps);
        }
    });
    return navs;
}
function findChannelId(navs, id, routePath) {
    var e_3, _a;
    var __id = -1;
    try {
        for (var navs_2 = __values(navs), navs_2_1 = navs_2.next(); !navs_2_1.done; navs_2_1 = navs_2.next()) {
            var nav = navs_2_1.value;
            if (nav.children) {
                var __currentNav = nav.children.find(function (o) { return o.index === routePath; });
                if (__currentNav) {
                    return id;
                }
                else {
                    __id = findChannelId(nav.children, id, routePath);
                }
            }
            else if (nav.index === routePath) {
                return id;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (navs_2_1 && !navs_2_1.done && (_a = navs_2.return)) _a.call(navs_2);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return __id;
}
