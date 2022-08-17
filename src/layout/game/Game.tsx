import { observer } from "mobx-react-lite";
import { PropsWithChildren, useEffect } from "react";
import { GameType, store } from "../../app/store";
import { Board } from "../../components/board/Board";
import { BombsLeft } from "../../components/bombsLeft/BombsLeft";
import { NewGameButton } from "../../components/newGameButton/NewGameButton";
import { Timer } from "../../components/timer/Timer";
import "./Game.css";

export interface Props extends PropsWithChildren {
  type: GameType;
}

export const Game = observer(({ type }: Props) => {
  useEffect(() => {
    store.startGame(type);
  }, [type]);

  return (
    <div className="Game">
      <header className="Game__header">
        <div className="bombs_counter">
          <BombsLeft />
        </div>
        <div className="new_game">
          <NewGameButton />
        </div>
        <div className="timer">
          <Timer />
        </div>
      </header>
      <div className="Game__content">
        <Board />
      </div>
    </div>
  );
});
