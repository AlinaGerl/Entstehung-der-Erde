/**
 * Created by alinaisabelle on 23.04.18.
 */
import Translation from 'utils/translate';
import Text from 'objects/text';
import continueText from 'objects/weiterTxt';


class Urknall extends Phaser.State {



    create() {
        this.game.stage.backgroundColor = '#fff';

        this.SpaceClicked = 0;
        this.wasKnall = false;
        this.urknall = null;

        this.game.pointer.y = this.game.world.centerY*2+20;
        this.game.pointerText.y = this.game.world.centerY*2+65;
        this.game.timeline.y = this.game.world.centerY*2+20;
        this.game.textbox = new Text(this.game, this.game.translation.translate("first1"));
        this.game.textbox.addColor('#000', 0);
        this.game.textbox.y = this.game.world.centerY-50;

        this.game.input.keyboard.addCallbacks(this, function() {
            this.click();
        });

        this.urknall = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'urknall');
        this.urknall.anchor.x = 0.5; this.urknall.anchor.y = 0.5; //this.urknall.lifespan = 1500;

        this.walk = this.urknall.animations.add('walk');


        this.game.time.events.add(Phaser.Timer.SECOND * 5, function() { this.walk.enableUpdate = true; }, this);

        this.play = false;


    }
    update(){

        this.game.time.events.add(Phaser.Timer.SECOND * 5, function() { this.game.textbox.alpha = 0; }, this);

        if(!this.wasKnall && this.walk.frame === 75) {
            this.game.input.keyboard.stop();
            this.play = false;
            this.urknall.destroy();
            this.wasKnall = true;
            this.game.input.keyboard.stop();
            this.game.textbox.alpha = 0;
            let urknall = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'urknall');
            urknall.anchor.x = 0.5; urknall.anchor.y = 0.5; urknall.lifespan = 2000;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.universum, this);

            this.universum();
            //this.game.time.events.add(Phaser.Timer.SECOND * 2, this.universum, this);
        }


    }

    changeFrame() {
        this.walk.frame++;
        this.play = true;
    }

    playAnim() {
        if(this.play) {
            this.urknall.animations.play('walk', 75, true);
            this.play = false;
        }
    }

    AddClick() {
        this.SpaceClicked++;

    }
    universum() {
        this.game.stage.backgroundColor = '#000';
        this.game.textbox.y = Math.round(window.innerHeight/7-20);
        this.game.textbox.changeText(this.game, this.game.translation.translate("last1"));
        this.game.textbox.addColor('#fff', 0);


        this.game.stage.backgroundColor = '#051023';
        /*this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        this.background.anchor.x = 0.5; this.background.anchor.y = 0.5;
        this.background.scale.x = 2.5; this.background.scale.y = 2.5;*/
        this.waitTxt = new continueText(this.game);

        this.game.input.onDown.addOnce(this.nextEvent, this);
    }
    click (){
        this.SpaceClicked++;
        console.log(this.SpaceClicked);
        this.changeFrame();
    }

    nextEvent() {
        this.game.add.tween(this.game.textbox).to( { alpha: 0}, 800, Phaser.Easing.Cubic.InOut, true);
        this.game.time.events.add(Phaser.Timer.SECOND * 0.8, function() {
                this.waitTxt.destroy();
                this.game.state.start('PlanetEntstehung', false, false);
            }
            , this);

    }
}

export default Urknall;
