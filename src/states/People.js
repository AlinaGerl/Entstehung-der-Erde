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
        this.translation = new Translation(this.game);
        this.text = this.translation.translate("first14");
        this.textbox = new Text(this.game, this.text);

        //cell
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        this.people = this.game.add.sprite(center.x, center.y, 'people');
        this.people.anchor.x = 0.5;
        this.people.anchor.y = 0.5;
        this.people.scale.x = 0.05;
        this.people.scale.y = 0.05;

        //duplicate with v
        this.v = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
        this.v.onDown.add(this.pressV, this);
        this.enoughPeople = false;

        let earthG = this.game.add.group();
        let peopleG = this.game.add.group();
        earthG.add(this.earth);
        peopleG.add(this.people);
        earthG.z = 100;
        peopleG.z = 120;

        this.peopleCounter = 0;
        this.game.input.mouse.capture = true;
    }

    update(){
        if(this.peopleCounter === 4) {
            let text = this.translation.translate("last14");
            this.textbox.destroy();
            this.textbox = new Text(this.game, text);
            this.enoughPeople = true;
            //this.nextEvent();
        }

        if(this.game.input.activePointer.leftButton.isDown && this.enoughPeople == true) {
            this.nextEvent();
        }
    }

    pressV () {
        let x = this.game.rnd.integerInRange(this.game.world.centerX+150, this.game.world.centerX-150);
        let y = this.game.rnd.integerInRange(this.game.world.centerY+150, this.game.world.centerY-150);

        if(this.enoughPeople == false) {
        let people = this.game.add.sprite(x, y, 'people');
        people.scale.x = 0.05;
        people.scale.y = 0.05;
        this.peopleCounter ++;
        }

    }

    nextEvent() {
        this.textbox.destroy();
        this.game.world.removeAll();
        this.game.state.start('End', true, false);
    }



}

export default People;