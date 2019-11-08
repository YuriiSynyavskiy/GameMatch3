import {createCustomButton} from '../objects/createCustomButton';
import Donut from '../objects/DonutConstructor';
import {checkMusic} from "../objects/chechMusic";
import {createCustomSprite} from '../objects/createCustomSprite';

class PlayState extends Phaser.State {
    create() {
        this.add.sprite(0, 0, 'backgroundImage');

        //This will hold all of the donut sprites
        this.donuts = this.game.add.group();

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

        this.mainMatrix = [                             // global matrix
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null]
        ];                              //
        //Yura

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

        this.generateArray();
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
        console.log(this.mainMatrix);
        //Once the donuts are ready, check for any matches on the grid
        //this.game.time.events.add(600, function(){
        //    this.checkMatch();});

    }

    addDonut(x, y) {                       //for animation of drop-down of donuts
        //Random Index from 1 - 6
        let randomIndex = Math.floor(Math.random() * 6 + 1);

        // Create random donut


        //Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)
        let donut = this.donuts.create((x * this.donutWidth) + this.donutWidth / 2, 0, this.indexes[randomIndex]);


        let tempDonut = new Donut(this.donutHeight, this.donutWidth, randomIndex, donut);
        //Animate the tile into the correct vertical position
        this.game.add.tween(donut).to({y: y * this.donutHeight + (this.donutHeight / 2)}, 500, Phaser.Easing.Linear.In, true)

        //Set the tiles anchor point to the center
        donut.anchor.setTo(0.5, 0.5);

        //Enable input on the tile
        donut.inputEnabled = true;


        //Trigger the tileDown function whenever the user clicks or taps on this tile
        //donut.events.onInputDown.add(me.tileDown, me);

        return tempDonut;
    }

    checkMatch() {
        console.log('Already is ready 3 matches');
    }

}

export default PlayState;
