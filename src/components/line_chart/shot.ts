export class Shot {
    readonly shotTime: Date;
    readonly club: Club;
    readonly flyingDidtance: FlyingDistance;

    constructor(shot: {shotTime: Date, club: Club, flyingDistance: FlyingDistance}) {
        this.shotTime = shot.shotTime
        this.club = shot.club
        this.flyingDidtance = shot.flyingDistance
    }
}

export class FlyingDistance {
    readonly distance: number;

    constructor(_distance: number) {
        if(_distance < 0){
            throw Error('distance must be more than 0')
        }
        this.distance = _distance
    }
}


export const Clubs = {
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
    readonly clubType: ClubTypes;
    readonly clubName: string | undefined;

    constructor(club: { type: ClubTypes, name: string | undefined }) {
        this.clubType = club.type
        this.clubName = club.name
    }
}