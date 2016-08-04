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
import MenuButton from 'objects/MenuButton';

class Main extends Phaser.State {

    create() {
        //game progression variables
        this.game.health = 4;
        this.game.progress = 0;
        this.game.orbCount = 0;
        this.game.debugMode = false;
        this.game.ready = false;
        this.game.end = false;

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

        //lvl objects
        //new Fiend(this.game, 0, 0, 0.4, this.fiendCollision),
        //new FlyingFiend(this.game, 0, 0, 0.4, this.fiendCollision),
        //new Orb(this.game, 0, 0, 1, this.interactionCollision),
        //new Rock(this.game, , , 1, this.obstaclesCollision),
        //new Trap(this.game, , , 1, this.interactionCollision),
        this.game.lvlObjects = [
            new Rock(this.game, 2500, -50, 1, this.obstaclesCollision),
            new Rock(this.game, 2700, 100, 1, this.obstaclesCollision),
            new Rock(this.game, 5900, 0, 1, this.obstaclesCollision),
            new Rock(this.game, 6100, -40, 1, this.obstaclesCollision),

            new Rock(this.game, 6100, -40, 1, this.obstaclesCollision),
            new Rock(this.game, 6100, -40, 1, this.obstaclesCollision),

            new Rock(this.game, 8300, 20, 1, this.obstaclesCollision),
            new Rock(this.game, 8700, 120, 1, this.obstaclesCollision),
            new Rock(this.game, 9800, -50, 1, this.obstaclesCollision),
            new Rock(this.game, 10000, -70, 1, this.obstaclesCollision),

            new Rock(this.game, 12800, 0, 1, this.obstaclesCollision),
            new Orb(this.game, 12800, 320, 1, this.interactionCollision),
            new Rock(this.game, 13600, 0, 1, this.obstaclesCollision),
            new Orb(this.game, 13600, 320, 1, this.interactionCollision),
            new Rock(this.game, 14400, 0, 1, this.obstaclesCollision),
            new Orb(this.game, 14400, 320, 1, this.interactionCollision),

            new Rock(this.game, 15700, 100, 1, this.obstaclesCollision),
            new Rock(this.game, 16000, 300, 1, this.obstaclesCollision),
            new Rock(this.game, 16000, 100, 1, this.obstaclesCollision),
            new Fiend(this.game, 16500, -30, 0.8, this.fiendCollision),

            new Rock(this.game, 18000, -100, 1, this.obstaclesCollision),
            new Rock(this.game, 18400, -50, 1, this.obstaclesCollision),
            new Orb(this.game, 18400, 350, 1, this.interactionCollision),
            new Rock(this.game, 18700, -110, 1, this.obstaclesCollision),

            new Rock(this.game, 20500, 100, 1, this.obstaclesCollision),
            new Rock(this.game, 20700, 220, 1, this.obstaclesCollision),
            new FlyingFiend(this.game, 21300, 100, 0.4, this.fiendCollision),

            new FlyingFiend(this.game, 25000, 100, 0.4, this.fiendCollision),
            new FlyingFiend(this.game, 26000, 200, 0.4, this.fiendCollision),

            new Rock(this.game, 26200, -110, 1, this.obstaclesCollision),
            new Rock(this.game, 26500, -60, 1, this.obstaclesCollision),
            new Rock(this.game, 26700, -10, 1, this.obstaclesCollision),
            new Rock(this.game, 27000, 50, 1, this.obstaclesCollision),
            new Rock(this.game, 27300, 110, 1, this.obstaclesCollision),
            new Rock(this.game, 27600, 100, 1, this.obstaclesCollision),
            new Rock(this.game, 27600, 250, 1, this.obstaclesCollision),
            new Rock(this.game, 28000, 110, 1, this.obstaclesCollision),
            new Rock(this.game, 28000, 350, 1, this.obstaclesCollision),
            new Orb(this.game, 28500, 800, 1, this.interactionCollision),

            new Rock(this.game, 29900, 20, 1, this.interactionCollision),

            new Rock(this.game, 34500, 20, 1, this.interactionCollision),
            new Rock(this.game, 34800, 90, 1, this.interactionCollision),
            new FlyingFiend(this.game, 35200, 150, 0.7, this.fiendCollision),

            new Trap(this.game, 36700, 0, 1, this.interactionCollision),
            new Fiend(this.game, 39000, -30, 0.8, this.fiendCollision),

            new Rock(this.game, 42000, 100, 1, this.obstaclesCollision),
            new Rock(this.game, 42200, 220, 1, this.obstaclesCollision),
            new Rock(this.game, 42800, 100, 1, this.obstaclesCollision),
            new Rock(this.game, 4300, 100, 1, this.obstaclesCollision),
            new FlyingFiend(this.game, 43000, 100, 0.7, this.fiendCollision),

            new Trap(this.game, 43700, 0, 1, this.interactionCollision),
            new Fiend(this.game, 45000, -30, 0.8, this.fiendCollision),    
            new Fiend(this.game, 47000, -20, 0.7, this.fiendCollision),           
        ];

        //apply generators
        this.helpers = new Helpers();
        this.game.lvlObjects = this.helpers.linearOrbGenerator(this, this.game.lvlObjects, 4, 960, 70, 360);
        this.game.lvlObjects = this.helpers.linearOrbGenerator(this, this.game.lvlObjects, 3, 3160, 70, 360);
        this.game.lvlObjects = this.helpers.linearOrbGenerator(this, this.game.lvlObjects, 4, 6560, 70, 360);
        this.game.lvlObjects = this.helpers.linearOrbGenerator(this, this.game.lvlObjects, 6, 10300, 70, 360);
        this.game.lvlObjects = this.helpers.linearOrbGenerator(this, this.game.lvlObjects, 10, 21400, 70, 360);
        this.game.lvlObjects = this.helpers.linearRockGenerator(this, this.game.lvlObjects, 8, 30000, 70, 360);
        this.game.lvlObjects = this.helpers.linearOrbGenerator(this, this.game.lvlObjects, 3, 48000, 70, 360);

        //create player
        //this.player = new Dummy(this.game, 150, this.game.height-95);
        this.player = new Player(this.game, 150, this.game.height-95);
        this.player.setCollisionGroup(this.playerCollision);

        //set collision rules for player
        this.player.collides([this.obstaclesCollision, this.worldCollision, this.interactionCollision, this.fiendCollision], this.player.hitSprite);
    
        //create ground fog 
        this.backgroundBottom = this.game.add.tileSprite(0, 
            this.game.height - this.game.cache.getImage('background-bottom').height, 
            this.game.width, 
            this.game.cache.getImage('background-bottom').height, 
            'background-bottom'
        );

        //render lvl objects
        //set collision rules for game objects
        for (var i = 0; i < this.game.lvlObjects.length; i++) {
            this.game.lvlObjects[i].render();
            this.game.lvlObjects[i].collides([this.playerCollision], this.game.lvlObjects[i].hitPlayer, this.onHit, this);
            this.game.lvlObjects[i].collides([this.obstaclesCollision, this.worldCollision, this.interactionCollision], this.game.lvlObjects[i].hitSprite);
            this.game.lvlObjects[i].setContact(this.player.material);
        }

        //add endgame listener on last object in lvl array
        this.game.lvlObjects[this.game.lvlObjects.length-1].sprite.oType = 'EndGame';

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
        let mesageBitMap = this.game.add.bitmapData(this.game.width, this.game.height);
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
        this.game.time.events.add(Phaser.Timer.SECOND*4, this.clearStartMessage, this);

        //orb count display
        this.orbCountDisplay = new MenuButton(
            this.game, this.game.width-200, 60, "Orbs collected: "+this.game.orbCount, null, 
            {
                font: 'Arial',
                fontWeight: 'normal',
                fontSize: 28,
                fill: '#FFFFFF',
                align: 'right'
            }
        );

        //enable movement controls
        this.game.cursors = this.input.keyboard.createCursorKeys();

        //interactions controls
        this.game.cursors.interact = {
                a: this.input.keyboard.addKey(Phaser.Keyboard.A),
        };

        this.game.camera.follow(this.player.sprite);
    }

    update() {
        //update orb count display
        this.orbCountDisplay.text.setText("Orbs collected: "+this.game.orbCount);

        //check if game is finished
        if(this.game.end) {
            this.showLoadingMessage(this.gameEnd);

            return;
        }

        //check if player is dead
        if(!this.game.health) {
            this.showLoadingMessage(this.gameOver);

            return;
        }

        //paralax scroll ground fog
        this.backgroundBottom.tilePosition.x -= 3;

        //update every game object
        for (var i = 0; i < this.game.lvlObjects.length; i++) {
            this.game.lvlObjects[i].update(this.player);
        }

        while(!this.game.ready) {
            return;
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
            if(body1.sprite.oType == 'Trap') {
                var sprite = body2.sprite;
                var sprite2 = body1.sprite;
            } else {
                var sprite = body1.sprite;
                var sprite2 = body2.sprite;
            }
            var player = null;
        }

        switch(sprite.oType) {
            case 'EndGame': 
                this.game.end = true;

                return true; 
                break;
            case 'Orb': 
                sprite.collect = true;

                return false; 
                break;
            case 'Fiend': 
                if(player!=null) {
                    if(!player.damageBounce) {
                        player.damageBounce = true;
                        sprite.playerHit = true;
                    }
                } else if(sprite.oType == 'Trap' || sprite2.oType == 'Trap') {
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

    showLoadingMessage(action) {
        let endMessageBitMap = this.game.add.bitmapData(this.game.width, this.game.height);
        endMessageBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
        endMessageBitMap.ctx.fillStyle = '#000000';
        endMessageBitMap.ctx.fill();
        this.messageBackground = this.game.add.sprite(0, 0, endMessageBitMap);
        this.messageBackground.alpha = 0;

        //text
        this.text = this.game.add.text(
            this.game.width/2, this.game.height/2, 
            "... Reloading, please wait ..."
        );
        this.text.anchor.setTo(0.5);
        this.text.font = 'IM Fell DW Pica';
        this.text.fontWeight = 'normal';
        this.text.fontSize = 60;
        this.text.fill = '#FFFFFF'
        this.text.align = 'center';
        this.text.alpha = 0;

        this.game.add.tween(this.text)
        .to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.endMessageTween = this.game.add.tween(this.messageBackground)
        .to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);

        this.endMessageTween.onComplete.add(action, this);
    }

    startGame() {
        this.messageBackground.kill();
        this.text.kill();
    }

    gameOver() {
        this.game.state.clearCurrentState();
        this.game.state.start('GameOver', true, false);
    }

    gameEnd() {
        this.game.state.clearCurrentState();
        this.game.state.start('Menu', true, false);
    }
}

export default Main;
