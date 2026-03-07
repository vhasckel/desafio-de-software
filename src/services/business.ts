import { Business } from '@/types/business';
import type { BusinessFormData } from '@/libs/schema';

const BASE = '/api/businesses';

export async function getBusinesses(): Promise<Business[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Falha ao carregar empreendimentos');
  return res.json();
}

export async function getBusinessById(id: string): Promise<Business | undefined> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

export async function updateBusiness(
  id: string,
  data: BusinessFormData
): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Falha ao atualizar empreendimento');
}
