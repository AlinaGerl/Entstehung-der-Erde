/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';

class Dinosaurs extends Phaser.State {

    create() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'magmaPlanet', this.game.earthRotate);
        this.earth.scale.x = 0.45; this.earth.scale.y = 0.45;

        this.dinoWorld = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'DinoEarth');
        this.dinoWorld.alpha = 0.0; this.dinoWorld.scale.x = 0.45; this.dinoWorld.scale.y = 0.45; this.dinoWorld.anchor.x = 0.5; this.dinoWorld.anchor.y = 0.5;
        this.dinoWorld.angle = this.game.earthRotate;
        //text
        this.game.textbox.changeNewState(this.game, this.game.translation.translate("first12"));

        this.game.pointer.setPosition(710);
        this.game.pointerText.text = "200 Mil";

        //booleans for click and collide handlers
        this.firstStage = true;
        this.secondStage = false;
        this.isMeteorit = false;
        this.isExplosion = false;

        //enable mouse input
        this.game.input.mouse.capture = true;

        //counts plants on earth
        this.dinosCount = 0;

        //z-depth
        this.earthG = this.game.add.group();
        this.DinosG = this.game.add.group();
        this.onEarth = this.game.add.group(); this.onEarth.x = this.game.world.centerX; this.onEarth.y = this.game.world.centerY;
        this.earthG.add(this.earth);
        this.earthG.z = 100;
        this.DinosG.z = 120;
        this.game.physics.enable( [ this.earth], Phaser.Physics.ARCADE);

        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.dinosReady, this);
    }

    update(){

        this.dinoWorld.angle -= 0.03;
        //Last text of event
        if (this.dinosCount === 6) {
            this.dinosCount = 5;
            //this.items.anchor.x = 0.5; this.items.anchor.y = 0.5;
            this.dinosRotate = true;
            this.lastText();
        }

        //if dinos are set, they should rotate with the earth
        if (this.dinosRotate) {

            //group of dinos rotate
            this.DinosG.angle -= 0.03;

            //ever dino rotates, so its always senkrecht to display
            for(var i = 0; i <= this.DinosG.children.length-1; i++) {
                this.DinosG.children[i].angle += 0.03;
            }
        }


        //Creating meteorit and calling function if dinos are completly set
        if (this.isMeteorit && this.game.input.activePointer.leftButton.isDown) {
            this.Meteorit();
            this.isMeteorit = false;
        }

        //weil die erde nun andere physics hat, muss sie extra rotiert werden (jop so ein kak)
        if (this.isExplosion) {
            this.earth.body.angle -= 0.03;
        }
    }

    dinosReady() {

        this.game.add.tween(this.earth).to( { alpha: 0}, 3000, Phaser.Easing.Cubic.InOut, true, 0);
        this.game.add.tween(this.dinoWorld).to( { alpha: 1}, 3000, Phaser.Easing.Cubic.InOut, true, 0);
        //die gruppe von dinos in die mitte setzen, damit man sie im mittelpunkt rotieren kann


        this.DinosG.x = this.game.world.centerX;
        this.DinosG.y = this.game.world.centerY;

        this.dino1 = this.game.add.sprite((-this.game.world.centerX-90), (-this.game.world.centerY + 200), 'dino1');
        this.dino2 = this.game.add.sprite((-this.game.world.centerX-90), (-this.game.world.centerY + 200 + 150), 'dino2');
        this.dino3 = this.game.add.sprite((-this.game.world.centerX-90), (-this.game.world.centerY + 200 + 150 * 2), 'dino3');
        this.dino4 = this.game.add.sprite((this.game.world.centerX+90), (-this.game.world.centerY + 200), 'dino1');
        this.dino5 = this.game.add.sprite((this.game.world.centerX+90), (-this.game.world.centerY + 200 + 150), 'dino2');
        this.dino6 = this.game.add.sprite((this.game.world.centerX+90), (-this.game.world.centerY + 200 + 150 * 2), 'dino3');
        this.dinos = [this.dino1, this.dino2, this.dino3, this.dino4, this.dino5, this.dino6];

        let item;

        //in dieser schleife werden einfach 6 Dinos kreiert und in die welt gezetzt.
        // sie bekommen auch schon ihre physics und einen drophandler
        for (var i = 0; i < 6; i++) {

            // Directly create sprites from the group.
            item = this.dinos[i];
            this.DinosG.add(item);

            item.anchor.x = 0.5;
            item.anchor.y = 0.5;
            item.scale.x = 0.2;
            item.scale.y = 0.2;
            item.name = 'block' + i;

            // Enable input detection, then it's possible be dragged.
            item.inputEnabled = true;
            // Make this item draggable.
            item.input.enableDrag();

            // Then we make it snap to 90x90 grids.
            //item.input.enableSnap(50, 50, false, true);

            // Add a handler to remove it using different options when dropped.
            this.game.physics.enable([item], Phaser.Physics.ARCADE);
            item.events.onDragStop.add(this.dropHandler, this);

            //add animation
            this.walk = item.animations.add('walk');
            item.animations.play('walk', 20, true);
        }
        for (var i = 0; i < 3; i++)
        {
            // Directly create sprites from the group.
            this.game.add.tween(this.dinos[i]).to( { x: -this.game.world.centerX+110}, 2000, Phaser.Easing.Cubic.InOut, true, 500*i);
            this.game.add.tween(this.dinos[i+3]).to( { x: this.game.world.centerX+2-110}, 2000, Phaser.Easing.Cubic.InOut, true, 500*i);
            //this.game.time.events.add(Phaser.Timer.SECOND * 2, this.getPhysics(this.MeteroG.children[i]), this);
        }
    }

    // hier wird der letzte text vor der meteoriten explosion ausgegeben
    lastText() {
        this.game.textbox.changeText(this.game, this.game.translation.translate("last12"));
        this.isMeteorit = true;
    }

    // after a dino is dropped down, this handler is called
    // it checks if dinos collide with other dinos or the earth after dropping down
    dropHandler(item, pointer) {
        this.isWrong = false;
        //this.game.physics.arcade.collide(this.DinosG.children, item, this.stopCollision, null, this);
        this.game.physics.arcade.collide(this.earth, item, this.collisionHandler, null, this);

    }

    // this is called, when a dino is placed on another dino. It moves the dino to the right side of the display
    stopCollision (obj1, obj2) {
        this.isWrong = true; //set isWrong false, when a dino is placed on another dino
        //this.plantsCount--;
        obj2.x = (this.game.world.centerX*2-100);
        obj2.inputEnabled = true;
        obj2.input.enableDrag();
    }

    // this is called, when the a dino is placed on the earth
    collisionHandler (obj1, obj2){
        if (!this.isWrong) { //only if its not on another dino, this works
            this.dinosCount++;
            obj2.inputEnabled = false;
            //this.onEarth.add(obj2);
        }
    }

    //this function changes the physics of the earth and creates a meteorite with a mouse spring handler
    Meteorit() {

        this.game.pointer.setPosition(720);
        this.game.pointerText.text = "65 Mil";

        // change physics for meteorite dragging
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.restitution = 0.1;

        //text change
        this.game.textbox.changeText(this.game, this.game.translation.translate("first13"));

        //creates meteorite
        this.meteorit = this.game.add.sprite(this.game.world.centerX*1.9, this.game.world.centerY*1.9, 'meteorit');
        this.meteorit.scale.x = 0.1; this.meteorit.scale.y = 0.1; this.meteorit.anchor.x = 0.5; this.meteorit.anchor.y = 0.5;
        this.game.physics.p2.enable(this.meteorit, false); //set physics
        this.meteorit.body.setCircle(40); // this is kinda the rigidbody of the object

        // mouse body
        // the mouse also needs a body for the mouse spring event
        this.mouseBody = this.game.add.sprite(0, 0, 'meteorit'); this.mouseBody.alpha = 0; // its like a fake body (invisible)
        this.game.physics.p2.enable(this.mouseBody, false); //physics
        this.mouseBody.body.static = true; //static body (it would bounds around)
        this.mouseBody.body.setCircle(10); //rigidbody
        //this.mouseBody.body.data.shapes[0].sensor = true; // actually no clue

        //line for following
        this.line = new Phaser.Line(this.meteorit.x, this.meteorit.y, this.mouseBody.x, this.mouseBody.y);

        // mouse spring handlers
        this.game.input.onDown.add(this.click, this);
        this.game.input.onUp.add(this.release, this);
        this.game.input.addMoveCallback(this.move, this);

        //create a new earth with new physics
        // this is needed for the collision of meteorite and earth
        this.earth.destroy();
        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'firstEarth', this.game.earthRotate);
        this.game.physics.p2.enable(this.earth, false);
        this.earth.body.static = true;
        this.earth.body.setCircle(180);
        this.earth.body.angle = this.game.earthRotate;
        this.earthG.add(this.earth);

        // collisionsgroups for the collision of the two objects (i know, so stupid for just 1 object per group but its needed sooo...)
        var EarthCollisionGroup = this.game.physics.p2.createCollisionGroup();
        var MeteoritCollisionGroup = this.game.physics.p2.createCollisionGroup();

        // set collisiongroups with objects
        this.meteorit.body.setCollisionGroup(MeteoritCollisionGroup);
        this.earth.body.setCollisionGroup(EarthCollisionGroup);
        this.earth.body.collides([EarthCollisionGroup, MeteoritCollisionGroup]);

        // also neccessary ok
        this.game.physics.p2.updateBoundsCollisionGroup();

        // collide handler
        this.meteorit.body.collides(EarthCollisionGroup, this.killDinos, this);

        // boolean for rotation of earth
        this.isExplosion = true;
    }

    //click handler for mouse spring
    click(pointer) {

        var bodies = this.game.physics.p2.hitTest(pointer.position, [ this.meteorit.body ]);

        if (bodies.length)
        {
            //  Attach to the first body the mouse hit
            this.mouseSpring = this.game.physics.p2.createSpring(this.mouseBody, bodies[0], 0, 30, 1);
            this.line.setTo(this.meteorit.x, this.meteorit.y, this.mouseBody.x, this.mouseBody.y);
            this.drawLine = true;
        }

    }
    // happens when mouse is released
    release() {
        //removes spring event
        this.game.physics.p2.removeSpring(this.mouseSpring);
        this.drawLine = false;
    }

    // for mouse movement
    move(pointer, x, y, isDown) {

        this.mouseBody.body.x = x;
        this.mouseBody.body.y = y;
        this.line.setTo(this.meteorit.x, this.meteorit.y, this.mouseBody.x, this.mouseBody.y);

    }

    // last sequence, all dinos DIE
    killDinos(obj1, obj2) {
        //destroy the text and the meteorite
        this.meteorit.destroy();

        //change earth texture
        //this.earth.loadTexture('earth_meteor');

        //gravity for dinos
        // let every dino fly down
        for(var i = 0; i <= this.DinosG.children.length-1; i++) {

            this.DinosG.children[i].angle = this.game.rnd.integerInRange(0, 360); //gives every dino a different angle for a funny look
            //this.DinosG.children[i].body.collideWorldBounds = true;
            //this.DinosG.children[i].body.bounce.y = this.game.rnd.frac();
        }

        //wait 5 seconds before changing event
        this.game.time.events.add(Phaser.Timer.SECOND * 6, this.nextEvent, this);
    }

    // changing state
    nextEvent() {
        this.DinosG.destroy();
        this.earth.destroy();
        this.game.state.start('People', false, false);
    }



}

export default Dinosaurs;