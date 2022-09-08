import { observer } from "mobx-react-lite";
import { store } from "../../app/store";
import { Count } from "../count/Count";

export const Timer = observer(() => {
  return (
    <Count count={store.timer ? Math.floor(store.timer.secondsPassed) : 0} />
  );
});
