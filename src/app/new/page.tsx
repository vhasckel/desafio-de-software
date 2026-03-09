'use client';

import { useState } from 'react';
import { BusinessForm } from '@/components/forms/BusinessForm';
import { BusinessFormData } from '@/libs/schema';
import { createBusiness } from '@/services/business';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';

export default function NewBusinessPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (data: BusinessFormData) => {
    setError(null);
    try {
      await createBusiness(data);
      router.push('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao cadastrar empreendimento.');
    }
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <PageHeader
        title='Cadastrar Empreendimento Catarinense'
        description='Preencha os dados do empreendimento em Santa Catarina'
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
        <BusinessForm onSubmit={handleSave} />
      </main>
    </div>
  );
}
