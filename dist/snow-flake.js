/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SnowFlake", [], factory);
	else if(typeof exports === 'object')
		exports["SnowFlake"] = factory();
	else
		root["SnowFlake"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/snowFlake.ts":
/*!**************************!*\
  !*** ./src/snowFlake.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SnowFlake\": () => /* binding */ SnowFlake,\n/* harmony export */   \"SnowFall\": () => /* binding */ SnowFall\n/* harmony export */ });\nvar random_between = function (min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n};\n\nvar map = function (value, start1, stop1, start2, stop2) {\n  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));\n};\n\nvar random_color = function () {\n  return Math.floor(Math.random() * 16777215).toString(16);\n};\n\nvar SNOWFLAKE_SVG = \" <svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'>\\n                        <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' height='100%' width='100%'\\n                        d='M256 32v448M313.72 80A111.47 111.47 0 01256 96a111.47 111.47 0 01-57.72-16M198.28 432a112.11 112.11 0 01115.44 0M449.99 144L62.01 368M437.27 218a112.09 112.09 0 01-57.71-100M74.73 294a112.09 112.09 0 0157.71 100M62.01 144l387.98 224M74.73 218a112.09 112.09 0 0057.71-100M437.27 294a112.09 112.09 0 00-57.71 100' />\\n                        </svg>\";\nvar default_configs = {\n  flake: SNOWFLAKE_SVG,\n  max_z_index: 20,\n  start_y: -30,\n  vertical_speed: 150,\n  horizontal_speed: 75,\n  speed_delta: 100,\n  min_scale: 0.4,\n  max_scale: 1.6,\n  flake_height: 25,\n  flake_width: 25,\n  color: 'white',\n  rotation: 90\n};\n\nvar SnowFlake =\n/** @class */\nfunction () {\n  function SnowFlake(options) {\n    if (options === void 0) {\n      options = {};\n    }\n\n    this.config = Object.assign(SnowFlake.DEFAULT_CONFIG, options);\n    this._y = this.config.start_y;\n    this._z = random_between(1, this.config.max_z_index);\n    this._node = SnowFlake.cloneElement();\n    debugger;\n    this.vertical_speed = this._mapToZindex(this.config.vertical_speed - this.config.speed_delta, this.config.vertical_speed);\n    this.horizontal_speed = this._mapToZindex(this.config.horizontal_speed - this.config.speed_delta, this.config.horizontal_speed);\n    this.scale = this._mapToZindex(this.config.min_scale, this.config.max_scale);\n    this._node.style.position = 'fixed';\n\n    this._init();\n  }\n\n  SnowFlake.config = function (config) {\n    if (config === void 0) {\n      config = {};\n    }\n\n    this.DEFAULT_CONFIG = Object.assign(this.DEFAULT_CONFIG, config);\n  };\n\n  SnowFlake.parseSVG = function () {\n    if (!this._flake) {\n      this._flake = new DOMParser().parseFromString(SnowFlake.DEFAULT_CONFIG.flake, 'text/xml').children[0];\n    }\n\n    return this._flake;\n  };\n\n  SnowFlake.cloneElement = function () {\n    return SnowFlake.parseSVG().cloneNode(true);\n  };\n\n  SnowFlake.prototype.restart = function () {\n    this._init();\n\n    this.animate();\n  };\n\n  SnowFlake.prototype._init = function () {\n    this._x = random_between(-this.horizontal_speed, document.body.offsetWidth);\n    this._node.style.top = this._y + \"px\";\n    this._node.style.left = this._x + \"px\";\n    this._node.style.transform = \"scale(\" + this.scale + \", \" + this.scale + \")\";\n    this._node.style.width = this.config.flake_width + \"px\";\n    this._node.style.height = this.config.flake_height + \"px\";\n    this.setColor();\n  };\n\n  SnowFlake.prototype.animate = function () {\n    var x_delta = 2;\n\n    var v_animation = this._node.animate({\n      transform: \"translate(\" + random_between(0, this.horizontal_speed) + \"px,\" + (window.innerHeight + 50) + \"px) rotate(\" + random_between(0, this.config.rotation) + \"deg)\\n                            \"\n    }, {\n      duration: this._animation_duration(),\n      iterations: 1,\n      delay: random_between(0, 2000)\n    });\n\n    v_animation.onfinish = function (_this) {\n      return function () {\n        _this.restart();\n      };\n    }(this);\n  };\n\n  SnowFlake.prototype.setColor = function (color) {\n    color = color || this.config.color;\n    this._node.style.color = color == 'random' ? random_color() : color;\n  };\n\n  SnowFlake.prototype.append = function () {\n    document.body.append(this._node);\n  };\n\n  SnowFlake.prototype._animation_duration = function () {\n    return window.innerHeight / this.vertical_speed * 1000;\n  };\n\n  SnowFlake.prototype._mapToZindex = function (start, end) {\n    return map(this._z, 1, this.config.max_z_index, start, end);\n  };\n\n  SnowFlake.DEFAULT_CONFIG = default_configs;\n  SnowFlake._flake = null;\n  return SnowFlake;\n}();\n\n\n\nvar SnowFall =\n/** @class */\nfunction () {\n  function SnowFall(count) {\n    if (count === void 0) {\n      count = 100;\n    }\n\n    this.count = count;\n  }\n\n  SnowFall.prototype.start = function () {\n    for (var i = 0; i < this.count; i++) {\n      var flake = new SnowFlake(); // @ts-ignore\n\n      flake.append(window.document.body);\n      flake.animate();\n    }\n  };\n\n  return SnowFall;\n}();\n\n\n\n//# sourceURL=webpack://SnowFlake/./src/snowFlake.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/snowFlake.ts");
/******/ })()
;
});