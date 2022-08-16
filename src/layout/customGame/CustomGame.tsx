import { GameType } from "../../app/store";
import { CustomGameForm } from "../../components/customGameForm/CustomGameForm";
import { Game } from "../game/Game";
import "./CustomGame.css";

export const CustomGame = () => {
  return (
    <div>
      <CustomGameForm />
      <Game type={GameType.custom} />
    </div>
  );
};
