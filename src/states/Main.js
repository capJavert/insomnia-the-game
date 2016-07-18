import ExampleObject from 'objects/ExampleObject';
import DayCycle from 'objects/DayCycle';
import Weather from 'objects/Weather';
import Player from 'objects/Player';

class Main extends Phaser.State {

	create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#000';
 
        this.dayCycle = new DayCycle(this.game, 5000);
 
 
        let bgBitMap = this.game.add.bitmapData(this.game.width, this.game.height);
 
        bgBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
        bgBitMap.ctx.fillStyle = '#354a55';
        bgBitMap.ctx.fill();
 
        this.backgroundSprite = this.game.add.sprite(0, 0, bgBitMap);
 
        this.sunSprite = this.game.add.sprite(50, -250, 'sun');
        this.moonSprite = this.game.add.sprite(this.game.width - (this.game.width / 4), this.game.height + 500, 'moon');
 
        /*this.mountainsBack = this.game.add.tileSprite(0, 
            this.game.height - this.game.cache.getImage('mountains-back').height, 
            this.game.width, 
            this.game.cache.getImage('mountains-back').height, 
            'mountains-back'
        );*/
 
        this.backgroundMid = this.game.add.tileSprite(0, 
            this.game.height - this.game.cache.getImage('background-mid').height, 
            this.game.width, 
            this.game.cache.getImage('background-mid').height, 
            'background-mid'
        );

        this.player = new Player(this.game, 150, this.game.height);
 
        this.backgroundBottom = this.game.add.tileSprite(0, 
            this.game.height - this.game.cache.getImage('background-bottom').height, 
            this.game.width, 
            this.game.cache.getImage('background-bottom').height, 
            'background-bottom'
        );
 
        let backgroundSprites = [
            {sprite: this.backgroundSprite, from: 0x1f2a27, to: 0xB2DDC8},
            {sprite: this.backgroundMid, from: 0x283632, to: 0x8BBCAC},
            {sprite: this.backgroundBottom, from: 0x283632, to: 0x8BBCAC}
        ];
 
        this.dayCycle.initShading(backgroundSprites);
        this.dayCycle.initMoon(this.moonSprite);
        //is.dayCycle.initSun(this.sunSprite);

        //weather
        this.weather = new Weather(this.game)
        this.weather.addRain();
		//this.weather.removeRain();
	    this.weather.addFog();
		//this.weather.removeFog();

        this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
	    this.backgroundMid.tilePosition.x -= 0.3;
	    this.backgroundBottom.tilePosition.x -= 0.75;

        this.physics.arcade.collide(this.player, this.backgroundBottom);
        this.player.update(this.cursors);
	}

}

export default Main;
