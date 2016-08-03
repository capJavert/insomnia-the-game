import MenuButton from 'objects/MenuButton';

class GameTitle extends Phaser.State {

	create() {
		//logo
		this.logo = this.game.add.image(this.game.width/2, 160, 'logo');
		this.logo.scale.setTo(0.5, 0.5);
		this.logo.anchor.setTo(0.5, 0); 

		//buttons
	    this.play = new MenuButton(this.game, this.game.width/2, this.logo.position.y+this.logo.height+100, "Play Alpha", this.startGame);
	    this.controls = new MenuButton(this.game, this.game.width/2, this.play.position.y+this.play.height+20, "Controls", this.Controls);
	    //this.stats = new MenuButton(this.game, this.game.width/2, this.controls.position.y+this.controls.height+20, "Achievements", this.Stats);
	    //this.credits = new MenuButton(this.game, this.game.width/2, this.stats.position.y+this.stats.height+20, "Credits", this.Credits);
	}

	startGame() {
		this.game.state.start("Main");
	}

	Controls() {
		this.game.state.start("Controls");
	}

	Stats() {
		this.game.state.start("Stats");
	}

	Credits() {
		this.game.state.start("Credits");
	}
}

export default GameTitle;
