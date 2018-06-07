/**
 * Created by alinaisabelle on 24.05.18.
 */
class timeline extends Phaser.Sprite {

    constructor(game) {

        //game.load.image('firstEarth', '../assets/Urknall/littleEarth.png');
        super(game, game.world.centerX, game.world.centerY*2-80, 'timeline');
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        //this.scale.x = 0.8;
        this.alpha = 0.9;
        this.game.stage.addChild(this);

    }

}

export default timeline;