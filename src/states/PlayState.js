import {createCustomButton} from '../objects/createCustomButton';
import Donut from '../objects/DonutConstructor';
import {checkMusic} from "../objects/chechMusic";
import {createCustomSprite} from '../objects/createCustomSprite';

class PlayState extends Phaser.State {
    create() {
        this.add.sprite(0, 0, 'backgroundImage');

        //timer
        let startTimer = new Date();
        this.timeToPlay = 60;
        this.timeExpired = 0;

        let timeLabel = this.add.text(500, 38, "60", {font: "50px Fredoka One", fill: "red"});

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

        let scoreText = this.add.text(this.world.centerX, this.world.centerY - 351, '0', {
            font: '58px Fredoka One',
            fill: 'red'
        });


        /*this.trainingSet = [
            [1, 1, 1, 2, 2, 2],
            [5, 5, 5, 5, 6, 2],
            [1, 5, 3, 4, 6, 5],
            [2, 5, 4, 3, 6, 3],
            [1, 6, 6, 6, 6, 6],
            [2, 2, 6, 3, 3, 3]
        ];*/
        //Yura

        // this.donuts = this.game.add.group();

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

        this.activeDonut1 = null;
        this.activeDonut2 = null;

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
        this.checkMatch();

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

        //Once the donuts are ready, check for any matches on the grid
        //this.game.time.events.add(600, function(){
        //    this.checkMatch();});

    }


    addDonut(x, y) {                       //for animation of drop-down of donuts

        //Random Index from 1 - 6
        let randomIndex = Math.floor(Math.random() * 6 + 1);
        //for training set
        //let randomIndex = this.trainingSet[x][y];
        //Create random donut
        //Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)

        let donut = this.add.sprite((x * this.donutWidth) + this.donutWidth / 2 + 7, 0, this.indexes[randomIndex]);

        //Adding to group
        //let donut = this.donuts.create((x * this.donutWidth) + this.donutWidth / 2 + 7, 0,  this.indexes[randomIndex]);
        //


        //Create object donut

        //Animate the tile into the correct vertical position
        this.game.add.tween(donut).to({y: y * this.donutHeight + (this.donutHeight / 2) + 120}, 600, Phaser.Easing.Linear.In, true);


        let tempDonut = new Donut(this.donutHeight, this.donutWidth, randomIndex, donut, [x, y]);
        //Animate the tile into the correct vertical position

        //Set the tiles anchor point to the center
        donut.anchor.setTo(0.5, 0.5);

        //Enable input on the donut
        donut.inputEnabled = true;


        //Trigger the tileDown function whenever the user clicks or taps on this tile
        donut.events.onInputDown.add(this.tileDown, this);

        return tempDonut;
    }

    destroyDonuts(combinations) {                                            // animations  ...................

        for (let i = 0; i < combinations.length; i++) {
            for (let j = 0; j < combinations[i].length; j++) {
                combinations[i][j].sprite.destroy();
            }
        }
        console.log(combinations);
    }

    checkMatch() {
        let combinations = this.getMatches();
        this.game.time.events.add(1000, () => {                         // destroying existing combinations with delay 1s
            this.destroyDonuts(combinations);

            this.canMove = true;
        });
        // change value of deleted donuts to null in MainMatrix  &&   Clear array - combinations
        this.game.time.events.add(1500, () => {                         // destroying existing combinations with delay 1s

            this.resetMatrixValues(combinations);
            console.log(this.mainMatrix);
        });
        this.game.time.events.add(1600, () => {
            this.refreshMainMatrix();                                       //move down all donuts if needed after destroying ready combination
        });
        this.game.time.events.add(1800, () => {

            this.fillMatrixByNewDonuts();

        });


        // check again for combinations

        // this.game.time.events.add(600, ()=>{
        //    this.checkMatch();
        // });

        //Danylo's part

        //this.swapDonuts();

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
            let tempRaw = this.mainMatrix.map(function (value, index) {
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


        return combinations;
    }

    tileDown(tile, pointer) {
        if (this.canMove) {
            this.activeDonut1 = tile;

            this.startPosX = (tile.x - this.donutWidth / 2) / this.donutWidth;
            this.startPosY = (tile.y - this.donutHeight / 2) / this.donutHeight;
        }
    }


    update() {

        // this.swapGems(x, y);
        //if( this.checkMatches()){
        //this.animate();
        //}else{
        //
        //}
        // if (this.activeDonut1 && !this.activeDonut2) {
        //     let hoverX = this.input.x;
        //     let hoverY = this.input.y;
        //
        //     let hoverPosX = Math.floor(hoverX / this.donutWidth);
        //     let hoverPosY = Math.floor(hoverY / this.donutHeight);
        //
        //     let difX = (hoverPosX - this.startPosX);
        //     let difY = (hoverPosY = this.startPosY);
        //     console.log(Math.floor(Math.abs(difX)), Math.floor(Math.abs(difY)));
        //     if (!(hoverPosY > this.mainMatrix[0].length - 1 || hoverPosY < 0) && !(hoverPosX > this.mainMatrix.length - 1 || hoverPosX < 0)) {
        //
        //         if ((Math.floor(Math.abs(difY)) === 1 && Math.floor(difX) === 0) || (Math.floor(Math.abs(difX) === 1) && Math.floor(difY) === 0)) {
        //             console.log('2');
        //             this.canMove = false;
        //
        //             this.activeDonut2 = this.mainMatrix[hoverPosX][hoverPosY];
        //
        //             this.swapTiles();
        //
        //             this.time.events.add(300, () => {
        //                 this.checkMatch();
        //             });
        //         }
        //     }
        // }

        if (this.activeDonut1 && !this.activeDonut2) {
            let pointerX = this.game.input.x;
            let pointerY = this.game.input.y;
            let pointerPosX = Math.floor(pointerX / this.donutWidth);
            let pointerPosY = Math.floor(pointerY / this.donutHeight);
            let difX = (pointerPosX - this.startPosX);
            let difY = (pointerPosY - this.startPosY);
            if (pointerPosY < this.mainMatrix[0].length && pointerPosX < this.mainMatrix.length) {
                console.log(Math.floor(Math.abs(difY)));
                console.log(Math.floor(Math.abs(difX)));
                if ((Math.floor(Math.abs(difY)) === 1 && Math.floor(difX) === 0) || (Math.floor(Math.abs(difX)) === 1 && Math.floor(difY) === 0)) {
                    this.canMove = false;
                    this.activeDonut2 = this.mainMatrix[pointerPosX][pointerPosY];
                    this.swapTiles();
                    this.game.time.events.add(500, () => this.checkMatch());
                }
            }
        }

        if (this.timeExpired > this.timeToPlay) {
            this.state.start('gameOverState');
        }
    }

    swapTiles() {
        if (this.activeDonut1 && this.activeDonut2) {

            let donut1Pos = {
                x: (this.activeDonut1.x - this.donutWidth / 2) / this.donutWidth,
                y: (this.activeDonut1.y - this.donutHeight / 2) / this.donutHeight
            };
            let donut2Pos = {
                x: (this.activeDonut2.x - this.donutWidth / 2) / this.donutWidth,
                y: (this.activeDonut2.y - this.donutHeight / 2) / this.donutHeight
            };
            console.log(this.activeDonut2, this.activeDonut1);
            //Swap them in our "theoretical" grid
            this.mainMatrix[Math.floor(donut1Pos.x)][Math.floor(donut1Pos.y)] = this.activeDonut2;
            this.mainMatrix[Math.floor(donut2Pos.x)][Math.floor(donut2Pos.y)] = this.activeDonut1;

            //Actually move them on the screen
            this.game.add.tween(this.activeDonut1).to({
                x: donut2Pos.x * this.donutWidth + (this.donutWidth / 2),
                y: donut2Pos.y * this.tileHeight + (this.tileHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true);
            this.game.add.tween(this.activeDonut2).to({
                x: donut1Pos.x * this.donutWidth + (this.donutWidth / 2),
                y: donut1Pos.y * this.donutHeight + (this.donutHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true);

            this.activeDonut1 = this.mainMatrix[Math.floor(donut1Pos.x)][Math.floor(donut1Pos.y)];
            this.activeDonut2 = this.mainMatrix[Math.floor(donut2Pos.x)][Math.floor(donut2Pos.y)];

        }
    }

    resetMatrixValues(combinations) {
        for (let i = 0; i < combinations.length; i++) {
            for (let j = 0; j < combinations[i].length; j++) {
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
                    let tempDonut = this.mainMatrix[i][j - 1];
                    let tempDonutSprite = tempDonut.sprite;
                    this.mainMatrix[i][j] = tempDonut;
                    this.mainMatrix[i][j - 1] = null;
                    this.game.add.tween(tempDonutSprite).to({y: (this.donutHeight * j) + (this.donutHeight / 2) + 120}, 200, Phaser.Easing.Linear.In, true);

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
                    let donut = this.addDonut(i, j);
                    this.mainMatrix[i][j] = donut;
                }
                //Keep a track of the donut position in our mainMatrix


            }
        }
    }
}

export default PlayState;
