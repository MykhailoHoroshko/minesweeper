import { action, computed, makeObservable, observable } from "mobx";

export class Cell {
  pressed = false;
  hasBomb = false;
  marked = false;
  neighbours: Cell[] = [];
  constructor() {
    makeObservable(this, {
      pressed: observable,
      hasBomb: observable,
      press: action,
      bombsAmount: computed,
      neighbours: observable,
      marked: observable,
    });
  }

  press() {
    this.pressed = true;
    this.marked = false;

    if (this.bombsAmount === 0 && !this.hasBomb) {
      setTimeout(() => this.revealEmptyNeighbours());
    }
  }

  toggleMark() {
    this.marked = !this.marked;
  }

  get bombsAmount() {
    return this.neighbours.filter((cell) => cell.hasBomb).length;
  }

  revealEmptyNeighbours() {
    this.neighbours.forEach((cell) => {
      if (cell.pressed || cell.hasBomb) {
        return;
      }

      cell.press();
    });
  }
}
