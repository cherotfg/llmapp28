const handler = require('../../actions/find-office/index.js')

describe('find_office handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({})
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.offices)).toBe(true)
    })

    test('no country arg returns all offices', async () => {
        const out = await handler({})
        expect(out.structuredContent.offices.length).toBeGreaterThan(0)
        expect(out.content[0].text.length).toBeGreaterThan(0)
    })

    test('"Where is the nearest NS BlueScope office in Indonesia?" filters by country', async () => {
        const out = await handler({ country: 'Indonesia' })
        const offices = out.structuredContent.offices
        expect(offices.length).toBeGreaterThan(0)
        expect(offices.every((o) => o.country === 'Indonesia')).toBe(true)
    })

    test('filter is case-insensitive', async () => {
        const out = await handler({ country: 'singapore' })
        const offices = out.structuredContent.offices
        expect(offices.every((o) => o.country === 'Singapore')).toBe(true)
    })

    test('country with no matches returns empty offices and a no-results message', async () => {
        const out = await handler({ country: 'Antarctica' })
        expect(out.structuredContent.offices).toEqual([])
        expect(out.content[0].text).toMatch(/no.*offices found/i)
    })
})
