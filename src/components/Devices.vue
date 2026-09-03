<script setup>
import { ref, watch } from 'vue';
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
</script>

<template>
    <ul>
        <li v-for="device in devices" :key="device.id" class="device">
            {{ device.id.toString().slice(-4) }}
            <button @click="disconnectDevice(device.id)">-</button>
        </li>
        <li>
            <button @click="connectNewDevice">+</button>
        </li>
    </ul>
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
    gap: 0.5rem;
    border-radius: 999rem;
}

button {
    border-radius: 999rem;
    background: #ccc;
    border: 0;
    width: 1.5rem;
    aspect-ratio: 1/1;
}
</style>