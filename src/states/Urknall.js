import RainbowText from 'objects/RainbowText';
import Earth from 'objects/Earth';

class Urknall extends Phaser.State {

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		let earth = new Earth(this.game, center.x, center.y, 0.5);

		text.anchor.set(0.5);
	}

}

export default Urknall;
