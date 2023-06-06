/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/src/marketing-popup.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/src/components/_marketing-popup.ts":
/*!******************************************************!*\
  !*** ./assets/js/src/components/_marketing-popup.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2 */ "sweetalert2");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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

var MarketingPopup = (function () {
    function MarketingPopup(settings) {
        this.settings = settings;
        this.key = '';
        if (!window.hasOwnProperty('atum') ||
            (window.hasOwnProperty('atum') && !window['atum'].hasOwnProperty('AdminModal'))) {
            this.getPopupInfo();
        }
    }
    MarketingPopup.prototype.getPopupInfo = function () {
        var _this = this;
        $.ajax({
            url: window['ajaxurl'],
            dataType: 'json',
            method: 'post',
            data: {
                action: 'atum_get_marketing_popup_info',
                security: this.settings.get('nonce'),
            },
            success: function (response) { return __awaiter(_this, void 0, void 0, function () {
                var popupSettings, descriptionColor, descriptionFontSize, descriptionAlign, descriptionPadding, description, titleColor, titleFontSize, titleAlign, hoverButtons, imageTopLeft, footerNoticeStyle, footerNotice, logo, versionColor, versionBackground, version, buttons_1, title;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(response.success === true)) return [3, 2];
                            popupSettings = response.data, descriptionColor = popupSettings.description.text_color ? "color:".concat(popupSettings.description.text_color, ";") : '', descriptionFontSize = popupSettings.description.text_size ? "font-size:".concat(popupSettings.description.text_size, ";") : '', descriptionAlign = popupSettings.description.text_align ? "text-align:".concat(popupSettings.description.text_align, ";") : '', descriptionPadding = popupSettings.description.padding ? "padding:".concat(popupSettings.description.padding, ";") : '', description = "<p style=\"".concat(descriptionColor + descriptionFontSize + descriptionAlign + descriptionPadding, "\">").concat(popupSettings.description.text, "</p>"), titleColor = popupSettings.title.text_color ? "color:".concat(popupSettings.title.text_color, ";") : '', titleFontSize = popupSettings.title.text_size ? "font-size:".concat(popupSettings.title.text_size, ";") : '', titleAlign = popupSettings.title.text_align ? "text-align:".concat(popupSettings.title.text_align, ";") : '', hoverButtons = popupSettings.hoverButtons || '', imageTopLeft = popupSettings.images.top_left, footerNoticeStyle = popupSettings.footerNotice.bg_color ? " style=\"background-color:".concat(popupSettings.footerNotice.bg_color, ";\"") : '', footerNotice = popupSettings.footerNotice.text ? "<div class=\"footer-notice\"".concat(footerNoticeStyle, ">").concat(popupSettings.footerNotice.text, "</div>") : '';
                            this.key = popupSettings.transient_key;
                            logo = "<img class=\"mp-logo\" src=\"".concat(popupSettings.images.logo, "\">"), versionColor = '', versionBackground = '', version = '', buttons_1 = '';
                            if (popupSettings.images.hasOwnProperty('logo_css') && popupSettings.images.logo_css) {
                                logo = logo.replace('>', " style=\"".concat(popupSettings.images.logo_css, "\">"));
                            }
                            if (popupSettings.version && Object.keys(popupSettings.version).length) {
                                versionColor = popupSettings.version.text_color ? "color:".concat(popupSettings.version.text_color, ";") : '';
                                versionBackground = popupSettings.version.background ? "background:".concat(popupSettings.version.background, ";") : '';
                                version = "<span class=\"version\" style=\"".concat(versionBackground + versionColor, "\">").concat(popupSettings.version.text, "</span>");
                            }
                            title = popupSettings.title.text ? "<h1 style=\"".concat(titleColor + titleFontSize + titleAlign, "\"><span>").concat(popupSettings.title.text + version, "</span></h1>") : '';
                            if (popupSettings.buttons && popupSettings.buttons.length) {
                                if (hoverButtons) {
                                    $(hoverButtons).appendTo('body');
                                }
                                popupSettings.buttons.forEach(function (button) {
                                    buttons_1 += "<button data-url=\"".concat(button.url, "\" class=\"").concat(button.class, " popup-button\" style=\"").concat(button.css, "\">").concat(button.text, "</button>");
                                });
                            }
                            $('body').on('click', '.swal2-container button[data-url]', function (evt) {
                                evt.preventDefault();
                                window.open($(evt.currentTarget).data('url'), '_blank');
                            });
                            return [4, sweetalert2__WEBPACK_IMPORTED_MODULE_0___default.a.fire({
                                    width: 520,
                                    padding: null,
                                    customClass: {
                                        popup: 'marketing-popup',
                                    },
                                    background: popupSettings.background,
                                    showCloseButton: true,
                                    showConfirmButton: false,
                                    html: logo + title + description + buttons_1 + footerNotice,
                                    imageUrl: imageTopLeft,
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    allowEnterKey: false,
                                }).then(function () {
                                    _this.hideMarketingPopup();
                                })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2];
                    }
                });
            }); },
        });
    };
    MarketingPopup.prototype.hideMarketingPopup = function () {
        $.ajax({
            url: window['ajaxurl'],
            dataType: 'json',
            method: 'post',
            data: {
                action: 'atum_hide_marketing_popup',
                security: this.settings.get('nonce'),
                transientKey: this.key,
            },
        });
    };
    return MarketingPopup;
}());
/* harmony default export */ __webpack_exports__["default"] = (MarketingPopup);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./assets/js/src/config/_settings.ts":
/*!*******************************************!*\
  !*** ./assets/js/src/config/_settings.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Settings = (function () {
    function Settings(varName, defaults) {
        if (defaults === void 0) { defaults = {}; }
        this.varName = varName;
        this.defaults = defaults;
        this.settings = {};
        var localizedOpts = typeof window[varName] !== 'undefined' ? window[varName] : {};
        Object.assign(this.settings, defaults, localizedOpts);
    }
    Settings.prototype.get = function (prop) {
        if (typeof this.settings[prop] !== 'undefined') {
            return this.settings[prop];
        }
        return undefined;
    };
    Settings.prototype.getAll = function () {
        return this.settings;
    };
    Settings.prototype.delete = function (prop) {
        if (this.settings.hasOwnProperty(prop)) {
            delete this.settings[prop];
        }
    };
    return Settings;
}());
/* harmony default export */ __webpack_exports__["default"] = (Settings);


/***/ }),

/***/ "./assets/js/src/marketing-popup.ts":
/*!******************************************!*\
  !*** ./assets/js/src/marketing-popup.ts ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var _components_marketing_popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/_marketing-popup */ "./assets/js/src/components/_marketing-popup.ts");
/* harmony import */ var _config_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/_settings */ "./assets/js/src/config/_settings.ts");


jQuery(function ($) {
    var settings = new _config_settings__WEBPACK_IMPORTED_MODULE_1__["default"]('atumMarketingPopupVars');
    new _components_marketing_popup__WEBPACK_IMPORTED_MODULE_0__["default"](settings);
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ "sweetalert2":
/*!***********************!*\
  !*** external "Swal" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Swal;

/***/ })

/******/ });
//# sourceMappingURL=atum-marketing-popup.js.map