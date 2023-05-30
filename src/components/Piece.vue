<script setup lang="ts">
import { Piece } from "../models/piece.model";
import { computed, getCurrentInstance, ref, watch } from "vue";
import { PieceType } from "../models/pieceType.model";
import { ColorType } from "../models/colorType.model";

const props = defineProps<{ piece: Piece }>();

let classCss = "";

const pieceClass = computed(() => {
  classCss = "";
  if (props.piece.color == ColorType.Light) classCss = "light-";
  else classCss = "dark-";

  if (props.piece.type == PieceType.Pawn) classCss += "pawn";
  else if (props.piece.type == PieceType.Bishop) classCss += "bishop";
  else if (props.piece.type == PieceType.Knight) classCss += "knight";
  else if (props.piece.type == PieceType.Rook) classCss += "rook";
  else if (props.piece.type == PieceType.Queen) classCss += "queen";
  else if (props.piece.type == PieceType.King) classCss += "king";
  return classCss;
});
</script>
<template>
  <div
    class="absolute top-0 left-0 w-[12.5%] h-[12.5%]"
    :class="[
      'translate-x-[' + (piece.coordinates.x - 1) * 100 + '%]',
      'translate-y-[' + (piece.coordinates.y - 1) * 100 + '%] ',
      pieceClass,
    ]"
  ></div>
</template>
