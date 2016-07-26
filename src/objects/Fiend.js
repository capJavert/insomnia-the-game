import Sprite from 'objects/Sprite';
import Material from 'objects/Material';

class Fiend extends Sprite {

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
      	//load fiend
        this.sprite = this.game.add.sprite(this.x, this.y, 'shadow-hand');

        //define animation frames
        this.sprite.animations.add('idle', Phaser.Animation.generateFrameNames('shadow-hand-idle', 1, 3), 2, true);
        this.sprite.animations.add('high-atk', Phaser.Animation.generateFrameNames('shadow-hand-high-atk', 1, 2), 1, true);
        this.sprite.animations.add('low-atk', Phaser.Animation.generateFrameNames('shadow-hand-low-atk', 1, 2), 11, true);

        //enable physics on fiend
        this.game.physics.p2.enable(this.sprite, this.game.debugMode);
	    this.sprite.body.kinematic = true;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setCollisionGroup(this.collisionGroup);
        this.sprite.position.y = 0;

		this.sprite.position.y -= (this.sprite.height/2);
		this.visible = true;

        //set material
        this.material = new Material(this.game, 'fiend', this.sprite.body);
        this.material.properties.relaxation = 10000; 
        this.material.properties.friction = 1000;    
        this.material.properties.restitution = 0;
        this.material.properties.stiffness = 10000; 
	}

	update(player) {
		if(player.player.jumping) {
			this.sprite.animations.play('high-atk');
		} else {
			this.sprite.animations.play('idle');
		}
	}
}

export default Fiend;