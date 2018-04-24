import GameState from 'states/GameState';
import Urknall from 'states/Urknall';
import Preloader from 'states/Preloader';
import Kollision from 'states/Kollision';

class Game extends Phaser.Game {

	constructor() {
		super(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'content', window.devicePixelRatio);
		//this.state.add('GameState', GameState, false);
        this.state.add('Preloader', Preloader, false);
        this.state.add('Urknall', Urknall, false);
        this.state.add('Kollision', Kollision, false);

		this.earthRotate = 0;

		this.state.start('Preloader');


	}

}

new Game();
