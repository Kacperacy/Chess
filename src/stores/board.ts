import { defineStore } from "pinia";
import { Coordinates } from "../models/coordinates.model";
import { Piece } from "../models/piece.model";

export type RootState = {
  piecesList: Piece[];
  highlightList: Coordinates[];
  selectedSquare: Coordinates | null;
};

export const useBoardListStore = defineStore("board", {
  state: () =>
    ({
      piecesList: [],
      highlightList: [],
      selectedSquare: null as unknown as Coordinates,
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
      this.selectedSquare = null;
    },
    changeSelect(x: number, y: number) {
      this.clearHighlight();
      if (
        this.selectedSquare == null ||
        !(this.selectedSquare.x == x && this.selectedSquare.y == y)
      )
        this.selectedSquare = { x, y };
      else this.selectedSquare = null;
    },
    clearHighlight() {
      this.highlightList = [];
    },
  },
});
