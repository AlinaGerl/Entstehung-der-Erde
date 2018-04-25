/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';

class Dinosaurs extends Phaser.State {

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'firstEarth', this.game.earthRotate);

        //text
        this.translation = new Translation(this.game);
        let text = this.translation.translate("first12");
        this.textbox = new Text(this.game, text);

        this.firstStage = true;
        this.secondStage = false;



        //enable mouse input
        this.game.input.mouse.capture = true;

        //counts plants on earth
        this.dinosCount = 0;


        //z-depth
        let earthG = this.game.add.group();
        this.DinosG = this.game.add.group();
        this.onEarth = this.game.add.group(); this.onEarth.x = this.game.world.centerX; this.onEarth.y = this.game.world.centerY;
        earthG.add(this.earth);
        earthG.z = 100;
        this.DinosG.z = 120;
        this.onEarth.z = 130;
        this.game.physics.enable( [ this.earth], Phaser.Physics.ARCADE);

        this.dinosReady();
    }

    update(){
        if (this.dinosCount === 6) {
            //this.items.anchor.x = 0.5; this.items.anchor.y = 0.5;
            this.dinosRotate = true;
            this.lastText();
        }

        if (this.dinosRotate) {

            this.DinosG.angle -= 0.03;

            for(var i = 0; i <= this.DinosG.children.length-1; i++) {
                this.DinosG.children[i].angle += 0.03;
            }
        }



        if (this.isEnd && this.game.input.activePointer.leftButton.isDown) {
            this.nextEvent();
        }
        //this.game.physics.arcade.collide(this.earth, this.plant, this.collisionHandler, null, this);
    }

    dinosReady() {
        this.DinosG.x = this.game.world.centerX;
        this.DinosG.y = this.game.world.centerY;

        let item;
        for (var i = 0; i < 6; i++)
        {
            // Directly create sprites from the group.
            item = this.DinosG.create((-this.game.world.centerX+90), (-this.game.world.centerY + 200 + 80 * i), 'dino', i);
            item.anchor.x = 0.5;
            item.anchor.y = 0.5;
            item.scale.x = 0.1;
            item.scale.y = 0.1;
            item.name = 'block' + i;

            // Enable input detection, then it's possible be dragged.
            item.inputEnabled = true;

            // Make this item draggable.
            item.input.enableDrag();

            // Then we make it snap to 90x90 grids.
            //item.input.enableSnap(50, 50, false, true);

            // Add a handler to remove it using different options when dropped.
            this.game.physics.enable( [ item ], Phaser.Physics.ARCADE);
            item.events.onDragStop.add(this.dropHandler, this);
        }



    }

    lastText() {
        this.textbox.destroy();
        let text = this.translation.translate("last12");
        this.textbox = new Text(this.game, text);
        this.isEnd = true;
    }

    dropHandler(item, pointer) {
        this.isWrong = false;
        this.game.physics.arcade.collide(this.DinosG.children, item, this.stopCollision, null, this);
        this.game.physics.arcade.collide(this.earth, item, this.collisionHandler, null, this);

    }

    stopCollision (obj1, obj2) {
        this.isWrong = true;
        //this.plantsCount--;
        obj2.x = 500;
        obj2.inputEnabled = true;
        obj2.input.enableDrag();

    }

    collisionHandler (obj1, obj2){
        if (!this.isWrong) {
            this.dinosCount++;
            obj2.inputEnabled = false;
            //this.onEarth.add(obj2);
            //this.game.stage.backgroundColor = '#992d2d';
        }

    }

    nextEvent() {
        this.textbox.destroy();
        this.game.world.removeAll();
        this.game.state.start('Magma', true, false);
    }



}

export default Dinosaurs;