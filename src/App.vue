<script setup>
import { onMounted, ref } from "vue";
import Lever from "./components/Lever.vue";

const levers = ref([
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

const stateChanged = ({ id, newState }) => {
  if (!levers.value.find((lever) => lever.id == id)) {
    console.log(`lever ${id} not found`);
    return;
  }
  if (!levers.value.find((lever) => lever.id == id).unlocked) {
    console.log("lever not unlocked");
    return;
  }
  if (levers.value.find((lever) => lever.id == id).state == newState) {
    console.log("lever already in this state");
    return;
  }
  levers.value.find((lever) => lever.id == id).state = newState;
  setLockState();
};

const setLockState = () => {
  levers.value.forEach((lever) => {
    lever.unlocked = true;
    if (!lever.unlockedBy) return;
    for (const conditionId in lever.unlockedBy) {
      if (
        levers.value.find((conditionLever) => conditionLever.id == conditionId)
          .state != lever.unlockedBy[conditionId]
      ) {
        lever.unlocked = false;
        return;
      }
    }
  });
};

const keys = ref([]);

const bell = ref();
const tap = ref();
const bellButton = ref();
const tapButton = ref();

const play = (what) => {
  const sound = what === "bell" ? bell : tap;
  sound.value.currentTime = 0;
  sound.value.play();
};

onMounted(() => {
  setLockState();

  document.addEventListener("keydown", (e) => {
    if (keys.value.includes(e.key)) return;
    keys.value.push(e.key);
  });

  document.addEventListener("keyup", (e) => {
    let keyPress = keys.value.join("");
    if (keyPress === "Shift!") {
      keyPress = "11";
    }
    keys.value.splice(0, keys.value.length);
    if (keyPress >= 1 && keyPress <= 18) {
      stateChanged({
        id: parseInt(keyPress),
        newState: !levers.value.find((lever) => lever.id == keyPress).state,
      });
    }
    if (keyPress === "b") {
      bellButton.value.focus();
      bellButton.value.click();
    }
    if (keyPress === "t") {
      tapButton.value.focus();
      tapButton.value.click();
    }
    console.log(keyPress);
  });
});
</script>

<template>
  <div class="signal-box">
    <img
      src="/public/Frontington Signal Box Plan.png"
      alt="Diagram"
      class="diagram"
    />
    <div class="telegraph-notes">
      <h2>Telegraph</h2>
      <audio src="bell.mp3" ref="bell" volume="0.5"></audio>
      <audio src="switch.mp3" ref="tap" volume="0.5"></audio>
      <div>
        <button accesskey="b" ref="bellButton" @click="play('bell')">
          <u>B</u>ell (incoming)
        </button>
        <button accesskey="s" ref="tapButton" @click="play('tap')">
          <u>T</u>ap (outgoing)
        </button>
      </div>
      <p>1: Attention</p>
      <ul>
        <li>1-2: Branch freight train</li>
        <li>1-3: Branch passenger train</li>
        <li>2-3: Light engine</li>
        <li>3-1: Mixed train (passenger and freight)</li>
        <li>3-1-3: Auto-train</li>
      </ul>
      <p>2: Train entering section</p>
      <p>2-1: Train arrived</p>
    </div>
    <div class="audio-controls">
      <h2>Ambience</h2>
      <audio
        src="https://sound-effects-media.bbcrewind.co.uk/mp3/0009032.mp3"
        controls
        loop
      ></audio>
    </div>
    <div class="frame">
      <Lever
        v-for="lever in levers"
        :key="lever.id"
        :id="lever.id"
        :label="lever.label"
        :type="lever.type"
        :state="lever.state"
        :unlockedBy="lever.unlockedBy"
        :unlocked="lever.unlocked"
        @changeState="stateChanged"
      />
    </div>
    <footer>
      <div>
        <span>&copy; Matthew Dawkins 2022. All rights reserved.</span>
        <a href="https://github.com/mafu-d/signal-box-simulator" target="_blank"
          >Github</a
        >
      </div>
      <div>
        <img
          src="https://api.thegreenwebfoundation.org/greencheckimage/signalbox.matthewdawkins.co.uk?nocache=true"
          alt="This website is hosted Green - checked by thegreenwebfoundation.org"
        />
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

.signal-box {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
}

.frame {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  /* flex-wrap: wrap; */
  gap: 1px;
}

.diagram {
  width: 100%;
  height: auto;
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
