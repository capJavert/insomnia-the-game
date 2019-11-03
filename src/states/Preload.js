class Preload extends Phaser.State {
	loadUpdate() {
		let loadMessageBitMap = this.game.add.bitmapData(this.game.width, this.game.height);
		loadMessageBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
		loadMessageBitMap.ctx.fillStyle = '#000000';
		loadMessageBitMap.ctx.fill();
		this.loader = this.game.add.sprite(0, 0, loadMessageBitMap);

		//text
		this.text = this.game.add.text(
			this.game.width/2, this.game.height/2,
			"... Loading "+this.load.progress+"% ..."
		);
		this.text.anchor.setTo(0.5);
		this.text.font = 'IM Fell DW Pica';
		this.text.fontWeight = 'normal';
		this.text.fontSize = 60;
		this.text.fill = '#FFFFFF'
		this.text.align = 'center';
	}

	preload() {
		//sounds
		this.game.load.audio('background-rain', 'assets/sounds/background-rain.mp3');
		this.game.load.audio('background-wind', 'assets/sounds/background-wind.mp3');
		this.game.load.audio('fiend-hit', 'assets/sounds/fiend-hit.mp3');
		this.game.load.audio('flying-shadow-idle', 'assets/sounds/flying-shadow-idle.mp3');
		this.game.load.audio('girl-drop', 'assets/sounds/girl-drop.mp3');
		this.game.load.audio('girl-move', 'assets/sounds/girl-move.mp3');
		this.game.load.audio('girl-boost', 'assets/sounds/girl-boost.mp3');
		this.game.load.audio('orb-collect', 'assets/sounds/orb-collect.mp3');

		//menu images
		this.game.load.image('logo', 'assets/menu/logo.png');

		//character
		this.game.load.spritesheet('girl-dummy-sprite', 'assets/girl-dummy-sprite.png', 169, 180);
		this.game.load.atlas('girl', 'assets/girl.png', 'assets/girl.json');
		//this.game.load.physics('girl-physics', 'assets/girl-physics.json');
		this.game.load.spritesheet('hair', 'assets/hair.png', 161, 177);
		this.game.load.spritesheet('hair-moving', 'assets/hair-moving.png', 218, 177);
		this.game.load.spritesheet('hair-falling', 'assets/hair-falling.png', 101, 135);

		//backgrounds
		this.game.load.image('background-mid-lvl1', 'assets/backgrounds/background-mid-lvl1.png');
		this.game.load.image('background-mid-lvl2', 'assets/backgrounds/background-mid-lvl2.png');
		this.game.load.image('background-mid-lvl3', 'assets/backgrounds/background-mid-lvl3.png');
		this.game.load.image('background-mid-lvl4', 'assets/backgrounds/background-mid-lvl4.png');
		this.game.load.image('background-mid-lvl5', 'assets/backgrounds/background-mid-lvl5.png');
		this.game.load.image('background-bottom', 'assets/backgrounds/background-bottom.png');

		//game objects
		this.game.load.spritesheet('rock', 'assets/objects/rock.png', 456, 469);
		this.game.load.physics('rock-physics', 'assets/objects/rock-physics.json');
		this.game.load.spritesheet('orb', 'assets/objects/orb.png', 90, 90);
		this.game.load.spritesheet('ground-trap', 'assets/objects/ground-trap.png', 222, 41);
		this.game.load.spritesheet('spikes', 'assets/objects/spikes.png', 391, 244);
		this.game.load.spritesheet('pond', 'assets/objects/pond.png', 250, 400);
		this.game.load.spritesheet('puzzle-obstacle', 'assets/objects/puzzle-obstacle.png', 250, 600);

		//fiends
		this.game.load.atlas('shadow-hand', 'assets/shadow-hand.png', 'assets/shadow-hand.json');
		this.game.load.atlas('flying-shadow', 'assets/flying-shadow.png', 'assets/flying-shadow.json');

		// fx
		this.game.load.image('sun', 'assets/sun.png');
		this.game.load.image('moon', 'assets/moon.png');
	}

	create() {
		//state to start after game assets are loaded
		//this.game.state.start("Main");
		//this.game.state.start("Test");
		this.game.state.start("Menu");
	}

}

export default Preload;
