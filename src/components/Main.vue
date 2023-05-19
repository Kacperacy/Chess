<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardListStore } from "../stores/board";
import Board from "./Board.vue";

const store = useBoardListStore();

const { highlightList, piecesList } = storeToRefs(store);

const { changeHighlight, changeSelect, loadFEN } = store;

store.loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

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
      <div
        v-for="highlight in highlightList"
        class="absolute top-0 left-0 w-[12.5%] h-[12.5%] bg-opacity-80 bg-[color:red] transform"
        :class="
          'translate-x-[' +
          (highlight.x - 1) * 100 +
          '%] translate-y-[' +
          (highlight.y - 1) * 100 +
          '%]'
        "
      ></div>
      <div
        v-if="store.selectedSquare != null"
        class="absolute top-0 left-0 w-[12.5%] h-[12.5%] bg-opacity-50 bg-[color:yellow] transform"
        :class="
          'translate-x-[' +
          (store.selectedSquare.x - 1) * 100 +
          '%] translate-y-[' +
          (store.selectedSquare.y - 1) * 100 +
          '%]'
        "
      ></div>
      <div class="dark-pawn absolute top-0 left-0 w-[12.5%] h-[12.5%]"></div>
      <div
        class="dark-bishop absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[100%]"
      ></div>
      <div
        class="dark-knight absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[200%]"
      ></div>
      <div
        class="dark-rook absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[300%]"
      ></div>
      <div
        class="dark-king absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[400%]"
      ></div>
      <div
        class="dark-queen absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[500%]"
      ></div>

      <div
        class="light-pawn absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-y-[700%]"
      ></div>
      <div
        class="light-bishop absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[100%] translate-y-[700%]"
      ></div>
      <div
        class="light-knight absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[200%] translate-y-[700%]"
      ></div>
      <div
        class="light-rook absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[300%] translate-y-[700%]"
      ></div>
      <div
        class="light-king absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[400%] translate-y-[700%]"
      ></div>
      <div
        class="light-queen absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[500%] translate-y-[700%]"
      ></div>
    </div>
  </div>
</template>
