<script setup lang="ts">
import { Piece } from "@/models/piece.model";
import { computed } from "vue";

const props = defineProps<{ piece: Piece }>();

let classCss = "";

const pieceClass = computed(() => {
  classCss = "";
  if (props.piece.color == "w") classCss = "light-";
  else classCss = "dark-";

  if (props.piece.type == "p") classCss += "pawn";
  else if (props.piece.type == "b") classCss += "bishop";
  else if (props.piece.type == "n") classCss += "knight";
  else if (props.piece.type == "r") classCss += "rook";
  else if (props.piece.type == "q") classCss += "queen";
  else if (props.piece.type == "k") classCss += "king";
  return classCss;
});
</script>
<template>
  <div
    class="absolute top-0 left-0 w-[12.5%] h-[12.5%] z-20"
    :class="[
      'translate-x-[' + (piece.coordinates.x - 1) * 100 + '%]',
      'translate-y-[' + (piece.coordinates.y - 1) * 100 + '%]',
      pieceClass,
    ]"
  ></div>
</template>
