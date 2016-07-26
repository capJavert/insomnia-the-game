import Material from 'objects/Material';

class Player {

    //init player
	constructor(game, x, y){
		this.game = game;
        this.oType = 'Player';

        //load sprite
        this.player = this.game.add.sprite(x, y, 'girl');

        //define animation frames
        this.player.animations.add('idle', Phaser.Animation.generateFrameNames('girl-idle', 1, 3), 11, true);
        this.player.animations.add('right', Phaser.Animation.generateFrameNames('girl-right', 1, 3), 11, true);
        this.player.animations.add('left', Phaser.Animation.generateFrameNames('girl-left', 1, 3), 11, true);
        this.player.animations.add('jump', Phaser.Animation.generateFrameNames('girl-jump', 1, 1), 11, true);
        this.player.animations.add('falling', Phaser.Animation.generateFrameNames('girl-falling', 1, 2), 11, true);

        //set default player states
        this.player.jumping = false;
        this.player.damageBounce = false;

        //enable physics on player
        this.game.physics.p2.enable(this.player, this.game.debugMode);
        this.player.oType = this.oType;
        this.player.body.clearShapes();
        this.player.body.setCircle(90);
        this.player.body.fixedRotation = true;
        this.player.body.offset.y = 10;
        this.player.body.velocity.y = 0;
        this.player.body.angularDamping = 1;
        this.player.position.y = 0;

        //set material
        this.material = new Material(this.game, 'player', this.player.body);
        this.material.properties.relaxation = 10000; 
        this.material.properties.friction = 1000;    
        this.material.properties.restitution = 0;
        this.material.properties.stiffness = 10000; 

        //set listener for when player interacts with lvl objects
        this.player.body.onBeginContact.add(this.handleContact, this);
	}

	update(game, cursors, background) {
        //console.log(this.player.frame);
        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0; 
        this.speed = 0;

        // Modify movement while mid air
        if(!this.checkIfCanJump()) {
            this.modifier = 2;
        } else {
            this.modifier = 1;
            this.player.jumping = false;
        }

        if(this.player.damageBounce) {
            this.game.health--;
            this.player.alpha = this.game.health*0.25;
            console.log(this.game.health);
            this.player.body.moveLeft(2000);
            this.player.damageBounce = false;
        } else if (cursors.left.isDown) {
            //  Move to the left
            //this.player.body.velocity.x = -400/this.modifier;
            if(this.player.position.x>120) {
                this.player.body.moveLeft(400/this.modifier);
            
                if(this.checkIfCanJump()) {
                    //this.player.body.clearShapes();
                    //this.player.body.loadPolygon("girl-physics", "girl-left1");
                    this.player.animations.play('left');
                }
            } else {
                this.player.animations.play('idle');
            }
        } else if (cursors.right.isDown) {
            //  Move to the right
            //this.player.body.velocity.x = 400/this.modifier;
            if(this.game.width/3>this.player.position.x+98) {
                //this.player.body.velocity.x = 400/this.modifier;
                this.player.body.moveRight(400/this.modifier);
            } else {
                this.speed = 5;
                background.tilePosition.x -= 5/this.modifier;
                this.game.progress += 5/this.modifier;
            }

            if(this.checkIfCanJump()) {
                //this.player.body.loadPolygon("girl-physics", "girl-right1");
                this.player.animations.play('right');
            }
        } else {
            //  Stand still
            if(this.checkIfCanJump()) {
                //this.player.body.clearShapes();
                //this.player.body.loadPolygon("girl-physics", "girl-idle1");
                this.player.animations.play('idle');
            }
        }

        //  Allow to jump if they are touching the ground.
        if (cursors.up.isDown && this.checkIfCanJump())
        {
            //this.player.body.loadPolygon("girl-physics", "girl-jump1");
            this.player.animations.play('jump');

            this.player.jumping = true;

            //this.player.body.velocity.y = -500;
            this.player.body.moveUp(900);
        }

        if(!this.checkIfCanJump() && this.player.body.velocity.y>220) {
            //this.player.body.loadPolygon("girl-physics", "girl-falling1");
            this.player.body.offset.y = -50;
            this.player.animations.play('falling');
        } else {
            if(this.player.jumping && this.player.animations.currentAnim.name == 'falling') {
                this.player.animations.stop();
                this.player.jumping = false;
            }
            this.player.body.offset.y = 10;
        }
	} 

    //check if player is jumping
    checkIfCanJump() {    
        var yAxis = p2.vec2.fromValues(0, 1);    
        var result = false;    

        for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {        
            var c = this.game.physics.p2.world.narrowphase.contactEquations[i];     

            if (c.bodyA === this.player.body.data || c.bodyB === this.player.body.data) {            
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis            
                if (c.bodyA === this.player.body.data) {
                    d *= -1;     
                }

                if (d > 0.5) {
                    result = true;        
                }
            }    
        }        

        return result;
    }

    //get current movement speed of player
    getSpeed() {
        if(this.speed) {
            return this.speed/this.modifier;
        } else {
            return 0;
        }
    }

    //set collision group for sprite
    setCollisionGroup(group) {
        this.player.body.setCollisionGroup(group);
    }

    //set collision rules for sprite and callback function
    collides(groups, callback) {
        this.player.body.collides(groups, callback);
    }

    //function is called on sprite collision
    hitSprite(body1, body2) {
        //console.log("hit");
    }

    hitFiend(body1, body2) {
        //return true;
    }

    handleContact(body1, body2, shape1, shape2, equation) {
        //console.log(body2.sprite);
        //this.player.body.moveLeft(400);
    }
}

export default Player;