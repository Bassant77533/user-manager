import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '5')
  const search = searchParams.get('search') || ''

  try {
    // 1. Fetch from external API
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2', {
      next: { revalidate: 86400 } // Cache for 24 hours
    })
    const allData = await res.json()

    // 2. Map to the format the component expects { name, code }
    let countries = allData.map((c: any) => ({
      name: c.name.common,
      code: c.cca2,
    })).sort((a: any, b: any) => a.name.localeCompare(b.name))

    // 3. Filter by search
    if (search) {
      countries = countries.filter((c: any) => 
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // 4. Paginate
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginated = countries.slice(startIndex, endIndex)

    return NextResponse.json({
      countries: paginated,
      hasMore: endIndex < countries.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}