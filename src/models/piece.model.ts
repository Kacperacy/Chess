import { Color, PieceSymbol, Square } from "chess.js";
import { Coordinates } from "./coordinates.model";

export interface Piece {
  type: PieceSymbol;
  color: Color;
  coordinates: Coordinates;
}
