class Player {

	constructor(game, x, y){
		this.game = game;
        this.player = game.add.sprite(x, y);

        this.staticHair = game.make.sprite(-32, 0, 'hair');
        this.staticHair.animations.add('idle', [0, 1, 2], 11, true);
        this.staticHair.animations.add('jump', [3], 11, true);
        this.staticHair.position.y = -12;

        this.movingHair = game.make.sprite(0, 0, 'hair-moving');
        this.movingHair.animations.add('right', [0, 1, 2], 11, true);
        this.movingHair.animations.add('left', [3, 4, 5], 11, true);
        this.movingHair.position.y = -23;
        this.movingHair.visible = false;

        this.fallingHair = game.make.sprite(-6, 0, 'hair-falling');
        this.fallingHair.animations.add('default', [0, 1], 11, true);
        this.fallingHair.position.y = -104;
        this.fallingHair.visible = false;

		this.girl = game.make.sprite(0, 0, 'girl', 2);
        this.girl.animations.add('right', [0, 1], 10, true);
        this.girl.animations.add('left', [3, 4], 10, true);

	    //  We need to enable physics on the this.player
	    this.player.physics = game.physics.arcade;
	    game.physics.enable(this.player);

        this.player.body.setSize(91, 165);
	    this.player.body.bounce.y = 0;
	    this.player.body.gravity.y = 450;
        this.player.body.collideWorldBounds = true;

        this.player.addChild(this.staticHair);
        this.player.addChild(this.movingHair);
        this.player.addChild(this.fallingHair);
        this.player.addChild(this.girl);
        this.player.jumping = false;
        this.player.peek = false;

        game.physics.arcade.collide(this.girl, this.hair);
	}

	update(game, cursors, background) {
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
            this.player.body.velocity.x = -400/this.modifier;

            if(!this.isJumping()) {
                this.movingHair.visible = true;
                this.staticHair.visible = false;
                this.fallingHair.visible = false;

                this.movingHair.position.x = -5;
                this.movingHair.animations.play('left');

                this.girl.animations.play('left');
            }
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            //this.player.body.velocity.x = 400/this.modifier;
            if(this.game.width/3>this.player.position.x+98) {
                this.player.body.velocity.x = 400/this.modifier;
            } else {
                this.speed = 5;
                background.tilePosition.x -= 5/this.modifier;
                this.game.progress += 5/this.modifier;
            }

            if(!this.isJumping()) {
                this.movingHair.visible = true;
                this.staticHair.visible = false;
                this.fallingHair.visible = false;

                this.movingHair.position.x = -115;
                this.movingHair.animations.play('right');

                this.girl.animations.play('right');
            }
        }
        else
        {
            //  Stand still
            if(!this.isJumping()) {
                this.girl.animations.stop();
                this.movingHair.visible = false;
                this.staticHair.visible = true;
                this.fallingHair.visible = false;
                this.staticHair.animations.play('idle');

                this.girl.frame = 2;
            }
        }

        //  Allow to jump if they are touching the ground.
        if (cursors.up.isDown && !this.isJumping())
        {
            this.girl.animations.stop();
            this.movingHair.visible = false;
            this.staticHair.visible = true;
            this.fallingHair.visible = false;

            this.girl.frame = 5;
            this.staticHair.animations.play('jump');

            this.player.peek = false;
            this.player.jumping = true;

            this.player.body.velocity.y = -500;
        }

        if(this.player.peek && this.isJumping() && this.player.body.velocity.y>220) {
            this.movingHair.visible = false;
            this.staticHair.visible = false;
            this.fallingHair.visible = true;

            this.fallingHair.animations.play('default');
        }
	} 

    isJumping() {
        if(this.player.jumping && !this.player.peek) {
            if(this.player.body.velocity.y >= 0) {
                this.player.peek = true;

                return false;
            } else {
                return true;
            }
        } else if(this.player.jumping && this.player.peek) {
            if(this.player.body.velocity.y == 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    getSpeed() {
        if(this.speed) {
            return this.speed/this.modifier;
        } else {
            return 0;
        }
    }

    collide(sprite) {
        this.game.physics.arcade.collide(this.player, sprite);
        this.game.physics.arcade.collide(this.staticHair, sprite);
        this.game.physics.arcade.collide(this.movingHair, sprite);
        this.game.physics.arcade.collide(this.girl, sprite);
    }
}

export default Player;