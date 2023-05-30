<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardListStore } from "../stores/board";
import Piece from "./Piece.vue";
import { ref, watch } from "vue";

const store = useBoardListStore();
const { piecesList } = storeToRefs(store);

watch(piecesList, (currentValue, oldValue) => {});
</script>

<template>
  <Piece v-for="(piece, index) in piecesList" :key="index" :piece="piece" />
</template>
