/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';



class DuplicateCells extends Phaser.State {

    create() {
        this.game.stage.backgroundColor = '#031625';

        //text
        this.translation = new Translation(this.game);
        this.text = this.translation.translate("first8_1");
        this.textbox = new Text(this.game, this.text);

        let spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceBar.onDown.add(this.click, this);

        let enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(this.nextEvent, this);



        //cell
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        this.cell = this.game.add.sprite(center.x, center.y, 'cells');
        this.cell.alpha = 0;
        this.cell.anchor.x = 0.5;
        this.cell.anchor.y = 0.5;
        this.cell.scale.x = 0.2;
        this.cell.scale.y = 0.2;

        //duplicate on click
        this.cell.inputEnabled = true;
        this.cell.events.onInputDown.add(this.listener, this);


    }

    update(){
        if(this.game.cellCounter === 5) {
            let text = this.translation.translate("last8");
            this.textbox.destroy();
            this.textbox = new Text(this.game, text);
            //this.nextEvent();
        }
    }

    listener () {
        let cell = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'cells');
        cell.scale.x = 0.2;
        cell.scale.y = 0.2;
        this.game.cellCounter ++;
    }

    click(){
        this.cell.alpha = 1;
        let text = this.translation.translate("first8_2");
        this.textbox.destroy();
        this.textbox = new Text(this.game, text);
    }


    nextEvent() {
        this.textbox.destroy();
        this.game.world.removeAll();
        this.game.state.start('Plants', true, false);
    }



}

export default DuplicateCells;