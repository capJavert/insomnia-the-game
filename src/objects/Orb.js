import Sprite from 'objects/Sprite';
import Material from 'objects/Material';

class Orb extends Sprite {

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
		this.sprite = this.game.add.sprite(this.x, this.y, 'orb');
		this.setScale(this.scale);
		this.game.physics.p2.enable(this.sprite, this.game.debugMode);

		this.sprite.body.clearShapes();
		this.sprite.body.setCircle(20);
	    this.sprite.body.kinematic = true;
        this.sprite.body.collideWorldBounds = true;
        //this.sprite.body.gravityScale = 0;
        this.sprite.body.setCollisionGroup(this.collisionGroup);

		this.sprite.position.y -= (this.sprite.height/2);
		this.visible = true;

		//set material params
		this.material = new Material(this.game, 'orb', this.sprite.body);

		//set listener for when orb is collected
		this.sprite.body.onBeginContact.add(this.updateOrbs, this);
	}

	//function is called on player collision
    hitPlayer(body1, body2) {
    	body1.clearShapes();
    	body1.sprite.kill();
    	
    	return false;
    }

    //update current orb count in game
    updateOrbs() {
    	this.game.orbCount++;
    	console.log(this.game.orbCount);
    }
}

export default Orb;