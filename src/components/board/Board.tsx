import styles from "./Board.module.css";
import { Cell } from "../cell/Cell";
import { store } from "../../app/store";
import { observer } from "mobx-react-lite";

export const Board = observer(() => {
  return (
    <div
      className={styles.Board}
      style={{
        gridTemplateRows: `repeat(${store.rows}, 30px)`,
        gridTemplateColumns: `repeat(${store.columns}, 30px)`,
      }}
    >
      {store.cells.map((cell, i) => (
        <Cell key={i} cell={cell} />
      ))}
    </div>
  );
});
