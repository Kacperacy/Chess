<script setup lang="ts">
import { useBoardListStore } from "../stores/board";
import Piece from "./Piece.vue";

const store = useBoardListStore();

const { piecesList } = store;
</script>

<template>
  <Piece
    v-for="(piece, index) in piecesList"
    :key="index"
    v-bind:piece="piece"
  />
</template>
