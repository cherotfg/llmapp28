const handler = require('../../actions/get-brand-details/index.js')

describe('get_brand_details handler', () => {
    test('returns content block array shape on happy path', async () => {
        const out = await handler({ name: 'COLORBOND® steel' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Tell me more about COLORBOND steel" returns brand details', async () => {
        const out = await handler({ name: 'COLORBOND' })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.name).toBe('COLORBOND® steel')
        expect(out.structuredContent.category).toBe('Coated & Painted Steel')
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ name: 'ZINCALUME® steel' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('returns error message when required name is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/name|provide/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('unknown brand returns not-found message with no structuredContent', async () => {
        const out = await handler({ name: 'Nonexistent Brand' })
        expect(out.content[0].text).toMatch(/no brand details|not found/i)
        expect(out.structuredContent).toBeUndefined()
    })
})
