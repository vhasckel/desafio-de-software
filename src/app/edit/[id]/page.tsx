'use client';

import { useEffect, useState } from 'react';
import { BusinessForm } from '@/components/forms/BusinessForm';
import { BusinessFormData } from '@/libs/schema';
import { getBusinessById, updateBusiness } from '@/services/business';
import { notFound, useParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import type { Business } from '@/types/business';

export default function EditBusinessPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;
  const [business, setBusiness] = useState<Business | null | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getBusinessById(id)
      .then(setBusiness)
      .catch(() => setBusiness(null));
  }, [id]);

  if (!id) notFound();

  if (business === undefined) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted">Carregando...</p>
      </div>
    );
  }

  if (business === null || !business) notFound();

  const initialData: BusinessFormData = {
    name: business.name,
    manager: business.manager,
    city: business.city,
    sector: business.sector,
    contact: business.contact,
    status: business.status,
  };

  const handleSave = async (data: BusinessFormData) => {
    setError(null);
    try {
      await updateBusiness(id, data);
      router.push('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao atualizar empreendimento.');
    }
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <PageHeader
        title='Editar Empreendimento'
        description='Altere os dados do empreendimento em Santa Catarina'
        showBackLink
      />
      <main className='mx-auto max-w-5xl px-6 py-8 sm:px-8'>
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-sc-red/30 bg-sc-red/10 px-4 py-3 text-sm text-sc-red"
          >
            {error}
          </div>
        )}
        <BusinessForm initialData={initialData} onSubmit={handleSave} />
      </main>
    </div>
  );
}
