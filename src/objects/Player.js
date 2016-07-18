class Player {

	constructor(game, x, y){
		this.game = game;
        this.player = game.add.sprite(x, y);

        this.staticHair = game.make.sprite(-32, 0, 'hair');
        this.staticHair.animations.add('idle', [0, 1, 2], 11, true);
        this.staticHair.position.y = -12;

        this.movingHair = game.make.sprite(0, 0, 'hair-moving');
        this.movingHair.animations.add('right', [0, 1, 2], 11, true);
        this.movingHair.animations.add('left', [3, 4, 5], 11, true);
        this.movingHair.position.y = -23;
        this.movingHair.visible = false;

		this.girl = game.make.sprite(0, 0, 'girl', 2);
        this.girl.animations.add('right', [0, 1], 10, true);
        this.girl.animations.add('left', [3, 4], 10, true);

        this.player.addChild(this.staticHair);
        this.player.addChild(this.movingHair);
        this.player.addChild(this.girl);

	    //  We need to enable physics on the this.player
	    this.player.physics = game.physics.arcade;

	    game.physics.enable(this.player);
        this.player.body.setSize(155, 165);

	    this.player.body.bounce.y = 0;
	    this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        game.physics.arcade.collide(this.girl, this.hair);
	}

	update(cursors) {
		//  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        //console.log(monster.x);

        //console.log(this.world.width);

        if (cursors.left.isDown)
        {
            //  Move to the left
            this.player.body.velocity.x = -400;

            this.movingHair.visible = true;
            this.staticHair.visible = false;
            this.movingHair.position.x = -5;
            this.movingHair.animations.play('left');

            this.girl.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            this.player.body.velocity.x = 400;
            ;
            this.movingHair.visible = true;
            this.staticHair.visible = false;
            this.movingHair.position.x = -115;
            this.movingHair.animations.play('right');

            this.girl.animations.play('right');
        }
        else
        {
            //  Stand still
            this.girl.animations.stop();
            this.movingHair.visible = false;
            this.staticHair.visible = true;
            this.staticHair.animations.play('idle');

            this.girl.frame = 2;
        }

        //  Allow to jump if they are touching the ground.
        if (cursors.up.isDown)
        {
            this.player.body.velocity.y = -350;
        }
	}
}

export default Player;