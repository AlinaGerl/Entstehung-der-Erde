/**
 * Created by alinaisabelle on 23.04.18.
 */
export default class Translation {
    /**
     * Constructor for Translation
     *
     * @param {Object} game Reference to the Game Object
     * @param {Object} translations The translations from your JSON object
     */
    constructor(game, translations) {
        this.game = game;
        this.defaultLanguage = 'de';
        this.availableLanguages = ['de', 'en'];
        this.translations = this.game.cache.getJSON('translation');

        // check for user language
        let preferredLanguage = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || this.defaultLanguage;

        // check if valid or not
        if (preferredLanguage === null || preferredLanguage === undefined || preferredLanguage === false || typeof (preferredLanguage !== 'string')) {
            this.languageCode = this.defaultLanguage;
            // if valid, then get first 2 chars of languag code
        } else if (preferredLanguage.length > 2) {
            this.languageCode = preferredLanguage.substr(0, 2);
            // already valid and only 2 characters long
        } else {
            this.languageCode = preferredLanguage;
        }

        // if the language code is not in the available languages, then use the default language
        if(!this.contains(this.availableLanguages, this.languageCode)) {
            this.languageCode = this.defaultLanguage
        }
    }

    /**
     * @description Returns a string translation
     *
     * @param {string} val the text to translate
     *
     * @returns {string}
     */
    translate(val) {
        if(this.translations[this.languageCode][val]) {
            return this.translations[this.languageCode][val];
        } else {
            // console.info('could not find translation', val, '-' this.lc);
        }
    }

    /**
     * @description loops through a given array and checks if the passed value is matched anywhere
     *
     * @param {array} arr Array to loop over
     * @param {string} val value to compare
     *
     * @returns {boolean}
     */
    contains(arr, val) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] == val) {
                return true;
            }
        }
        return false;
    }
}