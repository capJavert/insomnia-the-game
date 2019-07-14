import Particle from 'objects/Particle';

class ParticleEmitter {

	constructor(game, sprite, width, height, frequency, particleLifespan, particleQuantity, direction, orientationAxis){
		this.game = game;
		this.sprite = sprite;
		this.x = this.sprite.x;
		this.y = this.sprite.y;
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
			speed: 0
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
				min: this.y+10,
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
				this.particle.color,
				this.particle.speed*this.direction
			);
		};
	}

	update(playerObject, spritePosition) {
		this.xMargin = {
			min: spritePosition-this.width/2,
			max: spritePosition-this.width/2+this.width
		}

		if(!this.pause && this.game.ready) {
			for (var i = 0; i < this.particleQuantity; i++) {
				if(!this.particles[i].spawned) {
					this.particles[i].spawn(
						this.game.rnd.between(this.xMargin.min, this.xMargin.max),
						this.yMargin,
						this.particleLifespan,
					);
				} else {
					this.particles[i].update(playerObject);
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
