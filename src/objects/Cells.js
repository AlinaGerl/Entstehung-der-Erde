/**
 * Created by alinaisabelle on 23.04.18.


class Cells extends Phaser.Sprite {

    constructor(game, x, y, name) {

            super(game, x, y, 'cells');

            this.anchor.x = 0.5;
            this.anchor.y = 0.5;

            this.scale.x = 0.2;
            this.scale.y = 0.2;

            this.inputEnabled = true;
            this.events.onInputDown.add(this.listener, this);


            this.game.stage.addChild(this);

    }

    listener () {
        let cell = new Cells(this.game, this.game.world.randomX, this.game.world.randomY);
        this.game.cellCounter ++;
    }

}

export default Cells; */