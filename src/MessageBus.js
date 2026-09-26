import { reactive } from "vue";

export const MessageBus = reactive({
    messages: [],

    send(board_id, servo_id, position, easing_type, duration) {
        const message = `SVO:${board_id}|${servo_id.toString().padStart(2, '0')}|${position.toString().padStart(3, '0')}|${easing_type}|${duration.toString().padStart(4, '0')}`;
        this.messages.push(message);
        // console.log(message);
    },

    clear() {
        this.messages = [];
    }
});