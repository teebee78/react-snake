import { Snake, Field, MovingDirection, Position } from "./model";

export type GameState = {
  snake: Snake;
  food: Position[];
  status: "INITIAL" | "ON" | "OVER";
};

export function tick(
  map: Field[][],
  { snake, food, status }: GameState,
  direction: MovingDirection
): GameState {
  const newHead = move(snake[0], direction);
  if (!isValidSnakePosition(map, newHead) || bitesItself(newHead, snake)) {
    return { snake, food, status: "OVER" };
  }

  const newTail = snake.slice(0, -1); //includes the old head
  let newFood = food;
  if (food.find(([x, y]) => x === newHead[0] && y === newHead[1])) {
    newTail.push(newTail?.length ? newTail[newTail.length - 1] : newHead);
    newFood = [
      ...food.filter(([x, y]) => !(x === newHead[0] && y === newHead[1])),
      findRandomUnoccupiedPosition(map),
    ];
  }

  return {
    snake: [newHead, ...newTail],
    food: newFood,
    status,
  };
}

function move([x, y]: Position, direction: MovingDirection): Position {
  switch (direction) {
    case "NORTH":
      return [x, y - 1];
    case "WEST":
      return [x - 1, y];
    case "SOUTH":
      return [x, y + 1];
    case "EAST":
      return [x + 1, y];
  }
}

function isValidSnakePosition(map: Field[][], [x, y]: Position): boolean {
  return (
    x >= 0 &&
    y >= 0 &&
    y < map.length &&
    x < map[y].length &&
    map[y][x] === "VOID"
  );
}

function bitesItself(newHead: Position, previousSnake: Position[]): boolean {
  for (let index = 0; index < previousSnake.length -2; index++) {
    if (previousSnake[index][0] == newHead[0] && previousSnake[index][1] === newHead[1]) {
      return true;
    }
  }
  return false;
}

function findRandomUnoccupiedPosition(map: Field[][]): Position {
  let position: Position | undefined = undefined;
  do {
    position = [
      Math.floor(Math.random() * map.length),
      Math.floor(Math.random() * map[0].length),
    ];
  } while (isOccupied(position));
  return position;

  function isOccupied([x, y]: Position): boolean {
    return map[x][y] !== "VOID";
  }
}
