/**
 * Created by alinaisabelle on 24.05.18.
 */
class Pointer extends Phaser.Sprite {

    constructor(game, x, time) {

        let newx = game.world.centerX-375;
        super(game, newx+x, game.world.centerY*2-80, 'pointer');
        this.anchor.x = 0.5;
        this.anchor.y = 0.4;
        //this.scale.x = 0.8;
        this.alpha = 0.9;
        let style = { font: "14px Montserrat", fill: "#fff", align: "center"};
        this.game.pointerText = this.game.make.text(this.game.world.centerX-375+66, this.game.world.centerY*2-45, "4.6 Mrd", style);
        this.game.pointerText.anchor.x = 0.5;
        this.game.stage.addChild(this);

    }

    setPosition (position) {
        this.game.add.tween(this).to( { x: (this.game.world.centerX-375+position)}, 3000, Phaser.Easing.Cubic.InOut, true, 0);
        this.game.add.tween(this.game.pointerText).to( { x: (this.game.world.centerX-375+position)}, 3000, Phaser.Easing.Cubic.InOut, true, 0);
    }

}

export default Pointer;