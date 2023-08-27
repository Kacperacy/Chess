<script setup lang="ts">
import { useBoardStore } from "@/stores/board";

const store = useBoardStore();
</script>

<template>
  <button
    class="rounded-lg bg-button-background hover:bg-button-background-hover text-[color:white]"
    @click="store.flipBoard"
  >
    <i class="fa-solid fa-repeat"></i><br />
    Flip board
  </button>
</template>
