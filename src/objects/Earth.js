/**
 * Created by alinaisabelle on 23.04.18.
 */

class Earth extends Phaser.Sprite {

    constructor(game, x, y, name) {

        //game.load.image('firstEarth', '../assets/Urknall/littleEarth.png');
        super(game, x, y, 'firstEarth');
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.scale.x = 0.5;
        this.scale.y = 0.5;
        this._speed = 125; //ms
        //this._colorIndex = 0;
        //this._colors = ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#0392cf'];

        //this.colorize();
        //this.rotate();
        //this.startTimer();

        this.game.stage.addChild(this);

    }



    startTimer() {
        this.game.time.events.loop(this.rotate).timer.start();
    }

    update() {

        this.angle -= 0.04;

    }

}

export default Earth;