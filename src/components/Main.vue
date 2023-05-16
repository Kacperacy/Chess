<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardListStore } from "../stores/board";
import Board from "./Board.vue";

const store = useBoardListStore();

const { highlightList, piecesList } = storeToRefs(store);
</script>

<template>
  <div class="w-full h-full flex place-content-center">
    <div class="w-[800px] h-[800px] relative">
      <Board />
      <div
        v-for="highlight in highlightList"
        class="absolute top-0 left-0 w-[12.5%] h-[12.5%] bg-opacity-50 bg-[color:yellow] transform"
        :class="
          'translate-x-[' +
          (highlight.x - 1) * 100 +
          '%] translate-y-[' +
          (highlight.y - 1) * 100 +
          '%]'
        "
      ></div>
    </div>
  </div>
</template>
