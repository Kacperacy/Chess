<script setup lang="ts">
import Square from "./Square.vue";
</script>

<template>
  <div class="w-full h-full flex flex-wrap">
    <Square
      v-for="index in 64"
      :key="index"
      v-bind:index="index"
      v-bind:x="((index - 1) % 8) + 1"
      v-bind:y="Math.floor((index - 1) / 8) + 1"
    ></Square>
  </div>
</template>
