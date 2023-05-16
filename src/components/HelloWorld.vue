<script setup lang="ts">
import Square from "./Square.vue";
</script>

<template>
  <div class="w-[800px] h-[800px] flex flex-wrap">
    <Square
      v-for="index in 64"
      :key="index"
      v-bind:color="
        (index + Math.floor((index - 1) / 8)) % 2 == 0 ? 'dark' : 'light'
      "
      v-bind:index="index"
    ></Square>
  </div>
</template>
