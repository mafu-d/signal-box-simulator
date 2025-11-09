<script setup>
import Frontington from "./components/Frontington.vue";
import { onMounted, ref } from "vue";

const activeTab = ref(2);

const selectPrevious = () => {
  activeTab.value--;
  if (activeTab.value < 0) {
    activeTab.value = 2;
  }
};
const selectNext = () => {
  activeTab.value++;
  if (activeTab.value > 2) {
    activeTab.value = 0;
  }
};
</script>

<template>
  <div
    class="signal-box"
    @keydown.left="selectPrevious"
    @keydown.right="selectNext"
  >
    <div class="switcher">
      <button
        v-for="(tab, index) in ['Tutherside', 'Yard', 'Frontington']"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab }}
      </button>
    </div>
    <Frontington v-show="activeTab === 2" />
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
  padding: 1rem 3rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.switcher button {
  font: inherit;
  font-size: 2rem;
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
