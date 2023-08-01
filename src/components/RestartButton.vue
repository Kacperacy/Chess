<script setup lang="ts">
import { useBoardStore } from "../stores/board";

const store = useBoardStore();
</script>

<template>
  <button
    class="rounded-lg bg-[#154c79] hover:bg-[#063970] text-[color:white]"
    @click="store.initBoard"
  >
    Restart game
  </button>
</template>
