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
        this.earth.scale.x = 0.7; this.earth.scale.y = 0.7;
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
        this.WolkenG = this.game.add.group(); this.WolkenG.x = this.game.world.centerX; this.WolkenG.y = this.game.world.centerY;
        earthG.add(this.earth);
        earthG.z = 100;
        this.planetsG.z = 120;
        this.planetsG.x = this.game.world.centerX; this.planetsG.y = this.game.world.centerY;

        let waterball = this.game.add.sprite(0, 0, 'waterball');
        waterball.alpha = 0.0; waterball.scale.x = 0.65; waterball.scale.y = 0.65; waterball.anchor.x = 0.5; waterball.anchor.y = 0.5;
        this.game.add.tween(waterball).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.earth).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true, 0);
        this.game.input.onDown.addOnce(this.deleteClouds, this, 10, null);
        this.planetsG.add(waterball);

        this.rotateSlower = false;

        for (var i = 0; i < 20; i++) {
            let x = this.game.rnd.integerInRange(-1800, 1800);
            let y = this.game.rnd.integerInRange(-1800, 1800);
            let wolke = this.game.add.sprite(x, y, 'wolke');
            this.WolkenG.add(wolke);
        }
        this.WolkenG.alpha = 0; this.WolkenG.scale.x = 0.1;  this.WolkenG.scale.y = 0.1;
        this.game.add.tween(this.WolkenG).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true, 0);
    }

    update(){

        this.planetsG.angle -= 0.03;
        this.WolkenG.angle -= 0.03;

        if (this.rotateSlower) this.earth.angle -= 0.2;

    }

    deleteClouds() {
        this.textbox.text = this.translation.translate("last6");
        this.earth.loadTexture('waterball', 0 , false);

        this.rotateSlower = true;
        this.game.add.tween(this.moon.position).to( { x: 4, y: 4 }, 5000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.WolkenG).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true, 0);
        this.game.input.onDown.addOnce(this.nextEvent, this, 5, null);

    }

    nextEvent() {
        this.textbox.destroy();
        this.game.world.removeAll();
        this.game.state.start('Cells', true, false);
    }



}

export default Regenzeit;