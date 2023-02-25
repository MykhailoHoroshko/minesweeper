import { action, computed, makeObservable, observable, reaction } from "mobx";
import { Cell } from "./cell";
import { Timer } from "./timer";

export enum GameType {
  easy,
  medium,
  hard,
  custom,
}

type GameOptions = {
  rows: number;
  columns: number;
  bombs: number;
};

const gameOptions: Record<GameType, GameOptions> = {
  [GameType.easy]: {
    rows: 9,
    columns: 9,
    bombs: 10,
  },
  [GameType.medium]: {
    rows: 16,
    columns: 16,
    bombs: 40,
  },
  [GameType.hard]: {
    rows: 16,
    columns: 30,
    bombs: 99,
  },
  [GameType.custom]: {
    rows: 16,
    columns: 30,
    bombs: 99,
  },
};

export const customGameOptions = gameOptions[GameType.custom];

class RootStore {
  cells: Cell[] = [];
  gameType: GameType | null = null;
  timer: Timer | null = null;
  initalPress = true;
  inProgress = false;
  winner: boolean | null = null;
  rows: number = 0;
  columns: number = 0;
  bombs: number = 0;

  constructor() {
    makeObservable(this, {
      cells: observable,
      gameType: observable,
      inProgress: observable,
      bombsLeft: computed,
      timer: observable,
      initalPress: observable,
      startGame: action,
      allCellsWithoutBombPressed: computed,
      winner: observable,
      rows: observable,
      columns: observable,
      bombs: observable,
      informWinner: action,
      informLooser: action,
    });

    reaction(
      () => this.allCellsWithoutBombPressed,
      (value) => {
        if (value) {
          this.informWinner();
        }
      }
    );
  }

  get allCellsWithoutBombPressed() {
    return (
      this.cells.length > 0 &&
      this.cells.filter((cell) => !cell.hasBomb).every((cell) => cell.pressed)
    );
  }

  get bombsLeft() {
    if (this.gameType === null) {
      return 0;
    }

    return this.bombs - this.cells.filter((cell) => cell.marked).length;
  }

  drawGrid() {
    this.cells = new Array(this.rows * this.columns)
      .fill(null)
      .map(() => new Cell());
  }

  assignBombs(ignoreCell: Cell) {
    const totalCells = this.rows * this.columns;

    const set = new Set();

    while (set.size < this.bombs) {
      const index = Math.floor(Math.random() * totalCells);
      if (ignoreCell !== this.cells[index]) {
        set.add(index);
      }
    }

    let prevRow: Cell[] | null = null;
    let row = this.cells.slice(0, this.columns);

    for (let i = 0; i < this.rows; i++) {
      let nextRow: Cell[] | null = null;

      if (i < this.rows - 1) {
        nextRow = this.cells.slice(
          (i + 1) * this.columns,
          (i + 2) * this.columns
        );
      }
      for (let j = 0; j < this.columns; j++) {
        const key = i * this.columns + j;
        const cell = this.cells[key];
        cell.hasBomb = set.has(key);

        if (prevRow) {
          if (prevRow[j - 1]) cell.neighbours.push(prevRow[j - 1]);
          cell.neighbours.push(prevRow[j]);
          if (prevRow[j + 1]) cell.neighbours.push(prevRow[j + 1]);
        }

        if (row[j - 1]) {
          cell.neighbours.push(row[j - 1]);
        }

        if (row[j + 1]) {
          cell.neighbours.push(row[j + 1]);
        }

        if (nextRow) {
          if (nextRow[j - 1]) cell.neighbours.push(nextRow[j - 1]);
          cell.neighbours.push(nextRow[j]);
          if (nextRow[j + 1]) cell.neighbours.push(nextRow[j + 1]);
        }
      }
      prevRow = row;
      if (nextRow) {
        row = nextRow;
      }
    }
  }

  initializeGame(ingoreCell: Cell) {
    this.initalPress = false;
    this.timer?.start();
    this.assignBombs(ingoreCell);
  }

  startGame(type: GameType, options?: GameOptions) {
    this.inProgress = true;
    this.gameType = type;
    this.winner = null;
    this.initalPress = true;
    this.timer?.stop();
    this.timer = new Timer();

    const { rows, columns, bombs } = options ?? gameOptions[type];
    this.rows = rows;
    this.columns = columns;
    this.bombs = bombs;

    this.drawGrid();
  }

  informWinner() {
    this.inProgress = false;
    this.winner = true;

    const passed = this.timer?.stop();
    setTimeout(() => {
      alert(`You win ${passed}sec`);
    });
  }

  informLooser() {
    this.inProgress = false;
    this.winner = false;

    this.cells.forEach((cell) => {
      if (cell.hasBomb) {
        cell.press();
      }
    });

    const passed = this.timer?.stop();
    setTimeout(() => {
      alert(`You lose ${passed}sec`);
    });
  }
}

export const store = new RootStore();
