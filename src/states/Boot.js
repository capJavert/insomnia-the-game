class Boot extends Phaser.State {

	preload() {

	}

	create() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.state.start("Preload");
		this.game.uniqueKey = 'E8jpNY2r8Rr27BaLmnLg';
	}

}

export default Boot;