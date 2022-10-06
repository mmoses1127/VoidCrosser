/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './moving_object.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nconst Astronaut = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './astronaut.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nconst Game = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './game.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nconst GameView = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './game_view.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nconst Debris = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './debris.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  const canvas = document.getElementById('game-canvas');\n  const ctx = canvas.getContext('2d');\n  canvas.style.backgroundColor = 'black';\n  const gameView = new GameView(ctx);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsWUFBWSxHQUFHQyxtQkFBTyxDQUFDLGlKQUFELENBQTVCOztBQUNBLE1BQU1DLFNBQVMsR0FBR0QsbUJBQU8sQ0FBQyw2SUFBRCxDQUF6Qjs7QUFDQSxNQUFNRSxJQUFJLEdBQUdGLG1CQUFPLENBQUMsd0lBQUQsQ0FBcEI7O0FBQ0EsTUFBTUcsUUFBUSxHQUFHSCxtQkFBTyxDQUFDLDZJQUFELENBQXhCOztBQUNBLE1BQU1JLE1BQU0sR0FBR0osbUJBQU8sQ0FBQywwSUFBRCxDQUF0Qjs7QUFFQUssUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztFQUVyRCxNQUFNQyxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixhQUF4QixDQUFmO0VBQ0EsTUFBTUMsR0FBRyxHQUFHRixNQUFNLENBQUNHLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtFQUNBSCxNQUFNLENBQUNJLEtBQVAsQ0FBYUMsZUFBYixHQUE2QixPQUE3QjtFQUVBLE1BQU1DLFFBQVEsR0FBRyxJQUFJVixRQUFKLENBQWFNLEdBQWIsQ0FBakI7QUFFSCxDQVJEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanNfcHJvamVjdC8uL3NyYy9pbmRleC5qcz9iNjM1Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IE1vdmluZ09iamVjdCA9IHJlcXVpcmUoJy4vbW92aW5nX29iamVjdC5qcycpO1xuY29uc3QgQXN0cm9uYXV0ID0gcmVxdWlyZSgnLi9hc3Ryb25hdXQuanMnKTtcbmNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL2dhbWUuanMnKTtcbmNvbnN0IEdhbWVWaWV3ID0gcmVxdWlyZSgnLi9nYW1lX3ZpZXcuanMnKTtcbmNvbnN0IERlYnJpcyA9IHJlcXVpcmUoXCIuL2RlYnJpcy5qc1wiKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtY2FudmFzJyk7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY2FudmFzLnN0eWxlLmJhY2tncm91bmRDb2xvcj0nYmxhY2snO1xuXG4gICAgY29uc3QgZ2FtZVZpZXcgPSBuZXcgR2FtZVZpZXcoY3R4KTtcblxufSkiXSwibmFtZXMiOlsiTW92aW5nT2JqZWN0IiwicmVxdWlyZSIsIkFzdHJvbmF1dCIsIkdhbWUiLCJHYW1lVmlldyIsIkRlYnJpcyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiZ2FtZVZpZXciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0Ly4vc3JjL2luZGV4LnNjc3M/OTc0NSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;