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
        this.text = this.translation.translate("end01");
        this.textbox = new Text(this.game, this.text);
        this.textbox.y = this.game.world.centerY;
        this.text02 = false;
        this.text03 = false;
        this.text04 = false;

        this.game.input.mouse.capture = true;

        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.booleanText02, this);
    }

    update(){

        if(this.text02 && this.game.input.activePointer.leftButton.isDown){
            let text = this.translation.translate("end02");
            this.textbox.destroy();
            this.textbox = new Text(this.game, text);
            this.textbox.y = this.game.world.centerY;
            this.text02 = false;
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.booleanText03, this);

        } else if(this.text03 && this.game.input.activePointer.leftButton.isDown) {
            let text = this.translation.translate("end03");
            this.textbox.destroy();
            this.textbox = new Text(this.game, text);
            this.textbox.y = this.game.world.centerY;
            this.text03 = false;
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.booleanText04, this);

        } else if(this.text04 && this.game.input.activePointer.leftButton.isDown){
            let text = this.translation.translate("end04");
            this.textbox.destroy();
            this.textbox = new Text(this.game, text);
            this.textbox.y = this.game.world.centerY;
            this.text04 = false;
    }
    }

    booleanText02(){
        this.text02 = true;
    }

    booleanText03(){
        this.text03 = true;
    }

    booleanText04(){
        this.text04 = true;
    }

}

export default End;