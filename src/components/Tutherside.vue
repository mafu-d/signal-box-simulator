<script setup>
import { ref } from "vue";
import SignalBox from "./SignalBox.vue";

// 1 S Up platform 1 start
// 2 S Up platform 2 start
// 3 S Up advance start (off-scene)
// 4 S Up platform 2 to loop disc
// 5 S Up loop start
// 6 S Up goods start
// 7 P Platform 2 to loop (double)
// 8 P Loop | goods
// 9 P Up platform 2 catch
// 10 P Main to platform 2 | goods / loop
// 11 FPL
// 12 P Up platform 1 catch
// 13 P Platform 2 | Platform 1
// 14 FPL
// 15 S Down platform 2 inner home
// 16 S Down platform 1 inner home
// 17 S Down main home (off-scene)

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
    unlockedBy: { 11: 1, 15: 1, 22: 0 },
  },
  {
    id: 2,
    type: "signal",
    label: "Up Ptfm 2 Start",
    state: false,
    unlocked: false,
    unlockedBy: { 12: 1, 13: 0, 15: 0, 23: 0 },
  },
  {
    id: 3,
    type: "signal",
    label: "Up F'ton Adv Start",
    state: false,
    unlocked: false,
    unlockedBy: { 17: 1, 18: 1, 24: 0 },
  },
  {
    id: 4,
    type: "signal",
    label: "Up G'Bdg Adv Start",
    state: false,
    unlocked: false,
    unlockedBy: { 17: 0, 18: 1, 25: 0 },
  },
  {
    id: 5,
    type: "signal",
    label: "Up Ptfm 2 Head",
    state: false,
    unlocked: false,
    unlockedBy: { 19: 0, 20: 0, 6: 0, 23: 0 },
  },
  {
    id: 6,
    type: "signal",
    label: "Up Loop Head",
    state: false,
    unlocked: false,
    unlockedBy: { 7: 0, 20: 0 },
  },
  {
    id: 7,
    type: "point",
    label: "Loop Head",
    state: false,
    unlocked: false,
    unlockedBy: { 20: 0, 6: 0, 19: 0, 5: 0 },
  },
  {
    id: 8,
    type: "signal",
    label: "Up Loop",
    state: false,
    unlocked: false,
    unlockedBy: { 10: 0, 21: 0, 23: 0 },
  },
  {
    id: 9,
    type: "signal",
    label: "Up Goods",
    state: false,
    unlocked: false,
    unlockedBy: { 10: 1, 21: 0, 23: 0 },
  },
  {
    id: 10,
    type: "point",
    label: ["Loop", "Goods"],
    state: false,
    unlocked: false,
    unlockedBy: { 9: 0, 8: 0 },
  },
  {
    id: 11,
    type: "point",
    label: "Ptfm 2 Catch",
    state: false,
    unlocked: false,
    unlockedBy: { 1: 0, 22: 0, 15: 1 },
  },
  {
    id: 12,
    type: "point",
    label: "Ptfm 1 Catch",
    state: false,
    unlocked: false,
    unlockedBy: { 2: 0, 13: 0, 15: 0, 23: 0 },
  },
  {
    id: 13,
    type: "point",
    label: ["Ptfm 2", "Loop"],
    state: false,
    unlocked: false,
    unlockedBy: { 14: 0, 2: 0, 8: 0, 9: 0, 21: 0, 23: 0, 15: 0 },
  },
  {
    id: 14,
    type: "fpl",
    label: "FPL for 13",
    state: false,
    unlocked: false,
    unlockedBy: { 23: 0 },
  },
  {
    id: 15,
    type: "point",
    label: ["Ptfm 2", "Ptfm 1"],
    state: false,
    unlocked: false,
    unlockedBy: { 16: 0, 22: 0, 1: 0, 2: 0, 8: 0, 9: 0 },
  },
  {
    id: 16,
    type: "fpl",
    label: "FPL for 15",
    state: false,
    unlocked: false,
    unlockedBy: { 22: 0, 23: 0 },
  },
  {
    id: 17,
    type: "point",
    label: ["G'Bdg", "F'ton"],
    state: false,
    unlocked: false,
    unlockedBy: { 18: 0, 25: 0, 24: 0, 3: 0, 4: 0 },
  },
  {
    id: 18,
    type: "fpl",
    label: "FPL for 17",
    state: false,
    unlocked: false,
    unlockedBy: { 3: 0, 4: 0 },
  },
  {
    id: 19,
    type: "signal",
    label: "Down Ptfm 2 Head",
    state: false,
    unlocked: false,
    unlockedBy: { 7: 0, 5: 0 },
  },
  {
    id: 20,
    type: "signal",
    label: "Down Loop Head",
    state: false,
    unlocked: false,
    unlockedBy: { 6: 0, 5: 0 },
  },
  {
    id: 21,
    type: "signal",
    label: "Down Head",
    state: false,
    unlocked: false,
    unlockedBy: { 13: 0, 9: 0, 8: 0 },
  },
  {
    id: 22,
    type: "signal",
    label: "Down Ptfm 1 Inner Home",
    state: false,
    unlocked: false,
    unlockedBy: { 15: 1, 16: 1, 11: 1, 1: 0 },
  },
  {
    id: 23,
    type: "signal",
    label: "Down Ptfm 2 Inner Home",
    state: false,
    unlocked: false,
    unlockedBy: { 15: 0, 16: 1, 14: 1 },
  },
  {
    id: 24,
    type: "signal",
    label: "Down F'ton Home",
    state: false,
    unlocked: false,
    unlockedBy: { 17: 1, 3: 0 },
  },
  {
    id: 25,
    type: "signal",
    label: "Down G'Bdg Home",
    state: false,
    unlocked: false,
    unlockedBy: { 17: 0, 4: 0 },
  },
]);
</script>

<template>
  <SignalBox
    v-show="isActive"
    :is-active="isActive"
    v-model="levers"
    diagram-url=""
  />
</template>
