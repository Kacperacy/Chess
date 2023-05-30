import { defineStore } from "pinia";
import { Coordinates } from "../models/coordinates.model";
import { Piece } from "../models/piece.model";
import { PieceType } from "../models/pieceType.model";
import { GameState } from "../models/gameState.model";
import { ColorType } from "../models/colorType.model";
import { Chess, Move, Square } from "chess.js";

export type RootState = {
  piecesList: Piece[];
  highlightList: Coordinates[];
  lastMove: Coordinates[];
  selectedPiece: Piece | null;
  gameState: GameState;
  possibleMoves: Coordinates[];
  chess: Chess;
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
      chess: new Chess(),
      lastMove: [],
    } as RootState),
  actions: {
    initBoard() {
      const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      this.chess.clear();
      this.chess.load(fen);
      this.loadFEN(fen);
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
      this.selectedPiece = null;
      this.clearPossibleMoves();
    },
    changeSelect(x: number, y: number) {
      this.clearHighlight();

      if (this.tryMove(x, y)) return;

      const piece = this.piecesList.find(
        (obj) => obj.coordinates.x == x && obj.coordinates.y == y
      );

      if (
        piece != null &&
        piece.color == ColorType.Light &&
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
    clearLastMove() {
      this.lastMove = [];
    },
    clearPieces() {
      this.piecesList = [];
    },
    clearPossibleMoves() {
      this.possibleMoves = [];
    },
    loadFEN(fen: string) {
      this.clearPieces();
      this.clearHighlight();
      this.clearLastMove();
      this.clearPossibleMoves();

      const rows = fen.split("/");
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
          const num = Number(letter);
          if (Number.isNaN(num)) {
            const x = (pos % 8) + 1;
            const y = Math.floor(pos / 8) + 1;

            const piece = {
              color: (letter == letter.toUpperCase()
                ? ColorType.Light
                : ColorType.Dark) as ColorType,
              coordinates: { x, y } as Coordinates,
              type: null as unknown as PieceType,
            };

            if (letter.toLowerCase() == "p") piece.type = PieceType.Pawn;
            else if (letter.toLowerCase() == "b") piece.type = PieceType.Bishop;
            else if (letter.toLowerCase() == "n") piece.type = PieceType.Knight;
            else if (letter.toLowerCase() == "r") piece.type = PieceType.Rook;
            else if (letter.toLowerCase() == "q") piece.type = PieceType.Queen;
            else if (letter.toLowerCase() == "k") piece.type = PieceType.King;

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
        this.chess.move({ from, to });
        this.movePiece();
        return true;
      }
      return false;
    },
    movePiece() {
      if (this.chess.isGameOver()) {
        this.chess.reset();
        this.loadFEN(this.chess.fen());
        return;
      }

      const moves = this.chess.moves({ verbose: true });
      const move = moves[Math.floor(Math.random() * moves.length)];
      this.chess.move(move);
      this.loadFEN(this.chess.fen());

      this.selectedPiece = null;
      this.clearPossibleMoves();

      if (move != null)
        this.highlightLastMove(
          this.translateMove(move["from"]),
          this.translateMove(move["to"])
        );

      if (this.chess.isGameOver()) {
        this.chess.reset();
        this.loadFEN(this.chess.fen());
        return;
      }
    },
    highlightLastMove(from: Coordinates, to: Coordinates) {
      this.clearLastMove();
      this.lastMove.push(from, to);
    },
  },
});
