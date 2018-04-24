/**
 * Created by alinaisabelle on 23.04.18.
 */
import Translation from './translate';

class Utils extends Phaser.Utils {

    constructor(game) {
        this.game = game;
        this.translation = new Translation(this.game);
    }

    translate(val) {
        return this.translations.translate(val);
    }
}
export default Utils;