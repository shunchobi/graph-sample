import _ from "lodash";
import { ClubCsvName } from "./csvType";
import { ClubCode } from "./clubCode";
import { ClubJaName } from "./clubJaName";


export interface Club {
    readonly code: ClubCode
    readonly jaName: ClubJaName
    readonly csvName: ClubCsvName
}


/**
 * Driver
 */
export class Driver implements Club{
    readonly code: ClubCode = 'DR'
    readonly jaName: ClubJaName = 'ドライバー'
    readonly csvName: ClubCsvName = 'ドライバー'
}

/**
 * Woods
 */
export class TwoWood implements Club{
    readonly code: ClubCode = '2W'
    readonly jaName: ClubJaName = '2 WOOD'
    readonly csvName: ClubCsvName = '2 wood'
}
export class ThreeWood implements Club{
    readonly code: ClubCode = '3W'
    readonly jaName: ClubJaName = '3 WOOD'
    readonly csvName: ClubCsvName = '3 wood'
}
export class FourWood implements Club{
    readonly code: ClubCode = '4W'
    readonly jaName: ClubJaName = '4 WOOD'
    readonly csvName: ClubCsvName = '4 wood'
}
export class FiveWood implements Club{
    readonly code: ClubCode = '5W'
    readonly jaName: ClubJaName = '5 WOOD'
    readonly csvName: ClubCsvName = '5 wood'
}
export class SixWood implements Club{
    readonly code: ClubCode = '6W'
    readonly jaName: ClubJaName = '6 WOOD'
    readonly csvName: ClubCsvName = '6 wood'
}
export class SevenWood implements Club{
    readonly code: ClubCode = '7W'
    readonly jaName: ClubJaName = '7 WOOD'
    readonly csvName: ClubCsvName = '7 wood'
}
export class EightWood implements Club{
    readonly code: ClubCode = '8W'
    readonly jaName: ClubJaName = '8 WOOD'
    readonly csvName: ClubCsvName = '8 wood'
}
export class NineWood implements Club{
    readonly code: ClubCode = '9W'
    readonly jaName: ClubJaName = '9 WOOD'
    readonly csvName: ClubCsvName = '9 wood'
}

/**
 * Utilities
 */
export class OneUtility implements Club{
    readonly code: ClubCode = '1UT'
    readonly jaName: ClubJaName = '1 UT'
    readonly csvName: ClubCsvName = '1 ut'
}
export class TwoUtility implements Club{
    readonly code: ClubCode = '2UT'
    readonly jaName: ClubJaName = '2 UT'
    readonly csvName: ClubCsvName = '2 ut'
}
export class ThreeUtility implements Club{
    readonly code: ClubCode = '3UT'
    readonly jaName: ClubJaName = '3 UT'
    readonly csvName: ClubCsvName = '3 ut'
}
export class FourUtility implements Club{
    readonly code: ClubCode = '4UT'
    readonly jaName: ClubJaName = '4 UT'
    readonly csvName: ClubCsvName = '4 ut'
}
export class FiveUtility implements Club{
    readonly code: ClubCode = '5UT'
    readonly jaName: ClubJaName = '5 UT'
    readonly csvName: ClubCsvName = '5 ut'
}
export class SixUtility implements Club{
    readonly code: ClubCode = '6UT'
    readonly jaName: ClubJaName = '6 UT'
    readonly csvName: ClubCsvName = '6 ut'
}
export class SevenUtility implements Club{
    readonly code: ClubCode = '7UT'
    readonly jaName: ClubJaName = '7 UT'
    readonly csvName: ClubCsvName = '7 ut'
}
export class EightUtility implements Club{
    readonly code: ClubCode = '8UT'
    readonly jaName: ClubJaName = '8 UT'
    readonly csvName: ClubCsvName = '8 ut'
}
export class NineUtility implements Club{
    readonly code: ClubCode = '9UT'
    readonly jaName: ClubJaName = '9 UT'
    readonly csvName: ClubCsvName = '9 ut'
}

/**
 * Irons
 */
export class OneIron implements Club{
    readonly code: ClubCode = '1I'
    readonly jaName: ClubJaName = '1 IRON'
    readonly csvName: ClubCsvName = '1 iron'
}
export class TwoIron implements Club{
    readonly code: ClubCode = '2I'
    readonly jaName: ClubJaName = '2 IRON'
    readonly csvName: ClubCsvName = '2 iron'
}
export class ThreeIron implements Club{
    readonly code: ClubCode = '3I'
    readonly jaName: ClubJaName = '3 IRON'
    readonly csvName: ClubCsvName = '3 iron'
}
export class FourIron implements Club{
    readonly code: ClubCode = '4I'
    readonly jaName: ClubJaName = '4 IRON'
    readonly csvName: ClubCsvName = '4 iron'
}
export class FiveIron implements Club{
    readonly code: ClubCode = '5I'
    readonly jaName: ClubJaName = '5 IRON'
    readonly csvName: ClubCsvName = '5 iron'
}
export class SixIron implements Club{
    readonly code: ClubCode = '6I'
    readonly jaName: ClubJaName = '6 IRON'
    readonly csvName: ClubCsvName = '6 iron'
}
export class SevenIron implements Club{
    readonly code: ClubCode = '7I'
    readonly jaName: ClubJaName = '7 IRON'
    readonly csvName: ClubCsvName = '7 iron'
}
export class EightIron implements Club{
    readonly code: ClubCode = '8I'
    readonly jaName: ClubJaName = '8 IRON'
    readonly csvName: ClubCsvName = '8 iron'
}
export class NineIron implements Club{
    readonly code: ClubCode = '9I'
    readonly jaName: ClubJaName = '9 IRON'
    readonly csvName: ClubCsvName = '9 iron'
}

/**
 * Wedges
 */
export class PitchingWedge implements Club{
    readonly code: ClubCode = 'PW'
    readonly jaName: ClubJaName = 'ピッチングウェッジ'
    readonly csvName: ClubCsvName = 'ピッチングウェッジ'
}
export class SandWedge implements Club{
    readonly code: ClubCode = 'SW'
    readonly jaName: ClubJaName = 'サンドウェッジ'
    readonly csvName: ClubCsvName = 'サンドウェッジ'
}
export class LobWedge implements Club{
    readonly code: ClubCode = 'LW'
    readonly jaName: ClubJaName = 'ロブウェッジ'
    readonly csvName: ClubCsvName = 'ロブウェッジ'
}
export class FourWedge implements Club{
    readonly code: ClubCode = '4WG'
    readonly jaName: ClubJaName = '50°'
    readonly csvName: ClubCsvName = '50°'
}
export class FiveWedge implements Club{
    readonly code: ClubCode = '5WG'
    readonly jaName: ClubJaName = '52°'
    readonly csvName: ClubCsvName = '52°'
}
export class SixWedge implements Club{
    readonly code: ClubCode = '6WG'
    readonly jaName: ClubJaName = '54°'
    readonly csvName: ClubCsvName = '54°'
}
export class SevenWedge implements Club{
    readonly code: ClubCode = '7WG'
    readonly jaName: ClubJaName = '56°'
    readonly csvName: ClubCsvName = '56°'
}
export class EightWedge implements Club{
    readonly code: ClubCode = '8WG'
    readonly jaName: ClubJaName = '58°'
    readonly csvName: ClubCsvName = '58°'
}
export class NineWedge implements Club{
    readonly code: ClubCode = '9WG'
    readonly jaName: ClubJaName = '60°'
    readonly csvName: ClubCsvName = '60°'
}

/**
 * Putter
 */
export class Putter implements Club{
    readonly code: ClubCode = 'PT'
    readonly jaName: ClubJaName = 'パター'
    readonly csvName: ClubCsvName = 'パター'
}

/**
 * Other
 */
export class Other implements Club{
    readonly code: ClubCode = 'XXX'
    readonly jaName: ClubJaName = 'その他'
    readonly csvName: ClubCsvName = 'その他'
}

