/**
 * Created by alinaisabelle on 27.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';

class Eiszeit extends Phaser.State {

    create() {
        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'firstEarth', this.game.earthRotate);

        //text
        this.game.textbox.changeNewState(this.game, this.game.translation.translate("first9_1"));
        this.game.pointer.setPosition(512);
        this.game.pointerText.text = "1.5 Mrd";

        //enable mouse input
        this.game.input.mouse.capture = true;

        //counts plants on earth
        this.plantsCount = 0;

        //z-depth
        let earthG = this.game.add.group();
        this.planetsG = this.game.add.group();
        earthG.add(this.earth);
        earthG.z = 100
        this.planetsG.z = 120;
        this.planetsG.x = this.game.world.centerX; this.planetsG.y = this.game.world.centerY;

        this.rodinia = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'rodinia');
        this.rodinia.alpha = 0.0; this.rodinia.scale.x = 0.7; this.rodinia.scale.y = 0.7; this.rodinia.anchor.x = 0.5; this.rodinia.anchor.y = 0.5;
        this.game.add.tween(this.rodinia).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.input.onDown.addOnce(this.createRodinia, this, 10, null);
        //this.planetsG.add(rodinia);

    }

    update(){

        this.planetsG.angle -= 0.03;
        if(this.rodinia) this.rodinia.angle -= 0.03;

    }

    createRodinia() {
        this.game.textbox.changeText(this.game, this.game.translation.translate("first9_2"));
        this.earth.loadTexture('rodinia', 0 , false);
        this.rodinia.destroy();
        this.earth.scale.x = 0.7; this.earth.scale.y = 0.7;
        let iceball = this.game.add.sprite(0, 0, 'iceball');
        iceball.alpha = 0.0; iceball.scale.x = 0.7; iceball.scale.y = 0.7; iceball.anchor.x = 0.5; iceball.anchor.y = 0.5;
        iceball.angle = this.game.earthRotate;
        this.planetsG.add(iceball);
        this.game.pointer.setPosition(625);
        this.game.pointerText.text = "750 Mil";
        this.game.add.tween(this.earth).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(iceball).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.input.onDown.addOnce(this.createIceball, this, 5, null);

    }
    createIceball() {
        this.game.pointer.setPosition(633);
        this.game.pointerText.text = "735 Mil";
        this.game.textbox.changeText(this.game, this.game.translation.translate("last9"));
        this.planetsG.alpha = 1;
        this.earth.loadTexture('EchsenPlanet', 0 , false);
        this.earth.scale.x = 0.45; this.earth.scale.y = 0.45;
        this.game.add.tween(this.planetsG).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.earth).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true, 0);
        this.game.input.onDown.addOnce(this.nextEvent, this, 5, null);

    }

    nextEvent() {
        this.earth.destroy();
        this.planetsG.destroy();
        this.game.state.start('Plants', false, false);
    }



}

export default Eiszeit;