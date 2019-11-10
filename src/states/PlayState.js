import {createCustomButton} from '../objects/createCustomButton';
import Donut from '../objects/DonutConstructor';
import {checkMusic} from "../objects/chechMusic";
import {createCustomSprite} from '../objects/createCustomSprite';

class PlayState extends Phaser.State {
    create() {
        this.add.sprite(0, 0, 'backgroundImage');

        //timer
        let startTimer = new Date();
        this.timeToPlay = 560;
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
        this.id = 0;
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


       let tempMatrix = this.mainMatrix.slice();
        console.log('after creating slice',tempMatrix);

        this.canMove = true;

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


                console.log(donut);
                this.mainMatrix[i][j] = donut;

                this.id+=1;
            }
           }
        this.game.time.events.add(600, ()=>{
            this.checkMatch();
        });
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

        let donut = this.add.sprite((x * this.donutWidth) + this.donutWidth / 2, 0, this.indexes[randomIndex]);

        //Adding to group
        //let donut = this.donuts.create((x * this.donutWidth) + this.donutWidth / 2 + 7, 0,  this.indexes[randomIndex]);
        //


        //Create object donut

        //Animate the tile into the correct vertical position
        this.game.add.tween(donut).to({y: y * this.donutHeight + (this.donutHeight / 2)}, 600, Phaser.Easing.Linear.In, true);


        let tempDonut = new Donut(this.donutHeight, this.donutWidth, randomIndex, donut, [x, y], this.id);
        tempDonut.sprite.anchor.setTo(0.5, 0.5);

        //Enable input on the donut
        tempDonut.sprite.inputEnabled = true;

        tempDonut.sprite.events.onInputDown.add(() => {
            this.donutDown(tempDonut);
        }, this);

        //Trigger the tileDown function whenever the user clicks or taps on this tile
        // donut.events.onInputDown.add(this.tileDown, this);

        return tempDonut;
    }

    donutDown(donut) {
        console.log(donut);

        if (this.canMove) {
            this.activeDonut1 = donut;

            this.startPosX = (donut.sprite.x - this.donutWidth / 2) / this.donutWidth;
            this.startPosY = (donut.sprite.y - this.donutWidth / 2) / this.donutWidth;

            console.log(this.startPosX, this.startPosY);
        }
    }


    checkMatch() {
        let combinations = this.getMatches();


        if (combinations.length > 0) {


            this.game.time.events.add(800, () => {
                this.destroyDonuts(combinations);
            });
            // change value of deleted donuts to null in MainMatrix  &&   Clear array - combinations
            this.game.time.events.add(1500, () => {
                this.refreshMainMatrix();
                this.fillMatrixByNewDonuts();

            });
            this.game.time.events.add(1600, () => {

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
            // let act = JSON.parse(JSON.stringify(this.activeDonut1));
            // let act1 = JSON.parse(JSON.stringify(this.activeDonut2));
            let act = Object.assign({}, this.activeDonut1);
            let act1 = Object.assign({}, this.activeDonut2);
            console.log('donut before swap', act, act1);
          //   let tempX1=this.activeDonut1.positionInMatrix[0];
          // let  tempY1= this.activeDonut1.positionInMatrix[1];
          //   let tempX2=this.activeDonut2.positionInMatrix[0];
          //   let  tempY2= this.activeDonut2.positionInMatrix[1];
          //   console.log("X1 - ", tempX1, "y1 - ", tempY1, "X2 - ", tempX2, "y2 - ", tempY2);
            let donut1Pos = {
                x: (this.activeDonut1.sprite.x - this.donutWidth / 2) / this.donutWidth,
                y: (this.activeDonut1.sprite.y - this.donutWidth / 2) / this.donutWidth
            };
            let donut2Pos = {
                x: (this.activeDonut2.sprite.x - this.donutWidth / 2) / this.donutWidth,
                y: (this.activeDonut2.sprite.y - this.donutWidth / 2) / this.donutWidth
            };
            // let tmp = this.activeDonut2.positionInMatrix;
            // this.activeDonut2.positionInMatrix = this.activeDonut1.positionInMatrix;
            // this.activeDonut1.positionInMatrix = tmp;
            this.mainMatrix[donut1Pos.x][donut1Pos.y] = this.activeDonut2;
            this.mainMatrix[donut2Pos.x][donut2Pos.y] = this.activeDonut1;
            //Swap them in our "theoretical" grid
            // this.activeDonut1 = new Donut(this.donutHeight, this.donutWidth, this.activeDonut1.index, this.activeDonut1.sprite, [tempX2, tempY2], this.activeDonut1.id);
            // this.activeDonut2 = new Donut(this.donutHeight, this.donutWidth, this.activeDonut2.index, this.activeDonut2.sprite, [tempX1, tempY1], this.activeDonut2.id);
            // this.mainMatrix[tempX1][tempY1] =   this.activeDonut2;
            // this.mainMatrix[tempX2][tempY2] =   this.activeDonut1;
                this.add.tween(this.activeDonut1.sprite).to({
                    x: donut2Pos.x * this.donutWidth + (this.donutWidth / 2),
                    y: donut2Pos.y * this.donutHeight + (this.donutHeight / 2)
                }, 200, Phaser.Easing.Linear.In, true);
                this.add.tween(this.activeDonut2.sprite).to({
                    x: donut1Pos.x * this.donutWidth + (this.donutWidth / 2),
                    y:donut1Pos.y* this.donutHeight + (this.donutHeight / 2)
                }, 200, Phaser.Easing.Linear.In, true);


        }

    }

    // destroyDonuts(combinations) {                                            // animations  ...................
    //     for (let i = 0; i < combinations.length; i++) {
    //         console.log('Combanitios[i]',combinations[i]);
    //         for (let j = 0; j < combinations[i].length; j++) {
    //             combinations[i][j].sprite.destroy();
    //             this.mainMatrix[combinations[i][j].positionInMatrix[0]][combinations[i][j].positionInMatrix[1]] = null;
    //         }
    //     }
    // }
    destroyDonuts(matches) {
        for (let i = 0; i < matches.length; i++) {
            for (let j = 0; j < matches[i].length; j++) {

                let gem = matches[i][j];

                let gemPos = this.getGemPos(gem);
                //this.gems.remove(gem);
                matches[i][j].sprite.destroy();
                if (gemPos.i !== -1 && gemPos.j !== -1) {
                    this.mainMatrix[gemPos.i][gemPos.j] = null;

                }
            }
        }
    }
    getGemPos(donut) {
        let position = { i: -1, j: -1 };
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
        let tempMatrix = this.mainMatrix.slice();
        console.log('Matrix after refresh', tempMatrix);
    }

    fillMatrixByNewDonuts() {

        for (let i = 0; i < this.mainMatrix.length; i++) {

            //Loop through each position in a specific column, starting from the top

            for (let j = 0; j < this.mainMatrix.length; j++) {

                //Add the donut to the game at this matrix position

                if (!this.mainMatrix[i][j]) {
                    this.mainMatrix[i][j] = this.addDonut(i, j);
                    this.id+=1;
                }
                                 //Keep a track of the donut position in our mainMatrix


            }
        }
    }
}

export default PlayState;
