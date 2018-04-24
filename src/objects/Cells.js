/**
 * Created by alinaisabelle on 23.04.18.
 */

class Cells extends Phaser.Sprite {

    constructor(game, x, y, name) {

        super(game, x, y, 'cells');

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.game.stage.addChild(this);

    }

    update(){


    }

}

export default Cells;