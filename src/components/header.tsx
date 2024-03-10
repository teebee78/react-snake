import preactLogo from "../assets/react.svg";
import styles from './header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>S N A K E</h1>
      <img src={preactLogo} className={styles.logo} alt="Preact logo" />
    </header>
  );
}
