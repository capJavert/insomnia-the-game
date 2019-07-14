class Dummy {

	constructor(game, x, y){
		this.game = game;

        //load sprite
        this.player = this.game.add.sprite(x, y, 'girl-dummy-sprite');

        //enable physics on player
        this.game.physics.p2.enable(this.player, debugMode);
        this.player.body.collideWorldBounds = true;
		this.spawned = false;
	}

	update(game, cursors, background) {

	}

    setCollisionGroup(group) {
        this.player.body.setCollisionGroup(group);
    }

    collides(groups) {
        this.player.body.collides(groups);
    }
}

export default Dummy;
