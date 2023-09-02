<script setup lang="ts">
import { useBoardStore } from "@/stores/board";

const store = useBoardStore();
</script>

<template>
  <button
    class="rounded-lg bg-button-background hover:bg-button-background-hover text-[color:white]"
    @click="store.undoMove"
  >
    <font-awesome-icon :icon="['fas', 'arrow-left']" /><br />
    Undo move
  </button>
</template>
