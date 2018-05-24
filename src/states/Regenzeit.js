/**
 * Created by alinaisabelle on 27.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';
import MoonObject from 'objects/Moon';

class Regenzeit extends Phaser.State {

    create() {
        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'fireball', this.game.earthRotate);
        this.earth.scale.x = 0.5; this.earth.scale.y = 0.5;
        //text
        this.translation = new Translation(this.game);
        let text = this.translation.translate("first6");
        this.textbox = new Text(this.game, text);

        this.moon = new MoonObject(this.game, 2.3, 2.3, 'moon');

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
        this.waterball.alpha = 0.0; this.waterball.scale.x = 0.5;
        this.waterball.scale.y = 0.5; this.waterball.anchor.x = 0.5; this.waterball.anchor.y = 0.5;
        this.game.add.tween(this.waterball).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.earth).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true, 0);
        this.game.input.onDown.addOnce(this.deleteClouds, this, 10, null);
        this.waterball.angle = this.game.earthRotate;
        this.rotateSlower = false;

        this.clouds = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'clouds');

        this.clouds.alpha = 0; this.clouds.anchor.x = 0.5;  this.clouds.anchor.y = 0.5;
        this.clouds.scale.x = 0.5;  this.clouds.scale.y = 0.5;
        this.game.add.tween(this.clouds).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true, 0);
    }

    update(){

        this.waterball.angle -= 0.03;
        this.clouds.angle -= 0.03;

        //if (this.rotateSlower) this.earth.angle -= 0.2;

    }

    deleteClouds() {
        this.textbox.text = this.translation.translate("last6");
        this.earth.loadTexture('waterball', 0 , false);
        this.rotateSlower = true;
        this.game.add.tween(this.moon.anchor).to( { x: 4, y: -4 }, 5000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.clouds).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true, 0);
        this.game.input.onDown.addOnce(this.nextEvent, this, 5, null);

    }

    nextEvent() {
        this.moon.destroy();
        this.textbox.destroy();
        this.game.world.removeAll();
        this.game.state.start('Volcanoes', true, false);
    }



}

export default Regenzeit;