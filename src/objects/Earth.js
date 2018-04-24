/**
 * Created by alinaisabelle on 23.04.18.
 */

class Earth extends Phaser.Sprite {

    constructor(game, x, y, name, rotate) {

        //game.load.image('firstEarth', '../assets/Urknall/littleEarth.png');
        super(game, x, y, name);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.scale.x = 0.5;
        this.scale.y = 0.5;
        this.angle = rotate;

        this.game.stage.addChild(this);

    }
    startTimer() {
        this.game.time.events.loop(this.rotate).timer.start();
    }

    update() {

        this.angle -= 0.03;
        this.game.earthRotate = this.angle;

    }

}

export default Earth;