/**
 * Created by alinaisabelle on 23.04.18.
 */
import Earth from 'objects/Earth';
import Plant from 'objects/Plant';

class DragndropPlants extends Phaser.State {

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        this.earth = new Earth(this.game, center.x, center.y, 'firstEarth', this.game.earthRotate);
        console.info(this.game.earthRotate);

        this.plant = new Plant(this.game, 70, 70, 'plant');

        this.game.physics.enable( [ this.earth, this.plant ], Phaser.Physics.ARCADE);

        this.plant.inputEnabled = true;
        this.plant.input.enableDrag(true);
    }

    update(){
        this.game.physics.arcade.collide(this.earth, this.plant, this.collisionHandler, null, this);
    }

    collisionHandler (obj1, obj2) {
        //  The two sprites are colliding
        this.game.stage.backgroundColor = '#992d2d';

    }

}

export default DragndropPlants;