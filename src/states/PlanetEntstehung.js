/**
 * Created by alinaisabelle on 23.04.18.
 */
import Translation from 'utils/translate';
import Text from 'objects/text';
import Earth from 'objects/Earth';

class PlanetEntstehung extends Phaser.State {

    create() {
        //text

        this.game.pointer.y = this.game.world.centerY*2+20;
        this.game.pointerText.y = this.game.world.centerY*2+65;

        this.moveTimeline();
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.setText, this);


        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'fireball', this.game.earthRotate);
        this.earth.scale.x = 0.2; this.earth.scale.y = 0.2; this.earth.alpha = 0;
        // this.cell = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cellsBig');
        // this.cell.scale.x = 0.5;
        // this.cell.scale.y = 0.5;
        // this.cell.anchor.x = 0.5;
        // this.cell.anchor.y = 0.5;
        //
        // this.walk = this.cell.animations.add('walk');

        let spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceBar.onDown.add(this.changeFrame, this);
        this.EventCounter = 0;

        // this.walk.enableUpdate = true;
        // this.play = false;
    }

    moveTimeline() {
        this.game.add.tween(this.game.timeline).to( { y: this.game.world.centerY*2-80}, 3000, Phaser.Easing.Cubic.InOut, true, 0);
        this.game.add.tween(this.game.pointer).to( { y: this.game.world.centerY*2-80}, 3000, Phaser.Easing.Cubic.InOut, true, 0);
        this.game.add.tween(this.game.pointerText).to( { y: this.game.world.centerY*2-45}, 3000, Phaser.Easing.Cubic.InOut, true, 0);
    }

    setText() {
        this.game.textbox.changeText(this.game, this.game.translation.translate("first2"));
        this.game.textbox.alpha = 0;
    }
    changeFrame(){
        // this.walk.frame++;
        // this.play = true;

        console.log(this.EventCounter);
        this.earth.alpha += 0.1;
        this.EventCounter++;
        this.game.add.tween(this.game.textbox).to( { alpha: 0}, 1000, Phaser.Easing.Cubic.InOut, true, 0);
    }

    playAnim() {
        if(this.play) {
            this.cell.animations.play('walk', 5, true);
            this.play = true;
        }
    }

    update(){
        // if(this.walk.frame === 5) {
        //     this.nextEvent();
        // }

        if (this.EventCounter === 10) this.nextEvent();

    }

    nextEvent() {
        this.earth.destroy();
        this.game.state.start('PlanetWachstum', false, false);
        //this.pointer.destroy();
    }

}

export default PlanetEntstehung;