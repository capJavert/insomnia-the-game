import Sprite from 'objects/Sprite';
import Material from 'objects/Material';

class Rock extends Sprite {

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
		this.sprite = this.game.add.sprite(this.x, this.y, 'rock');
		this.setScale(this.scale);
		this.game.physics.p2.enable(this.sprite, this.game.debugMode);

		this.sprite.body.clearShapes();
		this.sprite.body.loadPolygon('rock-physics', 'rock');
	    this.sprite.body.kinematic = true;
        this.sprite.body.collideWorldBounds = true;
        //this.sprite.body.gravityScale = 0;
        this.sprite.body.setCollisionGroup(this.collisionGroup);

		this.sprite.position.y -= (this.sprite.height/2);
		this.visible = true;

		//set material params
		this.material = new Material(this.game, 'rock', this.sprite.body);
	}
}

export default Rock;