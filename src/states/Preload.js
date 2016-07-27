class Preload extends Phaser.State {

	preload() {
		//sounds
		//this.game.load.image('myImage', 'assets/my-image.png');
		//this.game.load.audio('myAudio', 'assets/my-audio.wav');
		//this.game.load.atlas('myAtlas', 'assets/my-atlas.png', 'assets/my-atlas.json');
		//this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

		//character
		this.game.load.spritesheet('girl-dummy-sprite', 'assets/girl-dummy-sprite.png', 169, 180);
		this.game.load.atlas('girl', 'assets/girl.png', 'assets/girl.json');
		//this.game.load.physics('girl-physics', 'assets/girl-physics.json');
		this.game.load.spritesheet('hair', 'assets/hair.png', 161, 177);
		this.game.load.spritesheet('hair-moving', 'assets/hair-moving.png', 218, 177);
		this.game.load.spritesheet('hair-falling', 'assets/hair-falling.png', 101, 135);

		//for beta lvl should be loaded based on current lvl
    	this.game.load.image('background-mid', 'assets/lvl1/background-mid.png');
    	this.game.load.image('background-bottom', 'assets/lvl1/background-bottom.png');

    	//game objects
    	this.game.load.spritesheet('rock', 'assets/objects/rock.png', 456, 469);
	    this.game.load.physics('rock-physics', 'assets/objects/rock-physics.json');
    	this.game.load.spritesheet('orb', 'assets/objects/orb.png', 90, 90);;

    	//fiends
		this.game.load.atlas('shadow-hand', 'assets/shadow-hand.png', 'assets/shadow-hand.json');
		this.game.load.atlas('flying-shadow', 'assets/flying-shadow.png', 'assets/flying-shadow.json');

    	// fx
    	this.game.load.image('sun', 'assets/sun.png');
        this.game.load.image('moon', 'assets/moon.png');
	}

	create() {
		//NOTE: Change to GameTitle if required
		this.game.state.start("Main");
	}

}

export default Preload;
