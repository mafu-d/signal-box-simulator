<script setup>
import { ref } from "vue";
import SignalBox from "./SignalBox.vue";
import { Signal, FacingPointLock, Point } from "../Lever.class.js";

defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});

const levers = ref([
  new Signal(1, "Up Ptfm 2 Hdsh Disc", [], [15]),
  new Signal(2, "Up Loop Hdsh Disc", [], [8, 16]),
  new Signal(3, "Up Goods Disc", [9], [17, 20]),
  new Signal(4, "Up Loop Disc", [], [9, 17, 20]),
  new Signal(5, "Up Ptfm 2 Start", [10], [11, 13, 18]),
  new Signal(6, "Up Ptfm 1 Start", [13], [19]),
  new Signal(7, "Up Adv Start"),
  new Point(8, ["Down Ptfm 2", "Down Loop"], [], [1, 2, 15, 16]),
  new Point(9, ["Loop", "Goods"], [], [3, 4, 17, 20]),
  new Point(10, "Ptfm 2 Catch", [], [5, 13, 18]),
  new Point(11, ["Ptfm 2", "Loop"], [], [3, 4, 5, 12, 13, 17, 18]),
  new FacingPointLock(12, "FPL for 11", [], [18, 19]),
  new Point(13, ["Ptfm 2", "Ptfm 1"], [], [6, 14]),
  new FacingPointLock(14, "FPL for 13", [], [18, 19, 20]),
  new Signal(15, "Down Ptfm 2 Hdsh Disc", [], [1, 8]),
  new Signal(16, "Down Loop Hdsh Disc", [], [2]),
  new Signal(17, "Down Hdsh Disc", [], [3, 4, 11]),
  new Signal(18, "Down Ptfm 2 Home", [10, 12, 14], [5, 11, 13]),
  new Signal(19, "Down Ptfm 1 Home", [13, 14], [6]),
  new Signal(20, "Down Loop Home Disc", [11, 12, 14], [3, 4, 13]),
]);
</script>

<template>
  <SignalBox v-show="isActive" :is-active="isActive" v-model="levers"
    diagram-url="/Tutherside Signal Box Plan v2.svg" />
</template>
