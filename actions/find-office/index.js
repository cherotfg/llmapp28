// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'NS BlueScope Head Office',
        address: '238B Thomson Road, #17-01 Novena Square Tower B, Singapore 307685',
        phone: '+65 6333 3378',
        country: 'Singapore'
    },
    {
        name: 'PT NS BlueScope Indonesia (Head Office)',
        address: 'South Quarter Tower A 10th Floor, Jl. RA Kartini Kav 8, Cilandak Barat, Jakarta Selatan 12430',
        phone: '+62 21 5098-2030',
        country: 'Indonesia'
    }
]

module.exports = async ({ country = '' } = {}) => {
    const query = typeof country === 'string' ? country.trim() : ''

    const offices = MOCK_DATA.filter((office) => {
        if (query && office.country.toLowerCase() !== query.toLowerCase()) return false
        return true
    })

    let summary
    if (offices.length === 0) {
        summary = query
            ? `No NS BlueScope offices found in ${query}.`
            : 'No NS BlueScope offices found.'
    } else if (query) {
        summary = `Found ${offices.length} NS BlueScope office${offices.length === 1 ? '' : 's'} in ${query}.`
    } else {
        summary = `Found ${offices.length} NS BlueScope office${offices.length === 1 ? '' : 's'}.`
    }

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.offices — bare array outputSchema; key derived from actionName "find_office"
        structuredContent: { offices }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/offices?country=${country}
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
 *     `${process.env.API_BASE_URL}/offices?country=${encodeURIComponent(country)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
