import {createButton} from '../objects/sfxButton';

export class MainMenu extends Phaser.State {
    create() {
        this.add.sprite(0, 0, 'backgroundImage');

        let soundButton = createButton(this, 900, 10, 'soundButton', 80, 80, () => {
            if (window['music'].mute) {
                window['music'].mute = false;

                soundButton.tint = 0xFFFFFF;
            } else {
                soundButton.tint = 0xff0000;

                window['music'].mute = true;
            }
        });

        if (window['music'].mute) {
            soundButton.tint = 0xff0000;
        } else {
            soundButton.tint = 0xFFFFFF;
        }

        this.animate(this, soundButton, 900, 10);

        let donutShadow = this.add.sprite(this.world.centerX - 185, this.world.centerY - 205, 'donutShadow');
        donutShadow.width = 450;
        donutShadow.height = 450;

        let donut = this.add.sprite(this.world.centerX - 225, this.world.centerY - 225, 'donut');
        donut.width = 450;
        donut.height = 450;

        let donutsLogo = this.add.sprite(this.world.centerX + 350, this.world.centerY - 325, 'donutsLogo');
        donutsLogo.width = 480;
        donutsLogo.height = 170;

        this.animate(this, donutsLogo, this.world.centerX + 350, 85);

        let playBtn = createButton(this, this.world.centerX + 350, this.world.centerY + 50, 'playBtn', 230, 150, () => {
            this.state.start('playState');
        });

        this.animate(this, playBtn, this.world.centerX + 350, 195);

        let howToPlayBtn = createButton(this, this.world.centerX + 350, this.world.centerY + 200, 'howToPlayBtn', 210, 130, () => {
            this.state.start('tutorialState');
        });

        this.animate(this, howToPlayBtn, this.world.centerX + 350, 205);
    }

    animate(game, item, start, end, stopNumber = 0) {
        if (stopNumber >= start - end) {
            return 0;
        }

        setTimeout(() => {
            item.x = start - stopNumber;

            stopNumber += 3;

            this.animate(game, item, start, end, stopNumber);
        }, 1);
    }

}
