<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";
import { PossibleMove } from "@/models/possibleMove.model";

const store = useBoardStore();

const { possibleMoves } = storeToRefs(store);

function drop(possibleMove: PossibleMove) {
  store.tryMove(possibleMove.coordinates.x, possibleMove.coordinates.y);
}
</script>
<template>
  <div
    v-for="possibleMove in possibleMoves"
    class="absolute top-0 left-0 w-[12.5%] h-[12.5%] grid place-items-center cursor-pointer z-30"
    :class="[
      'translate-x-[' + (possibleMove.coordinates.x - 1) * 100 + '%]',
      'translate-y-[' + (possibleMove.coordinates.y - 1) * 100 + '%]',
    ]"
    @dragover="$event.preventDefault()"
    @drop="drop(possibleMove)"
  >
    <div
      class="w-1/3 h-1/3 bg-opacity-50 bg-[color:black] transform rounded-full"
      :class="{
        'bg-[color:black]': possibleMove.type == 'possible',
        'bg-[color:red]': possibleMove.type == 'capture',
      }"
    ></div>
  </div>
</template>
