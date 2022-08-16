import { observer } from "mobx-react-lite";
import { store } from "../../app/store";
import { Count } from "../count/Count";

export const Timer = observer(() => {
  let count = 0;

  if (store.timer) {
    count = Math.floor(store.timer.secondsPassed);
  }
  return <Count count={count} />;
});
