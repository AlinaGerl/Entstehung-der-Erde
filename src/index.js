import GameState from 'states/GameState';
import Urknall from 'states/Urknall';

class Game extends Phaser.Game {

	constructor() {
		super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
		//this.state.add('GameState', GameState, false);
        this.state.add('Urknall', Urknall, false);
		this.state.start('Urknall');
	}

}

new Game();
