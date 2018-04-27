/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';


class Volcanoes extends Phaser.State {

    create() {

        //text
        this.translation = new Translation(this.game);
        this.text = this.translation.translate("first7");
        this.textbox = new Text(this.game, this.text);

        //earth
        let center = {x: this.game.world.centerX, y: this.game.world.centerY};
        this.earth = new Earth(this.game, center.x, center.y, 'firstEarth', this.game.earthRotate);
        console.info(this.game.earthRotate);

        //create volcanos
        this.volcano01 = this.game.add.sprite(center.x, center.y, 'volcano');
        this.volcano01.anchor.x = 0.5;
        this.volcano01.anchor.y = 0.5;
        this.volcano01.scale.x = 0.5;
        this.volcano01.scale.y = 0.5;

        this.volcano02 = this.game.add.sprite(center.x+100, center.y+50, 'volcano');
        this.volcano02.anchor.x = 0.5;
        this.volcano02.anchor.y = 0.5;
        this.volcano02.scale.x = 0.5;
        this.volcano02.scale.y = 0.5;

        this.volcano03 = this.game.add.sprite(center.x-70, center.y+60, 'volcano');
        this.volcano03.anchor.x = 0.5;
        this.volcano03.anchor.y = 0.5;
        this.volcano03.scale.x = 0.5;
        this.volcano03.scale.y = 0.5;

        this.volcano01.inputEnabled = true;
        this.volcano02.inputEnabled = true;
        this.volcano03.inputEnabled = true;
        this.volcano01.events.onInputDown.add(this.playAnim01, this);
        this.volcano02.events.onInputDown.add(this.playAnim02, this);
        this.volcano03.events.onInputDown.add(this.playAnim03, this);

        //set animation
        this.walk = this.volcano01.animations.add('walk');
        this.walk = this.volcano02.animations.add('walk');
        this.walk = this.volcano03.animations.add('walk');
        this.walk.enableUpdate = true;

        this.allPushed = 0;
        this.game.input.mouse.capture = true;

        // groups for z depth
        let earthG = this.game.add.group();
        this.volcanoG = this.game.add.group();
        earthG.add(this.earth);
        this.volcanoG.add(this.volcano01);
        this.volcanoG.add(this.volcano02);
        this.volcanoG.add(this.volcano03);
        earthG.z = 100;
        this.volcanoG.z = 120;

    }

    playAnim01(){
        this.volcano01.animations.play('walk', 20, true);
        this.allPushed++;
    }
    playAnim02(){
        this.volcano02.animations.play('walk', 20, true);
        this.allPushed++;
    }
    playAnim03(){
        this.volcano03.animations.play('walk', 20, true);
        this.allPushed++;
    }

    update(){
        if(this.allPushed === 3 && this.game.input.activePointer.leftButton.isDown){
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.nextEvent, this);
        }
    }

    nextEvent() {
        this.textbox.destroy();
        this.game.world.removeAll();
        this.game.state.start('Cells', true, false);
    }

}

export default Volcanoes;