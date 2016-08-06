import Sprite from 'objects/Sprite';
import Material from 'objects/Material';

class Trap extends Sprite {

	constructor(game, x, y, scale, collisionGroup){
		super(game, x, y, scale, collisionGroup);
		this.game = game;
		this.oType = 'Trap';
		this.x = x;
		this.y = this.game.height-y;
		this.scale = scale;
		this.visible = false;
		this.collisionGroup = collisionGroup;
	}

	render() {
		this.sprite = this.game.add.sprite(this.x, this.y, 'ground-trap');
		this.sprite.position.y -= (this.sprite.height/2);
		this.setScale(this.scale);
		this.game.physics.p2.enable(this.sprite, this.game.debugMode);
		this.sprite.oType = this.oType; //for check inside collision callback
	    this.sprite.body.kinematic = false;
        this.sprite.body.collideWorldBounds = true;
        //this.sprite.body.gravityScale = 0;
        this.sprite.body.setCollisionGroup(this.collisionGroup);

		this.visible = true;
		this.sprite.isFollowingPlayer = false;

		//set material params
		this.material = new Material(this.game, 'ground-trap', this.sprite.body);
	}

	update(playerObject) {
		this.sprite.body.velocity.x = 0;

		if(!this.sprite.isFollowingPlayer) {
			this.sprite.body.velocity.x = playerObject.getSpeed();
		}

		if(this.inView()) {
			this.sprite.body.dynamic = true;
		} else {
			this.sprite.body.kinematic = true;
		}

		if(this.sprite.isFollowingPlayer) {
			this.followPlayer();
		}
	}

	followPlayer() {
		if(this.game.cursors.interact.a.isDown) {
			if (this.game.cursors.left.isDown && this.sprite.position.x>200) {
				this.sprite.body.moveLeft(400);
	        } else if (this.game.cursors.right.isDown && this.game.width/3>this.sprite.position.x-this.sprite.width/2) {
	            this.sprite.body.moveRight(400);
	        }
		} else {
			this.sprite.isFollowingPlayer = false;
		}
	}
}

export default Trap;