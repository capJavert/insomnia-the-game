class GameOver extends Phaser.State {

	create() {
		this.restartGame();
	}

	restartGame() {
		this.game.state.start("Menu");
	}

}

export default GameOver;
