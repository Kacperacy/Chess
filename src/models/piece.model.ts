import { ColorType } from "./colorType.model";
import { Coordinates } from "./coordinates.model";
import { PieceType } from "./pieceType.model";

export interface Piece {
  type: PieceType;
  color: ColorType;
  coordinates: Coordinates;
}
