import styles from "./Board.module.css";
import { Cell } from "../cell/Cell";
import { GameType, store } from "../../app/store";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import { CSSProperties } from "react";

export const Board = observer(() => {
  const customStyle: Record<GameType, CSSProperties | undefined> = {
    [GameType.custom]: {
      gridTemplateRows: `repeat(${store.rows}, 30px)`,
      gridTemplateColumns: `repeat(${store.columns}, 30px)`,
    },
    [GameType.easy]: undefined,
    [GameType.medium]: undefined,
    [GameType.hard]: undefined,
  };

  return (
    <div
      className={clsx(styles.Board, {
        [styles.easy]: store.gameType === GameType.easy,
        [styles.medium]: store.gameType === GameType.medium,
        [styles.hard]: store.gameType === GameType.hard,
      })}
      style={customStyle[store.gameType!]}
    >
      {store.cells.map((cell, i) => (
        <Cell key={i} cell={cell} />
      ))}
    </div>
  );
});
