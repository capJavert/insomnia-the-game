import Sprite from 'objects/Sprite';
import Material from 'objects/Material';

class Orb extends Sprite {

	constructor(game, x, y, scale, collisionGroup){
		super(game, x, y, scale, collisionGroup);
		this.game = game;
		this.oType = 'Orb';
		this.x = x;
		this.y = this.game.height-y;
		this.scale = scale;
		this.visible = false;
		this.collisionGroup = collisionGroup;
		this.sounds = new Object();
	}

	render() {
		this.sprite = this.game.add.sprite(this.x, this.y, 'orb');
		this.sprite.position.y -= (this.sprite.height/2);
		this.setScale(this.scale);
		this.game.physics.p2.enable(this.sprite, this.game.debugMode);
		this.sprite.oType = this.oType; //for check inside collision callback
		this.sprite.collect = false;
		this.collected = false;
		this.sprite.body.clearShapes();
		this.sprite.body.setCircle(20);
	    this.sprite.body.kinematic = true;
        this.sprite.body.collideWorldBounds = true;
        //this.sprite.body.gravityScale = 0;
        this.sprite.body.setCollisionGroup(this.collisionGroup);

		this.visible = true;

		//set material params
		this.material = new Material(this.game, 'orb', this.sprite.body);

		//start levitation
		this.levitationMove = 10;
		this.moveUp();

		//sounds
		this.sounds.collect = this.game.add.audio('orb-collect', 0.15, false);
	}

	update(playerObject) {
		this.sprite.angle += 1;
		this.sprite.body.velocity.x = 0;
		this.player = playerObject;

		this.sprite.body.velocity.x = playerObject.getSpeed();

		if(this.sprite.collect && !this.collected) {
			this.sprite.body.clearShapes();
			this.kill();
	    	this.updateOrbs();	
		}
	}

    //check if object is out of camera view
    isOut() {
    	if(this.sprite.position.x+this.sprite.width/2<=0 || this.collected) {
    		return true;
    	} else {
    		return false;
    	}
    }

    //update current orb count in game
    //orbs restores health
    updateOrbs() {
    	this.sounds.collect.play();
    	this.collected = true;
    	this.game.orbCount++;
    	this.player.heal();
    	//console.log("Orbs", this.game.orbCount);
    }

	moveUp() {
		if(this.sprite.body!=null) {
			this.sprite.body.moveUp(this.levitationMove);

			this.game.time.events.add(Phaser.Timer.SECOND*0.5, this.moveDown, this);
		}
	}

	moveDown() {
		if(this.sprite.body!=null) {
			this.sprite.body.moveDown(this.levitationMove);
			
			this.game.time.events.add(Phaser.Timer.SECOND*0.5, this.moveUp, this);
		}
	}
}

export default Orb;