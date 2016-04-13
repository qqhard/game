/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createOperIco = __webpack_require__(2);

	var _createOperIco2 = _interopRequireDefault(_createOperIco);

	var _OperBoard = __webpack_require__(3);

	var _OperBoard2 = _interopRequireDefault(_OperBoard);

	var _Listener = __webpack_require__(11);

	var _Listener2 = _interopRequireDefault(_Listener);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	    var operateIco = null;
	    var operateBoard = null;
	    var listener = new _Listener2.default();
	    $(document).on('mouseover.veditdiv', '.veditdiv', function (event) {
	        event.stopPropagation();
	        if (operateIco != null) operateIco.remove();
	        var pleft = event.target.offsetLeft;
	        var ptop = event.target.offsetTop;
	        operateIco = (0, _createOperIco2.default)(pleft, ptop);
	        $(event.target).append(operateIco);
	    });
	    $(document).on('mouseover.veditdiv mouseout.veditdiv', '.veditdiv_control_ico', function (event) {
	        if (event.type == 'mouseover') {
	            event.stopPropagation();
	            $(event.target).css({
	                "cursor": "pointer"
	            });
	        } else if (event.type == 'mouseout') {
	            $(event.target).css({
	                "cursor": "auto"
	            });
	        }
	    });
	    $(document).on('click.veditdiv', '.veditdiv_control_ico', function (event) {
	        console.log('click');
	        event.stopPropagation();
	        listener.setOperDiv($(this).parent());
	        if (operateBoard == null) {
	            operateBoard = new _OperBoard2.default(listener);
	        }
	        operateBoard.showBoard();
	        $(event.target).remove();
	        operateBoard.initOperBoard();
	        return false;
	    });
	})();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = createOperIco;
	function createOperIco(pleft, ptop) {
	    var operIco = $("<a>C</a>");
	    operIco.css({
	        "opacity": 0.6,
	        "background-color": "#663300",
	        "height": 15,
	        "width": 15,
	        "position": "absolute",
	        "left": pleft,
	        "top": ptop,
	        "color": "#ffffff",
	        "font-size": 12
	    });
	    operIco.attr("class", "veditdiv_control_ico");
	    return operIco;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _HiddenIco = __webpack_require__(4);

	var _HiddenIco2 = _interopRequireDefault(_HiddenIco);

	var _QuitIco = __webpack_require__(6);

	var _QuitIco2 = _interopRequireDefault(_QuitIco);

	var _SaveIco = __webpack_require__(7);

	var _SaveIco2 = _interopRequireDefault(_SaveIco);

	var _TextChanger = __webpack_require__(8);

	var _TextChanger2 = _interopRequireDefault(_TextChanger);

	var _HrefChanger = __webpack_require__(10);

	var _HrefChanger2 = _interopRequireDefault(_HrefChanger);

	var _FontFamliyChanger = __webpack_require__(12);

	var _FontFamliyChanger2 = _interopRequireDefault(_FontFamliyChanger);

	var _Label = __webpack_require__(13);

	var _Label2 = _interopRequireDefault(_Label);

	var _FontSizeChanger = __webpack_require__(14);

	var _FontSizeChanger2 = _interopRequireDefault(_FontSizeChanger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var OperBoard = function () {
	    function OperBoard(listener) {
	        _classCallCheck(this, OperBoard);

	        this.listener = listener;
	        this.objOperBoard = function () {
	            var operBoard = $("<div></div>");
	            operBoard.css(_defineProperty({
	                "background-color": "rgba(0,0,0,0.5)",
	                "position": "absolute",
	                "left": 0,
	                "border-top-right-radius": 10,
	                "border-bottom-right-radius": 10,
	                "width": 0,
	                "height": "100%",
	                "z-index": 9999,
	                "padding-right": "8px"
	            }, 'position', "fixed"));
	            operBoard.attr("class", "veditdiv_control_board");
	            operBoard.attr("hidden", true);
	            $('body').prepend(operBoard);
	            return operBoard;
	        }();
	        this.objOperBoard.append(new _HiddenIco2.default(this.objOperBoard));
	        this.objOperBoard.append(new _QuitIco2.default(this));
	        this.objOperBoard.append(new _SaveIco2.default());

	        this.objInputTextArea = new _TextChanger2.default();
	        this.objOperBoard.append(new _Label2.default('文字内容'));
	        this.objOperBoard.append(this.objInputTextArea);
	        this.listener.onTextChange(this.objInputTextArea);

	        this.objHrefTextArea = new _HrefChanger2.default();
	        this.listener.onAttrChange(this.objHrefTextArea, 'href');
	        this.objOperBoard.append(new _Label2.default('超链接'));
	        this.objOperBoard.append(this.objHrefTextArea);

	        this.fontFamliy = new _FontFamliyChanger2.default();
	        this.listener.onSelectCssChange(this.fontFamliy, 'font-family');
	        this.objOperBoard.append(new _Label2.default('字体'));
	        this.objOperBoard.append(this.fontFamliy);

	        this.fontSize = new _FontSizeChanger2.default();
	        this.listener.onSelectCssChange(this.fontSize, 'font-size');
	        this.objOperBoard.append(new _Label2.default('字号'));
	        this.objOperBoard.append(this.fontSize);
	        // if(this.objOperDiv[0].tagName == 'A'){
	        //     this.objHrefInput = new HrefChanger(this.objOperBoard);
	        //     this.objOperBoard.append(this.objHrefInput);
	        // }
	    }

	    _createClass(OperBoard, [{
	        key: 'setOperDiv',
	        value: function setOperDiv(operDiv) {
	            this.objOperDiv = operDiv;
	        }
	    }, {
	        key: 'getOperDiv',
	        value: function getOperDiv() {
	            return this.objOperDiv;
	        }
	    }, {
	        key: 'showBoard',
	        value: function showBoard() {
	            this.objOperBoard.attr("hidden", false);
	            this.objOperBoard.css('overflow', 'auto');
	            this.objOperBoard.css({
	                width: 250
	            });
	            $(".initpos").trigger("initPos");
	        }
	    }, {
	        key: 'hiddenBoard',
	        value: function hiddenBoard() {
	            this.objOperBoard.css('overflow', 'hidden');
	            this.objOperBoard.css("width", 0);
	            this.objOperBoard.attr("hidden", true);
	        }
	    }, {
	        key: 'initOperBoard',
	        value: function initOperBoard() {
	            this.listener.onTextInit(this.objInputTextArea);
	            this.listener.onAttrInit(this.objHrefTextArea, 'href');
	            // if(this.objOperDiv[0].tagName == 'A'){
	            //    
	            //     this.objHrefInput.val(this.objOperDiv.attr('href'));
	            // }else {
	            //     if(!!this.objHrefInput)this.objHrefInput.remove();
	            // }
	            $(".initdata").trigger("initData");
	        }
	    }]);

	    return OperBoard;
	}();

	exports.default = OperBoard;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createIco = __webpack_require__(5);

	var _createIco2 = _interopRequireDefault(_createIco);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HiddenIco = function HiddenIco(operBoard) {
	    _classCallCheck(this, HiddenIco);

	    var self = (0, _createIco2.default)('hidden');
	    self.on("mouseover.veditdiv mouseout.veditdiv", function (event) {
	        event.stopPropagation();
	        if (event.type == "mouseover") {
	            self.css("cursor", "pointer");
	            operBoard.css("opacity", 0);
	        } else if (event.type == "mouseout") {
	            self.css("cursor", "auto");
	            operBoard.css("opacity", 1);
	        }
	    }.bind(this));
	    return self;
	};

	exports.default = HiddenIco;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = createIco;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function createIco(instr) {
	    var _hidButton$css;

	    var hidButton = $("<div>" + instr + "</div>");
	    hidButton.css((_hidButton$css = {

	        'display': "inline-block",
	        'margin-left': 2,
	        'margin-top': 1,
	        'background-color': "rgba(33,33,33,0.4ss)",
	        'border': 'solid 2px #999999',
	        "color": "#ffffff",
	        "border-radius": 5,
	        'box-align': "auto",
	        "overflow": "auto"
	    }, _defineProperty(_hidButton$css, "margin-top", "auto"), _defineProperty(_hidButton$css, "margin-buttom", "auto"), _hidButton$css));

	    $(document).on('mouseover.veditdiv mouseout.valseek_mouse', hidButton, function (event) {
	        if (event.type == 'mouseover') {
	            hidButton.css("cursor", "pointer");
	        } else if (event.type == "mouseout") {
	            hidButton.css('cursor', 'auto');
	        }
	    });
	    return hidButton;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createIco = __webpack_require__(5);

	var _createIco2 = _interopRequireDefault(_createIco);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var QuitIco = function QuitIco(operBoard) {
	    _classCallCheck(this, QuitIco);

	    var self = (0, _createIco2.default)("close");
	    self.on("mouseover.veditdiv mouseout.veditdiv", function (event) {
	        event.stopPropagation();
	        if (event.type == "mouseover") {
	            self.css("cursor", "pointer");
	        } else if (event.type == "mouseout") {
	            self.css("cursor", "auto");
	        }
	    });
	    self.on("click.veditdiv", function (event, obj) {
	        event.stopPropagation();
	        operBoard.hiddenBoard();
	    }.bind(this));
	    return self;
	};

	exports.default = QuitIco;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createIco = __webpack_require__(5);

	var _createIco2 = _interopRequireDefault(_createIco);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SaveIco = function SaveIco() {
	    _classCallCheck(this, SaveIco);

	    var self = (0, _createIco2.default)("save");
	    self.on("click.veditdiv", function (event) {
	        event.stopPropagation();

	        var test = document.getElementsByTagName('html')[0].outerHTML;
	        self.css("cursor", "pointer");
	        $.ajax({
	            url: window.location.href,
	            type: "POST",
	            data: { context: test },
	            success: function success(data) {
	                var gamename = window.location.href.substring(window.location.href.lastIndexOf("/"));
	                var ret = confirm('是否打开赛事宣传页!');
	                if (ret) {
	                    window.open('http://' + gamename + '.valseek.com');
	                }
	            }
	        });
	    });
	    return self;
	};

	exports.default = SaveIco;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextChanger = function TextChanger() {
	    _classCallCheck(this, TextChanger);

	    this.objInputTextArea = function () {
	        var textArea = $("<textarea></textarea>");
	        textArea.css({
	            "width": "100%",
	            "resize": "none"
	        });
	        textArea.attr("rows", 5);
	        return textArea;
	    }.bind(this)();
	    return this.objInputTextArea;
	};

	exports.default = TextChanger;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var labCss = exports.labCss = {
	    "color": "#ffffff",
	    "text-align": "left",
	    "font-size": 12,
	    "margin-top": 10,
	    "display": "inline-block"
	};

	var selectCss = exports.selectCss = {
	    width: 240
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HrefChanger = function HrefChanger() {
	    _classCallCheck(this, HrefChanger);

	    this.objHrefInput = function () {
	        var textArea = $("<textarea></textarea>");
	        textArea.css({
	            "width": "100%",
	            "resize": "none"
	        });
	        textArea.attr("rows", 3);
	        return textArea;
	    }.bind(this)();
	    return this.objHrefInput;
	};

	exports.default = HrefChanger;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Listener = function () {
	    function Listener() {
	        _classCallCheck(this, Listener);
	    }

	    _createClass(Listener, [{
	        key: 'setOperDiv',
	        value: function setOperDiv(operDiv) {
	            this.operDiv = operDiv;
	        }
	    }, {
	        key: 'onTextInit',
	        value: function onTextInit(input) {
	            input.val(this.operDiv.html());
	        }
	    }, {
	        key: 'onTextChange',
	        value: function onTextChange(input) {
	            input.on('keyup.veditdiv', function () {
	                this.operDiv.html(input.val());
	            }.bind(this));
	        }
	    }, {
	        key: 'onAttrInit',
	        value: function onAttrInit(input, attr) {
	            input.val(this.operDiv.attr(attr));
	        }
	    }, {
	        key: 'onAttrChange',
	        value: function onAttrChange(input, attr) {
	            input.on('keyup.veditdiv', function () {
	                this.operDiv.attr(attr, input.val());
	            }.bind(this));
	        }
	    }, {
	        key: 'onSelectCssChange',
	        value: function onSelectCssChange(input, attr) {
	            var _this = this;

	            input.on('change.veditdiv', function () {
	                var val = input.val();
	                _this.operDiv.css(attr, '' + val);
	            });
	        }
	    }]);

	    return Listener;
	}();

	exports.default = Listener;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _styel = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var fontFamliys = [{ name: '宋体', value: 'SimSun' }, { name: '黑体', value: 'SimHei' }, { name: '微软雅黑', value: 'Microsoft YaHei' }, { name: '微软正黑体', value: 'Microsoft JhengHei' }, { name: '新宋体', value: 'NSimSun' }, { name: '新细明体', value: 'PMingLiU' }, { name: '细明体', value: 'MingLiU' }, { name: '标楷体', value: 'DFKai-SB' }, { name: '仿宋', value: 'FangSong' }, { name: '楷体', value: 'KaiTi' }, { name: '仿宋', value: 'GB2312 FangSong_GB2312' }, { name: '楷体', value: 'GB2312 KaiTi_GB2312' }];

	var FontFamliyChanger = function FontFamliyChanger() {
	    _classCallCheck(this, FontFamliyChanger);

	    var options = fontFamliys.map(function (val, index) {
	        return '<option value="' + val.value + '">' + val.name + '</option>';
	    });

	    var select = $('<select>' + options + '</select>');
	    select.css(_styel.selectCss);
	    return select;
	};

	exports.default = FontFamliyChanger;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _styel = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Label = function Label(name) {
	    _classCallCheck(this, Label);

	    this.label = function () {
	        var lableText = $("<div>" + name + "</div>");
	        lableText.css(_styel.labCss);
	        lableText.css("width", "100%");
	        return lableText;
	    }.bind(this)();
	    return this.label;
	};

	exports.default = Label;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _styel = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var fontSizes = [{ name: '小六', value: '8px' }, { name: '六号', value: '10px' }, { name: '五号', value: '14px' }, { name: '小四', value: '16px' }, { name: '四号', value: '18px' }, { name: '小三', value: '20px' }];

	var FontSizeChanger = function FontSizeChanger() {
	    _classCallCheck(this, FontSizeChanger);

	    var options = fontSizes.map(function (val, index) {
	        return '<option value="' + val.value + '">' + val.name + '</option>';
	    });

	    var select = $('<select>' + options + '</select>');
	    select.css(_styel.selectCss);
	    return select;
	};

	exports.default = FontSizeChanger;

/***/ }
/******/ ]);