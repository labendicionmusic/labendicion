// ─── Airtable – Tour Dates ───────────────────────────────────────────────────
// Server-side only. NEVER import this in a 'use client' component.

export interface TourDate {
  id: string;
  venue: string;
  date: string;      // YYYY-MM-DD
  city: string;
  country: string;
  ticketsUrl: string | null;
  active: boolean;
}

export async function getTourDates(): Promise<TourDate[]> {
  const token   = process.env.AIRTABLE_TOKEN;
  const baseId  = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;

  if (!token || !baseId || !tableId) {
    console.warn('[airtable] Missing env vars – returning empty tour dates');
    return [];
  }

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // Fetch all active records; we'll filter by date in JS to avoid
  // Airtable formula timezone quirks.
  const params = new URLSearchParams({
    'filterByFormula': `{Active}`,
    'sort[0][field]':  'Date',
    'sort[0][direction]': 'asc',
  });

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${tableId}?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      // Revalidate every hour in Next.js ISR
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    console.error('[airtable] Fetch error:', res.status, await res.text());
    return [];
  }

  const data = await res.json();

  // Ensure a URL always has a protocol so it never resolves as a relative path
  function normalizeUrl(url: string | undefined | null): string | null {
    if (!url) return null;
    const trimmed = url.trim();
    if (!trimmed) return null;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const all: TourDate[] = (data.records ?? []).map((r: any) => ({
    id:         r.id,
    venue:      r.fields['Venue']       ?? '',
    date:       r.fields['Date']        ?? '',
    city:       r.fields['City']        ?? '',
    country:    r.fields['Country']     ?? '',
    ticketsUrl: normalizeUrl(r.fields['Tickets URL']),
    active:     r.fields['Active']      ?? false,
  }));

  // Only return dates >= today
  return all.filter((d) => d.date >= today);
}
