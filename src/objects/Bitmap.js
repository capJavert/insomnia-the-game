import Sprite from 'objects/Sprite';
import Material from 'objects/Material';

class Bitmap extends Sprite {

	constructor(game, name, x, y, width, height, scale, kinematic){
		super(game, name, x, y, width, height, scale, kinematic);
		this.game = game;
		this.spriteType = name;
		this.x = x;
		this.y = this.game.height-height/2;
		this.width = width;
		this.height = height;
		this.scale = scale;
		this.visible = false;
		this.kinematic = kinematic;
	}

	render(collisionGroup) {
		//create bitmap data
		var sprite = this.game.add.bitmapData(this.width, this.height);

		//	Fill it
	    sprite.ctx.fillStyle = '#2a2f33';
	    sprite.ctx.fill();

		this.sprite = this.game.add.sprite(this.x, this.y, sprite);

		this.setScale(this.scale);
		this.game.physics.p2.enable(this.sprite, true);

	    this.sprite.body.kinematic = this.kinematic;
	    this.sprite.body.collideWorldBounds = true;

        this.sprite.body.setCollisionGroup(collisionGroup);

		this.sprite.position.y -= this.sprite.height;
		this.visible = true;

		//set material params
		this.material = new Material(this.game, this.spriteType, this.sprite.body);
	}

	update(speed) {
		this.sprite.body.setZeroVelocity();
		this.sprite.body.velocity.y = 10000;

		if(speed) {
			this.sprite.body.velocity.x = -400;
		}
	}
}

export default Bitmap;