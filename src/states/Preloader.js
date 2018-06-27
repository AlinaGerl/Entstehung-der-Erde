/**
 * Created by alinaisabelle on 23.04.18.
 */
import pointer from 'objects/Pointer';
import timeline from 'objects/timeline';
import Translation from 'utils/translate';
import Text from 'objects/text';
import MoonObject from 'objects/Moon';

class Preloader extends Phaser.State {


    preload() {
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        this.game.load.image('timeline', 'assets/timeline.png');
        this.game.load.image('pointer', 'assets/pointer.png');
        this.game.load.image('firstEarth', 'assets/Urknall/littleEarth.png');
        this.game.load.image('background', 'assets/background_scaled.png');
        //this.game.load.image('urknall', 'assets/Urknall/Urknall.jpg');
        this.game.load.image('redButton', 'assets/Kollision/Button.png');
        this.game.load.image('ButtonPressed', 'assets/Kollision/ButtonPressed.png');
        this.game.load.json('translation', 'data/languageText.json');
        this.game.load.image('Thaia', 'assets/Kollision/theia.png');
        this.game.load.image('moon', 'assets/Moon/Mond.png');
        this.game.load.image('explodedearth', 'assets/Moon/explodedearth.jpg');
        //this.game.load.image('plant', 'assets/Plants/plant.png');
        this.game.load.spritesheet('plant1', 'assets/Plants/plant1.png', 1280, 720, 18);
        this.game.load.spritesheet('plant2', 'assets/Plants/plant2.png', 1280, 720, 22);
        this.game.load.spritesheet('plant3', 'assets/Plants/plant3.png', 1280, 720, 16);
        this.game.load.image('oceanAnimals', 'assets/Plants/animals.jpg');
        this.game.load.image('FirstLand', 'assets/Plants/FirstLandEarth.png');
        //this.game.load.image('cellsBig', 'assets/Cell/cellsBig.png');
        this.game.load.image('magmaButton', 'assets/Magma/magmaButton.png');
        this.game.load.image('magmaPlanet', 'assets/Magma/MagmaPlanet.png');

        this.game.load.image('people', 'assets/People/people.png');
        this.game.load.image('DinoEarth', 'assets/Dinos/DinoPlanet.png');
        this.game.load.spritesheet('dino1', 'assets/Dinos/reptile1.png', 1280, 720, 20);
        this.game.load.spritesheet('dino2', 'assets/Dinos/reptile2.png', 1280, 720, 20);
        this.game.load.spritesheet('dino3', 'assets/Dinos/reptile3.png', 1280, 720, 20);
        this.game.load.image('meteorit1', 'assets/Wachstum/Meteor_1.png');
        this.game.load.image('meteorit2', 'assets/Wachstum/Meteor_2.png');
        this.game.load.image('meteorit3', 'assets/Wachstum/Meteor_3.png');
        this.game.load.image('meteorit4', 'assets/Wachstum/Meteor_4.png');
        this.game.load.image('meteorit5', 'assets/Wachstum/Meteor_5.png');
        this.game.load.image('meteorit6', 'assets/Wachstum/Meteor_6.png');
        this.game.load.image('earth_meteor', 'assets/Dinos/EarthMeteor.jpg');
        this.game.load.image('fireball', 'assets/Wachstum/fireball.png');
        this.game.load.image('sonne', 'assets/Urknall/mini_sun.png');
        this.game.load.spritesheet('cellsBig', 'assets/Cell/cellBig.png', 1280, 720, 8);
        this.game.load.spritesheet('cellsSmall', 'assets/Cell/cellSmall.png', 1280, 720, 8);
        this.game.load.spritesheet('volcano', 'assets/Volcano/volcano.png', 375, 375, 20);
        this.game.load.spritesheet('seaWeed1', 'assets/Ocean/seaWeed1.png', 1280, 720, 14);
        this.game.load.spritesheet('seaWeed2', 'assets/Ocean/seaWeed2.png', 1280, 720, 14);
        this.game.load.spritesheet('seaWeed3', 'assets/Ocean/seaWeed3.png', 1280, 720, 14);
        this.game.load.spritesheet('coral', 'assets/Ocean/coral.png', 1280, 720, 18);
        this.game.load.spritesheet('jellyfish', 'assets/Ocean/jellyfish.png', 1280, 720, 14);
        this.game.load.spritesheet('shell', 'assets/Ocean/seaAnimal_shell.png', 1280, 720, 10);

        //this.game.load.atlas('seaWeed2', 'assets/Ocean/seaWeed2.png', 'assets/Ocean/seaWeed2.json');
        this.game.load.image('rodinia', 'assets/Eiszeit/Rodinia.png');
        this.game.load.image('iceball', 'assets/Eiszeit/iceball.png');
        this.game.load.image('EchsenPlanet', 'assets/Eiszeit/EchsenPlanet.png');
        this.game.load.image('waterball', 'assets/Regenzeit/waterball.png');
        this.game.load.image('waterEarth', 'assets/Regenzeit/WaterEarth.png');
        this.game.load.image('wolke', 'assets/Regenzeit/wolke.png');
        this.game.load.spritesheet('clouds', 'assets/Regenzeit/wolken.png', 1920, 1080, 76);
        this.game.load.spritesheet('urknall', 'assets/Urknall/Urknall.png', 1920, 1080, 83);
        this.game.load.spritesheet('entstehung', 'assets/Urknall/planetentstehung2.png', 1920, 1080, 100);
        this.game.load.spritesheet('entstehung2', 'assets/Urknall/planetentstehung2.png', 1920, 1080, 84);

        this.game.load.image('land1', 'assets/Volcano/Land1.png');
        this.game.load.image('land2', 'assets/Volcano/Land2.png');
        this.game.load.image('land3', 'assets/Volcano/Land3.png');
        this.game.load.image('land4', 'assets/Volcano/Land4.png');
        this.game.load.image('land5', 'assets/Volcano/Land5.png');
        this.game.load.image('land6', 'assets/Volcano/Land6.png');
    }


    create() {
        this.game.load.start();
        var wfconfig = {

            active: function() {
                console.log("font loaded");
                //init();
            },

            google: {
                families: ['Roboto Mono', 'Montserrat', 'Indie Flower', 'Handlee', 'Patrick Hand SC', 'Nanum Pen Script',
                    'Gaegu', 'Itim', 'Pangolin', 'Short Stack','Dekko']
            }

        };
        WebFont.load(wfconfig);
        //this.game.load.start();
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.setTimeline, this);

    }

    setTimeline() {
        this.game.stage.backgroundColor = '#051023';
        this.game.pointer = new pointer(this.game, 66, "4.6 Mrd");
        this.game.timeline = new timeline(this.game);
        this.game.translation = new Translation(this.game);
        this.game.textbox = new Text(this.game, this.game.translation.translate("first1"));

        this.game.moon = new MoonObject(this.game, 1.8, 1.8, 'moon');
        this.game.moon.alpha = 0;
        if (!this.game.pointerText.parent)
        {
            this.add.existing(this.game.pointerText);
        }
        this.game.state.start('PlanetEntstehung', false, false);
    }

}

export default Preloader;