const handler = require('../../actions/search-products/index.js');

describe('search_products handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ query: 'Nike' });
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('"Show me some Nike sneakers" returns matching products', async () => {
        const out = await handler({ query: 'Nike' });
        expect(out.content[0].text.length).toBeGreaterThan(0);
        expect(out.structuredContent.products.length).toBeGreaterThan(0);
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ query: 'Nike' });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
        expect(Array.isArray(out.structuredContent.products)).toBe(true);
    });

    test('no args returns all products (no required inputs)', async () => {
        const out = await handler({});
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.structuredContent.products.length).toBeGreaterThan(0);
    });

    test('filters by category', async () => {
        const out = await handler({ category: 'Skate Shoes' });
        const products = out.structuredContent.products;
        expect(products.length).toBeGreaterThan(0);
        expect(products.every((p) => p.category === 'Skate Shoes')).toBe(true);
    });

    test('respects max_results limit', async () => {
        const out = await handler({ max_results: 2 });
        expect(out.structuredContent.products.length).toBe(2);
    });

    test('unmatched query returns zero results and a no-results message', async () => {
        const out = await handler({ query: 'zzzznotarealproduct' });
        expect(out.structuredContent.products.length).toBe(0);
        expect(out.content[0].text).toMatch(/no products found/i);
    });
});
