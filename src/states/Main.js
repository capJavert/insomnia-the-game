import ExampleObject from 'objects/ExampleObject';
import DayCycle from 'objects/DayCycle';
import Weather from 'objects/Weather';
import Player from 'objects/Player';
import Obstacle from 'objects/Obstacle';
import Dummy from 'objects/Dummy';

class Main extends Phaser.State {

	create() {
        this.game.progress = 0;

        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = -1;
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.gravity.y = 1500;

        //collision groups
        this.playerCollision = this.game.physics.p2.createCollisionGroup();
        this.obstaclesCollision = this.game.physics.p2.createCollisionGroup();
        this.worldCollision = this.game.physics.p2.createCollisionGroup();

        //collision with world bounds
        this.game.physics.p2.updateBoundsCollisionGroup();
 
        //create game world bitmap and color it
        let bgBitMap = this.game.add.bitmapData(this.game.width, this.game.height);
        bgBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
        bgBitMap.ctx.fillStyle = '#354a55';
        bgBitMap.ctx.fill();
        this.backgroundSprite = this.game.add.sprite(0, 0, bgBitMap);

        //create sun and moon 
        this.sunSprite = this.game.add.sprite(50, -250, 'sun');
        this.moonSprite = this.game.add.sprite(this.game.width - (this.game.width / 4), this.game.height + 500, 'moon');

        //create game backgrounds
        this.backgroundMid = this.game.add.tileSprite(0, 
            this.game.height - this.game.cache.getImage('background-mid').height, 
            this.game.width, 
            this.game.cache.getImage('background-mid').height, 
            'background-mid'
        );

        //create ground fog 
        this.backgroundBottom = this.game.add.tileSprite(0, 
            this.game.height - this.game.cache.getImage('background-bottom').height, 
            this.game.width, 
            this.game.cache.getImage('background-bottom').height, 
            'background-bottom'
        );

        //lvl objects
        this.game.lvlObjects = [
            new Obstacle(this.game, 'rock', 1000, 0, 1),
            new Obstacle(this.game, 'rock', 3600, 300, 1),
            new Obstacle(this.game, 'rock', 5000, 100, 1),
            new Obstacle(this.game, 'rock', 5400, 150, 1),
            new Obstacle(this.game, 'rock', 8000, 100, 1),
            new Obstacle(this.game, 'rock', 10000, 250, 1),
            new Obstacle(this.game, 'rock', 10400, 200, 1),
            new Obstacle(this.game, 'rock', 11200, 250, 1)
        ];

        //render lvl objects
        for (var i = 0; i < this.game.lvlObjects.length; i++) {
            this.game.lvlObjects[i].render(this.obstaclesCollision);
        }

        //create player
        //this.player = new Dummy(this.game, 150, this.game.height-95);
        this.player = new Player(this.game, 150, this.game.height-95);
        this.player.setCollisionGroup(this.playerCollision);
 
        //set collision rules for player
        this.player.collides([this.obstaclesCollision]);

        //init day night cycle
        this.dayCycle = new DayCycle(this.game, 5000);
        this.dayCycle.initMoon(this.moonSprite);

        //apply day night shading 
        this.dayCycle.initShading(backgroundSprites);
        let backgroundSprites = [
            {sprite: this.backgroundSprite, from: 0x1f2a27, to: 0xB2DDC8},
            {sprite: this.backgroundMid, from: 0x283632, to: 0x8BBCAC},
            {sprite: this.backgroundBottom, from: 0x283632, to: 0x8BBCAC}
        ];

        //weather effects
        this.weather = new Weather(this.game)
        this.weather.addRain();
	    this.weather.addFog();

        //enable movement
        this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
	    this.backgroundBottom.tilePosition.x -= 3;
        //this.physics.p2.collide(this.player.player, this.backgroundBottom);

        //check collision for every object #TODO remove from array if out of bounds
        for (var i = 0; i < this.game.lvlObjects.length; i++) {
            this.game.lvlObjects[i].collides([this.playerCollision]);
            this.game.lvlObjects[i].setContact(this.player.material);
            this.game.lvlObjects[i].update(this.player.getSpeed());
        }

        this.player.update(this.game, this.cursors, this.backgroundMid);
	}
}

export default Main;
