import {createCustomButton} from '../objects/createCustomButton';
import Donut from '../objects/DonutConstructor';
import {checkMusic} from "../objects/chechMusic";
import {createCustomSprite} from '../objects/createCustomSprite';

class PlayState extends Phaser.State {
    create() {
        this.add.sprite(0, 0, 'backgroundImage');

        this.destroySound = this.add.audio('destroyDonutsSound');
        this.selectSound = this.add.audio('swapSound');

        let startTimer = new Date();

        this.timeToPlay = 30;
        this.timeExpired = 0;

        let timeLabel = this.add.text(500, 38, "30", {font: "50px Fredoka One", fill: "red"});

        this.time.events.loop(100, () => {
            let currentTime = new Date();

            let timeDifference = startTimer.getTime() - currentTime.getTime();

            this.timeExpired = Math.abs(timeDifference / 1000);

            let timeRemaining = this.timeToPlay - this.timeExpired;

            let seconds = Math.floor(timeRemaining) - (60 * Math.floor(timeRemaining / 60));

            timeLabel.text = seconds;
        });

        let soundButton = createCustomButton(this, 10, 10, 'soundButton', 80, 80, () => {
            if (window['music'].mute) {
                window['music'].mute = false;

                soundButton.tint = 0xFFFFFF;
            } else {
                window['music'].mute = true;

                soundButton.tint = 0xff0000;
            }
        });

        checkMusic(soundButton);

        let scoreTable = createCustomSprite(this, this.world.centerX - 170, this.world.centerY - 380, 'scoreTable', 380, 150);

        this.scoreText = this.add.text(this.world.centerX - 20, this.world.centerY - 351, '0', {
            font: '58px Fredoka One',
            fill: 'red'
        });

        window['score'] = 0;

        this.donutWidth = this.game.cache.getImage('red-01').width;
        this.donutHeight = this.game.cache.getImage('red-01').height;

        this.indexes = {
            1: 'red-01',
            2: 'blue-02',
            3: 'green-03',
            4: 'lightBlue-04',
            5: 'yellow-05',
            6: 'pink-06'
        };

        this.canMove = false;

        this.mainMatrix = [
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null]
        ];

        this.generateArray();

        this.canMove = false;

        this.activeDonut1 = null;
        this.activeDonut2 = null;
    }

    generateArray() {
        for (let i = 0; i < this.mainMatrix.length; i++) {
            for (let j = 0; j < this.mainMatrix.length; j++) {
                let donut = this.addDonut(i, j);

                this.mainMatrix[i][j] = donut;
            }
        }

        this.game.time.events.add(600, () => {
            this.checkMatch();
        });
    }

    addDonut(x, y) {
        let randomIndex = Math.floor(Math.random() * 6 + 1);

        let donut = this.add.sprite((x * this.donutWidth) + this.donutWidth / 2, 0, this.indexes[randomIndex]);

        this.game.add.tween(donut).to({y: y * this.donutHeight + (this.donutHeight / 2) + 120}, 600, Phaser.Easing.Linear.In, true);

        let tempDonut = new Donut(this.donutHeight, this.donutWidth, randomIndex, donut);

        tempDonut.sprite.anchor.setTo(0.5, 0.5);

        tempDonut.sprite.inputEnabled = true;

        tempDonut.sprite.events.onInputDown.add(() => {
            this.donutDown(tempDonut);
        }, this);

        return tempDonut;
    }

    donutDown(donut) {
        if (this.canMove) {
            this.activeDonut1 = donut;

            this.startPosX = (donut.sprite.x - this.donutWidth / 2) / this.donutWidth;
            this.startPosY = (donut.sprite.y - 120 - this.donutWidth / 2) / this.donutWidth;
        }
    }


    checkMatch() {
        let combinations = this.getMatches();

        if (combinations.length > 0) {
            this.game.time.events.add(300, () => {
                this.destroyDonuts(combinations);
            });

            this.game.time.events.add(500, () => {
                this.refreshMainMatrix();
                this.fillMatrixByNewDonuts();

            });

            this.game.time.events.add(600, () => {

                this.activeDonutsReset();
                this.checkMatch();
            });


        } else {
            this.swapDonuts();

            this.game.time.events.add(500, () => {
                this.activeDonutsReset();

                this.canMove = true;
            });
        }

    }

    activeDonutsReset() {
        this.activeDonut1 = null;
        this.activeDonut2 = null;
    }

    getMatches() {
        let combinations = [];
        let groupOf3orMore = [];

        for (let i = 0; i < this.mainMatrix.length; i++) {
            let tempLine = this.mainMatrix[i];

            groupOf3orMore = [];

            for (let j = 0; j < tempLine.length; j++) {
                if (tempLine[j] && tempLine[j + 1] && tempLine[j + 2]) {

                    if ((tempLine[j].index === tempLine[j + 1].index) && (tempLine[j + 1].index === tempLine[j + 2].index)) {
                        groupOf3orMore.push(tempLine[j], tempLine[j + 1], tempLine[j + 2]);

                        let tempIndex = tempLine[j].index;

                        j += 2;

                        if ((j === tempLine.length - 1) && (groupOf3orMore.length)) {
                            combinations.push(groupOf3orMore);

                            groupOf3orMore = [];

                        } else {
                            for (let nextDonut = j + 1; nextDonut < tempLine.length; nextDonut++) {

                                if (tempIndex === tempLine[nextDonut].index) {
                                    groupOf3orMore.push(tempLine[nextDonut]);

                                    j += 1;
                                } else {
                                    combinations.push(groupOf3orMore);

                                    groupOf3orMore = [];

                                    break;
                                }
                            }

                            if (groupOf3orMore.length) {
                                combinations.push(groupOf3orMore);
                                groupOf3orMore = [];
                            }

                        }
                    }
                }
            }
        }

        for (let i = 0; i < this.mainMatrix.length; i++) {
            let tempRaw = this.mainMatrix.map((value) => {
                return value[i];
            });

            groupOf3orMore = [];

            for (let j = 0; j < tempRaw.length; j++) {
                if (tempRaw[j] && tempRaw[j + 1] && tempRaw[j + 2]) {

                    if ((tempRaw[j].index === tempRaw[j + 1].index) && (tempRaw[j + 1].index === tempRaw[j + 2].index)) {
                        groupOf3orMore.push(tempRaw[j], tempRaw[j + 1], tempRaw[j + 2]);

                        let tempIndex = tempRaw[j].index;

                        j += 2;

                        if ((j === tempRaw.length - 1) && (groupOf3orMore.length)) {
                            combinations.push(groupOf3orMore);

                            groupOf3orMore = [];
                        } else {
                            for (let nextDonut = j + 1; nextDonut < tempRaw.length; nextDonut++) {
                                if (tempIndex === tempRaw[nextDonut].index) {
                                    groupOf3orMore.push(tempRaw[nextDonut]);

                                    j += 1;
                                } else {
                                    combinations.push(groupOf3orMore);

                                    groupOf3orMore = [];

                                    break;
                                }
                            }

                            if (groupOf3orMore.length) {
                                combinations.push(groupOf3orMore);

                                groupOf3orMore = [];
                            }
                        }
                    }
                }
            }
        }
        return combinations;
    }

    update() {
        if (this.activeDonut1 && !this.activeDonut2) {

            let hoverX = this.input.x;
            let hoverY = this.input.y - 120;

            let hoverPosX = Math.floor(hoverX / this.donutWidth);
            let hoverPosY = Math.floor(hoverY / this.donutHeight);

            let difX = (hoverPosX - this.startPosX);
            let difY = (hoverPosY - this.startPosY);

            if (!(hoverPosY > this.mainMatrix[0].length - 1 || hoverPosY < 0) && !(hoverPosX > this.mainMatrix.length - 1 || hoverPosX < 0)) {

                if ((Math.abs(difY) === 1 && difX === 0) || (Math.abs(difX) === 1 && difY === 0)) {

                    this.canMove = false;

                    this.activeDonut2 = this.mainMatrix[hoverPosX][hoverPosY];

                    this.swapDonuts();

                    this.time.events.add(500, () => {
                        this.checkMatch();
                    });
                }
            }
        }

        if (this.timeExpired > this.timeToPlay) {
            this.state.start('gameOverState');
        }
    }

    swapDonuts() {
        if (this.activeDonut1 && this.activeDonut2) {
            let donut1Pos = {
                x: (this.activeDonut1.sprite.x - this.donutWidth / 2) / this.donutWidth,
                y: (this.activeDonut1.sprite.y - 120 - this.donutWidth / 2) / this.donutWidth
            };
            let donut2Pos = {
                x: (this.activeDonut2.sprite.x - this.donutWidth / 2) / this.donutWidth,
                y: (this.activeDonut2.sprite.y - 120 - this.donutWidth / 2) / this.donutWidth
            };

            if (!window['music'].mute) {
                this.selectSound.play();
            }

            this.mainMatrix[donut1Pos.x][donut1Pos.y] = this.activeDonut2;
            this.mainMatrix[donut2Pos.x][donut2Pos.y] = this.activeDonut1;

            this.add.tween(this.activeDonut1.sprite).to({
                x: donut2Pos.x * this.donutWidth + (this.donutWidth / 2),
                y: donut2Pos.y * this.donutHeight + (this.donutHeight / 2) + 120
            }, 200, Phaser.Easing.Linear.In, true);

            this.add.tween(this.activeDonut2.sprite).to({
                x: donut1Pos.x * this.donutWidth + (this.donutWidth / 2),
                y: donut1Pos.y * this.donutHeight + (this.donutHeight / 2) + 120
            }, 200, Phaser.Easing.Linear.In, true);
        }
    }


    destroyDonuts(matches) {
        for (let i = 0; i < matches.length; i++) {
            for (let j = 0; j < matches[i].length; j++) {
                window['score'] += 10;
                this.scoreText.text = window['score'];

                if (!window['music'].mute) {
                    this.destroySound.play();
                }

                let donut = matches[i][j];

                let donutPos = this.getDonutsPos(donut);

                matches[i][j].sprite.destroy();
                if (donutPos.i !== -1 && donutPos.j !== -1) {
                    this.mainMatrix[donutPos.i][donutPos.j] = null;
                }
            }
        }
    }

    getDonutsPos(donut) {
        let position = {
            i: -1,
            j: -1
        };

        for (let i = 0; i < this.mainMatrix.length; i++) {
            for (let j = 0; j < this.mainMatrix[i].length; j++) {
                if (donut === this.mainMatrix[i][j]) {
                    position.i = i;
                    position.j = j;

                    break;
                }
            }
        }
        return position;
    }

    refreshMainMatrix() {
        for (let i = 0; i < this.mainMatrix.length; i++) {
            for (let j = this.mainMatrix[i].length - 1; j > 0; j--) {
                if (this.mainMatrix[i][j] == null && this.mainMatrix[i][j - 1] !== null) {
                    let tempDonut = new Donut(this.donutHeight, this.donutWidth, this.mainMatrix[i][j - 1].index, this.mainMatrix[i][j - 1].sprite);

                    this.mainMatrix[i][j] = tempDonut;
                    this.mainMatrix[i][j - 1] = null;

                    this.game.add.tween(tempDonut.sprite).to({y: (this.donutHeight * j) + (this.donutHeight / 2) + 120}, 200, Phaser.Easing.Linear.In, true);

                    j = this.mainMatrix[i].length;
                }
            }
        }
    }

    fillMatrixByNewDonuts() {
        for (let i = 0; i < this.mainMatrix.length; i++) {
            for (let j = 0; j < this.mainMatrix.length; j++) {
                if (!this.mainMatrix[i][j]) {
                    this.mainMatrix[i][j] = this.addDonut(i, j);
                }
            }
        }
    }
}

export default PlayState;
