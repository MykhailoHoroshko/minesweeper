import { observer } from "mobx-react-lite";
import { store } from "../../app/store";
import { Count } from "../count/Count";

export const BombsLeft = observer(() => {
  return <Count count={store.bombsLeft} />;
});
