const handler = require('../../actions/browse-brands/index.js')

describe('browse_brands handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({})
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Show me NS BlueScope\'s steel product brands" returns all brands', async () => {
        const out = await handler({})
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.brands.length).toBeGreaterThan(0)
        expect(out.structuredContent.brands.length).toBe(6)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.brands)).toBe(true)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Steel Framing' })
        const brands = out.structuredContent.brands
        expect(brands.length).toBeGreaterThan(0)
        expect(brands.every((b) => b.category === 'Steel Framing')).toBe(true)
    })

    test('unknown category returns zero results with a summary', async () => {
        const out = await handler({ category: 'Nonexistent Category' })
        expect(out.structuredContent.brands).toHaveLength(0)
        expect(out.content[0].text).toMatch(/0|no|found/i)
    })
})
