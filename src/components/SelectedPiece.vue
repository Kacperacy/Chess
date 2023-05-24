<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardListStore } from "../stores/board";
import { Chess } from "chess.ts";

const store = useBoardListStore();

const { selectedPiece } = storeToRefs(store);

const chess = new Chess();

const moves = chess.moves();

console.log(moves);
</script>
<template>
  <div
    v-if="store.selectedPiece != null"
    class="absolute top-0 left-0 w-[12.5%] h-[12.5%] bg-opacity-50 bg-[color:yellow] transform"
    :class="
      'translate-x-[' +
      (store.selectedPiece.coordinates.x - 1) * 100 +
      '%] translate-y-[' +
      (store.selectedPiece.coordinates.y - 1) * 100 +
      '%]'
    "
  ></div>
</template>
