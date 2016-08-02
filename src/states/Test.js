//import ExampleObject from 'objects/ExampleObject';
import DayCycle from 'objects/DayCycle';
import Weather from 'objects/Weather';
import Player from 'objects/Player';
import Rock from 'objects/Rock';
import Orb from 'objects/Orb';
import Fiend from 'objects/Fiend';
import FlyingFiend from 'objects/FlyingFiend';
import Trap from 'objects/Trap';
import Bitmap from 'objects/Bitmap';
import Material from 'objects/Material';
import Dummy from 'objects/Dummy';
import Helpers from 'includes/Helpers';

class Test extends Phaser.State {

	create() {
        //game progression variables
        this.game.health = 4;
        this.game.progress = 0;
        this.game.orbCount = 0;
        this.game.debugMode = true;
        this.game.ready = true;

        //set up world and physics
        //left 500 offset for objects swap
        this.game.world.setBounds(-500, 0, this.game.width+500, this.game.height);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.0;
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.gravity.y = 1500;
        this.game.physics.p2.setPostBroadphaseCallback(this.handleContact, this);

        //fullscreen if supported in browser and not in debug mode
        if(!this.game.debugMode) {
            this.game.scale.startFullScreen();
        }

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
        //new Fiend(this.game, 0, 0, 0.4, this.fiendCollision),
        //new FlyingFiend(this.game, 0, 0, 0.4, this.fiendCollision),
        //new Orb(this.game, 0, 0, 1, this.interactionCollision),
        //new Rock(this.game, , , 1, this.obstaclesCollision),
        //new Trap(this.game, , , 1, this.interactionCollision),
        this.game.lvlObjects = [
            new Trap(this.game, 500, 0, 1, this.interactionCollision),
            new Fiend(this.game, 1700, -30, 0.8, this.fiendCollision),
        ];

        //apply generators
        this.helpers = new Helpers();
        this.game.lvlObjects = this.helpers.linearOrbGenerator(this, this.game.lvlObjects, 4, 960, 120, 360);
        this.game.lvlObjects = this.helpers.linearOrbGenerator(this, this.game.lvlObjects, 7, 3160, 120, 360);
        this.game.lvlObjects = this.helpers.linearOrbGenerator(this, this.game.lvlObjects, 4, 6560, 120, 360);
        this.game.lvlObjects = this.helpers.linearOrbGenerator(this, this.game.lvlObjects, 6, 10300, 120, 360);
        this.game.lvlObjects = this.helpers.linearOrbGenerator(this, this.game.lvlObjects, 10, 21400, 120, 360);


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

        //lvl start message
        //background
        /*let mesageBitMap = this.game.add.bitmapData(this.game.width, this.game.height);
        mesageBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
        mesageBitMap.ctx.fillStyle = '#000000';
        mesageBitMap.ctx.fill();
        this.messageBackground = this.game.add.sprite(0, 0, mesageBitMap);

        //text
        this.text = this.game.add.text(
            this.game.width/2, this.game.height/2, 
            "... Beware of the Shadows swallowed by fog ..."
        );
        this.text.anchor.setTo(0.5);
        this.text.font = 'IM Fell DW Pica';
        this.text.fontWeight = 'normal';
        this.text.fontSize = 60;
        this.text.fill = '#FFFFFF'
        this.text.align = 'center';

        //time to hide message and start game
        this.game.time.events.add(Phaser.Timer.SECOND*4, this.clearStartMessage, this);*/

        //enable movement controls
        this.game.cursors = this.input.keyboard.createCursorKeys();

        //interactions controls
        this.game.cursors.interact = {
                a: this.input.keyboard.addKey(Phaser.Keyboard.A),
        };

        this.game.camera.follow(this.player.sprite);
	}

	update() {
        while(!this.game.ready) {
            return;
        }

        if(!this.game.health) {
            //this.game.state.start("GameOver");
            console.log('WASTED');
        }

        //paralax scroll ground fog
	    this.backgroundBottom.tilePosition.x -= 3;

        //check collision for every object
        for (var i = 0; i < this.game.lvlObjects.length; i++) {
            this.game.lvlObjects[i].collides([this.playerCollision], this.game.lvlObjects[i].hitPlayer, this.onHit, this);
            this.game.lvlObjects[i].collides([this.obstaclesCollision, this.worldCollision, this.interactionCollision], this.game.lvlObjects[i].hitSprite);
            this.game.lvlObjects[i].setContact(this.player.material);
            this.game.lvlObjects[i].update(this.player);
        }

        //update player position
        this.player.update(this.game, this.game.cursors, this.backgroundMid);
	}

    handleContact(body1, body2) {
        if(body1.sprite.oType == 'Player') {
            var sprite = body2.sprite;
            var player = body1.sprite;
        } else if(body2.sprite.oType == 'Player') {
            var sprite = body1.sprite;
            var player = body2.sprite;
        } else {
            var sprite = body1.sprite;
            var sprite2 = body2.sprite;
            var player = null;
        }

        switch(sprite.oType) {
            case 'Orb': 
                sprite.collect = true;

                return false; 
                break;
            case 'Fiend': 
                if(player!=null) {
                    if(!player.damageBounce) {
                        console.log('collision');
                        player.damageBounce = true;
                        sprite.playerHit = true;
                    }
                } else if(sprite2.oType == 'Trap') {
                    sprite.trapHit = true;
                }

                return false; 
                break;
            case 'FlyingFiend': 
                if(player!=null) {
                    if(!player.damageBounce) {
                        player.damageBounce = true;
                    }
                }

                return false; 
                break;
            case 'Trap': 
                if(this.game.cursors.interact.a.isDown) {
                    sprite.isFollowingPlayer = true;
                } else {
                    sprite.isFollowingPlayer = false;
                }

                return false; 
                break;
            default:
                return true;
        }
    }

    clearStartMessage() {
        this.game.ready = true;

        this.game.add.tween(this.text)
        .to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.startMessageTween = this.game.add.tween(this.messageBackground)
        .to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    
        this.startMessageTween.onComplete.add(this.startGame, this);
    }

    startGame() {
        this.messageBackground.kill();
        this.text.kill();
    }
}

export default Test;
