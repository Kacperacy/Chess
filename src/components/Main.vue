<script setup lang="ts">
import { useBoardStore } from "../stores/board";
import { ColorType } from "../models/colorType.model";
import { ref } from "vue";
import Board from "./Board.vue";
import Highlights from "./Highlights.vue";
import SelectedSquare from "./SelectedPiece.vue";
import Pieces from "./Pieces.vue";
import PossibleMoves from "./PossibleMoves.vue";
import LastMove from "./LastMove.vue";
import GameResult from "./GameResult.vue";
import PawnPromotion from "./PawnPromotion.vue";

const store = useBoardStore();
const { changeHighlight, changeSelect, initBoard } = store;
const board = ref(null as unknown as HTMLElement);

initBoard();

function getPositionClicked(e: MouseEvent) {
  if (board.value == null) return;
  const boardRect = board.value.getBoundingClientRect();
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
  <div class="w-screen h-screen flex place-content-center bg-[#e28743]">
    <div
      ref="board"
      class="relative min-w-[800px] max-w-[800px] min-h-[800px] max-h-[800px] mt-[5%]"
      @click="select"
      @contextmenu="highlight"
    >
      <Board />
      <LastMove />
      <Highlights />
      <SelectedSquare />
      <Pieces />
      <PossibleMoves />
      <PawnPromotion v-if="store.isPromotion()" />
    </div>
    <GameResult v-if="!store.isGameOnGoing()" />
  </div>
</template>
