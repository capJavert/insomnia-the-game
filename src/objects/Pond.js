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
		var sprite = this.game.add.bitmapData(250, 540);

		//	Fill it
	    sprite.ctx.fillStyle = '#2a2f33';
	    sprite.ctx.fill();

		this.sprite = this.game.add.sprite(this.x, this.y, sprite);
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
        this.emitter = new ParticleEmitter(this.game, this.x, this.y, 250, 540, 500, 1500, 10, 10);
        this.emitter.particle.color = '#9cc9de';
        this.emitter.particle.width = 8;
        this.emitter.particle.height = 30;
        this.emitter.particle.speed = 1500;
        this.emitter.createParticles();

     	//start emitter
        this.emitter.start();
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

		this.emitter.update();
		//this.updateEmitterPosition();
	}

	updateEmitterPosition() {
		this.emitter.x = this.sprite.position.x;
		this.emitter.y = this.sprite.position.y;
	}
}

export default Pond;