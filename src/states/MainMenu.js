import {createCustomButton} from '../objects/createCustomButton';
import {checkMusic} from '../objects/chechMusic';
import {createCustomSprite} from '../objects/createCustomSprite';
import {animate} from '../objects/animateSprite';

export class MainMenu extends Phaser.State {
    create() {
        this.add.sprite(0, 0, 'backgroundImage');
        console.log('123');
        let soundButton = createCustomButton(this, 900, 10, 'soundButton', 80, 80, () => {
            if (window['music'].mute) {
                window['music'].mute = false;

                soundButton.tint = 0xFFFFFF;
            } else {
                soundButton.tint = 0xff0000;

                window['music'].mute = true;
            }
        });

        checkMusic(soundButton);

        animate(this, soundButton, 900, 10);

        let donutShadow = createCustomSprite(this, this.world.centerX - 185, this.world.centerY - 205, 'donutShadow', 450, 450);

        let donut = createCustomSprite(this,this.world.centerX - 225, this.world.centerY - 225, 'donut', 450, 450);

        let donutsLogo = createCustomSprite(this,this.world.centerX + 550, this.world.centerY - 325, 'donutsLogo', 480, 170);

        animate(this, donutsLogo, this.world.centerX + 550, 85);

        let playBtn = createCustomButton(this, this.world.centerX + 550, this.world.centerY + 50, 'playBtn', 230, 150, () => {
            this.state.start('playState');
        });

        animate(this, playBtn, this.world.centerX + 550, 195);

        let howToPlayBtn = createCustomButton(this, this.world.centerX + 550, this.world.centerY + 200, 'howToPlayBtn', 210, 130, () => {
            this.state.start('tutorialState');
        });

        animate(this, howToPlayBtn, this.world.centerX + 550, 205);
    }
}
