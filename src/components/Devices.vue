<script setup>
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import { MessageBus } from '../MessageBus';

const devices = ref([]);

const connectNewDevice = async () => {
    const device = { id: "unknown" };
    // Request access to serial port
    try {
        device.port = await navigator.serial.requestPort();
        await device.port.open({ baudRate: 9600 });
        // Wait for device to become ready (Arduino reboots after connecting)
        setTimeout(async () => {
            // Get the device ID
            device.id = await getDeviceId(device.port);
            devices.value.push(device);
        }, 2000);
    } catch (error) {
        console.error(error);
    }
}

const getDeviceId = async (port) => {
    let id = null;
    let reader = null;
    let timeoutId = null;

    try {
        if (!port) {
            console.error('Port not open');
            return null;
        }

        // Request the board's ID
        const writer = port.writable.getWriter();
        const data = new TextEncoder().encode("REQID\n");
        await writer.write(data);
        writer.releaseLock();

        // Wait for response
        reader = port.readable.getReader();
        timeoutId = setTimeout(() => {
            console.error('Connection timeout reached');
            reader.cancel();
        }, 10000);

        while (id === null) {
            const { value, done } = await reader.read();
            if (done) {
                break;
            }
            if (value) {
                console.log('Reply received.')
                const text = new TextDecoder().decode(value).trim();
                const idMatch = text.match(/^ID:([0-9]+)/);
                if (idMatch) {
                    id = parseInt(idMatch[1]);
                    console.log(`This is board ${id}.`);
                }
            }
        }
    } catch (error) {
        console.error({ error });
        port.close();
    } finally {
        clearTimeout(timeoutId);
        if (reader) {
            reader.releaseLock();
        }
        console.log('Finished pairing.');
    }

    return id;
}

const disconnectDevice = (id) => {
    devices.value.find(d => d.id === id).port.close();
    devices.value = devices.value.filter(i => i.id !== id);
}

watch(() => MessageBus.messages, (messages) => {
    devices.value.forEach(async (device) => {
        const writer = device.port.writable.getWriter();
        messages.forEach(async (message, index) => {
            // Send latest message to this device
            console.log(`Sending message to device ${device.id}: ${message}`);
            const data = new TextEncoder().encode(`${message}\n`);
            await writer.write(data);
        });
        writer.releaseLock();
    });
    if (MessageBus.messages.length) {
        MessageBus.clear();
    }
}, { deep: true });

const deviceDialogRef = ref(null);
const activeDeviceSettingsId = ref(null);
const editDeviceSettings = (id) => {
    activeDeviceSettingsId.value = id;
    deviceDialogRef.value.showModal();
}

const servoSettings = ref([]);
onMounted(() => {
    servoSettings.value = JSON.parse(localStorage.getItem('servoSettings'));
    if (!servoSettings.value) {
        const board_0 = [];
        const board_1 = [];
        for (let index = 0; index < 16; index++) {
            board_0.push({
                servo_id: index,
                lever_id: null,
                off_position: 300,
                on_position: 400,
                easing_type: 1,
                duration: 2000,
            });
            board_1.push({
                servo_id: index,
                lever_id: null,
                off_position: 300,
                on_position: 400,
                easing_type: 1,
                duration: 2000,
            });
        }
        servoSettings.value = [
            board_0,
            board_1,
        ]
    }
});

watch(() => servoSettings.value, () => {
    localStorage.setItem('servoSettings', JSON.stringify(servoSettings.value));
}, { deep: true });

const previewServoPosition = (deviceId, servoId, position) => {
    MessageBus.send(deviceId, servoId, position || event.target.value, 1, 200);
}
</script>

<template>
    <ul>
        <li v-for="device in devices" :key="device.id" class="device">
            {{ device.id }}
            <button @click="editDeviceSettings(device.id)" title="Settings">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                    <path
                        d="m420.69-116-21.23-107.85q-26.07-9.38-52.96-24.07-26.88-14.7-48.19-33.77L194.46-247l-59.3-103 81.61-71.77q-2.38-13.92-3.96-28.42-1.58-14.5-1.58-29.43 0-14.53 1.58-28.84t3.96-29.77L135.16-610l59.3-102.23 103.46 34.31q22.47-19.46 48.39-33.96t52.77-24.27L420.69-844h118.62l21.23 108.23q28 10.54 52.57 24.27 24.58 13.73 47.43 33.58l105-34.31L824.84-610l-83.15 72.92q3.15 14.69 4.35 28.62 1.19 13.92 1.19 28.46 0 14.15-1.39 28.08-1.38 13.92-3.76 29.77L824.46-350l-59.31 103-104.61-35.08q-22.85 19.85-47.81 33.96-24.96 14.12-52.19 23.89L539.31-116H420.69ZM462-168h35.62L517-268.15q37.62-7 69.46-25.23 31.85-18.24 57.39-48.39L740.23-309l18.39-30-76.77-67.38q6-18.54 9.3-36.47 3.31-17.92 3.31-37.15 0-19.62-3.31-37.15-3.3-17.54-9.3-35.7L759.38-621 741-651l-97.54 32.38q-22.08-27.46-56.61-47.42-34.54-19.96-70.23-25.81L498-792h-36.38l-18.24 99.77q-37.61 6.23-70.03 24.65-32.43 18.43-57.97 48.96L219-651l-18.38 30L277-553.62q-6 16.24-9.5 35.12t-3.5 38.88q0 19.62 3.5 38.12 3.5 18.5 9.12 35.12l-76 67.38L219-309l96-32q24.77 29.38 57.19 47.81 32.43 18.42 70.81 25.42L462-168Zm16.46-188q51.92 0 87.96-36.04 36.04-36.04 36.04-87.96 0-51.92-36.04-87.96Q530.38-604 478.46-604q-51.54 0-87.77 36.04T354.46-480q0 51.92 36.23 87.96Q426.92-356 478.46-356ZM480-480Z" />
                </svg>
            </button>
            <button @click="disconnectDevice(device.id)" title="Disconnect">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                    <path
                        d="M291-253.85 253.85-291l189-189-189-189L291-706.15l189 189 189-189L706.15-669l-189 189 189 189L669-253.85l-189-189-189 189Z" />
                </svg>
            </button>
        </li>
        <li>
            <button @click="connectNewDevice" title="Connect">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                    <path d="M454-454H260v-52h194v-194h52v194h194v52H506v194h-52v-194Z" />
                </svg>
            </button>
        </li>
    </ul>
    <dialog ref="deviceDialogRef" @keyup.stop>
        <h2>Edit settings for device {{ activeDeviceSettingsId }} :
            <span v-if="activeDeviceSettingsId === 0">Tutherside</span>
            <span v-if="activeDeviceSettingsId === 1">Frontington</span>
        </h2>
        <table v-if="activeDeviceSettingsId !== null">
            <thead>
                <tr>
                    <th>Servo ID</th>
                    <th>Lever ID</th>
                    <th>Off position</th>
                    <th>On position</th>
                    <th>Easing</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in 16">
                    <td>{{ i - 1 }}</td>
                    <td>
                        <input type="number" min="0" @focus="previewServoPosition(activeDeviceSettingsId, i - 1, 300)"
                            @change="previewServoPosition(activeDeviceSettingsId, i - 1, 300)"
                            v-model="servoSettings[activeDeviceSettingsId][i - 1].lever_id">
                    </td>
                    <td>
                        <input type="number" min="80" max="550" step="10"
                            @change="previewServoPosition(activeDeviceSettingsId, i - 1, servoSettings[activeDeviceSettingsId][i - 1].off_position)"
                            @focus="previewServoPosition(activeDeviceSettingsId, i - 1, servoSettings[activeDeviceSettingsId][i - 1].off_position)"
                            v-model="servoSettings[activeDeviceSettingsId][i - 1].off_position">
                    </td>
                    <td>
                        <input type="number" min="80" max="550" step="10"
                            @change="previewServoPosition(activeDeviceSettingsId, i - 1, servoSettings[activeDeviceSettingsId][i - 1].on_position)"
                            @focus="previewServoPosition(activeDeviceSettingsId, i - 1, servoSettings[activeDeviceSettingsId][i - 1].on_position)"
                            v-model="servoSettings[activeDeviceSettingsId][i - 1].on_position">
                    </td>
                    <td>
                        <select v-model="servoSettings[activeDeviceSettingsId][i - 1].easing_type">
                            <option value="0">Linear</option>
                            <option value="1">Smooth</option>
                            <option value="2">Bounce</option>
                        </select>
                    </td>
                    <td>
                        <input type="number" min="100" max="9900" step="100"
                            v-model="servoSettings[activeDeviceSettingsId][i - 1].duration">
                    </td>
                </tr>
            </tbody>
        </table>
        <p><button @click="deviceDialogRef.close()">Close</button></p>
    </dialog>
</template>

<style scoped>
ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.device {
    background: #eee;
    padding: 0.25rem;
    padding-left: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 999rem;
    border: 2px solid #ddd;
}

button {
    border-radius: 999rem;
    background: #ccc;
    border: 0;
    height: 2rem;
    min-width: 2rem;

    &:hover {
        background: #aaa;
    }
}
</style>