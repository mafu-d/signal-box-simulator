<script setup>
import { ref } from "vue";
import SignalBox from "./SignalBox.vue";

// 1 S Up platform 1 start
// 2 S Up platform 2 start
// 3 S Up advance start (off-scene)
// 4 S Up platform 2 to loop disc
// 7 S Up loop start
// 8 S Up goods start
// 9 P Platform 2 to loop (double)
// 10 P Loop | goods
// 11 P Up platform 2 catch
// 12 P Main to platform 2 | goods / loop
// 13 FPL
// 14 P Up platform 1 catch
// 17 P Platform 2 | Platform 1
// 18 FPL
// 19 S Down platform 2 inner home
// 110 S Down platform 1 inner home
// 111 S Down main home (off-scene)

defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});

const levers = ref([
  {
    id: 1,
    type: "signal",
    label: "Up Ptfm 1 Start",
    state: false,
    unlocked: false,
    unlockedBy: { 13: 1, 17: 1, 24: 0 },
  },
  {
    id: 2,
    type: "signal",
    label: "Up Ptfm 2 Start",
    state: false,
    unlocked: false,
    unlockedBy: { 14: 1, 15: 0, 17: 0, 25: 0 },
  },
  {
    id: 3,
    type: "signal",
    label: "Up F'ton",
    state: false,
    unlocked: false,
    unlockedBy: { 19: 1, 20: 1, 26: 0 },
  },
  {
    id: 4,
    type: "signal",
    label: "Up G'Bdg",
    state: false,
    unlocked: false,
    unlockedBy: { 19: 0, 20: 1, 27: 0 },
  },
  {
    id: 5,
    type: "signal",
    label: "Up F'ton Adv Start",
    state: false,
    unlocked: false,
    unlockedBy: {19: 1, 26: 0},
  },
  {
    id: 6,
    type: "signal",
    label: "Up G'Bdg Adv Start",
    state: false,
    unlocked: true,
    unlockedBy: {19: 0, 27: 0},
  },
  {
    id: 7,
    type: "signal",
    label: "Up Ptfm 2 Head",
    state: false,
    unlocked: false,
    unlockedBy: { 21: 0, 22: 0, 8: 0, 25: 0 },
  },
  {
    id: 8,
    type: "signal",
    label: "Up Loop Head",
    state: false,
    unlocked: false,
    unlockedBy: { 9: 0, 22: 0 },
  },
  {
    id: 9,
    type: "point",
    label: "Loop Head",
    state: false,
    unlocked: false,
    unlockedBy: { 22: 0, 8: 0, 21: 0, 7: 0 },
  },
  {
    id: 10,
    type: "signal",
    label: "Up Loop",
    state: false,
    unlocked: false,
    unlockedBy: { 12: 0, 23: 0, 25: 0 },
  },
  {
    id: 11,
    type: "signal",
    label: "Up Goods",
    state: false,
    unlocked: false,
    unlockedBy: { 12: 1, 23: 0, 25: 0 },
  },
  {
    id: 12,
    type: "point",
    label: ["Loop", "Goods"],
    state: false,
    unlocked: false,
    unlockedBy: { 11: 0, 10: 0 },
  },
  {
    id: 13,
    type: "point",
    label: "Ptfm 1 Catch",
    state: false,
    unlocked: false,
    unlockedBy: { 1: 0, 24: 0, 17: 1 },
  },
  {
    id: 14,
    type: "point",
    label: "Ptfm 2 Catch",
    state: false,
    unlocked: false,
    unlockedBy: { 2: 0, 15: 0, 17: 0, 25: 0 },
  },
  {
    id: 15,
    type: "point",
    label: ["Ptfm 2", "Loop"],
    state: false,
    unlocked: false,
    unlockedBy: { 16: 0, 2: 0, 10: 0, 11: 0, 23: 0, 25: 0, 17: 0 },
  },
  {
    id: 16,
    type: "fpl",
    label: "FPL for 15",
    state: false,
    unlocked: false,
    unlockedBy: { 25: 0 },
  },
  {
    id: 17,
    type: "point",
    label: ["Ptfm 2", "Ptfm 1"],
    state: false,
    unlocked: false,
    unlockedBy: { 18: 0, 24: 0, 1: 0, 2: 0, 10: 0, 11: 0 },
  },
  {
    id: 18,
    type: "fpl",
    label: "FPL for 17",
    state: false,
    unlocked: false,
    unlockedBy: { 24: 0, 25: 0 },
  },
  {
    id: 19,
    type: "point",
    label: ["G'Bdg", "F'ton"],
    state: false,
    unlocked: false,
    unlockedBy: { 20: 0, 27: 0, 26: 0, 3: 0, 4: 0 },
  },
  {
    id: 20,
    type: "fpl",
    label: "FPL for 19",
    state: false,
    unlocked: false,
    unlockedBy: { 3: 0, 4: 0 },
  },
  {
    id: 21,
    type: "signal",
    label: "Down Ptfm 2 Head",
    state: false,
    unlocked: false,
    unlockedBy: { 9: 0, 7: 0 },
  },
  {
    id: 22,
    type: "signal",
    label: "Down Loop Head",
    state: false,
    unlocked: false,
    unlockedBy: { 8: 0, 7: 0 },
  },
  {
    id: 23,
    type: "signal",
    label: "Down Head",
    state: false,
    unlocked: false,
    unlockedBy: { 15: 0, 11: 0, 10: 0 },
  },
  {
    id: 24,
    type: "signal",
    label: "Down Ptfm 1 Inner Home",
    state: false,
    unlocked: false,
    unlockedBy: { 17: 1, 18: 1, 13: 1, 1: 0 },
  },
  {
    id: 25,
    type: "signal",
    label: "Down Ptfm 2 Inner Home",
    state: false,
    unlocked: false,
    unlockedBy: { 17: 0, 18: 1, 16: 1 },
  },
  {
    id: 26,
    type: "signal",
    label: "Down F'ton Home",
    state: false,
    unlocked: false,
    unlockedBy: { 19: 1, 3: 0, 5: 0 },
  },
  {
    id: 27,
    type: "signal",
    label: "Down G'Bdg Home",
    state: false,
    unlocked: false,
    unlockedBy: { 19: 0, 4: 0, 6: 0 },
  },
]);
</script>

<template>
  <SignalBox
    v-show="isActive"
    :is-active="isActive"
    v-model="levers"
    diagram-url="/Tutherside Signal Box Plan.svg"
  />
</template>
