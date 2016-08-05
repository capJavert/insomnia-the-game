class Particle {

	constructor(game, width, height, color){
		this.game = game;
		this.width = width;
		this.height = height;
		this.color = color;
		this.spawned = false;

		//create particle bitmap
		//used for particle sprite
        this.particleBitmap = this.game.add.bitmapData(this.width, this.height);
     
     	//fill it
        this.particleBitmap.ctx.rect(0, 0, this.width, this.height);
        this.particleBitmap.ctx.fillStyle = this.color;
        this.particleBitmap.ctx.fill();
	}

	update() {
		if(this.spawned) {
			this.particle.body.velocity.y = this.velocity;
			this.particle.body.setZeroRotation();
		}
	}

	spawn(x, y, lifespan, move) {
		//spawn particle on position
		//enable physics
        this.particle =  this.game.add.sprite(0, 0, this.particleBitmap);  
		this.particle.position.x = x;
		this.particle.position.y = y;
		this.game.physics.p2.enable(this.particle, false);
		this.particle.body.kinematic = true;
		this.particle.oType = 'Particle';
	    this.particle.body.collideWorldBounds = true;
	    this.animate(move);
	
		//start lifespan timer
	    this.game.time.events.add(lifespan, this.kill, this);
	    this.spawned = true;
	}

	animate(move) {
		this.velocity = move;
	}

    //unset spawned flag
    kill() {
    	this.velocity = 0;
    	this.spawned = false;
    	this.particle.visible = false;
    }
}

export default Particle;