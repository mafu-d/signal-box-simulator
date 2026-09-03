<script setup>
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { MessageBus } from '../MessageBus';

const devices = ref([]);

const connectNewDevice = () => {
    devices.value.push({
        // This will ultimately be set by the message returning from the device identifying itself
        id: devices.value.length + 1,
    });
}

const disconnectDevice = (id) => {
    devices.value = devices.value.filter(i => i.id !== id);
}

watch(() => MessageBus.messages, (messages) => {
    devices.value.forEach(device => {
        // Send latest message to this device
        console.log(`Sending message to device ${device.id}: ${messages.slice(-1)}`)
    });
});

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
        const board_1 = [];
        const board_2 = [];
        for (let index = 0; index < 16; index++) {
            board_1.push({
                servo_id: index,
                lever_id: null,
                off_position: 300,
                on_position: 400,
                easing_type: 1,
                duration: 2000,
            });
            board_2.push({
                servo_id: index,
                lever_id: null,
                off_position: 300,
                on_position: 400,
                easing_type: 1,
                duration: 2000,
            });
        }
        servoSettings.value = [
            board_1,
            board_2,
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
            {{ device.id.toString().slice(-4) }}
            <button @click="editDeviceSettings(device.id)">⚙️</button>
            <button @click="disconnectDevice(device.id)">-</button>
        </li>
        <li>
            <button @click="connectNewDevice">+</button>
        </li>
    </ul>
    <dialog ref="deviceDialogRef">
        <h2>Edit settings for device {{ activeDeviceSettingsId }} :
            <span v-if="activeDeviceSettingsId === 1">Frontington</span>
            <span v-if="activeDeviceSettingsId === 2">Tutherside</span>
        </h2>
        <table v-if="activeDeviceSettingsId">
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
                        <input type="number" min="0"
                            v-model="servoSettings[activeDeviceSettingsId - 1][i - 1].lever_id">
                    </td>
                    <td>
                        <input type="number" min="80" max="550" step="10"
                            v-model="servoSettings[activeDeviceSettingsId - 1][i - 1].off_position">
                    </td>
                    <td>
                        <input type="number" min="80" max="550" step="10"
                            v-model="servoSettings[activeDeviceSettingsId - 1][i - 1].on_position">
                    </td>
                    <td>
                        <select v-model="servoSettings[activeDeviceSettingsId - 1][i - 1].easing_type">
                            <option value="0">Linear</option>
                            <option value="1">Smooth</option>
                            <option value="2">Bounce</option>
                        </select>
                    </td>
                    <td>
                        <input type="number" min="100" max="9900" step="100"
                            v-model="servoSettings[activeDeviceSettingsId - 1][i - 1].duration">
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