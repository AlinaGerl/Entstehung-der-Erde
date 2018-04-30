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
        this.game.load.image('cellsBig', 'assets/Cell/cellsBig.png');
        this.game.load.image('magmaButton', 'assets/Magma/magmaButton.png');
        this.game.load.image('people', 'assets/People/people.png');
        this.game.load.image('dino', 'assets/Dinos/Dino.png');
        this.game.load.image('meteorit', 'assets/Dinos/meteorit.png');
        this.game.load.image('earth_meteor', 'assets/Dinos/EarthMeteor.jpg');
        this.game.load.image('fireball', 'assets/Wachstum/fireball.png');
        this.game.load.spritesheet('cellsBig', 'assets/Cell/cellsBig.png', 396, 495, 8);
        this.game.load.spritesheet('cellsSmall', 'assets/Cell/cellsSmall.png', 318, 344, 8);
        this.game.load.spritesheet('volcano', 'assets/Volcano/volcano.png', 375, 375, 20);
        this.game.load.spritesheet('seaWeed1', 'assets/Ocean/seaWeed1.png', 120, 346, 14);
        //this.game.load.atlas('seaWeed2', 'assets/sprites/seaWeed2.png', 'assets/sprites/seaWeed2.json');
        this.game.load.image('rodinia', 'assets/Eiszeit/Rodinia.png');
        this.game.load.image('iceball', 'assets/Eiszeit/iceball.png');
        this.game.load.image('waterball', 'assets/Regenzeit/waterball.png');
        this.game.load.image('wolke', 'assets/Regenzeit/wolke.png');
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
        //this.game.load.start();
        this.game.state.start('Regenzeit');
    }

}

export default Preloader;