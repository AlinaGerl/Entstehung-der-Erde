/**
 * Created by alinaisabelle on 27.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';
import MoonObject from 'objects/Moon';

class Regenzeit extends Phaser.State {

    create() {
        this.game.bg.scale.x = 0.8; this.game.bg.scale.y = 0.8;
        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'fireball', this.game.earthRotate);
        this.earth.scale.x = 0.8; this.earth.scale.y = 0.8;
        //text
        this.game.textbox.changeNewState(this.game, this.game.translation.translate("first6"));

        this.game.pointer.setPosition(185);
        this.game.pointerText.text = "3.8 Mrd";


        //enable mouse input
        this.game.input.mouse.capture = true;

        //counts plants on earth
        this.plantsCount = 0;

        //z-depth
        let earthG = this.game.add.group();
        this.planetsG = this.game.add.group();
        earthG.add(this.earth);
        earthG.z = 100;
        this.planetsG.z = 120;
        this.planetsG.x = this.game.world.centerX; this.planetsG.y = this.game.world.centerY;

        this.waterball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'waterball');
        this.waterball.alpha = 0.0; this.waterball.scale.x = 0.8;
        this.waterball.scale.y = 0.8; this.waterball.anchor.x = 0.5; this.waterball.anchor.y = 0.5;


        this.waterball.angle = this.game.earthRotate;
        this.clouds = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'clouds');
        this.clouds.anchor.x = 0.5;  this.clouds.anchor.y = 0.5;
        this.clouds.scale.x = 0.5;  this.clouds.scale.y = 0.5;
        this.clouds.animations.add('walk');
        this.clouds.animations.play('walk', 24, true);

        this.game.add.tween(this.waterball).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true, 3000);
        this.game.add.tween(this.earth).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 3000);

        //this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {this.clouds.animations.play('walk', 24, true);}, this);

        //this.cloudsF.frame = 0;
    }

    update(){
        this.waterball.angle -= 0.03;
        //this.clouds.angle -= 0.03;

        //if (this.rotateSlower) this.earth.angle -= 0.2;
        this.game.input.onDown.addOnce(this.deleteClouds, this, 5, null);
    }

    deleteClouds() {
        this.game.textbox.changeText(this.game, this.game.translation.translate("last6"));
        this.earth.loadTexture('waterEarth', 0 , false);
        this.earth.scale.x = 0.5; this.earth.scale.y = 0.5;
        this.game.add.tween(this.earth).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.waterball).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.game.moon.anchor).to( { x: 2.5, y: -2.5 }, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.clouds).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.input.onDown.addOnce(this.nextEvent, this, 5, null);

    }

    nextEvent() {
        //this.moon.destroy();
        this.earth.destroy();
        this.waterball.destroy();
        this.game.state.start('Volcanoes', false, false);
    }



}

export default Regenzeit;