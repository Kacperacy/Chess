<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardStore } from "../stores/board";

const store = useBoardStore();

const { lastMove } = storeToRefs(store);
</script>
<template>
  <div
    v-for="move in lastMove"
    class="absolute top-0 left-0 w-[12.5%] h-[12.5%] bg-opacity-50 bg-[color:yellow] transform"
    :class="[
      'translate-x-[' + (move.x - 1) * 100 + '%]',
      'translate-y-[' + (move.y - 1) * 100 + '%]',
    ]"
  ></div>
</template>
