<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import { storeToRefs } from "pinia";

const store = useBoardStore();

const { isDragged } = storeToRefs(store);
</script>

<template>
  <div class="w-full h-full flex flex-wrap">
    <div
      v-for="index in 64"
      :key="index"
      class="w-[12.5%] h-[12.5%]"
      :class="[
        {
          'bg-square-light':
            (((index - 1) % 8) + Math.floor((index - 1) / 8)) % 2 == 0,
          'bg-square-dark':
            (((index - 1) % 8) + Math.floor((index - 1) / 8)) % 2 != 0,
        },
        { 'hover:border-8 border-[color:lightgrey]': isDragged },
      ]"
    ></div>
  </div>
</template>
