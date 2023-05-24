import { addLink } from "../common-utility"

describe('test common utilities', ()=> {
    test('test add link function', () => {
        const newLink = addLink(1, 2, 100);
        expect(newLink).toEqual({
            source: 1,
            target: 2,
            value: 100,
          })
    })
})