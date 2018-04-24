/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';

class Urknall extends Phaser.State {

    create() {
        let center = { x: this.game.world.centerX, y: this.game.world.centerY }
        this.earth = new Earth(this.game, center.x, center.y, 'firstEarth',this.game.earthRotate);
        let translation = new Translation(this.game);
        this.text = translation.translate("first1");
        this.textbox = new Text(this.game, this.text);


        let key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key1.onDown.add(this.nextEvent, this);


    }

    nextEvent() {
        this.textbox.destroy();
        this.earth.destroy();
        this.game.state.start('Kollision');
    }
}

export default Urknall;
