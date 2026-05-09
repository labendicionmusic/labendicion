import { NextResponse } from 'next/server';
import { getTourDates } from '@/lib/airtable';

// Revalidate every hour
export const revalidate = 3600;

export async function GET() {
  try {
    const dates = await getTourDates();
    return NextResponse.json(dates);
  } catch (err) {
    console.error('[api/tour-dates]', err);
    return NextResponse.json(
      { error: 'No se pudieron cargar las fechas de tour' },
      { status: 500 }
    );
  }
}
