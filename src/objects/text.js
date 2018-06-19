/**
 * Created by alinaisabelle on 23.04.18.
 */
class Text extends Phaser.Text {

    constructor(game, text) {

        var style = { font: "14px Montserrat", fill: "#fff", align: "center", wordWrap: true, wordWrapWidth: 1000};
        super(game, Math.round(window.innerWidth/2),Math.round(window.innerHeight/7-20), text, style);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.alpha = 0;
        game.time.events.add(Phaser.Timer.SECOND * 1, this.changeAlpha, this);
        this.resolution = window.devicePixelRatio;
        this.game.stage.addChild(this);
        //this.game.time.events.add(Phaser.Timer.SECOND * 12, this.delete, this);
    }

    delete(game) {
        game.add.tween(this).to( { alpha: 0}, 1000, Phaser.Easing.Cubic.InOut, true);
        game.time.events.add(Phaser.Timer.SECOND * 1, this.reallyDestroy, this);
    }

    changeText(game, text){
        game.add.tween(game.textbox).to( { alpha: 0}, 800, Phaser.Easing.Cubic.InOut, true);
        game.time.events.add(Phaser.Timer.SECOND * 0.8, function() {
            game.textbox.text = text;
        game.add.tween(game.textbox).to( { alpha: 1}, 800, Phaser.Easing.Cubic.InOut, true);
        }
        , this);

    }

    reallyDestroy(){
        this.destroy();
    }
    changeAlpha() {
        this.game.add.tween(this).to( { alpha: 1}, 1000, Phaser.Easing.Cubic.InOut, true, 0);
    }
    changeNewState(game, text){
        game.add.tween(game.textbox).to( { alpha: 0}, 800, Phaser.Easing.Cubic.InOut, true);
        game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                game.time.events.add(Phaser.Timer.SECOND * 0.8, function() {
                        game.textbox.text = text;
                        game.add.tween(game.textbox).to( { alpha: 1}, 800, Phaser.Easing.Cubic.InOut, true);
                    }
                    , this);
            }
            , this);
    }
}

export default Text;