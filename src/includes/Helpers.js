import Rock from 'objects/Rock';
import Orb from 'objects/Orb';
import Fiend from 'objects/Fiend';
import FlyingFiend from 'objects/FlyingFiend';
import Bitmap from 'objects/Bitmap';

class Helpers {

	constructor(game){
		this.game = game;
	}

	//generates Orb in linear interval
	linearOrbGenerator(collisionGroup, lvlArray, orbNumber, orbStartPosition, orbPositionY, interval) {
		var orbSpawnPosition = orbStartPosition;
		var loopLimit = lvlArray.length+orbNumber;

		for (var i = lvlArray.length; i < loopLimit; i++) {
			lvlArray.push(new Orb(this.game, orbSpawnPosition, orbPositionY, 1, collisionGroup));
			orbSpawnPosition+=interval;
		}

		return lvlArray;
	}

	//generates Rock in linear interval
	linearRockGenerator(collisionGroup, lvlArray, orbNumber, orbStartPosition, orbPositionY, interval) {
		var orbSpawnPosition = orbStartPosition;
		var loopLimit = lvlArray.length+orbNumber;

		for (var i = lvlArray.length; i < loopLimit; i++) {
			lvlArray.push(new Rock(this.game, orbSpawnPosition, orbPositionY, 1, collisionGroup));
			orbSpawnPosition+=interval;
		}

		return lvlArray;
	}

	//generates Fiend in linear interval
	linearFiendGenerator(collisionGroup, lvlArray, orbNumber, orbStartPosition, orbPositionY, interval) {
		var orbSpawnPosition = orbStartPosition;
		var loopLimit = lvlArray.length+orbNumber;

		for (var i = lvlArray.length; i < loopLimit; i++) {
			lvlArray.push(new Fiend(this.game, orbSpawnPosition, orbPositionY, 1, collisionGroup));
			orbSpawnPosition+=interval;
		}

		return lvlArray;
	}

	//generates FlyingFiend in linear interval
	linearFlyingFiendGenerator(collisionGroup, lvlArray, orbNumber, orbStartPosition, orbPositionY, interval) {
		var orbSpawnPosition = orbStartPosition;
		var loopLimit = lvlArray.length+orbNumber;

		for (var i = lvlArray.length; i < loopLimit; i++) {
			lvlArray.push(new FlyingFiend(this.game, orbSpawnPosition, orbPositionY, 1, collisionGroup));
			orbSpawnPosition+=interval;
		}

		return lvlArray;
	}

	//generates series of Bitmap objects that create platform
	bitmapPlatformGenerator(collisionGroup, lvlArray, startPosition, yOffset, flip) {
		if(!flip) {
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition, 0-yOffset, 40, 150, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+220, 150-yOffset, 500, 40, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+440, 0-yOffset, 40, 150, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+740, 280-yOffset, 800, 40, -20, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+1320, 400-yOffset, 500, 40, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+1320, 230-yOffset, 500, 40, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+1100, 0-yOffset, 40, 400, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+1540, 0-yOffset, 40, 400, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+1890, 30-yOffset, 800, 40, 30, collisionGroup, true));
		} else {
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition, 30-yOffset, 800, 40, -30, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+350, 0-yOffset, 40, 400, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+790, 0-yOffset, 40, 400, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+570, 230-yOffset, 500, 40, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+570, 400-yOffset, 500, 40, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+1150, 280-yOffset, 800, 40, 20, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+1450, 0-yOffset, 40, 150, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+1670, 150-yOffset, 500, 40, 0, collisionGroup, true));
			lvlArray.push(new Bitmap(this.game, 'Platform', startPosition+1890, 0-yOffset, 40, 150, 0, collisionGroup, true));
		}

		return lvlArray;
	}

	//sends apiObject data to game API
	api(apiObject) {
		$.ajax({
			type: 'GET',
			url: 'http://ante-baric.com/insomnia/api/',
			// data to be added to query string:
			data: { s: apiObject.status, p: apiObject.progress },
			// type of data we are expecting in return:
			dataType: 'html',
			success: function(data){
				console.log(data);
			},
			error: function(){
				console.log("ajax error");
			}
		})
	}
}

export default Helpers;
