class Preload extends Phaser.State {

	preload() {
		/* Preload required assets */
		//this.game.load.image('myImage', 'assets/my-image.png');
		//this.game.load.audio('myAudio', 'assets/my-audio.wav');
		//this.game.load.atlas('myAtlas', 'assets/my-atlas.png', 'assets/my-atlas.json');
		//this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		this.game.load.spritesheet('girl', 'assets/girl.png', 98, 165);
		this.game.load.spritesheet('hair', 'assets/hair.png', 161, 177);
		this.game.load.spritesheet('hair-moving', 'assets/hair-moving.png', 218, 177);
    	this.game.load.image('background-mid', 'assets/lvl1/background-mid.png');
    	this.game.load.image('background-bottom', 'assets/lvl1/background-bottom.png');
    	this.game.load.image('sun', 'assets/sun.png');
        this.game.load.image('moon', 'assets/moon.png');
	}

	create() {
		//NOTE: Change to GameTitle if required
		this.game.state.start("Main");
	}

}

export default Preload;
