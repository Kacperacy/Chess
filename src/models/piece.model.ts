import { Coordinates } from "./coordinates.model";

export interface Piece {
  type: string;
  color: string;
  coordinates: Coordinates;
}
