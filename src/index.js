import GameState from 'states/GameState';
import Urknall from 'states/Urknall';
import Preloader from 'states/Preloader';
import Kollision from 'states/Kollision';
import Cells from 'states/DuplicateCells';
import Plants from 'states/DragndropPlants';
import Moon from 'states/Moon';
import Magma from 'states/Magma';
import People from 'states/People';
import End from 'states/End';


class Game extends Phaser.Game {

	constructor() {
		super(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'content', window.devicePixelRatio);
		//this.state.add('GameState', GameState, false);
        this.state.add('Preloader', Preloader, false);
        this.state.add('Urknall', Urknall, false);
        this.state.add('Kollision', Kollision, false);
        this.state.add('Cells', Cells, false);
        this.state.add('Plants', Plants, false);
        this.state.add('Moon', Moon, false);
        this.state.add('Magma', Magma, false);
        this.state.add('People', People, false);
        this.state.add('End', End, false);

        //global variables
		this.earthRotate = 0;
		this.counter = 0;
        this.moonRotate = 0;
        this.collided = false;

		this.state.start('Preloader');


	}

}

new Game();
