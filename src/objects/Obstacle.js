class Obstacle {

	constructor(game, name, x, y, scale){
		this.game = game;
		this.spriteType = name;
		this.x = x;
		this.y = y+this.game.height;
		this.scale = scale;
		this.visible = false;
	}

	render() {
		this.sprite = this.game.add.sprite(this.x, this.y, 'rock');
		this.sprite.physics = this.game.physics.arcade;
		this.game.physics.enable(this.sprite);

		//this.sprite.body.setSize(456, 469);
	    this.sprite.body.immovable = true;
        this.sprite.body.collideWorldBounds = false;

		this.setScale(this.scale);
		//this.sprite.position.x += this.game.width;
		this.sprite.position.y -= this.sprite.height;
		this.visible = true;
	}

	setScale(scale) {
		this.sprite.scale.setTo(scale, scale);
	}

	update(speed) {
		this.sprite.body.velocity.x = 0;

		if(speed) {
			this.sprite.body.velocity.x = -400;
		}
		//this.sprite.position.x -= speed;
	}
}

export default Obstacle;