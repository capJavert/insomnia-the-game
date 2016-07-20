class Obstacle {

	constructor(game, name, x, y, scale){
		this.game = game;
		this.spriteType = name;
		this.x = x;
		this.y = this.game.height;
		this.scale = scale;
		this.visible = false;
	}

	render(collisionGroup, playerMaterial) {
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
		this.material = this.game.physics.p2.createMaterial('rock', this.sprite.body);
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

	setContact(material) {
	    //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
	    //  those 2 materials collide it uses the following settings.
	    //  A single material can be used by as many different sprites as you like.
	    this.contactMaterial = this.game.physics.p2.createContactMaterial(this.material, material);

	    this.sprite.body.angularDamping = 1;
	    this.contactMaterial.friction = 1000;     // Friction to use in the contact of these two materials.
	    this.contactMaterial.restitution = 0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
	    this.contactMaterial.stiffness = 10000;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
	    this.contactMaterial.relaxation = 10000;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
	    this.contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
	    this.contactMaterial.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
	    this.contactMaterial.surfaceVelocity = 0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.

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