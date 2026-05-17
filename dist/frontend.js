var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/handlebars/dist/handlebars.js
var require_handlebars = __commonJS({
  "node_modules/handlebars/dist/handlebars.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd)
        define([], factory);
      else if (typeof exports === "object")
        exports["Handlebars"] = factory();
      else
        root["Handlebars"] = factory();
    })(exports, function() {
      return (
        /******/
        (function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId])
              return installedModules[moduleId].exports;
            var module2 = installedModules[moduleId] = {
              /******/
              exports: {},
              /******/
              id: moduleId,
              /******/
              loaded: false
              /******/
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.loaded = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.p = "";
          return __webpack_require__(0);
        })([
          /* 0 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            var _handlebarsRuntime = __webpack_require__(2);
            var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);
            var _handlebarsCompilerAst = __webpack_require__(83);
            var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);
            var _handlebarsCompilerBase = __webpack_require__(84);
            var _handlebarsCompilerCompiler = __webpack_require__(89);
            var _handlebarsCompilerJavascriptCompiler = __webpack_require__(90);
            var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);
            var _handlebarsCompilerVisitor = __webpack_require__(87);
            var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);
            var _handlebarsNoConflict = __webpack_require__(82);
            var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
            var _create = _handlebarsRuntime2["default"].create;
            function create() {
              var hb = _create();
              hb.compile = function(input, options) {
                return _handlebarsCompilerCompiler.compile(input, options, hb);
              };
              hb.precompile = function(input, options) {
                return _handlebarsCompilerCompiler.precompile(input, options, hb);
              };
              hb.AST = _handlebarsCompilerAst2["default"];
              hb.Compiler = _handlebarsCompilerCompiler.Compiler;
              hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2["default"];
              hb.Parser = _handlebarsCompilerBase.parser;
              hb.parse = _handlebarsCompilerBase.parse;
              hb.parseWithoutProcessing = _handlebarsCompilerBase.parseWithoutProcessing;
              return hb;
            }
            var inst = create();
            inst.create = create;
            _handlebarsNoConflict2["default"](inst);
            inst.Visitor = _handlebarsCompilerVisitor2["default"];
            inst["default"] = inst;
            exports2["default"] = inst;
            module2.exports = exports2["default"];
          }),
          /* 1 */
          /***/
          (function(module2, exports2) {
            "use strict";
            exports2["default"] = function(obj) {
              return obj && obj.__esModule ? obj : {
                "default": obj
              };
            };
            exports2.__esModule = true;
          }),
          /* 2 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _interopRequireWildcard = __webpack_require__(3)["default"];
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            var _handlebarsBase = __webpack_require__(4);
            var base = _interopRequireWildcard(_handlebarsBase);
            var _handlebarsSafeString = __webpack_require__(76);
            var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
            var _handlebarsException = __webpack_require__(6);
            var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
            var _handlebarsUtils = __webpack_require__(5);
            var Utils = _interopRequireWildcard(_handlebarsUtils);
            var _handlebarsRuntime = __webpack_require__(77);
            var runtime = _interopRequireWildcard(_handlebarsRuntime);
            var _handlebarsNoConflict = __webpack_require__(82);
            var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
            function create() {
              var hb = new base.HandlebarsEnvironment();
              Utils.extend(hb, base);
              hb.SafeString = _handlebarsSafeString2["default"];
              hb.Exception = _handlebarsException2["default"];
              hb.Utils = Utils;
              hb.escapeExpression = Utils.escapeExpression;
              hb.VM = runtime;
              hb.template = function(spec) {
                return runtime.template(spec, hb);
              };
              return hb;
            }
            var inst = create();
            inst.create = create;
            _handlebarsNoConflict2["default"](inst);
            inst["default"] = inst;
            exports2["default"] = inst;
            module2.exports = exports2["default"];
          }),
          /* 3 */
          /***/
          (function(module2, exports2) {
            "use strict";
            exports2["default"] = function(obj) {
              if (obj && obj.__esModule) {
                return obj;
              } else {
                var newObj = {};
                if (obj != null) {
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                  }
                }
                newObj["default"] = obj;
                return newObj;
              }
            };
            exports2.__esModule = true;
          }),
          /* 4 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            exports2.HandlebarsEnvironment = HandlebarsEnvironment;
            var _utils = __webpack_require__(5);
            var _exception = __webpack_require__(6);
            var _exception2 = _interopRequireDefault(_exception);
            var _helpers = __webpack_require__(10);
            var _decorators = __webpack_require__(70);
            var _logger = __webpack_require__(72);
            var _logger2 = _interopRequireDefault(_logger);
            var _internalProtoAccess = __webpack_require__(73);
            var VERSION2 = "4.7.9";
            exports2.VERSION = VERSION2;
            var COMPILER_REVISION = 8;
            exports2.COMPILER_REVISION = COMPILER_REVISION;
            var LAST_COMPATIBLE_COMPILER_REVISION = 7;
            exports2.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
            var REVISION_CHANGES = {
              1: "<= 1.0.rc.2",
              // 1.0.rc.2 is actually rev2 but doesn't report it
              2: "== 1.0.0-rc.3",
              3: "== 1.0.0-rc.4",
              4: "== 1.x.x",
              5: "== 2.0.0-alpha.x",
              6: ">= 2.0.0-beta.1",
              7: ">= 4.0.0 <4.3.0",
              8: ">= 4.3.0"
            };
            exports2.REVISION_CHANGES = REVISION_CHANGES;
            var objectType = "[object Object]";
            function HandlebarsEnvironment(helpers, partials, decorators) {
              this.helpers = helpers || {};
              this.partials = partials || {};
              this.decorators = decorators || {};
              _helpers.registerDefaultHelpers(this);
              _decorators.registerDefaultDecorators(this);
            }
            HandlebarsEnvironment.prototype = {
              constructor: HandlebarsEnvironment,
              logger: _logger2["default"],
              log: _logger2["default"].log,
              registerHelper: function registerHelper(name, fn) {
                if (_utils.toString.call(name) === objectType) {
                  if (fn) {
                    throw new _exception2["default"]("Arg not supported with multiple helpers");
                  }
                  _utils.extend(this.helpers, name);
                } else {
                  this.helpers[name] = fn;
                }
              },
              unregisterHelper: function unregisterHelper(name) {
                delete this.helpers[name];
              },
              registerPartial: function registerPartial(name, partial) {
                if (_utils.toString.call(name) === objectType) {
                  _utils.extend(this.partials, name);
                } else {
                  if (typeof partial === "undefined") {
                    throw new _exception2["default"]('Attempting to register a partial called "' + name + '" as undefined');
                  }
                  this.partials[name] = partial;
                }
              },
              unregisterPartial: function unregisterPartial(name) {
                delete this.partials[name];
              },
              registerDecorator: function registerDecorator(name, fn) {
                if (_utils.toString.call(name) === objectType) {
                  if (fn) {
                    throw new _exception2["default"]("Arg not supported with multiple decorators");
                  }
                  _utils.extend(this.decorators, name);
                } else {
                  this.decorators[name] = fn;
                }
              },
              unregisterDecorator: function unregisterDecorator(name) {
                delete this.decorators[name];
              },
              /**
               * Reset the memory of illegal property accesses that have already been logged.
               * @deprecated should only be used in handlebars test-cases
               */
              resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
                _internalProtoAccess.resetLoggedProperties();
              }
            };
            var log = _logger2["default"].log;
            exports2.log = log;
            exports2.createFrame = _utils.createFrame;
            exports2.logger = _logger2["default"];
          }),
          /* 5 */
          /***/
          (function(module2, exports2) {
            "use strict";
            exports2.__esModule = true;
            exports2.extend = extend;
            exports2.indexOf = indexOf;
            exports2.escapeExpression = escapeExpression;
            exports2.isEmpty = isEmpty;
            exports2.createFrame = createFrame;
            exports2.blockParams = blockParams;
            exports2.appendContextPath = appendContextPath;
            var escape = {
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#x27;",
              "`": "&#x60;",
              "=": "&#x3D;"
            };
            var badChars = /[&<>"'`=]/g, possible = /[&<>"'`=]/;
            function escapeChar(chr) {
              return escape[chr];
            }
            function extend(obj) {
              for (var i = 1; i < arguments.length; i++) {
                for (var key in arguments[i]) {
                  if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                    obj[key] = arguments[i][key];
                  }
                }
              }
              return obj;
            }
            var toString = Object.prototype.toString;
            exports2.toString = toString;
            var isFunction = function isFunction2(value) {
              return typeof value === "function";
            };
            if (isFunction(/x/)) {
              exports2.isFunction = isFunction = function(value) {
                return typeof value === "function" && toString.call(value) === "[object Function]";
              };
            }
            exports2.isFunction = isFunction;
            var isArray = Array.isArray || function(value) {
              return value && typeof value === "object" ? toString.call(value) === "[object Array]" : false;
            };
            exports2.isArray = isArray;
            function indexOf(array, value) {
              for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                  return i;
                }
              }
              return -1;
            }
            function escapeExpression(string) {
              if (typeof string !== "string") {
                if (string && string.toHTML) {
                  return string.toHTML();
                } else if (string == null) {
                  return "";
                } else if (!string) {
                  return string + "";
                }
                string = "" + string;
              }
              if (!possible.test(string)) {
                return string;
              }
              return string.replace(badChars, escapeChar);
            }
            function isEmpty(value) {
              if (!value && value !== 0) {
                return true;
              } else if (isArray(value) && value.length === 0) {
                return true;
              } else {
                return false;
              }
            }
            function createFrame(object) {
              var frame = extend({}, object);
              frame._parent = object;
              return frame;
            }
            function blockParams(params, ids) {
              params.path = ids;
              return params;
            }
            function appendContextPath(contextPath, id) {
              return (contextPath ? contextPath + "." : "") + id;
            }
          }),
          /* 6 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _Object$defineProperty = __webpack_require__(7)["default"];
            exports2.__esModule = true;
            var errorProps = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];
            function Exception(message, node) {
              var loc = node && node.loc, line = void 0, endLineNumber = void 0, column = void 0, endColumn = void 0;
              if (loc) {
                line = loc.start.line;
                endLineNumber = loc.end.line;
                column = loc.start.column;
                endColumn = loc.end.column;
                message += " - " + line + ":" + column;
              }
              var tmp = Error.prototype.constructor.call(this, message);
              for (var idx = 0; idx < errorProps.length; idx++) {
                this[errorProps[idx]] = tmp[errorProps[idx]];
              }
              if (Error.captureStackTrace) {
                Error.captureStackTrace(this, Exception);
              }
              try {
                if (loc) {
                  this.lineNumber = line;
                  this.endLineNumber = endLineNumber;
                  if (_Object$defineProperty) {
                    Object.defineProperty(this, "column", {
                      value: column,
                      enumerable: true
                    });
                    Object.defineProperty(this, "endColumn", {
                      value: endColumn,
                      enumerable: true
                    });
                  } else {
                    this.column = column;
                    this.endColumn = endColumn;
                  }
                }
              } catch (nop) {
              }
            }
            Exception.prototype = new Error();
            exports2["default"] = Exception;
            module2.exports = exports2["default"];
          }),
          /* 7 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            module2.exports = { "default": __webpack_require__(8), __esModule: true };
          }),
          /* 8 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var $ = __webpack_require__(9);
            module2.exports = function defineProperty(it, key, desc) {
              return $.setDesc(it, key, desc);
            };
          }),
          /* 9 */
          /***/
          (function(module2, exports2) {
            var $Object = Object;
            module2.exports = {
              create: $Object.create,
              getProto: $Object.getPrototypeOf,
              isEnum: {}.propertyIsEnumerable,
              getDesc: $Object.getOwnPropertyDescriptor,
              setDesc: $Object.defineProperty,
              setDescs: $Object.defineProperties,
              getKeys: $Object.keys,
              getNames: $Object.getOwnPropertyNames,
              getSymbols: $Object.getOwnPropertySymbols,
              each: [].forEach
            };
          }),
          /* 10 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            exports2.registerDefaultHelpers = registerDefaultHelpers;
            exports2.moveHelperToHooks = moveHelperToHooks;
            var _helpersBlockHelperMissing = __webpack_require__(11);
            var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
            var _helpersEach = __webpack_require__(12);
            var _helpersEach2 = _interopRequireDefault(_helpersEach);
            var _helpersHelperMissing = __webpack_require__(65);
            var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
            var _helpersIf = __webpack_require__(66);
            var _helpersIf2 = _interopRequireDefault(_helpersIf);
            var _helpersLog = __webpack_require__(67);
            var _helpersLog2 = _interopRequireDefault(_helpersLog);
            var _helpersLookup = __webpack_require__(68);
            var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
            var _helpersWith = __webpack_require__(69);
            var _helpersWith2 = _interopRequireDefault(_helpersWith);
            function registerDefaultHelpers(instance) {
              _helpersBlockHelperMissing2["default"](instance);
              _helpersEach2["default"](instance);
              _helpersHelperMissing2["default"](instance);
              _helpersIf2["default"](instance);
              _helpersLog2["default"](instance);
              _helpersLookup2["default"](instance);
              _helpersWith2["default"](instance);
            }
            function moveHelperToHooks(instance, helperName, keepHelper) {
              if (instance.helpers[helperName]) {
                instance.hooks[helperName] = instance.helpers[helperName];
                if (!keepHelper) {
                  instance.helpers[helperName] = void 0;
                }
              }
            }
          }),
          /* 11 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            exports2.__esModule = true;
            var _utils = __webpack_require__(5);
            exports2["default"] = function(instance) {
              instance.registerHelper("blockHelperMissing", function(context, options) {
                var inverse = options.inverse, fn = options.fn;
                if (context === true) {
                  return fn(this);
                } else if (context === false || context == null) {
                  return inverse(this);
                } else if (_utils.isArray(context)) {
                  if (context.length > 0) {
                    if (options.ids) {
                      options.ids = [options.name];
                    }
                    return instance.helpers.each(context, options);
                  } else {
                    return inverse(this);
                  }
                } else {
                  if (options.data && options.ids) {
                    var data = _utils.createFrame(options.data);
                    data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
                    options = { data };
                  }
                  return fn(context, options);
                }
              });
            };
            module2.exports = exports2["default"];
          }),
          /* 12 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _Symbol = __webpack_require__(13)["default"];
            var _Symbol$iterator = __webpack_require__(43)["default"];
            var _getIterator = __webpack_require__(55)["default"];
            var _Object$keys = __webpack_require__(60)["default"];
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            var _utils = __webpack_require__(5);
            var _exception = __webpack_require__(6);
            var _exception2 = _interopRequireDefault(_exception);
            exports2["default"] = function(instance) {
              instance.registerHelper("each", function(context, options) {
                if (!options) {
                  throw new _exception2["default"]("Must pass iterator to #each");
                }
                var fn = options.fn, inverse = options.inverse, i = 0, ret = "", data = void 0, contextPath = void 0;
                if (options.data && options.ids) {
                  contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + ".";
                }
                if (_utils.isFunction(context)) {
                  context = context.call(this);
                }
                if (options.data) {
                  data = _utils.createFrame(options.data);
                }
                function execIteration(field, index, last) {
                  if (data) {
                    data.key = field;
                    data.index = index;
                    data.first = index === 0;
                    data.last = !!last;
                    if (contextPath) {
                      data.contextPath = contextPath + field;
                    }
                  }
                  ret = ret + fn(context[field], {
                    data,
                    blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
                  });
                }
                if (context && typeof context === "object") {
                  if (_utils.isArray(context)) {
                    for (var j = context.length; i < j; i++) {
                      if (i in context) {
                        execIteration(i, i, i === context.length - 1);
                      }
                    }
                  } else if (typeof _Symbol === "function" && context[_Symbol$iterator]) {
                    var newContext = [];
                    var iterator = _getIterator(context);
                    for (var it = iterator.next(); !it.done; it = iterator.next()) {
                      newContext.push(it.value);
                    }
                    context = newContext;
                    for (var j = context.length; i < j; i++) {
                      execIteration(i, i, i === context.length - 1);
                    }
                  } else {
                    (function() {
                      var priorKey = void 0;
                      _Object$keys(context).forEach(function(key) {
                        if (priorKey !== void 0) {
                          execIteration(priorKey, i - 1);
                        }
                        priorKey = key;
                        i++;
                      });
                      if (priorKey !== void 0) {
                        execIteration(priorKey, i - 1, true);
                      }
                    })();
                  }
                }
                if (i === 0) {
                  ret = inverse(this);
                }
                return ret;
              });
            };
            module2.exports = exports2["default"];
          }),
          /* 13 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            module2.exports = { "default": __webpack_require__(14), __esModule: true };
          }),
          /* 14 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            __webpack_require__(15);
            __webpack_require__(42);
            module2.exports = __webpack_require__(21).Symbol;
          }),
          /* 15 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var $ = __webpack_require__(9), global = __webpack_require__(16), has = __webpack_require__(17), DESCRIPTORS = __webpack_require__(18), $export = __webpack_require__(20), redefine = __webpack_require__(24), $fails = __webpack_require__(19), shared = __webpack_require__(27), setToStringTag = __webpack_require__(28), uid = __webpack_require__(30), wks = __webpack_require__(29), keyOf = __webpack_require__(31), $names = __webpack_require__(36), enumKeys = __webpack_require__(37), isArray = __webpack_require__(38), anObject = __webpack_require__(39), toIObject = __webpack_require__(32), createDesc = __webpack_require__(26), getDesc = $.getDesc, setDesc = $.setDesc, _create = $.create, getNames = $names.get, $Symbol = global.Symbol, $JSON = global.JSON, _stringify = $JSON && $JSON.stringify, setter = false, HIDDEN = wks("_hidden"), isEnum = $.isEnum, SymbolRegistry = shared("symbol-registry"), AllSymbols = shared("symbols"), useNative = typeof $Symbol == "function", ObjectProto = Object.prototype;
            var setSymbolDesc = DESCRIPTORS && $fails(function() {
              return _create(setDesc({}, "a", {
                get: function() {
                  return setDesc(this, "a", { value: 7 }).a;
                }
              })).a != 7;
            }) ? function(it, key, D) {
              var protoDesc = getDesc(ObjectProto, key);
              if (protoDesc) delete ObjectProto[key];
              setDesc(it, key, D);
              if (protoDesc && it !== ObjectProto) setDesc(ObjectProto, key, protoDesc);
            } : setDesc;
            var wrap = function(tag) {
              var sym = AllSymbols[tag] = _create($Symbol.prototype);
              sym._k = tag;
              DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
                configurable: true,
                set: function(value) {
                  if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
                  setSymbolDesc(this, tag, createDesc(1, value));
                }
              });
              return sym;
            };
            var isSymbol = function(it) {
              return typeof it == "symbol";
            };
            var $defineProperty = function defineProperty(it, key, D) {
              if (D && has(AllSymbols, key)) {
                if (!D.enumerable) {
                  if (!has(it, HIDDEN)) setDesc(it, HIDDEN, createDesc(1, {}));
                  it[HIDDEN][key] = true;
                } else {
                  if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
                  D = _create(D, { enumerable: createDesc(0, false) });
                }
                return setSymbolDesc(it, key, D);
              }
              return setDesc(it, key, D);
            };
            var $defineProperties = function defineProperties(it, P) {
              anObject(it);
              var keys = enumKeys(P = toIObject(P)), i = 0, l = keys.length, key;
              while (l > i) $defineProperty(it, key = keys[i++], P[key]);
              return it;
            };
            var $create = function create(it, P) {
              return P === void 0 ? _create(it) : $defineProperties(_create(it), P);
            };
            var $propertyIsEnumerable = function propertyIsEnumerable(key) {
              var E = isEnum.call(this, key);
              return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
            };
            var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
              var D = getDesc(it = toIObject(it), key);
              if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
              return D;
            };
            var $getOwnPropertyNames = function getOwnPropertyNames(it) {
              var names = getNames(toIObject(it)), result = [], i = 0, key;
              while (names.length > i) if (!has(AllSymbols, key = names[i++]) && key != HIDDEN) result.push(key);
              return result;
            };
            var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
              var names = getNames(toIObject(it)), result = [], i = 0, key;
              while (names.length > i) if (has(AllSymbols, key = names[i++])) result.push(AllSymbols[key]);
              return result;
            };
            var $stringify = function stringify(it) {
              if (it === void 0 || isSymbol(it)) return;
              var args = [it], i = 1, $$ = arguments, replacer, $replacer;
              while ($$.length > i) args.push($$[i++]);
              replacer = args[1];
              if (typeof replacer == "function") $replacer = replacer;
              if ($replacer || !isArray(replacer)) replacer = function(key, value) {
                if ($replacer) value = $replacer.call(this, key, value);
                if (!isSymbol(value)) return value;
              };
              args[1] = replacer;
              return _stringify.apply($JSON, args);
            };
            var buggyJSON = $fails(function() {
              var S = $Symbol();
              return _stringify([S]) != "[null]" || _stringify({ a: S }) != "{}" || _stringify(Object(S)) != "{}";
            });
            if (!useNative) {
              $Symbol = function Symbol2() {
                if (isSymbol(this)) throw TypeError("Symbol is not a constructor");
                return wrap(uid(arguments.length > 0 ? arguments[0] : void 0));
              };
              redefine($Symbol.prototype, "toString", function toString() {
                return this._k;
              });
              isSymbol = function(it) {
                return it instanceof $Symbol;
              };
              $.create = $create;
              $.isEnum = $propertyIsEnumerable;
              $.getDesc = $getOwnPropertyDescriptor;
              $.setDesc = $defineProperty;
              $.setDescs = $defineProperties;
              $.getNames = $names.get = $getOwnPropertyNames;
              $.getSymbols = $getOwnPropertySymbols;
              if (DESCRIPTORS && !__webpack_require__(41)) {
                redefine(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, true);
              }
            }
            var symbolStatics = {
              // 19.4.2.1 Symbol.for(key)
              "for": function(key) {
                return has(SymbolRegistry, key += "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
              },
              // 19.4.2.5 Symbol.keyFor(sym)
              keyFor: function keyFor(key) {
                return keyOf(SymbolRegistry, key);
              },
              useSetter: function() {
                setter = true;
              },
              useSimple: function() {
                setter = false;
              }
            };
            $.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), function(it) {
              var sym = wks(it);
              symbolStatics[it] = useNative ? sym : wrap(sym);
            });
            setter = true;
            $export($export.G + $export.W, { Symbol: $Symbol });
            $export($export.S, "Symbol", symbolStatics);
            $export($export.S + $export.F * !useNative, "Object", {
              // 19.1.2.2 Object.create(O [, Properties])
              create: $create,
              // 19.1.2.4 Object.defineProperty(O, P, Attributes)
              defineProperty: $defineProperty,
              // 19.1.2.3 Object.defineProperties(O, Properties)
              defineProperties: $defineProperties,
              // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
              getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
              // 19.1.2.7 Object.getOwnPropertyNames(O)
              getOwnPropertyNames: $getOwnPropertyNames,
              // 19.1.2.8 Object.getOwnPropertySymbols(O)
              getOwnPropertySymbols: $getOwnPropertySymbols
            });
            $JSON && $export($export.S + $export.F * (!useNative || buggyJSON), "JSON", { stringify: $stringify });
            setToStringTag($Symbol, "Symbol");
            setToStringTag(Math, "Math", true);
            setToStringTag(global.JSON, "JSON", true);
          }),
          /* 16 */
          /***/
          (function(module2, exports2) {
            var global = module2.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
            if (typeof __g == "number") __g = global;
          }),
          /* 17 */
          /***/
          (function(module2, exports2) {
            var hasOwnProperty = {}.hasOwnProperty;
            module2.exports = function(it, key) {
              return hasOwnProperty.call(it, key);
            };
          }),
          /* 18 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            module2.exports = !__webpack_require__(19)(function() {
              return Object.defineProperty({}, "a", { get: function() {
                return 7;
              } }).a != 7;
            });
          }),
          /* 19 */
          /***/
          (function(module2, exports2) {
            module2.exports = function(exec) {
              try {
                return !!exec();
              } catch (e) {
                return true;
              }
            };
          }),
          /* 20 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__(16), core = __webpack_require__(21), ctx = __webpack_require__(22), PROTOTYPE = "prototype";
            var $export = function(type, name, source) {
              var IS_FORCED = type & $export.F, IS_GLOBAL = type & $export.G, IS_STATIC = type & $export.S, IS_PROTO = type & $export.P, IS_BIND = type & $export.B, IS_WRAP = type & $export.W, exports3 = IS_GLOBAL ? core : core[name] || (core[name] = {}), target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE], key, own, out;
              if (IS_GLOBAL) source = name;
              for (key in source) {
                own = !IS_FORCED && target && key in target;
                if (own && key in exports3) continue;
                out = own ? target[key] : source[key];
                exports3[key] = IS_GLOBAL && typeof target[key] != "function" ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? (function(C) {
                  var F = function(param) {
                    return this instanceof C ? new C(param) : C(param);
                  };
                  F[PROTOTYPE] = C[PROTOTYPE];
                  return F;
                })(out) : IS_PROTO && typeof out == "function" ? ctx(Function.call, out) : out;
                if (IS_PROTO) (exports3[PROTOTYPE] || (exports3[PROTOTYPE] = {}))[key] = out;
              }
            };
            $export.F = 1;
            $export.G = 2;
            $export.S = 4;
            $export.P = 8;
            $export.B = 16;
            $export.W = 32;
            module2.exports = $export;
          }),
          /* 21 */
          /***/
          (function(module2, exports2) {
            var core = module2.exports = { version: "1.2.6" };
            if (typeof __e == "number") __e = core;
          }),
          /* 22 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var aFunction = __webpack_require__(23);
            module2.exports = function(fn, that, length) {
              aFunction(fn);
              if (that === void 0) return fn;
              switch (length) {
                case 1:
                  return function(a) {
                    return fn.call(that, a);
                  };
                case 2:
                  return function(a, b) {
                    return fn.call(that, a, b);
                  };
                case 3:
                  return function(a, b, c) {
                    return fn.call(that, a, b, c);
                  };
              }
              return function() {
                return fn.apply(that, arguments);
              };
            };
          }),
          /* 23 */
          /***/
          (function(module2, exports2) {
            module2.exports = function(it) {
              if (typeof it != "function") throw TypeError(it + " is not a function!");
              return it;
            };
          }),
          /* 24 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            module2.exports = __webpack_require__(25);
          }),
          /* 25 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var $ = __webpack_require__(9), createDesc = __webpack_require__(26);
            module2.exports = __webpack_require__(18) ? function(object, key, value) {
              return $.setDesc(object, key, createDesc(1, value));
            } : function(object, key, value) {
              object[key] = value;
              return object;
            };
          }),
          /* 26 */
          /***/
          (function(module2, exports2) {
            module2.exports = function(bitmap, value) {
              return {
                enumerable: !(bitmap & 1),
                configurable: !(bitmap & 2),
                writable: !(bitmap & 4),
                value
              };
            };
          }),
          /* 27 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__(16), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
            module2.exports = function(key) {
              return store[key] || (store[key] = {});
            };
          }),
          /* 28 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var def = __webpack_require__(9).setDesc, has = __webpack_require__(17), TAG = __webpack_require__(29)("toStringTag");
            module2.exports = function(it, tag, stat) {
              if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
            };
          }),
          /* 29 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var store = __webpack_require__(27)("wks"), uid = __webpack_require__(30), Symbol2 = __webpack_require__(16).Symbol;
            module2.exports = function(name) {
              return store[name] || (store[name] = Symbol2 && Symbol2[name] || (Symbol2 || uid)("Symbol." + name));
            };
          }),
          /* 30 */
          /***/
          (function(module2, exports2) {
            var id = 0, px = Math.random();
            module2.exports = function(key) {
              return "Symbol(".concat(key === void 0 ? "" : key, ")_", (++id + px).toString(36));
            };
          }),
          /* 31 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var $ = __webpack_require__(9), toIObject = __webpack_require__(32);
            module2.exports = function(object, el) {
              var O = toIObject(object), keys = $.getKeys(O), length = keys.length, index = 0, key;
              while (length > index) if (O[key = keys[index++]] === el) return key;
            };
          }),
          /* 32 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var IObject = __webpack_require__(33), defined = __webpack_require__(35);
            module2.exports = function(it) {
              return IObject(defined(it));
            };
          }),
          /* 33 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var cof = __webpack_require__(34);
            module2.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
              return cof(it) == "String" ? it.split("") : Object(it);
            };
          }),
          /* 34 */
          /***/
          (function(module2, exports2) {
            var toString = {}.toString;
            module2.exports = function(it) {
              return toString.call(it).slice(8, -1);
            };
          }),
          /* 35 */
          /***/
          (function(module2, exports2) {
            module2.exports = function(it) {
              if (it == void 0) throw TypeError("Can't call method on  " + it);
              return it;
            };
          }),
          /* 36 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var toIObject = __webpack_require__(32), getNames = __webpack_require__(9).getNames, toString = {}.toString;
            var windowNames = typeof window == "object" && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
            var getWindowNames = function(it) {
              try {
                return getNames(it);
              } catch (e) {
                return windowNames.slice();
              }
            };
            module2.exports.get = function getOwnPropertyNames(it) {
              if (windowNames && toString.call(it) == "[object Window]") return getWindowNames(it);
              return getNames(toIObject(it));
            };
          }),
          /* 37 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var $ = __webpack_require__(9);
            module2.exports = function(it) {
              var keys = $.getKeys(it), getSymbols = $.getSymbols;
              if (getSymbols) {
                var symbols = getSymbols(it), isEnum = $.isEnum, i = 0, key;
                while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) keys.push(key);
              }
              return keys;
            };
          }),
          /* 38 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var cof = __webpack_require__(34);
            module2.exports = Array.isArray || function(arg) {
              return cof(arg) == "Array";
            };
          }),
          /* 39 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var isObject = __webpack_require__(40);
            module2.exports = function(it) {
              if (!isObject(it)) throw TypeError(it + " is not an object!");
              return it;
            };
          }),
          /* 40 */
          /***/
          (function(module2, exports2) {
            module2.exports = function(it) {
              return typeof it === "object" ? it !== null : typeof it === "function";
            };
          }),
          /* 41 */
          /***/
          (function(module2, exports2) {
            module2.exports = true;
          }),
          /* 42 */
          /***/
          (function(module2, exports2) {
          }),
          /* 43 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            module2.exports = { "default": __webpack_require__(44), __esModule: true };
          }),
          /* 44 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            __webpack_require__(45);
            __webpack_require__(51);
            module2.exports = __webpack_require__(29)("iterator");
          }),
          /* 45 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var $at = __webpack_require__(46)(true);
            __webpack_require__(48)(String, "String", function(iterated) {
              this._t = String(iterated);
              this._i = 0;
            }, function() {
              var O = this._t, index = this._i, point;
              if (index >= O.length) return { value: void 0, done: true };
              point = $at(O, index);
              this._i += point.length;
              return { value: point, done: false };
            });
          }),
          /* 46 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var toInteger = __webpack_require__(47), defined = __webpack_require__(35);
            module2.exports = function(TO_STRING) {
              return function(that, pos) {
                var s = String(defined(that)), i = toInteger(pos), l = s.length, a, b;
                if (i < 0 || i >= l) return TO_STRING ? "" : void 0;
                a = s.charCodeAt(i);
                return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
              };
            };
          }),
          /* 47 */
          /***/
          (function(module2, exports2) {
            var ceil = Math.ceil, floor = Math.floor;
            module2.exports = function(it) {
              return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
            };
          }),
          /* 48 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var LIBRARY = __webpack_require__(41), $export = __webpack_require__(20), redefine = __webpack_require__(24), hide = __webpack_require__(25), has = __webpack_require__(17), Iterators = __webpack_require__(49), $iterCreate = __webpack_require__(50), setToStringTag = __webpack_require__(28), getProto = __webpack_require__(9).getProto, ITERATOR = __webpack_require__(29)("iterator"), BUGGY = !([].keys && "next" in [].keys()), FF_ITERATOR = "@@iterator", KEYS = "keys", VALUES = "values";
            var returnThis = function() {
              return this;
            };
            module2.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
              $iterCreate(Constructor, NAME, next);
              var getMethod = function(kind) {
                if (!BUGGY && kind in proto) return proto[kind];
                switch (kind) {
                  case KEYS:
                    return function keys() {
                      return new Constructor(this, kind);
                    };
                  case VALUES:
                    return function values() {
                      return new Constructor(this, kind);
                    };
                }
                return function entries() {
                  return new Constructor(this, kind);
                };
              };
              var TAG = NAME + " Iterator", DEF_VALUES = DEFAULT == VALUES, VALUES_BUG = false, proto = Base.prototype, $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT], $default = $native || getMethod(DEFAULT), methods, key;
              if ($native) {
                var IteratorPrototype = getProto($default.call(new Base()));
                setToStringTag(IteratorPrototype, TAG, true);
                if (!LIBRARY && has(proto, FF_ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
                if (DEF_VALUES && $native.name !== VALUES) {
                  VALUES_BUG = true;
                  $default = function values() {
                    return $native.call(this);
                  };
                }
              }
              if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
                hide(proto, ITERATOR, $default);
              }
              Iterators[NAME] = $default;
              Iterators[TAG] = returnThis;
              if (DEFAULT) {
                methods = {
                  values: DEF_VALUES ? $default : getMethod(VALUES),
                  keys: IS_SET ? $default : getMethod(KEYS),
                  entries: !DEF_VALUES ? $default : getMethod("entries")
                };
                if (FORCED) for (key in methods) {
                  if (!(key in proto)) redefine(proto, key, methods[key]);
                }
                else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
              }
              return methods;
            };
          }),
          /* 49 */
          /***/
          (function(module2, exports2) {
            module2.exports = {};
          }),
          /* 50 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var $ = __webpack_require__(9), descriptor = __webpack_require__(26), setToStringTag = __webpack_require__(28), IteratorPrototype = {};
            __webpack_require__(25)(IteratorPrototype, __webpack_require__(29)("iterator"), function() {
              return this;
            });
            module2.exports = function(Constructor, NAME, next) {
              Constructor.prototype = $.create(IteratorPrototype, { next: descriptor(1, next) });
              setToStringTag(Constructor, NAME + " Iterator");
            };
          }),
          /* 51 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            __webpack_require__(52);
            var Iterators = __webpack_require__(49);
            Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
          }),
          /* 52 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var addToUnscopables = __webpack_require__(53), step = __webpack_require__(54), Iterators = __webpack_require__(49), toIObject = __webpack_require__(32);
            module2.exports = __webpack_require__(48)(Array, "Array", function(iterated, kind) {
              this._t = toIObject(iterated);
              this._i = 0;
              this._k = kind;
            }, function() {
              var O = this._t, kind = this._k, index = this._i++;
              if (!O || index >= O.length) {
                this._t = void 0;
                return step(1);
              }
              if (kind == "keys") return step(0, index);
              if (kind == "values") return step(0, O[index]);
              return step(0, [index, O[index]]);
            }, "values");
            Iterators.Arguments = Iterators.Array;
            addToUnscopables("keys");
            addToUnscopables("values");
            addToUnscopables("entries");
          }),
          /* 53 */
          /***/
          (function(module2, exports2) {
            module2.exports = function() {
            };
          }),
          /* 54 */
          /***/
          (function(module2, exports2) {
            module2.exports = function(done, value) {
              return { value, done: !!done };
            };
          }),
          /* 55 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            module2.exports = { "default": __webpack_require__(56), __esModule: true };
          }),
          /* 56 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            __webpack_require__(51);
            __webpack_require__(45);
            module2.exports = __webpack_require__(57);
          }),
          /* 57 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var anObject = __webpack_require__(39), get = __webpack_require__(58);
            module2.exports = __webpack_require__(21).getIterator = function(it) {
              var iterFn = get(it);
              if (typeof iterFn != "function") throw TypeError(it + " is not iterable!");
              return anObject(iterFn.call(it));
            };
          }),
          /* 58 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var classof = __webpack_require__(59), ITERATOR = __webpack_require__(29)("iterator"), Iterators = __webpack_require__(49);
            module2.exports = __webpack_require__(21).getIteratorMethod = function(it) {
              if (it != void 0) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
            };
          }),
          /* 59 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var cof = __webpack_require__(34), TAG = __webpack_require__(29)("toStringTag"), ARG = cof(/* @__PURE__ */ (function() {
              return arguments;
            })()) == "Arguments";
            module2.exports = function(it) {
              var O, T, B;
              return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (T = (O = Object(it))[TAG]) == "string" ? T : ARG ? cof(O) : (B = cof(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : B;
            };
          }),
          /* 60 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            module2.exports = { "default": __webpack_require__(61), __esModule: true };
          }),
          /* 61 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            __webpack_require__(62);
            module2.exports = __webpack_require__(21).Object.keys;
          }),
          /* 62 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var toObject = __webpack_require__(63);
            __webpack_require__(64)("keys", function($keys) {
              return function keys(it) {
                return $keys(toObject(it));
              };
            });
          }),
          /* 63 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var defined = __webpack_require__(35);
            module2.exports = function(it) {
              return Object(defined(it));
            };
          }),
          /* 64 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var $export = __webpack_require__(20), core = __webpack_require__(21), fails = __webpack_require__(19);
            module2.exports = function(KEY, exec) {
              var fn = (core.Object || {})[KEY] || Object[KEY], exp = {};
              exp[KEY] = exec(fn);
              $export($export.S + $export.F * fails(function() {
                fn(1);
              }), "Object", exp);
            };
          }),
          /* 65 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            var _exception = __webpack_require__(6);
            var _exception2 = _interopRequireDefault(_exception);
            exports2["default"] = function(instance) {
              instance.registerHelper("helperMissing", function() {
                if (arguments.length === 1) {
                  return void 0;
                } else {
                  throw new _exception2["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
                }
              });
            };
            module2.exports = exports2["default"];
          }),
          /* 66 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            var _utils = __webpack_require__(5);
            var _exception = __webpack_require__(6);
            var _exception2 = _interopRequireDefault(_exception);
            exports2["default"] = function(instance) {
              instance.registerHelper("if", function(conditional, options) {
                if (arguments.length != 2) {
                  throw new _exception2["default"]("#if requires exactly one argument");
                }
                if (_utils.isFunction(conditional)) {
                  conditional = conditional.call(this);
                }
                if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
                  return options.inverse(this);
                } else {
                  return options.fn(this);
                }
              });
              instance.registerHelper("unless", function(conditional, options) {
                if (arguments.length != 2) {
                  throw new _exception2["default"]("#unless requires exactly one argument");
                }
                return instance.helpers["if"].call(this, conditional, {
                  fn: options.inverse,
                  inverse: options.fn,
                  hash: options.hash
                });
              });
            };
            module2.exports = exports2["default"];
          }),
          /* 67 */
          /***/
          (function(module2, exports2) {
            "use strict";
            exports2.__esModule = true;
            exports2["default"] = function(instance) {
              instance.registerHelper("log", function() {
                var args = [void 0], options = arguments[arguments.length - 1];
                for (var i = 0; i < arguments.length - 1; i++) {
                  args.push(arguments[i]);
                }
                var level = 1;
                if (options.hash.level != null) {
                  level = options.hash.level;
                } else if (options.data && options.data.level != null) {
                  level = options.data.level;
                }
                args[0] = level;
                instance.log.apply(instance, args);
              });
            };
            module2.exports = exports2["default"];
          }),
          /* 68 */
          /***/
          (function(module2, exports2) {
            "use strict";
            exports2.__esModule = true;
            exports2["default"] = function(instance) {
              instance.registerHelper("lookup", function(obj, field, options) {
                if (!obj) {
                  return obj;
                }
                return options.lookupProperty(obj, field);
              });
            };
            module2.exports = exports2["default"];
          }),
          /* 69 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            var _utils = __webpack_require__(5);
            var _exception = __webpack_require__(6);
            var _exception2 = _interopRequireDefault(_exception);
            exports2["default"] = function(instance) {
              instance.registerHelper("with", function(context, options) {
                if (arguments.length != 2) {
                  throw new _exception2["default"]("#with requires exactly one argument");
                }
                if (_utils.isFunction(context)) {
                  context = context.call(this);
                }
                var fn = options.fn;
                if (!_utils.isEmpty(context)) {
                  var data = options.data;
                  if (options.data && options.ids) {
                    data = _utils.createFrame(options.data);
                    data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
                  }
                  return fn(context, {
                    data,
                    blockParams: _utils.blockParams([context], [data && data.contextPath])
                  });
                } else {
                  return options.inverse(this);
                }
              });
            };
            module2.exports = exports2["default"];
          }),
          /* 70 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            exports2.registerDefaultDecorators = registerDefaultDecorators;
            var _decoratorsInline = __webpack_require__(71);
            var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
            function registerDefaultDecorators(instance) {
              _decoratorsInline2["default"](instance);
            }
          }),
          /* 71 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            exports2.__esModule = true;
            var _utils = __webpack_require__(5);
            exports2["default"] = function(instance) {
              instance.registerDecorator("inline", function(fn, props, container, options) {
                var ret = fn;
                if (!props.partials) {
                  props.partials = {};
                  ret = function(context, options2) {
                    var original = container.partials;
                    container.partials = _utils.extend({}, original, props.partials);
                    var ret2 = fn(context, options2);
                    container.partials = original;
                    return ret2;
                  };
                }
                props.partials[options.args[0]] = options.fn;
                return ret;
              });
            };
            module2.exports = exports2["default"];
          }),
          /* 72 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            exports2.__esModule = true;
            var _utils = __webpack_require__(5);
            var logger = {
              methodMap: ["debug", "info", "warn", "error"],
              level: "info",
              // Maps a given level value to the `methodMap` indexes above.
              lookupLevel: function lookupLevel(level) {
                if (typeof level === "string") {
                  var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
                  if (levelMap >= 0) {
                    level = levelMap;
                  } else {
                    level = parseInt(level, 10);
                  }
                }
                return level;
              },
              // Can be overridden in the host environment
              log: function log(level) {
                level = logger.lookupLevel(level);
                if (typeof console !== "undefined" && logger.lookupLevel(logger.level) <= level) {
                  var method = logger.methodMap[level];
                  if (!console[method]) {
                    method = "log";
                  }
                  for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    message[_key - 1] = arguments[_key];
                  }
                  console[method].apply(console, message);
                }
              }
            };
            exports2["default"] = logger;
            module2.exports = exports2["default"];
          }),
          /* 73 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _Object$create = __webpack_require__(74)["default"];
            var _Object$keys = __webpack_require__(60)["default"];
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            exports2.createProtoAccessControl = createProtoAccessControl;
            exports2.resultIsAllowed = resultIsAllowed;
            exports2.resetLoggedProperties = resetLoggedProperties;
            var _utils = __webpack_require__(5);
            var _logger = __webpack_require__(72);
            var _logger2 = _interopRequireDefault(_logger);
            var loggedProperties = _Object$create(null);
            function createProtoAccessControl(runtimeOptions) {
              var propertyWhiteList = _Object$create(null);
              propertyWhiteList["__proto__"] = false;
              _utils.extend(propertyWhiteList, runtimeOptions.allowedProtoProperties);
              var methodWhiteList = _Object$create(null);
              methodWhiteList["constructor"] = false;
              methodWhiteList["__defineGetter__"] = false;
              methodWhiteList["__defineSetter__"] = false;
              methodWhiteList["__lookupGetter__"] = false;
              methodWhiteList["__lookupSetter__"] = false;
              _utils.extend(methodWhiteList, runtimeOptions.allowedProtoMethods);
              return {
                properties: {
                  whitelist: propertyWhiteList,
                  defaultValue: runtimeOptions.allowProtoPropertiesByDefault
                },
                methods: {
                  whitelist: methodWhiteList,
                  defaultValue: runtimeOptions.allowProtoMethodsByDefault
                }
              };
            }
            function resultIsAllowed(result, protoAccessControl, propertyName) {
              if (typeof result === "function") {
                return checkWhiteList(protoAccessControl.methods, propertyName);
              } else {
                return checkWhiteList(protoAccessControl.properties, propertyName);
              }
            }
            function checkWhiteList(protoAccessControlForType, propertyName) {
              if (protoAccessControlForType.whitelist[propertyName] !== void 0) {
                return protoAccessControlForType.whitelist[propertyName] === true;
              }
              if (protoAccessControlForType.defaultValue !== void 0) {
                return protoAccessControlForType.defaultValue;
              }
              logUnexpecedPropertyAccessOnce(propertyName);
              return false;
            }
            function logUnexpecedPropertyAccessOnce(propertyName) {
              if (loggedProperties[propertyName] !== true) {
                loggedProperties[propertyName] = true;
                _logger2["default"].log("error", 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
              }
            }
            function resetLoggedProperties() {
              _Object$keys(loggedProperties).forEach(function(propertyName) {
                delete loggedProperties[propertyName];
              });
            }
          }),
          /* 74 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            module2.exports = { "default": __webpack_require__(75), __esModule: true };
          }),
          /* 75 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var $ = __webpack_require__(9);
            module2.exports = function create(P, D) {
              return $.create(P, D);
            };
          }),
          /* 76 */
          /***/
          (function(module2, exports2) {
            "use strict";
            exports2.__esModule = true;
            function SafeString(string) {
              this.string = string;
            }
            SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
              return "" + this.string;
            };
            exports2["default"] = SafeString;
            module2.exports = exports2["default"];
          }),
          /* 77 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _Object$seal = __webpack_require__(78)["default"];
            var _Object$keys = __webpack_require__(60)["default"];
            var _interopRequireWildcard = __webpack_require__(3)["default"];
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            exports2.checkRevision = checkRevision;
            exports2.template = template;
            exports2.wrapProgram = wrapProgram;
            exports2.resolvePartial = resolvePartial;
            exports2.invokePartial = invokePartial;
            exports2.noop = noop;
            var _utils = __webpack_require__(5);
            var Utils = _interopRequireWildcard(_utils);
            var _exception = __webpack_require__(6);
            var _exception2 = _interopRequireDefault(_exception);
            var _base = __webpack_require__(4);
            var _helpers = __webpack_require__(10);
            var _internalWrapHelper = __webpack_require__(81);
            var _internalProtoAccess = __webpack_require__(73);
            function checkRevision(compilerInfo) {
              var compilerRevision = compilerInfo && compilerInfo[0] || 1, currentRevision = _base.COMPILER_REVISION;
              if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
                return;
              }
              if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
                var runtimeVersions = _base.REVISION_CHANGES[currentRevision], compilerVersions = _base.REVISION_CHANGES[compilerRevision];
                throw new _exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
              } else {
                throw new _exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + compilerInfo[1] + ").");
              }
            }
            function template(templateSpec, env) {
              if (!env) {
                throw new _exception2["default"]("No environment passed to template");
              }
              if (!templateSpec || !templateSpec.main) {
                throw new _exception2["default"]("Unknown template object: " + typeof templateSpec);
              }
              templateSpec.main.decorator = templateSpec.main_d;
              env.VM.checkRevision(templateSpec.compiler);
              var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;
              function invokePartialWrapper(partial, context, options) {
                if (options.hash) {
                  context = Utils.extend({}, context, options.hash);
                  if (options.ids) {
                    options.ids[0] = true;
                  }
                }
                partial = env.VM.resolvePartial.call(this, partial, context, options);
                options.hooks = this.hooks;
                options.protoAccessControl = this.protoAccessControl;
                var result = env.VM.invokePartial.call(this, partial, context, options);
                if (result == null && env.compile) {
                  options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
                  result = options.partials[options.name](context, options);
                }
                if (result != null) {
                  if (options.indent) {
                    var lines = result.split("\n");
                    for (var i = 0, l = lines.length; i < l; i++) {
                      if (!lines[i] && i + 1 === l) {
                        break;
                      }
                      lines[i] = options.indent + lines[i];
                    }
                    result = lines.join("\n");
                  }
                  return result;
                } else {
                  throw new _exception2["default"]("The partial " + options.name + " could not be compiled when running in runtime-only mode");
                }
              }
              var container = {
                strict: function strict(obj, name, loc) {
                  if (!obj || !(name in obj)) {
                    throw new _exception2["default"]('"' + name + '" not defined in ' + obj, {
                      loc
                    });
                  }
                  return container.lookupProperty(obj, name);
                },
                lookupProperty: function lookupProperty(parent, propertyName) {
                  var result = parent[propertyName];
                  if (result == null) {
                    return result;
                  }
                  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return result;
                  }
                  if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
                    return result;
                  }
                  return void 0;
                },
                lookup: function lookup(depths, name) {
                  var len = depths.length;
                  for (var i = 0; i < len; i++) {
                    var result = depths[i] && container.lookupProperty(depths[i], name);
                    if (result != null) {
                      return result;
                    }
                  }
                },
                lambda: function lambda(current, context) {
                  return typeof current === "function" ? current.call(context) : current;
                },
                escapeExpression: Utils.escapeExpression,
                invokePartial: invokePartialWrapper,
                fn: function fn(i) {
                  var ret2 = templateSpec[i];
                  ret2.decorator = templateSpec[i + "_d"];
                  return ret2;
                },
                programs: [],
                program: function program(i, data, declaredBlockParams, blockParams, depths) {
                  var programWrapper = this.programs[i], fn = this.fn(i);
                  if (data || depths || blockParams || declaredBlockParams) {
                    programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
                  } else if (!programWrapper) {
                    programWrapper = this.programs[i] = wrapProgram(this, i, fn);
                  }
                  return programWrapper;
                },
                data: function data(value, depth) {
                  while (value && depth--) {
                    value = value._parent;
                  }
                  return value;
                },
                mergeIfNeeded: function mergeIfNeeded(param, common) {
                  var obj = param || common;
                  if (param && common && param !== common) {
                    obj = Utils.extend({}, common, param);
                  }
                  return obj;
                },
                // An empty object to use as replacement for null-contexts
                nullContext: _Object$seal({}),
                noop: env.VM.noop,
                compilerInfo: templateSpec.compiler
              };
              function ret(context) {
                var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
                var data = options.data;
                ret._setup(options);
                if (!options.partial && templateSpec.useData) {
                  data = initData(context, data);
                }
                var depths = void 0, blockParams = templateSpec.useBlockParams ? [] : void 0;
                if (templateSpec.useDepths) {
                  if (options.depths) {
                    depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
                  } else {
                    depths = [context];
                  }
                }
                function main(context2) {
                  return "" + templateSpec.main(container, context2, container.helpers, container.partials, data, blockParams, depths);
                }
                main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
                return main(context, options);
              }
              ret.isTop = true;
              ret._setup = function(options) {
                if (!options.partial) {
                  var mergedHelpers = {};
                  addHelpers(mergedHelpers, env.helpers, container);
                  addHelpers(mergedHelpers, options.helpers, container);
                  container.helpers = mergedHelpers;
                  if (templateSpec.usePartial) {
                    container.partials = container.mergeIfNeeded(options.partials, env.partials);
                  }
                  if (templateSpec.usePartial || templateSpec.useDecorators) {
                    container.decorators = Utils.extend({}, env.decorators, options.decorators);
                  }
                  container.hooks = {};
                  container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
                  var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
                  _helpers.moveHelperToHooks(container, "helperMissing", keepHelperInHelpers);
                  _helpers.moveHelperToHooks(container, "blockHelperMissing", keepHelperInHelpers);
                } else {
                  container.protoAccessControl = options.protoAccessControl;
                  container.helpers = options.helpers;
                  container.partials = options.partials;
                  container.decorators = options.decorators;
                  container.hooks = options.hooks;
                }
              };
              ret._child = function(i, data, blockParams, depths) {
                if (templateSpec.useBlockParams && !blockParams) {
                  throw new _exception2["default"]("must pass block params");
                }
                if (templateSpec.useDepths && !depths) {
                  throw new _exception2["default"]("must pass parent depths");
                }
                return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
              };
              return ret;
            }
            function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
              function prog(context) {
                var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
                var currentDepths = depths;
                if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
                  currentDepths = [context].concat(depths);
                }
                return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
              }
              prog = executeDecorators(fn, prog, container, depths, data, blockParams);
              prog.program = i;
              prog.depth = depths ? depths.length : 0;
              prog.blockParams = declaredBlockParams || 0;
              return prog;
            }
            function resolvePartial(partial, context, options) {
              if (!partial) {
                if (options.name === "@partial-block") {
                  partial = lookupOwnProperty(options.data, "partial-block");
                } else {
                  partial = lookupOwnProperty(options.partials, options.name);
                }
              } else if (!partial.call && !options.name) {
                options.name = partial;
                partial = lookupOwnProperty(options.partials, partial);
              }
              return partial;
            }
            function invokePartial(partial, context, options) {
              var currentPartialBlock = lookupOwnProperty(options.data, "partial-block");
              options.partial = true;
              if (options.ids) {
                options.data.contextPath = options.ids[0] || options.data.contextPath;
              }
              var partialBlock = void 0;
              if (options.fn && options.fn !== noop) {
                (function() {
                  options.data = _base.createFrame(options.data);
                  var fn = options.fn;
                  partialBlock = options.data["partial-block"] = function partialBlockWrapper(context2) {
                    var options2 = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
                    options2.data = _base.createFrame(options2.data);
                    options2.data["partial-block"] = currentPartialBlock;
                    return fn(context2, options2);
                  };
                  if (fn.partials) {
                    options.partials = Utils.extend({}, options.partials, fn.partials);
                  }
                })();
              }
              if (partial === void 0 && partialBlock) {
                partial = partialBlock;
              }
              if (partial === void 0) {
                throw new _exception2["default"]("The partial " + options.name + " could not be found");
              } else if (partial instanceof Function) {
                return partial(context, options);
              }
            }
            function noop() {
              return "";
            }
            function lookupOwnProperty(obj, name) {
              if (obj && Object.prototype.hasOwnProperty.call(obj, name)) {
                return obj[name];
              }
            }
            function initData(context, data) {
              if (!data || !("root" in data)) {
                data = data ? _base.createFrame(data) : {};
                data.root = context;
              }
              return data;
            }
            function executeDecorators(fn, prog, container, depths, data, blockParams) {
              if (fn.decorator) {
                var props = {};
                prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
                Utils.extend(prog, props);
              }
              return prog;
            }
            function addHelpers(mergedHelpers, helpers, container) {
              if (!helpers) return;
              _Object$keys(helpers).forEach(function(helperName) {
                var helper = helpers[helperName];
                mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
              });
            }
            function passLookupPropertyOption(helper, container) {
              var lookupProperty = container.lookupProperty;
              return _internalWrapHelper.wrapHelper(helper, function(options) {
                options.lookupProperty = lookupProperty;
                return options;
              });
            }
          }),
          /* 78 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            module2.exports = { "default": __webpack_require__(79), __esModule: true };
          }),
          /* 79 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            __webpack_require__(80);
            module2.exports = __webpack_require__(21).Object.seal;
          }),
          /* 80 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var isObject = __webpack_require__(40);
            __webpack_require__(64)("seal", function($seal) {
              return function seal(it) {
                return $seal && isObject(it) ? $seal(it) : it;
              };
            });
          }),
          /* 81 */
          /***/
          (function(module2, exports2) {
            "use strict";
            exports2.__esModule = true;
            exports2.wrapHelper = wrapHelper;
            function wrapHelper(helper, transformOptionsFn) {
              if (typeof helper !== "function") {
                return helper;
              }
              var wrapper = function wrapper2() {
                var options = arguments[arguments.length - 1];
                arguments[arguments.length - 1] = transformOptionsFn(options);
                return helper.apply(this, arguments);
              };
              return wrapper;
            }
          }),
          /* 82 */
          /***/
          (function(module2, exports2) {
            "use strict";
            exports2.__esModule = true;
            exports2["default"] = function(Handlebars2) {
              (function() {
                if (typeof globalThis === "object") return;
                Object.prototype.__defineGetter__("__magic__", function() {
                  return this;
                });
                __magic__.globalThis = __magic__;
                delete Object.prototype.__magic__;
              })();
              var $Handlebars = globalThis.Handlebars;
              Handlebars2.noConflict = function() {
                if (globalThis.Handlebars === Handlebars2) {
                  globalThis.Handlebars = $Handlebars;
                }
                return Handlebars2;
              };
            };
            module2.exports = exports2["default"];
          }),
          /* 83 */
          /***/
          (function(module2, exports2) {
            "use strict";
            exports2.__esModule = true;
            var AST = {
              // Public API used to evaluate derived attributes regarding AST nodes
              helpers: {
                // a mustache is definitely a helper if:
                // * it is an eligible helper, and
                // * it has at least one parameter or hash segment
                helperExpression: function helperExpression(node) {
                  return node.type === "SubExpression" || (node.type === "MustacheStatement" || node.type === "BlockStatement") && !!(node.params && node.params.length || node.hash);
                },
                scopedId: function scopedId(path) {
                  return /^\.|this\b/.test(path.original);
                },
                // an ID is simple if it only has one part, and that part is not
                // `..` or `this`.
                simpleId: function simpleId(path) {
                  return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
                }
              }
            };
            exports2["default"] = AST;
            module2.exports = exports2["default"];
          }),
          /* 84 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _Object$keys = __webpack_require__(60)["default"];
            var _interopRequireDefault = __webpack_require__(1)["default"];
            var _interopRequireWildcard = __webpack_require__(3)["default"];
            exports2.__esModule = true;
            exports2.parseWithoutProcessing = parseWithoutProcessing;
            exports2.parse = parse;
            var _parser = __webpack_require__(85);
            var _parser2 = _interopRequireDefault(_parser);
            var _whitespaceControl = __webpack_require__(86);
            var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);
            var _helpers = __webpack_require__(88);
            var Helpers = _interopRequireWildcard(_helpers);
            var _exception = __webpack_require__(6);
            var _exception2 = _interopRequireDefault(_exception);
            var _utils = __webpack_require__(5);
            exports2.parser = _parser2["default"];
            var yy = {};
            _utils.extend(yy, Helpers);
            function parseWithoutProcessing(input, options) {
              if (input.type === "Program") {
                validateInputAst(input);
                return input;
              }
              _parser2["default"].yy = yy;
              yy.locInfo = function(locInfo) {
                return new yy.SourceLocation(options && options.srcName, locInfo);
              };
              var ast = _parser2["default"].parse(input);
              return ast;
            }
            function parse(input, options) {
              var ast = parseWithoutProcessing(input, options);
              var strip = new _whitespaceControl2["default"](options);
              return strip.accept(ast);
            }
            function validateInputAst(ast) {
              validateAstNode(ast);
            }
            function validateAstNode(node) {
              if (node == null) {
                return;
              }
              if (Array.isArray(node)) {
                node.forEach(validateAstNode);
                return;
              }
              if (typeof node !== "object") {
                return;
              }
              if (node.type === "PathExpression") {
                if (!isValidDepth(node.depth)) {
                  throw new _exception2["default"]("Invalid AST: PathExpression.depth must be an integer");
                }
                if (!Array.isArray(node.parts)) {
                  throw new _exception2["default"]("Invalid AST: PathExpression.parts must be an array");
                }
                for (var i = 0; i < node.parts.length; i++) {
                  if (typeof node.parts[i] !== "string") {
                    throw new _exception2["default"]("Invalid AST: PathExpression.parts must only contain strings");
                  }
                }
              } else if (node.type === "NumberLiteral") {
                if (typeof node.value !== "number" || !isFinite(node.value)) {
                  throw new _exception2["default"]("Invalid AST: NumberLiteral.value must be a number");
                }
              } else if (node.type === "BooleanLiteral") {
                if (typeof node.value !== "boolean") {
                  throw new _exception2["default"]("Invalid AST: BooleanLiteral.value must be a boolean");
                }
              }
              _Object$keys(node).forEach(function(propertyName) {
                if (propertyName === "loc") {
                  return;
                }
                validateAstNode(node[propertyName]);
              });
            }
            function isValidDepth(depth) {
              return typeof depth === "number" && isFinite(depth) && Math.floor(depth) === depth && depth >= 0;
            }
          }),
          /* 85 */
          /***/
          (function(module2, exports2) {
            "use strict";
            exports2.__esModule = true;
            var handlebars = (function() {
              var parser = {
                trace: function trace() {
                },
                yy: {},
                symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
                terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
                productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
                performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
                  var $0 = $$.length - 1;
                  switch (yystate) {
                    case 1:
                      return $$[$0 - 1];
                      break;
                    case 2:
                      this.$ = yy.prepareProgram($$[$0]);
                      break;
                    case 3:
                      this.$ = $$[$0];
                      break;
                    case 4:
                      this.$ = $$[$0];
                      break;
                    case 5:
                      this.$ = $$[$0];
                      break;
                    case 6:
                      this.$ = $$[$0];
                      break;
                    case 7:
                      this.$ = $$[$0];
                      break;
                    case 8:
                      this.$ = $$[$0];
                      break;
                    case 9:
                      this.$ = {
                        type: "CommentStatement",
                        value: yy.stripComment($$[$0]),
                        strip: yy.stripFlags($$[$0], $$[$0]),
                        loc: yy.locInfo(this._$)
                      };
                      break;
                    case 10:
                      this.$ = {
                        type: "ContentStatement",
                        original: $$[$0],
                        value: $$[$0],
                        loc: yy.locInfo(this._$)
                      };
                      break;
                    case 11:
                      this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                      break;
                    case 12:
                      this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
                      break;
                    case 13:
                      this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
                      break;
                    case 14:
                      this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
                      break;
                    case 15:
                      this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
                      break;
                    case 16:
                      this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
                      break;
                    case 17:
                      this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
                      break;
                    case 18:
                      this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
                      break;
                    case 19:
                      var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$), program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
                      program.chained = true;
                      this.$ = { strip: $$[$0 - 2].strip, program, chain: true };
                      break;
                    case 20:
                      this.$ = $$[$0];
                      break;
                    case 21:
                      this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
                      break;
                    case 22:
                      this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                      break;
                    case 23:
                      this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                      break;
                    case 24:
                      this.$ = {
                        type: "PartialStatement",
                        name: $$[$0 - 3],
                        params: $$[$0 - 2],
                        hash: $$[$0 - 1],
                        indent: "",
                        strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                        loc: yy.locInfo(this._$)
                      };
                      break;
                    case 25:
                      this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                      break;
                    case 26:
                      this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
                      break;
                    case 27:
                      this.$ = $$[$0];
                      break;
                    case 28:
                      this.$ = $$[$0];
                      break;
                    case 29:
                      this.$ = {
                        type: "SubExpression",
                        path: $$[$0 - 3],
                        params: $$[$0 - 2],
                        hash: $$[$0 - 1],
                        loc: yy.locInfo(this._$)
                      };
                      break;
                    case 30:
                      this.$ = { type: "Hash", pairs: $$[$0], loc: yy.locInfo(this._$) };
                      break;
                    case 31:
                      this.$ = { type: "HashPair", key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
                      break;
                    case 32:
                      this.$ = yy.id($$[$0 - 1]);
                      break;
                    case 33:
                      this.$ = $$[$0];
                      break;
                    case 34:
                      this.$ = $$[$0];
                      break;
                    case 35:
                      this.$ = { type: "StringLiteral", value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
                      break;
                    case 36:
                      this.$ = { type: "NumberLiteral", value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
                      break;
                    case 37:
                      this.$ = { type: "BooleanLiteral", value: $$[$0] === "true", original: $$[$0] === "true", loc: yy.locInfo(this._$) };
                      break;
                    case 38:
                      this.$ = { type: "UndefinedLiteral", original: void 0, value: void 0, loc: yy.locInfo(this._$) };
                      break;
                    case 39:
                      this.$ = { type: "NullLiteral", original: null, value: null, loc: yy.locInfo(this._$) };
                      break;
                    case 40:
                      this.$ = $$[$0];
                      break;
                    case 41:
                      this.$ = $$[$0];
                      break;
                    case 42:
                      this.$ = yy.preparePath(true, $$[$0], this._$);
                      break;
                    case 43:
                      this.$ = yy.preparePath(false, $$[$0], this._$);
                      break;
                    case 44:
                      $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });
                      this.$ = $$[$0 - 2];
                      break;
                    case 45:
                      this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
                      break;
                    case 46:
                      this.$ = [];
                      break;
                    case 47:
                      $$[$0 - 1].push($$[$0]);
                      break;
                    case 48:
                      this.$ = [];
                      break;
                    case 49:
                      $$[$0 - 1].push($$[$0]);
                      break;
                    case 50:
                      this.$ = [];
                      break;
                    case 51:
                      $$[$0 - 1].push($$[$0]);
                      break;
                    case 58:
                      this.$ = [];
                      break;
                    case 59:
                      $$[$0 - 1].push($$[$0]);
                      break;
                    case 64:
                      this.$ = [];
                      break;
                    case 65:
                      $$[$0 - 1].push($$[$0]);
                      break;
                    case 70:
                      this.$ = [];
                      break;
                    case 71:
                      $$[$0 - 1].push($$[$0]);
                      break;
                    case 78:
                      this.$ = [];
                      break;
                    case 79:
                      $$[$0 - 1].push($$[$0]);
                      break;
                    case 82:
                      this.$ = [];
                      break;
                    case 83:
                      $$[$0 - 1].push($$[$0]);
                      break;
                    case 86:
                      this.$ = [];
                      break;
                    case 87:
                      $$[$0 - 1].push($$[$0]);
                      break;
                    case 90:
                      this.$ = [];
                      break;
                    case 91:
                      $$[$0 - 1].push($$[$0]);
                      break;
                    case 94:
                      this.$ = [];
                      break;
                    case 95:
                      $$[$0 - 1].push($$[$0]);
                      break;
                    case 98:
                      this.$ = [$$[$0]];
                      break;
                    case 99:
                      $$[$0 - 1].push($$[$0]);
                      break;
                    case 100:
                      this.$ = [$$[$0]];
                      break;
                    case 101:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  }
                },
                table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
                defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
                parseError: function parseError(str, hash) {
                  throw new Error(str);
                },
                parse: function parse(input) {
                  var self2 = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
                  this.lexer.setInput(input);
                  this.lexer.yy = this.yy;
                  this.yy.lexer = this.lexer;
                  this.yy.parser = this;
                  if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
                  var yyloc = this.lexer.yylloc;
                  lstack.push(yyloc);
                  var ranges = this.lexer.options && this.lexer.options.ranges;
                  if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
                  function popStack(n) {
                    stack.length = stack.length - 2 * n;
                    vstack.length = vstack.length - n;
                    lstack.length = lstack.length - n;
                  }
                  function lex() {
                    var token;
                    token = self2.lexer.lex() || 1;
                    if (typeof token !== "number") {
                      token = self2.symbols_[token] || token;
                    }
                    return token;
                  }
                  var symbol, preErrorSymbol, state2, action, a, r, yyval = {}, p, len, newState, expected;
                  while (true) {
                    state2 = stack[stack.length - 1];
                    if (this.defaultActions[state2]) {
                      action = this.defaultActions[state2];
                    } else {
                      if (symbol === null || typeof symbol == "undefined") {
                        symbol = lex();
                      }
                      action = table[state2] && table[state2][symbol];
                    }
                    if (typeof action === "undefined" || !action.length || !action[0]) {
                      var errStr = "";
                      if (!recovering) {
                        expected = [];
                        for (p in table[state2]) if (this.terminals_[p] && p > 2) {
                          expected.push("'" + this.terminals_[p] + "'");
                        }
                        if (this.lexer.showPosition) {
                          errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                        } else {
                          errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                        }
                        this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected });
                      }
                    }
                    if (action[0] instanceof Array && action.length > 1) {
                      throw new Error("Parse Error: multiple actions possible at state: " + state2 + ", token: " + symbol);
                    }
                    switch (action[0]) {
                      case 1:
                        stack.push(symbol);
                        vstack.push(this.lexer.yytext);
                        lstack.push(this.lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                          yyleng = this.lexer.yyleng;
                          yytext = this.lexer.yytext;
                          yylineno = this.lexer.yylineno;
                          yyloc = this.lexer.yylloc;
                          if (recovering > 0) recovering--;
                        } else {
                          symbol = preErrorSymbol;
                          preErrorSymbol = null;
                        }
                        break;
                      case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
                        if (ranges) {
                          yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                        if (typeof r !== "undefined") {
                          return r;
                        }
                        if (len) {
                          stack = stack.slice(0, -1 * len * 2);
                          vstack = vstack.slice(0, -1 * len);
                          lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                      case 3:
                        return true;
                    }
                  }
                  return true;
                }
              };
              var lexer = (function() {
                var lexer2 = {
                  EOF: 1,
                  parseError: function parseError(str, hash) {
                    if (this.yy.parser) {
                      this.yy.parser.parseError(str, hash);
                    } else {
                      throw new Error(str);
                    }
                  },
                  setInput: function setInput(input) {
                    this._input = input;
                    this._more = this._less = this.done = false;
                    this.yylineno = this.yyleng = 0;
                    this.yytext = this.matched = this.match = "";
                    this.conditionStack = ["INITIAL"];
                    this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
                    if (this.options.ranges) this.yylloc.range = [0, 0];
                    this.offset = 0;
                    return this;
                  },
                  input: function input() {
                    var ch = this._input[0];
                    this.yytext += ch;
                    this.yyleng++;
                    this.offset++;
                    this.match += ch;
                    this.matched += ch;
                    var lines = ch.match(/(?:\r\n?|\n).*/g);
                    if (lines) {
                      this.yylineno++;
                      this.yylloc.last_line++;
                    } else {
                      this.yylloc.last_column++;
                    }
                    if (this.options.ranges) this.yylloc.range[1]++;
                    this._input = this._input.slice(1);
                    return ch;
                  },
                  unput: function unput(ch) {
                    var len = ch.length;
                    var lines = ch.split(/(?:\r\n?|\n)/g);
                    this._input = ch + this._input;
                    this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                    this.offset -= len;
                    var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                    this.match = this.match.substr(0, this.match.length - 1);
                    this.matched = this.matched.substr(0, this.matched.length - 1);
                    if (lines.length - 1) this.yylineno -= lines.length - 1;
                    var r = this.yylloc.range;
                    this.yylloc = {
                      first_line: this.yylloc.first_line,
                      last_line: this.yylineno + 1,
                      first_column: this.yylloc.first_column,
                      last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                    };
                    if (this.options.ranges) {
                      this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                    }
                    return this;
                  },
                  more: function more() {
                    this._more = true;
                    return this;
                  },
                  less: function less(n) {
                    this.unput(this.match.slice(n));
                  },
                  pastInput: function pastInput() {
                    var past = this.matched.substr(0, this.matched.length - this.match.length);
                    return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
                  },
                  upcomingInput: function upcomingInput() {
                    var next = this.match;
                    if (next.length < 20) {
                      next += this._input.substr(0, 20 - next.length);
                    }
                    return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
                  },
                  showPosition: function showPosition() {
                    var pre = this.pastInput();
                    var c = new Array(pre.length + 1).join("-");
                    return pre + this.upcomingInput() + "\n" + c + "^";
                  },
                  next: function next() {
                    if (this.done) {
                      return this.EOF;
                    }
                    if (!this._input) this.done = true;
                    var token, match, tempMatch, index, col, lines;
                    if (!this._more) {
                      this.yytext = "";
                      this.match = "";
                    }
                    var rules = this._currentRules();
                    for (var i = 0; i < rules.length; i++) {
                      tempMatch = this._input.match(this.rules[rules[i]]);
                      if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (!this.options.flex) break;
                      }
                    }
                    if (match) {
                      lines = match[0].match(/(?:\r\n?|\n).*/g);
                      if (lines) this.yylineno += lines.length;
                      this.yylloc = {
                        first_line: this.yylloc.last_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.last_column,
                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                      };
                      this.yytext += match[0];
                      this.match += match[0];
                      this.matches = match;
                      this.yyleng = this.yytext.length;
                      if (this.options.ranges) {
                        this.yylloc.range = [this.offset, this.offset += this.yyleng];
                      }
                      this._more = false;
                      this._input = this._input.slice(match[0].length);
                      this.matched += match[0];
                      token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
                      if (this.done && this._input) this.done = false;
                      if (token) return token;
                      else return;
                    }
                    if (this._input === "") {
                      return this.EOF;
                    } else {
                      return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), { text: "", token: null, line: this.yylineno });
                    }
                  },
                  lex: function lex() {
                    var r = this.next();
                    if (typeof r !== "undefined") {
                      return r;
                    } else {
                      return this.lex();
                    }
                  },
                  begin: function begin(condition) {
                    this.conditionStack.push(condition);
                  },
                  popState: function popState() {
                    return this.conditionStack.pop();
                  },
                  _currentRules: function _currentRules() {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                  },
                  topState: function topState() {
                    return this.conditionStack[this.conditionStack.length - 2];
                  },
                  pushState: function begin(condition) {
                    this.begin(condition);
                  }
                };
                lexer2.options = {};
                lexer2.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                  function strip(start, end) {
                    return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
                  }
                  var YYSTATE = YY_START;
                  switch ($avoiding_name_collisions) {
                    case 0:
                      if (yy_.yytext.slice(-2) === "\\\\") {
                        strip(0, 1);
                        this.begin("mu");
                      } else if (yy_.yytext.slice(-1) === "\\") {
                        strip(0, 1);
                        this.begin("emu");
                      } else {
                        this.begin("mu");
                      }
                      if (yy_.yytext) return 15;
                      break;
                    case 1:
                      return 15;
                      break;
                    case 2:
                      this.popState();
                      return 15;
                      break;
                    case 3:
                      this.begin("raw");
                      return 15;
                      break;
                    case 4:
                      this.popState();
                      if (this.conditionStack[this.conditionStack.length - 1] === "raw") {
                        return 15;
                      } else {
                        strip(5, 9);
                        return "END_RAW_BLOCK";
                      }
                      break;
                    case 5:
                      return 15;
                      break;
                    case 6:
                      this.popState();
                      return 14;
                      break;
                    case 7:
                      return 65;
                      break;
                    case 8:
                      return 68;
                      break;
                    case 9:
                      return 19;
                      break;
                    case 10:
                      this.popState();
                      this.begin("raw");
                      return 23;
                      break;
                    case 11:
                      return 55;
                      break;
                    case 12:
                      return 60;
                      break;
                    case 13:
                      return 29;
                      break;
                    case 14:
                      return 47;
                      break;
                    case 15:
                      this.popState();
                      return 44;
                      break;
                    case 16:
                      this.popState();
                      return 44;
                      break;
                    case 17:
                      return 34;
                      break;
                    case 18:
                      return 39;
                      break;
                    case 19:
                      return 51;
                      break;
                    case 20:
                      return 48;
                      break;
                    case 21:
                      this.unput(yy_.yytext);
                      this.popState();
                      this.begin("com");
                      break;
                    case 22:
                      this.popState();
                      return 14;
                      break;
                    case 23:
                      return 48;
                      break;
                    case 24:
                      return 73;
                      break;
                    case 25:
                      return 72;
                      break;
                    case 26:
                      return 72;
                      break;
                    case 27:
                      return 87;
                      break;
                    case 28:
                      break;
                    case 29:
                      this.popState();
                      return 54;
                      break;
                    case 30:
                      this.popState();
                      return 33;
                      break;
                    case 31:
                      yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
                      return 80;
                      break;
                    case 32:
                      yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
                      return 80;
                      break;
                    case 33:
                      return 85;
                      break;
                    case 34:
                      return 82;
                      break;
                    case 35:
                      return 82;
                      break;
                    case 36:
                      return 83;
                      break;
                    case 37:
                      return 84;
                      break;
                    case 38:
                      return 81;
                      break;
                    case 39:
                      return 75;
                      break;
                    case 40:
                      return 77;
                      break;
                    case 41:
                      return 72;
                      break;
                    case 42:
                      yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, "$1");
                      return 72;
                      break;
                    case 43:
                      return "INVALID";
                      break;
                    case 44:
                      return 5;
                      break;
                  }
                };
                lexer2.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
                lexer2.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
                return lexer2;
              })();
              parser.lexer = lexer;
              function Parser() {
                this.yy = {};
              }
              Parser.prototype = parser;
              parser.Parser = Parser;
              return new Parser();
            })();
            exports2["default"] = handlebars;
            module2.exports = exports2["default"];
          }),
          /* 86 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            var _visitor = __webpack_require__(87);
            var _visitor2 = _interopRequireDefault(_visitor);
            function WhitespaceControl() {
              var options = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
              this.options = options;
            }
            WhitespaceControl.prototype = new _visitor2["default"]();
            WhitespaceControl.prototype.Program = function(program) {
              var doStandalone = !this.options.ignoreStandalone;
              var isRoot = !this.isRootSeen;
              this.isRootSeen = true;
              var body = program.body;
              for (var i = 0, l = body.length; i < l; i++) {
                var current = body[i], strip = this.accept(current);
                if (!strip) {
                  continue;
                }
                var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot), _isNextWhitespace = isNextWhitespace(body, i, isRoot), openStandalone = strip.openStandalone && _isPrevWhitespace, closeStandalone = strip.closeStandalone && _isNextWhitespace, inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
                if (strip.close) {
                  omitRight(body, i, true);
                }
                if (strip.open) {
                  omitLeft(body, i, true);
                }
                if (doStandalone && inlineStandalone) {
                  omitRight(body, i);
                  if (omitLeft(body, i)) {
                    if (current.type === "PartialStatement") {
                      current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
                    }
                  }
                }
                if (doStandalone && openStandalone) {
                  omitRight((current.program || current.inverse).body);
                  omitLeft(body, i);
                }
                if (doStandalone && closeStandalone) {
                  omitRight(body, i);
                  omitLeft((current.inverse || current.program).body);
                }
              }
              return program;
            };
            WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function(block) {
              this.accept(block.program);
              this.accept(block.inverse);
              var program = block.program || block.inverse, inverse = block.program && block.inverse, firstInverse = inverse, lastInverse = inverse;
              if (inverse && inverse.chained) {
                firstInverse = inverse.body[0].program;
                while (lastInverse.chained) {
                  lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
                }
              }
              var strip = {
                open: block.openStrip.open,
                close: block.closeStrip.close,
                // Determine the standalone candiacy. Basically flag our content as being possibly standalone
                // so our parent can determine if we actually are standalone
                openStandalone: isNextWhitespace(program.body),
                closeStandalone: isPrevWhitespace((firstInverse || program).body)
              };
              if (block.openStrip.close) {
                omitRight(program.body, null, true);
              }
              if (inverse) {
                var inverseStrip = block.inverseStrip;
                if (inverseStrip.open) {
                  omitLeft(program.body, null, true);
                }
                if (inverseStrip.close) {
                  omitRight(firstInverse.body, null, true);
                }
                if (block.closeStrip.open) {
                  omitLeft(lastInverse.body, null, true);
                }
                if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
                  omitLeft(program.body);
                  omitRight(firstInverse.body);
                }
              } else if (block.closeStrip.open) {
                omitLeft(program.body, null, true);
              }
              return strip;
            };
            WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function(mustache) {
              return mustache.strip;
            };
            WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function(node) {
              var strip = node.strip || {};
              return {
                inlineStandalone: true,
                open: strip.open,
                close: strip.close
              };
            };
            function isPrevWhitespace(body, i, isRoot) {
              if (i === void 0) {
                i = body.length;
              }
              var prev = body[i - 1], sibling = body[i - 2];
              if (!prev) {
                return isRoot;
              }
              if (prev.type === "ContentStatement") {
                return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
              }
            }
            function isNextWhitespace(body, i, isRoot) {
              if (i === void 0) {
                i = -1;
              }
              var next = body[i + 1], sibling = body[i + 2];
              if (!next) {
                return isRoot;
              }
              if (next.type === "ContentStatement") {
                return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
              }
            }
            function omitRight(body, i, multiple) {
              var current = body[i == null ? 0 : i + 1];
              if (!current || current.type !== "ContentStatement" || !multiple && current.rightStripped) {
                return;
              }
              var original = current.value;
              current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, "");
              current.rightStripped = current.value !== original;
            }
            function omitLeft(body, i, multiple) {
              var current = body[i == null ? body.length - 1 : i - 1];
              if (!current || current.type !== "ContentStatement" || !multiple && current.leftStripped) {
                return;
              }
              var original = current.value;
              current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, "");
              current.leftStripped = current.value !== original;
              return current.leftStripped;
            }
            exports2["default"] = WhitespaceControl;
            module2.exports = exports2["default"];
          }),
          /* 87 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            var _exception = __webpack_require__(6);
            var _exception2 = _interopRequireDefault(_exception);
            function Visitor() {
              this.parents = [];
            }
            Visitor.prototype = {
              constructor: Visitor,
              mutating: false,
              // Visits a given value. If mutating, will replace the value if necessary.
              acceptKey: function acceptKey(node, name) {
                var value = this.accept(node[name]);
                if (this.mutating) {
                  if (value && !Visitor.prototype[value.type]) {
                    throw new _exception2["default"]('Unexpected node type "' + value.type + '" found when accepting ' + name + " on " + node.type);
                  }
                  node[name] = value;
                }
              },
              // Performs an accept operation with added sanity check to ensure
              // required keys are not removed.
              acceptRequired: function acceptRequired(node, name) {
                this.acceptKey(node, name);
                if (!node[name]) {
                  throw new _exception2["default"](node.type + " requires " + name);
                }
              },
              // Traverses a given array. If mutating, empty respnses will be removed
              // for child elements.
              acceptArray: function acceptArray(array) {
                for (var i = 0, l = array.length; i < l; i++) {
                  this.acceptKey(array, i);
                  if (!array[i]) {
                    array.splice(i, 1);
                    i--;
                    l--;
                  }
                }
              },
              accept: function accept(object) {
                if (!object) {
                  return;
                }
                if (!this[object.type]) {
                  throw new _exception2["default"]("Unknown type: " + object.type, object);
                }
                if (this.current) {
                  this.parents.unshift(this.current);
                }
                this.current = object;
                var ret = this[object.type](object);
                this.current = this.parents.shift();
                if (!this.mutating || ret) {
                  return ret;
                } else if (ret !== false) {
                  return object;
                }
              },
              Program: function Program(program) {
                this.acceptArray(program.body);
              },
              MustacheStatement: visitSubExpression,
              Decorator: visitSubExpression,
              BlockStatement: visitBlock,
              DecoratorBlock: visitBlock,
              PartialStatement: visitPartial,
              PartialBlockStatement: function PartialBlockStatement(partial) {
                visitPartial.call(this, partial);
                this.acceptKey(partial, "program");
              },
              ContentStatement: function ContentStatement() {
              },
              CommentStatement: function CommentStatement() {
              },
              SubExpression: visitSubExpression,
              PathExpression: function PathExpression() {
              },
              StringLiteral: function StringLiteral() {
              },
              NumberLiteral: function NumberLiteral() {
              },
              BooleanLiteral: function BooleanLiteral() {
              },
              UndefinedLiteral: function UndefinedLiteral() {
              },
              NullLiteral: function NullLiteral() {
              },
              Hash: function Hash(hash) {
                this.acceptArray(hash.pairs);
              },
              HashPair: function HashPair(pair) {
                this.acceptRequired(pair, "value");
              }
            };
            function visitSubExpression(mustache) {
              this.acceptRequired(mustache, "path");
              this.acceptArray(mustache.params);
              this.acceptKey(mustache, "hash");
            }
            function visitBlock(block) {
              visitSubExpression.call(this, block);
              this.acceptKey(block, "program");
              this.acceptKey(block, "inverse");
            }
            function visitPartial(partial) {
              this.acceptRequired(partial, "name");
              this.acceptArray(partial.params);
              this.acceptKey(partial, "hash");
            }
            exports2["default"] = Visitor;
            module2.exports = exports2["default"];
          }),
          /* 88 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            exports2.SourceLocation = SourceLocation;
            exports2.id = id;
            exports2.stripFlags = stripFlags;
            exports2.stripComment = stripComment;
            exports2.preparePath = preparePath;
            exports2.prepareMustache = prepareMustache;
            exports2.prepareRawBlock = prepareRawBlock;
            exports2.prepareBlock = prepareBlock;
            exports2.prepareProgram = prepareProgram;
            exports2.preparePartialBlock = preparePartialBlock;
            var _exception = __webpack_require__(6);
            var _exception2 = _interopRequireDefault(_exception);
            function validateClose(open, close) {
              close = close.path ? close.path.original : close;
              if (open.path.original !== close) {
                var errorNode = { loc: open.path.loc };
                throw new _exception2["default"](open.path.original + " doesn't match " + close, errorNode);
              }
            }
            function SourceLocation(source, locInfo) {
              this.source = source;
              this.start = {
                line: locInfo.first_line,
                column: locInfo.first_column
              };
              this.end = {
                line: locInfo.last_line,
                column: locInfo.last_column
              };
            }
            function id(token) {
              if (/^\[.*\]$/.test(token)) {
                return token.substring(1, token.length - 1);
              } else {
                return token;
              }
            }
            function stripFlags(open, close) {
              return {
                open: open.charAt(2) === "~",
                close: close.charAt(close.length - 3) === "~"
              };
            }
            function stripComment(comment) {
              return comment.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
            }
            function preparePath(data, parts, loc) {
              loc = this.locInfo(loc);
              var original = data ? "@" : "", dig = [], depth = 0;
              for (var i = 0, l = parts.length; i < l; i++) {
                var part = parts[i].part, isLiteral = parts[i].original !== part;
                original += (parts[i].separator || "") + part;
                if (!isLiteral && (part === ".." || part === "." || part === "this")) {
                  if (dig.length > 0) {
                    throw new _exception2["default"]("Invalid path: " + original, { loc });
                  } else if (part === "..") {
                    depth++;
                  }
                } else {
                  dig.push(part);
                }
              }
              return {
                type: "PathExpression",
                data,
                depth,
                parts: dig,
                original,
                loc
              };
            }
            function prepareMustache(path, params, hash, open, strip, locInfo) {
              var escapeFlag = open.charAt(3) || open.charAt(2), escaped = escapeFlag !== "{" && escapeFlag !== "&";
              var decorator = /\*/.test(open);
              return {
                type: decorator ? "Decorator" : "MustacheStatement",
                path,
                params,
                hash,
                escaped,
                strip,
                loc: this.locInfo(locInfo)
              };
            }
            function prepareRawBlock(openRawBlock, contents, close, locInfo) {
              validateClose(openRawBlock, close);
              locInfo = this.locInfo(locInfo);
              var program = {
                type: "Program",
                body: contents,
                strip: {},
                loc: locInfo
              };
              return {
                type: "BlockStatement",
                path: openRawBlock.path,
                params: openRawBlock.params,
                hash: openRawBlock.hash,
                program,
                openStrip: {},
                inverseStrip: {},
                closeStrip: {},
                loc: locInfo
              };
            }
            function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
              if (close && close.path) {
                validateClose(openBlock, close);
              }
              var decorator = /\*/.test(openBlock.open);
              program.blockParams = openBlock.blockParams;
              var inverse = void 0, inverseStrip = void 0;
              if (inverseAndProgram) {
                if (decorator) {
                  throw new _exception2["default"]("Unexpected inverse block on decorator", inverseAndProgram);
                }
                if (inverseAndProgram.chain) {
                  inverseAndProgram.program.body[0].closeStrip = close.strip;
                }
                inverseStrip = inverseAndProgram.strip;
                inverse = inverseAndProgram.program;
              }
              if (inverted) {
                inverted = inverse;
                inverse = program;
                program = inverted;
              }
              return {
                type: decorator ? "DecoratorBlock" : "BlockStatement",
                path: openBlock.path,
                params: openBlock.params,
                hash: openBlock.hash,
                program,
                inverse,
                openStrip: openBlock.strip,
                inverseStrip,
                closeStrip: close && close.strip,
                loc: this.locInfo(locInfo)
              };
            }
            function prepareProgram(statements, loc) {
              if (!loc && statements.length) {
                var firstLoc = statements[0].loc, lastLoc = statements[statements.length - 1].loc;
                if (firstLoc && lastLoc) {
                  loc = {
                    source: firstLoc.source,
                    start: {
                      line: firstLoc.start.line,
                      column: firstLoc.start.column
                    },
                    end: {
                      line: lastLoc.end.line,
                      column: lastLoc.end.column
                    }
                  };
                }
              }
              return {
                type: "Program",
                body: statements,
                strip: {},
                loc
              };
            }
            function preparePartialBlock(open, program, close, locInfo) {
              validateClose(open, close);
              return {
                type: "PartialBlockStatement",
                name: open.path,
                params: open.params,
                hash: open.hash,
                program,
                openStrip: open.strip,
                closeStrip: close && close.strip,
                loc: this.locInfo(locInfo)
              };
            }
          }),
          /* 89 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _Object$create = __webpack_require__(74)["default"];
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            exports2.Compiler = Compiler;
            exports2.precompile = precompile;
            exports2.compile = compile;
            var _exception = __webpack_require__(6);
            var _exception2 = _interopRequireDefault(_exception);
            var _utils = __webpack_require__(5);
            var _ast = __webpack_require__(83);
            var _ast2 = _interopRequireDefault(_ast);
            var slice = [].slice;
            function Compiler() {
            }
            Compiler.prototype = {
              compiler: Compiler,
              equals: function equals(other) {
                var len = this.opcodes.length;
                if (other.opcodes.length !== len) {
                  return false;
                }
                for (var i = 0; i < len; i++) {
                  var opcode = this.opcodes[i], otherOpcode = other.opcodes[i];
                  if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
                    return false;
                  }
                }
                len = this.children.length;
                for (var i = 0; i < len; i++) {
                  if (!this.children[i].equals(other.children[i])) {
                    return false;
                  }
                }
                return true;
              },
              guid: 0,
              compile: function compile2(program, options) {
                this.sourceNode = [];
                this.opcodes = [];
                this.children = [];
                this.options = options;
                this.stringParams = options.stringParams;
                this.trackIds = options.trackIds;
                options.blockParams = options.blockParams || [];
                options.knownHelpers = _utils.extend(_Object$create(null), {
                  helperMissing: true,
                  blockHelperMissing: true,
                  each: true,
                  "if": true,
                  unless: true,
                  "with": true,
                  log: true,
                  lookup: true
                }, options.knownHelpers);
                return this.accept(program);
              },
              compileProgram: function compileProgram(program) {
                var childCompiler = new this.compiler(), result = childCompiler.compile(program, this.options), guid = this.guid++;
                this.usePartial = this.usePartial || result.usePartial;
                this.children[guid] = result;
                this.useDepths = this.useDepths || result.useDepths;
                return guid;
              },
              accept: function accept(node) {
                if (!this[node.type]) {
                  throw new _exception2["default"]("Unknown type: " + node.type, node);
                }
                this.sourceNode.unshift(node);
                var ret = this[node.type](node);
                this.sourceNode.shift();
                return ret;
              },
              Program: function Program(program) {
                this.options.blockParams.unshift(program.blockParams);
                var body = program.body, bodyLength = body.length;
                for (var i = 0; i < bodyLength; i++) {
                  this.accept(body[i]);
                }
                this.options.blockParams.shift();
                this.isSimple = bodyLength === 1;
                this.blockParams = program.blockParams ? program.blockParams.length : 0;
                return this;
              },
              BlockStatement: function BlockStatement(block) {
                transformLiteralToPath(block);
                var program = block.program, inverse = block.inverse;
                program = program && this.compileProgram(program);
                inverse = inverse && this.compileProgram(inverse);
                var type = this.classifySexpr(block);
                if (type === "helper") {
                  this.helperSexpr(block, program, inverse);
                } else if (type === "simple") {
                  this.simpleSexpr(block);
                  this.opcode("pushProgram", program);
                  this.opcode("pushProgram", inverse);
                  this.opcode("emptyHash");
                  this.opcode("blockValue", block.path.original);
                } else {
                  this.ambiguousSexpr(block, program, inverse);
                  this.opcode("pushProgram", program);
                  this.opcode("pushProgram", inverse);
                  this.opcode("emptyHash");
                  this.opcode("ambiguousBlockValue");
                }
                this.opcode("append");
              },
              DecoratorBlock: function DecoratorBlock(decorator) {
                var program = decorator.program && this.compileProgram(decorator.program);
                var params = this.setupFullMustacheParams(decorator, program, void 0), path = decorator.path;
                this.useDecorators = true;
                this.opcode("registerDecorator", params.length, path.original);
              },
              PartialStatement: function PartialStatement(partial) {
                this.usePartial = true;
                var program = partial.program;
                if (program) {
                  program = this.compileProgram(partial.program);
                }
                var params = partial.params;
                if (params.length > 1) {
                  throw new _exception2["default"]("Unsupported number of partial arguments: " + params.length, partial);
                } else if (!params.length) {
                  if (this.options.explicitPartialContext) {
                    this.opcode("pushLiteral", "undefined");
                  } else {
                    params.push({ type: "PathExpression", parts: [], depth: 0 });
                  }
                }
                var partialName = partial.name.original, isDynamic = partial.name.type === "SubExpression";
                if (isDynamic) {
                  this.accept(partial.name);
                }
                this.setupFullMustacheParams(partial, program, void 0, true);
                var indent = partial.indent || "";
                if (this.options.preventIndent && indent) {
                  this.opcode("appendContent", indent);
                  indent = "";
                }
                this.opcode("invokePartial", isDynamic, partialName, indent);
                this.opcode("append");
              },
              PartialBlockStatement: function PartialBlockStatement(partialBlock) {
                this.PartialStatement(partialBlock);
              },
              MustacheStatement: function MustacheStatement(mustache) {
                this.SubExpression(mustache);
                if (mustache.escaped && !this.options.noEscape) {
                  this.opcode("appendEscaped");
                } else {
                  this.opcode("append");
                }
              },
              Decorator: function Decorator(decorator) {
                this.DecoratorBlock(decorator);
              },
              ContentStatement: function ContentStatement(content) {
                if (content.value) {
                  this.opcode("appendContent", content.value);
                }
              },
              CommentStatement: function CommentStatement() {
              },
              SubExpression: function SubExpression(sexpr) {
                transformLiteralToPath(sexpr);
                var type = this.classifySexpr(sexpr);
                if (type === "simple") {
                  this.simpleSexpr(sexpr);
                } else if (type === "helper") {
                  this.helperSexpr(sexpr);
                } else {
                  this.ambiguousSexpr(sexpr);
                }
              },
              ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
                var path = sexpr.path, name = path.parts[0], isBlock = program != null || inverse != null;
                this.opcode("getContext", path.depth);
                this.opcode("pushProgram", program);
                this.opcode("pushProgram", inverse);
                path.strict = true;
                this.accept(path);
                this.opcode("invokeAmbiguous", name, isBlock);
              },
              simpleSexpr: function simpleSexpr(sexpr) {
                var path = sexpr.path;
                path.strict = true;
                this.accept(path);
                this.opcode("resolvePossibleLambda");
              },
              helperSexpr: function helperSexpr(sexpr, program, inverse) {
                var params = this.setupFullMustacheParams(sexpr, program, inverse), path = sexpr.path, name = path.parts[0];
                if (this.options.knownHelpers[name]) {
                  this.opcode("invokeKnownHelper", params.length, name);
                } else if (this.options.knownHelpersOnly) {
                  throw new _exception2["default"]("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
                } else {
                  path.strict = true;
                  path.falsy = true;
                  this.accept(path);
                  this.opcode("invokeHelper", params.length, path.original, _ast2["default"].helpers.simpleId(path));
                }
              },
              PathExpression: function PathExpression(path) {
                this.addDepth(path.depth);
                this.opcode("getContext", path.depth);
                var name = path.parts[0], scoped = _ast2["default"].helpers.scopedId(path), blockParamId = !path.depth && !scoped && this.blockParamIndex(name);
                if (blockParamId) {
                  this.opcode("lookupBlockParam", blockParamId, path.parts);
                } else if (!name) {
                  this.opcode("pushContext");
                } else if (path.data) {
                  this.options.data = true;
                  this.opcode("lookupData", path.depth, path.parts, path.strict);
                } else {
                  this.opcode("lookupOnContext", path.parts, path.falsy, path.strict, scoped);
                }
              },
              StringLiteral: function StringLiteral(string) {
                this.opcode("pushString", string.value);
              },
              NumberLiteral: function NumberLiteral(number) {
                this.opcode("pushLiteral", number.value);
              },
              BooleanLiteral: function BooleanLiteral(bool) {
                this.opcode("pushLiteral", bool.value);
              },
              UndefinedLiteral: function UndefinedLiteral() {
                this.opcode("pushLiteral", "undefined");
              },
              NullLiteral: function NullLiteral() {
                this.opcode("pushLiteral", "null");
              },
              Hash: function Hash(hash) {
                var pairs = hash.pairs, i = 0, l = pairs.length;
                this.opcode("pushHash");
                for (; i < l; i++) {
                  this.pushParam(pairs[i].value);
                }
                while (i--) {
                  this.opcode("assignToHash", pairs[i].key);
                }
                this.opcode("popHash");
              },
              // HELPERS
              opcode: function opcode(name) {
                this.opcodes.push({
                  opcode: name,
                  args: slice.call(arguments, 1),
                  loc: this.sourceNode[0].loc
                });
              },
              addDepth: function addDepth(depth) {
                if (!depth) {
                  return;
                }
                this.useDepths = true;
              },
              classifySexpr: function classifySexpr(sexpr) {
                var isSimple = _ast2["default"].helpers.simpleId(sexpr.path);
                var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);
                var isHelper = !isBlockParam && _ast2["default"].helpers.helperExpression(sexpr);
                var isEligible = !isBlockParam && (isHelper || isSimple);
                if (isEligible && !isHelper) {
                  var _name = sexpr.path.parts[0], options = this.options;
                  if (options.knownHelpers[_name]) {
                    isHelper = true;
                  } else if (options.knownHelpersOnly) {
                    isEligible = false;
                  }
                }
                if (isHelper) {
                  return "helper";
                } else if (isEligible) {
                  return "ambiguous";
                } else {
                  return "simple";
                }
              },
              pushParams: function pushParams(params) {
                for (var i = 0, l = params.length; i < l; i++) {
                  this.pushParam(params[i]);
                }
              },
              pushParam: function pushParam(val) {
                var value = val.value != null ? val.value : val.original || "";
                if (this.stringParams) {
                  if (value.replace) {
                    value = value.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".");
                  }
                  if (val.depth) {
                    this.addDepth(val.depth);
                  }
                  this.opcode("getContext", val.depth || 0);
                  this.opcode("pushStringParam", value, val.type);
                  if (val.type === "SubExpression") {
                    this.accept(val);
                  }
                } else {
                  if (this.trackIds) {
                    var blockParamIndex = void 0;
                    if (val.parts && !_ast2["default"].helpers.scopedId(val) && !val.depth) {
                      blockParamIndex = this.blockParamIndex(val.parts[0]);
                    }
                    if (blockParamIndex) {
                      var blockParamChild = val.parts.slice(1).join(".");
                      this.opcode("pushId", "BlockParam", blockParamIndex, blockParamChild);
                    } else {
                      value = val.original || value;
                      if (value.replace) {
                        value = value.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "");
                      }
                      this.opcode("pushId", val.type, value);
                    }
                  }
                  this.accept(val);
                }
              },
              setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
                var params = sexpr.params;
                this.pushParams(params);
                this.opcode("pushProgram", program);
                this.opcode("pushProgram", inverse);
                if (sexpr.hash) {
                  this.accept(sexpr.hash);
                } else {
                  this.opcode("emptyHash", omitEmpty);
                }
                return params;
              },
              blockParamIndex: function blockParamIndex(name) {
                for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
                  var blockParams = this.options.blockParams[depth], param = blockParams && _utils.indexOf(blockParams, name);
                  if (blockParams && param >= 0) {
                    return [depth, param];
                  }
                }
              }
            };
            function precompile(input, options, env) {
              if (input == null || typeof input !== "string" && input.type !== "Program") {
                throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
              }
              options = options || {};
              if (!("data" in options)) {
                options.data = true;
              }
              if (options.compat) {
                options.useDepths = true;
              }
              var ast = env.parse(input, options), environment = new env.Compiler().compile(ast, options);
              return new env.JavaScriptCompiler().compile(environment, options);
            }
            function compile(input, options, env) {
              if (options === void 0) options = {};
              if (input == null || typeof input !== "string" && input.type !== "Program") {
                throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
              }
              options = _utils.extend({}, options);
              if (!("data" in options)) {
                options.data = true;
              }
              if (options.compat) {
                options.useDepths = true;
              }
              var compiled = void 0;
              function compileInput() {
                var ast = env.parse(input, options), environment = new env.Compiler().compile(ast, options), templateSpec = new env.JavaScriptCompiler().compile(environment, options, void 0, true);
                return env.template(templateSpec);
              }
              function ret(context, execOptions) {
                if (!compiled) {
                  compiled = compileInput();
                }
                return compiled.call(this, context, execOptions);
              }
              ret._setup = function(setupOptions) {
                if (!compiled) {
                  compiled = compileInput();
                }
                return compiled._setup(setupOptions);
              };
              ret._child = function(i, data, blockParams, depths) {
                if (!compiled) {
                  compiled = compileInput();
                }
                return compiled._child(i, data, blockParams, depths);
              };
              return ret;
            }
            function argEquals(a, b) {
              if (a === b) {
                return true;
              }
              if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
                for (var i = 0; i < a.length; i++) {
                  if (!argEquals(a[i], b[i])) {
                    return false;
                  }
                }
                return true;
              }
            }
            function transformLiteralToPath(sexpr) {
              if (!sexpr.path.parts) {
                var literal = sexpr.path;
                sexpr.path = {
                  type: "PathExpression",
                  data: false,
                  depth: 0,
                  parts: [literal.original + ""],
                  original: literal.original + "",
                  loc: literal.loc
                };
              }
            }
          }),
          /* 90 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _Object$keys = __webpack_require__(60)["default"];
            var _interopRequireDefault = __webpack_require__(1)["default"];
            exports2.__esModule = true;
            var _base = __webpack_require__(4);
            var _exception = __webpack_require__(6);
            var _exception2 = _interopRequireDefault(_exception);
            var _utils = __webpack_require__(5);
            var _codeGen = __webpack_require__(91);
            var _codeGen2 = _interopRequireDefault(_codeGen);
            function Literal(value) {
              this.value = value;
            }
            function JavaScriptCompiler() {
            }
            JavaScriptCompiler.prototype = {
              // PUBLIC API: You can override these methods in a subclass to provide
              // alternative compiled forms for name lookup and buffering semantics
              nameLookup: function nameLookup(parent, name) {
                return this.internalNameLookup(parent, name);
              },
              depthedLookup: function depthedLookup(name) {
                return [this.aliasable("container.lookup"), "(depths, ", JSON.stringify(name), ")"];
              },
              compilerInfo: function compilerInfo() {
                var revision = _base.COMPILER_REVISION, versions = _base.REVISION_CHANGES[revision];
                return [revision, versions];
              },
              appendToBuffer: function appendToBuffer(source, location, explicit) {
                if (!_utils.isArray(source)) {
                  source = [source];
                }
                source = this.source.wrap(source, location);
                if (this.environment.isSimple) {
                  return ["return ", source, ";"];
                } else if (explicit) {
                  return ["buffer += ", source, ";"];
                } else {
                  source.appendToBuffer = true;
                  return source;
                }
              },
              initializeBuffer: function initializeBuffer() {
                return this.quotedString("");
              },
              // END PUBLIC API
              internalNameLookup: function internalNameLookup(parent, name) {
                this.lookupPropertyFunctionIsUsed = true;
                return ["lookupProperty(", parent, ",", JSON.stringify(name), ")"];
              },
              lookupPropertyFunctionIsUsed: false,
              compile: function compile(environment, options, context, asObject) {
                this.environment = environment;
                this.options = options;
                this.stringParams = this.options.stringParams;
                this.trackIds = this.options.trackIds;
                this.precompile = !asObject;
                this.name = this.environment.name;
                this.isChild = !!context;
                this.context = context || {
                  decorators: [],
                  programs: [],
                  environments: []
                };
                this.preamble();
                this.stackSlot = 0;
                this.stackVars = [];
                this.aliases = {};
                this.registers = { list: [] };
                this.hashes = [];
                this.compileStack = [];
                this.inlineStack = [];
                this.blockParams = [];
                this.compileChildren(environment, options);
                this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
                this.useBlockParams = this.useBlockParams || environment.useBlockParams;
                var opcodes = environment.opcodes, opcode = void 0, firstLoc = void 0, i = void 0, l = void 0;
                for (i = 0, l = opcodes.length; i < l; i++) {
                  opcode = opcodes[i];
                  this.source.currentLocation = opcode.loc;
                  firstLoc = firstLoc || opcode.loc;
                  this[opcode.opcode].apply(this, opcode.args);
                }
                this.source.currentLocation = firstLoc;
                this.pushSource("");
                if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
                  throw new _exception2["default"]("Compile completed with content left on stack");
                }
                if (!this.decorators.isEmpty()) {
                  this.useDecorators = true;
                  this.decorators.prepend(["var decorators = container.decorators, ", this.lookupPropertyFunctionVarDeclaration(), ";\n"]);
                  this.decorators.push("return fn;");
                  if (asObject) {
                    this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]);
                  } else {
                    this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n");
                    this.decorators.push("}\n");
                    this.decorators = this.decorators.merge();
                  }
                } else {
                  this.decorators = void 0;
                }
                var fn = this.createFunctionContext(asObject);
                if (!this.isChild) {
                  var ret = {
                    compiler: this.compilerInfo(),
                    main: fn
                  };
                  if (this.decorators) {
                    ret.main_d = this.decorators;
                    ret.useDecorators = true;
                  }
                  var _context = this.context;
                  var programs = _context.programs;
                  var decorators = _context.decorators;
                  for (i = 0, l = programs.length; i < l; i++) {
                    ret[i] = programs[i];
                    if (decorators[i]) {
                      ret[i + "_d"] = decorators[i];
                      ret.useDecorators = true;
                    }
                  }
                  if (this.environment.usePartial) {
                    ret.usePartial = true;
                  }
                  if (this.options.data) {
                    ret.useData = true;
                  }
                  if (this.useDepths) {
                    ret.useDepths = true;
                  }
                  if (this.useBlockParams) {
                    ret.useBlockParams = true;
                  }
                  if (this.options.compat) {
                    ret.compat = true;
                  }
                  if (!asObject) {
                    ret.compiler = JSON.stringify(ret.compiler);
                    this.source.currentLocation = { start: { line: 1, column: 0 } };
                    ret = this.objectLiteral(ret);
                    if (options.srcName) {
                      ret = ret.toStringWithSourceMap({ file: options.destName });
                      ret.map = ret.map && ret.map.toString();
                    } else {
                      ret = ret.toString();
                    }
                  } else {
                    ret.compilerOptions = this.options;
                  }
                  return ret;
                } else {
                  return fn;
                }
              },
              preamble: function preamble() {
                this.lastContext = 0;
                this.source = new _codeGen2["default"](this.options.srcName);
                this.decorators = new _codeGen2["default"](this.options.srcName);
              },
              createFunctionContext: function createFunctionContext(asObject) {
                var _this = this;
                var varDeclarations = "";
                var locals = this.stackVars.concat(this.registers.list);
                if (locals.length > 0) {
                  varDeclarations += ", " + locals.join(", ");
                }
                var aliasCount = 0;
                _Object$keys(this.aliases).forEach(function(alias) {
                  var node = _this.aliases[alias];
                  if (node.children && node.referenceCount > 1) {
                    varDeclarations += ", alias" + ++aliasCount + "=" + alias;
                    node.children[0] = "alias" + aliasCount;
                  }
                });
                if (this.lookupPropertyFunctionIsUsed) {
                  varDeclarations += ", " + this.lookupPropertyFunctionVarDeclaration();
                }
                var params = ["container", "depth0", "helpers", "partials", "data"];
                if (this.useBlockParams || this.useDepths) {
                  params.push("blockParams");
                }
                if (this.useDepths) {
                  params.push("depths");
                }
                var source = this.mergeSource(varDeclarations);
                if (asObject) {
                  params.push(source);
                  return Function.apply(this, params);
                } else {
                  return this.source.wrap(["function(", params.join(","), ") {\n  ", source, "}"]);
                }
              },
              mergeSource: function mergeSource(varDeclarations) {
                var isSimple = this.environment.isSimple, appendOnly = !this.forceBuffer, appendFirst = void 0, sourceSeen = void 0, bufferStart = void 0, bufferEnd = void 0;
                this.source.each(function(line) {
                  if (line.appendToBuffer) {
                    if (bufferStart) {
                      line.prepend("  + ");
                    } else {
                      bufferStart = line;
                    }
                    bufferEnd = line;
                  } else {
                    if (bufferStart) {
                      if (!sourceSeen) {
                        appendFirst = true;
                      } else {
                        bufferStart.prepend("buffer += ");
                      }
                      bufferEnd.add(";");
                      bufferStart = bufferEnd = void 0;
                    }
                    sourceSeen = true;
                    if (!isSimple) {
                      appendOnly = false;
                    }
                  }
                });
                if (appendOnly) {
                  if (bufferStart) {
                    bufferStart.prepend("return ");
                    bufferEnd.add(";");
                  } else if (!sourceSeen) {
                    this.source.push('return "";');
                  }
                } else {
                  varDeclarations += ", buffer = " + (appendFirst ? "" : this.initializeBuffer());
                  if (bufferStart) {
                    bufferStart.prepend("return buffer + ");
                    bufferEnd.add(";");
                  } else {
                    this.source.push("return buffer;");
                  }
                }
                if (varDeclarations) {
                  this.source.prepend("var " + varDeclarations.substring(2) + (appendFirst ? "" : ";\n"));
                }
                return this.source.merge();
              },
              lookupPropertyFunctionVarDeclaration: function lookupPropertyFunctionVarDeclaration() {
                return "\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    ".trim();
              },
              // [blockValue]
              //
              // On stack, before: hash, inverse, program, value
              // On stack, after: return value of blockHelperMissing
              //
              // The purpose of this opcode is to take a block of the form
              // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
              // replace it on the stack with the result of properly
              // invoking blockHelperMissing.
              blockValue: function blockValue(name) {
                var blockHelperMissing = this.aliasable("container.hooks.blockHelperMissing"), params = [this.contextName(0)];
                this.setupHelperArgs(name, 0, params);
                var blockName = this.popStack();
                params.splice(1, 0, blockName);
                this.push(this.source.functionCall(blockHelperMissing, "call", params));
              },
              // [ambiguousBlockValue]
              //
              // On stack, before: hash, inverse, program, value
              // Compiler value, before: lastHelper=value of last found helper, if any
              // On stack, after, if no lastHelper: same as [blockValue]
              // On stack, after, if lastHelper: value
              ambiguousBlockValue: function ambiguousBlockValue() {
                var blockHelperMissing = this.aliasable("container.hooks.blockHelperMissing"), params = [this.contextName(0)];
                this.setupHelperArgs("", 0, params, true);
                this.flushInline();
                var current = this.topStack();
                params.splice(1, 0, current);
                this.pushSource(["if (!", this.lastHelper, ") { ", current, " = ", this.source.functionCall(blockHelperMissing, "call", params), "}"]);
              },
              // [appendContent]
              //
              // On stack, before: ...
              // On stack, after: ...
              //
              // Appends the string value of `content` to the current buffer
              appendContent: function appendContent(content) {
                if (this.pendingContent) {
                  content = this.pendingContent + content;
                } else {
                  this.pendingLocation = this.source.currentLocation;
                }
                this.pendingContent = content;
              },
              // [append]
              //
              // On stack, before: value, ...
              // On stack, after: ...
              //
              // Coerces `value` to a String and appends it to the current buffer.
              //
              // If `value` is truthy, or 0, it is coerced into a string and appended
              // Otherwise, the empty string is appended
              append: function append() {
                if (this.isInline()) {
                  this.replaceStack(function(current) {
                    return [" != null ? ", current, ' : ""'];
                  });
                  this.pushSource(this.appendToBuffer(this.popStack()));
                } else {
                  var local = this.popStack();
                  this.pushSource(["if (", local, " != null) { ", this.appendToBuffer(local, void 0, true), " }"]);
                  if (this.environment.isSimple) {
                    this.pushSource(["else { ", this.appendToBuffer("''", void 0, true), " }"]);
                  }
                }
              },
              // [appendEscaped]
              //
              // On stack, before: value, ...
              // On stack, after: ...
              //
              // Escape `value` and append it to the buffer
              appendEscaped: function appendEscaped() {
                this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]));
              },
              // [getContext]
              //
              // On stack, before: ...
              // On stack, after: ...
              // Compiler value, after: lastContext=depth
              //
              // Set the value of the `lastContext` compiler value to the depth
              getContext: function getContext(depth) {
                this.lastContext = depth;
              },
              // [pushContext]
              //
              // On stack, before: ...
              // On stack, after: currentContext, ...
              //
              // Pushes the value of the current context onto the stack.
              pushContext: function pushContext() {
                this.pushStackLiteral(this.contextName(this.lastContext));
              },
              // [lookupOnContext]
              //
              // On stack, before: ...
              // On stack, after: currentContext[name], ...
              //
              // Looks up the value of `name` on the current context and pushes
              // it onto the stack.
              lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
                var i = 0;
                if (!scoped && this.options.compat && !this.lastContext) {
                  this.push(this.depthedLookup(parts[i++]));
                } else {
                  this.pushContext();
                }
                this.resolvePath("context", parts, i, falsy, strict);
              },
              // [lookupBlockParam]
              //
              // On stack, before: ...
              // On stack, after: blockParam[name], ...
              //
              // Looks up the value of `parts` on the given block param and pushes
              // it onto the stack.
              lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
                this.useBlockParams = true;
                this.push(["blockParams[", blockParamId[0], "][", blockParamId[1], "]"]);
                this.resolvePath("context", parts, 1);
              },
              // [lookupData]
              //
              // On stack, before: ...
              // On stack, after: data, ...
              //
              // Push the data lookup operator
              lookupData: function lookupData(depth, parts, strict) {
                if (!depth) {
                  this.pushStackLiteral("data");
                } else {
                  this.pushStackLiteral("container.data(data, " + depth + ")");
                }
                this.resolvePath("data", parts, 0, true, strict);
              },
              resolvePath: function resolvePath(type, parts, startPartIndex, falsy, strict) {
                var _this2 = this;
                if (this.options.strict || this.options.assumeObjects) {
                  this.push(strictLookup(this.options.strict && strict, this, parts, startPartIndex, type));
                  return;
                }
                var len = parts.length;
                var _loop = function(i2) {
                  _this2.replaceStack(function(current) {
                    var lookup = _this2.nameLookup(current, parts[i2], type);
                    if (!falsy) {
                      return [" != null ? ", lookup, " : ", current];
                    } else {
                      return [" && ", lookup];
                    }
                  });
                };
                for (var i = startPartIndex; i < len; i++) {
                  _loop(i);
                }
              },
              // [resolvePossibleLambda]
              //
              // On stack, before: value, ...
              // On stack, after: resolved value, ...
              //
              // If the `value` is a lambda, replace it on the stack by
              // the return value of the lambda
              resolvePossibleLambda: function resolvePossibleLambda() {
                this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"]);
              },
              // [pushStringParam]
              //
              // On stack, before: ...
              // On stack, after: string, currentContext, ...
              //
              // This opcode is designed for use in string mode, which
              // provides the string value of a parameter along with its
              // depth rather than resolving it immediately.
              pushStringParam: function pushStringParam(string, type) {
                this.pushContext();
                this.pushString(type);
                if (type !== "SubExpression") {
                  if (typeof string === "string") {
                    this.pushString(string);
                  } else {
                    this.pushStackLiteral(string);
                  }
                }
              },
              emptyHash: function emptyHash(omitEmpty) {
                if (this.trackIds) {
                  this.push("{}");
                }
                if (this.stringParams) {
                  this.push("{}");
                  this.push("{}");
                }
                this.pushStackLiteral(omitEmpty ? "undefined" : "{}");
              },
              pushHash: function pushHash() {
                if (this.hash) {
                  this.hashes.push(this.hash);
                }
                this.hash = { values: {}, types: [], contexts: [], ids: [] };
              },
              popHash: function popHash() {
                var hash = this.hash;
                this.hash = this.hashes.pop();
                if (this.trackIds) {
                  this.push(this.objectLiteral(hash.ids));
                }
                if (this.stringParams) {
                  this.push(this.objectLiteral(hash.contexts));
                  this.push(this.objectLiteral(hash.types));
                }
                this.push(this.objectLiteral(hash.values));
              },
              // [pushString]
              //
              // On stack, before: ...
              // On stack, after: quotedString(string), ...
              //
              // Push a quoted version of `string` onto the stack
              pushString: function pushString(string) {
                this.pushStackLiteral(this.quotedString(string));
              },
              // [pushLiteral]
              //
              // On stack, before: ...
              // On stack, after: value, ...
              //
              // Pushes a value onto the stack. This operation prevents
              // the compiler from creating a temporary variable to hold
              // it.
              pushLiteral: function pushLiteral(value) {
                this.pushStackLiteral(value);
              },
              // [pushProgram]
              //
              // On stack, before: ...
              // On stack, after: program(guid), ...
              //
              // Push a program expression onto the stack. This takes
              // a compile-time guid and converts it into a runtime-accessible
              // expression.
              pushProgram: function pushProgram(guid) {
                if (guid != null) {
                  this.pushStackLiteral(this.programExpression(guid));
                } else {
                  this.pushStackLiteral(null);
                }
              },
              // [registerDecorator]
              //
              // On stack, before: hash, program, params..., ...
              // On stack, after: ...
              //
              // Pops off the decorator's parameters, invokes the decorator,
              // and inserts the decorator into the decorators list.
              registerDecorator: function registerDecorator(paramSize, name) {
                var foundDecorator = this.nameLookup("decorators", name, "decorator"), options = this.setupHelperArgs(name, paramSize);
                this.decorators.push(["var decorator = ", foundDecorator, ";"]);
                this.decorators.push(['if (typeof decorator !== "function") { throw new Error(', this.quotedString('Missing decorator: "' + name + '"'), "); }"]);
                this.decorators.push(["fn = ", this.decorators.functionCall("decorator", "", ["fn", "props", "container", options]), " || fn;"]);
              },
              // [invokeHelper]
              //
              // On stack, before: hash, inverse, program, params..., ...
              // On stack, after: result of helper invocation
              //
              // Pops off the helper's parameters, invokes the helper,
              // and pushes the helper's return value onto the stack.
              //
              // If the helper is not found, `helperMissing` is called.
              invokeHelper: function invokeHelper(paramSize, name, isSimple) {
                var nonHelper = this.popStack(), helper = this.setupHelper(paramSize, name);
                var possibleFunctionCalls = [];
                if (isSimple) {
                  possibleFunctionCalls.push(helper.name);
                }
                possibleFunctionCalls.push(nonHelper);
                if (!this.options.strict) {
                  possibleFunctionCalls.push(this.aliasable("container.hooks.helperMissing"));
                }
                var functionLookupCode = ["(", this.itemsSeparatedBy(possibleFunctionCalls, "||"), ")"];
                var functionCall = this.source.functionCall(functionLookupCode, "call", helper.callParams);
                this.push(functionCall);
              },
              itemsSeparatedBy: function itemsSeparatedBy(items, separator) {
                var result = [];
                result.push(items[0]);
                for (var i = 1; i < items.length; i++) {
                  result.push(separator, items[i]);
                }
                return result;
              },
              // [invokeKnownHelper]
              //
              // On stack, before: hash, inverse, program, params..., ...
              // On stack, after: result of helper invocation
              //
              // This operation is used when the helper is known to exist,
              // so a `helperMissing` fallback is not required.
              invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
                var helper = this.setupHelper(paramSize, name);
                this.push(this.source.functionCall(helper.name, "call", helper.callParams));
              },
              // [invokeAmbiguous]
              //
              // On stack, before: hash, inverse, program, params..., ...
              // On stack, after: result of disambiguation
              //
              // This operation is used when an expression like `{{foo}}`
              // is provided, but we don't know at compile-time whether it
              // is a helper or a path.
              //
              // This operation emits more code than the other options,
              // and can be avoided by passing the `knownHelpers` and
              // `knownHelpersOnly` flags at compile-time.
              invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
                this.useRegister("helper");
                var nonHelper = this.popStack();
                this.emptyHash();
                var helper = this.setupHelper(0, name, helperCall);
                var helperName = this.lastHelper = this.nameLookup("helpers", name, "helper");
                var lookup = ["(", "(helper = ", helperName, " || ", nonHelper, ")"];
                if (!this.options.strict) {
                  lookup[0] = "(helper = ";
                  lookup.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"));
                }
                this.push(["(", lookup, helper.paramsInit ? ["),(", helper.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", helper.callParams), " : helper))"]);
              },
              // [invokePartial]
              //
              // On stack, before: context, ...
              // On stack after: result of partial invocation
              //
              // This operation pops off a context, invokes a partial with that context,
              // and pushes the result of the invocation back.
              invokePartial: function invokePartial(isDynamic, name, indent) {
                var params = [], options = this.setupParams(name, 1, params);
                if (isDynamic) {
                  name = this.popStack();
                  delete options.name;
                }
                if (indent) {
                  options.indent = JSON.stringify(indent);
                }
                options.helpers = "helpers";
                options.partials = "partials";
                options.decorators = "container.decorators";
                if (!isDynamic) {
                  params.unshift(this.nameLookup("partials", name, "partial"));
                } else {
                  params.unshift(name);
                }
                if (this.options.compat) {
                  options.depths = "depths";
                }
                options = this.objectLiteral(options);
                params.push(options);
                this.push(this.source.functionCall("container.invokePartial", "", params));
              },
              // [assignToHash]
              //
              // On stack, before: value, ..., hash, ...
              // On stack, after: ..., hash, ...
              //
              // Pops a value off the stack and assigns it to the current hash
              assignToHash: function assignToHash(key) {
                var value = this.popStack(), context = void 0, type = void 0, id = void 0;
                if (this.trackIds) {
                  id = this.popStack();
                }
                if (this.stringParams) {
                  type = this.popStack();
                  context = this.popStack();
                }
                var hash = this.hash;
                if (context) {
                  hash.contexts[key] = context;
                }
                if (type) {
                  hash.types[key] = type;
                }
                if (id) {
                  hash.ids[key] = id;
                }
                hash.values[key] = value;
              },
              pushId: function pushId(type, name, child) {
                if (type === "BlockParam") {
                  this.pushStackLiteral("blockParams[" + name[0] + "].path[" + name[1] + "]" + (child ? " + " + JSON.stringify("." + child) : ""));
                } else if (type === "PathExpression") {
                  this.pushString(name);
                } else if (type === "SubExpression") {
                  this.pushStackLiteral("true");
                } else {
                  this.pushStackLiteral("null");
                }
              },
              // HELPERS
              compiler: JavaScriptCompiler,
              compileChildren: function compileChildren(environment, options) {
                var children = environment.children, child = void 0, compiler = void 0;
                for (var i = 0, l = children.length; i < l; i++) {
                  child = children[i];
                  compiler = new this.compiler();
                  var existing = this.matchExistingProgram(child);
                  if (existing == null) {
                    var index = this.context.programs.push("") - 1;
                    child.index = index;
                    child.name = "program" + index;
                    this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
                    this.context.decorators[index] = compiler.decorators;
                    this.context.environments[index] = child;
                    this.useDepths = this.useDepths || compiler.useDepths;
                    this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
                    child.useDepths = this.useDepths;
                    child.useBlockParams = this.useBlockParams;
                  } else {
                    child.index = existing.index;
                    child.name = "program" + existing.index;
                    this.useDepths = this.useDepths || existing.useDepths;
                    this.useBlockParams = this.useBlockParams || existing.useBlockParams;
                  }
                }
              },
              matchExistingProgram: function matchExistingProgram(child) {
                for (var i = 0, len = this.context.environments.length; i < len; i++) {
                  var environment = this.context.environments[i];
                  if (environment && environment.equals(child)) {
                    return environment;
                  }
                }
              },
              programExpression: function programExpression(guid) {
                var child = this.environment.children[guid], programParams = [child.index, "data", child.blockParams];
                if (this.useBlockParams || this.useDepths) {
                  programParams.push("blockParams");
                }
                if (this.useDepths) {
                  programParams.push("depths");
                }
                return "container.program(" + programParams.join(", ") + ")";
              },
              useRegister: function useRegister(name) {
                if (!this.registers[name]) {
                  this.registers[name] = true;
                  this.registers.list.push(name);
                }
              },
              push: function push(expr) {
                if (!(expr instanceof Literal)) {
                  expr = this.source.wrap(expr);
                }
                this.inlineStack.push(expr);
                return expr;
              },
              pushStackLiteral: function pushStackLiteral(item) {
                this.push(new Literal(item));
              },
              pushSource: function pushSource(source) {
                if (this.pendingContent) {
                  this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
                  this.pendingContent = void 0;
                }
                if (source) {
                  this.source.push(source);
                }
              },
              replaceStack: function replaceStack(callback) {
                var prefix = ["("], stack = void 0, createdStack = void 0, usedLiteral = void 0;
                if (!this.isInline()) {
                  throw new _exception2["default"]("replaceStack on non-inline");
                }
                var top = this.popStack(true);
                if (top instanceof Literal) {
                  stack = [top.value];
                  prefix = ["(", stack];
                  usedLiteral = true;
                } else {
                  createdStack = true;
                  var _name = this.incrStack();
                  prefix = ["((", this.push(_name), " = ", top, ")"];
                  stack = this.topStack();
                }
                var item = callback.call(this, stack);
                if (!usedLiteral) {
                  this.popStack();
                }
                if (createdStack) {
                  this.stackSlot--;
                }
                this.push(prefix.concat(item, ")"));
              },
              incrStack: function incrStack() {
                this.stackSlot++;
                if (this.stackSlot > this.stackVars.length) {
                  this.stackVars.push("stack" + this.stackSlot);
                }
                return this.topStackName();
              },
              topStackName: function topStackName() {
                return "stack" + this.stackSlot;
              },
              flushInline: function flushInline() {
                var inlineStack = this.inlineStack;
                this.inlineStack = [];
                for (var i = 0, len = inlineStack.length; i < len; i++) {
                  var entry = inlineStack[i];
                  if (entry instanceof Literal) {
                    this.compileStack.push(entry);
                  } else {
                    var stack = this.incrStack();
                    this.pushSource([stack, " = ", entry, ";"]);
                    this.compileStack.push(stack);
                  }
                }
              },
              isInline: function isInline() {
                return this.inlineStack.length;
              },
              popStack: function popStack(wrapped) {
                var inline = this.isInline(), item = (inline ? this.inlineStack : this.compileStack).pop();
                if (!wrapped && item instanceof Literal) {
                  return item.value;
                } else {
                  if (!inline) {
                    if (!this.stackSlot) {
                      throw new _exception2["default"]("Invalid stack pop");
                    }
                    this.stackSlot--;
                  }
                  return item;
                }
              },
              topStack: function topStack() {
                var stack = this.isInline() ? this.inlineStack : this.compileStack, item = stack[stack.length - 1];
                if (item instanceof Literal) {
                  return item.value;
                } else {
                  return item;
                }
              },
              contextName: function contextName(context) {
                if (this.useDepths && context) {
                  return "depths[" + context + "]";
                } else {
                  return "depth" + context;
                }
              },
              quotedString: function quotedString(str) {
                return this.source.quotedString(str);
              },
              objectLiteral: function objectLiteral(obj) {
                return this.source.objectLiteral(obj);
              },
              aliasable: function aliasable(name) {
                var ret = this.aliases[name];
                if (ret) {
                  ret.referenceCount++;
                  return ret;
                }
                ret = this.aliases[name] = this.source.wrap(name);
                ret.aliasable = true;
                ret.referenceCount = 1;
                return ret;
              },
              setupHelper: function setupHelper(paramSize, name, blockHelper) {
                var params = [], paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
                var foundHelper = this.nameLookup("helpers", name, "helper"), callContext = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})");
                return {
                  params,
                  paramsInit,
                  name: foundHelper,
                  callParams: [callContext].concat(params)
                };
              },
              setupParams: function setupParams(helper, paramSize, params) {
                var options = {}, contexts = [], types = [], ids = [], objectArgs = !params, param = void 0;
                if (objectArgs) {
                  params = [];
                }
                options.name = this.quotedString(helper);
                options.hash = this.popStack();
                if (this.trackIds) {
                  options.hashIds = this.popStack();
                }
                if (this.stringParams) {
                  options.hashTypes = this.popStack();
                  options.hashContexts = this.popStack();
                }
                var inverse = this.popStack(), program = this.popStack();
                if (program || inverse) {
                  options.fn = program || "container.noop";
                  options.inverse = inverse || "container.noop";
                }
                var i = paramSize;
                while (i--) {
                  param = this.popStack();
                  params[i] = param;
                  if (this.trackIds) {
                    ids[i] = this.popStack();
                  }
                  if (this.stringParams) {
                    types[i] = this.popStack();
                    contexts[i] = this.popStack();
                  }
                }
                if (objectArgs) {
                  options.args = this.source.generateArray(params);
                }
                if (this.trackIds) {
                  options.ids = this.source.generateArray(ids);
                }
                if (this.stringParams) {
                  options.types = this.source.generateArray(types);
                  options.contexts = this.source.generateArray(contexts);
                }
                if (this.options.data) {
                  options.data = "data";
                }
                if (this.useBlockParams) {
                  options.blockParams = "blockParams";
                }
                return options;
              },
              setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
                var options = this.setupParams(helper, paramSize, params);
                options.loc = JSON.stringify(this.source.currentLocation);
                options = this.objectLiteral(options);
                if (useRegister) {
                  this.useRegister("options");
                  params.push("options");
                  return ["options=", options];
                } else if (params) {
                  params.push(options);
                  return "";
                } else {
                  return options;
                }
              }
            };
            (function() {
              var reservedWords = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" ");
              var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
              for (var i = 0, l = reservedWords.length; i < l; i++) {
                compilerWords[reservedWords[i]] = true;
              }
            })();
            JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
              return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
            };
            function strictLookup(requireTerminal, compiler, parts, startPartIndex, type) {
              var stack = compiler.popStack(), len = parts.length;
              if (requireTerminal) {
                len--;
              }
              for (var i = startPartIndex; i < len; i++) {
                stack = compiler.nameLookup(stack, parts[i], type);
              }
              if (requireTerminal) {
                return [compiler.aliasable("container.strict"), "(", stack, ", ", compiler.quotedString(parts[len]), ", ", JSON.stringify(compiler.source.currentLocation), " )"];
              } else {
                return stack;
              }
            }
            exports2["default"] = JavaScriptCompiler;
            module2.exports = exports2["default"];
          }),
          /* 91 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            "use strict";
            var _Object$keys = __webpack_require__(60)["default"];
            exports2.__esModule = true;
            var _utils = __webpack_require__(5);
            var SourceNode = void 0;
            try {
              if (false) {
                var SourceMap = null;
                SourceNode = SourceMap.SourceNode;
              }
            } catch (err) {
            }
            if (!SourceNode) {
              SourceNode = function(line, column, srcFile, chunks) {
                this.src = "";
                if (chunks) {
                  this.add(chunks);
                }
              };
              SourceNode.prototype = {
                add: function add(chunks) {
                  if (_utils.isArray(chunks)) {
                    chunks = chunks.join("");
                  }
                  this.src += chunks;
                },
                prepend: function prepend(chunks) {
                  if (_utils.isArray(chunks)) {
                    chunks = chunks.join("");
                  }
                  this.src = chunks + this.src;
                },
                toStringWithSourceMap: function toStringWithSourceMap() {
                  return { code: this.toString() };
                },
                toString: function toString() {
                  return this.src;
                }
              };
            }
            function castChunk(chunk, codeGen, loc) {
              if (_utils.isArray(chunk)) {
                var ret = [];
                for (var i = 0, len = chunk.length; i < len; i++) {
                  ret.push(codeGen.wrap(chunk[i], loc));
                }
                return ret;
              } else if (typeof chunk === "boolean" || typeof chunk === "number") {
                return chunk + "";
              }
              return chunk;
            }
            function CodeGen(srcFile) {
              this.srcFile = srcFile;
              this.source = [];
            }
            CodeGen.prototype = {
              isEmpty: function isEmpty() {
                return !this.source.length;
              },
              prepend: function prepend(source, loc) {
                this.source.unshift(this.wrap(source, loc));
              },
              push: function push(source, loc) {
                this.source.push(this.wrap(source, loc));
              },
              merge: function merge() {
                var source = this.empty();
                this.each(function(line) {
                  source.add(["  ", line, "\n"]);
                });
                return source;
              },
              each: function each(iter) {
                for (var i = 0, len = this.source.length; i < len; i++) {
                  iter(this.source[i]);
                }
              },
              empty: function empty() {
                var loc = this.currentLocation || { start: {} };
                return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
              },
              wrap: function wrap(chunk) {
                var loc = arguments.length <= 1 || arguments[1] === void 0 ? this.currentLocation || { start: {} } : arguments[1];
                if (chunk instanceof SourceNode) {
                  return chunk;
                }
                chunk = castChunk(chunk, this, loc);
                return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
              },
              functionCall: function functionCall(fn, type, params) {
                params = this.generateList(params);
                return this.wrap([fn, type ? "." + type + "(" : "(", params, ")"]);
              },
              quotedString: function quotedString(str) {
                return '"' + (str + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
              },
              objectLiteral: function objectLiteral(obj) {
                var _this = this;
                var pairs = [];
                _Object$keys(obj).forEach(function(key) {
                  var value = castChunk(obj[key], _this);
                  if (value !== "undefined") {
                    pairs.push([_this.quotedString(key), ":", value]);
                  }
                });
                var ret = this.generateList(pairs);
                ret.prepend("{");
                ret.add("}");
                return ret;
              },
              generateList: function generateList(entries) {
                var ret = this.empty();
                for (var i = 0, len = entries.length; i < len; i++) {
                  if (i) {
                    ret.add(",");
                  }
                  ret.add(castChunk(entries[i], this));
                }
                return ret;
              },
              generateArray: function generateArray(entries) {
                var ret = this.generateList(entries);
                ret.prepend("[");
                ret.add("]");
                return ret;
              }
            };
            exports2["default"] = CodeGen;
            module2.exports = exports2["default"];
          })
          /******/
        ])
      );
    });
  }
});

// src/shared.ts
var import_handlebars = __toESM(require_handlebars(), 1);
var VERSION = "0.3.1";
var DEFAULT_SYSTEM_PROMPT = `You are a structured tracker extraction assistant. Analyze the conversation and return only tracker data that matches the requested schema. Do not roleplay, continue the scene, explain yourself, or include markdown unless the tracker format instructions explicitly ask for it. Preserve continuity with previous tracker snapshots, but update the tracker from the newest chat evidence.`;
var DEFAULT_EXTRACTION_PROMPT = `Create a complete tracker update for the target message. Fill every required field. If a field is not explicitly stated, infer a short, reasonable value from the conversation context. Keep values concise and concrete.`;
var DEFAULT_JSON_PROMPT_TEMPLATE = [
  "Return only one valid JSON object.",
  "Do not include markdown fences, commentary, or prose outside JSON.",
  "The object must conform to this JSON Schema:",
  "{{schema}}",
  "Example shape:",
  "{{example_response}}"
].join("\n\n");
var DEFAULT_XML_PROMPT_TEMPLATE = [
  "Return tracker data as valid JSON even if the model was asked for XML-style structure.",
  "Use this schema as the authority:",
  "{{schema}}"
].join("\n\n");
var DEFAULT_TOON_PROMPT_TEMPLATE = [
  "Return tracker data as valid JSON. Keep values compact like TOON, but the response must still parse as JSON.",
  "Use this schema as the authority:",
  "{{schema}}"
].join("\n\n");
var DEFAULT_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "SceneTracker",
  type: "object",
  properties: {
    time: {
      type: "string",
      description: "Current in-scene time, including date if known."
    },
    location: {
      type: "string",
      description: "Specific current location."
    },
    situation: {
      type: "string",
      description: "One sentence summary of what is currently happening."
    },
    mood: {
      type: "string",
      description: "Dominant emotional tone."
    },
    charactersPresent: {
      type: "array",
      description: "Names of characters currently present.",
      items: { type: "string" }
    },
    characters: {
      type: "array",
      description: "Visible state for each present character.",
      "x-tracktor-idKey": "name",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          appearance: { type: "string" },
          outfit: { type: "string" },
          posture: { type: "string" },
          notableState: { type: "string" }
        },
        required: ["name", "appearance", "outfit", "posture", "notableState"]
      }
    },
    openThreads: {
      type: "array",
      description: "Unresolved goals, tensions, promises, clues, or pending actions.",
      items: { type: "string" }
    }
  },
  required: ["time", "location", "situation", "mood", "charactersPresent", "characters", "openThreads"]
};
var DEFAULT_TEMPLATE_HTML = `
<section class="tracktor-card">
  <div class="tracktor-grid">
    <div><strong>Time</strong><span>{{data.time}}</span></div>
    <div><strong>Location</strong><span>{{data.location}}</span></div>
    <div><strong>Mood</strong><span>{{data.mood}}</span></div>
  </div>
  <p class="tracktor-situation">{{data.situation}}</p>
  <details>
    <summary>Details</summary>
    <p><strong>Present:</strong> {{join data.charactersPresent ', '}}</p>
    {{#each data.characters}}
      <div class="tracktor-character">
        <strong>{{name}}</strong>
        <span>{{appearance}}</span>
        <span>{{outfit}}</span>
        <span>{{posture}}</span>
        <span>{{notableState}}</span>
      </div>
    {{/each}}
    <p><strong>Open threads:</strong> {{join data.openThreads '; '}}</p>
  </details>
</section>
`.trim();
var defaultSchemaPresets = {
  scene: normalizeSchemaPreset({
    key: "scene",
    id: "scene",
    name: "Scene Tracker",
    description: "General roleplay scene state.",
    jsonSchema: DEFAULT_SCHEMA,
    schema: DEFAULT_SCHEMA,
    renderTemplate: DEFAULT_TEMPLATE_HTML,
    templateHtml: DEFAULT_TEMPLATE_HTML,
    systemPrompt: DEFAULT_SYSTEM_PROMPT,
    extractionPrompt: DEFAULT_EXTRACTION_PROMPT,
    trackerInstructionPrompt: DEFAULT_EXTRACTION_PROMPT,
    jsonPromptTemplate: DEFAULT_JSON_PROMPT_TEMPLATE,
    xmlPromptTemplate: DEFAULT_XML_PROMPT_TEMPLATE,
    toonPromptTemplate: DEFAULT_TOON_PROMPT_TEMPLATE,
    templateEngine: "handlebars"
  }, "scene")
};
var defaultSnapshotTransformPresets = {
  default_json: {
    key: "default_json",
    name: "Default JSON",
    input: "pretty_json",
    regexPattern: "",
    regexFlags: "",
    replacement: "",
    codeFenceLang: "json",
    wrapInCodeFence: true
  },
  minimal: {
    key: "minimal",
    name: "Minimal Lines",
    input: "top_level_lines",
    regexPattern: "",
    regexFlags: "",
    replacement: "",
    codeFenceLang: "",
    wrapInCodeFence: false
  },
  toon: {
    key: "toon",
    name: "TOON",
    input: "toon",
    regexPattern: "",
    regexFlags: "",
    replacement: "",
    codeFenceLang: "toon",
    wrapInCodeFence: true
  }
};
var defaultSettings = {
  version: VERSION,
  schemaPresets: structuredClone(defaultSchemaPresets),
  activeTrackerPresetKey: "scene",
  activeSchemaPresetKey: "scene",
  activeSchemaId: "scene",
  trackerConnectionId: null,
  trackerPresetId: null,
  autoMode: "none",
  sequentialGeneration: false,
  sequentialPartGeneration: false,
  maxResponseTokens: 4096,
  skipFirstMessages: 0,
  trackerContextMessageLimit: 12,
  includeLastMessages: 12,
  includeLastTrackers: 1,
  includeCharacterCardInTrackerPrompt: false,
  trackerConversationRoleMode: "preserve",
  structuredOutputMode: "json_prompt",
  generationMode: "json",
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  extractionPrompt: DEFAULT_EXTRACTION_PROMPT,
  trackerInstructionPrompt: DEFAULT_EXTRACTION_PROMPT,
  jsonPromptTemplate: DEFAULT_JSON_PROMPT_TEMPLATE,
  xmlPromptTemplate: DEFAULT_XML_PROMPT_TEMPLATE,
  toonPromptTemplate: DEFAULT_TOON_PROMPT_TEMPLATE,
  trackerSystemPromptSource: "saved_tracker_prompt",
  savedTrackerPromptId: null,
  injectTrackerSnapshots: true,
  trackerSnapshotCount: 1,
  snapshotRole: "system",
  injectAsVirtualCharacter: false,
  snapshotHeader: "Recent tracker snapshot",
  snapshotTransformPresetKey: "default_json",
  snapshotTransformPresets: structuredClone(defaultSnapshotTransformPresets),
  injection: {
    enabled: true,
    includeLastTrackers: 1,
    role: "system",
    header: "Recent tracker snapshot"
  },
  chatVariableExport: {
    enabled: true,
    key: "tracktor"
  },
  trackerWorldBookMode: "include_all",
  allowedWorldBookIds: [],
  allowedWorldBookEntryIds: [],
  debugLogging: false,
  templateEngine: "handlebars",
  trackerPlacement: "message_bottom"
};
function deepMergeSettings(input, schemaPresets) {
  const saved = isPlainObject(input) ? input : {};
  const merged = structuredClone(defaultSettings);
  assignKnown(merged, saved, [
    "version",
    "trackerConnectionId",
    "trackerPresetId",
    "maxResponseTokens",
    "skipFirstMessages",
    "trackerContextMessageLimit",
    "includeLastMessages",
    "includeLastTrackers",
    "includeCharacterCardInTrackerPrompt",
    "systemPrompt",
    "extractionPrompt",
    "trackerInstructionPrompt",
    "jsonPromptTemplate",
    "xmlPromptTemplate",
    "toonPromptTemplate",
    "trackerSystemPromptSource",
    "savedTrackerPromptId",
    "injectTrackerSnapshots",
    "trackerSnapshotCount",
    "injectAsVirtualCharacter",
    "snapshotHeader",
    "debugLogging"
  ]);
  merged.schemaPresets = sanitizeSchemaPresetMap(schemaPresets ?? saved.schemaPresets, merged);
  merged.activeTrackerPresetKey = sanitizeId(
    readString(saved.activeTrackerPresetKey) || readString(saved.activeSchemaPresetKey) || readString(saved.activeSchemaId) || merged.activeTrackerPresetKey
  ) || "scene";
  merged.activeSchemaPresetKey = merged.activeTrackerPresetKey;
  merged.activeSchemaId = merged.activeTrackerPresetKey;
  merged.autoMode = normalizeAutoMode(saved.autoMode);
  merged.sequentialGeneration = readBool(saved.sequentialGeneration, readBool(saved.sequentialPartGeneration, merged.sequentialGeneration));
  merged.sequentialPartGeneration = merged.sequentialGeneration;
  merged.structuredOutputMode = normalizeStructuredOutputMode(saved.structuredOutputMode ?? saved.generationMode);
  merged.generationMode = merged.structuredOutputMode === "native_json_schema" ? "native_json" : "json";
  merged.trackerConversationRoleMode = normalizeEnum(saved.trackerConversationRoleMode, ["preserve", "all_assistant", "plain_transcript"], "preserve");
  merged.templateEngine = normalizeTemplateEngine(saved.templateEngine);
  merged.trackerPlacement = normalizeEnum(saved.trackerPlacement, ["message_bottom", "message_top", "chat_top_pinned"], "message_bottom");
  merged.snapshotRole = normalizeEnum(saved.snapshotRole, ["system", "user", "assistant"], "system");
  merged.trackerWorldBookMode = normalizeEnum(saved.trackerWorldBookMode, ["include_all", "exclude_all", "allowlist"], "include_all");
  merged.snapshotTransformPresetKey = normalizeEnum(saved.snapshotTransformPresetKey, ["default_json", "minimal", "toon", "custom"], "default_json");
  merged.allowedWorldBookIds = sanitizeStringArray(saved.allowedWorldBookIds);
  merged.allowedWorldBookEntryIds = sanitizeStringArray(saved.allowedWorldBookEntryIds);
  if (saved.trackerContextMessageLimit === void 0 && saved.includeLastMessages !== void 0) {
    merged.trackerContextMessageLimit = saved.includeLastMessages;
  }
  if (saved.trackerInstructionPrompt === void 0 && typeof saved.extractionPrompt === "string") {
    merged.trackerInstructionPrompt = saved.extractionPrompt;
  }
  if (isPlainObject(saved.snapshotTransformPresets)) {
    merged.snapshotTransformPresets = {
      ...structuredClone(defaultSnapshotTransformPresets),
      ...sanitizeSnapshotTransformPresets(saved.snapshotTransformPresets)
    };
  }
  if (isPlainObject(saved.injection)) {
    const injection = saved.injection;
    merged.injectTrackerSnapshots = readBool(injection.enabled, merged.injectTrackerSnapshots);
    merged.trackerSnapshotCount = sanitizeInteger(injection.includeLastTrackers, merged.trackerSnapshotCount, 0, 25);
    merged.snapshotRole = normalizeEnum(injection.role, ["system", "user", "assistant"], merged.snapshotRole);
    merged.snapshotHeader = readString(injection.header) || merged.snapshotHeader;
  }
  if (isPlainObject(saved.chatVariableExport)) {
    assignKnown(merged.chatVariableExport, saved.chatVariableExport, ["enabled", "key"]);
  }
  merged.maxResponseTokens = sanitizeInteger(merged.maxResponseTokens, 4096, 1, 64e3);
  merged.skipFirstMessages = sanitizeInteger(merged.skipFirstMessages, 0, 0, 1e3);
  merged.trackerContextMessageLimit = sanitizeInteger(merged.trackerContextMessageLimit, merged.includeLastMessages, 0, 400);
  merged.includeLastMessages = merged.trackerContextMessageLimit;
  merged.includeLastTrackers = sanitizeInteger(merged.includeLastTrackers, 1, 0, 25);
  merged.trackerSnapshotCount = sanitizeInteger(merged.trackerSnapshotCount, 1, 0, 25);
  merged.injection = {
    enabled: merged.injectTrackerSnapshots,
    includeLastTrackers: merged.trackerSnapshotCount,
    role: merged.snapshotRole,
    header: merged.snapshotHeader
  };
  merged.chatVariableExport.enabled = readBool(merged.chatVariableExport.enabled, true);
  merged.chatVariableExport.key = sanitizeVariableKey(String(merged.chatVariableExport.key ?? "tracktor")) || "tracktor";
  merged.trackerConnectionId = normalizeNullableString(merged.trackerConnectionId);
  merged.trackerPresetId = normalizeNullableString(merged.trackerPresetId);
  merged.savedTrackerPromptId = normalizeNullableString(merged.savedTrackerPromptId);
  merged.trackerInstructionPrompt = merged.trackerInstructionPrompt || merged.extractionPrompt || DEFAULT_EXTRACTION_PROMPT;
  merged.extractionPrompt = merged.trackerInstructionPrompt;
  if (!merged.schemaPresets[merged.activeTrackerPresetKey]) {
    merged.activeTrackerPresetKey = Object.keys(merged.schemaPresets)[0] ?? "scene";
    merged.activeSchemaPresetKey = merged.activeTrackerPresetKey;
    merged.activeSchemaId = merged.activeTrackerPresetKey;
  }
  if (!merged.schemaPresets[merged.activeTrackerPresetKey]) {
    merged.schemaPresets = structuredClone(defaultSchemaPresets);
    merged.activeTrackerPresetKey = "scene";
    merged.activeSchemaPresetKey = "scene";
    merged.activeSchemaId = "scene";
  }
  return merged;
}
function sanitizeSchemaPresetMap(input, promptDefaults = defaultSettings) {
  if (!isPlainObject(input)) return structuredClone(defaultSchemaPresets);
  const out = {};
  for (const [fallbackKey, value] of Object.entries(input)) {
    if (!isPlainObject(value)) continue;
    const preset = normalizeSchemaPreset(value, fallbackKey, promptDefaults);
    if (preset) out[preset.key] = preset;
  }
  return Object.keys(out).length > 0 ? out : structuredClone(defaultSchemaPresets);
}
function normalizeSchemaPreset(input, fallbackKey = "schema", promptDefaults = {}) {
  const value = isPlainObject(input) ? input : {};
  const key = sanitizeId(readString(value.key) || readString(value.id) || fallbackKey) || sanitizeId(fallbackKey) || "schema";
  const schema = isPlainObject(value.jsonSchema) ? value.jsonSchema : isPlainObject(value.schema) ? value.schema : DEFAULT_SCHEMA;
  const template = readString(value.renderTemplate) || readString(value.templateHtml) || DEFAULT_TEMPLATE_HTML;
  const systemPrompt = readString(value.systemPrompt) || readString(promptDefaults.systemPrompt) || DEFAULT_SYSTEM_PROMPT;
  const trackerInstructionPrompt = readString(value.trackerInstructionPrompt) || readString(value.extractionPrompt) || readString(promptDefaults.trackerInstructionPrompt) || readString(promptDefaults.extractionPrompt) || DEFAULT_EXTRACTION_PROMPT;
  const now = Date.now();
  const preset = {
    id: key,
    key,
    name: readString(value.name) || key,
    description: readString(value.description) || void 0,
    schema,
    jsonSchema: schema,
    templateHtml: template,
    renderTemplate: template,
    systemPrompt,
    extractionPrompt: trackerInstructionPrompt,
    trackerInstructionPrompt,
    jsonPromptTemplate: readString(value.jsonPromptTemplate) || readString(promptDefaults.jsonPromptTemplate) || DEFAULT_JSON_PROMPT_TEMPLATE,
    xmlPromptTemplate: readString(value.xmlPromptTemplate) || readString(promptDefaults.xmlPromptTemplate) || DEFAULT_XML_PROMPT_TEMPLATE,
    toonPromptTemplate: readString(value.toonPromptTemplate) || readString(promptDefaults.toonPromptTemplate) || DEFAULT_TOON_PROMPT_TEMPLATE,
    templateEngine: normalizeTemplateEngine(value.templateEngine ?? promptDefaults.templateEngine),
    createdAt: sanitizeInteger(value.createdAt, now, 0, Number.MAX_SAFE_INTEGER),
    updatedAt: sanitizeInteger(value.updatedAt, now, 0, Number.MAX_SAFE_INTEGER)
  };
  const outputMode = normalizeOptionalStructuredOutputMode(value.structuredOutputMode);
  if (outputMode) preset.structuredOutputMode = outputMode;
  return preset;
}
function schemaToExample(schema) {
  if (!isPlainObject(schema)) return null;
  if ("example" in schema) return schema.example;
  if ("default" in schema) return schema.default;
  switch (schema.type) {
    case "object": {
      const out = {};
      const properties = isPlainObject(schema.properties) ? schema.properties : {};
      for (const [key, value] of Object.entries(properties)) out[key] = schemaToExample(value);
      return out;
    }
    case "array":
      return [schemaToExample(schema.items)];
    case "number":
    case "integer":
      return 0;
    case "boolean":
      return false;
    case "string":
      return typeof schema.description === "string" ? schema.description : "string";
    default:
      return null;
  }
}
function renderTrackerTemplate(templateHtml, data, options = {}) {
  const sanitizedTemplate = stripDangerousHtml(templateHtml);
  const templateEngine = options.templateEngine ?? "handlebars";
  try {
    const rendered = templateEngine === "simple" ? renderBuiltinTemplate(sanitizedTemplate, data, data) : renderHandlebarsTemplate(sanitizedTemplate, data, options.onWarning);
    return stripDangerousHtml(rendered);
  } catch (error) {
    options.onWarning?.(`Template rendering failed: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}
function assertTrackerTemplateRenders(templateHtml, data, options = {}) {
  try {
    return renderTrackerTemplate(templateHtml, data, options);
  } catch (error) {
    const label = options.label ? `${options.label}: ` : "";
    throw new Error(`${label}Template render failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
function getTemplateCompatibilityWarnings(templateHtml) {
  const warnings = [];
  if (/{{{\s*[\s\S]*?}}}/.test(templateHtml) || /{{&\s*[^}]+}}/.test(templateHtml)) {
    warnings.push("Template uses unescaped Handlebars output. Tracktor sanitizes rendered HTML, but normal {{...}} output is safer.");
  }
  return warnings;
}
function safePreview(value, max = 160) {
  const compact = value.replace(/\s+/g, " ").trim();
  if (compact.length <= max) return compact;
  return `${compact.slice(0, Math.max(0, max - 1))}...`;
}
function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function stripDangerousHtml(html) {
  return html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "").replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "").replace(/<iframe\b[^>]*\/?>/gi, "").replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "").replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "").replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "").replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, "").replace(/\s(href|src)\s*=\s*javascript:[^\s>]+/gi, "");
}
function sanitizeId(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 64);
}
function sanitizeVariableKey(value) {
  return value.trim().replace(/[^a-zA-Z0-9_.-]+/g, "_").slice(0, 80);
}
function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function sanitizeSnapshotTransformPresets(input) {
  const out = {};
  for (const [key, raw] of Object.entries(input)) {
    if (!isPlainObject(raw)) continue;
    const presetKey = normalizeEnum(raw.key ?? key, ["default_json", "minimal", "toon", "custom"], "custom");
    out[key] = {
      key: presetKey,
      name: readString(raw.name) || key,
      input: normalizeEnum(raw.input, ["pretty_json", "top_level_lines", "toon"], "pretty_json"),
      regexPattern: readString(raw.regexPattern),
      regexFlags: readString(raw.regexFlags),
      replacement: readString(raw.replacement),
      codeFenceLang: readString(raw.codeFenceLang),
      wrapInCodeFence: readBool(raw.wrapInCodeFence, presetKey !== "minimal")
    };
  }
  return out;
}
function normalizeAutoMode(value) {
  if (value === "off") return "none";
  if (value === "assistant_message") return "responses";
  if (value === "user_message") return "inputs";
  return normalizeEnum(value, ["none", "responses", "inputs", "both"], "none");
}
function normalizeStructuredOutputMode(value) {
  if (value === "native_json") return "native_json_schema";
  if (value === "json") return "json_prompt";
  return normalizeEnum(value, ["native_json_schema", "json_prompt", "xml_prompt", "toon_prompt"], "json_prompt");
}
function normalizeTemplateEngine(value) {
  return normalizeEnum(value, ["handlebars", "simple"], "handlebars");
}
function normalizeOptionalStructuredOutputMode(value) {
  if (value === void 0 || value === null || value === "") return void 0;
  return normalizeStructuredOutputMode(value);
}
function normalizeEnum(value, allowed, fallback) {
  return typeof value === "string" && allowed.includes(value) ? value : fallback;
}
function normalizeNullableString(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}
function sanitizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => typeof item === "string" && item.trim() ? [item.trim()] : []);
}
function readString(value) {
  return typeof value === "string" ? value : "";
}
function readBool(value, fallback) {
  return typeof value === "boolean" ? value : fallback;
}
function assignKnown(target, source, keys) {
  const writable = target;
  for (const key of keys) {
    if (source[key] !== void 0) writable[key] = source[key];
  }
}
function sanitizeInteger(value, fallback, min, max) {
  const parsed = typeof value === "number" ? value : Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(parsed)));
}
var handlebarsRuntime = createHandlebarsRuntime();
function createHandlebarsRuntime() {
  try {
    const runtime = import_handlebars.default.create();
    runtime.registerHelper("join", (value, separator) => {
      if (!Array.isArray(value)) return "";
      const delimiter = typeof separator === "string" ? separator : ", ";
      return value.map((item) => {
        if (item == null) return "";
        return typeof item === "object" ? JSON.stringify(item) : String(item);
      }).join(delimiter);
    });
    runtime.registerHelper("json", (value) => JSON.stringify(value, null, 2));
    return runtime;
  } catch {
    return null;
  }
}
function renderHandlebarsTemplate(template, data, onWarning) {
  if (!handlebarsRuntime) {
    onWarning?.("Handlebars runtime was unavailable; falling back to the simple template renderer.");
    return renderBuiltinTemplate(template, data, data);
  }
  const compiled = handlebarsRuntime.compile(template, {
    noEscape: false,
    strict: false
  });
  const context = isPlainObject(data) ? { ...data, data } : { data };
  return compiled(context, {
    allowProtoMethodsByDefault: false,
    allowProtoPropertiesByDefault: false
  });
}
function renderBuiltinTemplate(template, scope, rootData) {
  return processTemplate(template, scope, rootData, 0);
}
var MAX_TEMPLATE_DEPTH = 32;
function processTemplate(template, scope, rootData, depth) {
  if (depth > MAX_TEMPLATE_DEPTH) return "<!-- template depth exceeded -->";
  let result = "";
  let pos = 0;
  while (pos < template.length) {
    const tagStart = template.indexOf("{{", pos);
    if (tagStart === -1) {
      result += template.slice(pos);
      break;
    }
    result += template.slice(pos, tagStart);
    if (template[tagStart + 2] === "{") {
      const tripleEnd = template.indexOf("}}}", tagStart + 3);
      if (tripleEnd === -1) {
        result += "{{{";
        pos = tagStart + 3;
        continue;
      }
      const inner = template.slice(tagStart + 3, tripleEnd).trim();
      const value = resolveTemplatePath(inner, scope, rootData);
      result += String(value ?? "");
      pos = tripleEnd + 3;
      continue;
    }
    const tagEnd = template.indexOf("}}", tagStart + 2);
    if (tagEnd === -1) {
      result += template.slice(tagStart);
      break;
    }
    const tagContent = template.slice(tagStart + 2, tagEnd).trim();
    pos = tagEnd + 2;
    const blockMatch = tagContent.match(/^#(each|if|unless)\s+(.+)$/);
    if (blockMatch) {
      const [, blockType, blockPath] = blockMatch;
      const { body, elseBody, endPos } = findBlockEnd(template, pos, blockType);
      pos = endPos;
      if (blockType === "each") {
        const items = resolveTemplatePath(blockPath.trim(), scope, rootData);
        if (Array.isArray(items)) {
          result += items.map((item) => processTemplate(body, item, rootData, depth + 1)).join("");
        } else if (elseBody !== void 0) {
          result += processTemplate(elseBody, scope, rootData, depth + 1);
        }
      } else if (blockType === "if") {
        const value = resolveTemplatePath(blockPath.trim(), scope, rootData);
        if (isTruthy(value)) {
          result += processTemplate(body, scope, rootData, depth + 1);
        } else if (elseBody !== void 0) {
          result += processTemplate(elseBody, scope, rootData, depth + 1);
        }
      } else if (blockType === "unless") {
        const value = resolveTemplatePath(blockPath.trim(), scope, rootData);
        if (!isTruthy(value)) {
          result += processTemplate(body, scope, rootData, depth + 1);
        } else if (elseBody !== void 0) {
          result += processTemplate(elseBody, scope, rootData, depth + 1);
        }
      }
      continue;
    }
    const joinMatch = tagContent.match(/^join\s+(\S+)\s+(['"])(.*?)\2$/);
    if (joinMatch) {
      const value = resolveTemplatePath(joinMatch[1].trim(), scope, rootData);
      if (Array.isArray(value)) {
        result += escapeHtml(value.map((item) => typeof item === "object" ? JSON.stringify(item) : String(item)).join(joinMatch[3]));
      }
      continue;
    }
    const jsonMatch = tagContent.match(/^json\s+(.+)$/);
    if (jsonMatch) {
      const value = resolveTemplatePath(jsonMatch[1].trim(), scope, rootData);
      result += escapeHtml(JSON.stringify(value, null, 2));
      continue;
    }
    if (/^[a-zA-Z0-9_.@-]+$/.test(tagContent) || tagContent === "this") {
      result += escapeHtml(resolveTemplatePath(tagContent, scope, rootData));
      continue;
    }
    result += `{{${tagContent}}}`;
  }
  return result;
}
function findBlockEnd(template, startPos, blockType) {
  const openTag = `{{#${blockType}`;
  const closeTag = `{{/${blockType}}}`;
  const elseTag = "{{else}}";
  let depth = 1;
  let pos = startPos;
  let elsePos;
  while (pos < template.length && depth > 0) {
    const nextOpen = template.indexOf(openTag, pos);
    const nextClose = template.indexOf(closeTag, pos);
    const nextElse = depth === 1 ? template.indexOf(elseTag, pos) : -1;
    if (nextClose === -1) {
      return { body: template.slice(startPos), elseBody: void 0, endPos: template.length };
    }
    if (nextElse !== -1 && (nextOpen === -1 || nextElse < nextOpen) && nextElse < nextClose && elsePos === void 0) {
      elsePos = nextElse;
    }
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      pos = nextOpen + openTag.length;
      continue;
    }
    depth -= 1;
    if (depth === 0) {
      const endPos = nextClose + closeTag.length;
      if (elsePos !== void 0) {
        return {
          body: template.slice(startPos, elsePos),
          elseBody: template.slice(elsePos + elseTag.length, nextClose),
          endPos
        };
      }
      return {
        body: template.slice(startPos, nextClose),
        elseBody: void 0,
        endPos
      };
    }
    pos = nextClose + closeTag.length;
  }
  return { body: template.slice(startPos), elseBody: void 0, endPos: template.length };
}
function isTruthy(value) {
  if (value == null) return false;
  if (value === false) return false;
  if (value === 0) return false;
  if (value === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}
function resolveTemplatePath(path, scope, rootData) {
  if (path === "this") return scope;
  if (path === "data") return rootData;
  const parts = path.split(".").filter(Boolean);
  let current;
  if (parts[0] === "data") {
    current = rootData;
    parts.shift();
  } else if (parts[0] === "this") {
    current = scope;
    parts.shift();
  } else {
    current = scope;
  }
  for (const part of parts) {
    if (current == null) return "";
    if (Array.isArray(current)) {
      const index = Number.parseInt(part, 10);
      current = Number.isFinite(index) ? current[index] : void 0;
      continue;
    }
    if (!isPlainObject(current)) return "";
    current = current[part];
  }
  return current ?? "";
}

// src/frontend.ts
var state;
var roots = [];
var ctxRef;
var lastKnownChatId = null;
var widgetCleanups = /* @__PURE__ */ new Map();
var pinnedHudElement = null;
var pinnedHudCleanup = null;
var widgetTopObserver = null;
var activeView = "current";
var presetDraftDirty = false;
function setup(ctx) {
  ctxRef = ctx;
  const removeStyle = ctx.dom.addStyle(STYLES);
  const placement = createPlacement(ctx);
  const settingsRoot = tryCreateSettingsRoot(ctx);
  roots = uniqueRoots([placement.root, settingsRoot].filter((value) => !!value));
  roots.forEach((root) => root.classList.add("tracktor-root"));
  render();
  const openAction = ctx.ui?.registerInputBarAction?.({
    id: "open-tracktor",
    label: "Open Tracktor",
    enabled: true,
    iconSvg: TRACKTOR_SMALL_ICON
  });
  const unbindOpenAction = openAction?.onClick(() => {
    placement.activate();
    sendBackend({ type: "refresh_state" });
  });
  const generateAction = ctx.ui?.registerInputBarAction?.({
    id: "generate-tracktor-tracker",
    label: "Generate Tracker",
    enabled: false,
    iconSvg: TRACKTOR_SMALL_ICON
  });
  const unbindGenerateAction = generateAction?.onClick(() => {
    sendBackend({ type: "generate_tracker" });
  });
  const toggleInjectionAction = ctx.ui?.registerInputBarAction?.({
    id: "toggle-tracktor-injection",
    label: "Toggle Tracker Injection",
    enabled: true,
    iconSvg: TRACKTOR_SMALL_ICON
  });
  const unbindToggleInjectionAction = toggleInjectionAction?.onClick(() => {
    sendBackend({ type: "toggle_injection" });
  });
  let domToolbarActionElement = null;
  let domToolbarActionObserver = null;
  const injectToolbarAction = () => {
    if (domToolbarActionElement && document.body.contains(domToolbarActionElement)) return;
    const sendButton = document.querySelector('button[aria-label*="Send" i], button[title*="Send" i], button[type="submit"], [data-testid*="send" i], button svg path[d*="M2"]')?.closest("button");
    if (sendButton && sendButton.parentElement) {
      const btn = document.createElement("button");
      btn.className = "tracktor-dom-toolbar-btn";
      btn.type = "button";
      btn.addEventListener("click", (event) => {
        const action = btn.getAttribute("data-action");
        if (action === "generate_tracker") {
          sendBackend({ type: "generate_tracker" });
        } else if (action === "cancel_job") {
          sendBackend({ type: "cancel_job", jobId: btn.getAttribute("data-job-id") ?? void 0 });
        }
      });
      sendButton.parentElement.insertBefore(btn, sendButton);
      domToolbarActionElement = btn;
    }
  };
  const renderDomToolbarAction = () => {
    if (!domToolbarActionObserver) {
      domToolbarActionObserver = new MutationObserver(() => injectToolbarAction());
      domToolbarActionObserver.observe(document.body, { childList: true, subtree: true });
    }
    injectToolbarAction();
    if (domToolbarActionElement) {
      const activeJob = state?.jobs?.find((j) => j.status === "running" && j.chatId === state?.activeChat?.id);
      if (activeJob) {
        const progress = activeJob.totalParts ? ` (${activeJob.currentPart}/${activeJob.totalParts})` : "";
        domToolbarActionElement.classList.add("tracktor-dom-busy");
        domToolbarActionElement.setAttribute("data-action", "cancel_job");
        domToolbarActionElement.setAttribute("data-job-id", activeJob.id);
        domToolbarActionElement.innerHTML = `${ICON_STOP}<span class="tracktor-dom-progress-text">${escapeHtml(activeJob.label)}${progress}</span>`;
        domToolbarActionElement.title = `Stop ${activeJob.label}`;
      } else {
        domToolbarActionElement.classList.remove("tracktor-dom-busy");
        domToolbarActionElement.setAttribute("data-action", "generate_tracker");
        domToolbarActionElement.removeAttribute("data-job-id");
        domToolbarActionElement.innerHTML = TRACKTOR_SMALL_ICON;
        domToolbarActionElement.title = "Generate Latest Tracker";
      }
    }
  };
  const unbindBackend = ctx.onBackendMessage((payload) => {
    if (payload?.type === "state") {
      state = payload.state;
      lastKnownChatId = state?.activeChat?.id ?? lastKnownChatId;
      placement.setBadge(state?.activeChat?.trackers.length ? String(state.activeChat.trackers.length) : null);
      if (!(presetDraftDirty && activeView === "preset")) render();
      renderMessageWidgets();
      renderPinnedHud();
      renderDomToolbarAction();
      generateAction?.setEnabled(!!state?.activeChat && !state.busy);
    } else if (payload?.type === "diagnostic") {
      if (!state) return;
      state.diagnostics = [String(payload.message ?? "Diagnostic"), ...state.diagnostics ?? []].slice(0, 12);
      render();
    } else if (payload?.type === "job_started" || payload?.type === "job_progress" || payload?.type === "job_finished" || payload?.type === "job_failed") {
      sendBackend({ type: "refresh_state" });
    }
  });
  const unbindActivate = placement.onActivate(() => {
    sendBackend({ type: "refresh_state" });
  });
  const eventCleanups = [
    "CHAT_CHANGED",
    "CHAT_SWITCHED",
    "MESSAGE_SENT",
    "MESSAGE_EDITED",
    "MESSAGE_DELETED",
    "MESSAGE_SWIPED",
    "GENERATION_ENDED"
  ].flatMap((eventName) => {
    if (!ctx.events?.on) return [];
    return [ctx.events.on(eventName, (payload) => {
      const chatId = readChatId(payload);
      if (typeof chatId !== "undefined") lastKnownChatId = chatId;
      sendBackend({ type: "refresh_state", chatId: chatId ?? lastKnownChatId ?? void 0 });
    })];
  });
  roots.forEach((root) => {
    root.addEventListener("click", handleClick);
    root.addEventListener("change", handleChange);
    root.addEventListener("input", handleInput);
  });
  sendBackend({ type: "ready" });
  return () => {
    roots.forEach((root) => {
      root.removeEventListener("click", handleClick);
      root.removeEventListener("change", handleChange);
      root.removeEventListener("input", handleInput);
    });
    roots = [];
    for (const cleanup of widgetCleanups.values()) cleanup();
    widgetCleanups.clear();
    cleanupPinnedHud();
    cleanupWidgetTopObserver();
    if (domToolbarActionObserver) domToolbarActionObserver.disconnect();
    if (domToolbarActionElement) domToolbarActionElement.remove();
    unbindOpenAction?.();
    openAction?.destroy();
    unbindGenerateAction?.();
    generateAction?.destroy();
    unbindToggleInjectionAction?.();
    toggleInjectionAction?.destroy();
    unbindActivate();
    unbindBackend();
    eventCleanups.forEach((cleanup) => cleanup());
    placement.destroy();
    removeStyle();
    ctx.dom.cleanup();
  };
}
function createPlacement(ctx) {
  const drawerTab = tryCreateDrawerTab(ctx);
  if (drawerTab) {
    return {
      root: drawerTab.root,
      activate: drawerTab.activate,
      setBadge(text) {
        drawerTab.setBadge(text);
      },
      onActivate: drawerTab.onActivate,
      destroy() {
        drawerTab.destroy();
      }
    };
  }
  return createFallbackPanel(ctx);
}
function sendBackend(payload) {
  const chatId = payload.chatId ?? getActiveChatId();
  if (typeof chatId === "string" && chatId) {
    lastKnownChatId = chatId;
    ctxRef.sendToBackend({ ...payload, chatId });
    return;
  }
  ctxRef.sendToBackend(payload);
}
function getActiveChatId() {
  try {
    const active = ctxRef.getActiveChat?.();
    const chatId = active?.chatId ?? active?.id ?? lastKnownChatId ?? void 0;
    return typeof chatId === "string" && chatId ? chatId : void 0;
  } catch {
    return lastKnownChatId ?? void 0;
  }
}
function readChatId(payload) {
  if (!payload || typeof payload !== "object") return void 0;
  const obj = payload;
  if (typeof obj.chatId === "string") return obj.chatId;
  if (typeof obj.chat_id === "string") return obj.chat_id;
  if (obj.chatId === null || obj.chat_id === null) return null;
  const message = obj.message;
  if (message && typeof message === "object") {
    const nested = message;
    if (typeof nested.chatId === "string") return nested.chatId;
    if (typeof nested.chat_id === "string") return nested.chat_id;
  }
  return void 0;
}
function tryCreateDrawerTab(ctx) {
  if (typeof ctx.ui?.registerDrawerTab !== "function") {
    return void 0;
  }
  try {
    const tab = ctx.ui.registerDrawerTab({
      id: "tracktor",
      title: "Tracktor",
      shortName: "Track",
      headerTitle: "Tracktor",
      description: "Generate and manage structured chat trackers",
      keywords: ["tracker", "state", "schema", "ztracker"],
      iconSvg: TRACKTOR_ICON
    });
    return {
      root: tab.root,
      activate: () => tab.activate(),
      setBadge: (text) => tab.setBadge(text),
      onActivate: (handler) => tab.onActivate(handler),
      destroy: () => tab.destroy()
    };
  } catch (error) {
    console.warn("Tracktor: drawer tab registration failed, falling back to a fixed launcher panel.", error);
    return void 0;
  }
}
function createFallbackPanel(ctx) {
  const shell = injectHostElement(
    ctx,
    "body",
    `
      <div class="tracktor-fallback-shell">
        <button type="button" class="tracktor-floating-launcher" title="Open Tracktor">${TRACKTOR_SMALL_ICON}<span>Tracktor</span></button>
        <aside class="tracktor-fallback-panel" aria-hidden="true">
          <div class="tracktor-fallback-header">
            <strong>Tracktor</strong>
            <button type="button" class="tracktor-fallback-close" title="Close Tracktor">Close</button>
          </div>
          <div class="tracktor-fallback-body"></div>
        </aside>
      </div>
    `
  );
  const body = shell.querySelector(".tracktor-fallback-body");
  const launcher = shell.querySelector(".tracktor-floating-launcher");
  const close = shell.querySelector(".tracktor-fallback-close");
  if (!body) {
    throw new Error("Tracktor fallback panel failed to mount.");
  }
  const activateHandlers = /* @__PURE__ */ new Set();
  const activate = () => {
    shell.classList.add("is-open");
    shell.querySelector(".tracktor-fallback-panel")?.setAttribute("aria-hidden", "false");
    activateHandlers.forEach((handler) => handler());
  };
  const deactivate = () => {
    shell.classList.remove("is-open");
    shell.querySelector(".tracktor-fallback-panel")?.setAttribute("aria-hidden", "true");
  };
  launcher?.addEventListener("click", activate);
  close?.addEventListener("click", deactivate);
  return {
    root: body,
    activate,
    setBadge(text) {
      launcher?.setAttribute("data-tracktor-badge", text ?? "");
      launcher?.classList.toggle("has-tracktor-badge", !!text);
    },
    onActivate(handler) {
      activateHandlers.add(handler);
      return () => activateHandlers.delete(handler);
    },
    destroy() {
      launcher?.removeEventListener("click", activate);
      close?.removeEventListener("click", deactivate);
      shell.remove();
    }
  };
}
function tryCreateSettingsRoot(ctx) {
  if (typeof ctx.ui?.mount !== "function") {
    return void 0;
  }
  try {
    const mount = ctx.ui.mount("settings_extensions");
    mount.querySelector("[data-tracktor-settings-root]")?.remove();
    return injectHostElement(
      ctx,
      mount,
      '<section class="tracktor-settings-surface" data-tracktor-settings-root></section>'
    );
  } catch (error) {
    console.warn("Tracktor: extension settings mount failed.", error);
    return void 0;
  }
}
function uniqueRoots(values) {
  const seen = /* @__PURE__ */ new Set();
  const unique = [];
  for (const value of values) {
    if (seen.has(value)) continue;
    seen.add(value);
    unique.push(value);
  }
  return unique;
}
function injectHostElement(ctx, target, html, position = "beforeend") {
  if (typeof ctx.dom.inject === "function") {
    try {
      return ctx.dom.inject(target, html, position);
    } catch (error) {
      if (typeof target === "string") throw error;
      console.warn("Tracktor: DOM helper rejected an Element target, using direct host insertion.", error);
    }
  }
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  const element = template.content.firstElementChild;
  if (!element) {
    throw new Error("Tracktor failed to create host element.");
  }
  const parent = typeof target === "string" ? document.querySelector(target) : target;
  if (!parent) {
    throw new Error("Tracktor failed to find a host mount point.");
  }
  parent.insertAdjacentElement(position, element);
  return element;
}
function render() {
  if (roots.length === 0) return;
  for (const root of roots) {
    if (!state) {
      root.innerHTML = `
        <div class="tracktor-shell">
          ${renderHeader(activeView)}
          <section class="tracktor-section tracktor-toolbar">
            <div>
              <strong>Connecting to Tracktor</strong>
              <span>The backend state has not arrived yet. You can still refresh or open extension settings.</span>
            </div>
            <div class="tracktor-actions">
              <button type="button" data-action="refresh">Refresh</button>
              <button type="button" data-action="open-extension-settings">Extension Settings</button>
            </div>
          </section>
          <div class="tracktor-empty">Loading Tracktor state...</div>
          ${renderQuickControls(defaultSettings)}
        </div>
      `;
      continue;
    }
    root.innerHTML = `
      <div class="tracktor-shell">
        ${renderHeader(activeView)}
        ${renderStatus(state)}
        ${renderToolbar(state)}
        ${renderQuickControls(state.settings, state)}
        ${renderActiveView(state, activeView)}
      </div>
    `;
  }
}
function renderHeader(view) {
  return `
    <header class="tracktor-header">
      <div>
        <strong>Tracktor</strong>
        <span>Tracker presets and snapshots for Lumiverse chats</span>
      </div>
      <div class="tracktor-tabs" aria-label="Tracktor sections">
        ${renderViewButton("current", "Current", view)}
        ${renderViewButton("settings", "Settings", view)}
        ${renderViewButton("preset", "Preset", view)}
        ${renderViewButton("diagnostics", "Diagnostics", view)}
      </div>
    </header>
  `;
}
function renderViewButton(view, label, current) {
  return `<button type="button" class="tracktor-tab-button ${view === current ? "is-active" : ""}" data-action="set-view" data-view="${view}" aria-pressed="${view === current ? "true" : "false"}">${label}</button>`;
}
function renderActiveView(current, view) {
  if (view === "settings") return renderSettings(current.settings, current);
  if (view === "preset") return renderSchemaEditor(current.settings, current);
  if (view === "diagnostics") return renderDiagnosticsPanel(current);
  return renderTrackers(current);
}
function renderStatus(current) {
  const warnings = current.permissionWarnings.length ? `<div class="tracktor-warning">Grant permissions in Lumiverse Extensions: ${current.permissionWarnings.map(escapeHtml).join(", ")}</div>` : "";
  const error = current.lastError ? `<div class="tracktor-error">${escapeHtml(current.lastError)}</div>` : "";
  const jobs = current.jobs?.length ? `<div class="tracktor-busy">${current.jobs.map((job) => `${escapeHtml(job.label)}${job.totalParts ? ` ${job.currentPart ?? 0}/${job.totalParts}` : ""}`).join("<br>")}</div>` : current.busy ? '<div class="tracktor-busy">Working...</div>' : "";
  const diagnostics = current.diagnostics?.length ? `<details class="tracktor-diagnostics"><summary>Diagnostics</summary>${current.diagnostics.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</details>` : "";
  return `${warnings}${error}${jobs}${diagnostics}`;
}
function renderToolbar(current) {
  const chat = current.activeChat;
  return `
    <section class="tracktor-section tracktor-toolbar">
      <div>
        <strong>${escapeHtml(chat?.name ?? "No active chat")}</strong>
        <span>${chat ? `${chat.messageCount} messages, ${chat.trackers.length} trackers` : "Open a chat to generate trackers."}</span>
      </div>
      <div class="tracktor-actions">
        <button type="button" data-action="refresh">Refresh</button>
        <button type="button" data-action="copy-latest" ${chat?.trackers.length ? "" : "disabled"}>Copy Latest</button>
      </div>
    </section>
  `;
}
function renderTrackers(current) {
  const trackers = current.activeChat?.trackers ?? [];
  if (!current.activeChat) {
    return '<section class="tracktor-section"><h2>Trackers</h2><div class="tracktor-empty">No active chat.</div></section>';
  }
  if (trackers.length === 0) {
    return '<section class="tracktor-section"><h2>Trackers</h2><div class="tracktor-empty">No trackers yet. Generate one for the latest message to get started.</div></section>';
  }
  return `
    <section class="tracktor-section">
      <h2>Trackers</h2>
      <div class="tracktor-list">
        ${trackers.map(renderTrackerItem).join("")}
      </div>
    </section>
  `;
}
function renderTrackerItem(item) {
  const partButtons = (item.snapshot.partsOrder ?? []).map((partKey) => `<button type="button" data-action="regenerate-part" data-chat-id="${escapeHtml(item.chatId)}" data-message-id="${escapeHtml(item.messageId)}" data-part-key="${escapeHtml(partKey)}">${escapeHtml(partKey)}</button>`).join("");
  return `
    <article class="tracktor-item" data-chat-id="${escapeHtml(item.chatId)}" data-message-id="${escapeHtml(item.messageId)}">
      <div class="tracktor-item-head">
        <div>
          <strong>${escapeHtml(item.tracker.schemaName)}</strong>
          <span>${escapeHtml(item.role)} message: ${escapeHtml(item.messagePreview || item.messageId)}</span>
        </div>
        <div class="tracktor-actions tracktor-icon-actions">
          ${renderIconButton("regenerate", ICON_REGENERATE, "Regenerate tracker", { chatId: item.chatId, messageId: item.messageId })}
          ${renderIconButton("edit", ICON_EDIT, "Edit tracker JSON", { chatId: item.chatId, messageId: item.messageId })}
          ${renderIconButton("delete", ICON_DELETE, "Delete tracker", { chatId: item.chatId, messageId: item.messageId })}
        </div>
      </div>
      ${partButtons ? `<details class="tracktor-parts"><summary>Regenerate section</summary><div class="tracktor-actions">${partButtons}</div></details>` : ""}
      <div class="tracktor-rendered">${stripDangerousHtml(item.tracker.renderedHtml)}</div>
    </article>
  `;
}
function renderIconButton(action, iconSvg, label, dataAttrs) {
  const attrs = Object.entries(dataAttrs).map(([key, value]) => `data-${toKebabCase(key)}="${escapeHtml(value)}"`).join(" ");
  return `<button type="button" class="tracktor-icon-button" data-action="${escapeHtml(action)}" ${attrs} title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">${iconSvg}</button>`;
}
function toKebabCase(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
function renderQuickControls(settings, current) {
  const chat = current?.activeChat;
  return `
    <section class="tracktor-section">
      <h2>Controls</h2>
      <div class="tracktor-form-grid tracktor-common-controls">
        ${renderConnectionControl(settings, current?.availableConnections ?? [])}
        ${renderTrackerPresetSelect(settings)}
        <label>Output Mode
          <select data-setting="structuredOutputMode" data-autosave="settings">
            ${renderStructuredOutputOptions(settings.structuredOutputMode)}
          </select>
        </label>
        <label>Auto Mode
          <select data-setting="autoMode">
            <option value="none" ${settings.autoMode === "none" ? "selected" : ""}>None</option>
            <option value="responses" ${settings.autoMode === "responses" ? "selected" : ""}>Responses</option>
            <option value="inputs" ${settings.autoMode === "inputs" ? "selected" : ""}>Inputs</option>
            <option value="both" ${settings.autoMode === "both" ? "selected" : ""}>Both</option>
          </select>
        </label>
        <label class="tracktor-check tracktor-common-check">
          <input data-setting="injectTrackerSnapshots" type="checkbox" ${settings.injectTrackerSnapshots ? "checked" : ""}>
          Inject snapshots
        </label>
      </div>
      <div class="tracktor-actions tracktor-primary-actions">
        <button type="button" data-action="generate-latest" ${chat && !current?.busy ? "" : "disabled"}>Generate Tracker</button>
        <button type="button" data-action="generate-latest-sequential" ${chat && !current?.busy ? "" : "disabled"}>Generate Sequential</button>
        <button type="button" data-action="save-settings">Save Settings</button>
      </div>
    </section>
  `;
}
function renderSettings(settings, current) {
  return `
    <section class="tracktor-section">
      <h2>Settings</h2>
      <details class="tracktor-details">
        <summary>Generation</summary>
        <div class="tracktor-form-grid">
          <label>Lumiverse generation preset
            <input data-setting="trackerPresetId" value="${escapeHtml(settings.trackerPresetId ?? "")}" placeholder="Stored for future support">
            <span class="tracktor-field-hint">Stored for compatibility; not active in this build.</span>
          </label>
        <label>Template engine
          <select data-setting="templateEngine">
            ${renderTemplateEngineOptions(settings.templateEngine)}
          </select>
        </label>
        <label>Tracker position
          <select data-setting="trackerPlacement" data-autosave="settings">
            ${renderTrackerPlacementOptions(settings.trackerPlacement)}
          </select>
        </label>
        <label>Recent messages
          <input data-setting="trackerContextMessageLimit" type="number" min="0" max="400" value="${settings.trackerContextMessageLimit}">
        </label>
        <label>Skip first messages
          <input data-setting="skipFirstMessages" type="number" min="0" max="1000" value="${settings.skipFirstMessages}">
        </label>
        <label>Tracker context
          <input data-setting="includeLastTrackers" type="number" min="0" max="25" value="${settings.includeLastTrackers}">
        </label>
        <label>Max response tokens
          <input data-setting="maxResponseTokens" type="number" min="1" max="64000" value="${settings.maxResponseTokens}">
        </label>
        <label class="tracktor-check">
          <input data-setting="sequentialGeneration" type="checkbox" ${settings.sequentialGeneration ? "checked" : ""}>
          Sequential part generation
        </label>
        <label>Conversation roles
          <select data-setting="trackerConversationRoleMode">
            <option value="preserve" ${settings.trackerConversationRoleMode === "preserve" ? "selected" : ""}>Preserve</option>
            <option value="all_assistant" ${settings.trackerConversationRoleMode === "all_assistant" ? "selected" : ""}>All assistant</option>
            <option value="plain_transcript" ${settings.trackerConversationRoleMode === "plain_transcript" ? "selected" : ""}>Plain transcript</option>
          </select>
        </label>
        </div>
      </details>
      <details class="tracktor-details">
        <summary>Future compatibility</summary>
        <p class="tracktor-muted">These settings are preserved for zTracker parity work but are not wired into generation yet.</p>
        <div class="tracktor-form-grid">
          <label class="tracktor-check">
            <input data-setting="includeCharacterCardInTrackerPrompt" type="checkbox" ${settings.includeCharacterCardInTrackerPrompt ? "checked" : ""}>
            Include character card
          </label>
          <label>World-book mode
            <select data-setting="trackerWorldBookMode">
              <option value="include_all" ${settings.trackerWorldBookMode === "include_all" ? "selected" : ""}>Include all</option>
              <option value="exclude_all" ${settings.trackerWorldBookMode === "exclude_all" ? "selected" : ""}>Exclude all</option>
              <option value="allowlist" ${settings.trackerWorldBookMode === "allowlist" ? "selected" : ""}>Allowlist</option>
            </select>
          </label>
          <label>Allowed world-book ids
            <input data-setting="allowedWorldBookIds" value="${escapeHtml(settings.allowedWorldBookIds.join(", "))}" placeholder="Stored only">
          </label>
          <label>Allowed entry ids
            <input data-setting="allowedWorldBookEntryIds" value="${escapeHtml(settings.allowedWorldBookEntryIds.join(", "))}" placeholder="Stored only">
          </label>
          <label>System prompt source
            <select data-setting="trackerSystemPromptSource">
              <option value="active_preset" ${settings.trackerSystemPromptSource === "active_preset" ? "selected" : ""}>Active preset</option>
              <option value="selected_tracker_preset" ${settings.trackerSystemPromptSource === "selected_tracker_preset" ? "selected" : ""}>Selected tracker preset</option>
              <option value="saved_tracker_prompt" ${settings.trackerSystemPromptSource === "saved_tracker_prompt" ? "selected" : ""}>Saved tracker prompt</option>
            </select>
          </label>
          <label>Saved tracker prompt id
            <input data-setting="savedTrackerPromptId" value="${escapeHtml(settings.savedTrackerPromptId ?? "")}" placeholder="Stored only">
          </label>
        </div>
      </details>
      <details class="tracktor-details">
        <summary>Injection</summary>
        <div class="tracktor-form-grid">
        <label>Injected snapshots
          <input data-setting="trackerSnapshotCount" type="number" min="0" max="25" value="${settings.trackerSnapshotCount}">
        </label>
        <label>Injection role
          <select data-setting="snapshotRole">
            <option value="system" ${settings.snapshotRole === "system" ? "selected" : ""}>System</option>
            <option value="user" ${settings.snapshotRole === "user" ? "selected" : ""}>User</option>
            <option value="assistant" ${settings.snapshotRole === "assistant" ? "selected" : ""}>Assistant</option>
          </select>
        </label>
        <label>Snapshot transform
          <select data-setting="snapshotTransformPresetKey">
            <option value="default_json" ${settings.snapshotTransformPresetKey === "default_json" ? "selected" : ""}>Default JSON</option>
            <option value="minimal" ${settings.snapshotTransformPresetKey === "minimal" ? "selected" : ""}>Minimal</option>
            <option value="toon" ${settings.snapshotTransformPresetKey === "toon" ? "selected" : ""}>TOON</option>
          </select>
        </label>
        <label>Chat variable key
          <input data-setting="chatVariableExport.key" value="${escapeHtml(settings.chatVariableExport.key)}">
        </label>
        <label>Snapshot header
          <input data-setting="snapshotHeader" value="${escapeHtml(settings.snapshotHeader)}">
        </label>
        <label class="tracktor-check">
          <input data-setting="injectAsVirtualCharacter" type="checkbox" ${settings.injectAsVirtualCharacter ? "checked" : ""}>
          Virtual Tracker speaker
        </label>
        <label class="tracktor-check">
          <input data-setting="chatVariableExport.enabled" type="checkbox" ${settings.chatVariableExport.enabled ? "checked" : ""}>
          Export chat variable
        </label>
        </div>
      </details>
    </section>
  `;
}
function renderDiagnosticsPanel(current) {
  return `
    <section class="tracktor-section">
      <h2>Diagnostics</h2>
      <label class="tracktor-check">
        <input data-setting="debugLogging" type="checkbox" ${current.settings.debugLogging ? "checked" : ""}>
        Debug logging
      </label>
      ${(current.diagnostics?.length ?? 0) > 0 ? current.diagnostics.map((item) => `<p class="tracktor-diagnostic-line">${escapeHtml(item)}</p>`).join("") : '<p class="tracktor-muted">No diagnostics yet.</p>'}
      ${current.lastError ? `<p class="tracktor-error-text">${escapeHtml(current.lastError)}</p>` : ""}
    </section>
  `;
}
function renderConnectionControl(settings, connections) {
  const selectedId = settings.trackerConnectionId ?? "";
  const selectedMissing = !!selectedId && connections.length > 0 && !connections.some((connection) => connection.id === selectedId);
  const options = [
    `<option value="" ${selectedId ? "" : "selected"}>Use active connection</option>`,
    selectedMissing ? `<option value="${escapeHtml(selectedId)}" selected>Saved: ${escapeHtml(selectedId)}</option>` : "",
    ...connections.map((connection) => `<option value="${escapeHtml(connection.id)}" ${connection.id === selectedId ? "selected" : ""}>${escapeHtml(formatConnectionLabel(connection))}</option>`)
  ].join("");
  const warning = connections.length === 0 ? '<div class="tracktor-warning tracktor-compact-warning">Connection profiles are not available yet. Active connection fallback still works.</div>' : selectedMissing ? '<div class="tracktor-warning tracktor-compact-warning">Saved connection id was not found. You can keep it manually or choose another profile.</div>' : "";
  return `
    <label>Connection
      <select data-setting="trackerConnectionId" data-autosave="settings">
        ${options}
      </select>
    </label>
    <div class="tracktor-field-note">
      ${warning}
      ${connections.length === 0 || selectedMissing ? `
        <details class="tracktor-advanced-inline">
          <summary>Advanced</summary>
          <label>Manual connection id
            <input data-setting="trackerConnectionId" value="${escapeHtml(selectedId)}" placeholder="Use active connection">
          </label>
        </details>
      ` : ""}
    </div>
  `;
}
function renderTrackerPresetSelect(settings) {
  const presets = Object.values(settings.schemaPresets);
  const activeKey = getActiveTrackerPresetKey(settings);
  return `
    <label>Tracker Preset
      <select data-setting="activeTrackerPresetKey" data-autosave="settings">
        ${presets.map((preset) => `<option value="${escapeHtml(preset.key)}" ${preset.key === activeKey ? "selected" : ""}>${escapeHtml(preset.name)}</option>`).join("")}
      </select>
    </label>
  `;
}
function renderStructuredOutputOptions(value, includeEmpty = false) {
  const empty = includeEmpty ? `<option value="" ${value ? "" : "selected"}>Use global output mode</option>` : "";
  return `${empty}
    <option value="json_prompt" ${value === "json_prompt" ? "selected" : ""}>Prompted JSON</option>
    <option value="native_json_schema" ${value === "native_json_schema" ? "selected" : ""}>Native JSON schema</option>
    <option value="xml_prompt" ${value === "xml_prompt" ? "selected" : ""}>XML prompt fallback</option>
    <option value="toon_prompt" ${value === "toon_prompt" ? "selected" : ""}>TOON prompt fallback</option>
  `;
}
function renderTemplateEngineOptions(value, includeEmpty = false) {
  const empty = includeEmpty ? `<option value="" ${value ? "" : "selected"}>Use global template engine</option>` : "";
  return `${empty}
    <option value="handlebars" ${value === "handlebars" ? "selected" : ""}>Handlebars</option>
    <option value="simple" ${value === "simple" ? "selected" : ""}>Simple fallback</option>
  `;
}
function renderTrackerPlacementOptions(value) {
  return `
    <option value="message_bottom" ${value === "message_bottom" || !value ? "selected" : ""}>Bottom of message</option>
    <option value="message_top" ${value === "message_top" ? "selected" : ""}>Top of message</option>
    <option value="chat_top_pinned" ${value === "chat_top_pinned" ? "selected" : ""}>Pinned at top of chat</option>
  `;
}
function formatConnectionLabel(connection) {
  const detail = [connection.provider, connection.model].filter(Boolean).join(" / ");
  return detail ? `${connection.name} (${detail})` : connection.name;
}
function getActiveTrackerPresetKey(settings) {
  return settings.activeTrackerPresetKey || settings.activeSchemaPresetKey || settings.activeSchemaId || "scene";
}
function getActiveTrackerPreset(settings) {
  const key = getActiveTrackerPresetKey(settings);
  return settings.schemaPresets[key] ?? settings.schemaPresets[Object.keys(settings.schemaPresets)[0]];
}
function renderSchemaEditor(settings, current) {
  const presets = Object.values(settings.schemaPresets);
  const active = getActiveTrackerPreset(settings) ?? presets[0];
  if (!active) return "";
  return `
    <section class="tracktor-section">
      <details class="tracktor-details" data-preset-editor>
        <summary>Preset Editor</summary>
        <p class="tracktor-muted" data-preset-dirty>${presetDraftDirty ? "Unsaved preset changes." : "Paste or edit a tracker preset, preview it, then save."}</p>
        <div class="tracktor-form-grid">
          <label>Preset id
            <input data-preset-field="id" value="${escapeHtml(active.id)}" ${active.key === "scene" ? "readonly" : ""}>
          </label>
          <label>Name
            <input data-preset-field="name" value="${escapeHtml(active.name)}">
          </label>
          <label>Description
            <input data-preset-field="description" value="${escapeHtml(active.description ?? "")}">
          </label>
          <label>Preset output override
            <select data-preset-field="structuredOutputMode">
              ${renderStructuredOutputOptions(active.structuredOutputMode, true)}
            </select>
          </label>
          <label>Template engine
            <select data-preset-field="templateEngine">
              ${renderTemplateEngineOptions(active.templateEngine, true)}
            </select>
          </label>
        </div>
        <label>JSON schema
          <textarea data-preset-field="schema" rows="12" spellcheck="false">${escapeHtml(JSON.stringify(active.schema, null, 2))}</textarea>
        </label>
        <label>HTML template
          <textarea data-preset-field="templateHtml" rows="8" spellcheck="false">${escapeHtml(active.templateHtml)}</textarea>
        </label>
        <label>System prompt
          <textarea data-preset-field="systemPrompt" rows="5">${escapeHtml(active.systemPrompt || settings.systemPrompt)}</textarea>
        </label>
        <label>Extraction prompt
          <textarea data-preset-field="trackerInstructionPrompt" rows="4">${escapeHtml(active.trackerInstructionPrompt || active.extractionPrompt || settings.trackerInstructionPrompt)}</textarea>
        </label>
        <label>JSON prompt template
          <textarea data-preset-field="jsonPromptTemplate" rows="5">${escapeHtml(active.jsonPromptTemplate || settings.jsonPromptTemplate)}</textarea>
        </label>
        <label>XML prompt template
          <textarea data-preset-field="xmlPromptTemplate" rows="4">${escapeHtml(active.xmlPromptTemplate || settings.xmlPromptTemplate)}</textarea>
        </label>
        <label>TOON prompt template
          <textarea data-preset-field="toonPromptTemplate" rows="4">${escapeHtml(active.toonPromptTemplate || settings.toonPromptTemplate)}</textarea>
        </label>
        <div class="tracktor-actions">
          <button type="button" data-action="import-preset">Import zTracker/WTracker Preset</button>
          <button type="button" data-action="preview-preset">Preview Template</button>
          <button type="button" data-action="new-preset">New Preset</button>
          <button type="button" data-action="duplicate-preset">Duplicate Preset</button>
          <button type="button" data-action="save-preset">Save Preset</button>
          <button type="button" data-action="delete-preset" ${active.key === "scene" ? "disabled" : ""}>Delete Preset</button>
          <button type="button" data-action="restore-built-in-preset">Restore Built-in Preset</button>
          <button type="button" data-action="use-schema-for-chat" ${current?.activeChat ? "" : "disabled"}>Use For This Chat</button>
        </div>
      </details>
    </section>
  `;
}
function handleClick(event) {
  const target = event.target;
  const button = target?.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "set-view") {
    const view = button.dataset.view;
    if (view === "current" || view === "settings" || view === "preset" || view === "diagnostics") {
      activeView = view;
      render();
    }
  } else if (action === "refresh") {
    sendBackend({ type: "refresh_state" });
  } else if (action === "open-extension-settings") {
    ctxRef.events?.emit?.("open-settings", { view: "extensions" });
  } else if (!state) {
    return;
  } else if (action === "generate-latest") {
    sendBackend({ type: "generate_tracker", chatId: state.activeChat?.id });
  } else if (action === "generate-latest-sequential") {
    sendBackend({ type: "generate_tracker", chatId: state.activeChat?.id, sequential: true });
  } else if (action === "copy-latest") {
    void copyLatestSnapshot();
  } else if (action === "regenerate") {
    sendBackend({ type: "regenerate_tracker", chatId: button.dataset.chatId, messageId: button.dataset.messageId });
  } else if (action === "regenerate-part") {
    sendBackend({ type: "regenerate_part", chatId: button.dataset.chatId, messageId: button.dataset.messageId, partKey: button.dataset.partKey });
  } else if (action === "edit") {
    openEditModal(button.dataset.chatId, button.dataset.messageId);
  } else if (action === "delete") {
    void confirmDelete(button.dataset.chatId, button.dataset.messageId);
  } else if (action === "save-settings") {
    saveSettingsFromDom();
  } else if (action === "restore-default-prompts") {
    restoreDefaultPrompts();
  } else if (action === "save-schema" || action === "save-preset") {
    savePresetFromDom(getPresetEditorForAction(button));
  } else if (action === "preview-preset") {
    previewPresetFromDom(getPresetEditorForAction(button));
  } else if (action === "import-preset") {
    openImportPresetModal();
  } else if (action === "new-preset") {
    createNewPreset();
  } else if (action === "duplicate-preset") {
    duplicateActivePreset();
  } else if (action === "delete-preset") {
    void deleteActivePreset();
  } else if (action === "restore-built-in-preset") {
    restoreBuiltInPreset();
  } else if (action === "use-schema-for-chat") {
    sendBackend({
      type: "set_chat_schema",
      chatId: state.activeChat?.id,
      schemaId: getActiveTrackerPresetKey(state.settings)
    });
  }
}
function handleChange(event) {
  const target = event.target;
  if (target?.dataset.presetField) {
    markPresetDirty(target);
    return;
  }
  if (!target?.dataset.setting || !state) return;
  applySettingValue(target);
  if (!presetDraftDirty) render();
  if (target.dataset.autosave === "settings") saveSettingsFromDom();
}
function handleInput(event) {
  const target = event.target;
  if (target?.dataset.presetField) {
    markPresetDirty(target);
    return;
  }
  if (!target?.dataset.setting || !state) return;
  applySettingValue(target);
}
function markPresetDirty(target) {
  presetDraftDirty = true;
  const root = target.closest(".tracktor-root") ?? document;
  const dirty = root.querySelector("[data-preset-dirty]");
  if (dirty) dirty.textContent = "Unsaved preset changes.";
}
function applySettingValue(target) {
  if (!state) return;
  const settings = state.settings;
  const path = target.dataset.setting.split(".");
  let owner = settings;
  for (const part of path.slice(0, -1)) {
    owner = owner[part];
  }
  const key = path[path.length - 1];
  if (target instanceof HTMLInputElement && target.type === "checkbox") {
    owner[key] = target.checked;
  } else if (target instanceof HTMLInputElement && target.type === "number") {
    owner[key] = Number.parseInt(target.value, 10);
  } else if (key === "allowedWorldBookIds" || key === "allowedWorldBookEntryIds") {
    owner[key] = target.value.split(/[\n, ]+/).map((item) => item.trim()).filter(Boolean);
  } else {
    owner[key] = target.value;
  }
  if (key === "activeTrackerPresetKey" || key === "activeSchemaPresetKey" || key === "activeSchemaId") {
    const activeKey = String(owner[key] ?? "");
    settings.activeTrackerPresetKey = activeKey;
    settings.activeSchemaPresetKey = activeKey;
    settings.activeSchemaId = activeKey;
  }
}
function saveSettingsFromDom() {
  if (!state) return;
  ctxRef.sendToBackend({ type: "save_settings", settings: deepMergeSettings(state.settings) });
}
function restoreDefaultPrompts() {
  if (!state) return;
  state.settings.systemPrompt = DEFAULT_SYSTEM_PROMPT;
  state.settings.extractionPrompt = DEFAULT_EXTRACTION_PROMPT;
  state.settings.trackerInstructionPrompt = DEFAULT_EXTRACTION_PROMPT;
  ctxRef.sendToBackend({ type: "save_settings", settings: deepMergeSettings(state.settings) });
  render();
}
function savePresetFromDom(editor) {
  if (!state) return;
  try {
    const settings = structuredClone(state.settings);
    const previousKey = getActiveTrackerPresetKey(settings);
    const previous = settings.schemaPresets[previousKey];
    const preset = readPresetFromDom(editor, previous);
    if (preset.key !== previousKey && settings.schemaPresets[preset.key]) {
      throw new Error(`A tracker preset already exists with id "${preset.key}".`);
    }
    if (preset.key !== previousKey && previousKey !== "scene") {
      delete settings.schemaPresets[previousKey];
    }
    settings.schemaPresets[preset.key] = preset;
    setActivePreset(settings, preset.key);
    persistSettings(settings, preset.key);
  } catch (error) {
    showErrorModal(error instanceof Error ? error.message : String(error));
  }
}
function previewPresetFromDom(editor) {
  if (!state) return;
  try {
    const preset = readPresetFromDom(editor, getActiveTrackerPreset(state.settings));
    const engine = preset.templateEngine ?? state.settings.templateEngine ?? "handlebars";
    const html = assertTrackerTemplateRenders(preset.renderTemplate, schemaToExample(preset.schema), {
      templateEngine: engine,
      label: `Tracker preset "${preset.name}" (${preset.key})`
    });
    showHtmlModal("Template Preview", `<div class="tracktor-preview tracktor-rendered">${stripDangerousHtml(html)}</div>`);
  } catch (error) {
    showErrorModal(error instanceof Error ? error.message : String(error));
  }
}
function openImportPresetModal() {
  if (!state) return;
  if (typeof ctxRef.ui?.showModal !== "function") {
    const text = window.prompt("Paste zTracker/WTracker preset JSON");
    if (text) importPresetText(text);
    return;
  }
  const modal = ctxRef.ui.showModal({ title: "Import zTracker/WTracker Preset", width: 760, maxHeight: 760 });
  modal.root.innerHTML = `
    <div class="tracktor-modal-body">
      <p class="tracktor-muted">Paste a JSON object that contains a schema, HTML/Handlebars template, and extraction prompt.</p>
      <textarea class="tracktor-json-editor" spellcheck="false" placeholder='{"name":"My Tracker","schema":{},"templateHtml":"...","trackerInstructionPrompt":"..."}'></textarea>
      <div class="tracktor-actions">
        <button type="button" data-modal-action="import">Import</button>
        <button type="button" data-modal-action="cancel">Cancel</button>
      </div>
    </div>
  `;
  modal.root.addEventListener("click", (event) => {
    const action = event.target?.closest("[data-modal-action]");
    if (!action) return;
    if (action.dataset.modalAction === "cancel") {
      modal.dismiss();
      return;
    }
    const textarea = modal.root.querySelector(".tracktor-json-editor");
    if (!textarea) return;
    try {
      importPresetText(textarea.value);
      modal.dismiss();
    } catch (error) {
      showErrorModal(error instanceof Error ? error.message : String(error));
    }
  });
}
function importPresetText(text) {
  if (!state) return;
  const imported = readImportedPreset(text, state.settings);
  const settings = structuredClone(state.settings);
  const key = makeUniquePresetKey(settings, imported.key);
  const preset = {
    ...imported,
    id: key,
    key,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  const engine = preset.templateEngine ?? settings.templateEngine ?? "handlebars";
  assertTrackerTemplateRenders(preset.renderTemplate, schemaToExample(preset.schema), {
    templateEngine: engine,
    label: `Tracker preset "${preset.name}" (${preset.key})`
  });
  settings.schemaPresets[key] = preset;
  setActivePreset(settings, key);
  activeView = "preset";
  persistSettings(settings, key);
}
function readImportedPreset(text, settings) {
  const raw = JSON.parse(text);
  const candidate = selectImportCandidate(raw);
  const schema = readFirstObject(candidate, ["jsonSchema", "schema", "schemaJson", "trackerSchema"]);
  if (!schema) throw new Error("Imported preset needs a JSON schema object.");
  const templateHtml = readFirstString(candidate, ["templateHtml", "renderTemplate", "htmlTemplate", "trackerHtml", "html", "template"]);
  if (!templateHtml) throw new Error("Imported preset needs an HTML/Handlebars template.");
  const trackerInstructionPrompt = readFirstString(candidate, ["trackerInstructionPrompt", "extractionPrompt", "trackerPrompt", "prompt", "generationPrompt"]) || DEFAULT_EXTRACTION_PROMPT;
  const systemPrompt = readFirstString(candidate, ["systemPrompt"]) || settings.systemPrompt || DEFAULT_SYSTEM_PROMPT;
  const name = readFirstString(candidate, ["name", "title", "presetName", "humanName"]) || String(schema.title ?? "Imported Tracker Preset");
  const key = sanitizeId(readFirstString(candidate, ["key", "id"]) || name) || "imported_tracker";
  const base = defaultSettings.schemaPresets.scene;
  return {
    ...structuredClone(base),
    id: key,
    key,
    name,
    description: readFirstString(candidate, ["description"]) || "Imported zTracker/WTracker preset.",
    schema,
    jsonSchema: schema,
    templateHtml,
    renderTemplate: templateHtml,
    systemPrompt,
    extractionPrompt: trackerInstructionPrompt,
    trackerInstructionPrompt,
    jsonPromptTemplate: readFirstString(candidate, ["jsonPromptTemplate"]) || settings.jsonPromptTemplate || DEFAULT_JSON_PROMPT_TEMPLATE,
    xmlPromptTemplate: readFirstString(candidate, ["xmlPromptTemplate"]) || settings.xmlPromptTemplate || DEFAULT_XML_PROMPT_TEMPLATE,
    toonPromptTemplate: readFirstString(candidate, ["toonPromptTemplate"]) || settings.toonPromptTemplate || DEFAULT_TOON_PROMPT_TEMPLATE,
    templateEngine: "handlebars"
  };
}
function selectImportCandidate(raw) {
  if (Array.isArray(raw)) {
    const firstObject = raw.find(isPlainImportObject);
    if (firstObject) return firstObject;
  }
  if (!isPlainImportObject(raw)) throw new Error("Imported preset JSON must be an object.");
  const containers = ["preset", "trackerPreset", "schemaPreset"];
  for (const key of containers) {
    const nested = raw[key];
    if (isPlainImportObject(nested)) return nested;
  }
  for (const key of ["schemaPresets", "trackerPresets", "presets"]) {
    const value = raw[key];
    if (Array.isArray(value)) {
      const firstObject = value.find(isPlainImportObject);
      if (firstObject) return firstObject;
    }
    if (isPlainImportObject(value)) {
      const firstObject = Object.values(value).find(isPlainImportObject);
      if (firstObject) return firstObject;
    }
  }
  return raw;
}
function readFirstObject(source, keys) {
  for (const key of keys) {
    const value = source[key];
    if (isPlainImportObject(value)) return value;
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        if (isPlainImportObject(parsed)) return parsed;
      } catch {
      }
    }
  }
  return void 0;
}
function readFirstString(source, keys) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}
function isPlainImportObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function readPresetFromDom(editor, previous) {
  const id = sanitizeId(readPresetField(editor, "id")) || previous?.key || "tracker";
  const schemaText = readPresetField(editor, "schema") || JSON.stringify(previous?.schema ?? defaultSettings.schemaPresets.scene.schema, null, 2);
  const schema = JSON.parse(schemaText);
  if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
    throw new Error("Tracker preset JSON schema must be an object.");
  }
  const templateHtml = readPresetField(editor, "templateHtml") || previous?.templateHtml || defaultSettings.schemaPresets.scene.templateHtml;
  const mode = readPresetField(editor, "structuredOutputMode");
  const templateEngine = readPresetField(editor, "templateEngine");
  const preset = {
    id,
    key: id,
    name: readPresetField(editor, "name") || previous?.name || id,
    description: readPresetField(editor, "description") || void 0,
    schema,
    jsonSchema: schema,
    templateHtml,
    renderTemplate: templateHtml,
    systemPrompt: readPresetField(editor, "systemPrompt") || previous?.systemPrompt || DEFAULT_SYSTEM_PROMPT,
    extractionPrompt: readPresetField(editor, "trackerInstructionPrompt") || previous?.extractionPrompt || DEFAULT_EXTRACTION_PROMPT,
    trackerInstructionPrompt: readPresetField(editor, "trackerInstructionPrompt") || previous?.trackerInstructionPrompt || DEFAULT_EXTRACTION_PROMPT,
    jsonPromptTemplate: readPresetField(editor, "jsonPromptTemplate") || previous?.jsonPromptTemplate || DEFAULT_JSON_PROMPT_TEMPLATE,
    xmlPromptTemplate: readPresetField(editor, "xmlPromptTemplate") || previous?.xmlPromptTemplate || DEFAULT_XML_PROMPT_TEMPLATE,
    toonPromptTemplate: readPresetField(editor, "toonPromptTemplate") || previous?.toonPromptTemplate || DEFAULT_TOON_PROMPT_TEMPLATE,
    ...mode ? { structuredOutputMode: mode } : {},
    ...templateEngine ? { templateEngine } : {},
    createdAt: previous?.createdAt ?? Date.now(),
    updatedAt: Date.now()
  };
  const engine = preset.templateEngine ?? state?.settings.templateEngine ?? "handlebars";
  assertTrackerTemplateRenders(preset.renderTemplate, schemaToExample(preset.schema), {
    templateEngine: engine,
    label: `Tracker preset "${preset.name}" (${preset.key})`
  });
  const warnings = getTemplateCompatibilityWarnings(preset.renderTemplate);
  if (warnings.length > 0) console.warn(`Tracktor preset "${preset.name}" (${preset.key}) warnings: ${warnings.join(" ")}`);
  return preset;
}
function readPresetField(editor, field) {
  const input = editor.querySelector(`[data-preset-field="${field}"]`);
  if (!input) return "";
  return input instanceof HTMLTextAreaElement ? input.value : input.value.trim();
}
function getPresetEditorForAction(button) {
  return button.closest("[data-preset-editor]") ?? getRootForAction(button);
}
function createNewPreset() {
  if (!state) return;
  const settings = structuredClone(state.settings);
  const base = defaultSettings.schemaPresets.scene;
  const key = makeUniquePresetKey(settings, "tracker_preset");
  settings.schemaPresets[key] = {
    ...structuredClone(base),
    id: key,
    key,
    name: "New Tracker Preset",
    description: "Custom tracker preset.",
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  setActivePreset(settings, key);
  persistSettings(settings, key);
}
function duplicateActivePreset() {
  if (!state) return;
  const settings = structuredClone(state.settings);
  const active = getActiveTrackerPreset(settings);
  if (!active) return;
  const key = makeUniquePresetKey(settings, `${active.key}_copy`);
  settings.schemaPresets[key] = {
    ...structuredClone(active),
    id: key,
    key,
    name: `${active.name} Copy`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  setActivePreset(settings, key);
  persistSettings(settings, key);
}
async function deleteActivePreset() {
  if (!state) return;
  const settings = structuredClone(state.settings);
  const key = getActiveTrackerPresetKey(settings);
  if (key === "scene") return;
  const confirmed = typeof ctxRef.ui?.showConfirm === "function" ? (await ctxRef.ui.showConfirm({
    title: "Delete Tracker Preset",
    message: `Delete tracker preset "${settings.schemaPresets[key]?.name ?? key}"?`,
    variant: "danger",
    confirmLabel: "Delete"
  })).confirmed : window.confirm(`Delete tracker preset "${settings.schemaPresets[key]?.name ?? key}"?`);
  if (!confirmed) return;
  delete settings.schemaPresets[key];
  setActivePreset(settings, settings.schemaPresets.scene ? "scene" : Object.keys(settings.schemaPresets)[0] ?? "scene");
  persistSettings(settings);
}
function restoreBuiltInPreset() {
  if (!state) return;
  const settings = structuredClone(state.settings);
  settings.schemaPresets.scene = structuredClone(defaultSettings.schemaPresets.scene);
  setActivePreset(settings, "scene");
  persistSettings(settings, "scene");
}
function makeUniquePresetKey(settings, base) {
  const sanitizedBase = sanitizeId(base) || "tracker_preset";
  let key = sanitizedBase;
  let index = 2;
  while (settings.schemaPresets[key]) {
    key = `${sanitizedBase}_${index}`;
    index += 1;
  }
  return key;
}
function setActivePreset(settings, key) {
  settings.activeTrackerPresetKey = key;
  settings.activeSchemaPresetKey = key;
  settings.activeSchemaId = key;
}
function persistSettings(settings, validatePresetKey) {
  if (!state) return;
  presetDraftDirty = false;
  state.settings = deepMergeSettings(settings, settings.schemaPresets);
  ctxRef.sendToBackend({ type: "save_settings", settings: state.settings, ...validatePresetKey ? { validatePresetKey } : {} });
  render();
}
function getRootForAction(button) {
  return button.closest(".tracktor-root") ?? roots[0];
}
function openEditModal(chatId, messageId) {
  if (!state || !chatId || !messageId) return;
  const tracker = state.activeChat?.trackers.find((item) => item.chatId === chatId && item.messageId === messageId);
  if (!tracker) return;
  if (typeof ctxRef.ui?.showModal !== "function") {
    const next = window.prompt("Edit tracker JSON", JSON.stringify(tracker.tracker.data, null, 2));
    if (next === null) return;
    try {
      JSON.parse(next);
      sendBackend({ type: "edit_snapshot", chatId, messageId, data: next });
    } catch (error) {
      showErrorModal(error instanceof Error ? error.message : String(error));
    }
    return;
  }
  const modal = ctxRef.ui.showModal({ title: "Edit Tracker JSON", width: 720, maxHeight: 720 });
  modal.root.innerHTML = `
    <div class="tracktor-modal-body">
      <textarea class="tracktor-json-editor" spellcheck="false">${escapeHtml(JSON.stringify(tracker.tracker.data, null, 2))}</textarea>
      <div class="tracktor-actions">
        <button type="button" data-modal-action="save">Save</button>
        <button type="button" data-modal-action="cancel">Cancel</button>
      </div>
    </div>
  `;
  modal.root.addEventListener("click", (event) => {
    const action = event.target?.closest("[data-modal-action]");
    if (!action) return;
    if (action.dataset.modalAction === "cancel") {
      modal.dismiss();
      return;
    }
    const textarea = modal.root.querySelector(".tracktor-json-editor");
    if (!textarea) return;
    try {
      JSON.parse(textarea.value);
      sendBackend({ type: "edit_snapshot", chatId, messageId, data: textarea.value });
      modal.dismiss();
    } catch (error) {
      showErrorModal(error instanceof Error ? error.message : String(error));
    }
  });
}
async function confirmDelete(chatId, messageId) {
  if (!chatId || !messageId) return;
  const { confirmed } = typeof ctxRef.ui?.showConfirm === "function" ? await ctxRef.ui.showConfirm({
    title: "Delete Tracker",
    message: "Delete tracker data from this message?",
    variant: "danger",
    confirmLabel: "Delete"
  }) : { confirmed: window.confirm("Delete tracker data from this message?") };
  if (confirmed) {
    sendBackend({ type: "delete_snapshot", chatId, messageId });
  }
}
async function copyLatestSnapshot() {
  const latest = state?.activeChat?.trackers.at(-1);
  if (!latest) return;
  const text = JSON.stringify(latest.tracker.data, null, 2);
  try {
    if (typeof navigator.clipboard?.writeText !== "function") throw new Error("Clipboard API is unavailable.");
    await navigator.clipboard.writeText(text);
    showHtmlModal("Tracktor", '<p class="tracktor-muted">Latest tracker JSON copied.</p>');
  } catch {
    showHtmlModal(
      "Copy Latest Tracker",
      `<textarea class="tracktor-json-editor" readonly spellcheck="false">${escapeHtml(text)}</textarea>`
    );
  }
}
function showErrorModal(message) {
  if (typeof ctxRef.ui?.showModal !== "function") {
    window.alert(`Tracktor Error: ${message}`);
    return;
  }
  const modal = ctxRef.ui.showModal({ title: "Tracktor Error", width: 420, maxHeight: 320 });
  modal.root.innerHTML = `<p class="tracktor-error-text">${escapeHtml(message)}</p>`;
}
function showHtmlModal(title, html) {
  if (typeof ctxRef.ui?.showModal !== "function") {
    window.alert(stripDangerousHtml(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || title);
    return;
  }
  const modal = ctxRef.ui.showModal({ title, width: 720, maxHeight: 720 });
  modal.root.innerHTML = stripDangerousHtml(html);
}
function renderMessageWidgets() {
  if (!ctxRef.messages) return;
  if (!state?.activeChat) {
    for (const cleanup of widgetCleanups.values()) cleanup();
    widgetCleanups.clear();
    return;
  }
  const activeIds = new Set(state.activeChat.trackers.map((item) => item.messageId));
  for (const [messageId, cleanup] of widgetCleanups.entries()) {
    if (!activeIds.has(messageId)) {
      cleanup();
      widgetCleanups.delete(messageId);
    }
  }
  const placement = state.settings.trackerPlacement ?? "message_bottom";
  for (const tracker of state.activeChat.trackers) {
    const existing = widgetCleanups.get(tracker.messageId);
    if (existing) {
      existing();
      widgetCleanups.delete(tracker.messageId);
    }
    const widgetPosition = placement === "message_top" ? "top" : void 0;
    const cleanup = ctxRef.messages.renderWidget(
      {
        messageId: tracker.messageId,
        widgetId: "tracktor-tracker",
        html: buildWidgetHtml(tracker),
        ...widgetPosition ? { position: widgetPosition } : {}
      },
      (message) => {
        if (message?.type === "regenerate") {
          sendBackend({ type: "regenerate_tracker", chatId: tracker.chatId, messageId: tracker.messageId });
        } else if (message?.type === "edit") {
          openEditModal(tracker.chatId, tracker.messageId);
        } else if (message?.type === "delete") {
          void confirmDelete(tracker.chatId, tracker.messageId);
        }
      }
    );
    widgetCleanups.set(tracker.messageId, cleanup);
  }
  if (placement === "message_top") {
    scheduleWidgetTopRelocation();
  } else {
    cleanupWidgetTopObserver();
  }
}
function scheduleWidgetTopRelocation() {
  cleanupWidgetTopObserver();
  relocateWidgetsToTop();
  try {
    widgetTopObserver = new MutationObserver(() => {
      relocateWidgetsToTop();
    });
    widgetTopObserver.observe(document.body, { childList: true, subtree: true });
  } catch {
  }
}
function relocateWidgetsToTop() {
  if (!state?.activeChat) return;
  const widgets = Array.from(document.querySelectorAll('iframe, [data-widget-id], [class*="widget"]'));
  for (const widget of widgets) {
    const isTracktor = widget.getAttribute("data-widget-id")?.includes("tracktor") || widget.getAttribute("name")?.includes("tracktor") || widget.getAttribute("src")?.includes("tracktor") || widget.className.includes("tracktor");
    if (!isTracktor) continue;
    const widgetWrapper = widget.closest(".spindle-widget, .widget-container, [data-widget-wrapper]") || widget;
    const messageContainer = widgetWrapper.closest('.message, [data-message-id], .chat-message, [class*="message"]');
    if (messageContainer) {
      if (messageContainer.firstElementChild && messageContainer.firstElementChild !== widgetWrapper) {
        messageContainer.insertBefore(widgetWrapper, messageContainer.firstElementChild);
      }
    } else {
      const grandParent = widgetWrapper.parentElement;
      if (grandParent && grandParent.firstElementChild && grandParent.firstElementChild !== widgetWrapper) {
        grandParent.insertBefore(widgetWrapper, grandParent.firstElementChild);
      }
    }
  }
}
function cleanupWidgetTopObserver() {
  if (widgetTopObserver) {
    widgetTopObserver.disconnect();
    widgetTopObserver = null;
  }
}
function renderPinnedHud() {
  const placement = state?.settings.trackerPlacement ?? "message_bottom";
  if (placement !== "chat_top_pinned") {
    cleanupPinnedHud();
    return;
  }
  const trackers = state?.activeChat?.trackers ?? [];
  if (trackers.length === 0) {
    cleanupPinnedHud();
    return;
  }
  const latest = trackers[trackers.length - 1];
  const renderedContent = stripDangerousHtml(latest.tracker.renderedHtml);
  const hudHtml = `
    <div class="tracktor-pinned-hud" data-tracktor-pinned-hud>
      <div class="tracktor-pinned-bar">
        <button type="button" class="tracktor-pinned-toggle" title="Toggle tracker" aria-label="Toggle tracker">
          ${TRACKTOR_SMALL_ICON}
          <strong>${escapeHtml(latest.tracker.schemaName)}</strong>
          <span class="tracktor-pinned-meta">${escapeHtml(safePreview(latest.messagePreview, 50))}</span>
        </button>
        <div class="tracktor-actions tracktor-icon-actions">
          ${renderIconButton("regenerate", ICON_REGENERATE, "Regenerate tracker", { chatId: latest.chatId, messageId: latest.messageId })}
          ${renderIconButton("edit", ICON_EDIT, "Edit tracker JSON", { chatId: latest.chatId, messageId: latest.messageId })}
          ${renderIconButton("delete", ICON_DELETE, "Delete tracker", { chatId: latest.chatId, messageId: latest.messageId })}
        </div>
      </div>
      <div class="tracktor-pinned-body tracktor-rendered">
        ${renderedContent}
      </div>
    </div>
  `;
  if (pinnedHudElement) cleanupPinnedHud();
  const chatMountTargets = [
    ".chat-messages",
    ".message-list",
    "[data-chat-messages]",
    "#chat-messages",
    "main"
  ];
  let mountTarget = null;
  for (const selector of chatMountTargets) {
    mountTarget = document.querySelector(selector);
    if (mountTarget) break;
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("tracktor-pinned-wrapper");
  wrapper.innerHTML = hudHtml;
  if (mountTarget && typeof ctxRef.dom.inject === "function") {
    try {
      pinnedHudElement = ctxRef.dom.inject(mountTarget, wrapper.innerHTML, "afterbegin");
    } catch {
      pinnedHudElement = null;
    }
  }
  if (!pinnedHudElement) {
    wrapper.classList.add("tracktor-pinned-fixed");
    document.body.appendChild(wrapper);
    pinnedHudElement = wrapper;
  }
  attachPinnedHudHandlers(pinnedHudElement, latest);
  pinnedHudCleanup = () => {
    pinnedHudElement?.remove();
    pinnedHudElement = null;
    pinnedHudCleanup = null;
  };
}
function attachPinnedHudHandlers(container, tracker) {
  const toggle = container.querySelector(".tracktor-pinned-toggle");
  const body = container.querySelector(".tracktor-pinned-body");
  if (toggle && body) {
    toggle.onclick = () => {
      body.classList.toggle("tracktor-pinned-collapsed");
    };
  }
  container.onclick = (event) => {
    const button = event.target?.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    if (action === "regenerate") {
      sendBackend({ type: "regenerate_tracker", chatId: tracker.chatId, messageId: tracker.messageId });
    } else if (action === "edit") {
      openEditModal(tracker.chatId, tracker.messageId);
    } else if (action === "delete") {
      void confirmDelete(tracker.chatId, tracker.messageId);
    }
  };
}
function cleanupPinnedHud() {
  if (pinnedHudCleanup) {
    pinnedHudCleanup();
  } else if (pinnedHudElement) {
    pinnedHudElement.remove();
    pinnedHudElement = null;
  }
}
function buildWidgetHtml(item) {
  const rendered = stripDangerousHtml(item.tracker.renderedHtml);
  return `
    <style>
      body { margin: 0; color: var(--lumiverse-text, #e8e8e8); font: 13px/1.45 system-ui, sans-serif; }
      .wrap { border: 1px solid var(--lumiverse-border, #444); background: var(--lumiverse-fill-subtle, #1f1f1f); border-radius: 8px; padding: 10px; }
      .bar { display: flex; justify-content: space-between; gap: 8px; align-items: center; margin-bottom: 8px; }
      .title { font-weight: 650; }
      .meta { color: var(--lumiverse-text-muted, #aaa); font-size: 11px; }
      button { border: 1px solid var(--lumiverse-border, #444); background: var(--lumiverse-fill, #111); color: inherit; border-radius: 7px; cursor: pointer; }
      button:hover, button:focus-visible { border-color: var(--lumiverse-border-hover, #777); outline: none; }
      .actions { display: flex; gap: 5px; flex-wrap: nowrap; align-items: center; }
      .icon-button { width: 30px; height: 30px; padding: 0; display: inline-grid; place-items: center; flex: 0 0 auto; border-radius: 6px; }
      .icon-button svg { width: 15px; height: 15px; display: block; }
      table { width: 100%; border-collapse: collapse; }
      td { border-top: 1px solid var(--lumiverse-border, #444); padding: 4px 6px; vertical-align: top; }
      details { margin-top: 8px; }
      .tracktor-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
      .tracktor-grid div { border: 1px solid var(--lumiverse-border, #444); border-radius: 6px; padding: 6px; }
      .tracktor-grid strong, .tracktor-grid span, .tracktor-character span { display: block; }
      .tracktor-situation { margin: 8px 0; }
      .tracktor-character { border-top: 1px solid var(--lumiverse-border, #444); padding: 6px 0; }
    </style>
    <div class="wrap">
      <div class="bar">
        <div>
          <div class="title">${escapeHtml(item.tracker.schemaName)}</div>
          <div class="meta">${escapeHtml(safePreview(item.messagePreview, 80))}</div>
        </div>
        <div class="actions">
          <button class="icon-button" data-action="regenerate" title="Regenerate tracker" aria-label="Regenerate tracker">${ICON_REGENERATE}</button>
          <button class="icon-button" data-action="edit" title="Edit tracker JSON" aria-label="Edit tracker JSON">${ICON_EDIT}</button>
          <button class="icon-button" data-action="delete" title="Delete tracker" aria-label="Delete tracker">${ICON_DELETE}</button>
        </div>
      </div>
      ${rendered}
    </div>
    <script>
      document.addEventListener('click', function (event) {
        var button = event.target.closest('[data-action]');
        if (!button) return;
        window.spindleSandbox.postMessage({ type: button.getAttribute('data-action') });
      });
      window.spindleSandbox.requestResize();
    <\/script>
  `;
}
var TRACKTOR_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4 5h11a3 3 0 0 1 3 3v1h1.2a2 2 0 0 1 1.8 1.1l1 2V17h-2.1a3 3 0 0 1-5.8 0H10a3 3 0 0 1-5.8 0H2V7a2 2 0 0 1 2-2Zm0 2v8h.8a3 3 0 0 1 4.4 0H14V8a1 1 0 0 0-1-1H4Zm12 4v4h.8a3 3 0 0 1 1.6-.8h1.6v-1.7l-.7-1.5H16ZM7 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>';
var TRACKTOR_SMALL_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M4 5h11a3 3 0 0 1 3 3v1h1.2a2 2 0 0 1 1.8 1.1l1 2V17h-2.1a3 3 0 0 1-5.8 0H10a3 3 0 0 1-5.8 0H2V7a2 2 0 0 1 2-2Z"/></svg>';
var ICON_REGENERATE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.7 6.3A8 8 0 1 0 20 12h-2a6 6 0 1 1-1.76-4.24L13 11h8V3l-3.3 3.3Z"/></svg>';
var ICON_EDIT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 17.25V20h2.75L17.8 8.95 15.05 6.2 4 17.25Zm15.7-10.1a1 1 0 0 0 0-1.42l-1.43-1.43a1 1 0 0 0-1.42 0l-1.1 1.1 2.75 2.75 1.2-1Z"/></svg>';
var ICON_DELETE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 21a2 2 0 0 1-2-2V7h14v12a2 2 0 0 1-2 2H7ZM9 4h6l1 1h4v2H4V5h4l1-1Zm0 6v8h2v-8H9Zm4 0v8h2v-8h-2Z"/></svg>';
var ICON_STOP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 6h12v12H6z"/></svg>';
var STYLES = `
  .tracktor-root { height: 100%; overflow: auto; color: var(--lumiverse-text); }
  .tracktor-settings-surface {
    min-height: 0;
    padding-block: 8px;
  }
  .tracktor-floating-launcher {
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 2147483000;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--lumiverse-border, #444);
    background: var(--lumiverse-fill-subtle, #202020);
    color: var(--lumiverse-text, #fff);
    border-radius: 999px;
    padding: 8px 11px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, .24);
    cursor: pointer;
    font: 12px/1 system-ui, sans-serif;
  }
  .tracktor-floating-launcher:hover { border-color: var(--lumiverse-border-hover, #777); }
  .tracktor-floating-launcher.has-tracktor-badge::after {
    content: attr(data-tracktor-badge);
    min-width: 16px;
    height: 16px;
    border-radius: 999px;
    display: inline-grid;
    place-items: center;
    padding: 0 4px;
    background: var(--lumiverse-accent, #58a6ff);
    color: var(--lumiverse-accent-fg, #fff);
    font-size: 10px;
    font-weight: 700;
  }
  .tracktor-fallback-panel {
    position: fixed;
    right: 16px;
    bottom: 58px;
    z-index: 2147482999;
    width: min(560px, calc(100vw - 24px));
    max-height: min(760px, calc(100vh - 84px));
    display: none;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--lumiverse-border, #444);
    background: var(--lumiverse-fill, #161616);
    color: var(--lumiverse-text, #fff);
    border-radius: 10px;
    box-shadow: 0 18px 48px rgba(0, 0, 0, .35);
  }
  .tracktor-fallback-shell.is-open .tracktor-fallback-panel { display: flex; }
  .tracktor-fallback-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px;
    border-bottom: 1px solid var(--lumiverse-border, #444);
  }
  .tracktor-fallback-close {
    border: 1px solid var(--lumiverse-border, #444);
    background: var(--lumiverse-fill-subtle, #202020);
    color: inherit;
    border-radius: 6px;
    padding: 5px 8px;
    cursor: pointer;
  }
  .tracktor-fallback-body {
    overflow: auto;
  }
  .tracktor-shell { display: flex; flex-direction: column; gap: 10px; padding: 10px; }
  .tracktor-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    border-bottom: 1px solid var(--lumiverse-border);
    padding-bottom: 10px;
  }
  .tracktor-header span {
    display: block;
    color: var(--lumiverse-text-muted);
    font-size: 11px;
    margin-top: 2px;
  }
  .tracktor-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: flex-end;
  }
  .tracktor-tab-button {
    border: 1px solid var(--lumiverse-border);
    border-radius: 6px;
    padding: 4px 6px;
    color: var(--lumiverse-text);
    background: var(--lumiverse-fill-subtle);
    cursor: pointer;
    font: inherit;
  }
  .tracktor-tab-button.is-active {
    border-color: var(--lumiverse-accent, #58a6ff);
    color: var(--lumiverse-accent, #58a6ff);
  }
  .tracktor-tab-button:focus-visible {
    outline: 2px solid var(--lumiverse-accent, #58a6ff);
    outline-offset: 2px;
  }
  .tracktor-section { border-top: 1px solid var(--lumiverse-border); padding-top: 10px; }
  .tracktor-section:first-child { border-top: 0; padding-top: 0; }
  .tracktor-section h2 { font-size: 13px; margin: 0 0 8px; font-weight: 650; }
  .tracktor-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .tracktor-toolbar span, .tracktor-item-head span { display: block; color: var(--lumiverse-text-muted); font-size: 11px; margin-top: 2px; }
  .tracktor-actions { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
  .tracktor-actions button, .tracktor-section select, .tracktor-section input, .tracktor-section textarea {
    border: 1px solid var(--lumiverse-border);
    background: var(--lumiverse-fill);
    color: var(--lumiverse-text);
    border-radius: 6px;
  }
  .tracktor-actions button { padding: 6px 9px; cursor: pointer; }
  .tracktor-actions button:hover { border-color: var(--lumiverse-border-hover); }
  .tracktor-actions button:disabled { opacity: .45; cursor: default; }
  .tracktor-primary-actions { margin-top: 8px; }
  .tracktor-icon-actions { flex-wrap: nowrap; }
  .tracktor-icon-button {
    width: 30px;
    height: 30px;
    padding: 0 !important;
    display: inline-grid;
    place-items: center;
    flex: 0 0 auto;
    border-radius: 6px !important;
  }
  .tracktor-icon-button svg { width: 15px; height: 15px; display: block; }
  .tracktor-icon-button:focus-visible { outline: 2px solid var(--lumiverse-accent); outline-offset: 2px; }
  .tracktor-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .tracktor-common-controls { align-items: end; }
  .tracktor-field-note { display: flex; flex-direction: column; gap: 4px; }
  .tracktor-compact-warning { margin-bottom: 4px; padding: 6px; }
  .tracktor-details {
    border: 1px solid var(--lumiverse-border);
    background: var(--lumiverse-fill-subtle);
    border-radius: 8px;
    padding: 8px;
    margin-top: 8px;
  }
  .tracktor-details > summary {
    cursor: pointer;
    font-size: 12px;
    font-weight: 650;
    color: var(--lumiverse-text);
  }
  .tracktor-details[open] > summary { margin-bottom: 8px; }
  .tracktor-advanced-inline { font-size: 11px; color: var(--lumiverse-text-muted); }
  .tracktor-diagnostic-line, .tracktor-muted { margin: 6px 0 0; color: var(--lumiverse-text-muted); font-size: 12px; }
  .tracktor-field-hint { display: block; color: var(--lumiverse-text-muted); font-size: 10px; }
  .tracktor-preview {
    border: 1px solid var(--lumiverse-border, #444);
    background: var(--lumiverse-fill-subtle, #1f1f1f);
    border-radius: 8px;
    padding: 10px;
    max-height: 520px;
    overflow: auto;
  }
  .tracktor-section label { display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--lumiverse-text-muted); margin-bottom: 8px; }
  .tracktor-check { flex-direction: row !important; align-items: center; color: var(--lumiverse-text) !important; }
  .tracktor-common-check { min-height: 30px; margin-bottom: 0 !important; }
  .tracktor-section input, .tracktor-section select { min-height: 30px; padding: 4px 7px; }
  .tracktor-section textarea { width: 100%; resize: vertical; padding: 7px; font: 12px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; box-sizing: border-box; }
  .tracktor-list { display: flex; flex-direction: column; gap: 8px; }
  .tracktor-item { border: 1px solid var(--lumiverse-border); background: var(--lumiverse-fill-subtle); border-radius: 8px; padding: 9px; }
  .tracktor-item-head { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
  .tracktor-rendered { font-size: 12px; }
  .tracktor-parts { margin: 7px 0; }
  .tracktor-parts summary { cursor: pointer; font-size: 12px; color: var(--lumiverse-text-muted); }
  .tracktor-rendered table { width: 100%; border-collapse: collapse; }
  .tracktor-rendered td { border-top: 1px solid var(--lumiverse-border); padding: 4px 6px; vertical-align: top; }
  .tracktor-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
  .tracktor-grid div { border: 1px solid var(--lumiverse-border); border-radius: 6px; padding: 6px; }
  .tracktor-grid strong, .tracktor-grid span, .tracktor-character span { display: block; }
  .tracktor-situation { margin: 8px 0; }
  .tracktor-character { border-top: 1px solid var(--lumiverse-border); padding: 6px 0; }
  .tracktor-warning, .tracktor-error, .tracktor-busy, .tracktor-empty {
    border: 1px solid var(--lumiverse-border);
    background: var(--lumiverse-fill-subtle);
    border-radius: 8px;
    padding: 8px;
    font-size: 12px;
  }
  .tracktor-warning { color: #d8a72d; }
  .tracktor-error, .tracktor-error-text { color: #e46c6c; }
  .tracktor-busy { color: var(--lumiverse-accent); }
  .tracktor-diagnostics {
    border: 1px solid var(--lumiverse-border);
    background: var(--lumiverse-fill-subtle);
    border-radius: 8px;
    padding: 8px;
    font-size: 12px;
  }
  .tracktor-diagnostics p { margin: 6px 0 0; color: var(--lumiverse-text-muted); }
  .tracktor-modal-body { display: flex; flex-direction: column; gap: 8px; }
  .tracktor-json-editor { min-height: 420px; width: 100%; box-sizing: border-box; font: 12px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  .tracktor-pinned-wrapper {
    position: relative;
    z-index: 100;
  }
  .tracktor-pinned-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2147483000;
    pointer-events: auto;
  }
  .tracktor-pinned-hud {
    border: 1px solid var(--lumiverse-border, #444);
    background: var(--lumiverse-fill-subtle, #1a1a1a);
    color: var(--lumiverse-text, #e8e8e8);
    border-radius: 0 0 10px 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, .3);
    font: 12px/1.45 system-ui, sans-serif;
    overflow: hidden;
  }
  .tracktor-pinned-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 6px 10px;
    border-bottom: 1px solid var(--lumiverse-border, #444);
  }
  .tracktor-pinned-toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: none;
    background: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    font: inherit;
    min-width: 0;
  }
  .tracktor-pinned-toggle:hover { opacity: .8; }
  .tracktor-pinned-toggle strong { font-weight: 650; white-space: nowrap; }
  .tracktor-pinned-meta {
    color: var(--lumiverse-text-muted, #aaa);
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 180px;
  }
  .tracktor-pinned-body {
    padding: 8px 10px;
    max-height: 240px;
    overflow: auto;
    transition: max-height .2s ease, padding .2s ease;
  }
  .tracktor-pinned-collapsed {
    max-height: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    overflow: hidden;
  }
  .tracktor-dom-toolbar-btn {
    background: transparent;
    border: none;
    color: var(--lumiverse-text-muted, #aaa);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 38px;
    height: 38px;
    border-radius: 20px;
    padding: 0 9px;
    margin: 0 4px;
    transition: all 0.2s ease;
    gap: 6px;
    box-sizing: border-box;
  }
  .tracktor-dom-toolbar-btn:hover {
    background: var(--lumiverse-fill-subtle, rgba(255,255,255,0.1));
    color: var(--lumiverse-text, #fff);
  }
  .tracktor-dom-toolbar-btn.tracktor-dom-busy {
    color: #e46c6c;
    animation: tracktor-pulse 1.5s infinite;
  }
  .tracktor-dom-toolbar-btn svg {
    width: 20px;
    height: 20px;
    flex: 0 0 auto;
  }
  .tracktor-dom-progress-text {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }
  @keyframes tracktor-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  @media (max-width: 680px) {
    .tracktor-toolbar, .tracktor-item-head { flex-direction: column; align-items: stretch; }
    .tracktor-item-head .tracktor-icon-actions { align-self: flex-start; }
    .tracktor-form-grid, .tracktor-grid { grid-template-columns: 1fr; }
    .tracktor-pinned-meta { max-width: 100px; }
    .tracktor-pinned-body { max-height: 180px; }
  }
`;
export {
  setup
};
/*! Bundled license information:

handlebars/dist/handlebars.js:
  (**!
  
   @license
   handlebars v4.7.9
  
  Copyright (C) 2011-2019 by Yehuda Katz
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
  
  *)
*/
