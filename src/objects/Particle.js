class Particle {

	constructor(game, width, height, color, speed){
		this.game = game;
		this.width = width;
		this.height = height;
		this.color = color;
		this.speed = speed;
		this.spawned = false;

		//create particle
        let particle = this.game.add.bitmapData(this.width, this.height);
     
     	//fill it
        particle.ctx.rect(0, 0, this.width, this.height);
        particle.ctx.fillStyle = this.color;
        particle.ctx.fill();

        this.particle =  this.game.add.sprite(0, 0, particle);  
	}

	spawn(x, y, lifespan, move) {
		//spawn particle on position
		//enable physics
		this.particle.position.x = x;
		this.particle.position.y = y;
		this.game.physics.p2.enable(this.particle, false);
		this.particle.oType = 'Particle';
	    this.particle.body.collideWorldBounds = true;
	    this.animate(move);
	
		//start lifespan timer
	    this.game.time.events.add(lifespan, this.kill, this);
	    this.spawned = true;
	}

	animate(move) {
        this.tween = this.game.add.tween(this.particle)
        .to( { x: move }, this.speed, Phaser.Easing.Linear.None, true, 0, -1, true);	
	}

    //unset spawned flag
    kill() {
    	this.spawned = false;
    	this.particle.visible = false;
    }
}

export default Particle;