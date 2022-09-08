import { action, computed, makeObservable, observable } from "mobx";

export type CellInitOptions = {
  hasBomb?: boolean;
};

export class Cell {
  pressed = false;
  hasBomb = false;
  marked = false;
  siblings: Cell[] = [];
  constructor(opts?: CellInitOptions) {
    makeObservable(this, {
      pressed: observable,
      hasBomb: observable,
      press: action,
      bombsAmount: computed,
      siblings: observable,
      marked: observable,
    });
    this.hasBomb = !!opts?.hasBomb;
  }

  press() {
    this.pressed = true;
    this.marked = false;

    if (this.bombsAmount === 0 && !this.hasBomb) {
      setTimeout(() => this.revealEmptySiblings());
    }
  }

  toggleMark() {
    this.marked = !this.marked;
  }

  get bombsAmount() {
    return this.siblings.filter((cell) => cell.hasBomb).length;
  }

  revealEmptySiblings() {
    this.siblings.forEach((cell) => {
      if (cell.pressed || cell.hasBomb) {
        return;
      }

      cell.press();
    });
  }
}
