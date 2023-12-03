import fs from "node:fs"

const fsp = fs.promises;


interface Draw {
	red: number;
	green: number;
	blue: number;
}

interface Game {
    num: number;
    draws: Draw[];
		raw: string;
}

async function part1() {
	const games = await loadInput(`${__dirname}/input.txt`);

	const bagCubes: Draw = {
		red: 12,
		green: 13,
		blue: 14,
	};

	let sum = 0;

  for(const game of games) {
		if(isPossible(bagCubes, game.draws)) {
			console.log(`Possible  : ${game.raw}`)
			sum += game.num;
		} else {
			console.log(`Impossible: ${game.raw}`);
		}
	}

	console.log(`\n\nPART 1 FINAL RESULT: ${sum}\n\n`);
}

async function part2() {
	const games = await loadInput(`${__dirname}/input.txt`);

	let sum = 0;
  for(const game of games) {
		sum += power(minPossibleCubes(game.draws));
	}

	console.log(`\n\nPART 2 FINAL RESULT: ${sum}\n\n`);
}

function power(draw: Draw) {
	return draw.red * draw.green * draw.blue;
}

function minPossibleCubes(draws: Draw[]): Draw {
	return {
		red: Math.max(...draws.map(d=>d.red)),
		green: Math.max(...draws.map(d=>d.green)),
		blue: Math.max(...draws.map(d=>d.blue)),
	}
}

function isPossible(bagCubes: Draw, gameDraws: Draw[]) {
    /* rules for impossibility
    1. any draw contains more of a color than the amount of that color in the bag
    */
	return !gameDraws.some(
		(draw) =>
			draw.red > bagCubes.red ||
			draw.green > bagCubes.green ||
			draw.blue > bagCubes.blue
	);
}

async function loadInput(filePath: string): Promise<Game[]> {
    const input = await fsp.readFile(filePath, {encoding: "utf-8"});
		const gameStrings = input.split('\n');
		return gameStrings.map(parseGameString);
}

function parseGameString(gameString: string): Game {
	const colonIndex = gameString.indexOf(':')
	const gameNumber = gameString.slice(5, colonIndex);
	const gameDrawsStrings = gameString.slice(colonIndex+1).split(';');
	return {
		num: Number.parseInt(gameNumber),
		draws: gameDrawsStrings.map(parseGameDraw),
		raw: gameString
	};
}

function parseGameDraw(drawString: string): Draw {
	const colorVals = drawString.split(',').map(colorVal => colorVal.trim());

	const draw: Draw = {
		red: 0,
		green: 0,
		blue: 0
	};

	for(const colorVal of colorVals) {
		const [countString, color] = colorVal.split(' ');
		const count = Number.parseInt(countString); 
		draw[color as "red" | "blue" | "green"] = count;
	}

	return draw;
}


part2();
