/**
 * Created by alinaisabelle on 23.04.18.
 */
import Translation from 'utils/translate';
import Text from 'objects/text';



class End extends Phaser.State {

    create() {
        this.game.world.removeAll();

        //text
        this.translation = new Translation(this.game);
        this.textbox = new Text(this.game, this.translation.translate("end01"));
        this.textbox.y = this.game.world.centerY;

        this.game.input.mouse.capture = true;
        this.game.input.onDown.addOnce(this.booleanText02, this, 10, null);
    }

    booleanText02(){
        this.textbox.text = this.translation.translate("end02");
        this.game.input.onDown.addOnce(this.booleanText03, this);
    }

    booleanText03(){
        this.textbox.text = this.translation.translate("end03");
        this.game.input.onDown.addOnce(this.booleanText04, this);

    }

    booleanText04(){
        this.textbox.text = this.translation.translate("end04");
    }

}

export default End;