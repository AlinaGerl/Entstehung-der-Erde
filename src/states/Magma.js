/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Translation from 'utils/translate';
import Text from 'objects/text';


class Magma extends Phaser.State {

    create() {

        //text
        this.game.textbox.changeNewState(this.game, this.game.translation.translate("first11"));

        this.game.pointer.setPosition(698);
        this.game.pointerText.text = "250 Mil";
        //earth
        let center = {x: this.game.world.centerX, y: this.game.world.centerY};
        this.earth = new Earth(this.game, center.x, center.y, 'EchsenPlanet', this.game.earthRotate);

        this.hadClicked = 0;
        // //first button
        // this.button01 = this.game.add.sprite(40, -80, 'magmaButton');
        // this.button01.anchor.x = 0.5; this.button01.scale.x = 0.03; this.button01.scale.y = 0.03;
        // this.button01.inputEnabled = true;
        // this.button01.events.onInputDown.add(this.listener01, this);
        //
        // //second button
        // this.button02 = this.game.add.sprite(-70, 70, 'magmaButton');
        // this.button02.anchor.x = 0.5; this.button02.scale.x = 0.03; this.button02.scale.y = 0.03;
        // this.button02.inputEnabled = true;
        // this.button02.events.onInputDown.add(this.listener02, this);
        //
        // this.button01Count = false;
        // this.button02Count = false;

        this.isEnd = false;


        // groups for z depth
        let earthG = this.game.add.group();
        this.buttonG = this.game.add.group();
        this.reptilsG = this.game.add.group();
        this.reptilsG.angle = this.game.earthRotation;
        earthG.add(this.earth);
        // this.buttonG.add(this.button01);
        // this.buttonG.add(this.button02);
        earthG.z = 100;
        this.buttonG.z = 120;
        this.buttonG.x = this.game.world.centerX;
        this.buttonG.y = this.game.world.centerY;


        this.magma = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'magmaPlanet');
        this.magma.alpha = 0.0; this.magma.scale.x = 0.5; this.magma.scale.y = 0.5; this.magma.anchor.x = 0.5; this.magma.anchor.y = 0.5;
        this.magma.angle = this.game.earthRotate;

        this.earth.inputEnabled = true;
        this.earth.events.onInputDown.add(this.click, this);


        this.reptilsG.z = 160;
        this.reptilsG.x = this.game.world.centerX;
        this.reptilsG.y = this.game.world.centerY;
        for (var i = 0; i < 6; i++){

            let x = Math.cos(((360/8)*i))*280;
            let y = Math.sin(((360/8)*i))*280;
            let people = this.game.add.sprite(x, y, 'reptil1');
            people.scale.x = 0.2;
            people.scale.y = 0.2;
            people.angle = (360/6 * i)+120;
            this.reptilsG.add(people);
        }
        this.reptilsG.children[1].loadTexture('reptil2', 0 , false);
        this.reptilsG.children[2].loadTexture('reptil3', 0 , false);
        this.reptilsG.children[3].loadTexture('reptil4', 0 , false);
        this.reptilsG.children[4].loadTexture('reptil5', 0 , false);
        this.reptilsG.children[5].loadTexture('reptil6', 0 , false);
    }

    update() {
        this.magma.angle -= 0.03;
        this.reptilsG.angle -= 0.03;
        if (this.hadClicked == 5) this.nextEvent();
        // this.buttonG.angle -= 0.03;
        // if(this.button01Count && this.button02Count) {
        //     this.game.textbox.changeText(this.game, this.game.translation.translate("last11"));
        //     this.game.time.events.add(Phaser.Timer.SECOND * 1, this.EndScene, this);
        // }
        //
        // if (this.isEnd && this.game.input.activePointer.leftButton.isDown) {
        //     this.nextEvent();
        // }
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

    click(){
        this.magma.alpha += 0.2;
        this.earth.alpha -= 0.2;
        this.hadClicked++;
    }

    nextEvent() {
        this.earth.destroy();
        this.reptilsG.destroy();
        // this.button01.destroy();
        // this.button02.destroy();
        this.magma.destroy();
        this.game.state.start('Dinos', false, false);
    }

}

export default Magma;