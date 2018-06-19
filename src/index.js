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
import Dinos from 'states/Dinosaurier';
import PlanetEntstehung from 'states/PlanetEntstehung';
import PlanetWachstum from 'states/PlanetWachstum';
import Volcanoes from 'states/Volcanoes';
import Eiszeit from 'states/Eiszeit';
import Regenzeit from 'states/Regenzeit';



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
        this.state.add('Dinos', Dinos, false);
        this.state.add('PlanetEntstehung', PlanetEntstehung, false);
        this.state.add('PlanetWachstum', PlanetWachstum, false);
        this.state.add('Volcanoes', Volcanoes, false);
        this.state.add('Eiszeit', Eiszeit, false);
        this.state.add('Regenzeit', Regenzeit, false);


        //global variables
		this.earthRotate = 0;
		this.cellCounter = 0;
        this.moonRotate = 0;
        this.collided = false;
        this.counter = 0;
        this.pointer = null;
        this.pointerText = null;
        this.timeline = null;
        this.translation = null;
        this.textbox = null;
        this.earth = null;

		this.state.start('Preloader');


	}

}

new Game();
