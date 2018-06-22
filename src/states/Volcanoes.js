/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';


class Volcanoes extends Phaser.State {

    create() {

        //text
        this.game.textbox.changeNewState(this.game, this.game.translation.translate("first7"));

        //earth
        let center = {x: this.game.world.centerX, y: this.game.world.centerY};
        this.earth = new Earth(this.game, center.x, center.y, 'waterball', this.game.earthRotate);
        this.earth.scale.x = 0.9; this.earth.scale.y = 0.9;
        //this.earth.alpha = 0;
        let earthG = this.game.add.group();

        this.earthWithLand = this.game.add.sprite(center.x, center.y, 'firstEarth');
        this.earthWithLand.scale.x = 0.5; this.earthWithLand.scale.y = 0.5;
        this.earthWithLand.alpha = 0; this.earthWithLand.angle = this.game.earthRotate;
        this.earthWithLand.anchor.x = 0.5; this.earthWithLand.anchor.y = 0.5;

        //create volcanos
        this.volcanoes = [];
        this.volcanoG = this.game.add.group();
        this.volcanoG.x = this.game.world.centerX;
        this.volcanoG.y = this.game.world.centerY;
        for (var i = 0; i < 8; i++) {
            let x = Math.cos(((360/9)*this.volcanoG.children.length+1))*200;
            let y = Math.sin(((360/9)*this.volcanoG.children.length+1))*200;
            let volcano = this.game.add.sprite(x, y, 'volcano');
            volcano.angle = (360/8 * this.volcanoG.children.length+1)+90;
            volcano.scale.x = 0.5;
            volcano.scale.y = 0.5;
            volcano.anchor.x = 0.5;
            volcano.anchor.y = 0.6;
            volcano.inputEnabled = true;
            volcano.events.onInputDown.add(this.playAnim, this);
            this.walk = volcano.animations.add('walk');
            this.walk.enableUpdate = true;
            //this.volcanoes.push(volcano);
            this.volcanoG.add(volcano);
        }
        // this.volcano01 = this.game.add.sprite(center.x-50, center.y-80, 'volcano');
        // this.volcano01.anchor.x = 0.5;
        // this.volcano01.anchor.y = 0.5;
        // this.volcano01.scale.x = 0.5;
        // this.volcano01.scale.y = 0.5;
        //
        // this.volcano02 = this.game.add.sprite(center.x+60, center.y-20, 'volcano');
        // this.volcano02.anchor.x = 0.5;
        // this.volcano02.anchor.y = 0.5;
        // this.volcano02.scale.x = 0.5;
        // this.volcano02.scale.y = 0.5;
        //
        // this.volcano03 = this.game.add.sprite(center.x-50, center.y+100, 'volcano');
        // this.volcano03.anchor.x = 0.5;
        // this.volcano03.anchor.y = 0.5;
        // this.volcano03.scale.x = 0.5;
        // this.volcano03.scale.y = 0.5;
        //
        // this.volcano01.inputEnabled = true;
        // this.volcano02.inputEnabled = true;
        // this.volcano03.inputEnabled = true;
        // this.volcano01.events.onInputDown.add(this.playAnim01, this);
        // this.volcano02.events.onInputDown.add(this.playAnim02, this);
        // this.volcano03.events.onInputDown.add(this.playAnim03, this);

        //set animation
        // this.walk = this.volcano01.animations.add('walk');
        // this.walk = this.volcano02.animations.add('walk');
        // this.walk = this.volcano03.animations.add('walk');
        //this.walk.enableUpdate = true;

        this.allPushed = 0;
        this.game.input.mouse.capture = true;

        // groups for z depth

        earthG.add(this.earth);
        // this.volcanoG.add(this.volcano01);
        // this.volcanoG.add(this.volcano02);
        // this.volcanoG.add(this.volcano03);
        earthG.z = 100;
        this.volcanoG.z = 150;

    }

    playAnim(volcano){
        volcano.animations.play('walk', 20, true);
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
        this.earthWithLand.angle -= 0.03;
        if(this.allPushed === 3){
            this.game.textbox.changeText(this.game, this.game.translation.translate("last7"));
            this.game.add.tween(this.earthWithLand).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 0);
            this.game.add.tween(this.earth).to( { alpha: 0 }, 4000, Phaser.Easing.Linear.None, true, 0);
            this.game.input.onDown.addOnce(this.nextEvent, this);
            this.allPushed = 0;
        }
    }

    nextEvent() {
        this.volcano01.destroy();
        this.volcano02.destroy();
        this.volcano03.destroy();
        this.game.state.start('Cells', false, false);
    }

}

export default Volcanoes;