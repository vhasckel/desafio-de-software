import { NextResponse } from 'next/server';
import { readBusinesses } from '../../../libs/business-storage';

export async function GET() {
  try {
    const list = await readBusinesses();
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Falha ao carregar empreendimentos' },
      { status: 500 },
    );
  }
}
