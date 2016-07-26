import Sprite from 'objects/Sprite';
import Material from 'objects/Material';

class Fiend extends Sprite {

	constructor(game, x, y, scale, collisionGroup){
		super(game, x, y, scale, collisionGroup);
		this.game = game;
		this.x = x;
		this.y = this.game.height-y;
		this.scale = scale;
		this.visible = false;
		this.collisionGroup = collisionGroup;
	}

	render() {
		//set defeault fiend states
		this.isForceHit = false;

      	//load fiend
        this.sprite = this.game.add.sprite(this.x, this.y, 'shadow-hand');

        //define animation frames
        this.sprite.animations.add('idle', Phaser.Animation.generateFrameNames('shadow-hand-idle', 1, 3), 2, true);
        this.sprite.animations.add('high-atk', Phaser.Animation.generateFrameNames('shadow-hand-high-atk', 1, 2), 1, true);
        this.sprite.animations.add('low-atk', Phaser.Animation.generateFrameNames('shadow-hand-low-atk', 1, 2), 1, true);

        //enable physics on fiend
        this.game.physics.p2.enable(this.sprite, this.game.debugMode);
		this.sprite.body.clearShapes();
		this.sprite.body.setCircle(150);
	    this.sprite.body.kinematic = true;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setCollisionGroup(this.collisionGroup);
        this.sprite.position.y = 0;

		this.sprite.position.y -= (this.sprite.height/2);
		this.visible = true;

        //set material
        this.material = new Material(this.game, 'fiend', this.sprite.body);
        this.material.properties.relaxation = 10000; 
        this.material.properties.friction = 1000;    
        this.material.properties.restitution = 0;
        this.material.properties.stiffness = 10000; 

		//set listener for when player interacts with this fiend
		this.sprite.body.onBeginContact.add(this.forceHit, this);
	}

	update(playerObject) {
		//console.log(this.sprite.animations.frameName);

		this.player = playerObject.player;
		this.sprite.body.velocity.x = 0;

		if(playerObject.getSpeed()) {
			this.sprite.body.velocity.x = -400;
		}

		if(!this.isForceHit) {
			if(playerObject.player.jumping) {
				this.sprite.animations.play('high-atk');
			} else if(playerObject.player.position.x+350>this.sprite.position.x) {
				this.sprite.animations.play('low-atk');
			} else {
				this.sprite.animations.play('idle');
			}
		}
	}

	//function is called on player collision
    hitPlayer(body1, body2) {
    	return true;
    }

    //force fiend to hit when player collides with this.sprite
    forceHit() {
    	if(!this.isForceHit) {
	    	this.isForceHit = true;
	    	this.sprite.animations.stop();

	    	if(this.player.jumping || this.player.position.y>10) {
	    		this.sprite.animations.frameName = 'shadow-hand-high-atk2';
	    	} else {
	    		this.sprite.animations.frameName = 'shadow-hand-low-atk2';
	    	}

	    	this.game.time.events.add(Phaser.Timer.SECOND, this.resetForceHit, this);
    	}
    }

    resetForceHit() {
    	this.isForceHit = false;
    }
}

export default Fiend;