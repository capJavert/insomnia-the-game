import Material from 'objects/Material';

class Obstacle {

	constructor(game, name, x, y, scale){
		this.game = game;
		this.spriteType = name;
		this.x = x;
		this.y = this.game.height;
		this.scale = scale;
		this.visible = false;
	}

	render(collisionGroup) {
		this.sprite = this.game.add.sprite(this.x, this.y, 'rock');
		this.setScale(this.scale);
		this.game.physics.p2.enable(this.sprite, true);

		this.sprite.body.clearShapes();
		this.sprite.body.loadPolygon("rock-physics", "rock");
	    this.sprite.body.kinematic = true;
        this.sprite.body.collideWorldBounds = true;
        //this.sprite.body.gravityScale = 0;
        this.sprite.body.setCollisionGroup(collisionGroup);

		this.sprite.position.y -= this.sprite.height;
		this.visible = true;

		//set material params
		this.material = new Material(this.game, 'rock', this.sprite.body);

		this.sprite.outOfBoundsKill = true;
	}

	hide() {
		this.sprite.visible = false;
	}

	//rescale obstacle TODO polygons not rescaled
	setScale(scale) {
		this.sprite.scale.setTo(scale, scale);
	}

	update(speed) {
		this.sprite.body.velocity.x = 0;

		if(speed) {
			this.sprite.body.velocity.x = -400;
		}
	}

	//create contact rules for obstacle and other materials
	setContact(material) {
		this.material.setProperties(material.properties);
	}

    //set collision group for sprite
    setCollisionGroup(group) {
        this.sprite.body.setCollisionGroup(group);
    }

    //set collision rules for sprite
    collides(groups) {
        this.sprite.body.collides(groups);
    }

    //performance issues!
	/*resizePolygon(originalPhysicsKey, newPhysicsKey, shapeKey, scale) {
		var newData = [];
		var data = this.game.cache.getPhysicsData(originalPhysicsKey, shapeKey);

		for (var i = 0; i < data.length; i++) {
			var vertices = [];

			for (var j = 0; j < data[i].shape.length; j += 2) {
				vertices[j] = data[i].shape[j] * scale;
				vertices[j+1] = data[i].shape[j+1] * scale; 
			}

			newData.push({shape : vertices});
		}

		var item = {};
		item[shapeKey] = newData;
		this.game.load.physics(newPhysicsKey, '', item);
		//debugPolygon(newPhysicsKey, shapeKey);
	}*/
}

export default Obstacle;