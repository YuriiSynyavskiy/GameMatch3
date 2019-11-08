(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _MainMenu = require('states/MainMenu');

var _Preloader = require('./states/Preloader');

var _Preloader2 = _interopRequireDefault(_Preloader);

var _TutorialState = require('./states/TutorialState');

var _TutorialState2 = _interopRequireDefault(_TutorialState);

var _PlayState = require('./states/PlayState');

var _PlayState2 = _interopRequireDefault(_PlayState);

var _GameOverState = require('./states/GameOverState');

var _GameOverState2 = _interopRequireDefault(_GameOverState);

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

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 614.4, 750, Phaser.AUTO));

		_this.state.add('mainMenu', _MainMenu.MainMenu, false);
		_this.state.add('preloader', _Preloader2.default, false);
		_this.state.add('tutorialState', _TutorialState2.default, false);
		_this.state.add('playState', _PlayState2.default, false);
		_this.state.add('gameOverState', _GameOverState2.default, false);

		_this.state.start('preloader');
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"./states/GameOverState":7,"./states/PlayState":9,"./states/Preloader":10,"./states/TutorialState":11,"states/MainMenu":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Donut = function Donut(height, width, index, sprite) {
    _classCallCheck(this, Donut);

    this.height = height;
    this.width = width;
    this.sprite = sprite; //sprite for this donut
    this.index = index; // 1 - 6
};

exports.default = Donut;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.animate = animate;
function animate(game, item, start, end) {
    var stopNumber = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    if (stopNumber >= start - end) {
        return 0;
    }

    setTimeout(function () {
        item.x = start - stopNumber;

        stopNumber += 3;

        animate(game, item, start, end, stopNumber);
    }, 1);
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkMusic = checkMusic;
function checkMusic(soundButton) {
    if (window['music'].mute) {
        soundButton.tint = 0xff0000;
    } else {
        soundButton.tint = 0xFFFFFF;
    }
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCustomButton = createCustomButton;
function createCustomButton(game, x, y, image, width, height, cb) {
    var button = game.add.button(x, y, image, cb, game);

    button.width = width;
    button.height = height;

    return button;
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCustomSprite = createCustomSprite;
function createCustomSprite(game, x, y, image, width, height) {
    var sprite = game.add.sprite(x, y, image);

    sprite.width = width;
    sprite.height = height;

    return sprite;
}

},{}],7:[function(require,module,exports){
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

var _createCustomButton = require('../objects/createCustomButton');

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

var GameOverState = function (_Phaser$State) {
    _inherits(GameOverState, _Phaser$State);

    function GameOverState() {
        _classCallCheck(this, GameOverState);

        return _possibleConstructorReturn(this, (GameOverState.__proto__ || Object.getPrototypeOf(GameOverState)).apply(this, arguments));
    }

    _createClass(GameOverState, [{
        key: 'create',
        value: function create() {
            this.add.sprite(0, 0, 'backgroundImage');
        }
    }]);

    return GameOverState;
}(Phaser.State);

exports.default = GameOverState;

},{"../objects/createCustomButton":5}],8:[function(require,module,exports){
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

var _createCustomButton = require('../objects/createCustomButton');

var _chechMusic = require('../objects/chechMusic');

var _createCustomSprite = require('../objects/createCustomSprite');

var _animateSprite = require('../objects/animateSprite');

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
                key: 'create',
                value: function create() {
                        var _this2 = this;

                        this.add.sprite(0, 0, 'backgroundImage');

                        var soundButton = (0, _createCustomButton.createCustomButton)(this, 900, 10, 'soundButton', 80, 80, function () {
                                if (window['music'].mute) {
                                        window['music'].mute = false;

                                        soundButton.tint = 0xFFFFFF;
                                } else {
                                        soundButton.tint = 0xff0000;

                                        window['music'].mute = true;
                                }
                        });

                        (0, _chechMusic.checkMusic)(soundButton);

                        (0, _animateSprite.animate)(this, soundButton, 900, 10);

                        var donutShadow = (0, _createCustomSprite.createCustomSprite)(this, this.world.centerX - 185, this.world.centerY - 205, 'donutShadow', 450, 450);

                        var donut = (0, _createCustomSprite.createCustomSprite)(this, this.world.centerX - 225, this.world.centerY - 225, 'donut', 450, 450);

                        var donutsLogo = (0, _createCustomSprite.createCustomSprite)(this, this.world.centerX + 550, this.world.centerY - 325, 'donutsLogo', 480, 170);

                        (0, _animateSprite.animate)(this, donutsLogo, this.world.centerX + 550, 85);

                        var playBtn = (0, _createCustomButton.createCustomButton)(this, this.world.centerX + 550, this.world.centerY + 50, 'playBtn', 230, 150, function () {
                                _this2.state.start('playState');
                        });

                        (0, _animateSprite.animate)(this, playBtn, this.world.centerX + 550, 195);

                        var howToPlayBtn = (0, _createCustomButton.createCustomButton)(this, this.world.centerX + 550, this.world.centerY + 200, 'howToPlayBtn', 210, 130, function () {
                                _this2.state.start('tutorialState');
                        });

                        (0, _animateSprite.animate)(this, howToPlayBtn, this.world.centerX + 550, 205);
                }
        }]);

        return MainMenu;
}(Phaser.State);

},{"../objects/animateSprite":3,"../objects/chechMusic":4,"../objects/createCustomButton":5,"../objects/createCustomSprite":6}],9:[function(require,module,exports){
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

var _createCustomButton = require('../objects/createCustomButton');

var _DonutConstructor = require('../objects/DonutConstructor');

var _DonutConstructor2 = _interopRequireDefault(_DonutConstructor);

var _chechMusic = require('../objects/chechMusic');

var _createCustomSprite = require('../objects/createCustomSprite');

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

var PlayState = function (_Phaser$State) {
    _inherits(PlayState, _Phaser$State);

    function PlayState() {
        _classCallCheck(this, PlayState);

        return _possibleConstructorReturn(this, (PlayState.__proto__ || Object.getPrototypeOf(PlayState)).apply(this, arguments));
    }

    _createClass(PlayState, [{
        key: 'create',
        value: function create() {
            var _this2 = this;

            this.add.sprite(0, 0, 'backgroundImage');

            //timer
            var startTimer = new Date();
            this.timeToPlay = 5;
            this.timeExpired = 0;

            var timeLabel = this.add.text(490, 43, "5", { font: "50px Fredoka One", fill: "red" });

            this.time.events.loop(100, function () {
                var currentTime = new Date();

                var timeDifference = startTimer.getTime() - currentTime.getTime();

                _this2.timeExpired = Math.abs(timeDifference / 1000);

                var timeRemaining = _this2.timeToPlay - _this2.timeExpired;

                var seconds = Math.floor(timeRemaining) - 60 * Math.floor(timeRemaining / 60);

                timeLabel.text = seconds;
            });
            //

            //sound button and score table
            var soundButton = (0, _createCustomButton.createCustomButton)(this, 10, 10, 'soundButton', 80, 80, function () {
                if (window['music'].mute) {
                    window['music'].mute = false;

                    soundButton.tint = 0xFFFFFF;
                } else {
                    window['music'].mute = true;

                    soundButton.tint = 0xff0000;
                }
            });

            (0, _chechMusic.checkMusic)(soundButton);

            var scoreTable = (0, _createCustomSprite.createCustomSprite)(this, this.world.centerX - 170, this.world.centerY - 380, 'scoreTable', 380, 150);

            var scoreText = this.add.text(this.world.centerX, this.world.centerY - 351, '0', {
                font: '58px Fredoka One',
                fill: 'red'
            });
            //

            //This will hold all of the donut sprites
            this.donuts = this.game.add.group();

            this.donutWidth = this.game.cache.getImage('red-01').width; //donut width
            this.donutHeight = this.game.cache.getImage('red-01').height; //donut height

            this.indexes = { // types of Donut
                1: 'red-01',
                2: 'blue-02',
                3: 'green-03',
                4: 'lightBlue-04',
                5: 'yellow-05',
                6: 'pink-06'
            };

            this.mainMatrix = [// global matrix
            [null, null, null, null, null, null], [null, null, null, null, null, null], [null, null, null, null, null, null], [null, null, null, null, null, null], [null, null, null, null, null, null], [null, null, null, null, null, null]]; //

            this.generateArray();
            this.checkMatch();
        }
    }, {
        key: 'generateArray',
        value: function generateArray() {
            for (var i = 0; i < this.mainMatrix.length; i++) {

                //Loop through each position in a specific column, starting from the top

                for (var j = 0; j < this.mainMatrix.length; j++) {

                    //Add the donut to the game at this matrix position
                    var donut = this.addDonut(i, j);

                    //Keep a track of the donut position in our mainMatrix
                    this.mainMatrix[i][j] = donut;
                }
            }

            //Once the donuts are ready, check for any matches on the grid
            //this.game.time.events.add(600, function(){
            //    this.checkMatch();});
        }
    }, {
        key: 'addDonut',
        value: function addDonut(x, y) {
            //for animation of drop-down of donuts

            //Random Index from 1 - 6
            var randomIndex = Math.floor(Math.random() * 6 + 1);

            //Create random donut
            //Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)

            var donut = this.add.sprite(x * this.donutWidth + this.donutWidth / 2 + 7, 0, this.indexes[randomIndex]);

            //Adding to group
            // let donut = this.donuts.create((x * this.donutWidth) + this.donutWidth / 2 + 7, 0,  this.indexes[randomIndex]);
            //


            //Create object donut

            //Animate the tile into the correct vertical position
            this.game.add.tween(donut).to({ y: y * this.donutHeight + this.donutHeight / 2 + 120 }, 600, Phaser.Easing.Linear.In, true);

            var tempDonut = new _DonutConstructor2.default(this.donutHeight, this.donutWidth, randomIndex, donut);
            //Animate the tile into the correct vertical position

            //Set the tiles anchor point to the center
            donut.anchor.setTo(0.5, 0.5);

            //Enable input on the tile
            donut.inputEnabled = true;

            //Trigger the tileDown function whenever the user clicks or taps on this tile
            //donut.events.onInputDown.add(me.tileDown, me);

            return tempDonut;
        }
    }, {
        key: 'checkMatch',
        value: function checkMatch() {
            var combinations = this.getMatches();
            console.log(combinations);
        }
    }, {
        key: 'getMatches',
        value: function getMatches() {
            var combinations = [];
            var groupOf3orMore = [];
            for (var i = 0; i < this.mainMatrix.length; i++) {
                var tempLine = this.mainMatrix[i];
                console.log(tempLine);
                for (var j = 0; j < tempLine.length; j++) {
                    if (tempLine[j] && tempLine[j + 1] && tempLine[j + 2]) {
                        if (tempLine[j].index === tempLine[j + 1].index === tempLine[j + 2].index) {
                            groupOf3orMore.push(tempLine[j], tempLine[j + 1], tempLine[j + 2]); // push this 3 elements
                            var tempIndex = tempLine[j].index; //tempValue for checking value of next
                            j += 2;
                            for (var nextDonut = j + 3; nextDonut < tempLine.length; nextDonut++) {
                                if (tempIndex === tempLine[nextDonut].index) {
                                    groupOf3orMore.push(tempLine[nextDonut]);
                                    j += 1;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.timeExpired > this.timeToPlay - 1) {
                this.state.start('gameOverState');
            }
        }
    }]);

    return PlayState;
}(Phaser.State);

exports.default = PlayState;

},{"../objects/DonutConstructor":2,"../objects/chechMusic":4,"../objects/createCustomButton":5,"../objects/createCustomSprite":6}],10:[function(require,module,exports){
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

var Preloader = function (_Phaser$State) {
    _inherits(Preloader, _Phaser$State);

    function Preloader() {
        _classCallCheck(this, Preloader);

        return _possibleConstructorReturn(this, (Preloader.__proto__ || Object.getPrototypeOf(Preloader)).apply(this, arguments));
    }

    _createClass(Preloader, [{
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
            this.load.image('scoreTable', '../assets/images/bg-score.png');
            this.load.image('timeUp', '../assets/images/text-timeup.png');
            this.load.images(['red-01', 'blue-02', 'green-03', 'lightBlue-04', 'yellow-05', 'pink-06'], ['../assets/images/game/gem-01.png', '../assets/images/game/gem-02.png', '../assets/images/game/gem-03.png', '../assets/images/game/gem-04.png', '../assets/images/game/gem-05.png', '../assets/images/game/gem-06.png']);
            this.load.image('returnButton', '../assets/images/btn-return.png');
            this.load.image('donutRed', '../assets/images/game/gem-01.png');
            this.load.image('donutBlue', '../assets/images/game/gem-02.png');
        }
    }, {
        key: 'create',
        value: function create() {
            window['music'] = this.add.audio('backgroundMusic');
            window['music'].loop = true;

            window['music'].play();

            this.state.start('mainMenu');
        }
    }]);

    return Preloader;
}(Phaser.State);

exports.default = Preloader;

},{}],11:[function(require,module,exports){
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

var _createCustomButton = require('../objects/createCustomButton');

var _chechMusic = require('../objects/chechMusic');

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
        key: 'create',
        value: function create() {
            var _this2 = this;

            this.add.sprite(0, 0, 'backgroundImage');

            var soundButton = (0, _createCustomButton.createCustomButton)(this, 10, 10, 'soundButton', 80, 80, function () {
                if (window['music'].mute) {
                    window['music'].mute = false;

                    soundButton.tint = 0xFFFFFF;
                } else {
                    window['music'].mute = true;

                    soundButton.tint = 0xff0000;
                }
            });

            (0, _chechMusic.checkMusic)(soundButton);

            var returnBtn = (0, _createCustomButton.createCustomButton)(this, this.world.centerX + 110, this.world.centerY + 350, 'returnButton', 230, 150, function () {
                _this2.state.start('mainMenu');
            });

            returnBtn.anchor = {
                x: 1,
                y: 1
            };

            var tutorialText1 = this.add.text(this.world.centerX + 300, this.world.centerY - 80, '          How to play \nYou have to make a horizontal or vertical line of 3 or more same donuts', { fontSize: '48px', fill: 'violet', font: "Fredoka One", wordWrap: true, wordWrapWidth: 650 });

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

            var tutorialText2 = this.add.text(this.world.centerX + 270, this.world.centerY + 208, 'You have 30 seconds so get as much score as you can.', { font: "50px Fredoka One", fill: 'violet', wordWrap: true, wordWrapWidth: 600 });

            tutorialText2.anchor = {
                x: 1,
                y: 1
            };
        }
    }]);

    return TutorialState;
}(Phaser.State);

exports.default = TutorialState;

},{"../objects/chechMusic":4,"../objects/createCustomButton":5}]},{},[1])
//# sourceMappingURL=game.js.map
