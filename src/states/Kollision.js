/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';

class Kollision extends Phaser.State {


    create() {
        let center = { x: this.game.world.centerX, y: this.game.world.centerY }
        this.earth = new Earth(this.game, center.x, center.y, 'firstEarth', this.game.earthRotate);
        console.info(this.game.earthRotate);
        let translation = new Translation(this.game);
        this.text = translation.translate("first4");
        this.textbox = new Text(this.game, this.text);
        this.button = this.game.add.sprite(this.game.world.centerX, window.innerHeight, 'redButton');
        this.button.anchor.x = 0.5;
        this.button.anchor.y = 0.5;
        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.moveButton, this);
    }

    moveButton() {
        while (this.button.y >= (window.innerHeight/6 * 5)) {
            this.button.y -= 1;
        }
    }
}

export default Kollision;