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
        this.translation = new Translation(this.game);
        let text = this.translation.translate("first9_1");
        this.textbox = new Text(this.game, text);


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

        let rodinia = this.game.add.sprite(0, 0, 'rodinia');
        rodinia.alpha = 0.0; rodinia.scale.x = 0.7; rodinia.scale.y = 0.7; rodinia.anchor.x = 0.5; rodinia.anchor.y = 0.5;
        this.game.add.tween(rodinia).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true, 0);
        this.game.input.onDown.addOnce(this.createRodinia, this, 10, null);
        this.planetsG.add(rodinia);

    }

    update(){

        this.planetsG.angle -= 0.03;


    }

    createRodinia() {
        this.textbox.text = this.translation.translate("first9_2");
        this.earth.loadTexture('rodinia', 0 , false);
        this.earth.scale.x = 0.7; this.earth.scale.y = 0.7;
        let iceball = this.game.add.sprite(0, 0, 'iceball');
        iceball.alpha = 0.0; iceball.scale.x = 0.55; iceball.scale.y = 0.55; iceball.anchor.x = 0.5; iceball.anchor.y = 0.5;
        this.planetsG.add(iceball);

        this.game.add.tween(iceball).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true, 0);
        this.game.input.onDown.addOnce(this.createIceball, this, 5, null);

    }
    createIceball() {
        this.textbox.text = this.translation.translate("last9");
        this.planetsG.alpha = 1;
        this.game.add.tween(this.planetsG).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true, 0);
        this.game.input.onDown.addOnce(this.nextEvent, this, 5, null);

    }

    nextEvent() {
        this.textbox.destroy();
        this.game.world.removeAll();
        this.game.state.start('Plants', true, false);
    }



}

export default Eiszeit;