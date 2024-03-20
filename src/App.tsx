import "./App.css";
import Header from "./components/header";
import SnakeGame from "./components/snake-game";
import { level2 } from "./model";

//const level = level1();
const level = level2();

export function App() {
  return (
    <>
      <Header />
      <SnakeGame level={level}/>
    </>
  );
}
