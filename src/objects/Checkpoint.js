import Sprite from 'objects/Sprite';
import Material from 'objects/Material';
import MenuButton from 'objects/MenuButton';

class Checkpoint extends Sprite {

	constructor(game, x, y, scale, collisionGroup, hint){
		super(game, x, y, scale, collisionGroup);
		this.game = game;
		this.oType = 'Checkpoint';
		this.x = x;
		this.y = this.game.height-y;
		this.scale = scale;
		this.visible = false;
		this.collisionGroup = collisionGroup;

		if(typeof hint == 'undefined') { 
			this.hint = false; 
		} else {
			this.hint = hint;
		}
	}

	render() {
		//create bitmap data
		var sprite = this.game.add.bitmapData(10, this.game.height);

		this.sprite = this.game.add.sprite(this.x, this.y, sprite);
		this.sprite.position.y -= (this.sprite.height/2);
		this.setScale(this.scale);
		this.game.physics.p2.enable(this.sprite, this.game.debugMode);
		this.sprite.oType = this.oType; //for check inside collision callback
		this.sprite.body.kinematic = true;
	    this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setCollisionGroup(this.collisionGroup);

		//set defeault checkpoint states
		this.sprite.showHint = false;
		if(this.hint) {
	        this.hintDisplay = new MenuButton(
	            this.game, 0, this.y-300, this.hint, null, 
	            {
	                font: 'Arial',
	                fontWeight: 'normal',
	                fontSize: 28,
	                fill: '#FFFFFF',
	                align: 'center',
	            }
	        );
	        this.hintDisplay.text.anchor.set(0.5);
	        this.hintDisplay.text.visible = false;
		}

		//set material params
		this.material = new Material(this.game, this.oType, this.sprite.body);
	}

	update(playerObject) {
		if(this.sprite.showHint && this.hint) {
			this.sprite.showHint = false;
			this.hintDisplay.text.x = playerObject.player.x;
			this.hintDisplay.text.visible = true;

	        this.game.time.events.add(Phaser.Timer.SECOND*5, this.removeHint, this);
		}

		this.sprite.body.velocity.x = 0;

		this.sprite.body.velocity.x = playerObject.getSpeed();
	}

	removeHint() {
		this.hintDisplay.text.visible = false;
	}
}

export default Checkpoint;