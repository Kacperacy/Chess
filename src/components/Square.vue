<script setup lang="ts">
import { ref } from "vue";
import { useBoardListStore } from "../stores/board";

const store = useBoardListStore();

const props = defineProps<{
  index: number;
  x: number;
  y: number;
}>();

const color: string = (props.x + props.y) % 2 == 0 ? "dark" : "light";
const bg = ref("bg-square-" + color);

const { changeHighlight } = store;
</script>

<template>
  <div
    :class="bg"
    class="w-[12.5%] h-[12.5%]"
    @click="changeHighlight(x, y)"
  ></div>
</template>
