<script setup>
import { onMounted, ref, useTemplateRef, watch } from 'vue';
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
        // Send latest message to this device
        console.log(`Sending message to device ${device.id}: ${messages.slice(-1)}`);
        const writer = device.port.writable.getWriter();
        const data = new TextEncoder().encode(`${messages.slice(-1)}\n`);
        await writer.write(data);
        writer.releaseLock();
    });
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
</script>

<template>
    <ul>
        <li v-for="device in devices" :key="device.id" class="device">
            {{ device.id }}
            <button @click="editDeviceSettings(device.id)">⚙️</button>
            <button @click="disconnectDevice(device.id)">-</button>
        </li>
        <li>
            <button @click="connectNewDevice">+</button>
        </li>
    </ul>
    <dialog ref="deviceDialogRef">
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
                        <input type="number" min="0" v-model="servoSettings[activeDeviceSettingsId][i - 1].lever_id">
                    </td>
                    <td>
                        <input type="number" min="80" max="550" step="10"
                            v-model="servoSettings[activeDeviceSettingsId][i - 1].off_position">
                    </td>
                    <td>
                        <input type="number" min="80" max="550" step="10"
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
}

button {
    border-radius: 999rem;
    background: #ccc;
    border: 0;
    height: 1.5rem;
    min-width: 1.5rem;
}
</style>