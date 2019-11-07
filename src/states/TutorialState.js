import {createButton} from '../objects/sfxButton';
import {MainMenu} from '../states/MainMenu';

class TutorialState extends Phaser.State {
    preload() {
        this.load.audio('backgroundMusic', '../assets/audio/background.mp3');
        this.load.image('backgroundImage', '../assets/images/backgrounds/background.jpg');
        this.load.image('returnButton', '../assets/images/btn-return.png');
        this.load.image('donutRed', '../assets/images/game/gem-01.png');
        this.load.image('donutBlue', '../assets/images/game/gem-02.png');
        this.load.bitmapFont('fredokaOne', '../assets/fonts/FredokaOne-Regular.ttf');
        this.state.add('mainMenu', MainMenu, false);
    }

    create() {
        let backgroundMusic = this.add.audio('backgroundMusic');
        backgroundMusic.loop = true;
        backgroundMusic.play();

        this.add.sprite(0, 0, 'backgroundImage');

        let returnBtn = createButton(this, this.world.centerX + 110, this.world.centerY + 350, 'returnButton', 230, 150, () => {
            backgroundMusic.mute = true;

            this.state.start('mainMenu');
        });

        returnBtn.anchor = {
            x: 1,
            y: 1
        };

        let tutorialText1 = this.add.text(
            this.world.centerX + 280, this.world.centerY - 80,
            '          How to play \nYou have to make a horizontal or vertical line of 3 or more same donuts',
            { fontSize: '55px', fill: 'violet', font: "fredokaOne", wordWrap: true, wordWrapWidth: 600 }
        );

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

        let tutorialText2 = this.add.text(
            this.world.centerX + 270, this.world.centerY + 200,
            'You have 30 seconds so get as much score as you can.',
            { font: "55px Fredoka One", fill: 'violet', wordWrap: true, wordWrapWidth: 600 }
        );

        tutorialText2.anchor = {
            x: 1,
            y: 1
        };
    }
}

export default TutorialState;
