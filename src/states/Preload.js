class Preload extends Phaser.State {

	preload() {
		//sounds
		//this.game.load.image('myImage', 'assets/my-image.png');
		//this.game.load.audio('myAudio', 'assets/my-audio.wav');
		//this.game.load.atlas('myAtlas', 'assets/my-atlas.png', 'assets/my-atlas.json');
		//this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

		//character
		this.game.load.spritesheet('girl', 'assets/girl.png', 98, 165);
		this.game.load.spritesheet('hair', 'assets/hair.png', 161, 177);
		this.game.load.spritesheet('hair-moving', 'assets/hair-moving.png', 218, 177);
		this.game.load.spritesheet('hair-falling', 'assets/hair-falling.png', 101, 135);

		//for beta lvl should be loaded based on current lvl
    	this.game.load.image('background-mid', 'assets/lvl1/background-mid.png');
    	this.game.load.image('background-bottom', 'assets/lvl1/background-bottom.png');

    	//game objects
    	this.game.load.spritesheet('rock', 'assets/objects/rock.png', 456, 469);

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
