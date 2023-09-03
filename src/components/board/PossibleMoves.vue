<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";

const store = useBoardStore();

const { possibleMoves, isDragged } = storeToRefs(store);

function tryMove(e: MouseEvent, x: number, y: number) {
  e.preventDefault();
  if (x == null || y == null) return;
  store.changeSelectedSquare(x, y);
}
</script>
<template>
  <div
    v-for="possibleMove in possibleMoves"
    class="absolute top-0 left-0 w-[12.5%] h-[12.5%] grid place-items-center cursor-pointer z-30"
    :class="[
      'translate-x-[' + (possibleMove.coordinates.x - 1) * 100 + '%]',
      'translate-y-[' + (possibleMove.coordinates.y - 1) * 100 + '%]',
      { 'pointer-events-none': isDragged },
    ]"
    @click="
      tryMove($event, possibleMove.coordinates.x, possibleMove.coordinates.y)
    "
  >
    <div
      class="w-1/3 h-1/3 bg-opacity-50 bg-[color:black] transform rounded-full"
      :class="[
        {
          'bg-[color:black]': possibleMove.type == 'possible',
          'bg-[color:red]': possibleMove.type == 'capture',
        },
      ]"
    ></div>
  </div>
</template>
