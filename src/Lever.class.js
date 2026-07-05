class Lever
{
    constructor(id, label, type, on, off)
    {
        this.id = id;
        this.label = label;
        this.type = type;
        this.unlockedBy = combineConstraints(on || [], off || []);
        this.state = false;
        this.unlocked = Object.values(this.unlockedBy).filter(Boolean).length > 0;
    }
}

const combineConstraints = (on, off) => {
    const constraints = {};
    on.forEach((c) => constraints[c] = 1);
    off.forEach((c) => constraints[c] = 0);
    return constraints;
}

export class Signal extends Lever
{
    constructor(id, label, on, off)
    {
        super(id, label, "signal", on, off);
    }
}

export class FacingPointLock extends Lever
{
    constructor(id, label, on, off)
    {
        super(id, label, "fpl", on, off);
    }
}

export class Point extends Lever
{
    constructor(id, label, on, off)
    {
        super(id, label, "point", on, off);
    }
}
