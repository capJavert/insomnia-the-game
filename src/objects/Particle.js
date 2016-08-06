class Particle {

	constructor(game, width, height, color, speed){
		this.game = game;
		this.width = width;
		this.height = height;
		this.color = color;
		this.speed = speed;
		this.spawned = false;
		this.particle = null;

		//create particle bitmap
		//used for particle sprite
        this.particleBitmap = this.game.add.bitmapData(this.width, this.height);
     
     	//fill it
        this.particleBitmap.ctx.rect(0, 0, this.width, this.height);
        this.particleBitmap.ctx.fillStyle = this.color;
        this.particleBitmap.ctx.fill();
	}

	update(playerObject) {
		if(this.spawned) {
			if(playerObject.getSpeed()>0) {
				this.particle.body.velocity.x = -400;
			} else if(playerObject.getSpeed()<0) {
				this.particle.body.velocity.x = 400;
			} else {
				//player is not moving
			}

			this.particle.body.velocity.y = this.velocity;
			this.particle.body.setZeroRotation();
		}
	}

	spawn(x, y, lifespan) {
		//spawn particle on position
		//enable physics
		//clear old sprite body
		if(this.particle!=null) {
	    	this.particle.body.clearShapes();
	    	this.particle.kill();
		}
		this.particle =  this.game.add.sprite(0, 0, this.particleBitmap);
		this.particle.position.x = x;
		this.particle.position.y = y;
		this.game.physics.p2.enable(this.particle, false);
		this.particle.body.kinematic = true;
		this.particle.oType = 'Particle';
	    this.particle.body.collideWorldBounds = true;
	    this.animate();
	
		//start lifespan timer
	    this.game.time.events.add(lifespan, this.kill, this);
	    this.spawned = true;
	}

	animate() {
		this.velocity = this.game.rnd.between(0, this.speed)
	}

    //unset spawned flag
    kill() {
    	this.velocity = 0;
    	this.spawned = false;
    	this.particle.visible = false;
    }
}

export default Particle;