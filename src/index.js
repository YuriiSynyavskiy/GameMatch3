import { MainMenu } from 'states/MainMenu';

class Game extends Phaser.Game {

	constructor() {
		super(window.innerWidth / 2.5, window.innerHeight, Phaser.AUTO);
		this.state.add('MainMenu', MainMenu, false);
		this.state.start('MainMenu');
	}
//sex with Yura and his mom
}

new Game();
