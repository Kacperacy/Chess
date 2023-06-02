<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardStore } from "../stores/board";
import Piece from "./Piece.vue";
import { ref, watch } from "vue";

const store = useBoardStore();
</script>

<template>
  <Piece
    v-for="(piece, index) in store.getBoard()"
    :key="index"
    :piece="piece"
  />
</template>
