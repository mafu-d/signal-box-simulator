<script setup>
import { ref } from "vue";
import SignalBox from "./SignalBox.vue";
import { FacingPointLock, Point, Signal } from "../Lever.class.js";
import Diagram from "../images/Frontington Signal Box Plan v2.png";

defineProps({
  isActive: {
    type: Boolean,
    require: true,
  },
});

const levers = ref([
  new Signal(1, "Down Ptfm 3 Disc", [9, 10], [21], 1),
  new Signal(2, "Down Ptfm 2 Home", [10], [9, 20], 1),
  new Signal(3, "Down Goods Disc", [11], [22], 1),
  new Signal(4, "Down Ptfm 1 Disc", [18], [11, 15, 22], 1),
  new Signal(5, "Down Ptfm 1 Start", [15, 16], [11, 23], 1),
  new Signal(6, "Down Ptfm 3 Disc", [], [13, 15, 24], 1),
  new Signal(7, "Down Ptfm 2 Start", [13], [15, 25], 1),
  new Signal(8, "Down Adv Start"),
  new Point(9, ["Up Ptfm 2", "Up Ptfm 3"], [], [1, 2, 10, 20, 21], 1),
  new FacingPointLock(10, "FPL for 9", [], [1, 2, 20, 21], 1),
  new Point(11, ["Ptfm 1", "Goods"], [], [3, 4, 5, 12, 22], 1),
  new FacingPointLock(12, "FPL for 11", [], [3, 4, 5, 22], 1),
  new Point(13, ["Down Ptfm 3", "Down Ptfm 2"], [], [6, 7, 14, 24, 25], 1),
  new FacingPointLock(14, "FPL for 13", [], [6, 7, 24, 25], 1),
  new Point(15, ["Ptfm 3", "Ptfm 1"], [], [16, 17, 5, 6, 7, 22, 23, 24, 25], 1),
  new FacingPointLock(16, "FPL for 15 Down", [], [3, 4, 5], 1),
  new FacingPointLock(17, "FPL for 15 Up", [], [23, 24, 25], 1),
  new Point(18, "Up Shed Catch", [], [22, 3, 4, 5, 15], 1),
  new Signal(19, "Up Adv Start"),
  new Signal(20, "Up Ptfm 2 Disc", [], [2, 9], 1),
  new Signal(21, "Up Ptfm 3 Start", [9], [1], 1),
  new Signal(22, "Up Shed Disc", [18, 12], [3, 4, 15], 1),
  new Signal(23, "Up Ptfm 1 Home", [15, 17, 12], [3, 5], 1),
  new Signal(24, "Up Ptfm 3 Home", [14, 17], [6, 13, 15], 1),
  new Signal(25, "Up Ptfm 2 Disc", [13, 14, 17], [7, 15], 1),
]);
</script>

<template>
  <SignalBox v-show="isActive" :is-active="isActive" v-model="levers" :diagram-url="Diagram" />
</template>
