import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { store } from "../../app/store";
import styles from "./NewGameButton.module.css";

export const NewGameButton = observer(() => {
  return (
    <button
      className={clsx(styles.root, {
        [styles.winner]: store.winner,
        [styles.loser]: store.winner === false,
      })}
      onClick={() => {
        store.startGame(store.gameType!, {
          rows: store.rows,
          columns: store.columns,
          bombs: store.bombs,
        });
      }}
    ></button>
  );
});
