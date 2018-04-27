/**
 * Created by alinaisabelle on 23.04.18.
 */
import RainbowText from 'objects/RainbowText';
import Earth from 'objects/Earth';
import Splitter from 'objects/Splitter';
import Translation from 'utils/translate';
import Text from 'objects/text';

class Urknall extends Phaser.State {



    create() {
        this.game.stage.backgroundColor = '#fff';
        let translation = new Translation(this.game);
        this.text = translation.translate("first1");
        this.textbox = new Text(this.game, this.text);
        this.textbox.addColor('#000', 0);
        this.textbox.y = this.game.world.centerY-50;
        this.SpaceClicked = 0;
        this.wasKnall = false;
        this.urknall = null;

    }
    update(){
        let spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(this.click, this);

        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        if (!this.wasKnall && this.SpaceClicked === 20) {
            this.wasKnall = true;
            this.textbox.destroy();
            let urknall = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'urknall');
            urknall.anchor.x = 0.5; urknall.anchor.y = 0.5; urknall.lifespan = 2000;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.universum, this);
        }
        if (this.wasKnall && this.game.input.activePointer.leftButton.isDown) {
            this.nextEvent();
        }

    }

    universum() {
        this.game.stage.backgroundColor = '#000';
        let translation = new Translation(this.game);
        this.text = translation.translate("last1");
        this.textbox = new Text(this.game, this.text);
        this.game.input.onDown.addOnce(this.nextEvent, this);
    }
    click (){
        this.SpaceClicked++;
    }

    nextEvent() {
        this.textbox.destroy();
        this.game.state.start('PlanetWachstum', true, false);
    }
}

export default Urknall;
