import {createCustomButton} from '../objects/createCustomButton';

class GameOverState extends Phaser.State{
    create() {
        this.add.sprite(0, 0, 'backgroundImage');
    }
}

export default GameOverState;
