/**
 * Created by alinaisabelle on 23.04.18.
 */

class Splitter extends Phaser.Sprite {

    constructor(game, x, y, name) {

        super(game, x, y, 'splitter');

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.scale.x = 0.2;
        this.scale.y = 0.2;

        this.game.stage.addChild(this);

    }

    update(){
        let spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(this.move, this);

        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

    }

    move() {
        this.x += 10;
        this.y += 10;
    }

}

export default Splitter;