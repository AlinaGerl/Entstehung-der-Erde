/**
 * Created by alinaisabelle on 16.05.18.
 */
class Text extends Phaser.Text {

    constructor(game) {

        var style = { font: "50px Roboto Mono", fill: "#fff", align: "center", wordWrap: true, wordWrapWidth: 1000};
        super(game, Math.round(window.innerWidth - 150),Math.round(window.innerHeight - 50), "", style);
        this.anchor.x = 0;
        this.anchor.y = 1;
        this.resolution = window.devicePixelRatio;
        this.game.stage.addChild(this);

        let time = 10;
        for(var i = 0; i<3; i++){
            this.game.time.events.add(Phaser.Timer.SECOND * time, this.nextPoint, this);
            time += 1;
        }


        //this.game.time.events.add(Phaser.Timer.SECOND * 12, this.delete, this);
    }
    nextPoint() {
        this.text += ".";
        //this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.alsonextPoint, this);
    }
    alsonextPoint() {
        this.text += " .";
    }
    delete() {
        this.destroy(true);
    }
}

export default Text;