import { reactive } from "vue";

export const MessageBus = reactive({
    messages: [],

    send(board_id, servo_id, position, easing_type, duration) {
        this.messages.push(`SVO:${board_id}|${servo_id.toString().padStart(2, '0')}|${position.toString().padStart(3, '0')}|${easing_type}|${duration.toString().padStart(4, '0')}`);
    }
});