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
        this.game.textbox.changeText(this.game, this.game.translation.translate("first8_1"));
        this.game.pointer.setPosition(210);
        this.game.pointerText.text = "3.5 Mrd";

        //cells
        this.cell01 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cellsBig');
        this.cell02 = this.game.add.sprite(this.game.world.centerX+200, this.game.world.centerY+190, 'cellsBig');
        this.cell03 = this.game.add.sprite(this.game.world.centerX+500, this.game.world.centerY-100, 'cellsBig');
        this.cell04 = this.game.add.sprite(this.game.world.centerX-300, this.game.world.centerY+80, 'cellsBig');
        this.cell05 = this.game.add.sprite(this.game.world.centerX-400, this.game.world.centerY-100, 'cellsBig');

        this.objects = [this.cell01, this.cell02, this.cell03, this.cell04, this.cell05];

        this.createObjects();

        //for order of events
        this.firstStage = true;
        this.secondStage = false;
        this.cellCounter = 0;
        this.isEnd = false;

        this.game.input.mouse.capture = true;

        //change angle of cells
        this.angle = 0;
        this.play = false;
        this.game.input.onDown.addOnce(this.getIntoWater, this);
    }

    update(){
        if(this.cellCounter === 5) {
            //damit nicht immer in die if gegangen wird
            this.cellCounter = 4;

            //delete input from cells
            for(var i = 0; i <= this.cellsG.children.length-1; i++) {
                this.cellsG.children[i].input.enabled = false;
            }


            //neuer text
            this.game.textbox.changeText(this.game, this.game.translation.translate("last8"));

            // short wait for user before he continues
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.EndScene, this);
        }
        if (this.isEnd && this.game.input.activePointer.leftButton.isDown) {
            this.secondStage = false;
            this.outOfWater();
            this.isEnd = true;
        }
    }

    createObjects() {
        //z-depth
        let earthG = this.game.add.group();
        this.cellsG = this.game.add.group();
        earthG.add(this.earth);
        this.cellsG.add(this.cell05);

        for (var i = 0; i < 5; i++) {
            this.objects[i].anchor.x = 0.5;
            this.objects[i].anchor.y = 0.5;
            this.objects[i].scale.x = 0.0;
            this.objects[i].scale.y = 0.0;
            this.cell01.angle = this.game.rnd.integer();

            this.walk = this.objects[i].animations.add('walk');
            this.objects[i].animations.play('walk', 10, true);

            this.walk.enableUpdate = true;
            this.cellsG.add(this.objects[i]);

            //duplicate on click
            this.objects[i].inputEnabled = true;
        }

        this.cellsG.x = 0.5; this.cellsG.y = 0.5;
        this.cellsG.inputEnableChildren = true;
        this.cellsG.onChildInputDown.add(this.onDown, this);
        earthG.z = 100;
        this.cellsG.z = 120;
    }

    getIntoWater() {
        this.game.add.tween(this.earth.scale).to({ x: 7, y: 7}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cell01.scale).to({ x: 0.2, y: 0.2}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cell02.scale).to({ x: 0.2, y: 0.2}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cell03.scale).to({ x: 0.2, y: 0.2}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cell04.scale).to({ x: 0.2, y: 0.2}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cell05.scale).to({ x: 0.2, y: 0.2}, 3000, Phaser.Easing.Cubic.InOut, true, );

        this.game.time.events.add(Phaser.Timer.SECOND * 2.5, this.firstText, this);

    }

    outOfWater() {
        this.game.add.tween(this.earth.scale).to({ x: 0.5, y: 0.5}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cellsG.scale).to({ x: 0, y: 0}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.cellsG.position).to({ x: this.game.world.centerX, y: this.game.world.centerY}, 3000, Phaser.Easing.Cubic.InOut, true,);
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.nextEvent, this);

    }

    firstText() {
        this.game.textbox.changeText(this.game, this.game.translation.translate("first8_2"));
        this.secondStage = true;
        //this.game.input.onDown.addOnce(this.booleanText03, this);
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
        
        //start animation
        let walk = cell.animations.add('walk');
        cell.animations.play('walk', 5, true);
    }
    EndScene() {
        this.isEnd = true;
    }

    nextEvent() {
        this.cellsG.removeAll();
        this.game.state.start('Eiszeit', false, false);
    }



}

export default DuplicateCells;