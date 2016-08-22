import MenuButton from 'objects/MenuButton';
import LevelData from 'includes/LevelData';

class LevelSelect extends Phaser.State {

	create() {
		//logo
		this.logo = this.game.add.image(this.game.width/2, 140, 'logo');
		this.logo.scale.setTo(0.5, 0.5);
		this.logo.anchor.setTo(0.5, 0); 

		//get lvl progress data from local storage
		this.lvlProgress = localStorage.getItem(this.game.uniqueKey);
		if(!this.lvlProgress) {
			this.lvlProgress = 1;
		}

		//buttons
		this.lvlButtons = new Array();
	    this.back = new MenuButton(this.game, this.game.width/2, this.logo.position.y+this.logo.height+100, "Back", this.mainMenu);
		this.lvlButtons[1] = new MenuButton(this.game, this.game.width/2-110, this.back.position.y+this.back.height+40, "Level 1", this.startLvl1);
		this.lvlButtons[2] = new MenuButton(this.game, this.game.width/2+110, this.back.position.y+this.back.height+40, "Level 2", this.startLvl2);
		this.lvlButtons[3] = new MenuButton(this.game, this.game.width/2-110, this.lvlButtons[1].position.y+this.lvlButtons[1].height+20, "Level 3", this.startLvl3);
		this.lvlButtons[4] = new MenuButton(this.game, this.game.width/2+110, this.lvlButtons[1].position.y+this.lvlButtons[1].height+20, "Level 4", this.startLvl4);
		this.lvlButtons[5] = new MenuButton(this.game, this.game.width/2, this.lvlButtons[3].position.y+this.lvlButtons[3].height+20, "Level 5", this.startLvl5);

		//disable unreached lvl buttons
		for (var i = 1; i <= this.game.lastLvlId; i++) {
			if(this.lvlProgress<i) {
				this.lvlButtons[i].disable();
			}
		}
	}

	mainMenu() {
		this.game.state.start("Menu");
	}

	startLvl1() {
		this.game.lvlId = 1;

        //start game
		this.game.state.start("Main");
	}

	startLvl2() {
		this.game.lvlId = 2;

		this.game.state.start("Main");
	}

	startLvl3() {
		this.game.lvlId = 3;

        //start game
		this.game.state.start("Main");
	}

	startLvl4() {
		this.game.lvlId = 4;

        //start game
		this.game.state.start("Main");
	}

	startLvl5() {
		this.game.lvlId = 5;

        //start game
		this.game.state.start("Main");
	}
}

export default LevelSelect;
