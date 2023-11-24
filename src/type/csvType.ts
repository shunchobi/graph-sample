
export type ClubCsvName =
    'その他' |
    'パター' |
    '60°' |
    '58°' |
    '56°' |
    '54°' |
    '52°' |
    '50°' |
    'ピッチングウェッジ' |
    'サンドウェッジ' |
    'ロブウェッジ' |
    '9 iron' |
    '8 iron' |
    '7 iron' |
    '6 iron' |
    '5 iron' |
    '4 iron' |
    '3 iron' |
    '2 iron' |
    '1 iron' |
    '9 ut' |
    '8 ut' |
    '7 ut' |
    '6 ut' |
    '5 ut' |
    '4 ut' |
    '3 ut' |
    '2 ut' |
    '1 ut' |
    '9 wood' |
    '8 wood' |
    '7 wood' |
    '6 wood' |
    '5 wood' |
    '4 wood' |
    '3 wood' |
    '2 wood' |
    'ドライバー'


export type ClubJaName =
    'その他' |
    'パター' |
    '60°' |
    '58°' |
    '56°' |
    '54°' |
    '52°' |
    '50°' |
    'ピッチングウェッジ' |
    'サンドウェッジ' |
    'ロブウェッジ' |
    '9 IRON' |
    '8 IRON' |
    '7 IRON' |
    '6 IRON' |
    '5 IRON' |
    '4 IRON' |
    '3 IRON' |
    '2 IRON' |
    '1 IRON' |
    '9 UT' |
    '8 UT' |
    '7 UT' |
    '6 UT' |
    '5 UT' |
    '4 UT' |
    '3 UT' |
    '2 UT' |
    '1 UT' |
    '9 WOOD' |
    '8 WOOD' |
    '7 WOOD' |
    '6 WOOD' |
    '5 WOOD' |
    '4 WOOD' |
    '3 WOOD' |
    '2 WOOD' |
    'ドライバー'


export type ClubCode =
    'XXX' |
    'PT' |
    '9WG' |
    '8WG' |
    '7WG' |
    '6WG' |
    '5WG' |
    '4WG' |
    'LW' |
    'SW' |
    'PW' |
    '9I' |
    '8I' |
    '7I' |
    '6I' |
    '5I' |
    '4I' |
    '3I' |
    '2I' |
    '1I' |
    '9UT' |
    '8UT' |
    '7UT' |
    '6UT' |
    '5UT' |
    '4UT' |
    '3UT' |
    '2UT' |
    '1UT' |
    '9W' |
    '8W' |
    '7W' |
    '6W' |
    '5W' |
    '4W' |
    '3W' |
    '2W' |
    'DR'

export const Header: { [K in string]: string } = {
    club: 'Club',
} as const

export type Headers = keyof typeof Header