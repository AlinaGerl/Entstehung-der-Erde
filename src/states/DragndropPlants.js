/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Plant from 'objects/Plant';
import Translation from 'utils/translate';
import Text from 'objects/text';


class DragndropPlants extends Phaser.State {

    create() {
        this.game.world.removeAll();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //text
        this.translation = new Translation(this.game);
        this.text = this.translation.translate("first10_1");
        this.textbox = new Text(this.game, this.text);

        //earth
        let center = {x: this.game.world.centerX, y: this.game.world.centerY};
        this.earth = new Earth(this.game, center.x, center.y, 'firstEarth', this.game.earthRotate);
        console.info(this.game.earthRotate);

        //plant
        this.plant = new Plant(this.game, 70, 70, 'plant');
        this.game.physics.enable([this.earth, this.plant], Phaser.Physics.ARCADE);

        //drag&drop plant
        this.plant.inputEnabled = true;
        this.plant.input.enableDrag(true);
    }

    update(){
        this.game.physics.arcade.collide(this.earth, this.plant, this.collisionHandler, null, this);

        if(this.game.collided == true) {
            this.nextEvent();
        }

    }

    collisionHandler (obj1, obj2) {
        //  The two sprites are colliding
        this.game.collided = true;
        //this.game.stage.backgroundColor = '#992d2d';

    }


    nextEvent() {
        this.textbox.destroy();
        this.plant.destroy();
        this.earth.destroy();
        this.game.state.start('Magma', true, false);
    }

}

export default DragndropPlants;