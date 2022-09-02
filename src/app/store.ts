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
      stopGame: action,
      allCellsWithoutBombPressed: computed,
      winner: observable,
      rows: observable,
      columns: observable,
      bombs: observable,
    });

    reaction(
      () => this.allCellsWithoutBombPressed,
      (value) => {
        if (value) {
          this.stopGame(true);
        }
      }
    );

    this.startGame(GameType.easy);
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
    const totalCells = this.rows * this.columns;
    const cells: Cell[] = [];

    for (let i = 0; i < totalCells; i++) {
      cells.push(new Cell());
    }

    this.cells = cells;
  }

  assignBombs(ignoreCell: Cell) {
    const totalCells = this.rows * this.columns;

    const set = new Set();
    const grid: Cell[][] = [];

    while (set.size < this.bombs) {
      const index = Math.floor(Math.random() * totalCells);
      if (ignoreCell !== this.cells[index]) {
        set.add(index);
      }
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const key = i * this.columns + j;
        this.cells[key].hasBomb = set.has(key);
      }

      grid.push(this.cells.slice(i * this.columns, (i + 1) * this.columns));
    }

    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (i > 0) {
          if (row[j - 1]) cell.siblings.push(grid[i - 1][j - 1]);
          cell.siblings.push(grid[i - 1][j]);
          if (row[j + 1]) cell.siblings.push(grid[i - 1][j + 1]);
        }

        if (row[j - 1]) {
          cell.siblings.push(row[j - 1]);
        }

        if (row[j + 1]) {
          cell.siblings.push(row[j + 1]);
        }

        if (i < this.rows - 1) {
          if (row[j - 1]) cell.siblings.push(grid[i + 1][j - 1]);
          cell.siblings.push(grid[i + 1][j]);
          if (row[j + 1]) cell.siblings.push(grid[i + 1][j + 1]);
        }
      });
    });

    this.cells = grid.flat();
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

  stopGame(win: boolean) {
    this.inProgress = false;
    this.winner = win;

    if (!win) {
      this.cells.forEach((cell) => {
        if (cell.hasBomb) {
          cell.press();
        }
      });
    }

    const passed = this.timer?.stop();
    setTimeout(() => {
      alert(`You ${win ? "win" : "lose"} ${passed}sec`);
    });
  }
}

export const store = new RootStore();
