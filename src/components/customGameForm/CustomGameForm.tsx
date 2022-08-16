import { observer } from "mobx-react-lite";
import { FormEventHandler } from "react";
import { customGameOptions, GameType, store } from "../../app/store";
import styles from "./CustomGameForm.module.css";

interface FormElements extends HTMLFormControlsCollection {
  rows: HTMLInputElement;
  columns: HTMLInputElement;
  bombs: HTMLInputElement;
}

export const CustomGameForm = observer(() => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formElements = e.currentTarget.elements as FormElements;

    store.startGame(GameType.custom, {
      rows: parseInt(formElements.rows.value, 10),
      columns: parseInt(formElements.columns.value, 10),
      bombs: parseInt(formElements.bombs.value, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
      <input
        className={styles.input}
        type="number"
        name="rows"
        id="rows"
        placeholder="Rows"
        defaultValue={customGameOptions.rows}
      />
      <input
        className={styles.input}
        type="number"
        name="columns"
        id="columns"
        placeholder="Columns"
        defaultValue={customGameOptions.columns}
      />
      <input
        className={styles.input}
        type="number"
        name="bombs"
        id="bombs"
        placeholder="Bombs"
        defaultValue={customGameOptions.bombs}
      />
      <input className={styles.input} type="submit" />
    </form>
  );
});
