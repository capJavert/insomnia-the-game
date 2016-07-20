class Player {

    //init player
	constructor(game, x, y){
		this.game = game;

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
        this.player.peek = false;

        //enable physics on player
        this.game.physics.p2.enable(this.player, true);
        this.player.body.collideWorldBounds = true;
        this.player.body.fixedRotation = true;
        this.player.body.offset.y = 20;
        this.player.body.velocity.y = 0;
        this.player.body.angularDamping = 1;
        this.player.position.y = 0;

        //set material
        this.material = this.game.physics.p2.createMaterial('player', this.player.body);
	}

	update(game, cursors, background) {
        //console.log(this.player.frame);
        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;
        this.speed = 0;

        // Modify movement while mid air
        if(this.isJumping()) {
            this.modifier = 2;
        } else {
            this.modifier = 1;
        }

        if (cursors.left.isDown)
        {
            //  Move to the left
            //this.player.body.velocity.x = -400/this.modifier;
            this.player.body.moveLeft(400/this.modifier);

            if(!this.isJumping()) {
                //this.player.body.clearShapes();
                //this.player.body.loadPolygon("girl-physics", "girl-left1");
                this.player.animations.play('left');
            }
        }
        else if (cursors.right.isDown)
        {
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

            if(!this.isJumping()) {
                //this.player.body.loadPolygon("girl-physics", "girl-right1");
                this.player.animations.play('right');
            }
        }
        else
        {
            //  Stand still
            if(!this.isJumping()) {
                //this.player.body.clearShapes();
                //this.player.body.loadPolygon("girl-physics", "girl-idle1");
                this.player.animations.play('idle');
            }
        }

        //  Allow to jump if they are touching the ground.
        if (cursors.up.isDown && !this.isJumping())
        {
            //this.player.body.loadPolygon("girl-physics", "girl-jump1");
            this.player.animations.play('jump');

            this.player.peek = false;
            this.player.jumping = true;

            //this.player.body.velocity.y = -500;
            this.player.body.moveUp(900);
        }

        if(this.player.peek && this.isJumping() && this.player.body.velocity.y>220) {
            //this.player.body.loadPolygon("girl-physics", "girl-falling1");
            this.player.animations.play('falling');
        }
	} 

    //check if player is jumping
    isJumping() {
        if(this.player.jumping && !this.player.peek) {
            if(this.player.body.velocity.y >= 1) {
                this.player.peek = true;

                return false;
            } else {
                return true;
            }
        } else if(this.player.jumping && this.player.peek) {
            if(this.player.body.velocity.y > -1 && this.player.body.velocity.y < 0) {
                this.player.jumping = false;

                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
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

    //set collision rules for sprite
    collides(groups) {
        this.player.body.collides(groups);
    }
}

export default Player;