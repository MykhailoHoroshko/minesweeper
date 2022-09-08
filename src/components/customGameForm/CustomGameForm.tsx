import { FormEventHandler } from "react";
import { customGameOptions, GameType, store } from "../../app/store";
import styles from "./CustomGameForm.module.css";

interface FormElements extends HTMLFormControlsCollection {
  rows: HTMLInputElement;
  columns: HTMLInputElement;
  bombs: HTMLInputElement;
}

export const CustomGameForm = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formElements = e.currentTarget.elements as FormElements;

    const rows = parseInt(formElements.rows.value, 10);
    const columns = parseInt(formElements.columns.value, 10);
    const bombs = parseInt(formElements.bombs.value, 10);

    if (rows * columns <= bombs) {
      alert("Bombs must be less then square count");
      return;
    }

    store.startGame(GameType.custom, {
      rows,
      columns,
      bombs,
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
        min={1}
      />
      <input
        className={styles.input}
        type="number"
        name="columns"
        id="columns"
        placeholder="Columns"
        defaultValue={customGameOptions.columns}
        min={1}
      />
      <input
        className={styles.input}
        type="number"
        name="bombs"
        id="bombs"
        placeholder="Bombs"
        defaultValue={customGameOptions.bombs}
        min={1}
        max={999}
      />
      <input className={styles.input} type="submit" />
    </form>
  );
};
