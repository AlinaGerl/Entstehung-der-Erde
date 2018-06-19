/**
 * Created by alinaisabelle on 23.04.18.
 */
import Translation from 'utils/translate';
import Text from 'objects/text';
import continueText from 'objects/weiterTxt';


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

        this.game.input.keyboard.addCallbacks(this, function() {
            this.click();
        });

    }
    update(){

        if (!this.wasKnall && this.SpaceClicked > 10) {
            this.wasKnall = true;
            this.game.input.keyboard.stop();
            this.textbox.destroy();
            let urknall = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'urknall');
            urknall.anchor.x = 0.5; urknall.anchor.y = 0.5; urknall.lifespan = 2000;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.universum, this);
        }

    }

    AddClick() {
        this.SpaceClicked++;
    }
    universum() {
        //this.game.stage.backgroundColor = '#000';
        this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        this.background.anchor.x = 0.5; this.background.anchor.y = 0.5;
        this.background.scale.x = 2.5; this.background.scale.y = 2.5;
        let translation = new Translation(this.game);
        this.text = translation.translate("last1");
        this.textbox = new Text(this.game, this.text);
        this.waitTxt = new continueText(this.game);

        this.game.input.onDown.addOnce(this.nextEvent, this);
    }
    click (){
        this.SpaceClicked++;
        console.log(this.SpaceClicked);
    }

    nextEvent() {
        this.textbox.destroy();
        this.waitTxt.destroy();
        this.game.state.start('PlanetEntstehung', false, false);
    }
}

export default Urknall;
