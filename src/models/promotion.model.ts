import { Color, Move } from "chess.js";

export interface Promotion {
  isPromotion: boolean;
  color: Color | null;
  column: number | null;
  move: Move | null;
}
