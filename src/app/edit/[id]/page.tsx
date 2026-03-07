'use client';

import { BusinessForm } from '@/components/forms/BusinessForm';
import { BusinessFormData } from '@/libs/schema';
import { getBusinessesId } from '@/services/business';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';

export default function EditBusinessPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;

  if (!id) notFound();

  const business = getBusinessesId(id);
  if (!business) notFound();

  const initialData: BusinessFormData = {
    name: business.name,
    manager: business.manager,
    city: business.city,
    sector: business.sector,
    contact: business.contact,
    status: business.status,
  };

  const handleSave = (_data: BusinessFormData) => {
    console.log('editar', id, _data);
    router.push('/');
  };
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <header className='border-b border-border bg-sc-green-pale/30'>
        <div className='mx-auto max-w-5xl px-6 py-6 sm:px-8'>
          <Link
            href='/'
            className='mb-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded'
          >
            <span aria-hidden>←</span>
            Voltar à tela inicial
          </Link>
          <div className='border-l-4 border-accent pl-4'>
            <h1 className='text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>
              Editar Empreendimento
            </h1>
            <p className='mt-1 text-sm text-muted sm:text-base'>
              Altere os dados do empreendimento em Santa Catarina
            </p>
          </div>
        </div>
      </header>
      <main className='mx-auto max-w-5xl px-6 py-8 sm:px-8'>
        <BusinessForm initialData={initialData} onSubmit={handleSave} />
      </main>
    </div>
  );
}
