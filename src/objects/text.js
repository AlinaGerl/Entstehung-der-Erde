/**
 * Created by alinaisabelle on 23.04.18.
 */
class Text extends Phaser.Text {

    constructor(game, text) {

        var style = { font: "16px Helvetica", fill: "#fff"};
        super(game, Math.round(window.innerWidth/2),Math.round(window.innerHeight/6), text, style);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.resolution = window.devicePixelRatio;
        this.game.stage.addChild(this);
        this.game.time.events.add(Phaser.Timer.SECOND * 10, this.destroy, this);
    }


    changeText(text) {
        this.text = text;
    }

}

export default Text;