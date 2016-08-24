class GameOver extends Phaser.State {

	create() {
		this.restartGame();
	}

	restartGame() {
		this.game.state.start("Main", true, false);
	}

}

export default GameOver;
