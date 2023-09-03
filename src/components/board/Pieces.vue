<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import Piece from "./Piece.vue";
import { Piece as PieceModel } from "@/models/piece.model";
import { ref } from "vue";

const store = useBoardStore();
const props = defineProps<{ board: HTMLElement | null }>();

const draggedElement = ref<HTMLElement | null>(null);
const moveSkip = ref(false);

function isDraggable(piece: PieceModel) {
  return store.chess.turn() == piece.color;
}

function getPositionClicked(e: MouseEvent) {
  if (props.board == null) return;
  const boardRect = props.board.getBoundingClientRect();
  const offsetX = e.clientX - boardRect.left;
  const offsetY = e.clientY - boardRect.top;

  const squareSize = boardRect.width / 8;

  const x = Math.floor(offsetX / squareSize) + 1;
  const y = Math.floor(offsetY / squareSize) + 1;

  return { x, y };
}

function drag(e: MouseEvent, isDraggable: boolean) {
  e.preventDefault();
  if (e.button != 0) return;
  if (!isDraggable) return;
  if (props.board == null) return;

  const clickedPos = getPositionClicked(e);
  if (clickedPos == null) return;

  store.isDragged = true;
  draggedElement.value = e.target as HTMLElement;
  draggedElement.value.style.zIndex = "100";
  draggedElement.value.style.pointerEvents = "none";

  props.board.addEventListener("mousemove", move);
  props.board.addEventListener("mouseup", drop);
  store.changeSelectedSquare(clickedPos.x, clickedPos.y, true);
}

function move(e: MouseEvent) {
  if (moveSkip.value) {
    moveSkip.value = !moveSkip.value;
    return;
  }
  e.preventDefault();
  if (props.board == null) return;
  if (draggedElement.value == null) return;

  var board = props.board.getBoundingClientRect();

  if (
    e.clientX > board.left &&
    e.clientX < board.right &&
    e.clientY > board.top &&
    e.clientY < board.bottom
  ) {
    draggedElement.value.style.transform = `translate(${
      e.clientX - board.left - 75 + window.scrollX + "px" // 50 is half of the piece size (100px)
    }, ${e.clientY - board.top - 75 + window.scrollY + "px"})`;
  }
}

function drop(e: MouseEvent) {
  e.preventDefault();
  if (props.board == null) return;
  if (draggedElement.value == null) return;

  props.board.removeEventListener("mousemove", move);
  props.board.removeEventListener("mouseup", drop);

  const clickedPos = getPositionClicked(e);
  if (clickedPos == null) return;
  store.tryMove(clickedPos.x, clickedPos.y);

  draggedElement.value.style.transform = "";
  draggedElement.value.style.zIndex = "";
  draggedElement.value.style.pointerEvents = "";

  store.isDragged = false;
  draggedElement.value = null;
}
</script>

<template>
  <Piece
    v-for="(piece, index) in store.getBoard()"
    :key="index"
    :piece="piece"
    class="z-20"
    :class="[
      {
        'cursor-grab': isDraggable(piece),
        'pointer-events-none': store.isDragged,
      },
    ]"
    @mousedown="drag($event, isDraggable(piece))"
  />
</template>
