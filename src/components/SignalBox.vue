<script setup>
import { onMounted, ref } from "vue";
import Lever from "./Lever.vue";
import Arduino from "./Arduino.vue";

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
  // sendSerialMessage(`SET_${id}_${newState ? "ON" : "OFF"}`);
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

// const message = ref("");

// const port = ref();

// const connectToArduino = async () => {
//   // Request access to serial port
//   try {
//     port.value = await navigator.serial.requestPort();
//     await port.value.open({ baudRate: 9600 });
//   } catch (error) {
//     port.value = null;
//     alert(error);
//   }
//   setTimeout(() => {
//     sendSerialMessage("SERIAL_CONTROL");
//   }, 100);
// };
// const disconnectFromArduino = async () => {
//   await sendSerialMessage("BUTTON_CONTROL");
//   await port.value?.close();
//   port.value = null;
// };

// const sendSerialMessage = async (msg) => {
//   message.value = msg;
//   if (!port.value) {
//     console.log("Port not open");
//     return;
//   }
//   const writer = port.value.writable.getWriter();
//   const data = new TextEncoder().encode(`${msg}\n`);
//   await writer.write(data);
//   writer.releaseLock();
//   console.info(msg);
// };

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
    if (keyPress === 'Shift"') {
      keyPress = "22";
    }
    keys.value.splice(0, keys.value.length);
    if (keyPress >= 0 && keyPress <= 30 && keyPress !== "") {
      console.log({ keyPress });
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
    if (keyPress === "ArrowLeft") {
      emit("arrow-left");
    }
    if (keyPress === "ArrowRight") {
      emit("arrow-right");
    }
    console.log(keyPress);
  });
});

const emit = defineEmits(["arrow-left", "arrow-right"]);
</script>

<template>
  <div class="signal-box">
    <img :src="diagramUrl" alt="Diagram" class="diagram" />
    <div class="audio-controls">
      <h2>Serial connect</h2>
      <!-- <button v-if="port" @click="disconnectFromArduino">Disconnect</button>
      <button v-else @click="connectToArduino">Connect</button> -->
      <Arduino :levers="levers" />
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
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  align-items: center;
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
