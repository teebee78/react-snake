import { MovingDirection } from "../model";
import styles from "./compass.module.css";

export default function Compass({ direction }: { direction: MovingDirection }) {
  return (
    <div className={styles.compass}>
      <span className={styles.north}>N</span>
      <span className={styles.west}>W</span>
      <span className={styles.east}>E</span>
      <span className={styles.south}>S</span>
      <span className={styles.arrow + " " + classForDirection(direction)}>
        <>&uarr;</>
      </span>
    </div>
  );

  function classForDirection(direction: MovingDirection) {
    switch (direction) {
      case "NORTH":
        return styles.arrow_north;
      case "WEST":
        return styles.arrow_west;
      case "SOUTH":
        return styles.arrow_south;
      case "EAST":
        return styles.arrow_east;
    }
  }
}
