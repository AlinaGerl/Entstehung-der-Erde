/**
 * Created by alinaisabelle on 23.04.18.
 */
import Translation from 'utils/translate';
import Text from 'objects/text';
import Earth from 'objects/Earth';

class PlanetEntstehung extends Phaser.State {

    create() {
        //text
        this.game.timeline.y = this.game.pointer.y = this.game.world.centerY*2+20;
        this.game.pointer.y = this.game.world.centerY*2+20;
        this.game.pointerText.y = this.game.world.centerY*2+65;

        //this.game.time.events.add(Phaser.Timer.SECOND * 3, this.setText, this);

        //this.setText();

        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'fireball', this.game.earthRotate);
        this.earth.scale.x = 0.3; this.earth.scale.y = 0.3; this.earth.alpha = 0;
        this.entstehung = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'entstehung');
        this.entstehung.anchor.x = 0.5; this.entstehung.anchor.y = 0.5;

        let earthG = this.game.add.group();
        let entstehungG = this.game.add.group();
        earthG.add(this.earth);
        entstehungG.add(this.entstehung);
        earthG.z = 100;
        entstehungG.z = 90;

        this.walk = this.entstehung.animations.add('walk');
        //this.EventCounter = 0;
        this.walk.enableUpdate = true;
        this.play = false;

        this.game.input.keyboard.start();
        let spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(this.changeFrame, this);
        this.moveTimeline();
    }

    next(){

    }

    moveTimeline() {
        this.game.add.tween(this.game.timeline).to( { y: this.game.world.centerY*2-80}, 3000, Phaser.Easing.Cubic.InOut, true, 0);
        this.game.add.tween(this.game.pointer).to( { y: this.game.world.centerY*2-80}, 3000, Phaser.Easing.Cubic.InOut, true, 3000);
        this.game.add.tween(this.game.pointerText).to( { y: this.game.world.centerY*2-45}, 3000, Phaser.Easing.Cubic.InOut, true, 3000);

        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.setText, this);
    }

    setText() {
        this.game.textbox.changeNewState(this.game, this.game.translation.translate("first2"));
    }

    update(){
        if(this.walk.frame === 80) {
            this.earth.alpha = 1;
        }
        if(this.walk.frame === 94) {
            this.entstehung.alpha = 0;
            this.walk.frame = 0;
            this.nextEvent();
        }

        //if (this.EventCounter === 10) this.nextEvent();

    }

    changeFrame(){
        this.play = true;
        console.log('frame ' + this.walk.frame);
        this.entstehung.animations.play('walk', this.walk.frame, true);
        this.walk.frame++;
        this.play = false;

    }



    nextEvent() {
        console.log('youdidit');
        this.earth.destroy();
        this.game.state.start('PlanetWachstum', false, false);
    }

}

export default PlanetEntstehung;