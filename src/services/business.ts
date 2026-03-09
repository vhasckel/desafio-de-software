import { Business } from '@/types/business';
import type { BusinessFormData } from '@/libs/schema';

const BASE = '/api/businesses';

export async function getBusinesses(): Promise<Business[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Falha ao carregar empreendimentos');
  return res.json();
}

export async function getBusinessById(
  id: string,
): Promise<Business | undefined> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

export async function updateBusiness(
  id: string,
  data: BusinessFormData,
): Promise<Business> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Falha ao atualizar empreendimento');
  return res.json();
}

export async function createBusiness(
  data: BusinessFormData,
): Promise<Business> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Falha ao criar empreendimento');
  return res.json();
}

export async function deleteBusiness(id: string): Promise<Business> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Falha ao excluir empreendimento');
  return res.json();
}
