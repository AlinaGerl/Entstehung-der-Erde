/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';


class Magma extends Phaser.State {

    create() {

        //text
        this.game.textbox.changeText(this.game, this.game.translation.translate("first11"));

        this.game.pointer.setPosition(698);
        this.game.pointerText.text = "250 Mil";
        //earth
        let center = {x: this.game.world.centerX, y: this.game.world.centerY};
        this.earth = new Earth(this.game, center.x, center.y, 'firstEarth', this.game.earthRotate);
        console.info(this.game.earthRotate);

        //first button
        this.button01 = this.game.add.sprite(40, -80, 'magmaButton');
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
            this.game.textbox.changeText(this.game, this.game.translation.translate("last11"));
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
        this.earth.destroy();
        this.button01.destroy();
        this.button02.destroy();
        this.game.state.start('Dinos', false, false);
    }

}

export default Magma;