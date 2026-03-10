import { NextResponse } from 'next/server';
import {
  readBusinesses,
  writeBusinesses,
} from '@/libs/business-storage';
import { businessSchema } from '@/libs/schema';

export const runtime = 'nodejs';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const list = await readBusinesses();
    const business = list.find((b) => b.id === id);
    if (!business) {
      return NextResponse.json(
        { error: 'Empreendimento não encontrado' },
        { status: 404 },
      );
    }
    return NextResponse.json(business);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Falha ao carregar empreendimento' },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = businessSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Erro de validação',
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }
    const data = parsed.data;
    const list = await readBusinesses();
    const index = list.findIndex((b) => b.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Empreendimento não encontrado' },
        { status: 404 },
      );
    }
    list[index] = { ...list[index], ...data };
    await writeBusinesses(list);
    return NextResponse.json(list[index]);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Falha ao atualizar empreendimento' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const list = await readBusinesses();
    const index = list.findIndex((b) => b.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Empreendimento não encontrado' },
        { status: 404 },
      );
    }
    const [removed] = list.splice(index, 1);
    await writeBusinesses(list);
    return NextResponse.json(removed);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Falha ao excluir empreendimento' },
      { status: 500 },
    );
  }
}
