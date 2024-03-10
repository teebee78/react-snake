import "./App.css";
import Header from "./components/header";
import SnakeGame from "./components/snake-game";
import { level1 } from "./model";

const level = level1();

export function App() {
  return (
    <>
      <Header />
      <SnakeGame level={level}/>
    </>
  );
}
