const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ name: 'Air Jordan 1 Low SE' })
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Tell me more about the Air Jordan 1 Low SE" returns product details', async () => {
        const out = await handler({ name: 'Air Jordan 1 Low SE' })
        expect(out.content[0].text).toContain('Air Jordan 1 Low SE')
        expect(out.structuredContent).toBeDefined()
        expect(out.structuredContent.name).toBe('Air Jordan 1 Low SE')
        expect(out.structuredContent.price).toBe('S$189')
        expect(out.structuredContent.category).toBe("Men's Shoes")
    })

    test('structuredContent is a plain flat object, not a bare array', async () => {
        const out = await handler({ name: 'Air Jordan 1 Low SE' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(out.structuredContent.product).toBeUndefined()
        expect(out.structuredContent.image_url).toEqual(expect.any(String))
    })

    test('matches case-insensitively and by partial name', async () => {
        const out = await handler({ name: 'nike dunk low' })
        expect(out.structuredContent.name).toBe('Nike Dunk Low Retro Premium')
    })

    test('returns error message when name is missing', async () => {
        const out = await handler({})
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0].text).toMatch(/provide|name/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('unknown product returns not-found and no structuredContent', async () => {
        const out = await handler({ name: 'Nonexistent Shoe 9000' })
        expect(out.content[0].text).toMatch(/no product details found/i)
        expect(out.structuredContent).toBeUndefined()
    })
})
