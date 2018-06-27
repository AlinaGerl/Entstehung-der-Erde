/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';



class People extends Phaser.State {

    create() {
        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'HeutePlanet', this.game.earthRotate);

        //text
        this.game.textbox.changeText(this.game, this.game.translation.translate("first14"));

        this.game.pointer.setPosition(733);
        this.game.pointerText.text = "1.5 Mil";

        //cell
        //duplicate with v
        this.ctrl = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        this.v = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
        this.enoughPeople = false;

        let earthG = this.game.add.group();
        this.peopleG = this.game.add.group();
        earthG.add(this.earth);
        earthG.z = 100;
        this.peopleG.z = 120;
        this.peopleG.x = this.game.world.centerX;
        this.peopleG.y = this.game.world.centerY;
        for (var i = 0; i < 6; i++){

            let x = Math.cos(((360/8)*i))*270;
            let y = Math.sin(((360/8)*i))*270;
            let people = this.game.add.sprite(x, y, 'people1');
            people.scale.x = 0.15;
            people.scale.y = 0.15;
            people.angle = (360/6 * i)+90;
            people.alpha = 0;
            this.peopleG.add(people);
        }
        this.peopleG.children[1].loadTexture('people2', 0 , false);
        this.peopleG.children[2].loadTexture('people3', 0 , false);
        this.peopleG.children[3].loadTexture('people4', 0 , false);
        this.peopleG.children[4].loadTexture('people5', 0 , false);
        this.peopleG.children[5].loadTexture('people6', 0 , false);

        this.peopleCounter = 0;
        this.peopleCheck = true;
        this.game.input.mouse.capture = true;


    }

    update(){

        this.peopleG.angle -= 0.03;

        if(this.ctrl.isDown && this.v.isDown && this.peopleCheck) {
            this.peopleCheck = false;
            this.Vpressed();
            this.game.time.events.add(Phaser.Timer.SECOND * 0.4, function() {this.peopleCheck = true}, this);
        }


        if(this.peopleCounter === 6) {
            this.game.pointer.setPosition(740);
            this.game.pointerText.text = "heute";
            this.game.textbox.changeText(this.game, this.game.translation.translate("last14"));

            this.enoughPeople = true;
            this.game.input.onDown.addOnce(this.fadeAway, this);
            this.peopleCounter = 0;

        }


    }

    Vpressed () {

        if(this.enoughPeople == false) {
            for (var i = 0; i < 6; i++) {
                if (this.peopleG.children[i].alpha === 0) {
                    this.peopleCounter++;
                    this.game.add.tween(this.peopleG.children[i]).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0);
                    break;
                }
            }
        }

    }

    fadeAway() {
        this.game.add.tween(this.peopleG).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.game.timeline).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.game.pointerText).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.game.pointer).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.game.textbox).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.earth).to({alpha: 0.1}, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.nextEvent, this);
    }

    nextEvent() {
        this.game.timeline.destroy();
        this.game.pointer.destroy();
        this.game.pointerText.destroy();
        this.earth.destroy();
        this.game.state.start('End', false, false);
    }



}

export default People;