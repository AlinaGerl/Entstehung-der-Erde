/**
 * Created by alinaisabelle on 23.04.18.
 */
import Cells from 'objects/Cells';

class DuplicateCells extends Phaser.State {

    preload() {
        this.game.load.image('cells', 'assets/Cell/cell.png');
    }

    create() {
        this.game.load.start();

        this.game.stage.backgroundColor = '#031625';

        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        let cells = new Cells(this.game, center.x + 70, center.y +70);


    }

}

export default DuplicateCells;
