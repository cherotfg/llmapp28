const handler = require('../../actions/get-current-deals/index.js')

describe('get_current_deals handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({})
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"What Nike shoes are on sale right now?" returns current deals', async () => {
        const out = await handler({})
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.deals.length).toBeGreaterThan(0)
        expect(out.structuredContent.deals.every((d) => d.is_deal === true)).toBe(true)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.deals)).toBe(true)
    })

    test('filters deals by category', async () => {
        const out = await handler({ category: 'Golf Shoes' })
        const deals = out.structuredContent.deals
        expect(deals.length).toBeGreaterThan(0)
        expect(deals.every((d) => d.category === 'Golf Shoes')).toBe(true)
    })

    test('limits results with max_results', async () => {
        const out = await handler({ max_results: 1 })
        expect(out.structuredContent.deals.length).toBe(1)
    })

    test('returns no deals for a category with no sale items', async () => {
        const out = await handler({ category: 'Skate Shoes' })
        expect(out.structuredContent.deals).toHaveLength(0)
        expect(out.content[0].text).toMatch(/no current deals/i)
    })
})
