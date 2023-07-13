import { Coordinates } from "./coordinates.model";
import { HighlightType } from "./highlightType.model";

export type PossibleMove = {
  coordinates: Coordinates;
  type: HighlightType;
};
