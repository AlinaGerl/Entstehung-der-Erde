/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';



class DuplicateCells extends Phaser.State {

    create() {
        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'firstEarth', this.game.earthRotate);

        //text
        this.translation = new Translation(this.game);
        this.text = this.translation.translate("first8_1");
        this.textbox = new Text(this.game, this.text);

        let spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceBar.onDown.add(this.click, this);

        let enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(this.nextEvent, this);


        //cell
        this.cell = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cells');
        this.cell.anchor.x = 0.5;
        this.cell.anchor.y = 0.5;
        this.cell.scale.x = 0;
        this.cell.scale.y = 0;

        //for order of events
        this.firstStage = true;
        this.secondStage = false;
        this.cellCounter = 0;
        this.isEnd = false;
        //duplicate on click
        this.cell.inputEnabled = true;

        this.game.input.mouse.capture = true;

        //z-depth
        let earthG = this.game.add.group();
        this.cellsG = this.game.add.group();
        earthG.add(this.earth);
        this.cellsG.add(this.cell);
        earthG.z = 100
        this.cellsG.z = 120;

        this.cellsG.x = 0.5; this.cellsG.y = 0.5;
        this.cellsG.inputEnableChildren = true;
        this.cellsG.onChildInputDown.add(this.onDown, this);

    }

    update(){
        if (this.firstStage && this.game.input.activePointer.leftButton.isDown) {
            this.firstStage = false;
            this.getIntoWater();
        }
        if(this.cellCounter === 7) {
            //damit nicht immer in die if gegangen wird
            this.cellCounter = 6;

            //delete input from cells
            for(var i = 0; i <= this.cellsG.children.length-1; i++) {
                this.cellsG.children[i].input.enabled = false;
            }

            //neuer text
            let text = this.translation.translate("last8");
            this.textbox.destroy();
            this.textbox = new Text(this.game, text);

            // short wait for user before he continues
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.EndScene, this);
        }
        if (this.isEnd && this.game.input.activePointer.leftButton.isDown) {
            this.secondStage = false;
            this.outOfWater();
            this.isEnd = true;
        }
    }
    getIntoWater() {
        this.textbox.destroy();
        this.game.add.tween(this.earth.scale).to({ x: 7, y: 7}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cell.scale).to({ x: 0.2, y: 0.2}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.time.events.add(Phaser.Timer.SECOND * 2.5, this.firstText, this);

    }

    outOfWater() {
        this.textbox.destroy();
        this.game.add.tween(this.earth.scale).to({ x: 0.5, y: 0.5}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cellsG.scale).to({ x: 0, y: 0}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cellsG.position).to({ x: this.game.world.centerX, y: this.game.world.centerY}, 3000, Phaser.Easing.Cubic.InOut, true,);
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.nextEvent, this);

    }

    firstText() {
        let text = this.translation.translate("first8_2");
        this.textbox = new Text(this.game, text);
        this.secondStage = true;
    }
    onDown (obj) {
        this.addCell();
        this.addCell();
        this.cellCounter ++;
        this.cellsG.remove(obj);
    }

    addCell() {
        let cell = this.game.add.sprite(this.game.rnd.integerInRange(50, this.game.world.width-150),this.game.rnd.integerInRange(150, this.game.world.height-150), 'cells');
        cell.scale.x = 0.2;
        cell.scale.y = 0.2;
        this.cellsG.add(cell);
    }
    click(){
        this.cell.alpha = 1;
        let text = this.translation.translate("first8_2");
        this.textbox.destroy();
        this.textbox = new Text(this.game, text);
    }

    EndScene() {
        this.isEnd = true;
    }
    nextEvent() {
        this.cellsG.removeAll();
        this.textbox.destroy();
        this.game.world.removeAll();
        this.game.state.start('Plants', true, false);
    }



}

export default DuplicateCells;