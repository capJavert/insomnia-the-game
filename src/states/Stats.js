import MenuButton from 'objects/MenuButton';

class Stats extends Phaser.State {

	create() {
		//logo
		this.logo = this.game.add.image(this.game.width/2, 180, 'logo');
		this.logo.scale.setTo(0.5, 0.5);
		this.logo.anchor.setTo(0.5, 0); 

	    //get stats from localStorage
	    let data = new Array();
		for (var i = 1; i <= this.game.lastLvlId; i++) {
			data[i] = localStorage.getItem(this.game.uniqueKey+"L"+i);
		}

		//buttons
		this.statsButtons = new Array();
	    this.back = new MenuButton(this.game, this.game.width/2, this.logo.position.y+this.logo.height+100, "Back", this.mainMenu);
	    this.statsButtons[1] = new MenuButton(this.game, this.game.width/2-200, this.back.position.y+this.back.height+20, 
	    	"Level 1: "+(data[1] ? data[1]:'/'), null);
	    this.statsButtons[2] = new MenuButton(this.game, this.game.width/2+200, this.back.position.y+this.back.height+20, 
	    	"Level 2: "+(data[2] ? data[2]:'/'), null);
	    this.statsButtons[3] = new MenuButton(this.game, this.game.width/2-200, this.statsButtons[1].position.y+this.statsButtons[1].height+20, 
	    	"Level 3: "+(data[3] ? data[3]:'/'), null);
	    this.statsButtons[4] = new MenuButton(this.game, this.game.width/2+200, this.statsButtons[1].position.y+this.statsButtons[1].height+20, 
	    	"Level 4: "+(data[4] ? data[4]:'/'), null);
	    this.statsButtons[5] = new MenuButton(this.game, this.game.width/2, this.statsButtons[3].position.y+this.statsButtons[3].height+20, 
	    	"Level 5: "+(data[5] ? data[5]:'/'), null);
	}

	mainMenu() {
		this.game.state.start("Menu");
	}
}

export default Stats;
