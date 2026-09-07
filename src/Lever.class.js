import { MessageBus } from "./MessageBus";

class Lever {
    constructor(id, label, type, on, off, board_id, servo_ids) {
        this.id = id;
        this.label = label;
        this.type = type;
        this.unlockedBy = combineConstraints(on || [], off || []);
        this.state = false;
        this.unlocked = Object.values(this.unlockedBy).filter(Boolean).length > 0;
        this.board_id = null || board_id;
        this.servo_ids = servo_ids || [];
    }

    easingTypes = {
        point: 1,
        signal: 2,
    };

    setState(state) {
        this.state = state;
        if (this.board_id === null || this.board_id === undefined) return;
        const boardSettings = JSON.parse(localStorage.getItem('servoSettings'))[this.board_id];
        const servoSettings = boardSettings.filter(servo => this.id === servo.lever_id);
        servoSettings.forEach(servo => {
            MessageBus.send(
                this.board_id,
                servo.servo_id,
                state ? servo.on_position : servo.off_position,
                parseInt(servo.easing_type),
                servo.duration
            );
        })
    }
}

const combineConstraints = (on, off) => {
    const constraints = {};
    on.forEach((c) => constraints[c] = 1);
    off.forEach((c) => constraints[c] = 0);
    return constraints;
}

export class Signal extends Lever {
    constructor(id, label, on, off, board_id, servo_ids) {
        super(id, label, "signal", on, off, board_id, servo_ids);
    }
}

export class FacingPointLock extends Lever {
    constructor(id, label, on, off) {
        super(id, label, "fpl", on, off);
    }
}

export class Point extends Lever {
    constructor(id, label, on, off, board_id, servo_ids) {
        super(id, label, "point", on, off, board_id, servo_ids);
    }
}
