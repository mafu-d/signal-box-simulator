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
    id: 0,
    label: ["Ptfm 2", "Loop"],
    type: "point",
    state: false,
    unlockedBy: {},
    unlocked: true,
  },
  {
    id: 1,
    unlocked: true,
    state: false,
    label: "Up Ptfm 1 Start",
    type: "signal",
    unlockedBy: { 6: 0, 11: 1, 14: 1, 12: 0 },
  },
  {
    id: 2,
    unlocked: true,
    state: false,
    label: "Up Ptfm 2 Start",
    type: "signal",
    unlockedBy: { 16: 0, 14: 0, 9: 0, 18: 0 },
  },
  {
    id: 3,
    unlocked: true,
    state: false,
    label: "Up Adv Start",
    type: "signal",
    unlockedBy: { 18: 0 },
  },
  {
    id: 4,
    unlocked: true,
    state: false,
    label: "Up Ptfm 1 Disc",
    type: "signal",
    unlockedBy: { 1: 0, 6: 0, 14: 0, 12: 1, 13: 0 },
  },
  {
    id: 5,
    unlocked: true,
    state: false,
    label: "Up Goods Siding Disc",
    type: "signal",
    unlockedBy: { 6: 1, 11: 1, 13: 0 },
  },
  {
    id: 6,
    unlocked: true,
    state: false,
    label: ["Ptfm 1", "Goods Siding"],
    type: "point",
    unlockedBy: { 7: 0, 1: 0, 5: 0 },
  },
  {
    id: 7,
    unlocked: true,
    state: false,
    label: "FPL for 6",
    type: "fpl",
    unlockedBy: { 13: 0, 17: 0 },
  },
  {
    id: 8,
    unlocked: true,
    state: false,
    label: "Up Loop Disc",
    type: "signal",
    unlockedBy: { 9: 1, 14: 0 },
  },
  {
    id: 9,
    unlocked: true,
    state: false,
    label: ["Ptfm 2", "Loop"],
    type: "point",
    unlockedBy: { 10: 0, 8: 0, 2: 0 },
  },
  {
    id: 10,
    unlocked: true,
    state: false,
    label: "FPL for 9",
    type: "fpl",
    unlockedBy: { 16: 0 },
  },
  {
    id: 11,
    unlocked: true,
    state: false,
    label: "FPL for 14B",
    type: "fpl",
    unlockedBy: { 1: 0, 5: 0 },
  },
  {
    id: 12,
    unlocked: true,
    state: false,
    label: "Down Shed Catch",
    type: "point",
    unlockedBy: { 14: 0, 13: 0, 4: 0, 5: 0 },
  },
  {
    id: 13,
    unlocked: true,
    state: false,
    label: "Down Shed Disc",
    type: "signal",
    unlockedBy: { 12: 1, 14: 0, 7: 1, 1: 0, 5: 0 },
  },
  {
    id: 14,
    unlocked: true,
    state: false,
    label: ["Main", "Sidings"],
    type: "point",
    unlockedBy: { 15: 0, 11: 0, 8: 0, 13: 0, 2: 0 },
  },
  {
    id: 15,
    unlocked: true,
    state: false,
    label: "FPL for 14A",
    type: "fpl",
    unlockedBy: { 16: 0, 17: 0 },
  },
  {
    id: 16,
    unlocked: true,
    state: false,
    label: "Down Ptfm 2 Inner Home",
    type: "signal",
    unlockedBy: { 15: 1, 14: 0, 10: 1, 2: 0 },
  },
  {
    id: 17,
    unlocked: true,
    state: false,
    label: "Down Ptfm 1 Inner Home",
    type: "signal",
    unlockedBy: { 15: 1, 14: 1, 7: 1 },
  },
  {
    id: 18,
    unlocked: true,
    state: false,
    label: "Down Main Home",
    type: "signal",
    unlockedBy: { 3: 0, 2: 0, 8: 0, 1: 0 },
  },
]);
</script>

<template>
  <SignalBox
    v-show="isActive"
    :is-active="isActive"
    v-model="levers"
    diagram-url="/Frontington Signal Box Plan.png"
  />
</template>
