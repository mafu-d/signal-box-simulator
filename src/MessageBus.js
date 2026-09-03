import { reactive } from "vue";

export const MessageBus = reactive({
    messages: [],

    send(message) {
        this.messages.push(message);
    }
});