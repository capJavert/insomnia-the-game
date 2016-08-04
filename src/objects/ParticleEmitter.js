import Particle from 'objects/Particle';

class ParticleEmitter {

	constructor(game, x, y, width, height, frequency, particleLifespan, particleQuantity, maxParticleSpawn){
		this.game = game;
		this.x = x;
		this.y = y;
		this.particleQuantity = particleQuantity;
		this.particleLifespan = particleLifespan;
		this.frequency = frequency;
		this.pause = true;
		this.width = width;
		this.height = height;
		this.maxParticleSpawn = maxParticleSpawn;
		this.particle = {
			width: 0,
			height: 0,
			color: '#ffffff',
			speed: 0
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
				this.particle.speed
			);
		};   
	}

	update() {
		if(!this.pause) {
			var spawnedNum = 0;

			for (var i = 0; i < this.particleQuantity && spawnedNum<this.maxParticleSpawn; i++) {
				if(!this.particles[i].spawned) {
					this.particles[i].spawn(
						this.game.rnd.between(this.x, this.width),
						this.game.rnd.between(this.y, this.height),
						this.particleLifespan,
						this.game.rnd.between(this.y, this.height)
					);
					spawnedNum++;
				}
			};
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