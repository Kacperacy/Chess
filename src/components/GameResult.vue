<script setup lang="ts">
import { useBoardStore } from "../stores/board";
import { computed } from "vue";

const store = useBoardStore();

let result = store.gameResult;

let resultText = computed(() => {
  if (result == "DarkWon") return "Dark Won!!!";
  else if (result == "LightWon") return "Light Won!!!";
  else if (result == "InsufficientMaterial")
    return "Draw by insufficient material.";
  else if (result == "Over50HalfMoves") return "Draw by over 50 half moves";
  else if (result == "Repetition")
    return "Draw by triple repetition of same position";
  else if (result == "Stalemate") return "Draw by stalemate";
});
</script>

<template>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#76b5c5] rounded-lg w-1/5 h-1/2 min-w-[350px] text-center flex items-center flex-col"
  >
    <span class="text-3xl h-1/3 pt-[10%]">Game Over</span>
    <div class="h-1/3 text-center">{{ resultText }}</div>
    <div class="h-1/3 w-full grid place-items-center">
      <button
        class="w-1/2 h-1/2 rounded-lg bg-[#154c79] hover:bg-[#063970]"
        @click="store.initBoard"
      >
        Restart game
      </button>
    </div>
  </div>
</template>
