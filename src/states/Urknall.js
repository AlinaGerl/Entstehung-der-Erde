/**
 * Created by alinaisabelle on 23.04.18.
 */
import Translation from 'utils/translate';
import Text from 'objects/text';
import continueText from 'objects/weiterTxt';


class Urknall extends Phaser.State {

    create() {
        this.game.stage.backgroundColor = '#fff9fb';

        this.SpaceClicked = 0;
        this.wasKnall = false;

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
        this.urknall.scale.x = 0.8; this.urknall.scale.y = 0.8;
        this.urknall.alpha = 0;

        this.walk = this.urknall.animations.add('walk');
        this.play = false;

        //sonne
        this.sonne = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'sonne');
        this.sonne.anchor.x = 0.5; this.sonne.anchor.y = 0.5; this.sonne.scale.x = 0.0; this.sonne.scale.y = 0.0;

        this.mini1 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'mini1');
        this.mini1.anchor.x = 0.5; this.mini1.anchor.y = 0.5; this.mini1.scale.x = 0.0; this.mini1.scale.y = 0.0;

        this.mini2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'mini2');
        this.mini2.anchor.x = 0.5; this.mini2.anchor.y = 0.5; this.mini2.scale.x = 0.0; this.mini2.scale.y = 0.0;

    }
    update(){

        //this.game.time.events.add(Phaser.Timer.SECOND * 5, function() { this.game.textbox.alpha = 0; }, this);

        if( this.SpaceClicked === 1) {
            this.urknall.alpha = 1;
            this.game.add.tween(this.game.textbox).to( { alpha: 0}, 800, Phaser.Easing.Cubic.InOut, true);
            //this.game.textbox.alpha = 0;
        }

        if(!this.wasKnall && this.walk.frame === 75) {
            this.game.input.keyboard.stop();
            this.play = false;
            this.urknall.destroy();
            this.wasKnall = true;
            this.game.input.keyboard.stop();
            //this.game.textbox.alpha = 0;

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
        this.game.stage.backgroundColor = '#fff9fb';
        this.game.textbox.y = Math.round(window.innerHeight/7-20);
        this.game.textbox.changeText(this.game, this.game.translation.translate("last1"));
        this.game.textbox.addColor('#fff', 0);


        this.game.stage.backgroundColor = '#051023';

        this.game.add.tween(this.sonne.scale).to( { x: 0.3, y: 0.3}, 4500, Phaser.Easing.Cubic.InOut, true);
        this.game.add.tween(this.sonne).to( { x: 300, y: 300}, 4500, Phaser.Easing.Cubic.InOut, true);

        this.game.add.tween(this.mini1.scale).to( { x: 0.3, y: 0.3}, 5000, Phaser.Easing.Cubic.InOut, true);
        this.game.add.tween(this.mini1).to( { x: 1000, y: -500}, 5000, Phaser.Easing.Cubic.InOut, true);

        this.game.add.tween(this.mini2.scale).to( { x: 0.3, y: 0.3}, 3900, Phaser.Easing.Cubic.InOut, true);
        this.game.add.tween(this.mini2).to( { x: 2000, y: 1000}, 3900, Phaser.Easing.Cubic.InOut, true);

        this.game.add.tween(this.game.bg.scale).to( { x: 0.8, y: 0.8}, 3000, Phaser.Easing.Cubic.InOut, true);

        this.waitTxt = new continueText(this.game);

        this.game.input.onDown.addOnce(this.changeSun, this);
    }


    click (){
        if(this.walk.frame < 75){

            this.SpaceClicked++;
            console.log(this.SpaceClicked);
            this.changeFrame();
        }
    }

    changeSun() {
        this.game.add.tween(this.sonne.scale).to( { x: 1, y: 1}, 5000, Phaser.Easing.Cubic.InOut, true);
        this.game.add.tween(this.sonne).to( { x: -1000, y: 200}, 5000, Phaser.Easing.Cubic.InOut, true);

        this.game.add.tween(this.game.bg.scale).to( { x: 0.8, y: 0.8}, 4000, Phaser.Easing.Cubic.InOut, true);
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.nextEvent, this);
    }

    nextEvent() {
        this.sonne.destroy();
        this.mini1.destroy();
        this.mini2.destroy();
        this.walk.destroy();
        //this.game.add.tween(this.game.textbox).to( { alpha: 0}, 800, Phaser.Easing.Cubic.InOut, true);
        this.game.time.events.add(Phaser.Timer.SECOND * 0.8, function() {
                this.waitTxt.destroy();
                this.game.state.start('PlanetEntstehung', false, false);
            }
            , this);

    }
}

export default Urknall;
