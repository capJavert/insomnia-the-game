import Fiend from 'objects/Fiend';
import Material from 'objects/Material';

class FlyingFiend extends Fiend {

	constructor(game, x, y, scale, collisionGroup){
		super(game, x, y, scale, collisionGroup);
		this.game = game;
		this.oType = 'FlyingFiend';
		this.x = x;
		this.y = y;
		this.scale = scale;
		this.visible = false;
		this.collisionGroup = collisionGroup;
		this.sounds = new Object();
	}

	render() {
		// load fiend
		this.sprite = this.game.add.sprite(this.x, this.y, 'flying-shadow');
		this.setScale(this.scale);

		//set defeault fiend states
		this.isForceHit = false;
		this.sprite.wasted = false;
		this.tween = null;
		this.attackDirection = null;
		this.speed = 570;
		this.attacking = false;
		this.sprite.playerHit = false;

		//define animation frames
		this.sprite.animations.add('idle', Phaser.Animation.generateFrameNames('flying-shadow-idle', 1, 3), 9, true);
		this.sprite.animations.add('left-atk', Phaser.Animation.generateFrameNames('flying-shadow-left-atk', 1, 1), 11, true);
		this.sprite.animations.add('right-atk', Phaser.Animation.generateFrameNames('flying-shadow-right-atk', 1, 1), 11, true);

		//enable physics on fiend
		this.game.physics.p2.enable(this.sprite, this.game.debugMode);
		this.sprite.oType = this.oType; //for check inside collision callback
		this.sprite.body.clearShapes();
		this.sprite.body.setCircle(100*this.scale);
		this.sprite.body.kinematic = true;
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.setCollisionGroup(this.collisionGroup);
		this.sprite.position.y = 0;

		this.sprite.position.y -= (this.sprite.height/2);
		this.visible = true;

		//set material
		this.material = new Material(this.game, 'flying-fiend', this.sprite.body);
		this.material.properties.relaxation = 10000;
		this.material.properties.friction = 1000;
		this.material.properties.restitution = 0;
		this.material.properties.stiffness = 10000;

		//set listener for when player interacts with this fiend
		this.sprite.body.onBeginContact.add(this.forceHit, this);

		//sounds
		this.sounds.idle = this.game.add.audio('flying-shadow-idle', 0.6, false);
		this.sounds.hit = this.game.add.audio('fiend-hit', 0.3, false);

		//start levitation
		this.levitationMove = 50;
		this.moveUp();
	}

	update(playerObject) {
		if(this.isOut()) {
			this.sounds.idle.stop();
			this.kill(true);
		}

		this.player = playerObject.player;

		if(!this.attacking) {
			this.sprite.body.velocity.x = 0;
		}

		if(playerObject.getSpeed()>0) {
			this.sprite.body.velocity.x = playerObject.getSpeed();
		} else if(playerObject.getSpeed()<0) {
			this.sprite.body.velocity.x = playerObject.getSpeed();
		} else {
			//player is not moving
		}

		//console.log(this.sprite.position.y);

		if(this.sprite.playerHit) {
			this.sounds.hit.play();
			this.sprite.playerHit = false;
			this.kill(true);
		}

		if(this.isFlyUp()) {
			this.sprite.body.velocity.y = 0;
			this.sounds.idle.stop();
			if(this.attackDirection == 'left') {
				this.sprite.body.moveLeft(this.speed*2.5);
			} else {
				this.sprite.body.moveRight(this.speed*2.5);
			}
		} else if(playerObject.player.position.x<this.sprite.position.x && (this.sprite.position.x-playerObject.player.position.x<500)) {
			if(!this.attacking) {
				this.sounds.idle.stop();
				this.sprite.animations.play('left-atk');
				this.attackDirection = 'left';
				this.attacking = true;
				this.sprite.body.velocity.y = 0;
				this.sprite.body.moveLeft(this.speed);
				this.sprite.body.moveDown(this.speed);
			}
		} else if(playerObject.player.position.x>this.sprite.position.x) {
			if(!this.attacking) {
				this.sounds.idle.stop();
				this.sprite.animations.play('right-atk');
				this.attackDirection = 'right';
				this.attacking = true;
				this.sprite.body.velocity.y = 0;
				this.sprite.body.moveLeft(this.speed);
				this.sprite.body.moveDown(this.speed);
			}
		} else {
			this.sprite.animations.play('idle');
		}
	}

	moveUp() {
		if(!this.attacking) {
			if(this.inView()) {
				this.sounds.idle.play();
			}
			this.sprite.body.moveUp(this.levitationMove);
		}

		this.game.time.events.add(Phaser.Timer.SECOND, this.moveDown, this);
	}

	moveDown() {
		if(!this.attacking) {
			if(this.inView()) {
				this.sounds.idle.play();
			}
			this.sprite.body.moveDown(this.levitationMove);
		}

		this.game.time.events.add(Phaser.Timer.SECOND, this.moveUp, this);
	}

	isFlyUp() {
		if(this.sprite.position.y-this.game.height>-this.sprite.height) {
			return true;
		} else {
			return false;
		}
	}
}

export default FlyingFiend;
