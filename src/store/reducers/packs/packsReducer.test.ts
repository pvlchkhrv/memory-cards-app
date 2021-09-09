import {PacksStateType, PackType} from '../../../types/packsTypes';
import {packsReducer, setCardPacksTotalCount, setPacks, setPage, setPageCount} from './packsReducer';

let startState: PacksStateType

const generatePacks = (): Array<PackType> => {
    const packs = []
    for (let i = 0; i < 10; i++) {
        packs.push({
            _id: i.toString(),
            user_id: i.toString(),
            name: `Pack ${i}`,
            path: 'string',
            grade: i,
            shots: i,
            rating: i,
            type: 'string',
            created: String(Date.now),
            updated: String(Date.now),
            cardsCount: i,
            __v: i
        })
    }
    return packs
}

beforeEach(() => {
    startState = {
        packs: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 10
    }
});

describe('check if packsReducer implements correctly', () => {
    it('packs array should be set', () => {
        const packs = generatePacks()
        const output = packsReducer(startState, setPacks(packs))
        expect(output.packs[0]._id).toBe('0')
        expect(output.packs[1].name).toBe('Pack 1')
        expect(output.packs[1]).toHaveProperty('user_id')
    })
    it('page should be changed', () => {
        const output = packsReducer(startState, setPage(5))
        expect(output.page).toBe(5)
    })
    it('pageCount should be changed', () => {
        const output = packsReducer(startState, setPageCount(10))
        expect(output.pageCount).toBe(10)
    })
    it('total packs count should be changed', () => {
        const output = packsReducer(startState, setCardPacksTotalCount(100))
        expect(output.cardPacksTotalCount).toBe(100)
    })
})
