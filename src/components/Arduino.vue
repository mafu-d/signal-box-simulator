<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  levers: {
    type: Array,
    required: true,
  },
});

const consoleIsVisible = ref(false);

const messages = ref([]);

const addOutgoingMessage = (message) => {
  messages.value.push({
    type: "outgoing",
    message: message,
  });
};

const addIncomingMessage = (message) => {
  messages.value.push({
    type: "incoming",
    message: message,
  });
};

let previousLevers = JSON.parse(JSON.stringify(props.levers));

// Watch for changes in levers
watch(
  () => props.levers,
  (levers) => {
    // If a lever has changed state send the instruction to the Arduino
    levers.forEach((lever, index) => {
      if (lever.state !== previousLevers[index].state) {
        sendSerialMessage(`SET_${lever.id}_${lever.state ? "ON" : "OFF"}`);
      }
    });
    // Update previous levers
    previousLevers = JSON.parse(JSON.stringify(levers));
  },
  { deep: true }
);

const port = ref();

const connectToArduino = async () => {
  // Request access to serial port
  try {
    port.value = await navigator.serial.requestPort();
    await port.value.open({ baudRate: 9600 });
    // Listen for incoming data
    readLoop();
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
  addOutgoingMessage(msg);
  if (!port.value) {
    // console.log("Port not open");
    return;
  }
  const writer = port.value.writable.getWriter();
  const data = new TextEncoder().encode(`${msg}\n`);
  await writer.write(data);
  writer.releaseLock();
  //   console.info(msg);
};

let keepReading = false;
let reader = null;
async function readLoop() {
  keepReading = true;

  try {
    reader = port.readable.getReader();

    while (keepReading && port.readable) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      if (value) {
        const text = new TextDecoder().decode(value);
        // messages.value.push(text.trim());
        addIncomingMessage(text.trim());

        // Process incoming data
        // handleArduinoMessage(text.trim());
      }
    }
  } catch (error) {
    console.error("Read error:", error);
  } finally {
    if (reader) {
      reader.releaseLock();
    }
  }
}
</script>

<template>
  <button v-if="port" @click="disconnectFromArduino">Disconnect</button>
  <button v-else @click="connectToArduino">Connect</button>
  <button @click="consoleIsVisible = true">Console</button>
  <div v-if="consoleIsVisible" class="console">
    <button @click="consoleIsVisible = false">&times;</button>
    <div
      v-for="(message, index) in messages"
      :key="index"
      :class="message.type"
    >
      {{ message.message }}
    </div>
  </div>
</template>

<style scoped>
.console {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  height: 300px;
  overflow-y: auto;
  padding: 1rem;
  background: #000b;
  color: white;
  font-family: monospace;
  backdrop-filter: blur(10px);
  z-index: 2;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);

  button {
    position: absolute;
    top: 0;
    right: 0;
  }

  .incoming {
    color: #ff0;
    text-align: right;
  }
  .outgoing {
    color: #0ff;
  }
}
</style>
