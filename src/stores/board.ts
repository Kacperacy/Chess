import { defineStore } from "pinia";
import { Coordinates } from "../models/coordinates.model";
import { Piece } from "../models/piece.model";
import { GameState } from "../models/gameState.model";

export type RootState = {
  piecesList: Piece[];
  highlightList: Coordinates[];
  selectedSquare: Coordinates | null;
  gameState: GameState;
};

export const useBoardListStore = defineStore("board", {
  state: () =>
    ({
      piecesList: [],
      highlightList: [],
      selectedSquare: null as unknown as Coordinates,
      gameState: {
        turn: "w",
        castles: "KQkq",
        enpassant: "-",
        halfmovesCount: 0,
        movesCount: 1,
      } as GameState,
    } as RootState),
  actions: {
    changeHighlight(x: number, y: number) {
      const highlight = this.highlightList.find(
        (obj) => obj.x == x && obj.y == y
      );
      if (highlight) {
        this.highlightList = this.highlightList.filter(
          (obj) => obj.x != x || obj.y != y
        );
      } else {
        this.highlightList.push({ x, y });
      }
      this.selectedSquare = null;
    },
    changeSelect(x: number, y: number) {
      this.clearHighlight();
      if (
        this.selectedSquare == null ||
        !(this.selectedSquare.x == x && this.selectedSquare.y == y)
      )
        this.selectedSquare = { x, y };
      else this.selectedSquare = null;
    },
    clearHighlight() {
      this.highlightList = [];
    },
    clearPieces() {
      this.piecesList = [];
    },
    loadFEN(fen: string) {
      this.clearPieces();

      let rows = fen.split("/");
      const config = rows[7].split(" ");
      rows[7] = config.shift() as string;
      this.gameState.turn = config.shift() as string;
      this.gameState.castles = config.shift() as string;
      this.gameState.enpassant = config.shift() as string;
      this.gameState.halfmovesCount = Number(config.shift());
      this.gameState.movesCount = Number(config.shift());
      console.log(rows);
      console.log(this.gameState);
    },
  },
});
