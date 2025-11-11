<script setup>
import Frontington from "./components/Frontington.vue";
import { onMounted, ref } from "vue";
import Yard from "./components/Yard.vue";

const activeTab = ref(1);

const signalBoxes = [
  // "Tutherside",
  "Yard",
  "Frontington",
];

const selectPrevious = () => {
  activeTab.value--;
  if (activeTab.value < 0) {
    activeTab.value = signalBoxes.length - 1;
  }
};
const selectNext = () => {
  activeTab.value++;
  if (activeTab.value > signalBoxes.length - 1) {
    activeTab.value = 0;
  }
};
</script>

<template>
  <div class="signal-box">
    <div
      class="switcher"
      @keydown.left="selectPrevious"
      @keydown.right="selectNext"
    >
      <button
        v-for="(tab, index) in signalBoxes"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab }}
      </button>
    </div>
    <Yard
      :is-active="activeTab === 0"
      @arrow-left="selectPrevious"
      @arrow-right="selectNext"
    />
    <Frontington
      :is-active="activeTab === 1"
      @arrow-left="selectPrevious"
      @arrow-right="selectNext"
    />
    <footer>
      <div>
        <span
          >&copy; Matthew Dawkins 2022 - {{ new Date().getFullYear() }}. All
          rights reserved.</span
        >
        <a href="https://github.com/mafu-d/signal-box-simulator" target="_blank"
          >Github</a
        >
      </div>
    </footer>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap");

:root {
  --signal: #d00;
  --point: #200;
  --fpl: #00e;
}

body {
  font-family: "Jost", sans-serif;
  line-height: 1;
}

.switcher {
  padding: 0 3rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.switcher button {
  font: inherit;
  font-size: 1.5rem;
  padding: 0.5rem 3rem;
  &.active {
    background: gray;
  }
}

footer {
  margin-top: 5rem;
  padding: 3rem;
  background: #eee;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
}
footer > div {
  display: flex;
  gap: 1rem;
}
</style>
