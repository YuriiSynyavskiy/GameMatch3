import { MainMenu } from 'states/MainMenu';

class Game extends Phaser.Game {

	constructor() {
		super(window.innerWidth / 3, window.innerHeight, Phaser.AUTO);
		this.state.add('MainMenu', MainMenu, false);
		this.state.start('MainMenu');
	}

}

new Game();
