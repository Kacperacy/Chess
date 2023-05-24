import { defineStore } from "pinia";
import { Coordinates } from "../models/coordinates.model";
import { Piece } from "../models/piece.model";
import { PieceType } from "../models/pieceType.model";
import { GameState } from "../models/gameState.model";
import { ColorType } from "../models/colorType.model";

export type RootState = {
  piecesList: Piece[];
  highlightList: Coordinates[];
  selectedPiece: Piece | null;
  gameState: GameState;
  possibleMoves: Coordinates[];
};

export const useBoardListStore = defineStore("board", {
  state: () =>
    ({
      piecesList: [],
      highlightList: [],
      selectedPiece: null as unknown as Piece,
      gameState: {
        turn: "w",
        castles: "KQkq",
        enpassant: "-",
        halfmovesCount: 0,
        movesCount: 1,
      } as GameState,
      possibleMoves: [],
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
      this.selectedPiece = null;
      this.clearPossibleMoves();
    },
    changeSelect(x: number, y: number) {
      this.clearHighlight();

      const piece = this.piecesList.find(
        (obj) => obj.coordinates.x == x && obj.coordinates.y == y
      );

      if (
        piece != null &&
        !(
          this.selectedPiece != null &&
          this.selectedPiece.coordinates.x == x &&
          this.selectedPiece.coordinates.y == y
        )
      )
        this.selectedPiece = piece;
      else this.selectedPiece = null;

      this.updatePossibleMoves();
    },
    clearHighlight() {
      this.highlightList = [];
    },
    clearPieces() {
      this.piecesList = [];
    },
    clearPossibleMoves() {
      this.possibleMoves = [];
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
    getFEN() {
      let fen = "";
      for (let y = 1; y < 9; y++) {
        let counter = 0;
        for (let x = 1; x < 9; x++) {
          const piece = this.piecesList.find(
            (obj) => obj.coordinates.x == x && obj.coordinates.y == y
          );

          if (piece == null) {
            counter++;
          } else {
            if (counter > 0) fen += counter;
            counter = 0;

            if (piece.color == ColorType.Light) fen += piece.type.toUpperCase();
            else fen += piece.type;
          }
        }
        if (counter > 0) fen += counter;

        if (y < 8) fen += "/";
      }

      fen += " " + this.gameState.turn;
      fen += " " + this.gameState.castles;
      fen += " " + this.gameState.enpassant;
      fen += " " + this.gameState.halfmovesCount;
      fen += " " + this.gameState.movesCount;

      return fen;
    },
    updatePossibleMoves() {
      this.clearPossibleMoves();

      if (this.selectedPiece == null) return;

      const x = this.selectedPiece.coordinates.x;
      const y = this.selectedPiece.coordinates.y;

      if (this.selectedPiece.type == PieceType.Pawn) {
        if (this.selectedPiece.color == ColorType.Light)
          this.possibleMoves.push(
            { x: x - 1, y: y - 1 },
            { x: x, y: y - 1 },
            { x: x + 1, y: y - 1 }
          );
        else
          this.possibleMoves.push(
            { x: x - 1, y: y + 1 },
            { x: x, y: y + 1 },
            { x: x + 1, y: y + 1 }
          );
      } else if (this.selectedPiece.type == PieceType.Bishop) {
        for (let i = 1; i < 8; i++) {
          this.possibleMoves.push(
            { x: x - i, y: y - i },
            { x: x + i, y: y - i },
            { x: x + i, y: y + i },
            { x: x - i, y: y + i }
          );
        }
      } else if (this.selectedPiece.type == PieceType.Knight) {
        this.possibleMoves.push(
          { x: x - 2, y: y - 1 },
          { x: x + 2, y: y - 1 },
          { x: x + 2, y: y + 1 },
          { x: x - 2, y: y + 1 },
          { x: x - 1, y: y - 2 },
          { x: x + 1, y: y - 2 },
          { x: x + 1, y: y + 2 },
          { x: x - 1, y: y + 2 }
        );
      } else if (this.selectedPiece.type == PieceType.Rook) {
        for (let i = 1; i < 8; i++) {
          this.possibleMoves.push(
            { x: x - i, y: y },
            { x: x + i, y: y },
            { x: x, y: y + i },
            { x: x, y: y - i }
          );
        }
      } else if (this.selectedPiece.type == PieceType.King) {
        this.possibleMoves.push(
          { x: x + 1, y: y },
          { x: x - 1, y: y },
          { x: x, y: y + 1 },
          { x: x, y: y - 1 },
          { x: x + 1, y: y + 1 },
          { x: x + 1, y: y - 1 },
          { x: x - 1, y: y + 1 },
          { x: x - 1, y: y - 1 }
        );
        // TODO: castling
      } else if (this.selectedPiece.type == PieceType.Queen) {
        for (let i = 1; i < 8; i++) {
          this.possibleMoves.push(
            { x: x - i, y: y },
            { x: x + i, y: y },
            { x: x, y: y + i },
            { x: x, y: y - i },
            { x: x - i, y: y - i },
            { x: x + i, y: y - i },
            { x: x + i, y: y + i },
            { x: x - i, y: y + i }
          );
        }
      }
      this.possibleMoves = this.possibleMoves.filter(
        (obj) => obj.x >= 1 && obj.x <= 8 && obj.y >= 1 && obj.y <= 8
      );
    },
  },
});
