<script setup>
import Frontington from "./components/Frontington.vue";
</script>

<template>
  <div class="signal-box">
    <Frontington />
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
