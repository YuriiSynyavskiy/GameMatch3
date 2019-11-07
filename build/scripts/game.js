(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _MainMenu = require('states/MainMenu');

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, window.innerWidth / 2.5, window.innerHeight, Phaser.AUTO));

		_this.state.add('MainMenu', _MainMenu.MainMenu, false);
		_this.state.start('MainMenu');
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"states/MainMenu":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Donut = function () {
    function Donut(height, width, index, positionInMatrix) {
        _classCallCheck(this, Donut);

        this.height = height;
        this.width = width;
        this.index = index; // 1 - 6
        this.position = positionInMatrix; // x, y
    }

    _createClass(Donut, [{
        key: "outputInfo",
        value: function outputInfo() {
            console.log(this.index, this.position);
        }
    }]);

    return Donut;
}();

exports.default = Donut;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createButton = createButton;
function createButton(game, x, y, image, width, height, cb) {
    var button = game.add.button(x, y, image, cb, game);

    button.width = width;
    button.height = height;

    return button;
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MainMenu = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _PlayState = require('states/PlayState');

var _PlayState2 = _interopRequireDefault(_PlayState);

var _TutorialState = require('states/TutorialState');

var _TutorialState2 = _interopRequireDefault(_TutorialState);

var _sfxButton = require('../objects/sfxButton');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MainMenu = exports.MainMenu = function (_Phaser$State) {
    _inherits(MainMenu, _Phaser$State);

    function MainMenu() {
        _classCallCheck(this, MainMenu);

        return _possibleConstructorReturn(this, (MainMenu.__proto__ || Object.getPrototypeOf(MainMenu)).apply(this, arguments));
    }

    _createClass(MainMenu, [{
        key: 'preload',
        value: function preload() {
            this.load.audio('backgroundMusic', '../assets/audio/background.mp3');
            this.load.image('backgroundImage', '../assets/images/backgrounds/background.jpg');
            this.load.image('donut', '../assets/images/donut.png');
            this.load.image('donutShadow', '../assets/images/big-shadow.png');
            this.load.image('soundButton', '../assets/images/btn-sfx.png');
            this.load.image('donutsLogo', '../assets/images/donuts_logo.png');
            this.load.image('playBtn', '../assets/images/btn-play.png');
            this.load.image('cursor', '../assets/images/game/hand.png');
            this.load.image('howToPlayBtn', '../assets/images/btn-howToPlay.png');
            this.state.add('playState', _PlayState2.default, false);
            this.state.add('tutorialState', _TutorialState2.default, false);
        }
    }, {
        key: 'create',
        value: function create() {
            var _this2 = this;

            window['music'] = this.add.audio('backgroundMusic');
            window['music'].loop = true;

            window['music'].play();

            this.add.sprite(0, 0, 'backgroundImage');

            var soundButton = (0, _sfxButton.createButton)(this, 900, 10, 'soundButton', 80, 80, function () {
                if (window['music'].mute) {
                    window['music'].mute = false;

                    soundButton.tint = 0xFFFFFF;
                } else {
                    soundButton.tint = 0xff0000;

                    window['music'].mute = true;
                }
            });

            this.animate(this, soundButton, 900, 10);

            var donutShadow = this.add.sprite(this.world.centerX - 185, this.world.centerY - 205, 'donutShadow');
            donutShadow.width = 450;
            donutShadow.height = 450;

            var donut = this.add.sprite(this.world.centerX - 225, this.world.centerY - 225, 'donut');
            donut.width = 450;
            donut.height = 450;

            var donutsLogo = this.add.sprite(this.world.centerX + 350, this.world.centerY - 325, 'donutsLogo');
            donutsLogo.width = 480;
            donutsLogo.height = 170;

            this.animate(this, donutsLogo, this.world.centerX + 350, 85);

            var playBtn = (0, _sfxButton.createButton)(this, this.world.centerX + 350, this.world.centerY + 50, 'playBtn', 230, 150, function () {
                window['music'].mute = true;

                _this2.state.start('playState');
            });

            this.animate(this, playBtn, this.world.centerX + 350, 195);

            var howToPlayBtn = (0, _sfxButton.createButton)(this, this.world.centerX + 350, this.world.centerY + 200, 'howToPlayBtn', 210, 130, function () {
                window['music'].mute = true;

                _this2.state.start('tutorialState');
            });

            this.animate(this, howToPlayBtn, this.world.centerX + 350, 205);
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'animate',
        value: function animate(game, item, start, end) {
            var _this3 = this;

            var stopNumber = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

            if (stopNumber >= start - end) {
                return 0;
            }

            setTimeout(function () {
                item.x = start - stopNumber;

                stopNumber += 3;

                _this3.animate(game, item, start, end, stopNumber);
            }, 1);
        }
    }]);

    return MainMenu;
}(Phaser.State);

},{"../objects/sfxButton":3,"states/PlayState":5,"states/TutorialState":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _DonutConstructor = require('../objects/DonutConstructor');

var _DonutConstructor2 = _interopRequireDefault(_DonutConstructor);

var _sfxButton = require('../objects/sfxButton');

var _MainMenu = require('states/MainMenu');

var _MainMenu2 = _interopRequireDefault(_MainMenu);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var mainMatrix = []; // global matrix
var indexes = {
    1: 'red-01',
    2: 'blue-02',
    3: 'green-03',
    4: 'lightBlue-04',
    5: 'yellow-05',
    6: 'pink-06'
};

var PlayState = function (_Phaser$State) {
    _inherits(PlayState, _Phaser$State);

    function PlayState() {
        _classCallCheck(this, PlayState);

        return _possibleConstructorReturn(this, (PlayState.__proto__ || Object.getPrototypeOf(PlayState)).apply(this, arguments));
    }

    _createClass(PlayState, [{
        key: 'preload',
        value: function preload() {
            this.load.image('backgroundImage', '../assets/images/backgrounds/background.jpg');
            this.load.image('soundButton', '../assets/images/btn-sfx.png');
            this.load.image('scoreTable', '../assets/images/bg-score.png');
            this.load.image('timeUp', '../assets/images/text-timeup.png');
            this.load.images(['red-01', 'blue-02', 'green-03', 'lightBlue-04', 'yellow-05', 'pink-06'], ['../assets/images/game/gem-01.png', '../assets/images/game/gem-02.png', '../assets/images/game/gem-03.png', '../assets/images/game/gem-04.png', '../assets/images/game/gem-05.png', '../assets/images/game/gem-06.png']);
            this.load.audio('backgroundMusic', '../assets/audio/background.mp3');
            this.load.bitmapFont('fredokaOne', '../assets/fonts/FredokaOne-Regular.ttf');
        }
    }, {
        key: 'create',
        value: function create() {
            this.add.sprite(0, 0, 'backgroundImage');

            var soundButton = (0, _sfxButton.createButton)(this, 10, 10, 'soundButton', 80, 80, function () {
                if (window['music'].mute) {
                    window['music'].mute = false;

                    soundButton.tint = 0xFFFFFF;
                } else {
                    window['music'].mute = true;

                    soundButton.tint = 0xff0000;
                }
            });

            if (window['music']) {
                soundButton.tint = 0xff0000;
            } else {
                soundButton.tint = 0xFFFFFF;
            }

            var scoreTable = this.add.sprite(this.world.centerX - 170, this.world.centerY - 380, 'scoreTable');
            scoreTable.width = 380;
            scoreTable.height = 150;

            var scoreText = this.add.text(this.world.centerX, this.world.centerY - 348, '0', {
                font: '58px Fredoka One',
                fill: 'red'
            });

            //function which generate array
            //function which animaate/method Donut
        }
    }, {
        key: 'generateArray',
        value: function generateArray() {
            // mainMatrix.push(new Donut(200,200,2,0));
            // this.add.sprite(0,0, indexes[mainMatrix[0].index]);
        }
    }]);

    return PlayState;
}(Phaser.State);

exports.default = PlayState;

},{"../objects/DonutConstructor":2,"../objects/sfxButton":3,"states/MainMenu":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _sfxButton = require('../objects/sfxButton');

var _MainMenu = require('../states/MainMenu');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var TutorialState = function (_Phaser$State) {
    _inherits(TutorialState, _Phaser$State);

    function TutorialState() {
        _classCallCheck(this, TutorialState);

        return _possibleConstructorReturn(this, (TutorialState.__proto__ || Object.getPrototypeOf(TutorialState)).apply(this, arguments));
    }

    _createClass(TutorialState, [{
        key: 'preload',
        value: function preload() {
            this.load.audio('backgroundMusic', '../assets/audio/background.mp3');
            this.load.image('backgroundImage', '../assets/images/backgrounds/background.jpg');
            this.load.image('returnButton', '../assets/images/btn-return.png');
            this.load.image('donutRed', '../assets/images/game/gem-01.png');
            this.load.image('donutBlue', '../assets/images/game/gem-02.png');
            this.load.bitmapFont('fredokaOne', '../assets/fonts/FredokaOne-Regular.ttf');
            this.state.add('mainMenu', _MainMenu.MainMenu, false);
        }
    }, {
        key: 'create',
        value: function create() {
            var _this2 = this;

            var backgroundMusic = this.add.audio('backgroundMusic');
            backgroundMusic.loop = true;
            backgroundMusic.play();

            this.add.sprite(0, 0, 'backgroundImage');

            var returnBtn = (0, _sfxButton.createButton)(this, this.world.centerX + 110, this.world.centerY + 350, 'returnButton', 230, 150, function () {
                backgroundMusic.mute = true;

                _this2.state.start('mainMenu');
            });

            returnBtn.anchor = {
                x: 1,
                y: 1
            };

            var tutorialText1 = this.add.text(this.world.centerX + 280, this.world.centerY - 80, '          How to play \nYou have to make a horizontal or vertical line of 3 or more same donuts', { fontSize: '55px', fill: 'violet', font: "fredokaOne", wordWrap: true, wordWrapWidth: 600 });

            tutorialText1.anchor = {
                x: 1,
                y: 1
            };

            this.add.sprite(this.world.centerX - 295, this.world.centerY - 90, 'donutRed');
            this.add.sprite(this.world.centerX - 215, this.world.centerY - 90, 'donutRed');
            this.add.sprite(this.world.centerX - 135, this.world.centerY - 90, 'donutRed');

            this.add.sprite(this.world.centerX + 30, this.world.centerY - 90, 'donutBlue');
            this.add.sprite(this.world.centerX + 110, this.world.centerY - 90, 'donutBlue');
            this.add.sprite(this.world.centerX + 190, this.world.centerY - 90, 'donutBlue');

            var tutorialText2 = this.add.text(this.world.centerX + 270, this.world.centerY + 200, 'You have 30 seconds so get as much score as you can.', { font: "55px Fredoka One", fill: 'violet', wordWrap: true, wordWrapWidth: 600 });

            tutorialText2.anchor = {
                x: 1,
                y: 1
            };
        }
    }]);

    return TutorialState;
}(Phaser.State);

exports.default = TutorialState;

},{"../objects/sfxButton":3,"../states/MainMenu":4}]},{},[1])
//# sourceMappingURL=game.js.map
