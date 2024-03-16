import { useCallback, useEffect, useRef, useState } from "react";
import { Field, Level, MovingDirection, Position, Snake } from "../model";
import Modal from "./modal";
import styles from "./snake-game.module.css";
import { tick } from "../snake-game";
import Compass from "./compass";

export default function SnakeGame({ level }: { level: Level }) {
  const [{ snake, food, status }, setState] = useState<{
    snake: Snake;
    food: Position[];
    status: "INITIAL" | "ON" | "OVER";
  }>({ snake: level.initialSnake, food: level.initialFood, status: "INITIAL" });

  const movingDirectionRef = useRef<MovingDirection | undefined>();
  const tickCountRef = useRef(0);

  function onChangeMovingDirectionHandler({
    key,
  }: React.KeyboardEvent<HTMLElement>): void {
    if (key === "Enter") {
      handleTick();
      return;
    }
    const newMovingDirection = deriveMovingDirection(key);
    if (
      !newMovingDirection ||
      newMovingDirection === movingDirectionRef.current
    ) {
      return;
    }
    if (status === "INITIAL") {
      setState((current) => ({ ...current, status: "ON" }));
    }
    if (
      newMovingDirection &&
      newMovingDirection !== movingDirectionRef.current
    ) {
      movingDirectionRef.current = newMovingDirection;
    }
  }

  function handleGameOverModalClose() {
    setState(() => ({
      snake: level.initialSnake,
      food: level.initialFood,
      status: "INITIAL",
    }));
  }

  const handleTick = useCallback(
    function handleTick(): void {
      setState((currentState) => {
        if (!movingDirectionRef.current) {
          throw new Error("Moving Direction must be defined on a tick");
        }

        tickCountRef.current++;

        return tick(level.map, currentState, movingDirectionRef.current);
      });
    },
    [level.map]
  );

  useEffect(() => {
    console.log("using effect", movingDirectionRef.current);
    let intervalId: number | undefined = undefined;
    if (status === "ON") {
      intervalId = setInterval(() => handleTick(), 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [status, movingDirectionRef, handleTick]);

  return (
    <>
      <Modal open={status === "OVER"} onClose={handleGameOverModalClose}>
        <h1>Game Over</h1>
      </Modal>
      <h2>
        {level.number} - {level.name}
      </h2>
      <table
        className={styles.map}
        onKeyDown={(event) => onChangeMovingDirectionHandler(event)}
        cellPadding={0}
        tabIndex={0}
      >
        <tbody>
          {level.map.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => {
                  const clazz = classesForPosition(
                    [colIndex, rowIndex],
                    snake,
                    food,
                    col
                  );
                  return (
                    <td key={colIndex}>
                      <div className={clazz}></div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.footer}>
        {movingDirectionRef.current && (
          <Compass
            direction={movingDirectionRef.current}
          />
        )}

        <div>
          {tickCountRef.current}-{snake.length}
        </div>

        {movingDirectionRef.current && (
          <button onClick={handleTick}>Tick!</button>
        )}
      </div>
    </>
  );
}

function classesForPosition(
  [x, y]: Position,
  snake: Position[],
  food: Position[],
  field: Field
): string | undefined {
  if (snake.some(([snakeX, snakeY]) => x === snakeX && y === snakeY)) {
    return styles.snake;
  }
  if (food.some(([foodX, foodY]) => x === foodX && y === foodY)) {
    return styles.berry;
  }
  return classesForField(field);
}

function classesForField(field: Field): string | undefined {
  switch (field) {
    case "WALL":
      return styles.wall;
    case "WATER":
      return styles.water;
    default:
      return undefined;
  }
}

function deriveMovingDirection(key: string): MovingDirection | undefined {
  switch (key) {
    case "ArrowUp":
      return "NORTH";
    case "ArrowDown":
      return "SOUTH";
    case "ArrowLeft":
      return "WEST";
    case "ArrowRight":
      return "EAST";
    default:
      return undefined;
  }
}
