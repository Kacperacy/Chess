<script setup lang="ts">
import { computed } from "vue";
import { useBoardStore } from "@/stores/board";
import { storeToRefs } from "pinia";

const store = useBoardStore();

const { isBoardFlipped } = storeToRefs(store);

const colorCss = computed(() => {
  return store.promotion.color == "w" ? "light" : "dark";
});

const column = computed(() => {
  if (store.promotion.column == null) return 1;
  return store.promotion.column;
});

function queen() {
  store.promote("q");
}
function knight() {
  store.promote("n");
}
function bishop() {
  store.promote("b");
}
function rook() {
  store.promote("r");
}
function close() {
  store.promotion.isPromotion = false;
}
</script>

<template>
  <div
    class="absolute top-0 left-0 transform bg-[#eae0c8] rounded-lg w-[12.5%] h-[56.25%] text-center flex items-center flex-col outline outline-2 z-40"
    :class="[
      'translate-x-[' + (column - 1) * 100 + '%]',
      { 'transform rotate-180 translate-y-[78%]': isBoardFlipped },
    ]"
  >
    <div
      class="w-full aspect-square bg-no-repeat bg-cover"
      :class="[colorCss + '-queen', { 'transform rotate-180': isBoardFlipped }]"
      @click="queen"
    ></div>
    <div
      class="w-full aspect-square bg-no-repeat bg-cover"
      :class="[
        colorCss + '-knight',
        { 'transform rotate-180': isBoardFlipped },
      ]"
      @click="knight"
    ></div>
    <div
      class="w-full aspect-square bg-no-repeat bg-cover"
      :class="[
        colorCss + '-bishop',
        { 'transform rotate-180': isBoardFlipped },
      ]"
      @click="bishop"
    ></div>
    <div
      class="w-full aspect-square bg-no-repeat bg-cover"
      :class="[colorCss + '-rook', { 'transform rotate-180': isBoardFlipped }]"
      @click="rook"
    ></div>
    <div
      class="bg-[#b8b09e] w-full h-[12.5%] rounded-b-lg text-center grid place-items-center text-xl cursor-pointer"
      @click="close"
    >
      X
    </div>
  </div>
</template>

<style></style>
