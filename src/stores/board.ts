import { defineStore } from "pinia";
import { Coordinates } from "../models/coordinates.model";
import { Piece } from "../models/piece.model";
import { Chess, Color, Move, PieceSymbol, Square } from "chess.js";
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

export const useBoardStore = defineStore("board", {
  state: () =>
    ({
      highlightList: [],
      selectedPiece: null,
      possibleMoves: [],
      chess: new Chess(),
      lastMove: [],
      gameResult: GameResultEnum.OnGoing,
      promotion: {
        isPromotion: false,
        color: null,
        column: null,
        move: null,
      },
    } as RootState),
  actions: {
    initBoard() {
      const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      this.gameResult = GameResultEnum.OnGoing;
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
    changeSelect(x: number, y: number) {
      this.clearHighlight();
      this.clearPromotion();

      const move = this.translateCoordinates(x, y);

      if (this.tryMove(x, y)) return;

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
    updatePossibleMoves() {
      this.clearPossibleMoves();

      if (this.selectedPiece == null) return;

      const square = this.translateCoordinates(
        this.selectedPiece.coordinates.x,
        this.selectedPiece.coordinates.y
      ) as Square;

      const moves = this.chess.moves({ square: square });

      moves.forEach((move) => {
        if (move == "O-O") {
          this.possibleMoves.push({ x: 7, y: 8 });
          return;
        }
        if (move == "O-O-O") {
          this.possibleMoves.push({ x: 3, y: 8 });
          return;
        }
        if (move == "o-o") {
          this.possibleMoves.push({ x: 3, y: 1 });
          return;
        }
        if (move == "o-o-o") {
          this.possibleMoves.push({ x: 7, y: 1 });
          return;
        }
        this.possibleMoves.push(this.translateMove(move));
      });
    },
    translateCoordinates(x: number, y: number) {
      let xValue = "";

      if (x == 1) xValue = "a";
      if (x == 2) xValue = "b";
      if (x == 3) xValue = "c";
      if (x == 4) xValue = "d";
      if (x == 5) xValue = "e";
      if (x == 6) xValue = "f";
      if (x == 7) xValue = "g";
      if (x == 8) xValue = "h";

      return xValue + (9 - y);
    },
    translateMove(move: string) {
      move = move.replace(/#|\+|=B|=N|=R|=Q/g, "");

      const moveSign = move.slice(-2);
      const x = moveSign[0];
      const coordinates = { y: 9 - Number(moveSign[1]) } as Coordinates;

      if (x == "a") coordinates.x = 1;
      if (x == "b") coordinates.x = 2;
      if (x == "c") coordinates.x = 3;
      if (x == "d") coordinates.x = 4;
      if (x == "e") coordinates.x = 5;
      if (x == "f") coordinates.x = 6;
      if (x == "g") coordinates.x = 7;
      if (x == "h") coordinates.x = 8;

      return coordinates;
    },
    tryMove(x: number, y: number) {
      if (this.selectedPiece == null) return false;

      const from = this.translateCoordinates(
        this.selectedPiece.coordinates.x,
        this.selectedPiece.coordinates.y
      );
      const to = this.translateCoordinates(x, y);

      const moves = this.chess.moves({ square: from as Square, verbose: true });
      const move = moves.find((obj) => obj.to == to);

      if (move != null) {
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

        this.movePiece();
        return true;
      }
      return false;
    },
    movePiece() {
      this.clearSelectedPiece();
      this.checkGameResult();
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

      this.checkGameResult();
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
          this.gameResult = GameResultEnum.DarkWon;
        } else if (turn == "b") {
          this.gameResult = GameResultEnum.LightWon;
        }
      } else if (this.chess.isInsufficientMaterial()) {
        this.gameResult = GameResultEnum.InsufficientMaterial;
      } else if (this.chess.isStalemate()) {
        this.gameResult = GameResultEnum.Stalemate;
      } else if (this.chess.isThreefoldRepetition()) {
        this.gameResult = GameResultEnum.Repetition;
      }
      // else if (this.gameState.halfMovesCount >= 100) {
      //   this.gameResult = GameResultEnum.Over50HalfMoves;
      // }
    },
    isGameOnGoing() {
      return this.gameResult == GameResultEnum.OnGoing;
    },
    isPromotion() {
      return this.promotion.isPromotion;
    },
    promote(piece: string) {
      if (this.promotion.move == null) return;
      console.log("x");

      const from = this.promotion.move["from"];
      const to = this.promotion.move["to"];

      this.chess.move({ from, to, promotion: piece });

      this.highlightLastMove(
        this.translateMove(this.promotion.move["from"]),
        this.translateMove(this.promotion.move["to"])
      );

      this.clearPromotion();
      this.movePiece();
    },
    clearPromotion() {
      this.promotion.isPromotion = false;
      this.promotion.color = null;
      this.promotion.column = null;
      this.promotion.move = null;
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
});
