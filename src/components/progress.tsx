import styles from "./progress.module.css";

export default function Progress({
  value,
  goal,
}: {
  value: number;
  goal: number;
}) {
  return <progress className={styles.progress} value={value} max={goal} />;
}
