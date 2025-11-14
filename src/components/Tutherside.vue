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
    unlockedBy: {},
  },
  {
    id: 2,
    type: "signal",
    label: "Up Ptfm 2 Start",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 3,
    type: "signal",
    label: "Up F'ton Adv Start",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 4,
    type: "signal",
    label: "Up G'Bdg Adv Start",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 5,
    type: "signal",
    label: "Up Ptfm 2 Head",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 6,
    type: "signal",
    label: "Up Loop Head",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 7,
    type: "point",
    label: "Loop Head",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 8,
    type: "signal",
    label: "Up Loop",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 9,
    type: "signal",
    label: "Up Goods",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 10,
    type: "point",
    label: ["Loop", "Goods"],
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 11,
    type: "point",
    label: "Ptfm 2 Catch",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 12,
    type: "point",
    label: "Ptfm 1 Catch",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 13,
    type: "point",
    label: ["Ptfm 2", "Loop"],
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 14,
    type: "fpl",
    label: "FPL for 13",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 15,
    type: "point",
    label: ["Ptfm 2", "Ptfm 1"],
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 16,
    type: "fpl",
    label: "FPL for 15",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 17,
    type: "point",
    label: ["G'Bdg", "F'ton"],
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 18,
    type: "fpl",
    label: "FPL for 17",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 19,
    type: "signal",
    label: "Down Ptfm 2 Head",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 20,
    type: "signal",
    label: "Down Loop Head",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 21,
    type: "signal",
    label: "Down Head",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 22,
    type: "signal",
    label: "Down Ptfm 1 Inner Home",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 23,
    type: "signal",
    label: "Down Ptfm 2 Inner Home",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 24,
    type: "signal",
    label: "Down F'ton Home",
    state: false,
    unlocked: false,
    unlockedBy: {},
  },
  {
    id: 25,
    type: "signal",
    label: "Down G'Bdg Home",
    state: false,
    unlocked: false,
    unlockedBy: {},
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
