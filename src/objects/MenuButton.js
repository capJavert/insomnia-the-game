class MenuButton {

	constructor(game, x, y, text, action, styles){
		if(typeof styles == 'undefined') { 
			styles = {
            	font: 'IM Fell DW Pica',
            	fontWeight: 'normal',
            	fontSize: 48,
            	fill: '#FFFFFF',
            	align: 'center'
            }
		}

		this.game = game;
        this.text = this.game.add.text(
            x, y, 
            text,
            styles
        );

        this.text.anchor.setTo(0.5);
        this.text.inputEnabled = true;
        this.text.input.useHandCursor = true;
	    this.text.events.onInputOver.add(this.mouseOver, this);
	    this.text.events.onInputOut.add(this.mouseOut, this);
	    this.text.events.onInputDown.add(action, this);
	    this.position = this.text.position;
	    this.width = this.text.width;
	    this.height = this.text.height;
	}

	mouseOver(text) {
		text.fontWeight = 'bold';
	}

	mouseOut(text) {
		text.fontWeight = 'normal';
	}
}

export default MenuButton;