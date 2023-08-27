<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import RestartButton from "./RestartButton.vue";
import UndoMoveButton from "./UndoMoveButton.vue";
import FlipBoard from "./FlipBoard.vue";

const store = useBoardStore();
</script>

<template>
  <div
    class="flex flex-col gap-[10%] items-center justify-center bg-game-controls-background border-4"
  >
    <RestartButton class="w-3/4 h-1/5" />
    <UndoMoveButton class="w-3/4 h-1/5" />
    <FlipBoard class="w-3/4 h-1/5" />
  </div>
</template>
