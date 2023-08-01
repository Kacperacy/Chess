<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardStore } from "../../stores/board";
import Piece from "./Piece.vue";
import { ref, watch } from "vue";
import draggable from "vuedraggable";

const store = useBoardStore();
</script>

<template>
  <Piece
    v-for="(piece, index) in store.getBoard()"
    :key="index"
    :piece="piece"
    class="cursor-grab ghost-class"
    :draggable="true"
  />
</template>
