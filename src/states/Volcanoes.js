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
        this.earth = new Earth(this.game, center.x, center.y, 'waterEarth', this.game.earthRotate);
        this.earth.scale.x = 0.55; this.earth.scale.y = 0.55;
        //this.earth.alpha = 0;
        let earthG = this.game.add.group();


        //create volcanos
        this.landG = this.game.add.group();
        this.volcanoes = [];
        this.volcanoG = this.game.add.group();
        this.landG.x = this.game.world.centerX;
        this.landG.y = this.game.world.centerY;
        this.volcanoG.x = this.game.world.centerX;
        this.volcanoG.y = this.game.world.centerY;
        for (var i = 0; i < 6; i++) {
            let x = (Math.cos((360/8)*(i+1))*200);
            let y = (Math.sin((360/8)*(i+1))*200);
            console.info(" x = " + x+", y: " + y);
            let volcano = this.game.add.sprite(x, y, 'volcano');
            volcano.angle = (360/6 * (i+1)) +90;
            volcano.scale.x = 0.5;
            volcano.scale.y = 0.5;
            volcano.anchor.x = 0.5;
            volcano.anchor.y = 0.65;
            volcano.inputEnabled = true;
            volcano.events.onInputDown.add(this.playAnim, this);
            this.walk = volcano.animations.add('walk');
            this.walk.enableUpdate = true;
            //this.volcanoes.push(volcano);
            this.volcanoG.add(volcano);
        }

        let land1 = this.game.add.sprite(0, 0, 'land1');
        let land2 = this.game.add.sprite(0, 0, 'land2');
        let land3 = this.game.add.sprite(0, 0, 'land3');
        let land4 = this.game.add.sprite(0, 0, 'land4');
        let land5 = this.game.add.sprite(0, 0, 'land5');
        let land6 = this.game.add.sprite(0,0, 'land6');
        this.landG.add(land1);
        this.landG.add(land2);
        this.landG.add(land3);
        this.landG.add(land4);
        this.landG.add(land5);
        this.landG.add(land6);
        this.landG.angle = this.game.earthRotate;


        for (var i = 0; i < 6; i++) {
        let land = this.landG.children[i];
        land.scale.x = 0.55; land.scale.y = 0.55;
        land.anchor.x = 0.5; land.anchor.y = 0.5;
        land.alpha = 0;
        }

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

        if (this.allPushed < 6){
            for (var i = 0; i < 6; i++) {
                if (this.landG.children[i].alpha == 0) {
                    this.game.add.tween(this.landG.children[i]).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
                    break;
                }

            }
        }

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

        this.landG.angle -= 0.03
        this.volcanoG.angle -= 0.03;
        if(this.allPushed === 6){
            this.game.textbox.changeText(this.game, this.game.translation.translate("last7"));
            //this.game.add.tween(this.earthWithLand).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 0);
            //this.game.add.tween(this.earth).to( { alpha: 0 }, 4000, Phaser.Easing.Linear.None, true, 0);
            this.game.add.tween(this.volcanoG).to( { alpha: 0 }, 4000, Phaser.Easing.Linear.None, true, 0);
            this.game.input.onDown.addOnce(this.nextEvent, this);
            this.allPushed = 0;
            this.game.input.onDown.addOnce(this.nextEvent, this, 10, null);
        }
    }

    nextEvent() {
        this.volcanoG.destroy();
        this.landG.destroy();
        this.earth.destroy();
        this.game.state.start('Cells', false, false);
    }

}

export default Volcanoes;