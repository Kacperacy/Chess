import { Move } from "chess.js";
import { ColorType } from "./colorType.model";

export interface Promotion {
  isPromotion: boolean;
  color: ColorType | null;
  column: number | null;
  move: Move | null;
}
