import Urknall from 'states/Urknall';

class Game extends Phaser.Game {

	constructor() {
		super(window.innerWidth, window.innerHeight, Phaser.AUTO);

		this.state.add('Urknall', Urknall, false);
		//this.state.start('GameState');
	}

}

new Game();
