<script setup>
import { ref } from "vue";
import SignalBox from "./SignalBox.vue";
import { FacingPointLock, Point, Signal } from "../Lever.class.js";

defineProps({
  isActive: {
    type: Boolean,
    require: true,
  },
});

const levers = ref([
  new Signal(1, "Up Loop Home Disc", [9, 10], [21]),
  new Signal(2, "Up Ptfm 2 Home", [10], [9, 20]),
  new Signal(3, "Up Goods Disc", [11], [22]),
  new Signal(4, "Up Ptfm 1 Disc", [18], [11, 15, 22]),
  new Signal(5, "Up Ptfm 1 Start", [15, 16], [4, 11, 23]),
  new Signal(6, "Up Loop Start Disc", [13], [15, 25]),
  new Signal(7, "Up Ptfm 2 Start", [], [13, 15, 24]),
  new Signal(8, "Up Adv Start"),
  new Point(9, ["Down Main", "Down Loop"], [], [1, 2, 10, 20, 21]),
  new FacingPointLock(10, "FPL for 9", [], [1, 2, 20, 21]),
  new Point(11, ["Ptfm 1", "Goods"], [], [3, 4, 5, 12, 22]),
  new FacingPointLock(12, "FPL for 11", [], [3, 4, 5, 22]),
  new Point(13, ["Up Main", "Up Loop"], [], [6, 7, 14, 24, 25]),
  new FacingPointLock(14, "FPL for 13", [], [6, 7, 24, 25]),
  new Point(15, ["Ptfm 1", "Ptfm 2"], [], [16, 17, 5, 6, 7, 22, 23, 24, 25]),
  new FacingPointLock(16, "FPL for 15 Up", [], [3, 4, 5]),
  new FacingPointLock(17, "FPL for 15 Down", [], [23, 24, 25]),
  new Point(18, "Down Shed Catch", [], [22, 3, 4, 5, 15]),
  new Signal(19, "Down Adv Start"),
  new Signal(20, "Down Ptfm 2 Start", [], [2, 9]),
  new Signal(21, "Down Loop Start Disc", [9], [1]),
  new Signal(22, "Down Shed Disc", [18, 12], [3, 4, 15]),
  new Signal(23, "Down Ptfm 1 Home", [15, 17, 12], [3, 5]),
  new Signal(24, "Down Ptfm 2 Home", [14, 17], [7, 13, 15]),
  new Signal(25, "Down Loop Disc", [13, 14, 17], [6, 15]),
]);
</script>

<template>
  <SignalBox
    v-show="isActive"
    :is-active="isActive"
    v-model="levers"
    diagram-url="/Frontington Signal Box Plan v2.svg"
  />
</template>
