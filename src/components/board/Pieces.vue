<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import Piece from "./Piece.vue";
import { Piece as PieceModel } from "@/models/piece.model";
import { ref, reactive, onMounted, onUnmounted } from "vue";

const store = useBoardStore();

function isDraggable(piece: PieceModel) {
  return store.chess.turn() == piece.color;
}

function drag(event: DragEvent, piece: PieceModel) {
  event.dataTransfer?.clearData();
  store.changeSelectedSquare(piece.coordinates.x, piece.coordinates.y, true);
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
    :draggable="isDraggable(piece)"
    @dragstart="drag($event, piece)"
  />
</template>
