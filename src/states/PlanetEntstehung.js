/**
 * Created by alinaisabelle on 23.04.18.
 */
import Translation from 'utils/translate';
import Text from 'objects/text';


class PlanetEntstehung extends Phaser.State {

    create() {
        //text
        this.translation = new Translation(this.game);
        this.text = this.translation.translate("first3");
        this.textbox = new Text(this.game, this.text);


        this.cell = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cellsBig');
        this.cell.scale.x = 0.5;
        this.cell.scale.y = 0.5;
        this.cell.anchor.x = 0.5;
        this.cell.anchor.y = 0.5;

        this.walk = this.cell.animations.add('walk');

        let spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceBar.onDown.add(this.changeFrame, this);

        this.walk.enableUpdate = true;
        this.play = false;
    }

    changeFrame(){
        this.walk.frame++;
        this.play = true;
    }

    playAnim() {
        if(this.play) {
            this.cell.animations.play('walk', 5, true);
            this.play = true;
        }
    }

    update(){
        if(this.walk.frame === 5) {
            this.nextEvent();
        }
    }

    nextEvent() {
        this.textbox.destroy();
        this.game.world.removeAll();
        this.game.state.start('PlanetWachstum', true, false);
    }

}

export default PlanetEntstehung;