<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardListStore } from "../stores/board";

const store = useBoardListStore();

const { possibleMoves } = storeToRefs(store);
</script>
<template>
  <div
    v-for="possibleMove in possibleMoves"
    class="absolute top-0 left-0 w-[12.5%] h-[12.5%] grid place-items-center"
    :class="
      'translate-x-[' +
      (possibleMove.x - 1) * 100 +
      '%] translate-y-[' +
      (possibleMove.y - 1) * 100 +
      '%]'
    "
  >
    <div
      class="w-1/3 h-1/3 bg-opacity-50 bg-[color:black] transform rounded-full"
    ></div>
  </div>
</template>
