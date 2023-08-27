<script setup lang="ts">
import { useBoardStore } from "@/stores/board";

const store = useBoardStore();
</script>

<template>
  <button
    class="rounded-lg bg-button-background hover:bg-button-background-hover text-[color:white]"
    @click="store.undoMove"
  >
    <i class="fa-solid fa-arrow-left"></i><br />
    Undo move
  </button>
</template>
