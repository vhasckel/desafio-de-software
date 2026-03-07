import { NextResponse } from 'next/server';
import {
  readBusinesses,
  writeBusinesses,
} from '../../../libs/business-storage';
import type { BusinessFormData } from '@/libs/schema';
import type { Business } from '@/types/business';

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

export async function POST(request: Request) {
  try {
    const data: BusinessFormData = await request.json();
    const list = await readBusinesses();
    const maxId = list.reduce(
      (max, b) => Math.max(max, parseInt(b.id, 10) || 0),
      0,
    );
    const newBusiness: Business = {
      id: String(maxId + 1),
      ...data,
    };
    list.push(newBusiness);
    await writeBusinesses(list);
    return NextResponse.json(newBusiness);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Falha ao criar empreendimento' },
      { status: 500 },
    );
  }
}
