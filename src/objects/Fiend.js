import Sprite from 'objects/Sprite';
import Material from 'objects/Material';

class Fiend extends Sprite {

	constructor(game, x, y, scale, collisionGroup){
		super(game, x, y, scale, collisionGroup);
		this.game = game;
		this.oType = 'Fiend';
		this.x = x;
		this.y = this.game.height-y;
		this.scale = scale;
		this.visible = false;
		this.collisionGroup = collisionGroup;
		this.sounds = new Object();
	}

	render() {
      	//load fiend
        this.sprite = this.game.add.sprite(this.x, this.y, 'shadow-hand');
        this.sprite.position.y -= (this.sprite.height/2);
        this.setScale(this.scale);

		//set defeault fiend states
		this.isForceHit = false;
		this.sprite.playerHit = false;
		this.sprite.trapHit = false;

        //define animation frames
        this.sprite.animations.add('idle', Phaser.Animation.generateFrameNames('shadow-hand-idle', 1, 9), 6, true);
        this.sprite.animations.add('high-lurk', Phaser.Animation.generateFrameNames('shadow-hand-high-atk', 1, 1), 1, true);
        this.sprite.animations.add('high-atk', Phaser.Animation.generateFrameNames('shadow-hand-high-atk', 1, 3), 10, true);
        this.sprite.animations.add('low-lurk', Phaser.Animation.generateFrameNames('shadow-hand-low-atk', 1, 1), 1, true);
        this.sprite.animations.add('low-atk', Phaser.Animation.generateFrameNames('shadow-hand-low-atk', 1, 2), 10, true);

        //enable physics on fiend
        this.game.physics.p2.enable(this.sprite, this.game.debugMode);
        this.sprite.oType = this.oType; //for check inside collision callback
		this.sprite.body.clearShapes();
		this.sprite.body.setCircle(160*this.scale);
	    this.sprite.body.kinematic = true;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setCollisionGroup(this.collisionGroup);
        this.sprite.position.y = 0;

		this.visible = true;

        //set material
        this.material = new Material(this.game, 'fiend', this.sprite.body);
        this.material.properties.relaxation = 10000; 
        this.material.properties.friction = 1000;    
        this.material.properties.restitution = 0;
        this.material.properties.stiffness = 10000; 

		//set listener for when player interacts with this fiend
		this.sprite.body.onBeginContact.add(this.forceHit, this);

		//sounds
		this.sounds.hit = this.game.add.audio('fiend-hit', 0.3, false);
	}

	update(playerObject) {
		//console.log(this.sprite.animations.frameName);

		this.player = playerObject.player;
		this.sprite.body.velocity.x = 0;

		this.sprite.body.velocity.x = playerObject.getSpeed();

		if(!this.sprite.playerHit && !this.sprite.trapHit) {
			if(playerObject.player.jumping) {
				this.sprite.animations.play('high-lurk');
			} else if(playerObject.player.position.x+600>this.sprite.position.x) {
				this.sprite.animations.play('low-lurk');
			} else {
				this.sprite.animations.play('idle');
			}
		} else if(this.sprite.trapHit) {
			this.sprite.animations.stop();
			this.sprite.animations.frameName = 'shadow-hand-low-atk2';
			this.sprite.body.clearShapes();

			this.kill(true);
		} else {
			this.forceHit();
		}
	}

	//function is called on player collision
    hitPlayer(body1, body2) {
    	return true;
    }

    //force fiend to hit when player collides with this.sprite
    forceHit() {
    	if(!this.isForceHit) {
    		this.sounds.hit.play();
	    	this.isForceHit = true;

	    	if(this.player.jumping) {
	    		this.sprite.animations.play('high-atk');
	    		this.sprite.animations.stop();
	    		this.sprite.animations.frameName = 'shadow-hand-high-atk3';
	    	} else {
	    		this.sprite.animations.play('low-atk');
	    		this.sprite.animations.stop();
	    		this.sprite.animations.frameName = 'shadow-hand-low-atk2';
	    	}

	    	this.game.time.events.add(Phaser.Timer.SECOND, this.resetForceHit, this);
    	}
    }

    resetForceHit() {
    	this.sprite.playerHit = false;
    	this.isForceHit = false;
    }
}

export default Fiend;