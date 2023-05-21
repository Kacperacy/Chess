<script setup lang="ts">
import { Piece } from "../models/piece.model";
import { ref } from "vue";
import { PieceType } from "../models/pieceType.model";
import { ColorType } from "../models/colorType.model";

const props = defineProps<{ piece: Piece }>();

const pieceClass = ref("");

if (props.piece.color == ColorType.Light) pieceClass.value = "light-";
else pieceClass.value = "dark-";

if (props.piece.type == PieceType.Pawn) pieceClass.value += "pawn";
else if (props.piece.type == PieceType.Bishop) pieceClass.value += "bishop";
else if (props.piece.type == PieceType.Knight) pieceClass.value += "knight";
else if (props.piece.type == PieceType.Rook) pieceClass.value += "rook";
else if (props.piece.type == PieceType.Queen) pieceClass.value += "queen";
else if (props.piece.type == PieceType.King) pieceClass.value += "king";
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
      pieceClass
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
