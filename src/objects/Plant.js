/**
 * Created by alinaisabelle on 23.04.18.
 */

class Plant extends Phaser.Sprite {

    constructor(game, x, y, name) {

        super(game, x, y, 'plant');

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.scale.x = 0.05;
        this.scale.y = 0.05;

        this.game.stage.addChild(this);
    }

}

export default Plant;