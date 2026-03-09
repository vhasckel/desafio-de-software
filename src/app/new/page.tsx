'use client';

import { BusinessForm } from '@/components/forms/BusinessForm';
import { BusinessFormData } from '@/libs/schema';
import { createBusiness } from '@/services/business';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';

export default function NewBusinessPage() {
  const router = useRouter();
  const handleSave = async (data: BusinessFormData) => {
    await createBusiness(data);
    router.push('/');
  };
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <PageHeader
        title='Cadastrar Empreendimento Catarinense'
        description='Preencha os dados do empreendimento em Santa Catarina'
        showBackLink
      />

      <main className='mx-auto max-w-5xl px-6 py-8 sm:px-8'>
        <BusinessForm onSubmit={handleSave} />
      </main>
    </div>
  );
}
