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
	}

	render() {
      	//load fiend
        this.sprite = this.game.add.sprite(this.x, this.y, 'flying-shadow');
        this.setScale(this.scale);

		//set defeault fiend states
		this.isForceHit = false;
		this.sprite.playerHit = false;
		this.tween = null;

        //define animation frames
        this.sprite.animations.add('idle', Phaser.Animation.generateFrameNames('flying-shadow-idle', 1, 3), 9, true);
        this.sprite.animations.add('left-atk', Phaser.Animation.generateFrameNames('flying-shadow-left-atk', 1, 1), 11, true);
        this.sprite.animations.add('right-atk', Phaser.Animation.generateFrameNames('flying-shadow-right-atk', 1, 1), 11, true);

        //enable physics on fiend
        this.game.physics.p2.enable(this.sprite, this.game.debugMode);
        this.sprite.oType = this.oType; //for check inside collision callback
		this.sprite.body.clearShapes();
		this.sprite.body.setCircle(240*this.scale);
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

		//start levitation
		this.levitationMove = 50;
		this.moveUp();
	}

	update(playerObject) {
		//console.log(this.sprite.animations.frameName);

		this.player = playerObject.player;
		this.sprite.body.velocity.x = 0;

		if(playerObject.getSpeed()) {
			this.sprite.body.velocity.x = -400;
		}

		if(!this.sprite.playerHit) {
			this.sprite.animations.play('idle');
		} else {
			this.forceHit();
		}
	}

	moveUp() {
		this.sprite.body.moveUp(this.levitationMove);

		this.game.time.events.add(Phaser.Timer.SECOND, this.moveDown, this);
	}

	moveDown() {
		this.sprite.body.moveDown(this.levitationMove);

		this.game.time.events.add(Phaser.Timer.SECOND, this.moveUp, this);
	}
}

export default FlyingFiend;