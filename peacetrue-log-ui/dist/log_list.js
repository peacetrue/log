(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("iview"), require("peacetrue-iview/src/components/page-table"));
	else if(typeof define === 'function' && define.amd)
		define(["iview", "peacetrue-iview/src/components/page-table"], factory);
	else if(typeof exports === 'object')
		exports["LogList"] = factory(require("iview"), require("peacetrue-iview/src/components/page-table"));
	else
		root["LogList"] = factory(root["iview"], root["PeaceIview"]["PageTable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_iview_dist_iview__, __WEBPACK_EXTERNAL_MODULE_peacetrue_iview_src_components_page_table__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/log_list.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/peacetrue-iview/src/components/detail/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/peacetrue-iview/src/components/detail/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**详情容器*/
let Detail = {
    name: 'detail',
    props: {
        data: {type: Object},
        labelSpan: {type: Number, default: 4},
        valueSpan: {type: Number, default: 8},
        showClose: {type: Boolean, default: true},
        defaultValue: {default: '--'}
    },
    provide() {
        return {
            $_detail_data: this.data,
            $_detail_labelSpan: this.labelSpan,
            $_detail_valueSpan: this.valueSpan,
            $_detail_defaultValue: this.defaultValue,
        };
    },
    template: `<div class="detail">
                 <slot></slot>
                 <slot name="close" v-if="showClose">
                    <div class="detail-close">
                        <i-button @click="window.close()">关闭</i-button>
                    </div>
                 </slot>
              </div>`
};

let childComponentMixIn = {
    props: {
        data: {type: Object, default() {return this.$_detail_data}},
        name: {type: String,},
        defaultValue: {default() {return this.$_detail_defaultValue}},
        value: {
            default() {
                if (this.data && this.name) {
                    return (window.jsonpath
                        ? jsonpath.value(this.data, `$.${this.name}`)
                        : this.data[this.name])
                        || this.defaultValue;
                }
            }
        }
    },
    inject: ['$_detail_data', '$_detail_labelSpan', '$_detail_valueSpan', '$_detail_defaultValue'],
};

/**详情展开*/
let DetailHeader = {
    name: 'detail-header',
    template: '<div :class="className"><slot></slot></div>',
    props: {
        size: {type: Number, default: 1},
    },
    computed: {
        className() {
            return ['detail-header', 'detail-header-' + this.size].join(' ');
        }
    }
};

/**详情项*/
let DetailItem = {
    name: 'detail-item',
    mixins: [childComponentMixIn],
    props: {
        label: {type: String, required: true},
        labelSpan: {type: Number, default() {return this.$_detail_labelSpan}},
        value: {type: [String, Boolean, Number], default: childComponentMixIn.props.value.default},
        valueSpan: {type: Number, default() {return this.$_detail_valueSpan}},
    },
    template: `<div>
                    <i-col class="detail-item-label" :span="labelSpan">{{label}}</i-col>
                    <i-col class="detail-item-value" :span="valueSpan"><slot>{{value}}</slot></i-col>
                </div>`
};

/**详情表格*/
let DetailTable = {
    name: 'detail-table',
    mixins: [childComponentMixIn],
    props: {
        label: {type: Object, required: true},
        value: {type: Array, default: childComponentMixIn.props.value.default}
    },
    inject: ['$_detail_data'],
    template: '<i-table v-bind="label" v-bind:data="value"></i-table>'
};

module.exports = {
    Detail, DetailHeader, DetailItem, DetailTable
};

/***/ }),

/***/ "./node_modules/vue-json-pretty/vue-json-pretty.js":
/*!*********************************************************!*\
  !*** ./node_modules/vue-json-pretty/vue-json-pretty.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (e, t) { true ? module.exports = t() : undefined}("undefined" != typeof self ? self : this, function () {
    return function (e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {i: r, l: !1, exports: {}};
            return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
        }

        var n = {};
        return t.m = e, t.c = n, t.d = function (e, n, r) {t.o(e, n) || Object.defineProperty(e, n, {configurable: !1, enumerable: !0, get: r})}, t.n = function (e) {
            var n = e && e.__esModule ? function () {return e.default} : function () {return e};
            return t.d(n, "a", n), n
        }, t.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t)}, t.p = "", t(t.s = 39)
    }([function (e, t) {
        var n = e.exports = {version: "2.6.5"};
        "number" == typeof __e && (__e = n)
    }, function (e, t, n) {
        var r = n(25)("wks"), o = n(27), i = n(3).Symbol, s = "function" == typeof i;
        (e.exports = function (e) {return r[e] || (r[e] = s && i[e] || (s ? i : o)("Symbol." + e))}).store = r
    }, function (e, t) {
        e.exports = function (e, t, n, r, o, i) {
            var s, a = e = e || {}, c = typeof e.default;
            "object" !== c && "function" !== c || (s = e, a = e.default);
            var u = "function" == typeof a ? a.options : a;
            t && (u.render = t.render, u.staticRenderFns = t.staticRenderFns, u._compiled = !0), n && (u.functional = !0), o && (u._scopeId = o);
            var l;
            if (i ? (l = function (e) {e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, e || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), r && r.call(this, e), e && e._registeredComponents && e._registeredComponents.add(i)}, u._ssrRegister = l) : r && (l = r), l) {
                var f = u.functional, p = f ? u.render : u.beforeCreate;
                f ? (u._injectStyles = l, u.render = function (e, t) {return l.call(t), p(e, t)}) : u.beforeCreate = p ? [].concat(p, l) : [l]
            }
            return {esModule: s, exports: a, options: u}
        }
    }, function (e, t) {
        var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n)
    }, function (e, t, n) {
        var r = n(3), o = n(0), i = n(19), s = n(5), a = n(10), c = function (e, t, n) {
            var u, l, f, p = e & c.F, d = e & c.G, h = e & c.S, v = e & c.P, b = e & c.B, m = e & c.W, y = d ? o : o[t] || (o[t] = {}), g = y.prototype, x = d ? r : h ? r[t] : (r[t] || {}).prototype;
            d && (n = t);
            for (u in n) (l = !p && x && void 0 !== x[u]) && a(y, u) || (f = l ? x[u] : n[u], y[u] = d && "function" != typeof x[u] ? n[u] : b && l ? i(f, r) : m && x[u] == f ? function (e) {
                var t = function (t, n, r) {
                    if (this instanceof e) {
                        switch (arguments.length) {
                            case 0:
                                return new e;
                            case 1:
                                return new e(t);
                            case 2:
                                return new e(t, n)
                        }
                        return new e(t, n, r)
                    }
                    return e.apply(this, arguments)
                };
                return t.prototype = e.prototype, t
            }(f) : v && "function" == typeof f ? i(Function.call, f) : f, v && ((y.virtual || (y.virtual = {}))[u] = f, e & c.R && g && !g[u] && s(g, u, f)))
        };
        c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
    }, function (e, t, n) {
        var r = n(6), o = n(13);
        e.exports = n(8) ? function (e, t, n) {return r.f(e, t, o(1, n))} : function (e, t, n) {return e[t] = n, e}
    }, function (e, t, n) {
        var r = n(7), o = n(44), i = n(45), s = Object.defineProperty;
        t.f = n(8) ? Object.defineProperty : function (e, t, n) {
            if (r(e), t = i(t, !0), r(n), o) try {return s(e, t, n)} catch (e) {}
            if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
            return "value" in n && (e[t] = n.value), e
        }
    }, function (e, t, n) {
        var r = n(12);
        e.exports = function (e) {
            if (!r(e)) throw TypeError(e + " is not an object!");
            return e
        }
    }, function (e, t, n) {e.exports = !n(9)(function () {return 7 != Object.defineProperty({}, "a", {get: function () {return 7}}).a})}, function (e, t) {e.exports = function (e) {try {return !!e()} catch (e) {return !0}}}, function (e, t) {
        var n = {}.hasOwnProperty;
        e.exports = function (e, t) {return n.call(e, t)}
    }, function (e, t, n) {
        var r = n(15);
        e.exports = function (e) {return Object(r(e))}
    }, function (e, t) {e.exports = function (e) {return "object" == typeof e ? null !== e : "function" == typeof e}}, function (e, t) {e.exports = function (e, t) {return {enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t}}}, function (e, t, n) {
        var r = n(47), o = n(28);
        e.exports = Object.keys || function (e) {return r(e, o)}
    }, function (e, t) {
        e.exports = function (e) {
            if (void 0 == e) throw TypeError("Can't call method on  " + e);
            return e
        }
    }, function (e, t) {
        var n = Math.ceil, r = Math.floor;
        e.exports = function (e) {return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)}
    }, function (e, t, n) {
        var r = n(25)("keys"), o = n(27);
        e.exports = function (e) {return r[e] || (r[e] = o(e))}
    }, function (e, t) {e.exports = {}}, function (e, t, n) {
        var r = n(43);
        e.exports = function (e, t, n) {
            if (r(e), void 0 === t) return e;
            switch (n) {
                case 1:
                    return function (n) {return e.call(t, n)};
                case 2:
                    return function (n, r) {return e.call(t, n, r)};
                case 3:
                    return function (n, r, o) {return e.call(t, n, r, o)}
            }
            return function () {return e.apply(t, arguments)}
        }
    }, function (e, t, n) {
        var r = n(12), o = n(3).document, i = r(o) && r(o.createElement);
        e.exports = function (e) {return i ? o.createElement(e) : {}}
    }, function (e, t, n) {
        var r = n(22), o = n(15);
        e.exports = function (e) {return r(o(e))}
    }, function (e, t, n) {
        var r = n(23);
        e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {return "String" == r(e) ? e.split("") : Object(e)}
    }, function (e, t) {
        var n = {}.toString;
        e.exports = function (e) {return n.call(e).slice(8, -1)}
    }, function (e, t, n) {
        var r = n(16), o = Math.min;
        e.exports = function (e) {return e > 0 ? o(r(e), 9007199254740991) : 0}
    }, function (e, t, n) {
        var r = n(0), o = n(3), i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
        (e.exports = function (e, t) {return i[e] || (i[e] = void 0 !== t ? t : {})})("versions", []).push({version: r.version, mode: n(26) ? "pure" : "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)"})
    }, function (e, t) {e.exports = !0}, function (e, t) {
        var n = 0, r = Math.random();
        e.exports = function (e) {return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))}
    }, function (e, t) {e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")}, function (e, t, n) {
        "use strict";
        var r = n(53), o = n.n(r), i = n(31), s = n.n(i), a = n(75), c = n(77), u = n(79), l = n(81), f = n(83), p = n(33);
        t.a = {
            name: "vue-json-pretty",
            components: {SimpleText: a.a, VueCheckbox: c.a, VueRadio: u.a, BracketsLeft: l.a, BracketsRight: f.a},
            props: {
                data: {},
                deep: {type: Number, default: 1 / 0},
                showLength: {type: Boolean, default: !1},
                showDoubleQuotes: {type: Boolean, default: !0},
                path: {type: String, default: "root"},
                selectableType: {type: String, default: ""},
                showSelectController: {type: Boolean, default: !1},
                showLine: {type: Boolean, default: !0},
                selectOnClickNode: {type: Boolean, default: !0},
                value: {type: [Array, String], default: function () {return ""}},
                pathSelectable: {type: Function, default: function () {return !0}},
                highlightMouseoverNode: {type: Boolean, default: !1},
                highlightSelectedNode: {type: Boolean, default: !0},
                parentData: {},
                currentDeep: {type: Number, default: 1},
                currentKey: [Number, String]
            },
            data: function () {return {visible: this.currentDeep <= this.deep, isMouseover: !1, currentCheckboxVal: !!Array.isArray(this.value) && this.value.includes(this.path)}},
            computed: {
                model: {
                    get: function () {
                        var e = "multiple" === this.selectableType ? [] : "single" === this.selectableType ? "" : null;
                        return this.value || e
                    }, set: function (e) {this.$emit("input", e)}
                },
                lastKey: function () {
                    if (Array.isArray(this.parentData)) return this.parentData.length - 1;
                    if (this.isObject(this.parentData)) {
                        var e = s()(this.parentData);
                        return e[e.length - 1]
                    }
                },
                notLastKey: function () {return this.currentKey !== this.lastKey},
                selectable: function () {return this.pathSelectable(this.path, this.data) && (this.isMultiple || this.isSingle)},
                isMultiple: function () {return "multiple" === this.selectableType},
                isSingle: function () {return "single" === this.selectableType},
                isSelected: function () {return this.isMultiple ? this.model.includes(this.path) : !!this.isSingle && this.model === this.path},
                propsError: function () {return !this.selectableType || this.selectOnClickNode || this.showSelectController ? "" : "When selectableType is not null, selectOnClickNode and showSelectController cannot be false at the same time, because this will cause the selection to fail."}
            },
            methods: {
                handleClick: function (e) {
                    var t = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                    if (this.$emit("click", this.path, this.data), this.selectable) if (this.isMultiple && ("checkbox" === n || this.selectOnClickNode && "tree" === n)) {
                        var r = this.model.findIndex(function (e) {return e === t.path}), i = [].concat(o()(this.model));
                        -1 !== r ? this.model.splice(r, 1) : this.model.push(this.path), "checkbox" !== n && (this.currentCheckboxVal = !this.currentCheckboxVal), this.$emit("change", this.model, i)
                    } else if (this.isSingle && ("radio" === n || this.selectOnClickNode && "tree" === n) && this.model !== this.path) {
                        var s = this.model, a = this.path;
                        this.model = a, this.$emit("change", a, s)
                    }
                },
                handleItemClick: function (e, t) {this.$emit("click", e, t)},
                handleItemChange: function (e, t) {this.selectable && this.$emit("change", e, t)},
                handleMouseover: function () {this.highlightMouseoverNode && (this.selectable || "" === this.selectableType) && (this.isMouseover = !0)},
                handleMouseout: function () {this.highlightMouseoverNode && (this.selectable || "" === this.selectableType) && (this.isMouseover = !1)},
                isObject: function (e) {return "object" === Object(p.a)(e)},
                keyFormatter: function (e) {return this.showDoubleQuotes ? '"' + e + '"' : e}
            },
            errorCaptured: function () {return !1},
            watch: {deep: function (e) {this.visible = this.currentDeep <= e}, propsError: {handler: function (e) {if (e) throw new Error("[vue-json-pretty] " + e)}, immediate: !0}}
        }
    }, function (e, t, n) {
        var r = n(6).f, o = n(10), i = n(1)("toStringTag");
        e.exports = function (e, t, n) {e && !o(e = n ? e : e.prototype, i) && r(e, i, {configurable: !0, value: t})}
    }, function (e, t, n) {e.exports = {default: n(72), __esModule: !0}}, function (e, t, n) {
        "use strict";
        var r = n(33);
        t.a = {
            props: {showDoubleQuotes: Boolean, parentData: {}, data: {}, showComma: Boolean, currentKey: [Number, String]},
            computed: {dataType: function () {return Object(r.a)(this.data)}, parentDataType: function () {return Object(r.a)(this.parentData)}},
            methods: {
                textFormatter: function (e) {
                    var t = e + "";
                    return "string" === this.dataType && (t = '"' + t + '"'), this.showComma && (t += ","), t
                }
            }
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()}

        t.a = r
    }, function (e, t, n) {
        "use strict";
        t.a = {props: {value: {type: Boolean, default: !1}}, data: function () {return {focus: !1}}, computed: {model: {get: function () {return this.value}, set: function (e) {this.$emit("input", e)}}}}
    }, function (e, t, n) {
        "use strict";
        t.a = {
            props: {path: String, value: {type: String, default: ""}},
            data: function () {return {focus: !1}},
            computed: {currentPath: function () {return this.path}, model: {get: function () {return this.value}, set: function (e) {this.$emit("input", e)}}},
            methods: {test: function () {this.$emit("change", this.model)}}
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(31), o = n.n(r), i = n(37);
        t.a = {
            mixins: [i.a], props: {showLength: Boolean}, methods: {
                closedBracketsGenerator: function (e) {
                    var t = Array.isArray(e) ? "[...]" : "{...}";
                    return this.bracketsFormatter(t)
                }, lengthGenerator: function (e) {return " // " + (Array.isArray(e) ? e.length + " items" : o()(e).length + " keys")}
            }
        }
    }, function (e, t, n) {
        "use strict";
        t.a = {
            props: {visible: {required: !0, type: Boolean}, data: {required: !0}, showComma: Boolean},
            computed: {dataVisiable: {get: function () {return this.visible}, set: function (e) {this.$emit("update:visible", e)}}},
            methods: {toggleBrackets: function () {this.dataVisiable = !this.dataVisiable}, bracketsFormatter: function (e) {return this.showComma ? e + "," : e}}
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(37);
        t.a = {mixins: [r.a]}
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(40), o = n.n(r), i = n(52), s = n(86);
        n.n(s);
        t.default = o()({}, i.a, {version: "1.6.0"})
    }, function (e, t, n) {e.exports = {default: n(41), __esModule: !0}}, function (e, t, n) {n(42), e.exports = n(0).Object.assign}, function (e, t, n) {
        var r = n(4);
        r(r.S + r.F, "Object", {assign: n(46)})
    }, function (e, t) {
        e.exports = function (e) {
            if ("function" != typeof e) throw TypeError(e + " is not a function!");
            return e
        }
    }, function (e, t, n) {e.exports = !n(8) && !n(9)(function () {return 7 != Object.defineProperty(n(20)("div"), "a", {get: function () {return 7}}).a})}, function (e, t, n) {
        var r = n(12);
        e.exports = function (e, t) {
            if (!r(e)) return e;
            var n, o;
            if (t && "function" == typeof (n = e.toString) && !r(o = n.call(e))) return o;
            if ("function" == typeof (n = e.valueOf) && !r(o = n.call(e))) return o;
            if (!t && "function" == typeof (n = e.toString) && !r(o = n.call(e))) return o;
            throw TypeError("Can't convert object to primitive value")
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(14), o = n(50), i = n(51), s = n(11), a = n(22), c = Object.assign;
        e.exports = !c || n(9)(function () {
            var e = {}, t = {}, n = Symbol(), r = "abcdefghijklmnopqrst";
            return e[n] = 7, r.split("").forEach(function (e) {t[e] = e}), 7 != c({}, e)[n] || Object.keys(c({}, t)).join("") != r
        }) ? function (e, t) {
            for (var n = s(e), c = arguments.length, u = 1, l = o.f, f = i.f; c > u;) for (var p, d = a(arguments[u++]), h = l ? r(d).concat(l(d)) : r(d), v = h.length, b = 0; v > b;) f.call(d, p = h[b++]) && (n[p] = d[p]);
            return n
        } : c
    }, function (e, t, n) {
        var r = n(10), o = n(21), i = n(48)(!1), s = n(17)("IE_PROTO");
        e.exports = function (e, t) {
            var n, a = o(e), c = 0, u = [];
            for (n in a) n != s && r(a, n) && u.push(n);
            for (; t.length > c;) r(a, n = t[c++]) && (~i(u, n) || u.push(n));
            return u
        }
    }, function (e, t, n) {
        var r = n(21), o = n(24), i = n(49);
        e.exports = function (e) {
            return function (t, n, s) {
                var a, c = r(t), u = o(c.length), l = i(s, u);
                if (e && n != n) {for (; u > l;) if ((a = c[l++]) != a) return !0} else for (; u > l; l++) if ((e || l in c) && c[l] === n) return e || l || 0;
                return !e && -1
            }
        }
    }, function (e, t, n) {
        var r = n(16), o = Math.max, i = Math.min;
        e.exports = function (e, t) {return e = r(e), e < 0 ? o(e + t, 0) : i(e, t)}
    }, function (e, t) {t.f = Object.getOwnPropertySymbols}, function (e, t) {t.f = {}.propertyIsEnumerable}, function (e, t, n) {
        "use strict";
        var r = n(29), o = n(85), i = n(2), s = i(r.a, o.a, !1, null, null, null);
        t.a = s.exports
    }, function (e, t, n) {
        "use strict";
        t.__esModule = !0;
        var r = n(54), o = function (e) {return e && e.__esModule ? e : {default: e}}(r);
        t.default = function (e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return (0, o.default)(e)
        }
    }, function (e, t, n) {e.exports = {default: n(55), __esModule: !0}}, function (e, t, n) {n(56), n(65), e.exports = n(0).Array.from}, function (e, t, n) {
        "use strict";
        var r = n(57)(!0);
        n(58)(String, "String", function (e) {this._t = String(e), this._i = 0}, function () {
            var e, t = this._t, n = this._i;
            return n >= t.length ? {value: void 0, done: !0} : (e = r(t, n), this._i += e.length, {value: e, done: !1})
        })
    }, function (e, t, n) {
        var r = n(16), o = n(15);
        e.exports = function (e) {
            return function (t, n) {
                var i, s, a = String(o(t)), c = r(n), u = a.length;
                return c < 0 || c >= u ? e ? "" : void 0 : (i = a.charCodeAt(c), i < 55296 || i > 56319 || c + 1 === u || (s = a.charCodeAt(c + 1)) < 56320 || s > 57343 ? e ? a.charAt(c) : i : e ? a.slice(c, c + 2) : s - 56320 + (i - 55296 << 10) + 65536)
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(26), o = n(4), i = n(59), s = n(5), a = n(18), c = n(60), u = n(30), l = n(64), f = n(1)("iterator"), p = !([].keys && "next" in [].keys()), d = function () {return this};
        e.exports = function (e, t, n, h, v, b, m) {
            c(n, t, h);
            var y, g, x, _ = function (e) {
                if (!p && e in C) return C[e];
                switch (e) {
                    case"keys":
                    case"values":
                        return function () {return new n(this, e)}
                }
                return function () {return new n(this, e)}
            }, j = t + " Iterator", k = "values" == v, w = !1, C = e.prototype, S = C[f] || C["@@iterator"] || v && C[v], O = S || _(v), A = v ? k ? _("entries") : O : void 0, M = "Array" == t ? C.entries || S : S;
            if (M && (x = l(M.call(new e))) !== Object.prototype && x.next && (u(x, j, !0), r || "function" == typeof x[f] || s(x, f, d)), k && S && "values" !== S.name && (w = !0, O = function () {return S.call(this)}), r && !m || !p && !w && C[f] || s(C, f, O), a[t] = O, a[j] = d, v) if (y = {
                values: k ? O : _("values"),
                keys: b ? O : _("keys"),
                entries: A
            }, m) for (g in y) g in C || i(C, g, y[g]); else o(o.P + o.F * (p || w), t, y);
            return y
        }
    }, function (e, t, n) {e.exports = n(5)}, function (e, t, n) {
        "use strict";
        var r = n(61), o = n(13), i = n(30), s = {};
        n(5)(s, n(1)("iterator"), function () {return this}), e.exports = function (e, t, n) {e.prototype = r(s, {next: o(1, n)}), i(e, t + " Iterator")}
    }, function (e, t, n) {
        var r = n(7), o = n(62), i = n(28), s = n(17)("IE_PROTO"), a = function () {}, c = function () {
            var e, t = n(20)("iframe"), r = i.length;
            for (t.style.display = "none", n(63).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; r--;) delete c.prototype[i[r]];
            return c()
        };
        e.exports = Object.create || function (e, t) {
            var n;
            return null !== e ? (a.prototype = r(e), n = new a, a.prototype = null, n[s] = e) : n = c(), void 0 === t ? n : o(n, t)
        }
    }, function (e, t, n) {
        var r = n(6), o = n(7), i = n(14);
        e.exports = n(8) ? Object.defineProperties : function (e, t) {
            o(e);
            for (var n, s = i(t), a = s.length, c = 0; a > c;) r.f(e, n = s[c++], t[n]);
            return e
        }
    }, function (e, t, n) {
        var r = n(3).document;
        e.exports = r && r.documentElement
    }, function (e, t, n) {
        var r = n(10), o = n(11), i = n(17)("IE_PROTO"), s = Object.prototype;
        e.exports = Object.getPrototypeOf || function (e) {return e = o(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? s : null}
    }, function (e, t, n) {
        "use strict";
        var r = n(19), o = n(4), i = n(11), s = n(66), a = n(67), c = n(24), u = n(68), l = n(69);
        o(o.S + o.F * !n(71)(function (e) {Array.from(e)}), "Array", {
            from: function (e) {
                var t, n, o, f, p = i(e), d = "function" == typeof this ? this : Array, h = arguments.length, v = h > 1 ? arguments[1] : void 0, b = void 0 !== v, m = 0, y = l(p);
                if (b && (v = r(v, h > 2 ? arguments[2] : void 0, 2)), void 0 == y || d == Array && a(y)) for (t = c(p.length), n = new d(t); t > m; m++) u(n, m, b ? v(p[m], m) : p[m]); else for (f = y.call(p), n = new d; !(o = f.next()).done; m++) u(n, m, b ? s(f, v, [o.value, m], !0) : o.value);
                return n.length = m, n
            }
        })
    }, function (e, t, n) {
        var r = n(7);
        e.exports = function (e, t, n, o) {
            try {return o ? t(r(n)[0], n[1]) : t(n)} catch (t) {
                var i = e.return;
                throw void 0 !== i && r(i.call(e)), t
            }
        }
    }, function (e, t, n) {
        var r = n(18), o = n(1)("iterator"), i = Array.prototype;
        e.exports = function (e) {return void 0 !== e && (r.Array === e || i[o] === e)}
    }, function (e, t, n) {
        "use strict";
        var r = n(6), o = n(13);
        e.exports = function (e, t, n) {t in e ? r.f(e, t, o(0, n)) : e[t] = n}
    }, function (e, t, n) {
        var r = n(70), o = n(1)("iterator"), i = n(18);
        e.exports = n(0).getIteratorMethod = function (e) {if (void 0 != e) return e[o] || e["@@iterator"] || i[r(e)]}
    }, function (e, t, n) {
        var r = n(23), o = n(1)("toStringTag"), i = "Arguments" == r(function () {return arguments}()), s = function (e, t) {try {return e[t]} catch (e) {}};
        e.exports = function (e) {
            var t, n, a;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = s(t = Object(e), o)) ? n : i ? r(t) : "Object" == (a = r(t)) && "function" == typeof t.callee ? "Arguments" : a
        }
    }, function (e, t, n) {
        var r = n(1)("iterator"), o = !1;
        try {
            var i = [7][r]();
            i.return = function () {o = !0}, Array.from(i, function () {throw 2})
        } catch (e) {}
        e.exports = function (e, t) {
            if (!t && !o) return !1;
            var n = !1;
            try {
                var i = [7], s = i[r]();
                s.next = function () {return {done: n = !0}}, i[r] = function () {return s}, e(i)
            } catch (e) {}
            return n
        }
    }, function (e, t, n) {n(73), e.exports = n(0).Object.keys}, function (e, t, n) {
        var r = n(11), o = n(14);
        n(74)("keys", function () {return function (e) {return o(r(e))}})
    }, function (e, t, n) {
        var r = n(4), o = n(0), i = n(9);
        e.exports = function (e, t) {
            var n = (o.Object || {})[e] || Object[e], s = {};
            s[e] = t(n), r(r.S + r.F * i(function () {n(1)}), "Object", s)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(32), o = n(76), i = n(2), s = i(r.a, o.a, !1, null, null, null);
        t.a = s.exports
    }, function (e, t, n) {
        "use strict";
        var r = function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("div", [e._t("default"), e._v(" "), n("span", {class: "vjs-value vjs-value__" + e.dataType}, [e._v("\n    " + e._s(e.textFormatter(e.data)) + "\n  ")])], 2)
        }, o = [], i = {render: r, staticRenderFns: o};
        t.a = i
    }, function (e, t, n) {
        "use strict";
        var r = n(34), o = n(78), i = n(2), s = i(r.a, o.a, !1, null, null, null);
        t.a = s.exports
    }, function (e, t, n) {
        "use strict";
        var r = function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("label", {class: ["vjs-checkbox", e.value ? "is-checked" : ""], on: {click: function (e) {e.stopPropagation()}}}, [n("span", {staticClass: "vjs-checkbox__inner"}), e._v(" "), n("input", {
                directives: [{name: "model", rawName: "v-model", value: e.model, expression: "model"}],
                staticClass: "vjs-checkbox__original",
                attrs: {type: "checkbox"},
                domProps: {checked: Array.isArray(e.model) ? e._i(e.model, null) > -1 : e.model},
                on: {
                    change: [function (t) {
                        var n = e.model, r = t.target, o = !!r.checked;
                        if (Array.isArray(n)) {
                            var i = e._i(n, null);
                            r.checked ? i < 0 && (e.model = n.concat([null])) : i > -1 && (e.model = n.slice(0, i).concat(n.slice(i + 1)))
                        } else e.model = o
                    }, function (t) {return e.$emit("change", e.model)}], focus: function (t) {e.focus = !0}, blur: function (t) {e.focus = !1}
                }
            })])
        }, o = [], i = {render: r, staticRenderFns: o};
        t.a = i
    }, function (e, t, n) {
        "use strict";
        var r = n(35), o = n(80), i = n(2), s = i(r.a, o.a, !1, null, null, null);
        t.a = s.exports
    }, function (e, t, n) {
        "use strict";
        var r = function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("label", {class: ["vjs-radio", e.model === e.currentPath ? "is-checked" : ""], on: {click: function (e) {e.stopPropagation()}}}, [n("span", {staticClass: "vjs-radio__inner"}), e._v(" "), n("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: e.model,
                    expression: "model"
                }], staticClass: "vjs-radio__original", attrs: {type: "radio"}, domProps: {value: e.currentPath, checked: e._q(e.model, e.currentPath)}, on: {change: [function (t) {e.model = e.currentPath}, e.test], focus: function (t) {e.focus = !0}, blur: function (t) {e.focus = !1}}
            })])
        }, o = [], i = {render: r, staticRenderFns: o};
        t.a = i
    }, function (e, t, n) {
        "use strict";
        var r = n(36), o = n(82), i = n(2), s = i(r.a, o.a, !1, null, null, null);
        t.a = s.exports
    }, function (e, t, n) {
        "use strict";
        var r = function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("div", [e._t("default"), e._v(" "), n("span", {
                directives: [{name: "show", rawName: "v-show", value: e.dataVisiable, expression: "dataVisiable"}],
                staticClass: "vjs-tree__brackets",
                on: {click: function (t) {return t.stopPropagation(), e.toggleBrackets(t)}}
            }, [e._v("\n    " + e._s(Array.isArray(e.data) ? "[" : "{") + "\n  ")]), e._v(" "), n("span", {directives: [{name: "show", rawName: "v-show", value: !e.dataVisiable, expression: "!dataVisiable"}]}, [n("span", {
                staticClass: "vjs-tree__brackets",
                on: {click: function (t) {return t.stopPropagation(), e.toggleBrackets(t)}}
            }, [e._v("\n      " + e._s(e.closedBracketsGenerator(e.data)) + "\n    ")]), e._v(" "), e.showLength ? n("span", {staticClass: "vjs-comment"}, [e._v("\n      " + e._s(e.lengthGenerator(e.data)) + "\n    ")]) : e._e()])], 2)
        }, o = [], i = {render: r, staticRenderFns: o};
        t.a = i
    }, function (e, t, n) {
        "use strict";
        var r = n(38), o = n(84), i = n(2), s = i(r.a, o.a, !1, null, null, null);
        t.a = s.exports
    }, function (e, t, n) {
        "use strict";
        var r = function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("div", {directives: [{name: "show", rawName: "v-show", value: e.dataVisiable, expression: "dataVisiable"}]}, [n("span", {
                staticClass: "vjs-tree__brackets",
                on: {click: function (t) {return t.stopPropagation(), e.toggleBrackets(t)}}
            }, [e._v("\n    " + e._s(e.bracketsFormatter(Array.isArray(e.data) ? "]" : "}")) + "\n  ")])])
        }, o = [], i = {render: r, staticRenderFns: o};
        t.a = i
    }, function (e, t, n) {
        "use strict";
        var r = function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("div", {
                class: {
                    "vjs-tree": !0,
                    "has-selectable-control": e.isMultiple || e.showSelectController,
                    "is-root": 1 === e.currentDeep,
                    "is-selectable": e.selectable,
                    "is-selected": e.isSelected,
                    "is-highlight-selected": e.isSelected && e.highlightSelectedNode,
                    "is-mouseover": e.isMouseover
                }, on: {click: function (t) {return t.stopPropagation(), e.handleClick(t, "tree")}, mouseover: function (t) {return t.stopPropagation(), e.handleMouseover(t)}, mouseout: function (t) {return t.stopPropagation(), e.handleMouseout(t)}}
            }, [e.showSelectController && e.selectable ? [e.isMultiple ? n("vue-checkbox", {
                on: {change: function (t) {return e.handleClick(t, "checkbox")}},
                model: {value: e.currentCheckboxVal, callback: function (t) {e.currentCheckboxVal = t}, expression: "currentCheckboxVal"}
            }) : e.isSingle ? n("vue-radio", {
                attrs: {path: e.path},
                on: {change: function (t) {return e.handleClick(t, "radio")}},
                model: {value: e.model, callback: function (t) {e.model = t}, expression: "model"}
            }) : e._e()] : e._e(), e._v(" "), Array.isArray(e.data) || e.isObject(e.data) ? [n("brackets-left", {
                attrs: {visible: e.visible, data: e.data, "show-length": e.showLength, "show-comma": e.notLastKey},
                on: {"update:visible": function (t) {e.visible = t}}
            }, [e.currentDeep > 1 && !Array.isArray(e.parentData) ? n("span", {staticClass: "vjs-key"}, [e._v(e._s(e.keyFormatter(e.currentKey)) + ":")]) : e._e()]), e._v(" "), e._l(e.data, function (t, r) {
                return n("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.visible,
                        expression: "visible"
                    }], key: r, class: {"vjs-tree__content": !0, "has-line": e.showLine}
                }, [n("vue-json-pretty", {
                    attrs: {
                        "parent-data": e.data,
                        data: t,
                        deep: e.deep,
                        "show-length": e.showLength,
                        "show-double-quotes": e.showDoubleQuotes,
                        "show-line": e.showLine,
                        "highlight-mouseover-node": e.highlightMouseoverNode,
                        "highlight-selected-node": e.highlightSelectedNode,
                        path: e.path + (Array.isArray(e.data) ? "[" + r + "]" : "." + r),
                        "path-selectable": e.pathSelectable,
                        "selectable-type": e.selectableType,
                        "show-select-controller": e.showSelectController,
                        "select-on-click-node": e.selectOnClickNode,
                        "current-key": r,
                        "current-deep": e.currentDeep + 1
                    }, on: {click: e.handleItemClick, change: e.handleItemChange}, model: {value: e.model, callback: function (t) {e.model = t}, expression: "model"}
                })], 1)
            }), e._v(" "), n("brackets-right", {attrs: {visible: e.visible, data: e.data, "show-comma": e.notLastKey}, on: {"update:visible": function (t) {e.visible = t}}})] : n("simple-text", {
                attrs: {
                    "show-double-quotes": e.showDoubleQuotes,
                    "show-comma": e.notLastKey,
                    "parent-data": e.parentData,
                    data: e.data,
                    "current-key": e.currentKey
                }
            }, [Array.isArray(e.parentData) ? e._e() : n("span", {staticClass: "vjs-key"}, [e._v(e._s(e.keyFormatter(e.currentKey)) + ":")])])], 2)
        }, o = [], i = {render: r, staticRenderFns: o};
        t.a = i
    }, function (e, t, n) {
        var r = n(87);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(89)("bfa6fc9c", r, !0, {})
    }, function (e, t, n) {
        t = e.exports = n(88)(!1), t.push([e.i, '.vjs-checkbox{position:absolute;left:-30px;color:#1f2d3d;user-select:none}.vjs-checkbox.is-checked .vjs-checkbox__inner{background-color:#1890ff;border-color:#0076e4}.vjs-checkbox.is-checked .vjs-checkbox__inner:after{transform:rotate(45deg) scaleY(1)}.vjs-checkbox .vjs-checkbox__inner{display:inline-block;position:relative;border:1px solid #bfcbd9;border-radius:2px;vertical-align:middle;box-sizing:border-box;width:16px;height:16px;background-color:#fff;z-index:1;cursor:pointer;transition:border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46)}.vjs-checkbox .vjs-checkbox__inner:after{box-sizing:content-box;content:"";border:2px solid #fff;border-left:0;border-top:0;height:8px;left:4px;position:absolute;top:1px;transform:rotate(45deg) scaleY(0);width:4px;transition:transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;transform-origin:center}.vjs-checkbox .vjs-checkbox__original{opacity:0;outline:none;position:absolute;z-index:-1;top:0;left:0;right:0;bottom:0;margin:0}.vjs-radio{position:absolute;left:-30px;color:#1f2d3d;user-select:none}.vjs-radio.is-checked .vjs-radio__inner{background-color:#1890ff;border-color:#0076e4}.vjs-radio.is-checked .vjs-radio__inner:after{transform:translate(-50%,-50%) scale(1)}.vjs-radio .vjs-radio__inner{border:1px solid #bfcbd9;border-radius:100%;width:16px;height:16px;vertical-align:middle;background-color:#fff;position:relative;cursor:pointer;display:inline-block;box-sizing:border-box}.vjs-radio .vjs-radio__inner:after{width:4px;height:4px;border-radius:100%;background-color:#fff;content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(0);transition:transform .15s ease-in}.vjs-radio .vjs-radio__original{opacity:0;outline:none;position:absolute;z-index:-1;top:0;left:0;right:0;bottom:0;margin:0}.vjs-tree{font-family:Monaco,Menlo,Consolas,Bitstream Vera Sans Mono,monospace;font-size:14px}.vjs-tree.is-root{position:relative}.vjs-tree.is-root.has-selectable-control{margin-left:30px}.vjs-tree.is-mouseover{background-color:#e6f7ff}.vjs-tree.is-highlight-selected{background-color:#ccefff}.vjs-tree .vjs-tree__content{padding-left:1em}.vjs-tree .vjs-tree__content.has-line{border-left:1px dotted #bfcbd9}.vjs-tree .vjs-tree__brackets{cursor:pointer}.vjs-tree .vjs-tree__brackets:hover{color:#1890ff}.vjs-tree .vjs-comment{color:#bfcbd9}.vjs-tree .vjs-value__null{color:#ff4949}.vjs-tree .vjs-value__boolean,.vjs-tree .vjs-value__number{color:#1d8ce0}.vjs-tree .vjs-value__string{color:#13ce66}', ""])
    }, function (e, t) {
        function n(e, t) {
            var n = e[1] || "", o = e[3];
            if (!o) return n;
            if (t && "function" == typeof btoa) {
                var i = r(o);
                return [n].concat(o.sources.map(function (e) {return "/*# sourceURL=" + o.sourceRoot + e + " */"})).concat([i]).join("\n")
            }
            return [n].join("\n")
        }

        function r(e) {return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e)))) + " */"}

        e.exports = function (e) {
            var t = [];
            return t.toString = function () {
                return this.map(function (t) {
                    var r = n(t, e);
                    return t[2] ? "@media " + t[2] + "{" + r + "}" : r
                }).join("")
            }, t.i = function (e, n) {
                "string" == typeof e && (e = [[null, e, ""]]);
                for (var r = {}, o = 0; o < this.length; o++) {
                    var i = this[o][0];
                    "number" == typeof i && (r[i] = !0)
                }
                for (o = 0; o < e.length; o++) {
                    var s = e[o];
                    "number" == typeof s[0] && r[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(" + s[2] + ") and (" + n + ")"), t.push(s))
                }
            }, t
        }
    }, function (e, t, n) {
        function r(e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t], r = l[n.id];
                if (r) {
                    r.refs++;
                    for (var o = 0; o < r.parts.length; o++) r.parts[o](n.parts[o]);
                    for (; o < n.parts.length; o++) r.parts.push(i(n.parts[o]));
                    r.parts.length > n.parts.length && (r.parts.length = n.parts.length)
                } else {
                    for (var s = [], o = 0; o < n.parts.length; o++) s.push(i(n.parts[o]));
                    l[n.id] = {id: n.id, refs: 1, parts: s}
                }
            }
        }

        function o() {
            var e = document.createElement("style");
            return e.type = "text/css", f.appendChild(e), e
        }

        function i(e) {
            var t, n, r = document.querySelector("style[" + m + '~="' + e.id + '"]');
            if (r) {
                if (h) return v;
                r.parentNode.removeChild(r)
            }
            if (y) {
                var i = d++;
                r = p || (p = o()), t = s.bind(null, r, i, !1), n = s.bind(null, r, i, !0)
            } else r = o(), t = a.bind(null, r), n = function () {r.parentNode.removeChild(r)};
            return t(e), function (r) {
                if (r) {
                    if (r.css === e.css && r.media === e.media && r.sourceMap === e.sourceMap) return;
                    t(e = r)
                } else n()
            }
        }

        function s(e, t, n, r) {
            var o = n ? "" : r.css;
            if (e.styleSheet) e.styleSheet.cssText = g(t, o); else {
                var i = document.createTextNode(o), s = e.childNodes;
                s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(i, s[t]) : e.appendChild(i)
            }
        }

        function a(e, t) {
            var n = t.css, r = t.media, o = t.sourceMap;
            if (r && e.setAttribute("media", r), b.ssrId && e.setAttribute(m, t.id), o && (n += "\n/*# sourceURL=" + o.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */"), e.styleSheet) e.styleSheet.cssText = n; else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }

        var c = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !c) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var u = n(90), l = {}, f = c && (document.head || document.getElementsByTagName("head")[0]), p = null, d = 0, h = !1, v = function () {}, b = null, m = "data-vue-ssr-id", y = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        e.exports = function (e, t, n, o) {
            h = n, b = o || {};
            var i = u(e, t);
            return r(i), function (t) {
                for (var n = [], o = 0; o < i.length; o++) {
                    var s = i[o], a = l[s.id];
                    a.refs--, n.push(a)
                }
                t ? (i = u(e, t), r(i)) : i = [];
                for (var o = 0; o < n.length; o++) {
                    var a = n[o];
                    if (0 === a.refs) {
                        for (var c = 0; c < a.parts.length; c++) a.parts[c]();
                        delete l[a.id]
                    }
                }
            }
        };
        var g = function () {
            var e = [];
            return function (t, n) {return e[t] = n, e.filter(Boolean).join("\n")}
        }()
    }, function (e, t) {
        e.exports = function (e, t) {
            for (var n = [], r = {}, o = 0; o < t.length; o++) {
                var i = t[o], s = i[0], a = i[1], c = i[2], u = i[3], l = {id: e + ":" + o, css: a, media: c, sourceMap: u};
                r[s] ? r[s].parts.push(l) : n.push(r[s] = {id: s, parts: [l]})
            }
            return n
        }
    }])
});

/***/ }),

/***/ "./src/log_list.js":
/*!*************************!*\
  !*** ./src/log_list.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {Card, Form, FormItem, Input, Icon, Button, Modal} = __webpack_require__(/*! iview/dist/iview */ "iview/dist/iview");
const PageTable = __webpack_require__(/*! peacetrue-iview/src/components/page-table */ "peacetrue-iview/src/components/page-table");
const Detail = __webpack_require__(/*! peacetrue-iview/src/components/detail */ "./node_modules/peacetrue-iview/src/components/detail/index.js");
const VueJsonPretty = __webpack_require__(/*! vue-json-pretty */ "./node_modules/vue-json-pretty/vue-json-pretty.js").default;

module.exports = {
    name: 'LogList',
    template: `
    <div class="log-list">
        <template v-if="showCondition">
        <Card >
            <span slot="title">查询条件</span>
            <Form ref="form" :model="params" inline>
                <FormItem prop="moduleCode">
                    <Input type="text" v-model="params.moduleCode" placeholder="模块编码"/>
                </FormItem>
                <FormItem prop="recordId">
                    <Input type="text" v-model="params.recordId" placeholder="记录标识"/>
                </FormItem>
                <FormItem prop="operateCode">
                    <Input type="text" v-model="params.operateCode" placeholder="操作编码"/>
                </FormItem>
                <FormItem prop="description">
                    <Input type="text" v-model="params.description" placeholder="操作描述"/>
                </FormItem>
                <FormItem prop="creatorId">
                    <Input type="text" v-model="params.creatorId" placeholder="创建者"/>
                </FormItem>
                <FormItem prop="createdTime.lowerBound">
                    <Date-Picker type="date" placeholder="创建起始时间" v-model="params.createdTime.lowerBound"></Date-Picker>
                </FormItem>
                <FormItem prop="createdTime.upperBound">
                    <Date-Picker type="date" placeholder="创建结束时间" v-model="params.createdTime.upperBound"></Date-Picker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query(true)">查询</Button>
                    <Button @click="reset">清空</Button>
                </FormItem>
            </Form>
        </Card>
        <br>
        </template>
        <Card>
            <div slot="title">{{listTitle}}</div>
            <PageTable ref="pageTable" :url="url" :columns="columns" v-model="params" :success-format="successFormat"></PageTable>
        </Card>
        <Modal v-model="detail.model" title="日志详情" :footer-hide="true" fullscreen>
            <detail v-if="detail.data" :data="detail.data" :show-close="false">
                <row>
                    <detail-item label="模块编码" name="moduleCode"/>
                    <detail-item label="记录标识" name="recordId"/>
                </row>
                <row>
                    <detail-item label="操作编码" name="operateCode"/>
                    <detail-item label="操作描述" name="description"/>
                    <detail-item label="耗时(秒)">{{detail.data.duration/1000}}</detail-item>
                </row>
                <row>
                    <detail-item label="创建时间" name="createdTime"/>
                    <detail-item label="创建者标识" name="creatorId"/>
                </row>
                <detail-header :size="3">输入参数（最长2046，超过被截断，截断后无法按正常JSON展示）</detail-header>
                <VueJsonPretty :data="detail.data.input" :deep="2"/>
                <detail-header :size="3">输出结果（最长2046，超过被截断，截断后无法按正常JSON展示）</detail-header>
                <VueJsonPretty :data="detail.data.output" :deep="2"/>
                <detail-header :size="3">异常信息（最长1022，超过被截断）</detail-header>
                <div style="line-break: anywhere;word-break: break-word">{{detail.data.exception||'--'}}</div>
            </detail>                        
        </Modal>        
    </div>
    `,
    props: {
        showCondition: {type: Boolean, required: false, default: true},
        listTitle: {type: String, required: false, default: '查询结果'},
        showModule: {type: Boolean, required: false, default: true},
        url: {type: String, required: false, default: '/logs'},
        params: {type: Object, required: false, default() {return {page: 0, size: 10, moduleCode: null, recordId: null, operateCode: null, description: null, creatorId: null, createdTime: {}};}},
        successFormat: {type: Function, required: false, default(data) {return data.data;}},
        failureFormat: {type: Function, required: false, default(data) {return data.data;}},
        columns: {
            type: Array, required: false, default() {
                let columns = [
                    {title: '日志标识', key: 'id', width: 120, sortable: 'custom'},
                    {title: '模块编码', key: 'moduleCode', width: 120},
                    {title: '记录标识', key: 'recordId', width: 120, tooltip: true},
                    {title: '操作编码', key: 'operateCode', width: 120},
                    {title: '操作描述', key: 'description', width: 200, tooltip: true},
                    {title: '耗时(秒)', key: 'duration', width: 150, render(h, r) {return h('span', r.row.duration / 1000)}},
                    {title: '操作状态', width: 150, render: (h, r) => h('span', Boolean(r.row.exception) ? '失败' : '成功')},
                    {title: '异常信息', key: 'exception', tooltip: true},
                    {title: '创建时间', key: 'createdTime', width: 150, sortable: 'custom', tooltip: true, sortType: 'desc'},
                    {title: '操作', width: 100, render: (h, r) => {return this.renderOperate(h, r);}},
                ];
                if (!this.showModule) columns.splice(0, 3);
                return columns;
            }
        },

        // moduleCodeRender: {type: Function, required: false, default(h, row) {return h('span', row.moduleCode)}},
        // recordIdRender: {type: Function, required: false, default(h, row) {return h('span', row.recordId)}},
    },
    data() {
        return {
            detail: {
                model: false,
                data: null
            }
        };
    },
    methods: {
        query(reset) {
            this.$refs.pageTable.query(reset);
        },
        renderOperate(h, r) {
            return h(Button, {props: {type: 'primary', size: 'small'}, on: {click: () => this.openDetail(r.row)}}, '详情');
        },
        openDetail(row) {
            this.detail.model = true;
            let clone = Object.assign({}, row);
            try { clone.input = JSON.parse(row.input);} catch (e) { }
            try { clone.output = JSON.parse(row.output);} catch (e) { }
            this.detail.data = clone;
        },
        reset() {
            this.$refs.form.resetFields();
            return this.query(true);
        },
    },
    components: {
        Card, Form, FormItem, Input, Icon, Button, PageTable, Modal, VueJsonPretty, ...Detail
    },
};



/***/ }),

/***/ "iview/dist/iview":
/*!************************!*\
  !*** external "iview" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_iview_dist_iview__;

/***/ }),

/***/ "peacetrue-iview/src/components/page-table":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** external {"root":["PeaceIview","PageTable"],"commonjs":"peacetrue-iview/src/components/page-table","commonjs2":"peacetrue-iview/src/components/page-table","amd":"peacetrue-iview/src/components/page-table"} ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_peacetrue_iview_src_components_page_table__;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvcGVhY2V0cnVlLWl2aWV3L3NyYy9jb21wb25lbnRzL2RldGFpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvdnVlLWpzb24tcHJldHR5L3Z1ZS1qc29uLXByZXR0eS5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvbG9nX2xpc3QuanMiLCJ3ZWJwYWNrOi8vW25hbWVdL2V4dGVybmFsIFwiaXZpZXdcIiIsIndlYnBhY2s6Ly9bbmFtZV0vZXh0ZXJuYWwge1wicm9vdFwiOltcIlBlYWNlSXZpZXdcIixcIlBhZ2VUYWJsZVwiXSxcImNvbW1vbmpzXCI6XCJwZWFjZXRydWUtaXZpZXcvc3JjL2NvbXBvbmVudHMvcGFnZS10YWJsZVwiLFwiY29tbW9uanMyXCI6XCJwZWFjZXRydWUtaXZpZXcvc3JjL2NvbXBvbmVudHMvcGFnZS10YWJsZVwiLFwiYW1kXCI6XCJwZWFjZXRydWUtaXZpZXcvc3JjL2NvbXBvbmVudHMvcGFnZS10YWJsZVwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQs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QW1CO0FBQzNGLHdCQUF3QixnREFBZ0QsbUJBQW1CO0FBQzNGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix5REFBeUQ7QUFDOUUscUJBQXFCLDZDQUE2QztBQUNsRSxxQkFBcUIsMERBQTBEO0FBQy9FLHFCQUFxQiw4Q0FBOEM7QUFDbkUscUJBQXFCLDZEQUE2RDtBQUNsRixxQkFBcUIsMkRBQTJELHlDQUF5QztBQUN6SCxxQkFBcUIsK0ZBQStGO0FBQ3BILHFCQUFxQiwrQ0FBK0M7QUFDcEUscUJBQXFCLG1HQUFtRztBQUN4SCxxQkFBcUIsNENBQTRDLGtDQUFrQztBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQsOEJBQThCLGtEQUFrRCxrQ0FBa0M7QUFDbEgsNEJBQTRCLGtEQUFrRCxnQ0FBZ0M7QUFDOUcsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDhCQUE4QixRQUFRLCtCQUErQixPQUFPLHFDQUFxQztBQUNqSCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHdDQUF3QztBQUN4QyxpQkFBaUIsc0NBQXNDLFlBQVk7QUFDbkUsaUJBQWlCLHdDQUF3QyxZQUFZO0FBQ3JFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7OztBQ25JQSw4RDs7Ozs7Ozs7Ozs7QUNBQSx1RiIsImZpbGUiOiJsb2dfbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIml2aWV3XCIpLCByZXF1aXJlKFwicGVhY2V0cnVlLWl2aWV3L3NyYy9jb21wb25lbnRzL3BhZ2UtdGFibGVcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiaXZpZXdcIiwgXCJwZWFjZXRydWUtaXZpZXcvc3JjL2NvbXBvbmVudHMvcGFnZS10YWJsZVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJMb2dMaXN0XCJdID0gZmFjdG9yeShyZXF1aXJlKFwiaXZpZXdcIiksIHJlcXVpcmUoXCJwZWFjZXRydWUtaXZpZXcvc3JjL2NvbXBvbmVudHMvcGFnZS10YWJsZVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiTG9nTGlzdFwiXSA9IGZhY3Rvcnkocm9vdFtcIml2aWV3XCJdLCByb290W1wiUGVhY2VJdmlld1wiXVtcIlBhZ2VUYWJsZVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2l2aWV3X2Rpc3RfaXZpZXdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9wZWFjZXRydWVfaXZpZXdfc3JjX2NvbXBvbmVudHNfcGFnZV90YWJsZV9fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbG9nX2xpc3QuanNcIik7XG4iLCIvKiror6bmg4XlrrnlmagqL1xubGV0IERldGFpbCA9IHtcbiAgICBuYW1lOiAnZGV0YWlsJyxcbiAgICBwcm9wczoge1xuICAgICAgICBkYXRhOiB7dHlwZTogT2JqZWN0fSxcbiAgICAgICAgbGFiZWxTcGFuOiB7dHlwZTogTnVtYmVyLCBkZWZhdWx0OiA0fSxcbiAgICAgICAgdmFsdWVTcGFuOiB7dHlwZTogTnVtYmVyLCBkZWZhdWx0OiA4fSxcbiAgICAgICAgc2hvd0Nsb3NlOiB7dHlwZTogQm9vbGVhbiwgZGVmYXVsdDogdHJ1ZX0sXG4gICAgICAgIGRlZmF1bHRWYWx1ZToge2RlZmF1bHQ6ICctLSd9XG4gICAgfSxcbiAgICBwcm92aWRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJF9kZXRhaWxfZGF0YTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgJF9kZXRhaWxfbGFiZWxTcGFuOiB0aGlzLmxhYmVsU3BhbixcbiAgICAgICAgICAgICRfZGV0YWlsX3ZhbHVlU3BhbjogdGhpcy52YWx1ZVNwYW4sXG4gICAgICAgICAgICAkX2RldGFpbF9kZWZhdWx0VmFsdWU6IHRoaXMuZGVmYXVsdFZhbHVlLFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGV0YWlsXCI+XG4gICAgICAgICAgICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImNsb3NlXCIgdi1pZj1cInNob3dDbG9zZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsLWNsb3NlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aS1idXR0b24gQGNsaWNrPVwid2luZG93LmNsb3NlKClcIj7lhbPpl608L2ktYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICAgICAgICA8L2Rpdj5gXG59O1xuXG5sZXQgY2hpbGRDb21wb25lbnRNaXhJbiA9IHtcbiAgICBwcm9wczoge1xuICAgICAgICBkYXRhOiB7dHlwZTogT2JqZWN0LCBkZWZhdWx0KCkge3JldHVybiB0aGlzLiRfZGV0YWlsX2RhdGF9fSxcbiAgICAgICAgbmFtZToge3R5cGU6IFN0cmluZyx9LFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHtkZWZhdWx0KCkge3JldHVybiB0aGlzLiRfZGV0YWlsX2RlZmF1bHRWYWx1ZX19LFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZGVmYXVsdCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHdpbmRvdy5qc29ucGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBqc29ucGF0aC52YWx1ZSh0aGlzLmRhdGEsIGAkLiR7dGhpcy5uYW1lfWApXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZGF0YVt0aGlzLm5hbWVdKVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBpbmplY3Q6IFsnJF9kZXRhaWxfZGF0YScsICckX2RldGFpbF9sYWJlbFNwYW4nLCAnJF9kZXRhaWxfdmFsdWVTcGFuJywgJyRfZGV0YWlsX2RlZmF1bHRWYWx1ZSddLFxufTtcblxuLyoq6K+m5oOF5bGV5byAKi9cbmxldCBEZXRhaWxIZWFkZXIgPSB7XG4gICAgbmFtZTogJ2RldGFpbC1oZWFkZXInLFxuICAgIHRlbXBsYXRlOiAnPGRpdiA6Y2xhc3M9XCJjbGFzc05hbWVcIj48c2xvdD48L3Nsb3Q+PC9kaXY+JyxcbiAgICBwcm9wczoge1xuICAgICAgICBzaXplOiB7dHlwZTogTnVtYmVyLCBkZWZhdWx0OiAxfSxcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGNsYXNzTmFtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBbJ2RldGFpbC1oZWFkZXInLCAnZGV0YWlsLWhlYWRlci0nICsgdGhpcy5zaXplXS5qb2luKCcgJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKiror6bmg4XpobkqL1xubGV0IERldGFpbEl0ZW0gPSB7XG4gICAgbmFtZTogJ2RldGFpbC1pdGVtJyxcbiAgICBtaXhpbnM6IFtjaGlsZENvbXBvbmVudE1peEluXSxcbiAgICBwcm9wczoge1xuICAgICAgICBsYWJlbDoge3R5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWV9LFxuICAgICAgICBsYWJlbFNwYW46IHt0eXBlOiBOdW1iZXIsIGRlZmF1bHQoKSB7cmV0dXJuIHRoaXMuJF9kZXRhaWxfbGFiZWxTcGFufX0sXG4gICAgICAgIHZhbHVlOiB7dHlwZTogW1N0cmluZywgQm9vbGVhbiwgTnVtYmVyXSwgZGVmYXVsdDogY2hpbGRDb21wb25lbnRNaXhJbi5wcm9wcy52YWx1ZS5kZWZhdWx0fSxcbiAgICAgICAgdmFsdWVTcGFuOiB7dHlwZTogTnVtYmVyLCBkZWZhdWx0KCkge3JldHVybiB0aGlzLiRfZGV0YWlsX3ZhbHVlU3Bhbn19LFxuICAgIH0sXG4gICAgdGVtcGxhdGU6IGA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aS1jb2wgY2xhc3M9XCJkZXRhaWwtaXRlbS1sYWJlbFwiIDpzcGFuPVwibGFiZWxTcGFuXCI+e3tsYWJlbH19PC9pLWNvbD5cbiAgICAgICAgICAgICAgICAgICAgPGktY29sIGNsYXNzPVwiZGV0YWlsLWl0ZW0tdmFsdWVcIiA6c3Bhbj1cInZhbHVlU3BhblwiPjxzbG90Pnt7dmFsdWV9fTwvc2xvdD48L2ktY29sPlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcbn07XG5cbi8qKuivpuaDheihqOagvCovXG5sZXQgRGV0YWlsVGFibGUgPSB7XG4gICAgbmFtZTogJ2RldGFpbC10YWJsZScsXG4gICAgbWl4aW5zOiBbY2hpbGRDb21wb25lbnRNaXhJbl0sXG4gICAgcHJvcHM6IHtcbiAgICAgICAgbGFiZWw6IHt0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiB0cnVlfSxcbiAgICAgICAgdmFsdWU6IHt0eXBlOiBBcnJheSwgZGVmYXVsdDogY2hpbGRDb21wb25lbnRNaXhJbi5wcm9wcy52YWx1ZS5kZWZhdWx0fVxuICAgIH0sXG4gICAgaW5qZWN0OiBbJyRfZGV0YWlsX2RhdGEnXSxcbiAgICB0ZW1wbGF0ZTogJzxpLXRhYmxlIHYtYmluZD1cImxhYmVsXCIgdi1iaW5kOmRhdGE9XCJ2YWx1ZVwiPjwvaS10YWJsZT4nXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBEZXRhaWwsIERldGFpbEhlYWRlciwgRGV0YWlsSXRlbSwgRGV0YWlsVGFibGVcbn07IiwiIWZ1bmN0aW9uIChlLCB0KSB7XCJvYmplY3RcIiA9PSB0eXBlb2YgZXhwb3J0cyAmJiBcIm9iamVjdFwiID09IHR5cGVvZiBtb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA9IHQoKSA6IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZGVmaW5lICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoW10sIHQpIDogXCJvYmplY3RcIiA9PSB0eXBlb2YgZXhwb3J0cyA/IGV4cG9ydHMuVnVlSnNvblByZXR0eSA9IHQoKSA6IGUuVnVlSnNvblByZXR0eSA9IHQoKX0oXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2Ygc2VsZiA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGZ1bmN0aW9uIHQocikge1xuICAgICAgICAgICAgaWYgKG5bcl0pIHJldHVybiBuW3JdLmV4cG9ydHM7XG4gICAgICAgICAgICB2YXIgbyA9IG5bcl0gPSB7aTogciwgbDogITEsIGV4cG9ydHM6IHt9fTtcbiAgICAgICAgICAgIHJldHVybiBlW3JdLmNhbGwoby5leHBvcnRzLCBvLCBvLmV4cG9ydHMsIHQpLCBvLmwgPSAhMCwgby5leHBvcnRzXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbiA9IHt9O1xuICAgICAgICByZXR1cm4gdC5tID0gZSwgdC5jID0gbiwgdC5kID0gZnVuY3Rpb24gKGUsIG4sIHIpIHt0Lm8oZSwgbikgfHwgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIG4sIHtjb25maWd1cmFibGU6ICExLCBlbnVtZXJhYmxlOiAhMCwgZ2V0OiByfSl9LCB0Lm4gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIG4gPSBlICYmIGUuX19lc01vZHVsZSA/IGZ1bmN0aW9uICgpIHtyZXR1cm4gZS5kZWZhdWx0fSA6IGZ1bmN0aW9uICgpIHtyZXR1cm4gZX07XG4gICAgICAgICAgICByZXR1cm4gdC5kKG4sIFwiYVwiLCBuKSwgblxuICAgICAgICB9LCB0Lm8gPSBmdW5jdGlvbiAoZSwgdCkge3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSwgdCl9LCB0LnAgPSBcIlwiLCB0KHQucyA9IDM5KVxuICAgIH0oW2Z1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgIHZhciBuID0gZS5leHBvcnRzID0ge3ZlcnNpb246IFwiMi42LjVcIn07XG4gICAgICAgIFwibnVtYmVyXCIgPT0gdHlwZW9mIF9fZSAmJiAoX19lID0gbilcbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICB2YXIgciA9IG4oMjUpKFwid2tzXCIpLCBvID0gbigyNyksIGkgPSBuKDMpLlN5bWJvbCwgcyA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgaTtcbiAgICAgICAgKGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlKSB7cmV0dXJuIHJbZV0gfHwgKHJbZV0gPSBzICYmIGlbZV0gfHwgKHMgPyBpIDogbykoXCJTeW1ib2wuXCIgKyBlKSl9KS5zdG9yZSA9IHJcbiAgICB9LCBmdW5jdGlvbiAoZSwgdCkge1xuICAgICAgICBlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZSwgdCwgbiwgciwgbywgaSkge1xuICAgICAgICAgICAgdmFyIHMsIGEgPSBlID0gZSB8fCB7fSwgYyA9IHR5cGVvZiBlLmRlZmF1bHQ7XG4gICAgICAgICAgICBcIm9iamVjdFwiICE9PSBjICYmIFwiZnVuY3Rpb25cIiAhPT0gYyB8fCAocyA9IGUsIGEgPSBlLmRlZmF1bHQpO1xuICAgICAgICAgICAgdmFyIHUgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGEgPyBhLm9wdGlvbnMgOiBhO1xuICAgICAgICAgICAgdCAmJiAodS5yZW5kZXIgPSB0LnJlbmRlciwgdS5zdGF0aWNSZW5kZXJGbnMgPSB0LnN0YXRpY1JlbmRlckZucywgdS5fY29tcGlsZWQgPSAhMCksIG4gJiYgKHUuZnVuY3Rpb25hbCA9ICEwKSwgbyAmJiAodS5fc2NvcGVJZCA9IG8pO1xuICAgICAgICAgICAgdmFyIGw7XG4gICAgICAgICAgICBpZiAoaSA/IChsID0gZnVuY3Rpb24gKGUpIHtlID0gZSB8fCB0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0IHx8IHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LiR2bm9kZSAmJiB0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCwgZSB8fCBcInVuZGVmaW5lZFwiID09IHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fIHx8IChlID0gX19WVUVfU1NSX0NPTlRFWFRfXyksIHIgJiYgci5jYWxsKHRoaXMsIGUpLCBlICYmIGUuX3JlZ2lzdGVyZWRDb21wb25lbnRzICYmIGUuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0sIHUuX3NzclJlZ2lzdGVyID0gbCkgOiByICYmIChsID0gciksIGwpIHtcbiAgICAgICAgICAgICAgICB2YXIgZiA9IHUuZnVuY3Rpb25hbCwgcCA9IGYgPyB1LnJlbmRlciA6IHUuYmVmb3JlQ3JlYXRlO1xuICAgICAgICAgICAgICAgIGYgPyAodS5faW5qZWN0U3R5bGVzID0gbCwgdS5yZW5kZXIgPSBmdW5jdGlvbiAoZSwgdCkge3JldHVybiBsLmNhbGwodCksIHAoZSwgdCl9KSA6IHUuYmVmb3JlQ3JlYXRlID0gcCA/IFtdLmNvbmNhdChwLCBsKSA6IFtsXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtlc01vZHVsZTogcywgZXhwb3J0czogYSwgb3B0aW9uczogdX1cbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgIHZhciBuID0gZS5leHBvcnRzID0gXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2Ygd2luZG93ICYmIHdpbmRvdy5NYXRoID09IE1hdGggPyB3aW5kb3cgOiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBzZWxmICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgICAgICAgXCJudW1iZXJcIiA9PSB0eXBlb2YgX19nICYmIChfX2cgPSBuKVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbigzKSwgbyA9IG4oMCksIGkgPSBuKDE5KSwgcyA9IG4oNSksIGEgPSBuKDEwKSwgYyA9IGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgICAgICB2YXIgdSwgbCwgZiwgcCA9IGUgJiBjLkYsIGQgPSBlICYgYy5HLCBoID0gZSAmIGMuUywgdiA9IGUgJiBjLlAsIGIgPSBlICYgYy5CLCBtID0gZSAmIGMuVywgeSA9IGQgPyBvIDogb1t0XSB8fCAob1t0XSA9IHt9KSwgZyA9IHkucHJvdG90eXBlLCB4ID0gZCA/IHIgOiBoID8gclt0XSA6IChyW3RdIHx8IHt9KS5wcm90b3R5cGU7XG4gICAgICAgICAgICBkICYmIChuID0gdCk7XG4gICAgICAgICAgICBmb3IgKHUgaW4gbikgKGwgPSAhcCAmJiB4ICYmIHZvaWQgMCAhPT0geFt1XSkgJiYgYSh5LCB1KSB8fCAoZiA9IGwgPyB4W3VdIDogblt1XSwgeVt1XSA9IGQgJiYgXCJmdW5jdGlvblwiICE9IHR5cGVvZiB4W3VdID8gblt1XSA6IGIgJiYgbCA/IGkoZiwgcikgOiBtICYmIHhbdV0gPT0gZiA/IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBmdW5jdGlvbiAodCwgbiwgcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBlKHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBlKHQsIG4pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGUodCwgbiwgcilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdC5wcm90b3R5cGUgPSBlLnByb3RvdHlwZSwgdFxuICAgICAgICAgICAgfShmKSA6IHYgJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBmID8gaShGdW5jdGlvbi5jYWxsLCBmKSA6IGYsIHYgJiYgKCh5LnZpcnR1YWwgfHwgKHkudmlydHVhbCA9IHt9KSlbdV0gPSBmLCBlICYgYy5SICYmIGcgJiYgIWdbdV0gJiYgcyhnLCB1LCBmKSkpXG4gICAgICAgIH07XG4gICAgICAgIGMuRiA9IDEsIGMuRyA9IDIsIGMuUyA9IDQsIGMuUCA9IDgsIGMuQiA9IDE2LCBjLlcgPSAzMiwgYy5VID0gNjQsIGMuUiA9IDEyOCwgZS5leHBvcnRzID0gY1xuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbig2KSwgbyA9IG4oMTMpO1xuICAgICAgICBlLmV4cG9ydHMgPSBuKDgpID8gZnVuY3Rpb24gKGUsIHQsIG4pIHtyZXR1cm4gci5mKGUsIHQsIG8oMSwgbikpfSA6IGZ1bmN0aW9uIChlLCB0LCBuKSB7cmV0dXJuIGVbdF0gPSBuLCBlfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbig3KSwgbyA9IG4oNDQpLCBpID0gbig0NSksIHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4gICAgICAgIHQuZiA9IG4oOCkgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICAgICAgaWYgKHIoZSksIHQgPSBpKHQsICEwKSwgcihuKSwgbykgdHJ5IHtyZXR1cm4gcyhlLCB0LCBuKX0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICBpZiAoXCJnZXRcIiBpbiBuIHx8IFwic2V0XCIgaW4gbikgdGhyb3cgVHlwZUVycm9yKFwiQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFwidmFsdWVcIiBpbiBuICYmIChlW3RdID0gbi52YWx1ZSksIGVcbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbigxMik7XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoIXIoZSkpIHRocm93IFR5cGVFcnJvcihlICsgXCIgaXMgbm90IGFuIG9iamVjdCFcIik7XG4gICAgICAgICAgICByZXR1cm4gZVxuICAgICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtlLmV4cG9ydHMgPSAhbig5KShmdW5jdGlvbiAoKSB7cmV0dXJuIDcgIT0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCBcImFcIiwge2dldDogZnVuY3Rpb24gKCkge3JldHVybiA3fX0pLmF9KX0sIGZ1bmN0aW9uIChlLCB0KSB7ZS5leHBvcnRzID0gZnVuY3Rpb24gKGUpIHt0cnkge3JldHVybiAhIWUoKX0gY2F0Y2ggKGUpIHtyZXR1cm4gITB9fX0sIGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgIHZhciBuID0ge30uaGFzT3duUHJvcGVydHk7XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlLCB0KSB7cmV0dXJuIG4uY2FsbChlLCB0KX1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICB2YXIgciA9IG4oMTUpO1xuICAgICAgICBlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZSkge3JldHVybiBPYmplY3QocihlKSl9XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQpIHtlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZSkge3JldHVybiBcIm9iamVjdFwiID09IHR5cGVvZiBlID8gbnVsbCAhPT0gZSA6IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZX19LCBmdW5jdGlvbiAoZSwgdCkge2UuZXhwb3J0cyA9IGZ1bmN0aW9uIChlLCB0KSB7cmV0dXJuIHtlbnVtZXJhYmxlOiAhKDEgJiBlKSwgY29uZmlndXJhYmxlOiAhKDIgJiBlKSwgd3JpdGFibGU6ICEoNCAmIGUpLCB2YWx1ZTogdH19fSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBuKDQ3KSwgbyA9IG4oMjgpO1xuICAgICAgICBlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAoZSkge3JldHVybiByKGUsIG8pfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAodm9pZCAwID09IGUpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGUpO1xuICAgICAgICAgICAgcmV0dXJuIGVcbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgIHZhciBuID0gTWF0aC5jZWlsLCByID0gTWF0aC5mbG9vcjtcbiAgICAgICAgZS5leHBvcnRzID0gZnVuY3Rpb24gKGUpIHtyZXR1cm4gaXNOYU4oZSA9ICtlKSA/IDAgOiAoZSA+IDAgPyByIDogbikoZSl9XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBuKDI1KShcImtleXNcIiksIG8gPSBuKDI3KTtcbiAgICAgICAgZS5leHBvcnRzID0gZnVuY3Rpb24gKGUpIHtyZXR1cm4gcltlXSB8fCAocltlXSA9IG8oZSkpfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0KSB7ZS5leHBvcnRzID0ge319LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICB2YXIgciA9IG4oNDMpO1xuICAgICAgICBlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICAgICAgaWYgKHIoZSksIHZvaWQgMCA9PT0gdCkgcmV0dXJuIGU7XG4gICAgICAgICAgICBzd2l0Y2ggKG4pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobikge3JldHVybiBlLmNhbGwodCwgbil9O1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuLCByKSB7cmV0dXJuIGUuY2FsbCh0LCBuLCByKX07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG4sIHIsIG8pIHtyZXR1cm4gZS5jYWxsKHQsIG4sIHIsIG8pfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtyZXR1cm4gZS5hcHBseSh0LCBhcmd1bWVudHMpfVxuICAgICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBuKDEyKSwgbyA9IG4oMykuZG9jdW1lbnQsIGkgPSByKG8pICYmIHIoby5jcmVhdGVFbGVtZW50KTtcbiAgICAgICAgZS5leHBvcnRzID0gZnVuY3Rpb24gKGUpIHtyZXR1cm4gaSA/IG8uY3JlYXRlRWxlbWVudChlKSA6IHt9fVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbigyMiksIG8gPSBuKDE1KTtcbiAgICAgICAgZS5leHBvcnRzID0gZnVuY3Rpb24gKGUpIHtyZXR1cm4gcihvKGUpKX1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICB2YXIgciA9IG4oMjMpO1xuICAgICAgICBlLmV4cG9ydHMgPSBPYmplY3QoXCJ6XCIpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGUpIHtyZXR1cm4gXCJTdHJpbmdcIiA9PSByKGUpID8gZS5zcGxpdChcIlwiKSA6IE9iamVjdChlKX1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCkge1xuICAgICAgICB2YXIgbiA9IHt9LnRvU3RyaW5nO1xuICAgICAgICBlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZSkge3JldHVybiBuLmNhbGwoZSkuc2xpY2UoOCwgLTEpfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbigxNiksIG8gPSBNYXRoLm1pbjtcbiAgICAgICAgZS5leHBvcnRzID0gZnVuY3Rpb24gKGUpIHtyZXR1cm4gZSA+IDAgPyBvKHIoZSksIDkwMDcxOTkyNTQ3NDA5OTEpIDogMH1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICB2YXIgciA9IG4oMCksIG8gPSBuKDMpLCBpID0gb1tcIl9fY29yZS1qc19zaGFyZWRfX1wiXSB8fCAob1tcIl9fY29yZS1qc19zaGFyZWRfX1wiXSA9IHt9KTtcbiAgICAgICAgKGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlLCB0KSB7cmV0dXJuIGlbZV0gfHwgKGlbZV0gPSB2b2lkIDAgIT09IHQgPyB0IDoge30pfSkoXCJ2ZXJzaW9uc1wiLCBbXSkucHVzaCh7dmVyc2lvbjogci52ZXJzaW9uLCBtb2RlOiBuKDI2KSA/IFwicHVyZVwiIDogXCJnbG9iYWxcIiwgY29weXJpZ2h0OiBcIsKpIDIwMTkgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSlcIn0pXG4gICAgfSwgZnVuY3Rpb24gKGUsIHQpIHtlLmV4cG9ydHMgPSAhMH0sIGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgIHZhciBuID0gMCwgciA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlKSB7cmV0dXJuIFwiU3ltYm9sKFwiLmNvbmNhdCh2b2lkIDAgPT09IGUgPyBcIlwiIDogZSwgXCIpX1wiLCAoKytuICsgcikudG9TdHJpbmcoMzYpKX1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCkge2UuZXhwb3J0cyA9IFwiY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mXCIuc3BsaXQoXCIsXCIpfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciByID0gbig1MyksIG8gPSBuLm4ociksIGkgPSBuKDMxKSwgcyA9IG4ubihpKSwgYSA9IG4oNzUpLCBjID0gbig3NyksIHUgPSBuKDc5KSwgbCA9IG4oODEpLCBmID0gbig4MyksIHAgPSBuKDMzKTtcbiAgICAgICAgdC5hID0ge1xuICAgICAgICAgICAgbmFtZTogXCJ2dWUtanNvbi1wcmV0dHlcIixcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IHtTaW1wbGVUZXh0OiBhLmEsIFZ1ZUNoZWNrYm94OiBjLmEsIFZ1ZVJhZGlvOiB1LmEsIEJyYWNrZXRzTGVmdDogbC5hLCBCcmFja2V0c1JpZ2h0OiBmLmF9LFxuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgICAgICBkZWVwOiB7dHlwZTogTnVtYmVyLCBkZWZhdWx0OiAxIC8gMH0sXG4gICAgICAgICAgICAgICAgc2hvd0xlbmd0aDoge3R5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6ICExfSxcbiAgICAgICAgICAgICAgICBzaG93RG91YmxlUXVvdGVzOiB7dHlwZTogQm9vbGVhbiwgZGVmYXVsdDogITB9LFxuICAgICAgICAgICAgICAgIHBhdGg6IHt0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6IFwicm9vdFwifSxcbiAgICAgICAgICAgICAgICBzZWxlY3RhYmxlVHlwZToge3R5cGU6IFN0cmluZywgZGVmYXVsdDogXCJcIn0sXG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdENvbnRyb2xsZXI6IHt0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiAhMX0sXG4gICAgICAgICAgICAgICAgc2hvd0xpbmU6IHt0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiAhMH0sXG4gICAgICAgICAgICAgICAgc2VsZWN0T25DbGlja05vZGU6IHt0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiAhMH0sXG4gICAgICAgICAgICAgICAgdmFsdWU6IHt0eXBlOiBbQXJyYXksIFN0cmluZ10sIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtyZXR1cm4gXCJcIn19LFxuICAgICAgICAgICAgICAgIHBhdGhTZWxlY3RhYmxlOiB7dHlwZTogRnVuY3Rpb24sIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtyZXR1cm4gITB9fSxcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRNb3VzZW92ZXJOb2RlOiB7dHlwZTogQm9vbGVhbiwgZGVmYXVsdDogITF9LFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodFNlbGVjdGVkTm9kZToge3R5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6ICEwfSxcbiAgICAgICAgICAgICAgICBwYXJlbnREYXRhOiB7fSxcbiAgICAgICAgICAgICAgICBjdXJyZW50RGVlcDoge3R5cGU6IE51bWJlciwgZGVmYXVsdDogMX0sXG4gICAgICAgICAgICAgICAgY3VycmVudEtleTogW051bWJlciwgU3RyaW5nXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtyZXR1cm4ge3Zpc2libGU6IHRoaXMuY3VycmVudERlZXAgPD0gdGhpcy5kZWVwLCBpc01vdXNlb3ZlcjogITEsIGN1cnJlbnRDaGVja2JveFZhbDogISFBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpICYmIHRoaXMudmFsdWUuaW5jbHVkZXModGhpcy5wYXRoKX19LFxuICAgICAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlID0gXCJtdWx0aXBsZVwiID09PSB0aGlzLnNlbGVjdGFibGVUeXBlID8gW10gOiBcInNpbmdsZVwiID09PSB0aGlzLnNlbGVjdGFibGVUeXBlID8gXCJcIiA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSB8fCBlXG4gICAgICAgICAgICAgICAgICAgIH0sIHNldDogZnVuY3Rpb24gKGUpIHt0aGlzLiRlbWl0KFwiaW5wdXRcIiwgZSl9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsYXN0S2V5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMucGFyZW50RGF0YSkpIHJldHVybiB0aGlzLnBhcmVudERhdGEubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPYmplY3QodGhpcy5wYXJlbnREYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBzKCkodGhpcy5wYXJlbnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlW2UubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbm90TGFzdEtleTogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmN1cnJlbnRLZXkgIT09IHRoaXMubGFzdEtleX0sXG4gICAgICAgICAgICAgICAgc2VsZWN0YWJsZTogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLnBhdGhTZWxlY3RhYmxlKHRoaXMucGF0aCwgdGhpcy5kYXRhKSAmJiAodGhpcy5pc011bHRpcGxlIHx8IHRoaXMuaXNTaW5nbGUpfSxcbiAgICAgICAgICAgICAgICBpc011bHRpcGxlOiBmdW5jdGlvbiAoKSB7cmV0dXJuIFwibXVsdGlwbGVcIiA9PT0gdGhpcy5zZWxlY3RhYmxlVHlwZX0sXG4gICAgICAgICAgICAgICAgaXNTaW5nbGU6IGZ1bmN0aW9uICgpIHtyZXR1cm4gXCJzaW5nbGVcIiA9PT0gdGhpcy5zZWxlY3RhYmxlVHlwZX0sXG4gICAgICAgICAgICAgICAgaXNTZWxlY3RlZDogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmlzTXVsdGlwbGUgPyB0aGlzLm1vZGVsLmluY2x1ZGVzKHRoaXMucGF0aCkgOiAhIXRoaXMuaXNTaW5nbGUgJiYgdGhpcy5tb2RlbCA9PT0gdGhpcy5wYXRofSxcbiAgICAgICAgICAgICAgICBwcm9wc0Vycm9yOiBmdW5jdGlvbiAoKSB7cmV0dXJuICF0aGlzLnNlbGVjdGFibGVUeXBlIHx8IHRoaXMuc2VsZWN0T25DbGlja05vZGUgfHwgdGhpcy5zaG93U2VsZWN0Q29udHJvbGxlciA/IFwiXCIgOiBcIldoZW4gc2VsZWN0YWJsZVR5cGUgaXMgbm90IG51bGwsIHNlbGVjdE9uQ2xpY2tOb2RlIGFuZCBzaG93U2VsZWN0Q29udHJvbGxlciBjYW5ub3QgYmUgZmFsc2UgYXQgdGhlIHNhbWUgdGltZSwgYmVjYXVzZSB0aGlzIHdpbGwgY2F1c2UgdGhlIHNlbGVjdGlvbiB0byBmYWlsLlwifVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgICAgICBoYW5kbGVDbGljazogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSB0aGlzLCBuID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdm9pZCAwICE9PSBhcmd1bWVudHNbMV0gPyBhcmd1bWVudHNbMV0gOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy4kZW1pdChcImNsaWNrXCIsIHRoaXMucGF0aCwgdGhpcy5kYXRhKSwgdGhpcy5zZWxlY3RhYmxlKSBpZiAodGhpcy5pc011bHRpcGxlICYmIChcImNoZWNrYm94XCIgPT09IG4gfHwgdGhpcy5zZWxlY3RPbkNsaWNrTm9kZSAmJiBcInRyZWVcIiA9PT0gbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gdGhpcy5tb2RlbC5maW5kSW5kZXgoZnVuY3Rpb24gKGUpIHtyZXR1cm4gZSA9PT0gdC5wYXRofSksIGkgPSBbXS5jb25jYXQobygpKHRoaXMubW9kZWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xICE9PSByID8gdGhpcy5tb2RlbC5zcGxpY2UociwgMSkgOiB0aGlzLm1vZGVsLnB1c2godGhpcy5wYXRoKSwgXCJjaGVja2JveFwiICE9PSBuICYmICh0aGlzLmN1cnJlbnRDaGVja2JveFZhbCA9ICF0aGlzLmN1cnJlbnRDaGVja2JveFZhbCksIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgdGhpcy5tb2RlbCwgaSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2luZ2xlICYmIChcInJhZGlvXCIgPT09IG4gfHwgdGhpcy5zZWxlY3RPbkNsaWNrTm9kZSAmJiBcInRyZWVcIiA9PT0gbikgJiYgdGhpcy5tb2RlbCAhPT0gdGhpcy5wYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IHRoaXMubW9kZWwsIGEgPSB0aGlzLnBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsID0gYSwgdGhpcy4kZW1pdChcImNoYW5nZVwiLCBhLCBzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoYW5kbGVJdGVtQ2xpY2s6IGZ1bmN0aW9uIChlLCB0KSB7dGhpcy4kZW1pdChcImNsaWNrXCIsIGUsIHQpfSxcbiAgICAgICAgICAgICAgICBoYW5kbGVJdGVtQ2hhbmdlOiBmdW5jdGlvbiAoZSwgdCkge3RoaXMuc2VsZWN0YWJsZSAmJiB0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIGUsIHQpfSxcbiAgICAgICAgICAgICAgICBoYW5kbGVNb3VzZW92ZXI6IGZ1bmN0aW9uICgpIHt0aGlzLmhpZ2hsaWdodE1vdXNlb3Zlck5vZGUgJiYgKHRoaXMuc2VsZWN0YWJsZSB8fCBcIlwiID09PSB0aGlzLnNlbGVjdGFibGVUeXBlKSAmJiAodGhpcy5pc01vdXNlb3ZlciA9ICEwKX0sXG4gICAgICAgICAgICAgICAgaGFuZGxlTW91c2VvdXQ6IGZ1bmN0aW9uICgpIHt0aGlzLmhpZ2hsaWdodE1vdXNlb3Zlck5vZGUgJiYgKHRoaXMuc2VsZWN0YWJsZSB8fCBcIlwiID09PSB0aGlzLnNlbGVjdGFibGVUeXBlKSAmJiAodGhpcy5pc01vdXNlb3ZlciA9ICExKX0sXG4gICAgICAgICAgICAgICAgaXNPYmplY3Q6IGZ1bmN0aW9uIChlKSB7cmV0dXJuIFwib2JqZWN0XCIgPT09IE9iamVjdChwLmEpKGUpfSxcbiAgICAgICAgICAgICAgICBrZXlGb3JtYXR0ZXI6IGZ1bmN0aW9uIChlKSB7cmV0dXJuIHRoaXMuc2hvd0RvdWJsZVF1b3RlcyA/ICdcIicgKyBlICsgJ1wiJyA6IGV9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JDYXB0dXJlZDogZnVuY3Rpb24gKCkge3JldHVybiAhMX0sXG4gICAgICAgICAgICB3YXRjaDoge2RlZXA6IGZ1bmN0aW9uIChlKSB7dGhpcy52aXNpYmxlID0gdGhpcy5jdXJyZW50RGVlcCA8PSBlfSwgcHJvcHNFcnJvcjoge2hhbmRsZXI6IGZ1bmN0aW9uIChlKSB7aWYgKGUpIHRocm93IG5ldyBFcnJvcihcIlt2dWUtanNvbi1wcmV0dHldIFwiICsgZSl9LCBpbW1lZGlhdGU6ICEwfX1cbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbig2KS5mLCBvID0gbigxMCksIGkgPSBuKDEpKFwidG9TdHJpbmdUYWdcIik7XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlLCB0LCBuKSB7ZSAmJiAhbyhlID0gbiA/IGUgOiBlLnByb3RvdHlwZSwgaSkgJiYgcihlLCBpLCB7Y29uZmlndXJhYmxlOiAhMCwgdmFsdWU6IHR9KX1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge2UuZXhwb3J0cyA9IHtkZWZhdWx0OiBuKDcyKSwgX19lc01vZHVsZTogITB9fSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciByID0gbigzMyk7XG4gICAgICAgIHQuYSA9IHtcbiAgICAgICAgICAgIHByb3BzOiB7c2hvd0RvdWJsZVF1b3RlczogQm9vbGVhbiwgcGFyZW50RGF0YToge30sIGRhdGE6IHt9LCBzaG93Q29tbWE6IEJvb2xlYW4sIGN1cnJlbnRLZXk6IFtOdW1iZXIsIFN0cmluZ119LFxuICAgICAgICAgICAgY29tcHV0ZWQ6IHtkYXRhVHlwZTogZnVuY3Rpb24gKCkge3JldHVybiBPYmplY3Qoci5hKSh0aGlzLmRhdGEpfSwgcGFyZW50RGF0YVR5cGU6IGZ1bmN0aW9uICgpIHtyZXR1cm4gT2JqZWN0KHIuYSkodGhpcy5wYXJlbnREYXRhKX19LFxuICAgICAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgICAgIHRleHRGb3JtYXR0ZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gZSArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiID09PSB0aGlzLmRhdGFUeXBlICYmICh0ID0gJ1wiJyArIHQgKyAnXCInKSwgdGhpcy5zaG93Q29tbWEgJiYgKHQgKz0gXCIsXCIpLCB0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAgICAgZnVuY3Rpb24gcihlKSB7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKS5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKX1cblxuICAgICAgICB0LmEgPSByXG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHQuYSA9IHtwcm9wczoge3ZhbHVlOiB7dHlwZTogQm9vbGVhbiwgZGVmYXVsdDogITF9fSwgZGF0YTogZnVuY3Rpb24gKCkge3JldHVybiB7Zm9jdXM6ICExfX0sIGNvbXB1dGVkOiB7bW9kZWw6IHtnZXQ6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy52YWx1ZX0sIHNldDogZnVuY3Rpb24gKGUpIHt0aGlzLiRlbWl0KFwiaW5wdXRcIiwgZSl9fX19XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHQuYSA9IHtcbiAgICAgICAgICAgIHByb3BzOiB7cGF0aDogU3RyaW5nLCB2YWx1ZToge3R5cGU6IFN0cmluZywgZGVmYXVsdDogXCJcIn19LFxuICAgICAgICAgICAgZGF0YTogZnVuY3Rpb24gKCkge3JldHVybiB7Zm9jdXM6ICExfX0sXG4gICAgICAgICAgICBjb21wdXRlZDoge2N1cnJlbnRQYXRoOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMucGF0aH0sIG1vZGVsOiB7Z2V0OiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMudmFsdWV9LCBzZXQ6IGZ1bmN0aW9uIChlKSB7dGhpcy4kZW1pdChcImlucHV0XCIsIGUpfX19LFxuICAgICAgICAgICAgbWV0aG9kczoge3Rlc3Q6IGZ1bmN0aW9uICgpIHt0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIHRoaXMubW9kZWwpfX1cbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgciA9IG4oMzEpLCBvID0gbi5uKHIpLCBpID0gbigzNyk7XG4gICAgICAgIHQuYSA9IHtcbiAgICAgICAgICAgIG1peGluczogW2kuYV0sIHByb3BzOiB7c2hvd0xlbmd0aDogQm9vbGVhbn0sIG1ldGhvZHM6IHtcbiAgICAgICAgICAgICAgICBjbG9zZWRCcmFja2V0c0dlbmVyYXRvcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBBcnJheS5pc0FycmF5KGUpID8gXCJbLi4uXVwiIDogXCJ7Li4ufVwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5icmFja2V0c0Zvcm1hdHRlcih0KVxuICAgICAgICAgICAgICAgIH0sIGxlbmd0aEdlbmVyYXRvcjogZnVuY3Rpb24gKGUpIHtyZXR1cm4gXCIgLy8gXCIgKyAoQXJyYXkuaXNBcnJheShlKSA/IGUubGVuZ3RoICsgXCIgaXRlbXNcIiA6IG8oKShlKS5sZW5ndGggKyBcIiBrZXlzXCIpfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHQuYSA9IHtcbiAgICAgICAgICAgIHByb3BzOiB7dmlzaWJsZToge3JlcXVpcmVkOiAhMCwgdHlwZTogQm9vbGVhbn0sIGRhdGE6IHtyZXF1aXJlZDogITB9LCBzaG93Q29tbWE6IEJvb2xlYW59LFxuICAgICAgICAgICAgY29tcHV0ZWQ6IHtkYXRhVmlzaWFibGU6IHtnZXQ6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy52aXNpYmxlfSwgc2V0OiBmdW5jdGlvbiAoZSkge3RoaXMuJGVtaXQoXCJ1cGRhdGU6dmlzaWJsZVwiLCBlKX19fSxcbiAgICAgICAgICAgIG1ldGhvZHM6IHt0b2dnbGVCcmFja2V0czogZnVuY3Rpb24gKCkge3RoaXMuZGF0YVZpc2lhYmxlID0gIXRoaXMuZGF0YVZpc2lhYmxlfSwgYnJhY2tldHNGb3JtYXR0ZXI6IGZ1bmN0aW9uIChlKSB7cmV0dXJuIHRoaXMuc2hvd0NvbW1hID8gZSArIFwiLFwiIDogZX19XG4gICAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHIgPSBuKDM3KTtcbiAgICAgICAgdC5hID0ge21peGluczogW3IuYV19XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LCBcIl9fZXNNb2R1bGVcIiwge3ZhbHVlOiAhMH0pO1xuICAgICAgICB2YXIgciA9IG4oNDApLCBvID0gbi5uKHIpLCBpID0gbig1MiksIHMgPSBuKDg2KTtcbiAgICAgICAgbi5uKHMpO1xuICAgICAgICB0LmRlZmF1bHQgPSBvKCkoe30sIGkuYSwge3ZlcnNpb246IFwiMS42LjBcIn0pXG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtlLmV4cG9ydHMgPSB7ZGVmYXVsdDogbig0MSksIF9fZXNNb2R1bGU6ICEwfX0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7big0MiksIGUuZXhwb3J0cyA9IG4oMCkuT2JqZWN0LmFzc2lnbn0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbig0KTtcbiAgICAgICAgcihyLlMgKyByLkYsIFwiT2JqZWN0XCIsIHthc3NpZ246IG4oNDYpfSlcbiAgICB9LCBmdW5jdGlvbiAoZSwgdCkge1xuICAgICAgICBlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgZSkgdGhyb3cgVHlwZUVycm9yKGUgKyBcIiBpcyBub3QgYSBmdW5jdGlvbiFcIik7XG4gICAgICAgICAgICByZXR1cm4gZVxuICAgICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtlLmV4cG9ydHMgPSAhbig4KSAmJiAhbig5KShmdW5jdGlvbiAoKSB7cmV0dXJuIDcgIT0gT2JqZWN0LmRlZmluZVByb3BlcnR5KG4oMjApKFwiZGl2XCIpLCBcImFcIiwge2dldDogZnVuY3Rpb24gKCkge3JldHVybiA3fX0pLmF9KX0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbigxMik7XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgICAgICBpZiAoIXIoZSkpIHJldHVybiBlO1xuICAgICAgICAgICAgdmFyIG4sIG87XG4gICAgICAgICAgICBpZiAodCAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIChuID0gZS50b1N0cmluZykgJiYgIXIobyA9IG4uY2FsbChlKSkpIHJldHVybiBvO1xuICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgKG4gPSBlLnZhbHVlT2YpICYmICFyKG8gPSBuLmNhbGwoZSkpKSByZXR1cm4gbztcbiAgICAgICAgICAgIGlmICghdCAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIChuID0gZS50b1N0cmluZykgJiYgIXIobyA9IG4uY2FsbChlKSkpIHJldHVybiBvO1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpXG4gICAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHIgPSBuKDE0KSwgbyA9IG4oNTApLCBpID0gbig1MSksIHMgPSBuKDExKSwgYSA9IG4oMjIpLCBjID0gT2JqZWN0LmFzc2lnbjtcbiAgICAgICAgZS5leHBvcnRzID0gIWMgfHwgbig5KShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZSA9IHt9LCB0ID0ge30sIG4gPSBTeW1ib2woKSwgciA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3RcIjtcbiAgICAgICAgICAgIHJldHVybiBlW25dID0gNywgci5zcGxpdChcIlwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7dFtlXSA9IGV9KSwgNyAhPSBjKHt9LCBlKVtuXSB8fCBPYmplY3Qua2V5cyhjKHt9LCB0KSkuam9pbihcIlwiKSAhPSByXG4gICAgICAgIH0pID8gZnVuY3Rpb24gKGUsIHQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSBzKGUpLCBjID0gYXJndW1lbnRzLmxlbmd0aCwgdSA9IDEsIGwgPSBvLmYsIGYgPSBpLmY7IGMgPiB1OykgZm9yICh2YXIgcCwgZCA9IGEoYXJndW1lbnRzW3UrK10pLCBoID0gbCA/IHIoZCkuY29uY2F0KGwoZCkpIDogcihkKSwgdiA9IGgubGVuZ3RoLCBiID0gMDsgdiA+IGI7KSBmLmNhbGwoZCwgcCA9IGhbYisrXSkgJiYgKG5bcF0gPSBkW3BdKTtcbiAgICAgICAgICAgIHJldHVybiBuXG4gICAgICAgIH0gOiBjXG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBuKDEwKSwgbyA9IG4oMjEpLCBpID0gbig0OCkoITEpLCBzID0gbigxNykoXCJJRV9QUk9UT1wiKTtcbiAgICAgICAgZS5leHBvcnRzID0gZnVuY3Rpb24gKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBuLCBhID0gbyhlKSwgYyA9IDAsIHUgPSBbXTtcbiAgICAgICAgICAgIGZvciAobiBpbiBhKSBuICE9IHMgJiYgcihhLCBuKSAmJiB1LnB1c2gobik7XG4gICAgICAgICAgICBmb3IgKDsgdC5sZW5ndGggPiBjOykgcihhLCBuID0gdFtjKytdKSAmJiAofmkodSwgbikgfHwgdS5wdXNoKG4pKTtcbiAgICAgICAgICAgIHJldHVybiB1XG4gICAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICB2YXIgciA9IG4oMjEpLCBvID0gbigyNCksIGkgPSBuKDQ5KTtcbiAgICAgICAgZS5leHBvcnRzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodCwgbiwgcykge1xuICAgICAgICAgICAgICAgIHZhciBhLCBjID0gcih0KSwgdSA9IG8oYy5sZW5ndGgpLCBsID0gaShzLCB1KTtcbiAgICAgICAgICAgICAgICBpZiAoZSAmJiBuICE9IG4pIHtmb3IgKDsgdSA+IGw7KSBpZiAoKGEgPSBjW2wrK10pICE9IGEpIHJldHVybiAhMH0gZWxzZSBmb3IgKDsgdSA+IGw7IGwrKykgaWYgKChlIHx8IGwgaW4gYykgJiYgY1tsXSA9PT0gbikgcmV0dXJuIGUgfHwgbCB8fCAwO1xuICAgICAgICAgICAgICAgIHJldHVybiAhZSAmJiAtMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBuKDE2KSwgbyA9IE1hdGgubWF4LCBpID0gTWF0aC5taW47XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlLCB0KSB7cmV0dXJuIGUgPSByKGUpLCBlIDwgMCA/IG8oZSArIHQsIDApIDogaShlLCB0KX1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCkge3QuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHN9LCBmdW5jdGlvbiAoZSwgdCkge3QuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciByID0gbigyOSksIG8gPSBuKDg1KSwgaSA9IG4oMiksIHMgPSBpKHIuYSwgby5hLCAhMSwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgIHQuYSA9IHMuZXhwb3J0c1xuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB0Ll9fZXNNb2R1bGUgPSAhMDtcbiAgICAgICAgdmFyIHIgPSBuKDU0KSwgbyA9IGZ1bmN0aW9uIChlKSB7cmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHtkZWZhdWx0OiBlfX0ocik7XG4gICAgICAgIHQuZGVmYXVsdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHQgPSAwLCBuID0gQXJyYXkoZS5sZW5ndGgpOyB0IDwgZS5sZW5ndGg7IHQrKykgblt0XSA9IGVbdF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoMCwgby5kZWZhdWx0KShlKVxuICAgICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtlLmV4cG9ydHMgPSB7ZGVmYXVsdDogbig1NSksIF9fZXNNb2R1bGU6ICEwfX0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7big1NiksIG4oNjUpLCBlLmV4cG9ydHMgPSBuKDApLkFycmF5LmZyb219LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHIgPSBuKDU3KSghMCk7XG4gICAgICAgIG4oNTgpKFN0cmluZywgXCJTdHJpbmdcIiwgZnVuY3Rpb24gKGUpIHt0aGlzLl90ID0gU3RyaW5nKGUpLCB0aGlzLl9pID0gMH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlLCB0ID0gdGhpcy5fdCwgbiA9IHRoaXMuX2k7XG4gICAgICAgICAgICByZXR1cm4gbiA+PSB0Lmxlbmd0aCA/IHt2YWx1ZTogdm9pZCAwLCBkb25lOiAhMH0gOiAoZSA9IHIodCwgbiksIHRoaXMuX2kgKz0gZS5sZW5ndGgsIHt2YWx1ZTogZSwgZG9uZTogITF9KVxuICAgICAgICB9KVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbigxNiksIG8gPSBuKDE1KTtcbiAgICAgICAgZS5leHBvcnRzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodCwgbikge1xuICAgICAgICAgICAgICAgIHZhciBpLCBzLCBhID0gU3RyaW5nKG8odCkpLCBjID0gcihuKSwgdSA9IGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJldHVybiBjIDwgMCB8fCBjID49IHUgPyBlID8gXCJcIiA6IHZvaWQgMCA6IChpID0gYS5jaGFyQ29kZUF0KGMpLCBpIDwgNTUyOTYgfHwgaSA+IDU2MzE5IHx8IGMgKyAxID09PSB1IHx8IChzID0gYS5jaGFyQ29kZUF0KGMgKyAxKSkgPCA1NjMyMCB8fCBzID4gNTczNDMgPyBlID8gYS5jaGFyQXQoYykgOiBpIDogZSA/IGEuc2xpY2UoYywgYyArIDIpIDogcyAtIDU2MzIwICsgKGkgLSA1NTI5NiA8PCAxMCkgKyA2NTUzNilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgciA9IG4oMjYpLCBvID0gbig0KSwgaSA9IG4oNTkpLCBzID0gbig1KSwgYSA9IG4oMTgpLCBjID0gbig2MCksIHUgPSBuKDMwKSwgbCA9IG4oNjQpLCBmID0gbigxKShcIml0ZXJhdG9yXCIpLCBwID0gIShbXS5rZXlzICYmIFwibmV4dFwiIGluIFtdLmtleXMoKSksIGQgPSBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXN9O1xuICAgICAgICBlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZSwgdCwgbiwgaCwgdiwgYiwgbSkge1xuICAgICAgICAgICAgYyhuLCB0LCBoKTtcbiAgICAgICAgICAgIHZhciB5LCBnLCB4LCBfID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXAgJiYgZSBpbiBDKSByZXR1cm4gQ1tlXTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZVwia2V5c1wiOlxuICAgICAgICAgICAgICAgICAgICBjYXNlXCJ2YWx1ZXNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7cmV0dXJuIG5ldyBuKHRoaXMsIGUpfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge3JldHVybiBuZXcgbih0aGlzLCBlKX1cbiAgICAgICAgICAgIH0sIGogPSB0ICsgXCIgSXRlcmF0b3JcIiwgayA9IFwidmFsdWVzXCIgPT0gdiwgdyA9ICExLCBDID0gZS5wcm90b3R5cGUsIFMgPSBDW2ZdIHx8IENbXCJAQGl0ZXJhdG9yXCJdIHx8IHYgJiYgQ1t2XSwgTyA9IFMgfHwgXyh2KSwgQSA9IHYgPyBrID8gXyhcImVudHJpZXNcIikgOiBPIDogdm9pZCAwLCBNID0gXCJBcnJheVwiID09IHQgPyBDLmVudHJpZXMgfHwgUyA6IFM7XG4gICAgICAgICAgICBpZiAoTSAmJiAoeCA9IGwoTS5jYWxsKG5ldyBlKSkpICE9PSBPYmplY3QucHJvdG90eXBlICYmIHgubmV4dCAmJiAodSh4LCBqLCAhMCksIHIgfHwgXCJmdW5jdGlvblwiID09IHR5cGVvZiB4W2ZdIHx8IHMoeCwgZiwgZCkpLCBrICYmIFMgJiYgXCJ2YWx1ZXNcIiAhPT0gUy5uYW1lICYmICh3ID0gITAsIE8gPSBmdW5jdGlvbiAoKSB7cmV0dXJuIFMuY2FsbCh0aGlzKX0pLCByICYmICFtIHx8ICFwICYmICF3ICYmIENbZl0gfHwgcyhDLCBmLCBPKSwgYVt0XSA9IE8sIGFbal0gPSBkLCB2KSBpZiAoeSA9IHtcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IGsgPyBPIDogXyhcInZhbHVlc1wiKSxcbiAgICAgICAgICAgICAgICBrZXlzOiBiID8gTyA6IF8oXCJrZXlzXCIpLFxuICAgICAgICAgICAgICAgIGVudHJpZXM6IEFcbiAgICAgICAgICAgIH0sIG0pIGZvciAoZyBpbiB5KSBnIGluIEMgfHwgaShDLCBnLCB5W2ddKTsgZWxzZSBvKG8uUCArIG8uRiAqIChwIHx8IHcpLCB0LCB5KTtcbiAgICAgICAgICAgIHJldHVybiB5XG4gICAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge2UuZXhwb3J0cyA9IG4oNSl9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHIgPSBuKDYxKSwgbyA9IG4oMTMpLCBpID0gbigzMCksIHMgPSB7fTtcbiAgICAgICAgbig1KShzLCBuKDEpKFwiaXRlcmF0b3JcIiksIGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpc30pLCBlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZSwgdCwgbikge2UucHJvdG90eXBlID0gcihzLCB7bmV4dDogbygxLCBuKX0pLCBpKGUsIHQgKyBcIiBJdGVyYXRvclwiKX1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICB2YXIgciA9IG4oNyksIG8gPSBuKDYyKSwgaSA9IG4oMjgpLCBzID0gbigxNykoXCJJRV9QUk9UT1wiKSwgYSA9IGZ1bmN0aW9uICgpIHt9LCBjID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGUsIHQgPSBuKDIwKShcImlmcmFtZVwiKSwgciA9IGkubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICh0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIiwgbig2MykuYXBwZW5kQ2hpbGQodCksIHQuc3JjID0gXCJqYXZhc2NyaXB0OlwiLCBlID0gdC5jb250ZW50V2luZG93LmRvY3VtZW50LCBlLm9wZW4oKSwgZS53cml0ZShcIjxzY3JpcHQ+ZG9jdW1lbnQuRj1PYmplY3Q8XFwvc2NyaXB0PlwiKSwgZS5jbG9zZSgpLCBjID0gZS5GOyByLS07KSBkZWxldGUgYy5wcm90b3R5cGVbaVtyXV07XG4gICAgICAgICAgICByZXR1cm4gYygpXG4gICAgICAgIH07XG4gICAgICAgIGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBuO1xuICAgICAgICAgICAgcmV0dXJuIG51bGwgIT09IGUgPyAoYS5wcm90b3R5cGUgPSByKGUpLCBuID0gbmV3IGEsIGEucHJvdG90eXBlID0gbnVsbCwgbltzXSA9IGUpIDogbiA9IGMoKSwgdm9pZCAwID09PSB0ID8gbiA6IG8obiwgdClcbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbig2KSwgbyA9IG4oNyksIGkgPSBuKDE0KTtcbiAgICAgICAgZS5leHBvcnRzID0gbig4KSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gKGUsIHQpIHtcbiAgICAgICAgICAgIG8oZSk7XG4gICAgICAgICAgICBmb3IgKHZhciBuLCBzID0gaSh0KSwgYSA9IHMubGVuZ3RoLCBjID0gMDsgYSA+IGM7KSByLmYoZSwgbiA9IHNbYysrXSwgdFtuXSk7XG4gICAgICAgICAgICByZXR1cm4gZVxuICAgICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBuKDMpLmRvY3VtZW50O1xuICAgICAgICBlLmV4cG9ydHMgPSByICYmIHIuZG9jdW1lbnRFbGVtZW50XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBuKDEwKSwgbyA9IG4oMTEpLCBpID0gbigxNykoXCJJRV9QUk9UT1wiKSwgcyA9IE9iamVjdC5wcm90b3R5cGU7XG4gICAgICAgIGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoZSkge3JldHVybiBlID0gbyhlKSwgcihlLCBpKSA/IGVbaV0gOiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGUuY29uc3RydWN0b3IgJiYgZSBpbnN0YW5jZW9mIGUuY29uc3RydWN0b3IgPyBlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSA6IGUgaW5zdGFuY2VvZiBPYmplY3QgPyBzIDogbnVsbH1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHIgPSBuKDE5KSwgbyA9IG4oNCksIGkgPSBuKDExKSwgcyA9IG4oNjYpLCBhID0gbig2NyksIGMgPSBuKDI0KSwgdSA9IG4oNjgpLCBsID0gbig2OSk7XG4gICAgICAgIG8oby5TICsgby5GICogIW4oNzEpKGZ1bmN0aW9uIChlKSB7QXJyYXkuZnJvbShlKX0pLCBcIkFycmF5XCIsIHtcbiAgICAgICAgICAgIGZyb206IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQsIG4sIG8sIGYsIHAgPSBpKGUpLCBkID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiB0aGlzID8gdGhpcyA6IEFycmF5LCBoID0gYXJndW1lbnRzLmxlbmd0aCwgdiA9IGggPiAxID8gYXJndW1lbnRzWzFdIDogdm9pZCAwLCBiID0gdm9pZCAwICE9PSB2LCBtID0gMCwgeSA9IGwocCk7XG4gICAgICAgICAgICAgICAgaWYgKGIgJiYgKHYgPSByKHYsIGggPiAyID8gYXJndW1lbnRzWzJdIDogdm9pZCAwLCAyKSksIHZvaWQgMCA9PSB5IHx8IGQgPT0gQXJyYXkgJiYgYSh5KSkgZm9yICh0ID0gYyhwLmxlbmd0aCksIG4gPSBuZXcgZCh0KTsgdCA+IG07IG0rKykgdShuLCBtLCBiID8gdihwW21dLCBtKSA6IHBbbV0pOyBlbHNlIGZvciAoZiA9IHkuY2FsbChwKSwgbiA9IG5ldyBkOyAhKG8gPSBmLm5leHQoKSkuZG9uZTsgbSsrKSB1KG4sIG0sIGIgPyBzKGYsIHYsIFtvLnZhbHVlLCBtXSwgITApIDogby52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG4ubGVuZ3RoID0gbSwgblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbig3KTtcbiAgICAgICAgZS5leHBvcnRzID0gZnVuY3Rpb24gKGUsIHQsIG4sIG8pIHtcbiAgICAgICAgICAgIHRyeSB7cmV0dXJuIG8gPyB0KHIobilbMF0sIG5bMV0pIDogdChuKX0gY2F0Y2ggKHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IGUucmV0dXJuO1xuICAgICAgICAgICAgICAgIHRocm93IHZvaWQgMCAhPT0gaSAmJiByKGkuY2FsbChlKSksIHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbigxOCksIG8gPSBuKDEpKFwiaXRlcmF0b3JcIiksIGkgPSBBcnJheS5wcm90b3R5cGU7XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlKSB7cmV0dXJuIHZvaWQgMCAhPT0gZSAmJiAoci5BcnJheSA9PT0gZSB8fCBpW29dID09PSBlKX1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHIgPSBuKDYpLCBvID0gbigxMyk7XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlLCB0LCBuKSB7dCBpbiBlID8gci5mKGUsIHQsIG8oMCwgbikpIDogZVt0XSA9IG59XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBuKDcwKSwgbyA9IG4oMSkoXCJpdGVyYXRvclwiKSwgaSA9IG4oMTgpO1xuICAgICAgICBlLmV4cG9ydHMgPSBuKDApLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGUpIHtpZiAodm9pZCAwICE9IGUpIHJldHVybiBlW29dIHx8IGVbXCJAQGl0ZXJhdG9yXCJdIHx8IGlbcihlKV19XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBuKDIzKSwgbyA9IG4oMSkoXCJ0b1N0cmluZ1RhZ1wiKSwgaSA9IFwiQXJndW1lbnRzXCIgPT0gcihmdW5jdGlvbiAoKSB7cmV0dXJuIGFyZ3VtZW50c30oKSksIHMgPSBmdW5jdGlvbiAoZSwgdCkge3RyeSB7cmV0dXJuIGVbdF19IGNhdGNoIChlKSB7fX07XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgdCwgbiwgYTtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIDAgPT09IGUgPyBcIlVuZGVmaW5lZFwiIDogbnVsbCA9PT0gZSA/IFwiTnVsbFwiIDogXCJzdHJpbmdcIiA9PSB0eXBlb2YgKG4gPSBzKHQgPSBPYmplY3QoZSksIG8pKSA/IG4gOiBpID8gcih0KSA6IFwiT2JqZWN0XCIgPT0gKGEgPSByKHQpKSAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHQuY2FsbGVlID8gXCJBcmd1bWVudHNcIiA6IGFcbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIHZhciByID0gbigxKShcIml0ZXJhdG9yXCIpLCBvID0gITE7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgaSA9IFs3XVtyXSgpO1xuICAgICAgICAgICAgaS5yZXR1cm4gPSBmdW5jdGlvbiAoKSB7byA9ICEwfSwgQXJyYXkuZnJvbShpLCBmdW5jdGlvbiAoKSB7dGhyb3cgMn0pXG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgICAgICBpZiAoIXQgJiYgIW8pIHJldHVybiAhMTtcbiAgICAgICAgICAgIHZhciBuID0gITE7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gWzddLCBzID0gaVtyXSgpO1xuICAgICAgICAgICAgICAgIHMubmV4dCA9IGZ1bmN0aW9uICgpIHtyZXR1cm4ge2RvbmU6IG4gPSAhMH19LCBpW3JdID0gZnVuY3Rpb24gKCkge3JldHVybiBzfSwgZShpKVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIHJldHVybiBuXG4gICAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge24oNzMpLCBlLmV4cG9ydHMgPSBuKDApLk9iamVjdC5rZXlzfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBuKDExKSwgbyA9IG4oMTQpO1xuICAgICAgICBuKDc0KShcImtleXNcIiwgZnVuY3Rpb24gKCkge3JldHVybiBmdW5jdGlvbiAoZSkge3JldHVybiBvKHIoZSkpfX0pXG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBuKDQpLCBvID0gbigwKSwgaSA9IG4oOSk7XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgICAgICB2YXIgbiA9IChvLk9iamVjdCB8fCB7fSlbZV0gfHwgT2JqZWN0W2VdLCBzID0ge307XG4gICAgICAgICAgICBzW2VdID0gdChuKSwgcihyLlMgKyByLkYgKiBpKGZ1bmN0aW9uICgpIHtuKDEpfSksIFwiT2JqZWN0XCIsIHMpXG4gICAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHIgPSBuKDMyKSwgbyA9IG4oNzYpLCBpID0gbigyKSwgcyA9IGkoci5hLCBvLmEsICExLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgdC5hID0gcy5leHBvcnRzXG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciByID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLCB0ID0gZS4kY3JlYXRlRWxlbWVudCwgbiA9IGUuX3NlbGYuX2MgfHwgdDtcbiAgICAgICAgICAgIHJldHVybiBuKFwiZGl2XCIsIFtlLl90KFwiZGVmYXVsdFwiKSwgZS5fdihcIiBcIiksIG4oXCJzcGFuXCIsIHtjbGFzczogXCJ2anMtdmFsdWUgdmpzLXZhbHVlX19cIiArIGUuZGF0YVR5cGV9LCBbZS5fdihcIlxcbiAgICBcIiArIGUuX3MoZS50ZXh0Rm9ybWF0dGVyKGUuZGF0YSkpICsgXCJcXG4gIFwiKV0pXSwgMilcbiAgICAgICAgfSwgbyA9IFtdLCBpID0ge3JlbmRlcjogciwgc3RhdGljUmVuZGVyRm5zOiBvfTtcbiAgICAgICAgdC5hID0gaVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgciA9IG4oMzQpLCBvID0gbig3OCksIGkgPSBuKDIpLCBzID0gaShyLmEsIG8uYSwgITEsIG51bGwsIG51bGwsIG51bGwpO1xuICAgICAgICB0LmEgPSBzLmV4cG9ydHNcbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMsIHQgPSBlLiRjcmVhdGVFbGVtZW50LCBuID0gZS5fc2VsZi5fYyB8fCB0O1xuICAgICAgICAgICAgcmV0dXJuIG4oXCJsYWJlbFwiLCB7Y2xhc3M6IFtcInZqcy1jaGVja2JveFwiLCBlLnZhbHVlID8gXCJpcy1jaGVja2VkXCIgOiBcIlwiXSwgb246IHtjbGljazogZnVuY3Rpb24gKGUpIHtlLnN0b3BQcm9wYWdhdGlvbigpfX19LCBbbihcInNwYW5cIiwge3N0YXRpY0NsYXNzOiBcInZqcy1jaGVja2JveF9faW5uZXJcIn0pLCBlLl92KFwiIFwiKSwgbihcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbe25hbWU6IFwibW9kZWxcIiwgcmF3TmFtZTogXCJ2LW1vZGVsXCIsIHZhbHVlOiBlLm1vZGVsLCBleHByZXNzaW9uOiBcIm1vZGVsXCJ9XSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ2anMtY2hlY2tib3hfX29yaWdpbmFsXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHt0eXBlOiBcImNoZWNrYm94XCJ9LFxuICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7Y2hlY2tlZDogQXJyYXkuaXNBcnJheShlLm1vZGVsKSA/IGUuX2koZS5tb2RlbCwgbnVsbCkgPiAtMSA6IGUubW9kZWx9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogW2Z1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IGUubW9kZWwsIHIgPSB0LnRhcmdldCwgbyA9ICEhci5jaGVja2VkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGUuX2kobiwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgci5jaGVja2VkID8gaSA8IDAgJiYgKGUubW9kZWwgPSBuLmNvbmNhdChbbnVsbF0pKSA6IGkgPiAtMSAmJiAoZS5tb2RlbCA9IG4uc2xpY2UoMCwgaSkuY29uY2F0KG4uc2xpY2UoaSArIDEpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBlLm1vZGVsID0gb1xuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAodCkge3JldHVybiBlLiRlbWl0KFwiY2hhbmdlXCIsIGUubW9kZWwpfV0sIGZvY3VzOiBmdW5jdGlvbiAodCkge2UuZm9jdXMgPSAhMH0sIGJsdXI6IGZ1bmN0aW9uICh0KSB7ZS5mb2N1cyA9ICExfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXSlcbiAgICAgICAgfSwgbyA9IFtdLCBpID0ge3JlbmRlcjogciwgc3RhdGljUmVuZGVyRm5zOiBvfTtcbiAgICAgICAgdC5hID0gaVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgciA9IG4oMzUpLCBvID0gbig4MCksIGkgPSBuKDIpLCBzID0gaShyLmEsIG8uYSwgITEsIG51bGwsIG51bGwsIG51bGwpO1xuICAgICAgICB0LmEgPSBzLmV4cG9ydHNcbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMsIHQgPSBlLiRjcmVhdGVFbGVtZW50LCBuID0gZS5fc2VsZi5fYyB8fCB0O1xuICAgICAgICAgICAgcmV0dXJuIG4oXCJsYWJlbFwiLCB7Y2xhc3M6IFtcInZqcy1yYWRpb1wiLCBlLm1vZGVsID09PSBlLmN1cnJlbnRQYXRoID8gXCJpcy1jaGVja2VkXCIgOiBcIlwiXSwgb246IHtjbGljazogZnVuY3Rpb24gKGUpIHtlLnN0b3BQcm9wYWdhdGlvbigpfX19LCBbbihcInNwYW5cIiwge3N0YXRpY0NsYXNzOiBcInZqcy1yYWRpb19faW5uZXJcIn0pLCBlLl92KFwiIFwiKSwgbihcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZS5tb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgfV0sIHN0YXRpY0NsYXNzOiBcInZqcy1yYWRpb19fb3JpZ2luYWxcIiwgYXR0cnM6IHt0eXBlOiBcInJhZGlvXCJ9LCBkb21Qcm9wczoge3ZhbHVlOiBlLmN1cnJlbnRQYXRoLCBjaGVja2VkOiBlLl9xKGUubW9kZWwsIGUuY3VycmVudFBhdGgpfSwgb246IHtjaGFuZ2U6IFtmdW5jdGlvbiAodCkge2UubW9kZWwgPSBlLmN1cnJlbnRQYXRofSwgZS50ZXN0XSwgZm9jdXM6IGZ1bmN0aW9uICh0KSB7ZS5mb2N1cyA9ICEwfSwgYmx1cjogZnVuY3Rpb24gKHQpIHtlLmZvY3VzID0gITF9fVxuICAgICAgICAgICAgfSldKVxuICAgICAgICB9LCBvID0gW10sIGkgPSB7cmVuZGVyOiByLCBzdGF0aWNSZW5kZXJGbnM6IG99O1xuICAgICAgICB0LmEgPSBpXG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciByID0gbigzNiksIG8gPSBuKDgyKSwgaSA9IG4oMiksIHMgPSBpKHIuYSwgby5hLCAhMSwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgIHQuYSA9IHMuZXhwb3J0c1xuICAgIH0sIGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcywgdCA9IGUuJGNyZWF0ZUVsZW1lbnQsIG4gPSBlLl9zZWxmLl9jIHx8IHQ7XG4gICAgICAgICAgICByZXR1cm4gbihcImRpdlwiLCBbZS5fdChcImRlZmF1bHRcIiksIGUuX3YoXCIgXCIpLCBuKFwic3BhblwiLCB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW3tuYW1lOiBcInNob3dcIiwgcmF3TmFtZTogXCJ2LXNob3dcIiwgdmFsdWU6IGUuZGF0YVZpc2lhYmxlLCBleHByZXNzaW9uOiBcImRhdGFWaXNpYWJsZVwifV0sXG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidmpzLXRyZWVfX2JyYWNrZXRzXCIsXG4gICAgICAgICAgICAgICAgb246IHtjbGljazogZnVuY3Rpb24gKHQpIHtyZXR1cm4gdC5zdG9wUHJvcGFnYXRpb24oKSwgZS50b2dnbGVCcmFja2V0cyh0KX19XG4gICAgICAgICAgICB9LCBbZS5fdihcIlxcbiAgICBcIiArIGUuX3MoQXJyYXkuaXNBcnJheShlLmRhdGEpID8gXCJbXCIgOiBcIntcIikgKyBcIlxcbiAgXCIpXSksIGUuX3YoXCIgXCIpLCBuKFwic3BhblwiLCB7ZGlyZWN0aXZlczogW3tuYW1lOiBcInNob3dcIiwgcmF3TmFtZTogXCJ2LXNob3dcIiwgdmFsdWU6ICFlLmRhdGFWaXNpYWJsZSwgZXhwcmVzc2lvbjogXCIhZGF0YVZpc2lhYmxlXCJ9XX0sIFtuKFwic3BhblwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidmpzLXRyZWVfX2JyYWNrZXRzXCIsXG4gICAgICAgICAgICAgICAgb246IHtjbGljazogZnVuY3Rpb24gKHQpIHtyZXR1cm4gdC5zdG9wUHJvcGFnYXRpb24oKSwgZS50b2dnbGVCcmFja2V0cyh0KX19XG4gICAgICAgICAgICB9LCBbZS5fdihcIlxcbiAgICAgIFwiICsgZS5fcyhlLmNsb3NlZEJyYWNrZXRzR2VuZXJhdG9yKGUuZGF0YSkpICsgXCJcXG4gICAgXCIpXSksIGUuX3YoXCIgXCIpLCBlLnNob3dMZW5ndGggPyBuKFwic3BhblwiLCB7c3RhdGljQ2xhc3M6IFwidmpzLWNvbW1lbnRcIn0sIFtlLl92KFwiXFxuICAgICAgXCIgKyBlLl9zKGUubGVuZ3RoR2VuZXJhdG9yKGUuZGF0YSkpICsgXCJcXG4gICAgXCIpXSkgOiBlLl9lKCldKV0sIDIpXG4gICAgICAgIH0sIG8gPSBbXSwgaSA9IHtyZW5kZXI6IHIsIHN0YXRpY1JlbmRlckZuczogb307XG4gICAgICAgIHQuYSA9IGlcbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHIgPSBuKDM4KSwgbyA9IG4oODQpLCBpID0gbigyKSwgcyA9IGkoci5hLCBvLmEsICExLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgdC5hID0gcy5leHBvcnRzXG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciByID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLCB0ID0gZS4kY3JlYXRlRWxlbWVudCwgbiA9IGUuX3NlbGYuX2MgfHwgdDtcbiAgICAgICAgICAgIHJldHVybiBuKFwiZGl2XCIsIHtkaXJlY3RpdmVzOiBbe25hbWU6IFwic2hvd1wiLCByYXdOYW1lOiBcInYtc2hvd1wiLCB2YWx1ZTogZS5kYXRhVmlzaWFibGUsIGV4cHJlc3Npb246IFwiZGF0YVZpc2lhYmxlXCJ9XX0sIFtuKFwic3BhblwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidmpzLXRyZWVfX2JyYWNrZXRzXCIsXG4gICAgICAgICAgICAgICAgb246IHtjbGljazogZnVuY3Rpb24gKHQpIHtyZXR1cm4gdC5zdG9wUHJvcGFnYXRpb24oKSwgZS50b2dnbGVCcmFja2V0cyh0KX19XG4gICAgICAgICAgICB9LCBbZS5fdihcIlxcbiAgICBcIiArIGUuX3MoZS5icmFja2V0c0Zvcm1hdHRlcihBcnJheS5pc0FycmF5KGUuZGF0YSkgPyBcIl1cIiA6IFwifVwiKSkgKyBcIlxcbiAgXCIpXSldKVxuICAgICAgICB9LCBvID0gW10sIGkgPSB7cmVuZGVyOiByLCBzdGF0aWNSZW5kZXJGbnM6IG99O1xuICAgICAgICB0LmEgPSBpXG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciByID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLCB0ID0gZS4kY3JlYXRlRWxlbWVudCwgbiA9IGUuX3NlbGYuX2MgfHwgdDtcbiAgICAgICAgICAgIHJldHVybiBuKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICAgICBcInZqcy10cmVlXCI6ICEwLFxuICAgICAgICAgICAgICAgICAgICBcImhhcy1zZWxlY3RhYmxlLWNvbnRyb2xcIjogZS5pc011bHRpcGxlIHx8IGUuc2hvd1NlbGVjdENvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgICAgIFwiaXMtcm9vdFwiOiAxID09PSBlLmN1cnJlbnREZWVwLFxuICAgICAgICAgICAgICAgICAgICBcImlzLXNlbGVjdGFibGVcIjogZS5zZWxlY3RhYmxlLFxuICAgICAgICAgICAgICAgICAgICBcImlzLXNlbGVjdGVkXCI6IGUuaXNTZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgXCJpcy1oaWdobGlnaHQtc2VsZWN0ZWRcIjogZS5pc1NlbGVjdGVkICYmIGUuaGlnaGxpZ2h0U2VsZWN0ZWROb2RlLFxuICAgICAgICAgICAgICAgICAgICBcImlzLW1vdXNlb3ZlclwiOiBlLmlzTW91c2VvdmVyXG4gICAgICAgICAgICAgICAgfSwgb246IHtjbGljazogZnVuY3Rpb24gKHQpIHtyZXR1cm4gdC5zdG9wUHJvcGFnYXRpb24oKSwgZS5oYW5kbGVDbGljayh0LCBcInRyZWVcIil9LCBtb3VzZW92ZXI6IGZ1bmN0aW9uICh0KSB7cmV0dXJuIHQuc3RvcFByb3BhZ2F0aW9uKCksIGUuaGFuZGxlTW91c2VvdmVyKHQpfSwgbW91c2VvdXQ6IGZ1bmN0aW9uICh0KSB7cmV0dXJuIHQuc3RvcFByb3BhZ2F0aW9uKCksIGUuaGFuZGxlTW91c2VvdXQodCl9fVxuICAgICAgICAgICAgfSwgW2Uuc2hvd1NlbGVjdENvbnRyb2xsZXIgJiYgZS5zZWxlY3RhYmxlID8gW2UuaXNNdWx0aXBsZSA/IG4oXCJ2dWUtY2hlY2tib3hcIiwge1xuICAgICAgICAgICAgICAgIG9uOiB7Y2hhbmdlOiBmdW5jdGlvbiAodCkge3JldHVybiBlLmhhbmRsZUNsaWNrKHQsIFwiY2hlY2tib3hcIil9fSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge3ZhbHVlOiBlLmN1cnJlbnRDaGVja2JveFZhbCwgY2FsbGJhY2s6IGZ1bmN0aW9uICh0KSB7ZS5jdXJyZW50Q2hlY2tib3hWYWwgPSB0fSwgZXhwcmVzc2lvbjogXCJjdXJyZW50Q2hlY2tib3hWYWxcIn1cbiAgICAgICAgICAgIH0pIDogZS5pc1NpbmdsZSA/IG4oXCJ2dWUtcmFkaW9cIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7cGF0aDogZS5wYXRofSxcbiAgICAgICAgICAgICAgICBvbjoge2NoYW5nZTogZnVuY3Rpb24gKHQpIHtyZXR1cm4gZS5oYW5kbGVDbGljayh0LCBcInJhZGlvXCIpfX0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHt2YWx1ZTogZS5tb2RlbCwgY2FsbGJhY2s6IGZ1bmN0aW9uICh0KSB7ZS5tb2RlbCA9IHR9LCBleHByZXNzaW9uOiBcIm1vZGVsXCJ9XG4gICAgICAgICAgICB9KSA6IGUuX2UoKV0gOiBlLl9lKCksIGUuX3YoXCIgXCIpLCBBcnJheS5pc0FycmF5KGUuZGF0YSkgfHwgZS5pc09iamVjdChlLmRhdGEpID8gW24oXCJicmFja2V0cy1sZWZ0XCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge3Zpc2libGU6IGUudmlzaWJsZSwgZGF0YTogZS5kYXRhLCBcInNob3ctbGVuZ3RoXCI6IGUuc2hvd0xlbmd0aCwgXCJzaG93LWNvbW1hXCI6IGUubm90TGFzdEtleX0sXG4gICAgICAgICAgICAgICAgb246IHtcInVwZGF0ZTp2aXNpYmxlXCI6IGZ1bmN0aW9uICh0KSB7ZS52aXNpYmxlID0gdH19XG4gICAgICAgICAgICB9LCBbZS5jdXJyZW50RGVlcCA+IDEgJiYgIUFycmF5LmlzQXJyYXkoZS5wYXJlbnREYXRhKSA/IG4oXCJzcGFuXCIsIHtzdGF0aWNDbGFzczogXCJ2anMta2V5XCJ9LCBbZS5fdihlLl9zKGUua2V5Rm9ybWF0dGVyKGUuY3VycmVudEtleSkpICsgXCI6XCIpXSkgOiBlLl9lKCldKSwgZS5fdihcIiBcIiksIGUuX2woZS5kYXRhLCBmdW5jdGlvbiAodCwgcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXNob3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlLnZpc2libGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInZpc2libGVcIlxuICAgICAgICAgICAgICAgICAgICB9XSwga2V5OiByLCBjbGFzczoge1widmpzLXRyZWVfX2NvbnRlbnRcIjogITAsIFwiaGFzLWxpbmVcIjogZS5zaG93TGluZX1cbiAgICAgICAgICAgICAgICB9LCBbbihcInZ1ZS1qc29uLXByZXR0eVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudC1kYXRhXCI6IGUuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWVwOiBlLmRlZXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNob3ctbGVuZ3RoXCI6IGUuc2hvd0xlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvdy1kb3VibGUtcXVvdGVzXCI6IGUuc2hvd0RvdWJsZVF1b3RlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvdy1saW5lXCI6IGUuc2hvd0xpbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhpZ2hsaWdodC1tb3VzZW92ZXItbm9kZVwiOiBlLmhpZ2hsaWdodE1vdXNlb3Zlck5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhpZ2hsaWdodC1zZWxlY3RlZC1ub2RlXCI6IGUuaGlnaGxpZ2h0U2VsZWN0ZWROb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogZS5wYXRoICsgKEFycmF5LmlzQXJyYXkoZS5kYXRhKSA/IFwiW1wiICsgciArIFwiXVwiIDogXCIuXCIgKyByKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGF0aC1zZWxlY3RhYmxlXCI6IGUucGF0aFNlbGVjdGFibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGFibGUtdHlwZVwiOiBlLnNlbGVjdGFibGVUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93LXNlbGVjdC1jb250cm9sbGVyXCI6IGUuc2hvd1NlbGVjdENvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdC1vbi1jbGljay1ub2RlXCI6IGUuc2VsZWN0T25DbGlja05vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnQta2V5XCI6IHIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnQtZGVlcFwiOiBlLmN1cnJlbnREZWVwICsgMVxuICAgICAgICAgICAgICAgICAgICB9LCBvbjoge2NsaWNrOiBlLmhhbmRsZUl0ZW1DbGljaywgY2hhbmdlOiBlLmhhbmRsZUl0ZW1DaGFuZ2V9LCBtb2RlbDoge3ZhbHVlOiBlLm1vZGVsLCBjYWxsYmFjazogZnVuY3Rpb24gKHQpIHtlLm1vZGVsID0gdH0sIGV4cHJlc3Npb246IFwibW9kZWxcIn1cbiAgICAgICAgICAgICAgICB9KV0sIDEpXG4gICAgICAgICAgICB9KSwgZS5fdihcIiBcIiksIG4oXCJicmFja2V0cy1yaWdodFwiLCB7YXR0cnM6IHt2aXNpYmxlOiBlLnZpc2libGUsIGRhdGE6IGUuZGF0YSwgXCJzaG93LWNvbW1hXCI6IGUubm90TGFzdEtleX0sIG9uOiB7XCJ1cGRhdGU6dmlzaWJsZVwiOiBmdW5jdGlvbiAodCkge2UudmlzaWJsZSA9IHR9fX0pXSA6IG4oXCJzaW1wbGUtdGV4dFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzaG93LWRvdWJsZS1xdW90ZXNcIjogZS5zaG93RG91YmxlUXVvdGVzLFxuICAgICAgICAgICAgICAgICAgICBcInNob3ctY29tbWFcIjogZS5ub3RMYXN0S2V5LFxuICAgICAgICAgICAgICAgICAgICBcInBhcmVudC1kYXRhXCI6IGUucGFyZW50RGF0YSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZS5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnQta2V5XCI6IGUuY3VycmVudEtleVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIFtBcnJheS5pc0FycmF5KGUucGFyZW50RGF0YSkgPyBlLl9lKCkgOiBuKFwic3BhblwiLCB7c3RhdGljQ2xhc3M6IFwidmpzLWtleVwifSwgW2UuX3YoZS5fcyhlLmtleUZvcm1hdHRlcihlLmN1cnJlbnRLZXkpKSArIFwiOlwiKV0pXSldLCAyKVxuICAgICAgICB9LCBvID0gW10sIGkgPSB7cmVuZGVyOiByLCBzdGF0aWNSZW5kZXJGbnM6IG99O1xuICAgICAgICB0LmEgPSBpXG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBuKDg3KTtcbiAgICAgICAgXCJzdHJpbmdcIiA9PSB0eXBlb2YgciAmJiAociA9IFtbZS5pLCByLCBcIlwiXV0pLCByLmxvY2FscyAmJiAoZS5leHBvcnRzID0gci5sb2NhbHMpO1xuICAgICAgICBuKDg5KShcImJmYTZmYzljXCIsIHIsICEwLCB7fSlcbiAgICB9LCBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICB0ID0gZS5leHBvcnRzID0gbig4OCkoITEpLCB0LnB1c2goW2UuaSwgJy52anMtY2hlY2tib3h7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotMzBweDtjb2xvcjojMWYyZDNkO3VzZXItc2VsZWN0Om5vbmV9LnZqcy1jaGVja2JveC5pcy1jaGVja2VkIC52anMtY2hlY2tib3hfX2lubmVye2JhY2tncm91bmQtY29sb3I6IzE4OTBmZjtib3JkZXItY29sb3I6IzAwNzZlNH0udmpzLWNoZWNrYm94LmlzLWNoZWNrZWQgLnZqcy1jaGVja2JveF9faW5uZXI6YWZ0ZXJ7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZykgc2NhbGVZKDEpfS52anMtY2hlY2tib3ggLnZqcy1jaGVja2JveF9faW5uZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7Ym9yZGVyOjFweCBzb2xpZCAjYmZjYmQ5O2JvcmRlci1yYWRpdXM6MnB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtib3gtc2l6aW5nOmJvcmRlci1ib3g7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7ei1pbmRleDoxO2N1cnNvcjpwb2ludGVyO3RyYW5zaXRpb246Ym9yZGVyLWNvbG9yIC4yNXMgY3ViaWMtYmV6aWVyKC43MSwtLjQ2LC4yOSwxLjQ2KSxiYWNrZ3JvdW5kLWNvbG9yIC4yNXMgY3ViaWMtYmV6aWVyKC43MSwtLjQ2LC4yOSwxLjQ2KX0udmpzLWNoZWNrYm94IC52anMtY2hlY2tib3hfX2lubmVyOmFmdGVye2JveC1zaXppbmc6Y29udGVudC1ib3g7Y29udGVudDpcIlwiO2JvcmRlcjoycHggc29saWQgI2ZmZjtib3JkZXItbGVmdDowO2JvcmRlci10b3A6MDtoZWlnaHQ6OHB4O2xlZnQ6NHB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxcHg7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZykgc2NhbGVZKDApO3dpZHRoOjRweDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMTVzIGN1YmljLWJlemllciguNzEsLS40NiwuODgsLjYpIC4wNXM7dHJhbnNmb3JtLW9yaWdpbjpjZW50ZXJ9LnZqcy1jaGVja2JveCAudmpzLWNoZWNrYm94X19vcmlnaW5hbHtvcGFjaXR5OjA7b3V0bGluZTpub25lO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6LTE7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7bWFyZ2luOjB9LnZqcy1yYWRpb3twb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi0zMHB4O2NvbG9yOiMxZjJkM2Q7dXNlci1zZWxlY3Q6bm9uZX0udmpzLXJhZGlvLmlzLWNoZWNrZWQgLnZqcy1yYWRpb19faW5uZXJ7YmFja2dyb3VuZC1jb2xvcjojMTg5MGZmO2JvcmRlci1jb2xvcjojMDA3NmU0fS52anMtcmFkaW8uaXMtY2hlY2tlZCAudmpzLXJhZGlvX19pbm5lcjphZnRlcnt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSkgc2NhbGUoMSl9LnZqcy1yYWRpbyAudmpzLXJhZGlvX19pbm5lcntib3JkZXI6MXB4IHNvbGlkICNiZmNiZDk7Ym9yZGVyLXJhZGl1czoxMDAlO3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7dmVydGljYWwtYWxpZ246bWlkZGxlO2JhY2tncm91bmQtY29sb3I6I2ZmZjtwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9LnZqcy1yYWRpbyAudmpzLXJhZGlvX19pbm5lcjphZnRlcnt3aWR0aDo0cHg7aGVpZ2h0OjRweDtib3JkZXItcmFkaXVzOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojZmZmO2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjUwJTt0b3A6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKSBzY2FsZSgwKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMTVzIGVhc2UtaW59LnZqcy1yYWRpbyAudmpzLXJhZGlvX19vcmlnaW5hbHtvcGFjaXR5OjA7b3V0bGluZTpub25lO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6LTE7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7bWFyZ2luOjB9LnZqcy10cmVle2ZvbnQtZmFtaWx5Ok1vbmFjbyxNZW5sbyxDb25zb2xhcyxCaXRzdHJlYW0gVmVyYSBTYW5zIE1vbm8sbW9ub3NwYWNlO2ZvbnQtc2l6ZToxNHB4fS52anMtdHJlZS5pcy1yb290e3Bvc2l0aW9uOnJlbGF0aXZlfS52anMtdHJlZS5pcy1yb290Lmhhcy1zZWxlY3RhYmxlLWNvbnRyb2x7bWFyZ2luLWxlZnQ6MzBweH0udmpzLXRyZWUuaXMtbW91c2VvdmVye2JhY2tncm91bmQtY29sb3I6I2U2ZjdmZn0udmpzLXRyZWUuaXMtaGlnaGxpZ2h0LXNlbGVjdGVke2JhY2tncm91bmQtY29sb3I6I2NjZWZmZn0udmpzLXRyZWUgLnZqcy10cmVlX19jb250ZW50e3BhZGRpbmctbGVmdDoxZW19LnZqcy10cmVlIC52anMtdHJlZV9fY29udGVudC5oYXMtbGluZXtib3JkZXItbGVmdDoxcHggZG90dGVkICNiZmNiZDl9LnZqcy10cmVlIC52anMtdHJlZV9fYnJhY2tldHN7Y3Vyc29yOnBvaW50ZXJ9LnZqcy10cmVlIC52anMtdHJlZV9fYnJhY2tldHM6aG92ZXJ7Y29sb3I6IzE4OTBmZn0udmpzLXRyZWUgLnZqcy1jb21tZW50e2NvbG9yOiNiZmNiZDl9LnZqcy10cmVlIC52anMtdmFsdWVfX251bGx7Y29sb3I6I2ZmNDk0OX0udmpzLXRyZWUgLnZqcy12YWx1ZV9fYm9vbGVhbiwudmpzLXRyZWUgLnZqcy12YWx1ZV9fbnVtYmVye2NvbG9yOiMxZDhjZTB9LnZqcy10cmVlIC52anMtdmFsdWVfX3N0cmluZ3tjb2xvcjojMTNjZTY2fScsIFwiXCJdKVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgIGZ1bmN0aW9uIG4oZSwgdCkge1xuICAgICAgICAgICAgdmFyIG4gPSBlWzFdIHx8IFwiXCIsIG8gPSBlWzNdO1xuICAgICAgICAgICAgaWYgKCFvKSByZXR1cm4gbjtcbiAgICAgICAgICAgIGlmICh0ICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgYnRvYSkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gcihvKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW25dLmNvbmNhdChvLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChlKSB7cmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIiArIG8uc291cmNlUm9vdCArIGUgKyBcIiAqL1wifSkpLmNvbmNhdChbaV0pLmpvaW4oXCJcXG5cIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbbl0uam9pbihcIlxcblwiKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcihlKSB7cmV0dXJuIFwiLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZSkpKSkgKyBcIiAqL1wifVxuXG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHQudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByID0gbih0LCBlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRbMl0gPyBcIkBtZWRpYSBcIiArIHRbMl0gKyBcIntcIiArIHIgKyBcIn1cIiA6IHJcbiAgICAgICAgICAgICAgICB9KS5qb2luKFwiXCIpXG4gICAgICAgICAgICB9LCB0LmkgPSBmdW5jdGlvbiAoZSwgbikge1xuICAgICAgICAgICAgICAgIFwic3RyaW5nXCIgPT0gdHlwZW9mIGUgJiYgKGUgPSBbW251bGwsIGUsIFwiXCJdXSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IHt9LCBvID0gMDsgbyA8IHRoaXMubGVuZ3RoOyBvKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSB0aGlzW29dWzBdO1xuICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiID09IHR5cGVvZiBpICYmIChyW2ldID0gITApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobyA9IDA7IG8gPCBlLmxlbmd0aDsgbysrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzID0gZVtvXTtcbiAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIiA9PSB0eXBlb2Ygc1swXSAmJiByW3NbMF1dIHx8IChuICYmICFzWzJdID8gc1syXSA9IG4gOiBuICYmIChzWzJdID0gXCIoXCIgKyBzWzJdICsgXCIpIGFuZCAoXCIgKyBuICsgXCIpXCIpLCB0LnB1c2gocykpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdFxuICAgICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgZnVuY3Rpb24gcihlKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IGUubGVuZ3RoOyB0KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IGVbdF0sIHIgPSBsW24uaWRdO1xuICAgICAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgICAgIHIucmVmcysrO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBvID0gMDsgbyA8IHIucGFydHMubGVuZ3RoOyBvKyspIHIucGFydHNbb10obi5wYXJ0c1tvXSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoOyBvIDwgbi5wYXJ0cy5sZW5ndGg7IG8rKykgci5wYXJ0cy5wdXNoKGkobi5wYXJ0c1tvXSkpO1xuICAgICAgICAgICAgICAgICAgICByLnBhcnRzLmxlbmd0aCA+IG4ucGFydHMubGVuZ3RoICYmIChyLnBhcnRzLmxlbmd0aCA9IG4ucGFydHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSBbXSwgbyA9IDA7IG8gPCBuLnBhcnRzLmxlbmd0aDsgbysrKSBzLnB1c2goaShuLnBhcnRzW29dKSk7XG4gICAgICAgICAgICAgICAgICAgIGxbbi5pZF0gPSB7aWQ6IG4uaWQsIHJlZnM6IDEsIHBhcnRzOiBzfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG8oKSB7XG4gICAgICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBlLnR5cGUgPSBcInRleHQvY3NzXCIsIGYuYXBwZW5kQ2hpbGQoZSksIGVcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGkoZSkge1xuICAgICAgICAgICAgdmFyIHQsIG4sIHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic3R5bGVbXCIgKyBtICsgJ349XCInICsgZS5pZCArICdcIl0nKTtcbiAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGgpIHJldHVybiB2O1xuICAgICAgICAgICAgICAgIHIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IGQrKztcbiAgICAgICAgICAgICAgICByID0gcCB8fCAocCA9IG8oKSksIHQgPSBzLmJpbmQobnVsbCwgciwgaSwgITEpLCBuID0gcy5iaW5kKG51bGwsIHIsIGksICEwKVxuICAgICAgICAgICAgfSBlbHNlIHIgPSBvKCksIHQgPSBhLmJpbmQobnVsbCwgciksIG4gPSBmdW5jdGlvbiAoKSB7ci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHIpfTtcbiAgICAgICAgICAgIHJldHVybiB0KGUpLCBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmNzcyA9PT0gZS5jc3MgJiYgci5tZWRpYSA9PT0gZS5tZWRpYSAmJiByLnNvdXJjZU1hcCA9PT0gZS5zb3VyY2VNYXApIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgdChlID0gcilcbiAgICAgICAgICAgICAgICB9IGVsc2UgbigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzKGUsIHQsIG4sIHIpIHtcbiAgICAgICAgICAgIHZhciBvID0gbiA/IFwiXCIgOiByLmNzcztcbiAgICAgICAgICAgIGlmIChlLnN0eWxlU2hlZXQpIGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gZyh0LCBvKTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShvKSwgcyA9IGUuY2hpbGROb2RlcztcbiAgICAgICAgICAgICAgICBzW3RdICYmIGUucmVtb3ZlQ2hpbGQoc1t0XSksIHMubGVuZ3RoID8gZS5pbnNlcnRCZWZvcmUoaSwgc1t0XSkgOiBlLmFwcGVuZENoaWxkKGkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBuID0gdC5jc3MsIHIgPSB0Lm1lZGlhLCBvID0gdC5zb3VyY2VNYXA7XG4gICAgICAgICAgICBpZiAociAmJiBlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIHIpLCBiLnNzcklkICYmIGUuc2V0QXR0cmlidXRlKG0sIHQuaWQpLCBvICYmIChuICs9IFwiXFxuLyojIHNvdXJjZVVSTD1cIiArIG8uc291cmNlc1swXSArIFwiICovXCIsIG4gKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkobykpKSkgKyBcIiAqL1wiKSwgZS5zdHlsZVNoZWV0KSBlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IG47IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoOyBlLmZpcnN0Q2hpbGQ7KSBlLnJlbW92ZUNoaWxkKGUuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShuKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjID0gXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgZG9jdW1lbnQ7XG4gICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBERUJVRyAmJiBERUJVRyAmJiAhYykgdGhyb3cgbmV3IEVycm9yKFwidnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiBVc2UgeyB0YXJnZXQ6ICdub2RlJyB9IGluIHlvdXIgV2VicGFjayBjb25maWcgdG8gaW5kaWNhdGUgYSBzZXJ2ZXItcmVuZGVyaW5nIGVudmlyb25tZW50LlwiKTtcbiAgICAgICAgdmFyIHUgPSBuKDkwKSwgbCA9IHt9LCBmID0gYyAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0pLCBwID0gbnVsbCwgZCA9IDAsIGggPSAhMSwgdiA9IGZ1bmN0aW9uICgpIHt9LCBiID0gbnVsbCwgbSA9IFwiZGF0YS12dWUtc3NyLWlkXCIsIHkgPSBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBuYXZpZ2F0b3IgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgZS5leHBvcnRzID0gZnVuY3Rpb24gKGUsIHQsIG4sIG8pIHtcbiAgICAgICAgICAgIGggPSBuLCBiID0gbyB8fCB7fTtcbiAgICAgICAgICAgIHZhciBpID0gdShlLCB0KTtcbiAgICAgICAgICAgIHJldHVybiByKGkpLCBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG4gPSBbXSwgbyA9IDA7IG8gPCBpLmxlbmd0aDsgbysrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzID0gaVtvXSwgYSA9IGxbcy5pZF07XG4gICAgICAgICAgICAgICAgICAgIGEucmVmcy0tLCBuLnB1c2goYSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdCA/IChpID0gdShlLCB0KSwgcihpKSkgOiBpID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbyA9IDA7IG8gPCBuLmxlbmd0aDsgbysrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gbltvXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IGEucmVmcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBhLnBhcnRzLmxlbmd0aDsgYysrKSBhLnBhcnRzW2NdKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbFthLmlkXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlID0gW107XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQsIG4pIHtyZXR1cm4gZVt0XSA9IG4sIGUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCJcXG5cIil9XG4gICAgICAgIH0oKVxuICAgIH0sIGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgIGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBuID0gW10sIHIgPSB7fSwgbyA9IDA7IG8gPCB0Lmxlbmd0aDsgbysrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSB0W29dLCBzID0gaVswXSwgYSA9IGlbMV0sIGMgPSBpWzJdLCB1ID0gaVszXSwgbCA9IHtpZDogZSArIFwiOlwiICsgbywgY3NzOiBhLCBtZWRpYTogYywgc291cmNlTWFwOiB1fTtcbiAgICAgICAgICAgICAgICByW3NdID8gcltzXS5wYXJ0cy5wdXNoKGwpIDogbi5wdXNoKHJbc10gPSB7aWQ6IHMsIHBhcnRzOiBbbF19KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5cbiAgICAgICAgfVxuICAgIH1dKVxufSk7IiwiY29uc3Qge0NhcmQsIEZvcm0sIEZvcm1JdGVtLCBJbnB1dCwgSWNvbiwgQnV0dG9uLCBNb2RhbH0gPSByZXF1aXJlKCdpdmlldy9kaXN0L2l2aWV3Jyk7XG5jb25zdCBQYWdlVGFibGUgPSByZXF1aXJlKCdwZWFjZXRydWUtaXZpZXcvc3JjL2NvbXBvbmVudHMvcGFnZS10YWJsZScpO1xuY29uc3QgRGV0YWlsID0gcmVxdWlyZSgncGVhY2V0cnVlLWl2aWV3L3NyYy9jb21wb25lbnRzL2RldGFpbCcpO1xuY29uc3QgVnVlSnNvblByZXR0eSA9IHJlcXVpcmUoJ3Z1ZS1qc29uLXByZXR0eScpLmRlZmF1bHQ7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5hbWU6ICdMb2dMaXN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJsb2ctbGlzdFwiPlxuICAgICAgICA8dGVtcGxhdGUgdi1pZj1cInNob3dDb25kaXRpb25cIj5cbiAgICAgICAgPENhcmQgPlxuICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+5p+l6K+i5p2h5Lu2PC9zcGFuPlxuICAgICAgICAgICAgPEZvcm0gcmVmPVwiZm9ybVwiIDptb2RlbD1cInBhcmFtc1wiIGlubGluZT5cbiAgICAgICAgICAgICAgICA8Rm9ybUl0ZW0gcHJvcD1cIm1vZHVsZUNvZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPElucHV0IHR5cGU9XCJ0ZXh0XCIgdi1tb2RlbD1cInBhcmFtcy5tb2R1bGVDb2RlXCIgcGxhY2Vob2xkZXI9XCLmqKHlnZfnvJbnoIFcIi8+XG4gICAgICAgICAgICAgICAgPC9Gb3JtSXRlbT5cbiAgICAgICAgICAgICAgICA8Rm9ybUl0ZW0gcHJvcD1cInJlY29yZElkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dCB0eXBlPVwidGV4dFwiIHYtbW9kZWw9XCJwYXJhbXMucmVjb3JkSWRcIiBwbGFjZWhvbGRlcj1cIuiusOW9leagh+ivhlwiLz5cbiAgICAgICAgICAgICAgICA8L0Zvcm1JdGVtPlxuICAgICAgICAgICAgICAgIDxGb3JtSXRlbSBwcm9wPVwib3BlcmF0ZUNvZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPElucHV0IHR5cGU9XCJ0ZXh0XCIgdi1tb2RlbD1cInBhcmFtcy5vcGVyYXRlQ29kZVwiIHBsYWNlaG9sZGVyPVwi5pON5L2c57yW56CBXCIvPlxuICAgICAgICAgICAgICAgIDwvRm9ybUl0ZW0+XG4gICAgICAgICAgICAgICAgPEZvcm1JdGVtIHByb3A9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8SW5wdXQgdHlwZT1cInRleHRcIiB2LW1vZGVsPVwicGFyYW1zLmRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCLmk43kvZzmj4/ov7BcIi8+XG4gICAgICAgICAgICAgICAgPC9Gb3JtSXRlbT5cbiAgICAgICAgICAgICAgICA8Rm9ybUl0ZW0gcHJvcD1cImNyZWF0b3JJZFwiPlxuICAgICAgICAgICAgICAgICAgICA8SW5wdXQgdHlwZT1cInRleHRcIiB2LW1vZGVsPVwicGFyYW1zLmNyZWF0b3JJZFwiIHBsYWNlaG9sZGVyPVwi5Yib5bu66ICFXCIvPlxuICAgICAgICAgICAgICAgIDwvRm9ybUl0ZW0+XG4gICAgICAgICAgICAgICAgPEZvcm1JdGVtIHByb3A9XCJjcmVhdGVkVGltZS5sb3dlckJvdW5kXCI+XG4gICAgICAgICAgICAgICAgICAgIDxEYXRlLVBpY2tlciB0eXBlPVwiZGF0ZVwiIHBsYWNlaG9sZGVyPVwi5Yib5bu66LW35aeL5pe26Ze0XCIgdi1tb2RlbD1cInBhcmFtcy5jcmVhdGVkVGltZS5sb3dlckJvdW5kXCI+PC9EYXRlLVBpY2tlcj5cbiAgICAgICAgICAgICAgICA8L0Zvcm1JdGVtPlxuICAgICAgICAgICAgICAgIDxGb3JtSXRlbSBwcm9wPVwiY3JlYXRlZFRpbWUudXBwZXJCb3VuZFwiPlxuICAgICAgICAgICAgICAgICAgICA8RGF0ZS1QaWNrZXIgdHlwZT1cImRhdGVcIiBwbGFjZWhvbGRlcj1cIuWIm+W7uue7k+adn+aXtumXtFwiIHYtbW9kZWw9XCJwYXJhbXMuY3JlYXRlZFRpbWUudXBwZXJCb3VuZFwiPjwvRGF0ZS1QaWNrZXI+XG4gICAgICAgICAgICAgICAgPC9Gb3JtSXRlbT5cbiAgICAgICAgICAgICAgICA8Rm9ybUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBAY2xpY2s9XCJxdWVyeSh0cnVlKVwiPuafpeivojwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIEBjbGljaz1cInJlc2V0XCI+5riF56m6PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC9Gb3JtSXRlbT5cbiAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgPC9DYXJkPlxuICAgICAgICA8YnI+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDxDYXJkPlxuICAgICAgICAgICAgPGRpdiBzbG90PVwidGl0bGVcIj57e2xpc3RUaXRsZX19PC9kaXY+XG4gICAgICAgICAgICA8UGFnZVRhYmxlIHJlZj1cInBhZ2VUYWJsZVwiIDp1cmw9XCJ1cmxcIiA6Y29sdW1ucz1cImNvbHVtbnNcIiB2LW1vZGVsPVwicGFyYW1zXCIgOnN1Y2Nlc3MtZm9ybWF0PVwic3VjY2Vzc0Zvcm1hdFwiPjwvUGFnZVRhYmxlPlxuICAgICAgICA8L0NhcmQ+XG4gICAgICAgIDxNb2RhbCB2LW1vZGVsPVwiZGV0YWlsLm1vZGVsXCIgdGl0bGU9XCLml6Xlv5for6bmg4VcIiA6Zm9vdGVyLWhpZGU9XCJ0cnVlXCIgZnVsbHNjcmVlbj5cbiAgICAgICAgICAgIDxkZXRhaWwgdi1pZj1cImRldGFpbC5kYXRhXCIgOmRhdGE9XCJkZXRhaWwuZGF0YVwiIDpzaG93LWNsb3NlPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgICA8cm93PlxuICAgICAgICAgICAgICAgICAgICA8ZGV0YWlsLWl0ZW0gbGFiZWw9XCLmqKHlnZfnvJbnoIFcIiBuYW1lPVwibW9kdWxlQ29kZVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGRldGFpbC1pdGVtIGxhYmVsPVwi6K6w5b2V5qCH6K+GXCIgbmFtZT1cInJlY29yZElkXCIvPlxuICAgICAgICAgICAgICAgIDwvcm93PlxuICAgICAgICAgICAgICAgIDxyb3c+XG4gICAgICAgICAgICAgICAgICAgIDxkZXRhaWwtaXRlbSBsYWJlbD1cIuaTjeS9nOe8lueggVwiIG5hbWU9XCJvcGVyYXRlQ29kZVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGRldGFpbC1pdGVtIGxhYmVsPVwi5pON5L2c5o+P6L+wXCIgbmFtZT1cImRlc2NyaXB0aW9uXCIvPlxuICAgICAgICAgICAgICAgICAgICA8ZGV0YWlsLWl0ZW0gbGFiZWw9XCLogJfml7Yo56eSKVwiPnt7ZGV0YWlsLmRhdGEuZHVyYXRpb24vMTAwMH19PC9kZXRhaWwtaXRlbT5cbiAgICAgICAgICAgICAgICA8L3Jvdz5cbiAgICAgICAgICAgICAgICA8cm93PlxuICAgICAgICAgICAgICAgICAgICA8ZGV0YWlsLWl0ZW0gbGFiZWw9XCLliJvlu7rml7bpl7RcIiBuYW1lPVwiY3JlYXRlZFRpbWVcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxkZXRhaWwtaXRlbSBsYWJlbD1cIuWIm+W7uuiAheagh+ivhlwiIG5hbWU9XCJjcmVhdG9ySWRcIi8+XG4gICAgICAgICAgICAgICAgPC9yb3c+XG4gICAgICAgICAgICAgICAgPGRldGFpbC1oZWFkZXIgOnNpemU9XCIzXCI+6L6T5YWl5Y+C5pWw77yI5pyA6ZW/MjA0Nu+8jOi2hei/h+iiq+aIquaWre+8jOaIquaWreWQjuaXoOazleaMieato+W4uEpTT07lsZXnpLrvvIk8L2RldGFpbC1oZWFkZXI+XG4gICAgICAgICAgICAgICAgPFZ1ZUpzb25QcmV0dHkgOmRhdGE9XCJkZXRhaWwuZGF0YS5pbnB1dFwiIDpkZWVwPVwiMlwiLz5cbiAgICAgICAgICAgICAgICA8ZGV0YWlsLWhlYWRlciA6c2l6ZT1cIjNcIj7ovpPlh7rnu5PmnpzvvIjmnIDplb8yMDQ277yM6LaF6L+H6KKr5oiq5pat77yM5oiq5pat5ZCO5peg5rOV5oyJ5q2j5bi4SlNPTuWxleekuu+8iTwvZGV0YWlsLWhlYWRlcj5cbiAgICAgICAgICAgICAgICA8VnVlSnNvblByZXR0eSA6ZGF0YT1cImRldGFpbC5kYXRhLm91dHB1dFwiIDpkZWVwPVwiMlwiLz5cbiAgICAgICAgICAgICAgICA8ZGV0YWlsLWhlYWRlciA6c2l6ZT1cIjNcIj7lvILluLjkv6Hmga/vvIjmnIDplb8xMDIy77yM6LaF6L+H6KKr5oiq5pat77yJPC9kZXRhaWwtaGVhZGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJsaW5lLWJyZWFrOiBhbnl3aGVyZTt3b3JkLWJyZWFrOiBicmVhay13b3JkXCI+e3tkZXRhaWwuZGF0YS5leGNlcHRpb258fCctLSd9fTwvZGl2PlxuICAgICAgICAgICAgPC9kZXRhaWw+ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIDwvTW9kYWw+ICAgICAgICBcbiAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3BzOiB7XG4gICAgICAgIHNob3dDb25kaXRpb246IHt0eXBlOiBCb29sZWFuLCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6IHRydWV9LFxuICAgICAgICBsaXN0VGl0bGU6IHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdDogJ+afpeivoue7k+aenCd9LFxuICAgICAgICBzaG93TW9kdWxlOiB7dHlwZTogQm9vbGVhbiwgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiB0cnVlfSxcbiAgICAgICAgdXJsOiB7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6ICcvbG9ncyd9LFxuICAgICAgICBwYXJhbXM6IHt0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdCgpIHtyZXR1cm4ge3BhZ2U6IDAsIHNpemU6IDEwLCBtb2R1bGVDb2RlOiBudWxsLCByZWNvcmRJZDogbnVsbCwgb3BlcmF0ZUNvZGU6IG51bGwsIGRlc2NyaXB0aW9uOiBudWxsLCBjcmVhdG9ySWQ6IG51bGwsIGNyZWF0ZWRUaW1lOiB7fX07fX0sXG4gICAgICAgIHN1Y2Nlc3NGb3JtYXQ6IHt0eXBlOiBGdW5jdGlvbiwgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0KGRhdGEpIHtyZXR1cm4gZGF0YS5kYXRhO319LFxuICAgICAgICBmYWlsdXJlRm9ybWF0OiB7dHlwZTogRnVuY3Rpb24sIHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdChkYXRhKSB7cmV0dXJuIGRhdGEuZGF0YTt9fSxcbiAgICAgICAgY29sdW1uczoge1xuICAgICAgICAgICAgdHlwZTogQXJyYXksIHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdCgpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1ucyA9IFtcbiAgICAgICAgICAgICAgICAgICAge3RpdGxlOiAn5pel5b+X5qCH6K+GJywga2V5OiAnaWQnLCB3aWR0aDogMTIwLCBzb3J0YWJsZTogJ2N1c3RvbSd9LFxuICAgICAgICAgICAgICAgICAgICB7dGl0bGU6ICfmqKHlnZfnvJbnoIEnLCBrZXk6ICdtb2R1bGVDb2RlJywgd2lkdGg6IDEyMH0sXG4gICAgICAgICAgICAgICAgICAgIHt0aXRsZTogJ+iusOW9leagh+ivhicsIGtleTogJ3JlY29yZElkJywgd2lkdGg6IDEyMCwgdG9vbHRpcDogdHJ1ZX0sXG4gICAgICAgICAgICAgICAgICAgIHt0aXRsZTogJ+aTjeS9nOe8lueggScsIGtleTogJ29wZXJhdGVDb2RlJywgd2lkdGg6IDEyMH0sXG4gICAgICAgICAgICAgICAgICAgIHt0aXRsZTogJ+aTjeS9nOaPj+i/sCcsIGtleTogJ2Rlc2NyaXB0aW9uJywgd2lkdGg6IDIwMCwgdG9vbHRpcDogdHJ1ZX0sXG4gICAgICAgICAgICAgICAgICAgIHt0aXRsZTogJ+iAl+aXtijnp5IpJywga2V5OiAnZHVyYXRpb24nLCB3aWR0aDogMTUwLCByZW5kZXIoaCwgcikge3JldHVybiBoKCdzcGFuJywgci5yb3cuZHVyYXRpb24gLyAxMDAwKX19LFxuICAgICAgICAgICAgICAgICAgICB7dGl0bGU6ICfmk43kvZznirbmgIEnLCB3aWR0aDogMTUwLCByZW5kZXI6IChoLCByKSA9PiBoKCdzcGFuJywgQm9vbGVhbihyLnJvdy5leGNlcHRpb24pID8gJ+Wksei0pScgOiAn5oiQ5YqfJyl9LFxuICAgICAgICAgICAgICAgICAgICB7dGl0bGU6ICflvILluLjkv6Hmga8nLCBrZXk6ICdleGNlcHRpb24nLCB0b29sdGlwOiB0cnVlfSxcbiAgICAgICAgICAgICAgICAgICAge3RpdGxlOiAn5Yib5bu65pe26Ze0Jywga2V5OiAnY3JlYXRlZFRpbWUnLCB3aWR0aDogMTUwLCBzb3J0YWJsZTogJ2N1c3RvbScsIHRvb2x0aXA6IHRydWUsIHNvcnRUeXBlOiAnZGVzYyd9LFxuICAgICAgICAgICAgICAgICAgICB7dGl0bGU6ICfmk43kvZwnLCB3aWR0aDogMTAwLCByZW5kZXI6IChoLCByKSA9PiB7cmV0dXJuIHRoaXMucmVuZGVyT3BlcmF0ZShoLCByKTt9fSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zaG93TW9kdWxlKSBjb2x1bW5zLnNwbGljZSgwLCAzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sdW1ucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBtb2R1bGVDb2RlUmVuZGVyOiB7dHlwZTogRnVuY3Rpb24sIHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdChoLCByb3cpIHtyZXR1cm4gaCgnc3BhbicsIHJvdy5tb2R1bGVDb2RlKX19LFxuICAgICAgICAvLyByZWNvcmRJZFJlbmRlcjoge3R5cGU6IEZ1bmN0aW9uLCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQoaCwgcm93KSB7cmV0dXJuIGgoJ3NwYW4nLCByb3cucmVjb3JkSWQpfX0sXG4gICAgfSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRhdGE6IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgcXVlcnkocmVzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuJHJlZnMucGFnZVRhYmxlLnF1ZXJ5KHJlc2V0KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyT3BlcmF0ZShoLCByKSB7XG4gICAgICAgICAgICByZXR1cm4gaChCdXR0b24sIHtwcm9wczoge3R5cGU6ICdwcmltYXJ5Jywgc2l6ZTogJ3NtYWxsJ30sIG9uOiB7Y2xpY2s6ICgpID0+IHRoaXMub3BlbkRldGFpbChyLnJvdyl9fSwgJ+ivpuaDhScpO1xuICAgICAgICB9LFxuICAgICAgICBvcGVuRGV0YWlsKHJvdykge1xuICAgICAgICAgICAgdGhpcy5kZXRhaWwubW9kZWwgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGNsb25lID0gT2JqZWN0LmFzc2lnbih7fSwgcm93KTtcbiAgICAgICAgICAgIHRyeSB7IGNsb25lLmlucHV0ID0gSlNPTi5wYXJzZShyb3cuaW5wdXQpO30gY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgdHJ5IHsgY2xvbmUub3V0cHV0ID0gSlNPTi5wYXJzZShyb3cub3V0cHV0KTt9IGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgIHRoaXMuZGV0YWlsLmRhdGEgPSBjbG9uZTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVzZXQoKSB7XG4gICAgICAgICAgICB0aGlzLiRyZWZzLmZvcm0ucmVzZXRGaWVsZHMoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5KHRydWUpO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBDYXJkLCBGb3JtLCBGb3JtSXRlbSwgSW5wdXQsIEljb24sIEJ1dHRvbiwgUGFnZVRhYmxlLCBNb2RhbCwgVnVlSnNvblByZXR0eSwgLi4uRGV0YWlsXG4gICAgfSxcbn07XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9pdmlld19kaXN0X2l2aWV3X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3BlYWNldHJ1ZV9pdmlld19zcmNfY29tcG9uZW50c19wYWdlX3RhYmxlX187Il0sInNvdXJjZVJvb3QiOiIifQ==