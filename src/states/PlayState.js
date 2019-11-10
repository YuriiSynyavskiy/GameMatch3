import {createCustomButton} from '../objects/createCustomButton';
import Donut from '../objects/DonutConstructor';
import {checkMusic} from "../objects/chechMusic";
import {createCustomSprite} from '../objects/createCustomSprite';

class PlayState extends Phaser.State {
    create() {
        this.add.sprite(0, 0, 'backgroundImage');

        this.destroySound = this.add.audio('destroyDonutsSound');
        this.selectSound = this.add.audio('swapSound');

        //timer
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
        //

        //sound button and score table
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


        // this.trainingSet = [
        //     [1, 3, 1, 4, 5, 2],
        //     [5, 5, 2, 5, 1, 2],
        //     [1, 2, 3, 4, 6, 5],
        //     [2, 5, 4, 3, 5, 3],
        //     [1, 6, 4, 6, 1, 6],
        //     [2, 2, 6, 1, 3, 3]
        // ];


        this.donutWidth = this.game.cache.getImage('red-01').width;     //donut width
        this.donutHeight = this.game.cache.getImage('red-01').height;   //donut height

        this.indexes = {                                // types of Donut
            1: 'red-01',
            2: 'blue-02',
            3: 'green-03',
            4: 'lightBlue-04',
            5: 'yellow-05',
            6: 'pink-06'
        };

        this.canMove = false;

        this.mainMatrix = [                             // global matrix
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null]
        ];                              //

        this.generateArray();           //mainMatrix and animation

        this.canMove = false;

        this.checkMatch();

        this.activeDonut1 = null;
        this.activeDonut2 = null;
    }

    generateArray() {
        for (let i = 0; i < this.mainMatrix.length; i++) {

            //Loop through each position in a specific column, starting from the top

            for (let j = 0; j < this.mainMatrix.length; j++) {
                //Add the donut to the game at this matrix position

                let donut = this.addDonut(i, j);

                //Keep a track of the donut position in our mainMatrix
                this.mainMatrix[i][j] = donut;
            }
        }
    }


    addDonut(x, y) {                       //for animation of drop-down of donuts

        //Random Index from 1 - 6
        let randomIndex = Math.floor(Math.random() * 6 + 1);
        //for training set
        //let randomIndex = this.trainingSet[x][y];
        //Create random donut
        //Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)

        let donut = this.add.sprite((x * this.donutWidth) + this.donutWidth / 2, 0, this.indexes[randomIndex]);

        //Adding to group
        //let donut = this.donuts.create((x * this.donutWidth) + this.donutWidth / 2 + 7, 0,  this.indexes[randomIndex]);
        //


        //Create object donut

        //Animate the tile into the correct vertical position
        this.game.add.tween(donut).to({y: y * this.donutHeight + (this.donutHeight / 2)}, 600, Phaser.Easing.Linear.In, true);

        let tempDonut = new Donut(this.donutHeight, this.donutWidth, randomIndex, donut, [x, y]);
        tempDonut.sprite.anchor.setTo(0.5, 0.5);

        //Enable input on the donut
        tempDonut.sprite.inputEnabled = true;

        tempDonut.sprite.events.onInputDown.add(() => {
            this.donutDown(tempDonut);
        }, this);

        //Trigger the tileDown function whenever the user clicks or taps on this tile
        // donut.events.onInputDown.add(this.tileDown, this);

        return tempDonut;

        //Animate the tile into the correct vertical position

        //Set the tiles anchor point to the center

    }

    donutDown(donut) {
        console.log(donut);

        if (this.canMove) {
            this.activeDonut1 = donut;

            this.startPosX = (donut.sprite.x - this.donutWidth / 2) / this.donutWidth;
            this.startPosY = (donut.sprite.y - this.donutWidth / 2) / this.donutWidth;
        }
    }


    checkMatch() {
        let combinations = this.getMatches();


        if (combinations.length > 0) {
            this.game.time.events.add(600, () => {
                this.destroyDonuts(combinations);
            });
            // change value of deleted donuts to null in MainMatrix  &&   Clear array - combinations
            this.game.time.events.add(1000, () => {
                this.refreshMainMatrix();
                this.fillMatrixByNewDonuts();
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
        // for horizontal combinations

        for (let i = 0; i < this.mainMatrix.length; i++) {
            let tempLine = this.mainMatrix[i];
            groupOf3orMore = [];

            for (let j = 0; j < tempLine.length; j++) {
                if (tempLine[j] && tempLine[j + 1] && tempLine[j + 2]) {
                    //console.log("Input in first IF");
                    //console.log(tempLine[j].index, tempLine[j + 1].index, tempLine[j + 2].index);
                    if ((tempLine[j].index === tempLine[j + 1].index) && (tempLine[j + 1].index === tempLine[j + 2].index)) {
                        //console.log("Input in second if");
                        groupOf3orMore.push(tempLine[j], tempLine[j + 1], tempLine[j + 2]);     // push this 3 elements
                        let tempIndex = tempLine[j].index;                                  //tempValue for checking value of next
                        j += 2;

                        //console.log(j);
                        if ((j === tempLine.length - 1) && (groupOf3orMore.length)) {
                            combinations.push(groupOf3orMore);
                            groupOf3orMore = [];

                        } else {                      // for check next elements : if next donut has the same index, check next donut after this while index element will be another

                            for (let nextDonut = j + 1; nextDonut < tempLine.length; nextDonut++) {

                                if (tempIndex === tempLine[nextDonut].index) {
                                    groupOf3orMore.push(tempLine[nextDonut]);
                                    j += 1;
                                    //console.log('Find 1 more match, Pushing him');
                                } else {
                                    combinations.push(groupOf3orMore);
                                    groupOf3orMore = [];
                                    //console.log('No more matches');
                                    break;
                                }
                            }
                            if (groupOf3orMore.length) {
                                combinations.push(groupOf3orMore);
                                groupOf3orMore = [];
                            }

                        }                             //
                    }
                }
            }
        }


        //for vertical combinations

        for (let i = 0; i < this.mainMatrix.length; i++) {
            let tempRaw = this.mainMatrix.map((value, index) => {
                return value[i];
            });

            groupOf3orMore = [];

            for (let j = 0; j < tempRaw.length; j++) {
                if (tempRaw[j] && tempRaw[j + 1] && tempRaw[j + 2]) {
                    //console.log("Input in first IF");
                    //console.log(tempLine[j].index, tempLine[j + 1].index, tempLine[j + 2].index);
                    if ((tempRaw[j].index === tempRaw[j + 1].index) && (tempRaw[j + 1].index === tempRaw[j + 2].index)) {
                        //console.log("Input in second if");
                        groupOf3orMore.push(tempRaw[j], tempRaw[j + 1], tempRaw[j + 2]);     // push this 3 elements

                        let tempIndex = tempRaw[j].index;                                  //tempValue for checking value of next

                        j += 2;
                        //console.log(j);
                        if ((j === tempRaw.length - 1) && (groupOf3orMore.length)) {
                            combinations.push(groupOf3orMore);
                            groupOf3orMore = [];
                        } else {                      // for check next elements : if next donut has the same index, check next donut after this while index element will be another
                            for (let nextDonut = j + 1; nextDonut < tempRaw.length; nextDonut++) {
                                if (tempIndex === tempRaw[nextDonut].index) {
                                    groupOf3orMore.push(tempRaw[nextDonut]);

                                    j += 1;
                                    //console.log('Find 1 more match, Pushing him');
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

            //Get the location of where the pointer is currently
            let hoverX = this.input.x;
            let hoverY = this.input.y;

            //Figure out what position on the grid that translates to
            let hoverPosX = Math.floor(hoverX / this.donutWidth);
            let hoverPosY = Math.floor(hoverY / this.donutHeight);

            //See if the user had dragged over to another position on the grid
            let difX = (hoverPosX - this.startPosX);
            let difY = (hoverPosY - this.startPosY);

            //Make sure we are within the bounds of the grid
            if (!(hoverPosY > this.mainMatrix[0].length - 1 || hoverPosY < 0) && !(hoverPosX > this.mainMatrix.length - 1 || hoverPosX < 0)) {

                //If the user has dragged an entire tiles width or height in the x or y direction
                //trigger a tile swap
                if ((Math.abs(difY) === 1 && difX === 0) || (Math.abs(difX) === 1 && difY === 0)) {

                    //Prevent the player from making more moves whilst checking is in progress
                    this.canMove = false;

                    //Set the second active tile (the one where the user dragged to)
                    this.activeDonut2 = this.mainMatrix[hoverPosX][hoverPosY];

                    //Swap the two active tiles
                    this.swapDonuts();

                    //After the swap has occurred, check the grid for any matches
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
            let tempX1 = this.activeDonut1.positionInMatrix[0];
            let tempY1 = this.activeDonut1.positionInMatrix[1];
            let tempX2 = this.activeDonut2.positionInMatrix[0];
            let tempY2 = this.activeDonut2.positionInMatrix[1];

            //Swap them in our "theoretical" grid
            this.mainMatrix[tempX1][tempY1] = new Donut(this.donutHeight, this.donutWidth, this.activeDonut2.index, this.activeDonut2.sprite, [tempX1, tempY1], this.activeDonut2.id);
            this.mainMatrix[tempX2][tempY2] = new Donut(this.donutHeight, this.donutWidth, this.activeDonut1.index, this.activeDonut1.sprite, [tempX2, tempY2], this.activeDonut1.id);

            //Actually move them on the screen
            if (!window['music'].mute) {
                this.selectSound.play();
            }

            this.add.tween(this.activeDonut1.sprite).to({
                x: tempX2 * this.donutWidth + (this.donutWidth / 2),
                y: tempY2 * this.donutHeight + (this.donutHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true);

            this.add.tween(this.activeDonut2.sprite).to({
                x: tempX1 * this.donutWidth + (this.donutWidth / 2),
                y: tempY1 * this.donutHeight + (this.donutHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true);

            this.activeDonut1 = this.mainMatrix[tempX1][tempY1];
            this.activeDonut2 = this.mainMatrix[tempX2][tempY2];
        }
    }

    destroyDonuts(combinations) {                                            // animations  ...................
        for (let i = 0; i < combinations.length; i++) {
            for (let j = 0; j < combinations[i].length; j++) {
                window['score'] += 10;
                this.scoreText.text = window['score'];

                if (!window['music'].mute) {
                    this.destroySound.play();
                }

                combinations[i][j].sprite.destroy();
                this.mainMatrix[combinations[i][j].positionInMatrix[0]][combinations[i][j].positionInMatrix[1]] = null;
            }
        }
    }

    refreshMainMatrix() {
        //Loop through each column starting from the left
        for (let i = 0; i < this.mainMatrix.length; i++) {
            //Loop through each tile in column from bottom to top
            for (let j = this.mainMatrix[i].length - 1; j > 0; j--) {

                //If this space is blank, but the one above it is not, move the one above down
                if (this.mainMatrix[i][j] == null && this.mainMatrix[i][j - 1] != null) {
                    //Move the tile above down one
                    let tempDonut = new Donut(this.donutHeight, this.donutWidth, this.mainMatrix[i][j - 1].index, this.mainMatrix[i][j - 1].sprite, [i, j], this.mainMatrix[i][j - 1].id);

                    this.mainMatrix[i][j] = tempDonut;
                    this.mainMatrix[i][j - 1] = null;

                    this.game.add.tween(tempDonut.sprite).to({y: (this.donutHeight * j) + (this.donutHeight / 2)}, 200, Phaser.Easing.Linear.In, true);

                    //The positions have changed so start this process again from the bottom
                    //NOTE: This is not set to me.tileGrid[i].length - 1 because it will immediately be decremented as
                    //we are at the end of the loop.
                    j = this.mainMatrix[i].length;
                }
            }
        }
    }

    fillMatrixByNewDonuts() {

        for (let i = 0; i < this.mainMatrix.length; i++) {

            //Loop through each position in a specific column, starting from the top

            for (let j = 0; j < this.mainMatrix.length; j++) {

                //Add the donut to the game at this matrix position

                if (!this.mainMatrix[i][j]) {
                    this.mainMatrix[i][j] = this.addDonut(i, j);
                }

                //Keep a track of the donut position in our mainMatrix
            }
        }
    }
}

export default PlayState;
