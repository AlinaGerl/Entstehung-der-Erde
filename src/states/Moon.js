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
        this.game.textbox.changeText(this.game, this.game.translation.translate("first5"));
        if (!this.game.pointer.parent)
        {
            this.add.existing(this.game.pointer);
        }
        if (!this.game.pointerText.parent)
        {
            this.add.existing(this.game.pointerText);
        }
        //moon
        this.SpaceClicked = 0;
        this.moon = new MoonObject(this.game, 1.8, 1.8, 'moon');
        this.moon.alpha = 0;
        this.isEnd = false;

        // groups for z depth
        let earthG = this.game.add.group();
        let textG = this.game.add.group();
        earthG.add(this.earth);
        earthG.add(this.moon);
        earthG.z = 100;
        earthG.z = 110;

        this.game.input.keyboard.start();
    }

    update(){
        let spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(this.click, this);

        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        if (this.SpaceClicked === 5) {
            this.game.textbox.changeText(this.game, this.game.translation.translate("last5"));
            this.isEnd = true;
            this.game.input.onDown.addOnce(this.nextEvent, this, 10, null);
        }

    }
    click () {
        this.SpaceClicked++;
        this.moon.alpha += 0.2;
    }

    nextEvent() {
        this.earth.destroy();
        this.moon.destroy();
        this.game.world.remove();
        this.game.state.start('Regenzeit', false, false);
    }
}

export default Moon;