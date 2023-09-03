<script setup lang="ts">
import { useBoardStore } from "../stores/board";
import { ref } from "vue";
import Board from "../components/board/Board.vue";
import Highlights from "../components/board/Highlights.vue";
import SelectedSquare from "../components/board/SelectedPiece.vue";
import Pieces from "../components/board/Pieces.vue";
import PossibleMoves from "../components/board/PossibleMoves.vue";
import LastMove from "../components/board/LastMove.vue";
import PawnPromotion from "../components/board/PawnPromotion.vue";
import GameResult from "../components/GameResult.vue";
import GameControls from "../components/gameControls/GameControls.vue";
import { storeToRefs } from "pinia";

const store = useBoardStore();
const { changeHighlight, changeSelectedSquare, initBoard } = store;
const { isDragged } = storeToRefs(store);
const board = ref<HTMLElement | null>(null);

initBoard();

function getPositionClicked(e: MouseEvent) {
  if (board.value == null) return;
  const boardRect = board.value.getBoundingClientRect();
  const offsetX = e.clientX - boardRect.left;
  const offsetY = e.clientY - boardRect.top;

  const squareSize = boardRect.width / 8;

  const x = Math.floor(offsetX / squareSize) + 1;
  const y = Math.floor(offsetY / squareSize) + 1;

  return { x, y };
}

function highlight(e: MouseEvent) {
  e.preventDefault();
  const clickedPos = getPositionClicked(e);
  if (clickedPos == null) return;
  changeHighlight(clickedPos.x, clickedPos.y);
}

function tryMove(e: MouseEvent) {
  e.preventDefault();
  const clickedPos = getPositionClicked(e);
  if (clickedPos == null) return;
  changeSelectedSquare(clickedPos.x, clickedPos.y);
}
</script>

<template>
  <div class="flex flex-row items-center justify-center w-full">
    <div
      ref="board"
      class="relative aspect-square w-[90vh] m-5 outline outline-2"
      @contextmenu="highlight"
    >
      <Board
        class="shadow-xl"
        :class="{ 'cursor-grabbing': isDragged }"
        @click="tryMove"
      />
      <LastMove />
      <Highlights />
      <SelectedSquare />
      <Pieces :board="board" />
      <PossibleMoves />
      <PawnPromotion v-if="store.isPromotion()" />
    </div>
    <GameControls class="ml-1 rounded-lg w-1/12 h-2/3 m-5 shadow-xl" />
    <GameResult v-if="store.gameResult != 'OnGoing'" />
  </div>
  <a
    href="https://github.com/Kacperacy/Chess"
    class="text-3xl mb-5 mt-2 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:text-[color:#333]"
    ><font-awesome-icon :icon="['fab', 'github']" />REPO</a
  >
</template>
