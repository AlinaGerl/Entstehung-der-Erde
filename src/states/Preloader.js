/**
 * Created by alinaisabelle on 23.04.18.
 */
class Preloader extends Phaser.State {


    preload() {
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        this.game.load.image('firstEarth', 'assets/Urknall/littleEarth.png');
        this.game.load.image('urknall', 'assets/Urknall/Urknall.jpg');
        this.game.load.image('redButton', 'assets/Kollision/Button.png');
        this.game.load.json('translation', 'data/languageText.json');
        this.game.load.image('splitter', 'assets/Urknall/splitter.png');
        this.game.load.image('moon', 'assets/Moon/moon.png');
        this.game.load.image('explodedearth', 'assets/Moon/explodedearth.jpg');

        this.game.load.image('plant', 'assets/Plants/plant.png');
        this.game.load.image('oceanAnimals', 'assets/Plants/animals.jpg');
        this.game.load.image('cells', 'assets/Cell/cell.png');
        this.game.load.image('magmaButton', 'assets/Magma/magmaButton.png');
        this.game.load.image('people', 'assets/People/people.png');
        this.game.load.image('dino', 'assets/Dinos/Dino.png');
        this.game.load.image('meteorit', 'assets/Dinos/meteorit.png');
        this.game.load.image('earth_meteor', 'assets/Dinos/EarthMeteor.jpg');
    }


    create() {
        this.game.load.start();
        var wfconfig = {

            active: function() {
                console.log("font loaded");
                //init();
            },

            google: {
                families: ['Roboto Mono']
            }

        };
        WebFont.load(wfconfig);
        //this.game.load.start('Dinos');
        this.game.state.start('Dinos', true, false);
    }

}

export default Preloader;