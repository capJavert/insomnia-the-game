import Obstacle from 'objects/Obstacle';
import Material from 'objects/Material';

class Seesaw extends Obstacle {

	constructor(game, name, x, y, scale){
		super(game, name, x, y, scale);
		this.game = game;
		this.spriteType = name;
		this.x = x;
		this.y = this.game.height;
		this.scale = scale;
		this.visible = false;
	}

	render(collisionGroup) {
		//create bitmap data
		var plank = this.game.add.bitmapData(400, 50);
		var base = this.game.add.bitmapData(64, 100);

		//	Fill it
	    plank.ctx.fillStyle = '#2a2f33';
	    plank.ctx.fill();
	    base.ctx.fillStyle = '#2a2f33';
	    base.ctx.fill();

		this.sprite = this.game.add.sprite(this.x, this.y, base);
		this.plank = this.game.add.sprite(this.x, this.y, plank);

		this.setScale(this.scale);
		this.game.physics.p2.enable(this.sprite, true);

	    this.sprite.body.kinematic = true;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setCollisionGroup(collisionGroup);

		this.sprite.position.y -= this.sprite.height;
		this.visible = true;

		//create collision group for plank
		this.plankCollision = this.game.physics.p2.createCollisionGroup();
		this.plank.body.setCollisionGroup(this.plankCollision);
		this.plank.body.collides(collisionGroup);

		//set material params
		this.material = new Material(this.game, this.spriteType, this.sprite.body);
	}

	update(speed) {
		this.sprite.body.velocity.x = 0;

		if(speed) {
			this.sprite.body.velocity.x = -400;
		}
	}
}

export default Seesaw;