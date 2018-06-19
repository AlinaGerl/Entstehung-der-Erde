/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';



class People extends Phaser.State {

    create() {
        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'firstEarth', this.game.earthRotate);

        //text
        this.game.textbox.changeText(this.game, this.game.translation.translate("first14"));

        this.game.pointer.setPosition(733);
        this.game.pointerText.text = "1.5 Mil";

        //cell
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        this.people = this.game.add.sprite(center.x, center.y, 'people');
        this.people.anchor.x = 0.5;
        this.people.anchor.y = 0.5;
        this.people.scale.x = 0.05;
        this.people.scale.y = 0.05;

        //duplicate with v
        this.ctrl = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        this.v = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
        this.enoughPeople = false;

        let earthG = this.game.add.group();
        let peopleG = this.game.add.group();
        earthG.add(this.earth);
        peopleG.add(this.people);
        earthG.z = 100;
        peopleG.z = 120;

        this.peopleCounter = 0;
        this.peopleCheck = true;
        this.game.input.mouse.capture = true;


    }

    update(){

        if(this.ctrl.isDown && this.v.isDown && this.peopleCheck) {
            this.Vpressed();
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.setTrue, this);
        }


        if(this.peopleCounter === 4) {
            this.game.pointer.setPosition(740);
            this.game.pointerText.text = "heute";
            this.game.textbox.changeText(this.game, this.game.translation.translate("last14"));
            this.enoughPeople = true;
            //this.nextEvent();
        }

        if(this.game.input.activePointer.leftButton.isDown && this.enoughPeople == true) {
            this.nextEvent();
        }

    }

    Vpressed () {
        let x = this.game.rnd.integerInRange(this.game.world.centerX+150, this.game.world.centerX-150);
        let y = this.game.rnd.integerInRange(this.game.world.centerY+150, this.game.world.centerY-150);

        if(this.enoughPeople == false) {
            let people = this.game.add.sprite(x, y, 'people');
            people.scale.x = 0.05;
            people.scale.y = 0.05;
            this.peopleCounter++;
            this.peopleCheck = false;
        }

    }

    setTrue() {
        this.peopleCheck = true;

    }

    nextEvent() {
        this.game.world.removeAll();
        this.game.timeline.destroy();
        this.game.pointer.destroy();
        this.game.state.start('End', true, false);
    }



}

export default People;