//import ExampleObject from 'objects/ExampleObject';
import DayCycle from 'objects/DayCycle';
import Weather from 'objects/Weather';
import Player from 'objects/Player';
import Rock from 'objects/Rock';
import Orb from 'objects/Orb';
import Fiend from 'objects/Fiend';
import FlyingFiend from 'objects/FlyingFiend';
import Bitmap from 'objects/Bitmap';
import Material from 'objects/Material';
import Dummy from 'objects/Dummy';

class Main extends Phaser.State {

	create() {
        //game progression variables
        this.game.health = 4;
        this.game.progress = 0;
        this.game.orbCount = 0;
        this.game.debugMode = false;

        //set up world and physics
        //left 500 offset for objects swap
        this.game.world.setBounds(-500, 0, this.game.width+500, this.game.height);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.0;
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.gravity.y = 1500;
        this.game.physics.p2.setPostBroadphaseCallback(this.handleContact, this);

        //set up camera and add offset
        this.game.cameraOffset = -500;
        this.game.camera.width = 0;

        //collision groups
        this.playerCollision = this.game.physics.p2.createCollisionGroup();
        this.obstaclesCollision = this.game.physics.p2.createCollisionGroup();
        this.interactionCollision = this.game.physics.p2.createCollisionGroup();
        this.fiendCollision = this.game.physics.p2.createCollisionGroup();
        this.worldCollision = this.game.physics.p2.createCollisionGroup();

        //collision with world bounds
        this.game.physics.p2.updateBoundsCollisionGroup();
 
        //create ground bitmap

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
            new Fiend(this.game, 1000, 100, 0.7, this.fiendCollision),
            new Orb(this.game, 3600, 300, 1, this.interactionCollision),
            new Rock(this.game, 5000, 100, 1, this.obstaclesCollision),
            new Rock(this.game, 5400, 150, 1, this.obstaclesCollision),
            new Rock(this.game, 8000, 100, 1, this.obstaclesCollision),
            new Rock(this.game, 10000, 250, 1, this.obstaclesCollision),
            new Rock(this.game, 10400, 200, 1, this.obstaclesCollision),
            new Rock(this.game, 11200, 250, 1, this.obstaclesCollision)
        ];

        //render lvl objects
        for (var i = 0; i < this.game.lvlObjects.length; i++) {
            this.game.lvlObjects[i].render();
        }

        //create player
        //this.player = new Dummy(this.game, 150, this.game.height-95);
        this.player = new Player(this.game, 150, this.game.height-95);
        this.player.setCollisionGroup(this.playerCollision);
 
        //set collision rules for player
        this.player.collides([this.obstaclesCollision, this.worldCollision, this.interactionCollision, this.fiendCollision], this.player.hitSprite);
        //this.player.collides([this.fiendCollision], this.player.hitFiend, this);
    
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

        this.game.camera.follow(this.backgroundMid);
	}

	update() {
        if(!this.game.health) {
            this.game.state.start("GameOver");
        }

        //paralax scroll ground fog
	    this.backgroundBottom.tilePosition.x -= 3;

        //check collision for every object
        for (var i = 0; i < this.game.lvlObjects.length; i++) {
            if(this.game.lvlObjects[i].isOut()) {
                this.game.lvlObjects[i].kill();
                this.game.lvlObjects.splice(i, 1);

            } else {
                this.game.lvlObjects[i].collides([this.playerCollision], this.game.lvlObjects[i].hitPlayer, this.onHit, this);
                this.game.lvlObjects[i].collides([this.obstaclesCollision, this.worldCollision], this.game.lvlObjects[i].hitSprite);
                this.game.lvlObjects[i].setContact(this.player.material);
                this.game.lvlObjects[i].update(this.player);
            }
        }

        //update player position
        this.player.update(this.game, this.cursors, this.backgroundMid);
	}

    handleContact(body1, body2) {
        if(body1.sprite.oType == 'Player') {
            var sprite = body2.sprite;
            var player = body1.sprite;
        } else {
            var sprite = body1.sprite;
            var player = body2.sprite;
        }

        switch(sprite.oType) {
            case 'Orb': 
                sprite.collect = true;

                return false; 
                break;
            case 'Fiend': 
                if(!player.damageBounce) {
                    console.log('collision');
                    player.damageBounce = true;
                    sprite.playerHit = true;
                }

                return false; 
                break;
            default:
                return true;
        }
    }
}

export default Main;
