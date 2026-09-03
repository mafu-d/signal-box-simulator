<script setup>
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { MessageBus } from '../MessageBus';

const devices = ref([]);

const connectNewDevice = () => {
    devices.value.push({
        id: new Date().getTime(),
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
        <h2>Edit settings for device {{ activeDeviceSettingsId }}</h2>
        <select>
            <option value="1">Frontington</option>
            <option value="2">Tutherside</option>
        </select>
        <table>
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
                        <input type="number" min="0">
                    </td>
                    <td>
                        <input type="number" min="80" max="550" step="10">
                    </td>
                    <td>
                        <input type="number" min="80" max="550" step="10">
                    </td>
                    <td>
                        <select>
                            <option value="0">Linear</option>
                            <option value="1">Smooth</option>
                            <option value="2">Bounce</option>
                        </select>
                    </td>
                    <td>
                        <input type="number" min="100" max="9900" step="100">
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