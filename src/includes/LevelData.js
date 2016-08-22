import Rock from 'objects/Rock';
import Orb from 'objects/Orb';
import Fiend from 'objects/Fiend';
import FlyingFiend from 'objects/FlyingFiend';
import Trap from 'objects/Trap';
import Bitmap from 'objects/Bitmap';
import Material from 'objects/Material';
import Helpers from 'includes/Helpers';
import Spikes from 'objects/Spikes';
import Pond from 'objects/Pond';
import Checkpoint from 'objects/Checkpoint';

class LevelData {

    //lvl objects
    //new Fiend(this.game, 0, 0, 0.4, collisionGroups.fiendCollision),
    //new FlyingFiend(this.game, 0, 0, 0.4, collisionGroups.fiendCollision),
    //new Orb(this.game, 0, 0, 1, collisionGroups.interactionCollision),
    //new Rock(this.game, , , 1, collisionGroups.obstaclesCollision),
    //new Trap(this.game, , , 1, collisionGroups.interactionCollision),
    //new Spikes(this.game, , , 1, collisionGroups.obstaclesCollision), 
    //new Pond(this.game, , , 1, collisionGroups.interactionCollision), 
    //new Checkpoint(this.game, , , 1, collisionGroups.interactionCollision), 

	constructor(game){
		this.game = game;

		//init helpers
		this.helpers = new Helpers(this.game);
		this.lvlId = this.game.lvlId;
	}

	fetch(collisionGroups) {
		let data = new Array();

		switch(this.lvlId) {
			case 1: data = this.lvl1Data(collisionGroups);
				break;
			case 2: data = this.lvl2Data(collisionGroups);
				break;
			case 3: data = this.lvl3Data(collisionGroups);
				break;
			case 4: data = this.lvl4Data(collisionGroups);
				break;
			case 5: data = this.lvl5Data(collisionGroups);
				break;
			default: 
				this.game.state.start("LevelSelect", true, false);
		}

		return data;
	}

	lvl1Data(collisionGroups) {
		this.game.lvlIntroText = "... Beware of the Shadows swallowed by fog ...";

        let lvlObjects = [
            new Rock(this.game, 2500, -50, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 2700, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 5900, 0, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 6100, -40, 1, collisionGroups.obstaclesCollision),

            new Rock(this.game, 6100, -40, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 6100, -40, 1, collisionGroups.obstaclesCollision),

            new Rock(this.game, 8300, 20, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 8700, 120, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 9800, -50, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 10000, -70, 1, collisionGroups.obstaclesCollision),

            new Checkpoint(this.game, 12300, 0, 1, collisionGroups.interactionCollision),
            new Rock(this.game, 12800, 0, 1, collisionGroups.obstaclesCollision),
            new Orb(this.game, 12800, 320, 1, collisionGroups.interactionCollision),
            new Spikes(this.game, 13200, 0, 1, collisionGroups.obstaclesCollision), 
            new Rock(this.game, 13600, 0, 1, collisionGroups.obstaclesCollision),
            new Orb(this.game, 13600, 320, 1, collisionGroups.interactionCollision),
            new Spikes(this.game, 14000, 0, 1, collisionGroups.obstaclesCollision), 
            new Rock(this.game, 14400, 0, 1, collisionGroups.obstaclesCollision),
            new Orb(this.game, 14400, 320, 1, collisionGroups.interactionCollision),

            new Checkpoint(this.game, 15200, 0, 1, collisionGroups.interactionCollision),
            new Rock(this.game, 15700, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 16000, 400, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 16000, 100, 1, collisionGroups.obstaclesCollision),
            new Fiend(this.game, 16500, -30, 0.8, collisionGroups.fiendCollision),

            new Rock(this.game, 18000, -100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 18400, -50, 1, collisionGroups.obstaclesCollision),
            new Orb(this.game, 18400, 350, 1, collisionGroups.interactionCollision),
            new Rock(this.game, 18700, -110, 1, collisionGroups.obstaclesCollision),

            new Checkpoint(this.game, 20000, 0, 1, collisionGroups.interactionCollision),
            new Rock(this.game, 20500, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 20700, 220, 1, collisionGroups.obstaclesCollision),
            new FlyingFiend(this.game, 21300, 100, 0.4, collisionGroups.fiendCollision),

            new Checkpoint(this.game, 24500, 0, 1, collisionGroups.interactionCollision),
            new FlyingFiend(this.game, 25000, 100, 0.4, collisionGroups.fiendCollision),
            new FlyingFiend(this.game, 26000, 200, 0.4, collisionGroups.fiendCollision),

            new Rock(this.game, 26200, -110, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 26500, -60, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 26700, -10, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 27000, 50, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 27300, 110, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 27600, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 27600, 250, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 28000, 110, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 28000, 350, 1, collisionGroups.obstaclesCollision),
            new Orb(this.game, 28500, 800, 1, collisionGroups.interactionCollision),

            new Rock(this.game, 29900, 20, 1, collisionGroups.interactionCollision),

            new Checkpoint(this.game, 34000, 0, 1, collisionGroups.interactionCollision),
            new Rock(this.game, 34500, 20, 1, collisionGroups.interactionCollision),
            new Rock(this.game, 34800, 90, 1, collisionGroups.interactionCollision),
            new FlyingFiend(this.game, 35200, 150, 0.7, collisionGroups.fiendCollision),

            new Checkpoint(this.game, 36700, 0, 1, collisionGroups.interactionCollision, "Hold <A> and Move"),
            new Trap(this.game, 36700, 0, 1, collisionGroups.interactionCollision),
            new Fiend(this.game, 39000, -50, 0.8, collisionGroups.fiendCollision),

            new Rock(this.game, 42000, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 42200, 220, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 42800, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 4300, 100, 1, collisionGroups.obstaclesCollision),
            new Checkpoint(this.game, 42500, 0, 1, collisionGroups.interactionCollision),
            new FlyingFiend(this.game, 43000, 100, 0.7, collisionGroups.fiendCollision),

            new Checkpoint(this.game, 43700, 0, 1, collisionGroups.interactionCollision, "Hold <A> and Move"),
            new Trap(this.game, 43700, 0, 1, collisionGroups.interactionCollision),
            new Fiend(this.game, 45000, -30, 0.8, collisionGroups.fiendCollision),    
            new Fiend(this.game, 47000, -20, 0.7, collisionGroups.fiendCollision),     

            new Checkpoint(this.game, 50860, 0, 1, collisionGroups.interactionCollision),
            new FlyingFiend(this.game, 53600, 200, 0.5, collisionGroups.fiendCollision),

            new Checkpoint(this.game, 54760, 0, 1, collisionGroups.interactionCollision),
            new Bitmap(this.game, 'Platform', 55000, 0, 40, 150, 0, collisionGroups.obstaclesCollision, true),   
            new Bitmap(this.game, 'Platform', 55000+220, 150, 500, 40, 0, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 55000+440, 0, 40, 150, 0, collisionGroups.obstaclesCollision, true),     
            new Bitmap(this.game, 'Platform', 55000+740, 280, 800, 40, -20, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 55000+1320, 400, 500, 40, 0, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 55000+1320, 230, 500, 40, 0, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 55000+1100, 0, 40, 400, 0, collisionGroups.obstaclesCollision, true),    
            new Bitmap(this.game, 'Platform', 55000+1540, 0, 40, 400, 0, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 55000+1950, 400, 800, 40, 0, collisionGroups.obstaclesCollision, true),

            new Bitmap(this.game, 'Platform', 57000+1320-740, 400, 500, 40, 0, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 57000+1320-740, 230, 500, 40, 0, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 57000+1100-740, 0, 40, 400, 0, collisionGroups.obstaclesCollision, true),    
            new Bitmap(this.game, 'Platform', 57000+1540-740, 0, 40, 400, 0, collisionGroups.obstaclesCollision, true),
            new Spikes(this.game, 57000+1020, 0, 1, collisionGroups.obstaclesCollision), 
            new Orb(this.game, 57000+1020, 700, 1, collisionGroups.interactionCollision),
            new Bitmap(this.game, 'Platform', 57880+1320-740, 400, 500, 40, 0, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 57880+1320-740, 230, 500, 40, 0, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 57880+1100-740, 0, 40, 400, 0, collisionGroups.obstaclesCollision, true),    
            new Bitmap(this.game, 'Platform', 57880+1540-740, 0, 40, 400, 0, collisionGroups.obstaclesCollision, true),
            new Spikes(this.game, 57880+1020, 0, 1, collisionGroups.obstaclesCollision), 
            new Orb(this.game, 57880+1020, 700, 1, collisionGroups.interactionCollision),
            new Bitmap(this.game, 'Platform', 58760+1320-740, 400, 500, 40, 0, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 58760+1320-740, 230, 500, 40, 0, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 58760+1100-740, 0, 40, 400, 0, collisionGroups.obstaclesCollision, true),    
            new Bitmap(this.game, 'Platform', 58760+1540-740, 0, 40, 400, 0, collisionGroups.obstaclesCollision, true),

            new Checkpoint(this.game, 60400, 0, 1, collisionGroups.interactionCollision),
            new Pond(this.game, 61000, 0, 1, collisionGroups.interactionCollision), 
            new Spikes(this.game, 61300, 0, 1, collisionGroups.obstaclesCollision), 
            new Spikes(this.game, 61690, 0, 1, collisionGroups.obstaclesCollision), 
            new Spikes(this.game, 62080, 0, 1, collisionGroups.obstaclesCollision), 
            new Rock(this.game, 62470, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 62670, 220, 1, collisionGroups.obstaclesCollision),

            new Rock(this.game, 63000, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 63200, 220, 1, collisionGroups.obstaclesCollision),  
            new Rock(this.game, 63300, 160, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 63400, 100, 1, collisionGroups.obstaclesCollision),
            new Spikes(this.game, 63700, 0, 1, collisionGroups.obstaclesCollision), 
            new Spikes(this.game, 63700+390, 0, 1, collisionGroups.obstaclesCollision), 
            new Pond(this.game, 63700+500, 0, 1, collisionGroups.interactionCollision), 
            new Spikes(this.game, 63700+390+390, 0, 1, collisionGroups.obstaclesCollision), 
            new Spikes(this.game, 63700+390+390+390, 0, 1, collisionGroups.obstaclesCollision), 
            new Spikes(this.game, 63700+390+390+390+390, 0, 1, collisionGroups.obstaclesCollision), 
            new Spikes(this.game, 63700+390+390+390+390+390, 0, 1, collisionGroups.obstaclesCollision), 
            new Rock(this.game, 65650+240, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 65850+390, 160, 1, collisionGroups.obstaclesCollision),  
            new Rock(this.game, 65950+390, 220, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 66050+390, 100, 1, collisionGroups.obstaclesCollision),

            new Checkpoint(this.game, 69800, 0, 1, collisionGroups.interactionCollision),

            new Checkpoint(this.game, 75500, 0, 1, collisionGroups.interactionCollision),
            new Pond(this.game, 76300, 0, 1, collisionGroups.interactionCollision),    
            new Spikes(this.game, 76600, 0, 1, collisionGroups.obstaclesCollision), 
            new Spikes(this.game, 76600+390, 0, 1, collisionGroups.obstaclesCollision), 
            new Spikes(this.game, 76600+390+390, 0, 1, collisionGroups.obstaclesCollision), 
            new FlyingFiend(this.game, 76600+390+200, 200, 0.4, collisionGroups.fiendCollision),
            new Spikes(this.game, 76600+390+390+390, 0, 1, collisionGroups.obstaclesCollision), 
            new Bitmap(this.game, 'Platform', 77770, 0, 40, 150, 0, collisionGroups.obstaclesCollision, true),   
            new Bitmap(this.game, 'Platform', 77770+220, 150, 500, 40, 0, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 77770+440, 0, 40, 150, 0, collisionGroups.obstaclesCollision, true), 
            new Pond(this.game, 78430, 0, 1, collisionGroups.interactionCollision),    
            new Spikes(this.game, 78730, 0, 1, collisionGroups.obstaclesCollision), 
            new Spikes(this.game, 78730+390, 0, 1, collisionGroups.obstaclesCollision), 
            new Spikes(this.game, 78730+390+390, 0, 1, collisionGroups.obstaclesCollision),   

            new Checkpoint(this.game, 80500, 0, 1, collisionGroups.interactionCollision),
            new Rock(this.game, 80000+1000, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 80200+1000, 220, 1, collisionGroups.obstaclesCollision), 
            new Orb(this.game, 80200+1000, 520, 1, collisionGroups.interactionCollision), 
            new Rock(this.game, 80300+1000, 160, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 80400+1000, 100, 1, collisionGroups.obstaclesCollision),     

            new Checkpoint(this.game, 82000, 0, 1, collisionGroups.interactionCollision),
            new Pond(this.game, 82400, 0, 1, collisionGroups.interactionCollision),
            new Fiend(this.game, 82700, -30, 0.8, collisionGroups.fiendCollision),
            new Fiend(this.game, 82700+250, -30, 0.8, collisionGroups.fiendCollision),
            new Fiend(this.game, 82700+250+250, -30, 0.8, collisionGroups.fiendCollision),  

            new Checkpoint(this.game, 83500+1000, 0, 1, collisionGroups.interactionCollision),
            new Rock(this.game, 84000+1000, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 84200+1000, 220, 1, collisionGroups.obstaclesCollision), 
            new Orb(this.game, 84200+1000, 520, 1, collisionGroups.interactionCollision), 
            new Rock(this.game, 84300+1000, 160, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 84400+1000, 100, 1, collisionGroups.obstaclesCollision),   
            new Bitmap(this.game, 'Platform', 84700+1000, 270, 1000, 40, -10, collisionGroups.obstaclesCollision, true),

            new Checkpoint(this.game, 88000, 0, 1, collisionGroups.interactionCollision),
            new Pond(this.game, 88300, 0, 1, collisionGroups.interactionCollision),
            new Bitmap(this.game, 'Platform', 88300+500, 0, 40, 500, 0, collisionGroups.obstaclesCollision, true),   
            new Bitmap(this.game, 'Platform', 88300+500+220, 500, 500, 40, 0, collisionGroups.obstaclesCollision, true),
            new Bitmap(this.game, 'Platform', 88300+500+440, 0, 40, 500, 0, collisionGroups.obstaclesCollision, true),  
            new Trap(this.game, 88300+220+500, 700, 1, collisionGroups.interactionCollision),
            new Fiend(this.game, 88300+220+500+1000, -40, 1, collisionGroups.fiendCollision), 
            new FlyingFiend(this.game, 88300+220+500+1500, 300, 0.5, collisionGroups.fiendCollision),

            new Checkpoint(this.game, 91000, 0, 1, collisionGroups.interactionCollision),
            new Rock(this.game, 91500, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 91700, 220, 1, collisionGroups.obstaclesCollision), 
            new Orb(this.game, 91700, 520, 1, collisionGroups.interactionCollision), 
            new Rock(this.game, 91800+1000, 160, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 91900+1000, 100, 1, collisionGroups.obstaclesCollision),   
            new Bitmap(this.game, 'Platform', 92200, 300, 1000, 40, 10, collisionGroups.obstaclesCollision, true),
            new Fiend(this.game, 92100, -50, 0.6, collisionGroups.fiendCollision), 
            new Fiend(this.game, 92250, -50, 0.6, collisionGroups.fiendCollision), 
            new Rock(this.game, 92700+1000, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 92900+1000, 220, 1, collisionGroups.obstaclesCollision), 
            new Orb(this.game, 92900+1000, 520, 1, collisionGroups.interactionCollision), 
            new Rock(this.game, 93000+1000, 160, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 93100+1000, 100, 1, collisionGroups.obstaclesCollision),  
        ];

        //apply generators
        lvlObjects = this.helpers.linearOrbGenerator(collisionGroups.interactionCollision, lvlObjects, 4, 960, 70, 360);
        lvlObjects = this.helpers.linearOrbGenerator(collisionGroups.interactionCollision, lvlObjects, 3, 3160, 70, 360);
        lvlObjects = this.helpers.linearOrbGenerator(collisionGroups.interactionCollision, lvlObjects, 4, 6560, 70, 360);
        lvlObjects = this.helpers.linearOrbGenerator(collisionGroups.interactionCollision, lvlObjects, 6, 10300, 70, 360);
        lvlObjects = this.helpers.linearOrbGenerator(collisionGroups.interactionCollision, lvlObjects, 10, 21400, 70, 360);
        lvlObjects = this.helpers.linearRockGenerator(collisionGroups.obstaclesCollision, lvlObjects, 8, 30000, 70, 360);
        lvlObjects = this.helpers.linearOrbGenerator(collisionGroups.interactionCollision, lvlObjects, 6, 48000, 70, 360);
        lvlObjects = this.helpers.bitmapPlatformGenerator(collisionGroups.obstaclesCollision, lvlObjects, 51060, 0, false);
        lvlObjects = this.helpers.linearOrbGenerator(collisionGroups.interactionCollision, lvlObjects, 7, 66900, 70, 360);
        lvlObjects = this.helpers.bitmapPlatformGenerator(collisionGroups.obstaclesCollision, lvlObjects, 70000, 0, false);
        lvlObjects = this.helpers.bitmapPlatformGenerator(collisionGroups.obstaclesCollision, lvlObjects, 73000, 0, true);
        lvlObjects = this.helpers.bitmapPlatformGenerator(collisionGroups.obstaclesCollision, lvlObjects, 84850+1000, 0, true);
        lvlObjects = this.helpers.linearOrbGenerator(collisionGroups.interactionCollision, lvlObjects, 4, 94600, 70, 360);

        return lvlObjects;
	}

	lvl2Data(collisionGroups) {
		this.game.lvlIntroText = "... Level 2 ...";

		let lvlObjects = [
			new Checkpoint(this.game, 1000, 0, 1, collisionGroups.interactionCollision),
		];

		return lvlObjects;
	}

	lvl3Data(collisionGroups) {
		this.game.lvlIntroText = "... Level 3 ...";

		let lvlObjects = [
			new Checkpoint(this.game, 1000, 0, 1, collisionGroups.interactionCollision),
		];

		return lvlObjects;
	}

	lvl4Data(collisionGroups) {
		this.game.lvlIntroText = "... Level 4 ...";

		let lvlObjects = [
			new Checkpoint(this.game, 1000, 0, 1, collisionGroups.interactionCollision),
		];

		return lvlObjects;
	}

	lvl5Data(collisionGroups) {
		this.game.lvlIntroText = "... Level 5 ...";

		let lvlObjects = [
			new Checkpoint(this.game, 1000, 0, 1, collisionGroups.interactionCollision),
		];

		return lvlObjects;
	}
}

export default LevelData;