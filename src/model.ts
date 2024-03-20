import { findRandomUnoccupiedPosition } from "./snake-game";

export type Level = {
  map: Field[][];
  name: string;
  number: number;
  initialSnake: Snake;
  initialFood: Position[];
  winLength: number;
  replaceFood: boolean;
};

export type MovingDirection = "NORTH" | "WEST" | "SOUTH" | "EAST";

export type Field = "VOID" | "WALL" | "WATER";

export type Position = [number, number];

export type Snake = Position[];

export function level1(): Level {
  const dimension = 75;
  const fields: Field[][] = new Array(dimension)
    .fill(null)
    .map((_) => new Array(dimension).fill("VOID"));

  for (let x = 10; x <= 20; x++) {
    for (let y = 10; y <= 15; y++) {
      fields[y][x] = "WATER";
    }
  }

  for (let x = 15; x <= 30; x++) {
    for (let y = 30; y <= 35; y++) {
      fields[y][x] = "WALL";
    }
  }

  const initialSnake: Position[] = new Array(5).fill([35, 12]);

  return {
    map: fields,
    name: "intro",
    number: 1,
    initialSnake,
    initialFood: [
      [45, 45],
      [45, 50],
      [50, 45],
      [50, 50],
    ],
    winLength: 25,
    replaceFood: true,
  };
}

export function level2(): Level {
  const dimension = 50;
  const map: Field[][] = new Array(dimension)
    .fill(null)
    .map(() => new Array(dimension).fill("VOID"));

  for (let xStart = 10; xStart < dimension - 10; xStart += 20) {
    for (let yStart = 10; yStart < dimension - 10; yStart += 20) {
      for (let x = xStart; x < xStart + 10; x++) {
        for (let y = yStart; y < yStart + 10; y++) {
          map[y][x] = "WATER";
        }
      }
    }
  }

  const initialSnake: Position[] = new Array(50).fill([25, 25]);
  const initialFood = new Array(75)
    .fill(1)
    .map(() => findRandomUnoccupiedPosition(map));

  return {
    map,
    name: "eat them all",
    number: 2,
    initialSnake,
    winLength: initialSnake.length + initialFood.length,
    initialFood,
    replaceFood: false,
  };
}
