<script setup lang="ts">
import { useBoardStore } from "../stores/board";

const store = useBoardStore();
</script>

<template>
  <button
    class="w-full h-full rounded-lg bg-[#154c79] hover:bg-[#063970]"
    @click="store.initBoard"
  >
    Restart game
  </button>
</template>
