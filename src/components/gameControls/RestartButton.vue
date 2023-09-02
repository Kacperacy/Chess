<script setup lang="ts">
import { useBoardStore } from "@/stores/board";

const store = useBoardStore();
</script>

<template>
  <button
    class="rounded-lg bg-button-background hover:bg-button-background-hover text-[color:white]"
    @click="store.initBoard"
  >
    <font-awesome-icon :icon="['fas', 'arrow-rotate-left']" /><br />
    Restart game
  </button>
</template>
