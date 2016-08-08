class Sprite {

	constructor(game, x, y, scale, collisionGroup){
		this.game = game;
		this.x = x;
		this.y = this.game.height-y;
		this.scale = scale;
		this.visible = false;
		this.collisionGroup = collisionGroup;
	}

	render() {
	}

	hide() {
		this.sprite.visible = false;
	}

	//rescale obstacle TODO polygons not rescaled
	setScale(scale) {
		this.sprite.scale.setTo(scale, scale);
	}

	update(playerObject) {
		this.sprite.body.velocity.x = 0;

		this.sprite.body.velocity.x = playerObject.getSpeed();
	}

	//create contact rules for obstacle and other materials
	setContact(material) {
		this.material.setProperties(material.properties);
	}

    //set collision group for sprite
    setCollisionGroup(group) {
        this.sprite.body.setCollisionGroup(group);
    }

    //set collision rules for sprite and callback function
    collides(groups, callback) {
    	this.groups = groups;
        this.sprite.body.collides(groups, callback);
    }

    //destroy sprite 
    //if fade is set to true, fade sprite and call kill again without fade
    kill(fade) {
    	if(typeof fade == 'undefined') { fade = false; }

    	if(fade) {
            this.tween = this.game.add.tween(this.sprite)
            .to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);	
            this.tween.onComplete.add(this.kill, this);
    	} else {
	    	this.sprite.body.clearShapes();
	    	this.sprite.kill();
    	}
    }

    //function is called on player collision
    hitPlayer(body1, body2) {
        //console.log("hit player");
    }

    //function is called on sprite collision
    hitSprite(body1, body2) {
        //console.log("hit sprite");
    }

    //function called after collision callback
    onHit() {

    }

	inView() {
		if(this.sprite.position.x+this.sprite.width/2>0 && this.sprite.position.x+this.sprite.width/2<=this.game.width) {
			return true;
		} else {
			return false;
		}
	}

	isOut() {
		if(this.sprite.position.x+this.sprite.width/2<0) {
			return true;
		} else {
			return false;
		}
	}

	destroy() {
        this.kill();
        this.sprite.body.destroy();
        this.sprite.destroy();
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

export default Sprite;