import { PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./Cell.module.css";
import { observer } from "mobx-react-lite";
import { Cell as CellClass } from "../../app/cell";
import { store } from "../../app/store";

interface Props extends PropsWithChildren {
  cell: CellClass;
}

export const Cell = observer(({ cell }: Props) => {
  return (
    <div
      className={clsx(styles.Cell, {
        [styles.pressed]: cell.pressed,
        [styles.boom]: cell.pressed && cell.hasBomb,
        [styles.marked]: cell.marked,
      })}
      onClick={() => {
        if (!store.inProgress) {
          return;
        }
        cell.press();

        if (store.initalPress) {
          store.initializeGame(cell);
          return;
        }

        if (cell.hasBomb) {
          store.informLooser();
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (!store.inProgress) {
          return;
        }
        cell.toggleMark();
      }}
    >
      {cell.pressed && !cell.hasBomb && cell.bombsAmount > 0 && (
        <p>{cell.bombsAmount}</p>
      )}
    </div>
  );
});
