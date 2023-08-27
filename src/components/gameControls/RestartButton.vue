<script setup lang="ts">
import { useBoardStore } from "@/stores/board";

const store = useBoardStore();
</script>

<template>
  <button
    class="rounded-lg bg-button-background hover:bg-button-background-hover text-[color:white]"
    @click="store.initBoard"
  >
    <i class="fa-solid fa-arrow-rotate-left"></i><br />
    Restart game
  </button>
</template>
