<script setup>
import { ref } from "vue";
import SignalBox from "./SignalBox.vue";

defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});

const levers = ref([
  {
    id: 1,
    label: ["Back", "Front"],
    type: "point",
    state: false,
    unlockedBy: {},
    unlocked: true,
  },
  {
    id: 2,
    label: ["Back", "Front"],
    type: "point",
    state: false,
    unlockedBy: {},
    unlocked: true,
  },
  {
    id: 3,
    label: ["Main", "Fiddle Yard"],
    type: "point",
    state: false,
    unlockedBy: {},
    unlocked: true,
  },
  {
    id: 4,
    label: ["Main", "Loop"],
    type: "point",
    state: false,
    unlockedBy: {},
    unlocked: true,
  },
]);
</script>

<template>
  <SignalBox
    v-show="isActive"
    :is-active="isActive"
    is-muted
    v-model="levers"
    diagram-url="/Yard Signal Box Plan.png"
  />
</template>
