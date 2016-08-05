import Particle from 'objects/Particle';

class ParticleEmitter {

	constructor(game, x, y, width, height, frequency, particleLifespan, particleQuantity, direction, orientationAxis){
		this.game = game;
		this.x = x;
		this.y = y;
		this.particleQuantity = particleQuantity;
		this.particleLifespan = particleLifespan;
		this.frequency = frequency;
		this.pause = true;
		this.width = width;
		this.height = height;
		this.direction = direction;
		this.particle = {
			width: 0,
			height: 0,
			color: '#ffffff',
		}

		if(orientationAxis=='x') {
			//for horizontal emitting TODO
		} else if(orientationAxis=='y') {
			this.xMargin = {
				min: this.x-this.width/2,
				max: this.x-this.width/2+this.width
			}
			this.yMargin = this.y;
			this.moveMargin = {
				min: this.y, 
				max: this.y+this.height
			}
		}

        this.particles = new Array(this.particleQuantity);     
	}

	createParticles(particleObject) {
		if(typeof particleObject != 'undefined') { 
			this.particle = particleObject;
		}

		for (var i = 0; i < this.particleQuantity; i++) {
			this.particles[i] = new Particle(
				this.game, 
				this.particle.width, 
				this.particle.height, 
				this.particle.color
			);
		};   
	}

	update() {
		if(!this.pause && this.game.ready) {
			for (var i = 0; i < this.particleQuantity; i++) {
				if(!this.particles[i].spawned) {
					this.particles[i].spawn(
						this.game.rnd.between(this.xMargin.min, this.xMargin.max),
						this.yMargin,
						this.particleLifespan,
						this.game.rnd.between(this.moveMargin.min, this.moveMargin.max)*this.direction,
					);
				} else {
					this.particles[i].update();
				}
			}
		}
	}

	start() {
		this.pause = false;
	}

	pause() {
		this.pause = true;
	}

	kill() {
		delete this;
	}
}

export default ParticleEmitter;