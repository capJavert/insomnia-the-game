import Boot from 'states/Boot';
import Preload from 'states/Preload';
import Menu from 'states/Menu';
import LevelSelect from 'states/LevelSelect';
import Controls from 'states/Controls';
import Stats from 'states/Stats';
import Credits from 'states/Credits';
import Test from 'states/Test';
import Main from 'states/Main';
import GameOver from 'states/GameOver';

class Game extends Phaser.Game {

	constructor() {
        // eslint-disable-next-line no-undef
        if (window.WebFont) {
            window.WebFont.load({
                google: {
                    families: ['IM Fell DW Pica']
                }
            });
        }

		//super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS);
		super(1920, 1080, Phaser.CANVAS);

		this.state.add('Boot', Boot, false);
		this.state.add('Preload', Preload, false);
		this.state.add('Menu', Menu, false);
		this.state.add('LevelSelect', LevelSelect, false);
		this.state.add('Controls', Controls, false);
		this.state.add('Stats', Stats, false);
		this.state.add('Credits', Credits, false);
		this.state.add('Test', Test, false);
		this.state.add('Main', Main, false);
		this.state.add('GameOver', GameOver, false);

		this.state.start('Boot');
	}

}

new Game();
