/**
 * Created by alinaisabelle on 24.04.18.
 */

class MoonObject extends Phaser.Sprite {

    constructor(game, x, y, name) {

        super(game, game.world.centerX, game.world.centerY, name);

        this.anchor.x = x;
        this.anchor.y = -y;

        this.scale.x = 0.4;
        this.scale.y = 0.4;
        this.angle = this.game.moonRotate;

        this.game.stage.addChild(this);

    }

    update() {

        this.angle += 0.03;
        this.game.moonRotate = this.angle;

    }




}

export default MoonObject;