/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';

class Kollision extends Phaser.State {


    create() {
        // earth
        let center = { x: this.game.world.centerX, y: this.game.world.centerY }
        this.earth = new Earth(this.game, center.x, center.y, 'fireball', this.game.earthRotate);

        //text
        this.game.textbox.changeText(this.game, this.game.translation.translate("first4"));

        if (!this.game.pointer.parent)
        {
            this.add.existing(this.game.pointer);
        }
        if (!this.game.pointerText.parent)
        {
            this.add.existing(this.game.pointerText);
        }
        //button
        this.button = this.game.add.sprite(this.game.world.centerX, this.game.world.height+700, 'redButton');
        this.button.anchor.x = 0.5; this.button.anchor.y = 0.5; this.button.scale.x = 0.8; this.button.scale.y = 0.8;
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.moveButton, this);

        //splitter
        this.splitter = this.game.add.sprite(this.game.world.width, this.game.world.centerY-100, 'Thaia');
        this.splitter.scale.x = 0.3; this.splitter.scale.y = 0.3;
        this.isDestroyed = false;

        // groups for z depth
        let earthG = this.game.add.group();
        let buttonG = this.game.add.group();
        earthG.add(this.earth);
        buttonG.add(this.splitter);
        buttonG.add(this.button);
        earthG.z = 100;
        buttonG.z = 120;
    }

    moveButton() {
        //this.game.physics.arcade.enable([ this.button ], Phaser.Physics.ARCADE);
        this.game.add.tween(this.button).to( { y: this.game.world.centerY}, 3000, Phaser.Easing.Cubic.InOut, true);
        this.button.inputEnabled = true;
        this.button.events.onInputDown.add(this.listener, this);
    }
    listener () {
        this.button.loadTexture('ButtonPressed', 0 , false);
        this.game.add.tween(this.button).to( { y: this.game.world.height+700}, 3000, Phaser.Easing.Linear.None, true, 1000);
        this.isDestroyed = false;
        this.game.add.tween(this.splitter).to( { x: this.game.world.centerX-100 }, 5000, Phaser.Easing.Linear.None, true, 3000);

    }
    update() {

        if (!this.isDestroyed && this.splitter.x == (this.game.world.centerX-100))
        {
            this.isDestroyed = true;
            this.earth.destroy();
            this.game.world.remove();
            this.button.destroy();
            this.game.state.start('Moon', false, false);
        }
    }

    checkOverlap(spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    }

    nextEvent() {
        this.earth.destroy();
        // this.text.destroy();
        // this.game.world.remove(this.textbox);
        this.button.destroy();
        //this.game.world.removeAll();
        this.game.state.start('Moon', false, false);
    }
}

export default Kollision;