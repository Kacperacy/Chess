<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardStore } from "../stores/board";

const store = useBoardStore();

const { selectedPiece } = storeToRefs(store);
</script>
<template>
  <div
    v-if="store.selectedPiece != null"
    class="absolute top-0 left-0 w-[12.5%] h-[12.5%] bg-opacity-50 bg-[color:yellow] transform pointer-events-none"
    :class="[
      'translate-x-[' + (store.selectedPiece.coordinates.x - 1) * 100 + '%]',
      'translate-y-[' + (store.selectedPiece.coordinates.y - 1) * 100 + '%]',
    ]"
  ></div>
</template>
