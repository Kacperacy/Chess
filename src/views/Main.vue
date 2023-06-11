<script setup lang="ts">
import { useBoardStore } from "../stores/board";
import { ref } from "vue";
import Board from "../components/Board.vue";
import Highlights from "../components/Highlights.vue";
import SelectedSquare from "../components/SelectedPiece.vue";
import Pieces from "../components/Pieces.vue";
import PossibleMoves from "../components/PossibleMoves.vue";
import LastMove from "../components/LastMove.vue";
import GameResult from "../components/GameResult.vue";
import PawnPromotion from "../components/PawnPromotion.vue";

const store = useBoardStore();
const { changeHighlight, changeSelectedSquare, initBoard } = store;
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
  changeSelectedSquare(clickedPos.x, clickedPos.y);
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
    <GameResult v-if="store.gameResult != 'OnGoing'" />
  </div>
</template>
