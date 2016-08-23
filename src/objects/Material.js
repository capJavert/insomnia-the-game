class Material {

	constructor(game, name, body){
		this.game = game;

		this.body = body;
		this.properties = this.game.physics.p2.createMaterial(name, this.body);
	}

	// set material properties to other material
	// Friction to use in the contact of these two materials.
	// Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
	// Stiffness of the resulting ContactEquation that this ContactMaterial generate.
	// Relaxation of the resulting ContactEquation that this ContactMaterial generate.
	// Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
	// Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
	// Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.
	setProperties(material) {
		this.contactMaterial = this.game.physics.p2.createContactMaterial(this.properties, material);
		this.body.angularDamping = 1;

		switch(this.name) {
			case 'rock':
	    		this.contactMaterial.friction = 1000;    
	    		this.contactMaterial.restitution = 0;  
	    		this.contactMaterial.stiffness = 10000;    
	    		this.contactMaterial.relaxation = 10000;     
	    		this.contactMaterial.frictionStiffness = 1e7;    
	    		this.contactMaterial.frictionRelaxation = 3;     
	    		this.contactMaterial.surfaceVelocity = 0;        
				break;
			case 'ground-trap':
	    		this.contactMaterial.friction = 1000;    
	    		this.contactMaterial.restitution = 0;  
	    		this.contactMaterial.stiffness = 10000;    
	    		this.contactMaterial.relaxation = 10000;     
	    		this.contactMaterial.frictionStiffness = 1e7;    
	    		this.contactMaterial.frictionRelaxation = 3;     
	    		this.contactMaterial.surfaceVelocity = -1;        
				break;
			case 'puzzle-obstacle':
	    		this.contactMaterial.friction = 0;    
	    		this.contactMaterial.restitution = 0;  
	    		this.contactMaterial.stiffness = 10000;    
	    		this.contactMaterial.relaxation = 10000;     
	    		this.contactMaterial.frictionStiffness = 0;    
	    		this.contactMaterial.frictionRelaxation = 3;     
	    		this.contactMaterial.surfaceVelocity = -1;        
				break;
			case 'spikes':
	    		this.contactMaterial.friction = 1000;    
	    		this.contactMaterial.restitution = 0;  
	    		this.contactMaterial.stiffness = 10000;    
	    		this.contactMaterial.relaxation = 10000;     
	    		this.contactMaterial.frictionStiffness = 1e7;    
	    		this.contactMaterial.frictionRelaxation = 3;     
	    		this.contactMaterial.surfaceVelocity = 0;        
				break;
		}   
	}
}

export default Material;