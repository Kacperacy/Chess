import { defineStore } from "pinia";
import { Coordinates } from "../models/coordinates.model";
import { Piece } from "../models/piece.model";
import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { GameResultEnum } from "../models/gameResultEnum.model";
import { Promotion } from "../models/promotion.model";

export type RootState = {
  highlightList: Coordinates[];
  lastMove: Coordinates[];
  selectedPiece: Piece | null;
  possibleMoves: Coordinates[];
  chess: Chess;
  gameResult: GameResultEnum;
  promotion: Promotion;
};

// prettier-ignore
// eslint-disable-next-line
const coordinatesMove : Record<number, Square> = {
  11: "a8", 21: "b8", 31: "c8", 41: "d8", 51: "e8", 61: "f8", 71: "g8", 81: "h8",
  12: "a7", 22: "b7", 32: "c7", 42: "d7", 52: "e7", 62: "f7", 72: "g7", 82: "h7",
  13: "a6", 23: "b6", 33: "c6", 43: "d6", 53: "e6", 63: "f6", 73: "g6", 83: "h6",
  14: "a5", 24: "b5", 34: "c5", 44: "d5", 54: "e5", 64: "f5", 74: "g5", 84: "h5",
  15: "a4", 25: "b4", 35: "c4", 45: "d4", 55: "e4", 65: "f4", 75: "g4", 85: "h4",
  16: "a3", 26: "b3", 36: "c3", 46: "d3", 56: "e3", 66: "f3", 76: "g3", 86: "h3",
  17: "a2", 27: "b2", 37: "c2", 47: "d2", 57: "e2", 67: "f2", 77: "g2", 87: "h2",
  18: "a1", 28: "b1", 38: "c1", 48: "d1", 58: "e1", 68: "f1", 78: "g1", 88: "h1"
}

export const useBoardStore = defineStore("board", {
  state: () =>
    ({
      highlightList: [],
      selectedPiece: null,
      possibleMoves: [],
      chess: new Chess(),
      lastMove: [],
      gameResult: "OnGoing",
      promotion: {
        isPromotion: false,
        color: null,
        column: null,
        move: null,
      },
    } as RootState),
  actions: {
    clearHighlight() {
      this.highlightList = [];
    },
    clearLastMove() {
      this.lastMove = [];
    },
    clearPossibleMoves() {
      this.possibleMoves = [];
    },
    clearSelectedPiece() {
      this.selectedPiece = null;
      this.clearPossibleMoves();
    },
    clearPromotion() {
      this.promotion.isPromotion = false;
      this.promotion.color = null;
      this.promotion.column = null;
      this.promotion.move = null;
    },
    initBoard() {
      const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      this.gameResult = "OnGoing";
      this.clearLastMove();
      this.clearHighlight();
      this.clearPromotion();
      this.clearSelectedPiece();
      this.chess.clear();
      this.chess.load(fen);
    },
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

      this.clearSelectedPiece();
    },
    changeSelectedSquare(x: number, y: number) {
      this.clearHighlight();
      this.clearPromotion();
      this.clearPossibleMoves();

      if (this.tryMove(x, y)) return;

      const move = this.translateCoordinates(x, y);
      const piece = this.chess
        .board()
        .flat()
        .find((obj) => obj?.square == move);

      if (
        piece != null &&
        piece.color == "w" &&
        !(
          this.selectedPiece != null &&
          this.selectedPiece.coordinates.x == x &&
          this.selectedPiece.coordinates.y == y
        )
      ) {
        this.selectedPiece = {
          color: piece.color,
          type: piece.type,
          coordinates: this.translateMove(piece.square),
        };
      } else this.clearSelectedPiece();

      this.updatePossibleMoves();
    },
    updatePossibleMoves() {
      this.clearPossibleMoves();

      if (this.selectedPiece == null) return;

      const square = this.translateCoordinates(
        this.selectedPiece.coordinates.x,
        this.selectedPiece.coordinates.y
      );

      const moves = this.chess.moves({ square: square });

      if (moves.includes("O-O")) {
        this.possibleMoves.push({ x: 7, y: 8 });
        moves.splice(moves.indexOf("O-O"), 1);
      }
      if (moves.includes("O-O-O")) {
        this.possibleMoves.push({ x: 3, y: 8 });
        moves.splice(moves.indexOf("O-O-O"), 1);
      }
      if (moves.includes("o-o")) {
        this.possibleMoves.push({ x: 3, y: 1 });
        moves.splice(moves.indexOf("o-o"), 1);
      }
      if (moves.includes("o-o-o")) {
        this.possibleMoves.push({ x: 7, y: 1 });
        moves.splice(moves.indexOf("o-o-o"), 1);
      }

      moves.forEach((move) => {
        this.possibleMoves.push(this.translateMove(move));
      });
    },
    translateCoordinates(x: number, y: number) {
      return coordinatesMove[Number(x + "" + y)];
    },
    translateMove(move: string) {
      move = move.replace(/#|\+|=B|=N|=R|=Q/g, "");

      const moveSign = move.slice(-2);
      const x = moveSign[0];
      const coordinates = { y: 9 - Number(moveSign[1]) } as Coordinates;

      if (x == "a") coordinates.x = 1;
      else if (x == "b") coordinates.x = 2;
      else if (x == "c") coordinates.x = 3;
      else if (x == "d") coordinates.x = 4;
      else if (x == "e") coordinates.x = 5;
      else if (x == "f") coordinates.x = 6;
      else if (x == "g") coordinates.x = 7;
      else if (x == "h") coordinates.x = 8;

      return coordinates;
    },
    tryMove(x: number, y: number) {
      if (this.selectedPiece == null) return false;

      const from = this.translateCoordinates(
        this.selectedPiece.coordinates.x,
        this.selectedPiece.coordinates.y
      );
      const to = this.translateCoordinates(x, y);

      const moves = this.chess.moves({ square: from, verbose: true });
      const move = moves.find((obj) => obj.to == to);

      if (move == null) return false;

      if (move.san.includes("=")) {
        this.promotion.isPromotion = true;
        this.promotion.color = this.chess.turn();
        this.promotion.column = x;
        this.promotion.move = move;
        return true;
      }

      this.chess.move({ from, to });
      this.highlightLastMove(
        this.translateMove(move["from"]),
        this.translateMove(move["to"])
      );
      this.clearSelectedPiece();

      this.moveEnemyPiece();
      return true;
    },
    moveEnemyPiece() {
      if (!this.isGameOnGoing()) return;

      const moves = this.chess.moves({ verbose: true });
      const move = moves[Math.floor(Math.random() * moves.length)];
      this.chess.move(move);

      this.clearPossibleMoves();

      if (move != null)
        this.highlightLastMove(
          this.translateMove(move["from"]),
          this.translateMove(move["to"])
        );

      if (!this.isGameOnGoing()) return;
    },
    highlightLastMove(from: Coordinates, to: Coordinates) {
      this.clearLastMove();
      this.lastMove.push(from, to);
    },
    checkGameResult() {
      if (this.chess.isCheckmate()) {
        const turn = this.chess.turn();
        if (turn == "w") {
          this.gameResult = "DarkWon";
        } else if (turn == "b") {
          this.gameResult = "LightWon";
        }
      } else if (this.chess.isInsufficientMaterial()) {
        this.gameResult = "InsufficientMaterial";
      } else if (this.chess.isStalemate()) {
        this.gameResult = "Stalemate";
      } else if (this.chess.isThreefoldRepetition()) {
        this.gameResult = "Repetition";
      } else if (this.halfMoves >= 100) {
        this.gameResult = "Over50HalfMoves";
      }
    },
    isGameOnGoing() {
      this.checkGameResult();
      return this.gameResult == "OnGoing";
    },
    isPromotion() {
      return this.promotion.isPromotion;
    },
    promote(piece: string) {
      if (this.promotion.move == null) return;

      const from = this.promotion.move["from"];
      const to = this.promotion.move["to"];

      this.chess.move({ from, to, promotion: piece });

      this.highlightLastMove(
        this.translateMove(this.promotion.move["from"]),
        this.translateMove(this.promotion.move["to"])
      );

      this.clearPromotion();
      this.moveEnemyPiece();
    },
    getBoard() {
      return this.chess
        .board()
        .flat()
        .filter(
          (obj): obj is { square: Square; type: PieceSymbol; color: Color } =>
            !!obj
        )
        .map((obj): Piece => {
          return {
            coordinates: this.translateMove(obj.square),
            color: obj.color,
            type: obj.type,
          };
        });
    },
  },
  getters: {
    halfMoves(): number {
      return Number(this.chess.fen().split(" ").at(-2));
    },
  },
});
