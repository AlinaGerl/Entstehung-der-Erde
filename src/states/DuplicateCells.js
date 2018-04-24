/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';

class DuplicateCells extends Phaser.State {

    create() {
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };

        this.cell = this.game.add.sprite(center.x, center.y, 'cells');
        this.cell.anchor.x = 0.5;
        this.cell.anchor.y = 0.5;
        this.cell.scale.x = 0.2;
        this.cell.scale.y = 0.2;

        this.cell.inputEnabled = true;
        this.cell.events.onInputDown.add(this.listener, this);

        this.game.stage.backgroundColor = '#031625';
    }

    update(){
        if(this.game.cellCounter === 5) {
            this.nextEvent();
        }
    }

    listener () {
        let cell = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'cells');
        cell.scale.x = 0.2;
        cell.scale.y = 0.2;
        this.game.cellCounter ++;
    }


    nextEvent() {
        this.game.world.removeAll();
        console.log('destroyed');
        this.game.state.start('DragndropPlants', true, false);
    }



}

export default DuplicateCells;