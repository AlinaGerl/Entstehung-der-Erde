/**
 * Created by alinaisabelle on 23.04.18.
 */
import RainbowText from 'objects/RainbowText';
import Earth from 'objects/Earth';
import Splitter from 'objects/Splitter';

class Urknall extends Phaser.State {

    preload() {
        this.game.load.image('firstEarth', 'assets/Urknall/littleEarth.png');
        this.game.load.image('splitter', 'assets/Urknall/splitter.png');
    }

    create() {
        this.game.load.start();

        this.game.stage.backgroundColor = '#031625';

        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        let earth = new Earth(this.game, center.x, center.y);
        let splitter = new Splitter(this.game, 70, 50);

        splitter.inputEnabled = true;
        splitter.input.enableDrag(true);


    }

}

export default Urknall;
