<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import Piece from "./Piece.vue";
import { Piece as PieceModel } from "@/models/piece.model";
import { ref } from "vue";

const store = useBoardStore();
const props = defineProps<{ board: HTMLElement | null }>();
const draggedElement = ref<HTMLElement | null>(null);
const draggedPiece = ref<PieceModel | null>(null);
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

function drag(e: MouseEvent, piece: PieceModel) {
  e.preventDefault();
  draggedPiece.value = piece;
  draggedElement.value = e.target as HTMLElement;

  if (props.board == null) return;

  props.board.addEventListener("mousemove", move);
  props.board.addEventListener("mouseup", drop);

  store.changeSelectedSquare(piece.coordinates.x, piece.coordinates.y);
}

function move(e: MouseEvent) {
  if (moveSkip.value) {
    moveSkip.value = !moveSkip.value;
    return;
  }
  e.preventDefault();
  if (props.board == null) return;
  if (draggedPiece.value == null) return;
  if (draggedElement.value == null) return;

  var board = props.board.getBoundingClientRect();

  draggedElement.value.style.left =
    e.clientX - board.left - draggedElement.value.offsetWidth / 2 + "px";
  draggedElement.value.style.top =
    e.clientY - board.top - draggedElement.value.offsetHeight / 2 + "px";

  draggedElement.value.style.transform = "translateX(0) translateY(0)";
}

function drop(e: MouseEvent) {
  e.preventDefault();
  if (props.board == null) return;
  if (draggedPiece.value == null) return;
  if (draggedElement.value == null) return;

  props.board.removeEventListener("mousemove", move);
  props.board.removeEventListener("mouseup", drop);

  const clickedPos = getPositionClicked(e);
  if (clickedPos == null) return;
  store.tryMove(clickedPos.x, clickedPos.y);

  draggedElement.value.style.left = "0";
  draggedElement.value.style.top = "0";
  draggedElement.value.style.transform = "";

  draggedElement.value = null;
  draggedPiece.value = null;
}
</script>

<template>
  <Piece
    v-for="(piece, index) in store.getBoard()"
    :key="index"
    :piece="piece"
    class="ghost-class"
    :class="{
      'cursor-grab': isDraggable(piece),
    }"
    @mousedown="drag($event, piece)"
  />
</template>
