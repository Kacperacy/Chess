import { defineStore } from "pinia";
import { Coordinates } from "../models/coordinates.model";
import { Piece } from "../models/piece.model";
import { PieceType } from "../models/pieceType.model";
import { GameState } from "../models/gameState.model";
import { ColorType } from "../models/colorType.model";

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
        (this.selectedSquare == null ||
          !(this.selectedSquare.x == x && this.selectedSquare.y == y)) &&
        this.piecesList.find(
          (obj) => obj.coordinates.x == x && obj.coordinates.y == y
        )
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

      let pos: number = 0;

      rows.forEach((row) => {
        row.split("").forEach((letter) => {
          let num = Number(letter);
          if (Number.isNaN(num)) {
            let x = (pos % 8) + 1;
            let y = Math.floor(pos / 8) + 1;

            let piece = {
              color: (letter == letter.toUpperCase()
                ? ColorType.Light
                : ColorType.Dark) as ColorType,
              coordinates: { x, y } as Coordinates,
              type: null as unknown as PieceType,
            };

            if (letter.toLocaleLowerCase() == "p") piece.type = PieceType.Pawn;
            else if (letter.toLocaleLowerCase() == "b")
              piece.type = PieceType.Bishop;
            else if (letter.toLocaleLowerCase() == "n")
              piece.type = PieceType.Knight;
            else if (letter.toLocaleLowerCase() == "r")
              piece.type = PieceType.Rook;
            else if (letter.toLocaleLowerCase() == "q")
              piece.type = PieceType.Queen;
            else if (letter.toLocaleLowerCase() == "k")
              piece.type = PieceType.King;

            this.piecesList.push(piece);
            pos++;
          } else {
            pos += num;
          }
        });
      });
    },
  },
});
