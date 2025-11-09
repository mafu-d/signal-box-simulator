<script setup>
import { onMounted, ref } from "vue";
import Lever from "./Lever.vue";

const props = defineProps({
  diagramUrl: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  isMuted: {
    type: Boolean,
    default: false,
  },
});

const levers = defineModel();

const stateChanged = async ({ id, newState }) => {
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

  // Send data to Arduino
  sendSerialMessage(`SET_${id}_${newState ? "ON" : "OFF"}`);
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
  if (props.isMuted) return;
  const sound = what === "bell" ? bell : tap;
  sound.value.currentTime = 0;
  sound.value.play();
};

const port = ref();

const connectToArduino = async () => {
  // Request access to serial port
  try {
    port.value = await navigator.serial.requestPort();
    await port.value.open({ baudRate: 9600 });
  } catch (error) {
    port.value = null;
    alert(error);
  }
  setTimeout(() => {
    sendSerialMessage("SERIAL_CONTROL");
  }, 100);
};
const disconnectFromArduino = async () => {
  await sendSerialMessage("BUTTON_CONTROL");
  await port.value?.close();
  port.value = null;
};

const sendSerialMessage = async (msg) => {
  if (!port.value) {
    console.log("Port not open");
    return;
  }
  const writer = port.value.writable.getWriter();
  const data = new TextEncoder().encode(`${msg}\n`);
  await writer.write(data);
  writer.releaseLock();
  console.info(msg);
};

onMounted(() => {
  setLockState();

  document.addEventListener("keydown", (e) => {
    if (!props.isActive) return;
    if (keys.value.includes(e.key) || e.key === "Alt") return;
    keys.value.push(e.key);
  });

  document.addEventListener("keyup", (e) => {
    if (!props.isActive) return;
    let keyPress = keys.value.join("");
    if (keyPress === "Shift!") {
      keyPress = "11";
    }
    keys.value.splice(0, keys.value.length);
    if (keyPress >= 0 && keyPress <= 20) {
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
    <img :src="diagramUrl" alt="Diagram" class="diagram" />
    <div class="telegraph-notes">
      <h2>Telegraph</h2>
      <audio src="bell.mp3" ref="bell" volume="0.5"></audio>
      <audio src="switch.mp3" ref="tap" volume="0.5"></audio>
      <div>
        <button accesskey="b" ref="bellButton" @click="play('bell')">
          <u>B</u>ell (incoming)
        </button>
        <button accesskey="t" ref="tapButton" @click="play('tap')">
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
      <h2>Serial connect</h2>
      <button v-if="port" @click="disconnectFromArduino">Disconnect</button>
      <button v-else @click="connectToArduino">Connect</button>
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
        :is-muted="isMuted"
        @changeState="stateChanged"
      />
    </div>
  </div>
</template>

<style scoped>
.signal-box {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
}

.frame {
  grid-column: 1 / -1;
  display: flex;
  gap: 1px;
  justify-content: center;

  > * {
    flex: 1;
    max-width: 7vw;
  }
}

.diagram {
  width: 100%;
  height: auto;
}
</style>
