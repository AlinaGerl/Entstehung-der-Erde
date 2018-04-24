/**
 * Created by alinaisabelle on 23.04.18.
 */
class Preloader extends Phaser.State {


    preload() {
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        this.game.load.image('firstEarth', 'assets/Urknall/littleEarth.png');
        this.game.load.image('redButton', 'assets/Kollision/Button.png');
        this.game.load.json('translation', 'data/languageText.json');
        this.game.load.image('splitter', 'assets/Urknall/splitter.png');
    }


    create() {
        this.game.load.start();
        this.game.state.start('Urknall');
    }

}

export default Preloader;