import Sprite from 'objects/Sprite';
import Material from 'objects/Material';

class Bitmap extends Sprite {

	constructor(game, name, x, y, width, height, scale, collisionGroup, kinematic){
		super(game, name, x, y, width, height, scale, collisionGroup, kinematic);
		this.game = game;
		this.oType = name;
		this.x = x;
		this.y = this.game.height-y;
		this.width = width;
		this.height = height;
		this.scale = scale;
		this.visible = false;
		this.kinematic = kinematic;
		this.collisionGroup = collisionGroup;
	}

	render() {
		//create bitmap data
		var sprite = this.game.add.bitmapData(this.width, this.height);

		//	Fill it
	    sprite.ctx.fillStyle = '#2a2f33';
	    sprite.ctx.fill();

		this.sprite = this.game.add.sprite(this.x, this.y, sprite);
		this.setScale(this.scale);
		this.game.physics.p2.enable(this.sprite, this.game.debugMode);
		this.sprite.oType = this.oType; //for check inside collision callback
	    this.sprite.body.kinematic = this.kinematic;
	    this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setCollisionGroup(this.collisionGroup);

		this.sprite.position.y -= (this.sprite.height/2);
		this.visible = true;

		//set material params
		this.material = new Material(this.game, this.oType, this.sprite.body);
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
	}
}

export default Bitmap;