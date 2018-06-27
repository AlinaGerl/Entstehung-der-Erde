/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';

class DragndropPlants extends Phaser.State {

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'StaubPlanet', this.game.earthRotate);

        this.greenWorld = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'EchsenPlanet');
        this.greenWorld.alpha = 0; this.greenWorld.scale.x = 0.5; this.greenWorld.scale.y = 0.5; this.greenWorld.anchor.x = 0.5; this.greenWorld.anchor.y = 0.5;
        this.greenWorld.angle = this.game.earthRotate;

        //text
        this.game.textbox.changeNewState(this.game, this.game.translation.translate("first10_1"));

        this.game.pointer.setPosition(670);
        this.game.pointerText.text = "460 Mil";

        //animals and seaplants
        this.seaweed1 = this.game.add.sprite(this.game.world.centerX-500, this.game.world.centerY+190, 'seaWeed1');
        this.seaweed2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+120, 'seaWeed2');
        this.seaweed3 = this.game.add.sprite(this.game.world.centerX+500, this.game.world.centerY+150, 'seaWeed3');
        this.coral = this.game.add.sprite(this.game.world.centerX-300, this.game.world.centerY-100, 'coral');
        this.jellyfish = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY-150, 'jellyfish');
        this.shell = this.game.add.sprite(this.game.world.centerX+250, this.game.world.centerY-100, 'shell');

        this.objects = [this.seaweed1, this.seaweed2, this.seaweed3, this.coral, this.jellyfish, this.shell];
        this.createObjects();

        this.firstStage = true;
        this.secondStage = false;

        //enable mouse input
        this.game.input.mouse.capture = true;

        //counts plants on earth
        this.plantsCount = 0;

        this.game.physics.enable( [ this.earth], Phaser.Physics.ARCADE);
        //
        // this.plant.inputEnabled = true;
        // this.plant.input.enableDrag(true);

        let earthG = this.game.add.group();
        this.animalsG = this.game.add.group();
        this.items = this.game.add.group();

    }

    update(){
        this.items.angle -= 0.03;
        this.greenWorld.angle -= 0.03;
        if (this.firstStage && this.game.input.activePointer.leftButton.isDown) {
            this.firstStage = false;
            this.getIntoWater();
        }
        if (this.secondStage && this.game.input.activePointer.leftButton.isDown) {
            this.secondStage = false;
            this.outOfWater();
        }

        if (this.plantsCount === 6) {
            this.lastText();
            this.plantsCount = 0;
        }


        if (this.isEnd && this.game.input.activePointer.leftButton.isDown) {
            this.nextEvent();
        }
        //this.game.physics.arcade.collide(this.earth, this.plant, this.collisionHandler, null, this);
    }

    createObjects() {
        //z-depth
        let earthG = this.game.add.group();
        this.animalsG = this.game.add.group();
        this.items = this.game.add.group();
        earthG.add(this.earth);


        for (var i = 0; i < 6; i++) {
            this.objects[i].anchor.x = 0.5;
            this.objects[i].anchor.y = 0.5;
            this.objects[i].scale.x = 0.0;
            this.objects[i].scale.y = 0.0;

            //add animation
            this.walk = this.objects[i].animations.add('walk');
            this.objects[i].animations.play('walk', 10, true);

            this.animalsG.add(this.objects[i]);
        }
        earthG.z = 100;
        this.animalsG.z = 120;
    }

    getIntoWater() {
        this.game.add.tween(this.earth.scale).to({ x: 6.5, y: 6.5}, 3000, Phaser.Easing.Cubic.InOut, true, );
        this.game.add.tween(this.earth.anchor).to({ x: 0.7, y: 0.4}, 3000, Phaser.Easing.Cubic.InOut, true, );

        this.game.add.tween(this.game.moon.anchor).to({ x: 5, y: -5}, 3000, Phaser.Easing.Cubic.InOut, true, );
        //this.game.add.tween(this.animalsG.scale).to({ x: 1, y: 1}, 3000, Phaser.Easing.Cubic.InOut, true, );

        for (var i = 0; i < 6; i++) {
            this.game.add.tween(this.objects[i].scale).to({x: 0.35, y: 0.35}, 3000, Phaser.Easing.Cubic.InOut, true, 2500);
        }

        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.firstText, this);

    }

    outOfWater() {
        this.game.add.tween(this.earth.scale).to({ x: 0.5, y: 0.5}, 3000, Phaser.Easing.Cubic.InOut, true, 2000);
        this.game.add.tween(this.earth.anchor).to({ x: 0.5, y: 0.5}, 3000, Phaser.Easing.Cubic.InOut, true, 2000);
        this.game.add.tween(this.game.moon.anchor).to({ x: 2.5, y: -2.5}, 3000, Phaser.Easing.Cubic.InOut, true, 2000);
        for (var i = 0; i < 6; i++) {
            this.game.add.tween(this.objects[i].scale).to({ x: 0, y: 0}, 2000, Phaser.Easing.Cubic.InOut, true);
        }

        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.secondText, this);

    }

    firstText() {
        this.game.textbox.changeText(this.game, this.game.translation.translate("first10_2"));
        this.secondStage = true;

    }

    secondText() {
        this.game.textbox.changeText(this.game, this.game.translation.translate("first10_3"));
        this.seaweed1.destroy();
        this.seaweed2.destroy();
        this.seaweed3.destroy();
        this.coral.destroy();
        this.shell.destroy();
        this.jellyfish.destroy();

        this.items = this.game.add.group();
        this.items.x = this.game.world.centerX;
        this.items.y = this.game.world.centerY;


        this.plant1 = this.game.add.sprite((-90), (this.game.world.centerY - 100), 'plant1');
        this.plant2 = this.game.add.sprite((-90), (this.game.world.centerY - 100 + 150), 'plant2');
        this.plant3 = this.game.add.sprite((-90), (this.game.world.centerY - 100 + 150 * 2), 'plant3');
        this.plant4 = this.game.add.sprite((this.game.world.width+90), (this.game.world.centerY - 100), 'plant1');
        this.plant5 = this.game.add.sprite((this.game.world.width+90), (this.game.world.centerY - 100 + 150), 'plant2');
        this.plant6 = this.game.add.sprite((this.game.world.width+90), (this.game.world.centerY - 100 + 150 * 2), 'plant3');

        this.plants = [this.plant1, this.plant2, this.plant3, this.plant4, this.plant5, this.plant6];


        let item;
        for (var i = 0; i < 6; i++)
        {
            // Directly create sprites from the group.
            item = this.plants[i];
            item.anchor.x = 0.5;
            item.anchor.y = 0.5;
            item.scale.x = 0.2;
            item.scale.y = 0.2;
            item.name = 'block' + i;

            //add animation
            this.walk = item.animations.add('walk');
            item.animations.play('walk', 18, true);

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

        for (var i = 0; i < 3; i++)
        {
            // Directly create sprites from the group.
            this.game.add.tween(this.plants[i]).to( { x: 110}, 2000, Phaser.Easing.Cubic.InOut, true, 500*i);
            this.game.add.tween(this.plants[i+3]).to( { x: this.game.world.width-110}, 2000, Phaser.Easing.Cubic.InOut, true, 500*i);
            //this.game.time.events.add(Phaser.Timer.SECOND * 2, this.getPhysics(this.MeteroG.children[i]), this);
        }
    }

    lastText() {
        this.game.textbox.changeText(this.game, this.game.translation.translate("last10"));
        this.game.add.tween(this.earth).to( { alpha: 0}, 4000, Phaser.Easing.Cubic.InOut, true, 0);
        this.game.add.tween(this.greenWorld).to( { alpha: 1}, 4000, Phaser.Easing.Cubic.InOut, true, 0);
        this.game.add.tween(this.items).to( { alpha: 0}, 4000, Phaser.Easing.Cubic.InOut, true, 0);
        this.game.time.events.add(Phaser.Timer.SECOND * 3.5, function() {this.game.input.onDown.addOnce(this.nextEvent, this)}, this);
            //this.game.time.events.add(Phaser.Timer.SECOND * 2, this.getPhysics(this.MeteroG.children[i]), this);

    }

    dropHandler(item, pointer) {
        this.isWrong = false;
        //this.game.physics.arcade.collide(this.items.children, item, this.stopCollision, null, this);
        this.game.physics.arcade.collide(this.earth, item, this.collisionHandler, null, this);

    }

    stopCollision (obj1, obj2) {
        this.isWrong = true;
        //this.plantsCount--;
        obj2.inputEnabled = true;
        obj2.input.enableDrag();

    }

    collisionHandler (obj1, obj2) {
        if (!this.isWrong) {
            this.plantsCount++;
            obj2.x = Math.cos(((360/8)*this.plantsCount))*210;
            obj2.y = Math.sin(((360/8)*this.plantsCount))*210;
            obj2.angle = (360/6 * this.plantsCount)+90;
            obj2.inputEnabled = false;
            obj2.input.draggable = false;
            this.items.add(obj2);
            //this.game.stage.backgroundColor = '#992d2d';
        }

    }

    nextEvent() {
        this.items.destroy();
        this.earth.destroy();
        this.greenWorld.destroy();
        this.game.state.start('Magma', false, false);
    }



}

export default DragndropPlants;