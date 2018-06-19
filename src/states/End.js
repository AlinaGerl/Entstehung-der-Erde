/**
 * Created by alinaisabelle on 23.04.18.
 */
import Translation from 'utils/translate';
import Text from 'objects/text';



class End extends Phaser.State {

    create() {
        this.game.world.removeAll();

        //text
        this.game.textbox.destroy();
        this.game.textbox = new Text(this.game, this.game.translation.translate("end01"));
        this.game.textbox.y = this.game.world.centerY;

        this.game.input.onDown.addOnce(this.booleanText02, this, 10, null);
    }

    booleanText02(){
        this.game.textbox.changeText(this.game, this.game.translation.translate("end02"));
        this.game.input.onDown.addOnce(this.booleanText03, this);
    }

    booleanText03(){
        this.game.textbox.changeText(this.game, this.game.translation.translate("end03"));
        this.game.input.onDown.addOnce(this.booleanText04, this);

    }

    booleanText04(){
        this.game.textbox.changeText(this.game, this.game.translation.translate("end04"));
    }

}

export default End;