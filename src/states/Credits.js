import MenuButton from 'objects/MenuButton';

class Credits extends Phaser.State {

	create() {
		//buttons
	    this.credits = new MenuButton(this.game, this.game.width/2, this.game.height, 
	    	"\n\nCREDITS\n\n"+
	    	"Game designed and developed by Ante Barić\n"+
	    	"Powered by Phaser Engine\n"+
	    	"\nSPECIAL THANKS\n\n"+
	    	"Fabijan Barić, head of testing\n"+
	    	"Mladen Konecki, mentor\n"+
	    	"Linda Rae (Brush set)\n"+
	    	"Leshy Labs LLC (SpriteSheet Tool)\n"+
	    	"\nBETA testers\n\n"+
			"agadmator\n"+
			"andreaperkovic001\n"+
			"anja.995\n"+
			"arneo.marinvincetic\n"+
			"atomas\n"+
			"bruno.colan2\n"+
			"bumblebrouge\n"+
			"dakimakaki\n"+
			"damir.drempetic\n"+
			"deajakovl\n"+
			"denis.dulovic\n"+
			"doroteja.buden\n"+
			"fabijan.baric1\n"+
			"faenryr\n"+
			"filip.rapaic\n"+
			"filipp.aleksic\n"+
			"goran.vincic1995\n"+
			"ivan.penga\n"+
			"ivansusec\n"+
			"jaymomyaj\n"+
			"junglelord2103\n"+
			"karlo.mioc1\n"+
			"kgrlic\n"+
			"lamburea\n"+
			"lana.jelusic\n"+
			"magdicvalentin2\n"+
			"majnam\n"+
			"marijo\n"+
			"mario_tudan\n"+
			"martinovic.antonio\n"+
			"milutin.mario\n"+
			"mladen.konecki\n"+
			"moonshadow565\n"+
			"mvlaovic\n"+
			"paskal.suto\n"+
			"phototracer\n"+
			"sttevann\n"+
			"teo.kantoci\n"+
			"valthefierce\n"+
	    	"\n\n dedicated to V.K."
	    	,
    	null);

		//add credit roll animation
		this.credits.text.anchor.set(0.5, 0);
        this.tween = this.game.add.tween(this.credits.text)
        .to( { y: -this.credits.height }, 20000, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.tween.onComplete.add(this.mainMenu, this);

		var blackBg = this.game.add.bitmapData(this.game.width, 200);

		//	Fill it
		blackBg.ctx.rect(0, 0, this.game.width, 200);
	    blackBg.ctx.fillStyle = '#000000';
	    blackBg.ctx.fill();

		this.blackBg = this.game.add.sprite(0, 0, blackBg);

	    this.back = new MenuButton(this.game, this.game.width/2, 100, "Back", this.mainMenu);
	}

	mainMenu() {
		this.game.state.start("Menu");
	}
}

export default Credits;
