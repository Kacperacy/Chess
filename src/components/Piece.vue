<script setup lang="ts">
import { Piece } from "../models/piece.model";
import { computed, getCurrentInstance, ref, watch } from "vue";
import { PieceType } from "../models/pieceType.model";
import { ColorType } from "../models/colorType.model";

const props = defineProps<{ piece: Piece }>();

let classCss = ref("");

const pieceClass = computed(() => {
  classCss.value = "";
  if (props.piece.color == ColorType.Light) classCss.value = "light-";
  else classCss.value = "dark-";

  if (props.piece.type == PieceType.Pawn) classCss.value += "pawn";
  else if (props.piece.type == PieceType.Bishop) classCss.value += "bishop";
  else if (props.piece.type == PieceType.Knight) classCss.value += "knight";
  else if (props.piece.type == PieceType.Rook) classCss.value += "rook";
  else if (props.piece.type == PieceType.Queen) classCss.value += "queen";
  else if (props.piece.type == PieceType.King) classCss.value += "king";
  return classCss;
});
</script>
<template>
  <div
    class="absolute top-0 left-0 w-[12.5%] h-[12.5%]"
    :class="
      'translate-x-[' +
      (piece.coordinates.x - 1) * 100 +
      '%] translate-y-[' +
      (piece.coordinates.y - 1) * 100 +
      '%] ' +
      pieceClass.value
    "
  ></div>
</template>

<!-- <div class="dark-pawn absolute top-0 left-0 w-[12.5%] h-[12.5%]"></div>
  <div
    class="dark-bishop absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[100%]"
  ></div>
  <div
    class="dark-knight absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[200%]"
  ></div>
  <div
    class="dark-rook absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[300%]"
  ></div>
  <div
    class="dark-king absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[400%]"
  ></div>
  <div
    class="dark-queen absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[500%]"
  ></div>

  <div
    class="light-pawn absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-y-[700%]"
  ></div>
  <div
    class="light-bishop absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[100%] translate-y-[700%]"
  ></div>
  <div
    class="light-knight absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[200%] translate-y-[700%]"
  ></div>
  <div
    class="light-rook absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[300%] translate-y-[700%]"
  ></div>
  <div
    class="light-king absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[400%] translate-y-[700%]"
  ></div>
  <div
    class="light-queen absolute top-0 left-0 w-[12.5%] h-[12.5%] translate-x-[500%] translate-y-[700%]"
  ></div> -->
