import MenuButton from 'objects/MenuButton';

class Credits extends Phaser.State {

	create() {
		//logo
		this.logo = this.game.add.image(this.game.width/2, 180, 'logo');
		this.logo.scale.setTo(0.5, 0.5);
		this.logo.anchor.setTo(0.5, 0); 

		//buttons
	    this.back = new MenuButton(this.game, this.game.width/2, this.logo.position.y+this.logo.height+100, "Back", this.mainMenu);
	}

	mainMenu() {
		this.game.state.start("Menu");
	}
}

export default Credits;
