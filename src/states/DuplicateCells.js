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


        //cells
        this.cell01 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cellsBig');
        this.cell01.anchor.x = 0.5;
        this.cell01.anchor.y = 0.5;
        this.cell01.scale.x = 0;
        this.cell01.scale.y = 0;
        this.cell01.angle = 20;

        this.cell02 = this.game.add.sprite(this.game.world.centerX+200, this.game.world.centerY+190, 'cellsBig');
        this.cell02.anchor.x = 0.5;
        this.cell02.anchor.y = 0.5;
        this.cell02.scale.x = 0;
        this.cell02.scale.y = 0;
        this.cell02.angle = 50;

        this.cell03 = this.game.add.sprite(this.game.world.centerX+500, this.game.world.centerY-100, 'cellsBig');
        this.cell03.anchor.x = 0.5;
        this.cell03.anchor.y = 0.5;
        this.cell03.scale.x = 0;
        this.cell03.scale.y = 0;
        this.cell03.angle = 80;

        this.cell04 = this.game.add.sprite(this.game.world.centerX-300, this.game.world.centerY+80, 'cellsBig');
        this.cell04.anchor.x = 0.5;
        this.cell04.anchor.y = 0.5;
        this.cell04.scale.x = 0;
        this.cell04.scale.y = 0;
        this.cell01.angle = -30;

        this.cell05 = this.game.add.sprite(this.game.world.centerX-400, this.game.world.centerY-100, 'cellsBig');
        this.cell05.anchor.x = 0.5;
        this.cell05.anchor.y = 0.5;
        this.cell05.scale.x = 0;
        this.cell05.scale.y = 0;
        this.cell01.angle = -20;

        //for order of events
        this.firstStage = true;
        this.secondStage = false;
        this.cellCounter = 0;
        this.isEnd = false;
        //duplicate on click
        this.cell01.inputEnabled = true;
        this.cell02.inputEnabled = true;
        this.cell03.inputEnabled = true;
        this.cell04.inputEnabled = true;
        this.cell05.inputEnabled = true;

        this.game.input.mouse.capture = true;

        //z-depth
        let earthG = this.game.add.group();
        this.cellsG = this.game.add.group();
        earthG.add(this.earth);
        this.cellsG.add(this.cell01);
        this.cellsG.add(this.cell02);
        this.cellsG.add(this.cell03);
        this.cellsG.add(this.cell04);
        this.cellsG.add(this.cell05);
        earthG.z = 100;
        this.cellsG.z = 120;

        this.cellsG.x = 0.5; this.cellsG.y = 0.5;
        this.cellsG.inputEnableChildren = true;
        this.cellsG.onChildInputDown.add(this.onDown, this);

        //start animation for big cells
        this.walk = this.cell01.animations.add('walk');
        this.walk = this.cell02.animations.add('walk');
        this.walk = this.cell03.animations.add('walk');
        this.walk = this.cell04.animations.add('walk');
        this.walk = this.cell05.animations.add('walk');
        this.cell01.animations.play('walk', 5, true);
        this.cell02.animations.play('walk', 5, true);
        this.cell03.animations.play('walk', 5, true);
        this.cell04.animations.play('walk', 5, true);
        this.cell05.animations.play('walk', 5, true);

        //change angle of cells
        this.angle = 0;

        this.walk.enableUpdate = true;
        this.play = false;

    }

    update(){
        if (this.firstStage && this.game.input.activePointer.leftButton.isDown) {
            this.firstStage = false;
            this.getIntoWater();
        }
        if(this.cellCounter === 5) {
            //damit nicht immer in die if gegangen wird
            this.cellCounter = 4;

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
        this.game.add.tween(this.cell01.scale).to({ x: 0.2, y: 0.2}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cell02.scale).to({ x: 0.2, y: 0.2}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cell03.scale).to({ x: 0.2, y: 0.2}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cell04.scale).to({ x: 0.2, y: 0.2}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cell05.scale).to({ x: 0.2, y: 0.2}, 3000, Phaser.Easing.Cubic.InOut, true, );

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
        this.cellCounter++;
        this.cellsG.remove(obj);
    }

    addCell() {
        this.counter++;
        let cell = this.game.add.sprite(this.game.rnd.integerInRange(50, this.game.world.width-150),this.game.rnd.integerInRange(150, this.game.world.height-150), 'cellsSmall');
        this.angle += this.game.rnd.integerInRange(0, 360);
        cell.scale.x = 0.2;
        cell.scale.y = 0.2;
        cell.angle = this.angle;
        this.cellsG.add(cell);
        cell.input.enabled = false;

        this.counter++;
        //start animation
        let walk = cell.animations.add('walk');
        cell.animations.play('walk', 5, true);
    }

    click(){
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