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
        //this.game.load.image('explodedearth', 'assets/Moon/explodedearth.jpg');
        //this.game.load.image('plant', 'assets/Plants/plant.png');
        this.game.load.spritesheet('plant1', 'assets/Plants/plant1.png', 1280, 720, 18);
        this.game.load.spritesheet('StaubPlanet', 'assets/Plants/StaubPlanet.png');
        this.game.load.spritesheet('plant2', 'assets/Plants/plant2.png', 1280, 720, 22);
        this.game.load.spritesheet('plant3', 'assets/Plants/plant3.png', 1280, 720, 16);
        this.game.load.image('oceanAnimals', 'assets/Plants/animals.jpg');
        this.game.load.image('FirstLand', 'assets/Plants/FirstLandEarth.png');
        //this.game.load.image('cellsBig', 'assets/Cell/cellsBig.png');
        this.game.load.image('magmaButton', 'assets/Magma/magmaButton.png');
        this.game.load.image('magmaPlanet', 'assets/Magma/MagmaPlanet.png');

        this.game.load.image('sonne', 'assets/Urknall/mini_sun.png');
        this.game.load.image('mini1', 'assets/Urknall/miniPlanet1.png');
        this.game.load.image('mini2', 'assets/Urknall/miniPlanet2.png');

        this.game.load.image('people1', 'assets/People/mensch1.png');
        this.game.load.image('people2', 'assets/People/mensch2.png');
        this.game.load.image('people3', 'assets/People/mensch3.png');
        this.game.load.image('people4', 'assets/People/mensch4.png');
        this.game.load.image('people5', 'assets/People/mensch5.png');
        this.game.load.image('people6', 'assets/People/mensch6.png');
        this.game.load.image('HeutePlanet', 'assets/People/TodayPlanet.png');

        this.game.load.image('DinoEarth', 'assets/Dinos/DinoPlanet.png');
        this.game.load.spritesheet('dino1', 'assets/Dinos/dino1.png', 500, 500, 20);
        this.game.load.spritesheet('dino2', 'assets/Dinos/dino2.png', 500, 500, 20);
        this.game.load.spritesheet('dino3', 'assets/Dinos/dino3.png', 500, 500, 20);
        this.game.load.spritesheet('dino4', 'assets/Dinos/dino4.png', 500, 500, 20);
        this.game.load.spritesheet('dino5', 'assets/Dinos/dino5.png', 500, 500, 20);
        this.game.load.spritesheet('dino6', 'assets/Dinos/dino6.png', 500, 500, 20);
        this.game.load.spritesheet('explosion', 'assets/Dinos/explosion.png', 1920, 1080, 30);


        this.game.load.spritesheet('reptil1', 'assets/Dinos/reptile1.png', 1280, 720, 20);
        this.game.load.spritesheet('reptil2', 'assets/Dinos/reptile2.png', 1280, 720, 20);
        this.game.load.spritesheet('reptil3', 'assets/Dinos/reptile3.png', 1280, 720, 20);
        this.game.load.spritesheet('reptil4', 'assets/Dinos/reptile4.png', 1280, 720, 49);
        this.game.load.spritesheet('reptil5', 'assets/Dinos/reptile5.png', 1280, 720, 49);
        this.game.load.spritesheet('reptil6', 'assets/Dinos/reptile6.png', 1280, 720, 49);

        this.game.load.image('meteorit1', 'assets/Wachstum/Meteor_1.png');
        this.game.load.image('meteorit2', 'assets/Wachstum/Meteor_2.png');
        this.game.load.image('meteorit3', 'assets/Wachstum/Meteor_3.png');
        this.game.load.image('meteorit4', 'assets/Wachstum/Meteor_4.png');
        this.game.load.image('meteorit5', 'assets/Wachstum/Meteor_5.png');
        this.game.load.image('meteorit6', 'assets/Wachstum/Meteor_6.png');
        this.game.load.image('earth_meteor', 'assets/Dinos/EarthMeteor.jpg');
        this.game.load.image('fireball', 'assets/Wachstum/fireball.png');
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
        this.game.load.spritesheet('clouds', 'assets/Regenzeit/wolken.png', 1920, 1080, 74);
        this.game.load.spritesheet('cloudsFade', 'assets/Regenzeit/clouds_fade.png', 1920, 1080, 73);
        this.game.load.spritesheet('urknall', 'assets/Urknall/Urknall.png', 1920, 1080, 83);
        this.game.load.spritesheet('entstehung', 'assets/Urknall/splitter.png', 1920, 1080, 95);

        this.game.load.image('land1', 'assets/Volcano/Land1.png');
        this.game.load.image('land2', 'assets/Volcano/Land2.png');
        this.game.load.image('land3', 'assets/Volcano/Land3.png');
        this.game.load.image('land4', 'assets/Volcano/Land4.png');
        this.game.load.image('land5', 'assets/Volcano/Land5.png');
        this.game.load.image('land6', 'assets/Volcano/Land6.png');
        this.game.load.video('theia', 'assets/Kollision/Theia.mp4');
    }


    create() {
        this.game.load.start();
        var wfconfig = {

            active: function() {
                console.log("font loaded");
                //init();
            },

            google: {
                families: ['Patrick Hand']
            }

        };
        WebFont.load(wfconfig);
        //this.game.load.start();
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.setTimeline, this);

    }

    setTimeline() {
        this.game.stage.backgroundColor = '#051023';
        this.game.bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        this.game.bg.anchor.x = 0.5; this.game.bg.anchor.y = 0.5;
        this.game.bg.scale.x = 0.0; this.game.bg.scale.y = 0.0;
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
        this.game.state.start('Dinos', false, false);
    }

}

export default Preloader;