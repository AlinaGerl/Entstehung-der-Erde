/**
 * Created by alinaisabelle on 23.04.18.
 */
import Translation from 'utils/translate';
import Text from 'objects/text';



class PlanetWachstum extends Phaser.State {

    create() {
        //text
        this.translation = new Translation(this.game);
        this.text = this.translation.translate("first3");
        this.textbox = new Text(this.game, this.text);

        this.game.input.mouse.capture = true;
    }

    update() {
        if(this.game.input.activePointer.leftButton.isDown){
            this.nextEvent();
        }
    }

    nextEvent(){
        this.textbox.destroy();
        this.game.world.removeAll();
        this.game.state.start('Kollision', true, false);
    }


}

export default PlanetWachstum;