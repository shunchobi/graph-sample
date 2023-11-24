import { Club } from "./club";


export class Shot {
    readonly shotTime: Date;
    readonly club: Club;
    readonly data: DataValue;
    readonly unit: string;

    constructor(shot: {
        readonly shotTime: Date,
        readonly club: Club,
        readonly data: DataValue,
        readonly unit: string,
    }) {
        this.shotTime = shot.shotTime
        this.club = shot.club
        this.data = shot.data
        this.unit = shot.unit
    }
}

export class DataValue {
    readonly value: number;
    constructor(_value: number) {
        this.value = _value
    }
}