// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'COLORBOND® steel',
        description: 'Iconic pre-painted steel building material trusted since the 1960s for durable, low-maintenance roofing and walling across residential, commercial and industrial builds.',
        category: 'Coated & Painted Steel'
    },
    {
        name: 'ZINCALUME® steel',
        description: 'Strong, durable and cost-effective aluminium-zinc coated steel used by architects for modern roof sheeting and a wide range of commercial and industrial applications.',
        category: 'Coated Steel'
    },
    {
        name: 'BlueScope Zacs®',
        description: "Corrosion-resistant coated steel tailored for Southeast Asia's tropical climate, offering durability and a wide range of colours for residential and small-to-medium commercial buildings.",
        category: 'Coated Steel'
    },
    {
        name: 'TRUECORE® steel',
        description: "High-strength steel framing that stays straight and true, won't catch fire and resists warping, enabling wide spans and lightweight designs for residential and commercial builds.",
        category: 'Steel Framing'
    },
    {
        name: 'SuperDyma®',
        description: 'Premium zinc-aluminium-magnesium coated steel made with Nippon Steel technology for exceptional corrosion resistance in harsh environments, ideal for structural and industrial fabrication.',
        image_url: 'https://assets.nsbluescope.com/f/247285/4032x3024/89a903e4fe/superdyma-decking.jpg/m/1440x0/filters:no_upscale():quality(80)',
        category: 'Coated Steel'
    },
    {
        name: 'LYSAGHT®',
        description: 'An extensive range of prefabricated building solutions for roofing, walling, structural decking and steel framing systems for architectural, industrial, commercial and residential projects.',
        category: 'Building Solutions'
    }
]

module.exports = async ({ category = '' } = {}) => {
    const filter = typeof category === 'string' ? category.trim() : ''

    const brands = MOCK_DATA.filter((brand) => {
        if (filter && brand.category.toLowerCase() !== filter.toLowerCase()) return false
        return true
    })

    const summary = filter
        ? `Found ${brands.length} NS BlueScope brand${brands.length === 1 ? '' : 's'} in the "${filter}" category.`
        : `Showing ${brands.length} NS BlueScope steel product brands.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.brands — derived from action name "browse_brands" (bare array outputSchema rule)
        structuredContent: { brands }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/brands?category=${category}
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
 *     `${process.env.API_BASE_URL}/brands?category=${encodeURIComponent(category)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
