/**
 * Created by alinaisabelle on 23.04.18.
 */
import littleEarth from '../assets/Urknall/kleinerPlanet.png';

class Earth extends Phaser.Sprite {

    constructor(game, x, y, rotateSpeed) {

        super(game, x, y, littleEarth);

        //this._speed = 125; //ms
        //this._colorIndex = 0;
        //this._colors = ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#0392cf'];

        //this.colorize();
        this.rotateSpeed = rotateSpeed;
        this.startTimer();

        this.game.stage.addChild(this);

    }

    startTimer() {
        this.game.time.events.loop(this.rotate).timer.start();
    }

    rotate(){
        this.angle += this.rotateSpeed;
    }

}

export default Earth;