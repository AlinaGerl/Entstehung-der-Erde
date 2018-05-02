/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';

class DragndropPlants extends Phaser.State {

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'firstEarth', this.game.earthRotate);

        //text
        this.translation = new Translation(this.game);
        let text = this.translation.translate("first10_1");
        this.textbox = new Text(this.game, text);

        //seaweed
        this.seaweed = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'seaWeed2');
        this.seaweed.anchor.x = 0.5;
        this.seaweed.anchor.y = 0.5;
        this.seaweed.scale.x = 0.0;
        this.seaweed.scale.y = 0.0;

        this.seaweed.animations.add("walk", null, 6, true);
        this.seaweed.animations.play('walk');

        this.firstStage = true;
        this.secondStage = false;


        //enable mouse input
        this.game.input.mouse.capture = true;

        //counts plants on earth
        this.plantsCount = 0;

        //z-depth
        let earthG = this.game.add.group();
        let animalsG = this.game.add.group();
        earthG.add(this.earth);
        animalsG.add(this.seaweed);
        earthG.z = 100;
        animalsG.z = 120;
        // this.plant = new Plant(this.game, 70, 70, 'plant');
        //
        this.game.physics.enable( [ this.earth], Phaser.Physics.ARCADE);
        //
        // this.plant.inputEnabled = true;
        // this.plant.input.enableDrag(true);
    }

    update(){
        if (this.firstStage && this.game.input.activePointer.leftButton.isDown) {
            this.firstStage = false;
            this.getIntoWater();
        }
        if (this.secondStage && this.game.input.activePointer.leftButton.isDown) {
            this.secondStage = false;
            this.outOfWater();
        }

        if (this.plantsCount === 6) {
            //this.items.anchor.x = 0.5; this.items.anchor.y = 0.5;
            this.plantsRotate = true;
            this.lastText();
        }

        if (this.plantsRotate) this.items.angle -= 0.03;

        if (this.isEnd && this.game.input.activePointer.leftButton.isDown) {
            this.nextEvent();
        }
        //this.game.physics.arcade.collide(this.earth, this.plant, this.collisionHandler, null, this);
    }

    getIntoWater() {
        this.textbox.destroy();
        this.game.add.tween(this.earth.scale).to({ x: 5, y: 5}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.seaweed.scale).to({ x: 1, y: 1}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.firstText, this);

    }

    outOfWater() {
        this.textbox.destroy();
        this.game.add.tween(this.earth.scale).to({ x: 0.5, y: 0.5}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.seaweed.scale).to({ x: 0, y: 0}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.secondText, this);

    }

    firstText() {
        let text = this.translation.translate("first10_2");
        this.textbox = new Text(this.game, text);
        this.secondStage = true;

    }

    secondText() {
        let text = this.translation.translate("first10_3");
        this.textbox = new Text(this.game, text);
        this.seaweed.destroy();

        this.items = this.game.add.group();
        this.items.x = this.game.world.centerX;
        this.items.y = this.game.world.centerY;

        let item;
        for (var i = 0; i < 6; i++)
        {
            // Directly create sprites from the group.
            item = this.items.create((-this.game.world.centerX+90), (-this.game.world.centerY + 100 + 90 * i), 'plant', i);
            item.anchor.x = 0.5;
            item.anchor.y = 0.5;
            item.scale.x = 0.03;
            item.scale.y = 0.03;
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
        let text = this.translation.translate("last10");
        this.textbox = new Text(this.game, text);
        this.isEnd = true;
    }

    dropHandler(item, pointer) {

        this.isWrong = false;
        this.game.physics.arcade.collide(this.items.children, item, this.stopCollision, null, this);
        this.game.physics.arcade.collide(this.earth, item, this.collisionHandler, null, this);

    }

    stopCollision (obj1, obj2) {
        this.isWrong = true;
        //this.plantsCount--;
        obj2.x = 500;
        obj2.inputEnabled = true;
        obj2.input.enableDrag();

    }

    collisionHandler (obj1, obj2) {
        if (!this.isWrong) {
            this.plantsCount++;
            obj2.inputEnabled = false;
            //this.game.stage.backgroundColor = '#992d2d';
        }

    }

    nextEvent() {
        this.textbox.destroy();
        this.game.world.removeAll();
        this.game.state.start('Magma', true, false);
    }



}

export default DragndropPlants;