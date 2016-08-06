import Sprite from 'objects/Sprite';
import Material from 'objects/Material';

class Checkpoint extends Sprite {

	constructor(game, x, y, scale, collisionGroup){
		super(game, x, y, scale, collisionGroup);
		this.game = game;
		this.oType = 'Checkpoint';
		this.x = x;
		this.y = this.game.height-y;
		this.scale = scale;
		this.visible = false;
		this.collisionGroup = collisionGroup;
	}

	render() {
		//create bitmap data
		var sprite = this.game.add.bitmapData(1, this.game.height);

		this.sprite = this.game.add.sprite(this.x, this.y, sprite);
		this.sprite.position.y -= (this.sprite.height/2);
		this.setScale(this.scale);
		this.game.physics.p2.enable(this.sprite, this.game.debugMode);
		this.sprite.oType = this.oType; //for check inside collision callback
		if(this.kinematic) this.sprite.body.kinematic = false;
	    this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setCollisionGroup(this.collisionGroup);

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

export default Checkpoint;