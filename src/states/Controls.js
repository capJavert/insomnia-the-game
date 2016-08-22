import MenuButton from 'objects/MenuButton';

class Controls extends Phaser.State {

	create() {
		//logo
		this.logo = this.game.add.image(this.game.width/2, 140, 'logo');
		this.logo.scale.setTo(0.5, 0.5);
		this.logo.anchor.setTo(0.5, 0); 

		//buttons
	    this.back = new MenuButton(this.game, this.game.width/2, this.logo.position.y+this.logo.height+100, "Back", this.mainMenu);
		this.move = new MenuButton(this.game, this.game.width/2, this.back.position.y+this.back.height+40, "Movement: Cursors <Left>, <Right>", null);
		this.jump = new MenuButton(this.game, this.game.width/2, this.move.position.y+this.move.height+20, "Jump: Cursor <Up>", null);
		this.interact = new MenuButton(this.game, this.game.width/2, this.jump.position.y+this.jump.height+20, "Interact with objects: Hold <A>", null);
		this.quit = new MenuButton(this.game, this.game.width/2, this.interact.position.y+this.interact.height+20, "Quit game <ESC>", null);
	}

	mainMenu() {
		this.game.state.start("Menu");
	}
}

export default Controls;
