import _ from "lodash";
import { ClubCodes, ClubCsvNames, ClubJaNames } from "./csvType";


export interface Club {
    readonly code: ClubCodes
    readonly jaName: ClubJaNames
    readonly csvName: ClubCsvNames
}


/**
 * Driver
 */
export class Driver implements Club{
    readonly code: ClubCodes = 'DR'
    readonly jaName: ClubJaNames = 'ドライバー'
    readonly csvName: ClubCsvNames = 'ドライバー'
}

/**
 * Woods
 */
export class TwoWood implements Club{
    readonly code: ClubCodes = '2W'
    readonly jaName: ClubJaNames = '2 WOOD'
    readonly csvName: ClubCsvNames = '2 wood'
}
export class ThreeWood implements Club{
    readonly code: ClubCodes = '3W'
    readonly jaName: ClubJaNames = '3 WOOD'
    readonly csvName: ClubCsvNames = '3 wood'
}
export class FourWood implements Club{
    readonly code: ClubCodes = '4W'
    readonly jaName: ClubJaNames = '4 WOOD'
    readonly csvName: ClubCsvNames = '4 wood'
}
export class FiveWood implements Club{
    readonly code: ClubCodes = '5W'
    readonly jaName: ClubJaNames = '5 WOOD'
    readonly csvName: ClubCsvNames = '5 wood'
}
export class SixWood implements Club{
    readonly code: ClubCodes = '6W'
    readonly jaName: ClubJaNames = '6 WOOD'
    readonly csvName: ClubCsvNames = '6 wood'
}
export class SevenWood implements Club{
    readonly code: ClubCodes = '7W'
    readonly jaName: ClubJaNames = '7 WOOD'
    readonly csvName: ClubCsvNames = '7 wood'
}
export class EightWood implements Club{
    readonly code: ClubCodes = '8W'
    readonly jaName: ClubJaNames = '8 WOOD'
    readonly csvName: ClubCsvNames = '8 wood'
}
export class NineWood implements Club{
    readonly code: ClubCodes = '9W'
    readonly jaName: ClubJaNames = '9 WOOD'
    readonly csvName: ClubCsvNames = '9 wood'
}

/**
 * Utilities
 */
export class OneUtility implements Club{
    readonly code: ClubCodes = '1UT'
    readonly jaName: ClubJaNames = '1 UT'
    readonly csvName: ClubCsvNames = '1 ut'
}
export class TwoUtility implements Club{
    readonly code: ClubCodes = '2UT'
    readonly jaName: ClubJaNames = '2 UT'
    readonly csvName: ClubCsvNames = '2 ut'
}
export class ThreeUtility implements Club{
    readonly code: ClubCodes = '3UT'
    readonly jaName: ClubJaNames = '3 UT'
    readonly csvName: ClubCsvNames = '3 ut'
}
export class FourUtility implements Club{
    readonly code: ClubCodes = '4UT'
    readonly jaName: ClubJaNames = '4 UT'
    readonly csvName: ClubCsvNames = '4 ut'
}
export class FiveUtility implements Club{
    readonly code: ClubCodes = '5UT'
    readonly jaName: ClubJaNames = '5 UT'
    readonly csvName: ClubCsvNames = '5 ut'
}
export class SixUtility implements Club{
    readonly code: ClubCodes = '6UT'
    readonly jaName: ClubJaNames = '6 UT'
    readonly csvName: ClubCsvNames = '6 ut'
}
export class SevenUtility implements Club{
    readonly code: ClubCodes = '7UT'
    readonly jaName: ClubJaNames = '7 UT'
    readonly csvName: ClubCsvNames = '7 ut'
}
export class EightUtility implements Club{
    readonly code: ClubCodes = '8UT'
    readonly jaName: ClubJaNames = '8 UT'
    readonly csvName: ClubCsvNames = '8 ut'
}
export class NineUtility implements Club{
    readonly code: ClubCodes = '9UT'
    readonly jaName: ClubJaNames = '9 UT'
    readonly csvName: ClubCsvNames = '9 ut'
}

/**
 * Irons
 */
export class OneIron implements Club{
    readonly code: ClubCodes = '1I'
    readonly jaName: ClubJaNames = '1 IRON'
    readonly csvName: ClubCsvNames = '1 iron'
}
export class TwoIron implements Club{
    readonly code: ClubCodes = '2I'
    readonly jaName: ClubJaNames = '2 IRON'
    readonly csvName: ClubCsvNames = '2 iron'
}
export class ThreeIron implements Club{
    readonly code: ClubCodes = '3I'
    readonly jaName: ClubJaNames = '3 IRON'
    readonly csvName: ClubCsvNames = '3 iron'
}
export class FourIron implements Club{
    readonly code: ClubCodes = '4I'
    readonly jaName: ClubJaNames = '4 IRON'
    readonly csvName: ClubCsvNames = '4 iron'
}
export class FiveIron implements Club{
    readonly code: ClubCodes = '5I'
    readonly jaName: ClubJaNames = '5 IRON'
    readonly csvName: ClubCsvNames = '5 iron'
}
export class SixIron implements Club{
    readonly code: ClubCodes = '6I'
    readonly jaName: ClubJaNames = '6 IRON'
    readonly csvName: ClubCsvNames = '6 iron'
}
export class SevenIron implements Club{
    readonly code: ClubCodes = '7I'
    readonly jaName: ClubJaNames = '7 IRON'
    readonly csvName: ClubCsvNames = '7 iron'
}
export class EightIron implements Club{
    readonly code: ClubCodes = '8I'
    readonly jaName: ClubJaNames = '8 IRON'
    readonly csvName: ClubCsvNames = '8 iron'
}
export class NineIron implements Club{
    readonly code: ClubCodes = '9I'
    readonly jaName: ClubJaNames = '9 IRON'
    readonly csvName: ClubCsvNames = '9 iron'
}

/**
 * Wedges
 */
export class PitchingWedge implements Club{
    readonly code: ClubCodes = 'PW'
    readonly jaName: ClubJaNames = 'ピッチングウェッジ'
    readonly csvName: ClubCsvNames = 'ピッチングウェッジ'
}
export class SandWedge implements Club{
    readonly code: ClubCodes = 'SW'
    readonly jaName: ClubJaNames = 'サンドウェッジ'
    readonly csvName: ClubCsvNames = 'サンドウェッジ'
}
export class LobWedge implements Club{
    readonly code: ClubCodes = 'LW'
    readonly jaName: ClubJaNames = 'ロブウェッジ'
    readonly csvName: ClubCsvNames = 'ロブウェッジ'
}
export class FourWedge implements Club{
    readonly code: ClubCodes = '4WG'
    readonly jaName: ClubJaNames = '50°'
    readonly csvName: ClubCsvNames = '50°'
}
export class FiveWedge implements Club{
    readonly code: ClubCodes = '5WG'
    readonly jaName: ClubJaNames = '52°'
    readonly csvName: ClubCsvNames = '52°'
}
export class SixWedge implements Club{
    readonly code: ClubCodes = '6WG'
    readonly jaName: ClubJaNames = '54°'
    readonly csvName: ClubCsvNames = '54°'
}
export class SevenWedge implements Club{
    readonly code: ClubCodes = '7WG'
    readonly jaName: ClubJaNames = '56°'
    readonly csvName: ClubCsvNames = '56°'
}
export class EightWedge implements Club{
    readonly code: ClubCodes = '8WG'
    readonly jaName: ClubJaNames = '58°'
    readonly csvName: ClubCsvNames = '58°'
}
export class NineWedge implements Club{
    readonly code: ClubCodes = '9WG'
    readonly jaName: ClubJaNames = '60°'
    readonly csvName: ClubCsvNames = '60°'
}

/**
 * Putter
 */
export class Putter implements Club{
    readonly code: ClubCodes = 'PT'
    readonly jaName: ClubJaNames = 'パター'
    readonly csvName: ClubCsvNames = 'パター'
}

/**
 * Other
 */
export class Other implements Club{
    readonly code: ClubCodes = 'XXX'
    readonly jaName: ClubJaNames = 'その他'
    readonly csvName: ClubCsvNames = 'その他'
}

