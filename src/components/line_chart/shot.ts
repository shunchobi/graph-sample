import { ClubCodes } from "./csvType";

export class Shot {
    readonly shotTime: Date;
    readonly club: Club;
    readonly data: DataValue;
    readonly unit: string;

    constructor(shot: { shotTime: Date, club: Club, data: DataValue, unit: string, }) {
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


export const Clubs = {
    '7WG': undefined,
    '9WG': undefined,
    'SW': undefined,
    'PW': undefined,
    '9I': undefined,
    '8I': undefined,
    '7I': undefined,
    '6I': undefined,
    '5I': undefined,
    '4I': undefined,
    '4UT': undefined,
    '3UT': undefined,
    '5W': undefined,
    '2W': undefined,
    'DR': undefined,
} as const

export type ClubTypes = keyof typeof Clubs


export class Club {
    readonly clubType: ClubCodes;
    readonly clubName: string | undefined;

    constructor(club: { type: ClubCodes, name: string | undefined }) {
        this.clubType = club.type
        this.clubName = club.name
    }
}