import Rock from 'objects/Rock';
import Orb from 'objects/Orb';
import Fiend from 'objects/Fiend';
import FlyingFiend from 'objects/FlyingFiend';

class Helpers {

	//generates orb in linear interval
	linearOrbGenerator(main, lvlArray, orbNumber, orbStartPosition, orbPositionY, interval) {
		var orbSpawnPosition = orbStartPosition;
		var loopLimit = lvlArray.length+orbNumber;

		for (var i = lvlArray.length; i < loopLimit; i++) {
			lvlArray.push(new Orb(main.game, orbSpawnPosition, orbPositionY, 1, main.interactionCollision));
			orbSpawnPosition+=interval;
		};

		return lvlArray;
	}
}

export default Helpers;