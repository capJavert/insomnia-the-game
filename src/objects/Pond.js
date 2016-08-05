import Bitmap from 'objects/Bitmap';
import Material from 'objects/Material';
import ParticleEmitter from 'objects/ParticleEmitter';

class Pond extends Bitmap {

	constructor(game, x, y, gravityScale, collisionGroup){
		super(game, x, y, gravityScale);
		this.game = game;
		this.oType = 'Pond';
		this.x = x;
		this.y = this.game.height-y;
		this.gravityScale = gravityScale;
		this.collisionGroup = collisionGroup;
		this.visible = false;
	}

	render() {
		//create bitmap data
		this.sprite = this.game.add.sprite(this.x, this.y, 'pond');
		this.sprite.position.y -= (this.sprite.height/2);
		this.game.physics.p2.enable(this.sprite, this.game.debugMode);
		this.sprite.body.kinematic = true;
		this.sprite.oType = this.oType; //for check inside collision callback
	    this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setCollisionGroup(this.collisionGroup);

		this.visible = true;

		//set material params
		this.material = new Material(this.game, 'pond', this.sprite.body);

     	//set emitter
        this.emitter = new ParticleEmitter(this.game, this, 200, 400, 500, 200, 10, -1, 'y');
        this.emitter.particle.color = '#9cc9de';
        this.emitter.particle.width = 5;
        this.emitter.particle.height = 10;
        this.emitter.particle.speed = 2000;
        this.emitter.createParticles();

     	//start emitter
        this.emitter.start();

        //add glowing effect
        this.sprite.alpha = 1;
        this.tween = this.game.add.tween(this.sprite)
        .to( { alpha: 0.8 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
	}

	update(playerObject) {
		this.sprite.body.velocity.x = 0;

		if(playerObject.getSpeed()>0) {
			this.sprite.body.velocity.x = -400;
		} else if(playerObject.getSpeed()<0) {
			this.sprite.body.velocity.x = 400;
		} else {
			//player is not moving
		}

		this.emitter.update(playerObject, this.sprite.position.x);
		//this.updateEmitterPosition();
	}

	updateEmitterPosition() {
		this.emitter.x = this.sprite.position.x;
		this.emitter.y = this.sprite.position.y;
	}
}

export default Pond;