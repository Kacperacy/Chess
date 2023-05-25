<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardListStore } from "../stores/board";
import { Chess } from "chess.ts";
import Board from "./Board.vue";
import Highlights from "./Highlights.vue";
import SelectedSquare from "./SelectedPiece.vue";
import Pieces from "./Pieces.vue";
import PossibleMoves from "./PossibleMoves.vue";

const store = useBoardListStore();
const { highlightList, piecesList } = storeToRefs(store);
const { changeHighlight, changeSelect, loadFEN } = store;

loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

function getPositionClicked(e: MouseEvent) {
  const board: HTMLElement | null = document.getElementById("board");
  if (!board) return;
  const boardRect = board.getBoundingClientRect();
  const offsetX = e.clientX - boardRect.left;
  const offsetY = e.clientY - boardRect.top;

  const x = Math.floor(offsetX / 100) + 1;
  const y = Math.floor(offsetY / 100) + 1;

  return { x, y };
}

function highlight(e: MouseEvent) {
  e.preventDefault();
  const clickedPos = getPositionClicked(e);
  if (clickedPos == null) return;
  changeHighlight(clickedPos.x, clickedPos.y);
}

function select(e: MouseEvent) {
  e.preventDefault();
  const clickedPos = getPositionClicked(e);
  if (clickedPos == null) return;
  changeSelect(clickedPos.x, clickedPos.y);
}
</script>

<template>
  <div class="w-full h-full flex place-content-center">
    <div
      id="board"
      class="relative w-[800px] h-[800px]"
      @click="select($event)"
      @contextmenu="highlight($event)"
    >
      <Board />
      <Highlights />
      <SelectedSquare />
      <Pieces />
      <PossibleMoves />
    </div>
  </div>
</template>
