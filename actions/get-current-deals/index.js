// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Air Jordan 1 Low SE',
        description: 'Iconic low-top Air Jordan 1 sneaker in a special edition colorway.',
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/52388c3f-04cc-4058-b9c9-cc8584ca28de/AIR+JORDAN+1+LOW+SE.png',
        price: 'S$189',
        category: "Men's Shoes"
    },
    {
        name: 'Nike Air Max 95 Big Bubble SE',
        description: 'Air Max 95 with visible Big Bubble cushioning in a special edition finish.',
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9ab80620-f2d0-4e98-89fe-3ee608773d60/NIKE+AIR+MAX+95+BIG+BUBBLE+SE.png',
        price: 'S$269',
        category: "Men's Shoes"
    },
    {
        name: 'Nike Dunk Low Retro Premium',
        description: 'Classic Dunk Low silhouette with premium materials.',
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b010b543-7ed4-489e-bbd0-96cd4539d958/NIKE+DUNK+LOW+RETRO+PRM.png',
        price: 'S$179',
        category: "Men's Shoes"
    },
    {
        name: 'Nike SB Code 58',
        description: 'Skateboarding shoe built for board feel and durability.',
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/dedc3d1f-bd3e-476c-a313-1d54122a555f/NIKE+SB+CODE+58.png',
        price: 'S$129',
        category: 'Skate Shoes'
    },
    {
        name: 'Nike ACG LDV',
        description: 'ACG-inspired trail lifestyle shoe with rugged suede detailing.',
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/14cbcdef-49ea-4b6e-bfa7-91a011ddecb1/NIKE+ACG+LDV.png',
        price: 'S$199',
        category: "Men's Shoes"
    },
    {
        name: "Nike Air Force 1 '07 LV8",
        description: 'The classic Air Force 1 in an elevated LV8 build.',
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/06769520-f154-4b37-ae0b-9dec6c6f5356/AIR+FORCE+1+%2707+LV8.png',
        price: 'S$179',
        category: "Men's Shoes"
    },
    {
        name: "Nike Air Max 95 Big Bubble 'OG'",
        description: 'Original Air Max 95 Big Bubble now on sale.',
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7843533c-dd6c-4258-95b0-266c783b3e06/NIKE+AIR+MAX+95+BIG+BUBBLE.png',
        price: 'S$181.30',
        original_price: 'S$259',
        discount_percentage: '30% off',
        category: "Men's Shoes",
        is_deal: true
    },
    {
        name: 'Air Jordan 1 Low G Spiked',
        description: 'Air Jordan 1 Low golf shoe with spiked traction, now discounted.',
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/46cb6b9d-c022-4706-a6a5-e26a5818aa00/AIR+JORDAN+1+LOW+G+SPK.png',
        price: 'S$181.30',
        original_price: 'S$259',
        discount_percentage: '30% off',
        category: 'Golf Shoes',
        is_deal: true
    },
    {
        name: 'Nike Terra Manta Suede',
        description: 'Trail-inspired suede sneaker at a reduced price.',
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/41a2233a-701b-405f-935d-1b05730ecffe/NIKE+TERRA+MANTA+SDE.png',
        price: 'S$87.50',
        original_price: 'S$125',
        discount_percentage: '30% off',
        category: "Men's Shoes",
        is_deal: true
    }
]

const DEFAULT_MAX_RESULTS = 24

module.exports = async ({ category = '', max_results = DEFAULT_MAX_RESULTS } = {}) => {
    const limit = Number.isFinite(max_results) && max_results > 0
        ? Math.floor(max_results)
        : DEFAULT_MAX_RESULTS

    const categoryFilter = typeof category === 'string' ? category.trim().toLowerCase() : ''

    const deals = MOCK_DATA
        .filter((item) => item && item.is_deal === true)
        .filter((item) => {
            if (!categoryFilter) return true
            return typeof item.category === 'string'
                && item.category.toLowerCase() === categoryFilter
        })
        .slice(0, limit)

    let summary
    if (deals.length === 0) {
        summary = categoryFilter
            ? `No current deals found in the "${category.trim()}" category.`
            : 'No current deals found right now.'
    } else {
        const scope = categoryFilter ? ` in ${category.trim()}` : ''
        summary = `Found ${deals.length} Nike ${deals.length === 1 ? 'deal' : 'deals'}${scope} on sale right now.`
    }

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.deals — derived from action name "get_current_deals" (bare array outputSchema rule)
        structuredContent: { deals }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/deals?category=${category}&limit=${max_results}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/deals?category=${encodeURIComponent(category)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
