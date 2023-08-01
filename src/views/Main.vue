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
import RestartButton from "../components/RestartButton.vue";

const store = useBoardStore();
const { changeHighlight, changeSelectedSquare, initBoard } = store;
const board = ref(null as unknown as HTMLElement);

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

function select(e: MouseEvent) {
  e.preventDefault();
  const clickedPos = getPositionClicked(e);
  if (clickedPos == null) return;
  changeSelectedSquare(clickedPos.x, clickedPos.y);
}
</script>

<template>
  <div class="flex flex-row items-center justify-center w-full pt-[5vh]">
    <div
      ref="board"
      class="relative aspect-square w-[90vh]"
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
    <div class="ml-10 flex items-center justify-center right-[10vw] w-1/12">
      <RestartButton class="w-full h-12" />
    </div>
    <GameResult v-if="store.gameResult != 'OnGoing'" />
  </div>
  <a
    href="https://github.com/Kacperacy/Chess"
    class="fa fa-github text-2xl mb-5 mt-5 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:text-[color:#333]"
    >Repository</a
  >
</template>
