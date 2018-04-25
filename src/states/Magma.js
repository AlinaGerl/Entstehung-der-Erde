/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';


class Magma extends Phaser.State {

    create() {

        //text
        this.translation = new Translation(this.game);
        this.text = this.translation.translate("first11");
        this.textbox = new Text(this.game, this.text);

        //earth
        let center = {x: this.game.world.centerX, y: this.game.world.centerY};
        this.earth = new Earth(this.game, center.x, center.y, 'firstEarth', this.game.earthRotate);
        console.info(this.game.earthRotate);

        //first button
        this.button01 = this.game.add.sprite(30, -30, 'magmaButton');
        this.button01.anchor.x = 0.5; this.button01.scale.x = 0.03; this.button01.scale.y = 0.03;
        this.button01.inputEnabled = true;
        this.button01.events.onInputDown.add(this.listener01, this);

        //second button
        this.button02 = this.game.add.sprite(-70, 70, 'magmaButton');
        this.button02.anchor.x = 0.5; this.button02.scale.x = 0.03; this.button02.scale.y = 0.03;
        this.button02.inputEnabled = true;
        this.button02.events.onInputDown.add(this.listener02, this);

        this.button01Count = false;
        this.button02Count = false;

        this.isEnd = false;


        // groups for z depth
        let earthG = this.game.add.group();
        this.buttonG = this.game.add.group();
        earthG.add(this.earth);
        this.buttonG.add(this.button01);
        this.buttonG.add(this.button02);
        earthG.z = 100;
        this.buttonG.z = 120;
        this.buttonG.x = this.game.world.centerX;
        this.buttonG.y = this.game.world.centerY;
    }

    update() {
        this.buttonG.angle -= 0.03;
        if(this.button01Count && this.button02Count) {
            let text = this.translation.translate("last11");
            this.textbox.destroy();
            this.textbox = new Text(this.game, text);
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.EndScene, this);
        }

        if (this.isEnd && this.game.input.activePointer.leftButton.isDown) {
            this.nextEvent();
        }
    }

    listener01(){
        this.button01.alpha = 0.5;
        this.button01Count = true;
    }

    listener02(){
        this.button02.alpha = 0.5;
        this.button02Count = true;

    }

    EndScene() {
        this.isEnd = true;
    }

    nextEvent() {
        this.textbox.destroy();
        this.earth.destroy();
        this.button01.destroy();
        this.button02.destroy();
        this.game.state.start('Dinos');
    }

}

export default Magma;