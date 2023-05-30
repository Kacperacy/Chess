<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardStore } from "../stores/board";

const store = useBoardStore();

const { highlightList } = storeToRefs(store);
</script>
<template>
  <div
    v-for="highlight in highlightList"
    class="absolute top-0 left-0 w-[12.5%] h-[12.5%] bg-opacity-80 bg-[color:red] transform"
    :class="[
      'translate-x-[' + (highlight.x - 1) * 100 + '%]',
      'translate-y-[' + (highlight.y - 1) * 100 + '%]',
    ]"
  ></div>
</template>
