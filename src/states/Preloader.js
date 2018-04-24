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

    }

    // WebFontConfig () {
    //
    //     //  'active' means all requested fonts have finished loading
    //     //  We set a 1 second delay before calling 'createText'.
    //     //  For some reason if we don't the browser cannot render the text the first time it's created.
    //     active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    //
    //     //  The Google Fonts we want to load (specify as many as you like in the array)
    //     google: {
    //         families: ['Roboto Mono']
    //     }
    //
    // };

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
        this.game.state.start('Urknall');
    }

}

export default Preloader;