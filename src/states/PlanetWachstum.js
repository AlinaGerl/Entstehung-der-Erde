/**
 * Created by alinaisabelle on 23.04.18.
 */
import Translation from 'utils/translate';
import Text from 'objects/text';
import Earth from 'objects/Earth';
import continueText from 'objects/weiterTxt';
import pointer from 'objects/Pointer';

class PlanetWachstum extends Phaser.State {

    create() {
        //physics for game
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.restitution = 0.5;
        this.game.physics.p2.updateBoundsCollisionGroup();
        this.game.pointer.setPosition(84);
        this.game.pointerText.text = "4.5 Mrd";

        //creating the earth like a firebaaaaall with all his physics
        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'fireball', this.game.earthRotate);
        this.earth.scale.x = 0.2; this.earth.scale.y = 0.2;
        this.game.physics.p2.enable(this.earth, false);
        this.earth.body.static = true;
        this.earth.body.setCircle(180);
        this.earth.body.angle = this.game.earthRotate;


        //text
        this.game.textbox.changeNewState(this.game, this.game.translation.translate("first3"));

        // counter for meteorite counter for ending the game and the isEnd boolean
        this.MeteroCounter = 0;
        this.isEnd = false;

        //enable mouse input
        this.game.input.mouse.capture = true;

        //Meteorite Group
        this.MeteroG = this.game.add.group();

        // mouse body
        // the mouse also needs a body for the mouse spring event
        this.mouseBody = this.game.add.sprite(0, 0, 'meteorit'); this.mouseBody.alpha = 0; // its like a fake body (invisible)
        this.game.physics.p2.enable(this.mouseBody, true); //physics
        this.mouseBody.body.static = true; //static body (it would bounds around)
        this.mouseBody.body.setCircle(10); //rigidbody
        this.mouseBody.body.data.shapes[0].sensor = true; // actually no clue

        this.game.input.onDown.addOnce(this.MeteoritenReady, this);
        this.waitTxt = new continueText(this.game);
        //this.MeteoritenReady();
    }

    update() {

        this.earth.body.angle -= 0.03;
        this.game.earthRotate -= 0.03;

        if (this.MeteroCounter === 6) this.setSecondText();


    }

    MeteoritenReady() {

        this.waitTxt.destroy();
        //die gruppe von dinos in die mitte setzen, damit man sie im mittelpunkt rotieren kann
        // this.MeteroG.x = this.game.world.centerX;
        // this.MeteroG.y = this.game.world.centerY;

        // collisionsgroups for the collision of the two objects (i know, so stupid for just 1 object per group but its needed sooo...)
        this.EarthCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.MeteoritCollisionGroup = this.game.physics.p2.createCollisionGroup();

        let item;

        this.game.physics.p2.enable(this.MeteroG, false);

        //in dieser schleife werden einfach 6 Meteortien kreiert und in die welt gesetzt.
        // sie bekommen auch schon ihre physics und den collide listener
        for (var i = 0; i < 3; i++)
        {
            // Directly create sprites from the group.
            item = this.game.add.sprite(-90, 250 + 120 * i, 'meteorit', i);
            item.anchor.x = 0.5;
            item.anchor.y = 0.5;
            item.scale.x = 0.07;
            item.scale.y = 0.07;
            item.name = 'block' + i;
            this.MeteroG.add(item);

        }
        //die rechten meteoriten
        for (var i = 3; i < 6; i++)
        {
            // Directly create sprites from the group.
            item = this.game.add.sprite((this.game.world.centerX*2+90), (250 + 120 * (i-3)), 'meteorit', i);
            item.anchor.x = 0.5;
            item.anchor.y = 0.5;
            item.scale.x = 0.07;
            item.scale.y = 0.07;
            item.name = 'block' + i;
            // this.game.physics.p2.enable(item, false); //set physics
            // item.body.setCircle(40); // this is kinda the rigidbody of the object
            // item.body.setCollisionGroup(MeteoritCollisionGroup);
            // item.body.collides(EarthCollisionGroup, this.earthGrow, this);
            // item.inputEnabled = true;
            // item.events.onInputDown.add(this.onclick, this);
            this.MeteroG.add(item);

        }
        for (var i = 0; i < 3; i++)
        {
            // Directly create sprites from the group.
            this.game.add.tween(this.MeteroG.children[i]).to( { x: 90}, 2000, Phaser.Easing.Cubic.InOut, true, 500*i);
            this.game.add.tween(this.MeteroG.children[i+3]).to( { x: this.game.world.centerX*2-90}, 2000, Phaser.Easing.Cubic.InOut, true, 500*i);
            //this.game.time.events.add(Phaser.Timer.SECOND * 2, this.getPhysics(this.MeteroG.children[i]), this);
        }
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.getPhysics, this);

        // mouse spring handlers
        //this.game.input.onDown.add(this.click, this);
        this.game.input.onUp.add(this.release, this);
        this.game.input.addMoveCallback(this.move, this);

        // set collisiongroups with objects
        this.earth.body.setCollisionGroup(this.EarthCollisionGroup);
        this.earth.body.collides([this.EarthCollisionGroup, this.MeteoritCollisionGroup]);

        // also neccessary ok
        //this.game.physics.p2.updateBoundsCollisionGroup();

        // collide handler

        // boolean for rotation of earth
        this.isExplosion = true;



    }
    getPhysics(item) {
        for (var i = 0; i < 6; i++) {
            this.game.physics.p2.enable(this.MeteroG.children[i], false); //set physics
            this.MeteroG.children[i].body.setCircle(40); // this is kinda the rigidbody of the object
            this.MeteroG.children[i].body.setCollisionGroup(this.MeteoritCollisionGroup);
            this.MeteroG.children[i].body.collides(this.EarthCollisionGroup, this.earthGrow, this);
            this.MeteroG.children[i].inputEnabled = true;
            this.MeteroG.children[i].events.onInputDown.add(this.onclick, this);
        }

    }
    //click creating mousepringer
    onclick(obj) {
        console.info('bitte bitte');
        this.mouseSpring = this.game.physics.p2.createSpring(this.mouseBody, obj.body, 0, 30, 1);
    }

    // happens when mouse is released
    release(obj) {

        //removes spring event
        this.game.physics.p2.removeSpring(this.mouseSpring);

    }

    // for mouse movement
    move(pointer, x, y, isDown) {

        this.mouseBody.body.x = x;
        this.mouseBody.body.y = y;

    }

    //collide function, earth grows, meteorites die and counter increases
    earthGrow(obj1, obj2) {
        this.MeteroCounter++;
        obj1.sprite.destroy();
        this.earth.scale.x += 0.05;
        this.earth.scale.y += 0.05;
    }

    //Endtext
    setSecondText() {
        this.game.input.deleteMoveCallback(this.move, this);
        this.mouseBody.destroy();
        this.game.physics.p2.clear();
        this.game.add.tween(this.game.textbox).to({ alpha: 0}, 800, Phaser.Easing.Cubic.InOut, true);
        this.game.textbox.changeText(this.game, this.game.translation.translate("last3"));
        this.game.input.onDown.addOnce(this.nextEvent, this);
    }
    //destroy everything and start new state
    nextEvent(){
        this.earth.destroy();
        //this.mouseBody.destroy();
        this.game.state.start('Kollision', false, false);
    }


}

export default PlanetWachstum;