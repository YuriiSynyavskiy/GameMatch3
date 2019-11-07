import Donut from '../objects/DonutConstructor';
import {createButton} from '../objects/sfxButton';

let mainMatrix = []; // global matrix
let indexes = {
    1:'red-01',
    2:'blue-02',
    3:'green-03',
    4:'lightBlue-04',
    5:'yellow-05',
    6:'pink-06'
};

class PlayState extends Phaser.State{

    preload() {
        this.load.image('backgroundImage', '../assets/images/backgrounds/background.jpg');
        this.load.image('soundButton', '../assets/images/btn-sfx.png');
        this.load.image('scoreTable', '../assets/images/bg-score.png');
        this.load.image('timeUp', '../assets/images/text-timeup.png');
        this.load.images(
            ['red-01', 'blue-02','green-03','lightBlue-04','yellow-05','pink-06'],
            [
                '../assets/images/game/gem-01.png','../assets/images/game/gem-02.png','../assets/images/game/gem-03.png',
                '../assets/images/game/gem-04.png','../assets/images/game/gem-05.png','../assets/images/game/gem-06.png'
            ]
        );
        this.load.audio('backgroundMusic', '../assets/audio/background.mp3');
        this.load.bitmapFont('fredokaOne', '../assets/fonts/FredokaOne-Regular.ttf');
    }

    create() {
        this.add.sprite(0, 0, 'backgroundImage');

        let backgroundMusic = this.add.audio('backgroundMusic');
        backgroundMusic.loop = true;
        backgroundMusic.play();

        let soundButton = createButton(this, 10, 10, 'soundButton', 80, 80, () => {
            if (backgroundMusic.mute === true) {
                backgroundMusic.mute = false;

                soundButton.tint = 0xFFFFFF;
            } else {
                backgroundMusic.mute = true;

                soundButton.tint = 0xff0000;
            }
        });
        // scene, sprites

        let scoreTable = this.add.sprite(this.world.centerX - 170, this.world.centerY - 380, 'scoreTable');
        scoreTable.width = 380;
        scoreTable.height = 150;

        let scoreText = this.add.text(this.world.centerX, this.world.centerY - 348, '0', {font: '58px Fredoka One', fill: 'red'});

        //function which generate array
        //function which animaate/method Donut
    }

    generateArray(){
        // mainMatrix.push(new Donut(200,200,2,0));
        // this.add.sprite(0,0, indexes[mainMatrix[0].index]);
    }

}

export default PlayState;
