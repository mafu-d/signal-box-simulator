<script setup>
import { ref } from "vue";
import SignalBox from "./SignalBox.vue";

defineProps({
  isActive: {
    type: Boolean,
    require: true,
  },
});

const levers = ref([
  {
    id: 1,
    label: "Up Loop Home Disc",
    type: "signal",
    state: false,
    unlockedBy: {9:1, 10:1, 21:0},
    unlocked: false,
  },
  {
    id: 2,
    label: "Up Pftm 2 Home",
    type: "signal",
    state: false,
    unlockedBy: {9:0, 10:1, 20:0},
    unlocked: false,
  },
  {
    id: 3,
    label: "Up Goods Disc",
    type: "signal",
    state: false,
    unlockedBy: {11:1},
    unlocked: false,
  },
  {
    id: 4,
    label: "Up Pftm 1 Disc",
    type: "signal",
    state: false,
    unlockedBy: {11:0, 18:1, 22:0, 15:0},
    unlocked: false,
  },
  {
    id: 5,
    label: "Up Pftm 1 Start",
    type: "signal",
    state: false,
    unlockedBy: {4:0, 11:0, 15:1, 16:1, 23:0},
    unlocked: false,
  },
  {
    id: 6,
    label: "Up Loop Start Disc",
    type: "signal",
    unlockedBy: {13:1, 15:0, 25:0},
    state: false,
    unlocked: false,
  },
  {
    id: 7,
    label: "Up Pftm 2 Start",
    type: "signal",
    unlockedBy: {13:0, 15:0, 24:0},
    unlocked: true,
    state: false,
  },
  {
    id: 8,
    label: "Up Adv Start",
    type: "signal",
    unlockedBy: {},
    state: false,
    unlocked: false,
  },
  {
    id: 9,
    label: ["Down Main", "Down Loop"],
    type: "point",
    unlockedBy: {1:0, 2:0, 20:0, 21:0, 10:0},
    unlocked: true,
    state: false,
  },
  {
    id: 10,
    label: "FPL for 9",
    type: "fpl",
    unlockedBy: {1:0, 2:0, 20:0, 21:0},
    unlocked: true,
    state: false,
  },
  {
    id: 11,
    label: ["Pftm 1", "Goods"],
    type: "point",
    unlockedBy: {3:0, 4:0, 5:0, 22:0, 12:0},
    unlocked: true,
    state: false,
  },
  {
    id: 12,
    label: "FPL for 11",
    type: "fpl",
    unlockedBy: {3:0, 4:0, 5:0, 22:0},
    unlocked: true,
    state: false,
  },
  {
    id: 13,
    label: ["Up Main", "Up Loop"],
    type: "point",
    unlockedBy: {14:0, 6:0, 24:0, 25:0, 7:0},
    unlocked: true,
    state: false,
  },
  {
    id: 14,
    label: "FPL for 13",
    type: "fpl",
    unlockedBy: {6:0, 7:0, 24:0, 25:0},
    unlocked: true,
    state: false,
  },
  {
    id: 15,
    label: ["Pftm 1", "Pftm 2"],
    type: "point",
    unlockedBy: {16:0, 17:0, 5:0, 6:0, 7:0, 22:0, 23:0, 24:0, 25:0},
    state: false,
    unlocked: false,
  },
  {
    id: 16,
    label: "FPL for 15 Up",
    type: "fpl",
    unlockedBy: {4:0, 5:0, 3:0},
    unlocked: true,
    state: false,
  },
  {
    id: 17,
    label: "FPL for 15 Down",
    type: "fpl",
    unlockedBy: {23:0, 24:0, 25:0},
    unlocked: true,
    state: false,
  },
  {
    id: 18,
    label: "Down Shed Catch",
    type: "point",
    unlockedBy: {22:0, 3:0, 4:0, 5:0, 15:0},
    unlocked: true,
    state: false,
  },
  {
    id: 19,
    label: "Down Adv Start",
    type: "signal",
    unlockedBy: {},
    unlocked: true,
    state: false,
  },
  {
    id: 20,
    label: "Down Pftm 2 Start",
    type: "signal",
    unlockedBy: {2:0, 9:0},
    unlocked: true,
    state: false,
  },
  {
    id: 21,
    label: "Down Loop Start Disc",
    type: "signal",
    unlockedBy: {1:0, 9:1},
    state: false,
    unlocked: false,
  },
  {
    id: 22,
    label: "Down Shed Disc",
    type: "signal",
    unlockedBy: {18:1, 4:0, 3:0, 15:0, 12:1},
    state: false,
    unlocked: false,
  },
  {
    id: 23,
    label: "Down Pftm 1 Home",
    type: "signal",
    unlockedBy: {15:1, 17:1, 5:0, 3:0, 12:1},
    state: false,
    unlocked: false,
  },
  {
    id: 24,
    label: "Down Pftm 2 Home",
    type: "signal",
    unlockedBy: {15:0, 13:0, 7:0, 14:1, 17:1},
    state: false,
    unlocked: false,
  },
  {
    id: 25,
    label: "Down Loop Disc",
    type: "signal",
    unlockedBy: {15:0, 17:1, 13:1, 14:1, 6:0},
    state: false,
    unlocked: false,
  },
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
