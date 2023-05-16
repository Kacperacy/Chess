<template>
  <div :class="bg" class="w-[12.5%] h-[12.5%]" @click="changeBg">
    <div
      :class="{ 'bg-opacity-50 bg-[color:yellow]': active }"
      class="w-full h-full text-center text-5xl"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ color: string; index: number }>();

const active = ref(false);
const bg = ref("bg-square-" + props.color);

function changeBg() {
  active.value = !active.value;
}
</script>
