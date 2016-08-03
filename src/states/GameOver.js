class GameOver extends Phaser.State {

	create() {
		this.restartGame();
	}

	restartGame() {
		this.game.state.start("Main");
	}

}

export default GameOver;
