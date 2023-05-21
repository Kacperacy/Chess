<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardListStore } from "../stores/board";

const store = useBoardListStore();

const { selectedSquare } = storeToRefs(store);
</script>
<template>
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
</template>
