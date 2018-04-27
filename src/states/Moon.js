/**
 * Created by alinaisabelle on 24.04.18.
 */
import Earth from 'objects/Earth';
import MoonObject from 'objects/Moon';
import Translation from 'utils/translate';
import Text from 'objects/text';

class Moon extends Phaser.State {


    create() {
        // earth
        this.game.world.removeAll();
        this.earth = new Earth(this.game, this.game.world.centerX, this.game.world.centerY, 'explodedearth', this.game.earthRotate);

        //text
        this.translation = new Translation(this.game);
        let text = this.translation.translate("first5");
        this.textbox = new Text(this.game, text);

        //moon
        this.SpaceClicked = 0;
        this.moon = new MoonObject(this.game, 2.3, 2.3, 'moon');
        this.moon.alpha = 0;
        this.isEnd = false;

        // groups for z depth
        let earthG = this.game.add.group();
        let textG = this.game.add.group();
        textG.add(this.textbox);
        earthG.add(this.earth);
        earthG.add(this.moon);
        earthG.z = 100;
        earthG.z = 110;
    }

    update(){
        let spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(this.click, this);

        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        if (this.SpaceClicked === 5) {
            let text = this.translation.translate("last5");
            this.textbox.destroy();
            this.textbox = new Text(this.game, text);
            this.isEnd = true;
        }

        if (this.isEnd && this.game.input.activePointer.leftButton.isDown) {
            this.nextEvent();
        }

    }
    click () {
        this.SpaceClicked++;
        this.moon.alpha += 0.2;
    }

    nextEvent() {
        this.earth.destroy();
        this.moon.destroy();
        this.textbox.destroy();
        this.game.world.remove();
        this.game.state.start('Volcanoes', true, false);
    }
}

export default Moon;