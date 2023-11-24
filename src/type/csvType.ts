
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
    
export const Header: { [K in string]: string } = {
    club: 'Club',
} as const

export type Headers = keyof typeof Header