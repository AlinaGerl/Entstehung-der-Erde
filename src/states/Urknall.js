/**
 * Created by alinaisabelle on 23.04.18.
 */
import RainbowText from 'objects/RainbowText';
import Earth from 'objects/Earth';

class Urknall extends Phaser.State {


    preload() {
        this.game.load.image('firstEarth', '../assets/Urknall/littleEarth.png');
    }
    create() {
        let center = { x: this.game.world.centerX, y: this.game.world.centerY }
        let earth = new Earth(this.game, center.x, center.y);
    }

}

export default Urknall;
