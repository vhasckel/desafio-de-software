'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { deleteBusiness, getBusinessById } from '@/services/business';
import { Button } from '@/components/ui/Button';
import type { Business } from '@/types/business';
import { BusinessStatus } from '@/types/business';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { PageHeader } from '@/components/layout/PageHeader';

export default function BusinessDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const [business, setBusiness] = useState<Business | null | undefined>(
    undefined,
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    getBusinessById(id)
      .then(setBusiness)
      .catch(() => setBusiness(null));
  }, [id]);

  if (!id) notFound();

  if (business === undefined) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-background text-foreground'>
        <p className='text-muted'>Carregando...</p>
      </div>
    );
  }

  if (business === null || !business) notFound();

  const handleConfirmDelete = async () => {
    await deleteBusiness(business.id);
    router.push('/');
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <PageHeader
        title={business.name}
        description='Detalhes do empreendimento em Santa Catarina'
        showBackLink
      />

      <main className='mx-auto max-w-5xl px-6 py-8 sm:px-8'>
        <section
          className='rounded-lg border border-border bg-background p-6 shadow-sm'
          aria-labelledby='detail-heading'
        >
          <h2 id='detail-heading' className='sr-only'>
            Dados do empreendimento
          </h2>
          <dl className='grid gap-4 sm:grid-cols-1 md:grid-cols-2'>
            <div>
              <dt className='text-sm font-medium text-muted'>Responsável</dt>
              <dd className='mt-0.5 text-foreground'>{business.manager}</dd>
            </div>
            <div>
              <dt className='text-sm font-medium text-muted'>Município (SC)</dt>
              <dd className='mt-0.5 text-foreground'>{business.city}</dd>
            </div>
            <div>
              <dt className='text-sm font-medium text-muted'>Segmento</dt>
              <dd className='mt-0.5 text-foreground'>{business.sector}</dd>
            </div>
            <div>
              <dt className='text-sm font-medium text-muted'>Status</dt>
              <dd className='mt-0.5'>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    business.status === BusinessStatus.ACTIVE
                      ? 'bg-sc-green-pale text-sc-green'
                      : 'bg-sc-red/10 text-sc-red'
                  }`}
                >
                  {business.status}
                </span>
              </dd>
            </div>
            <div className='md:col-span-2'>
              <dt className='text-sm font-medium text-muted'>
                Contato (E-mail)
              </dt>
              <dd className='mt-0.5'>
                <a
                  href={`mailto:${business.contact}`}
                  className='text-accent hover:text-accent-hover hover:underline'
                >
                  {business.contact}
                </a>
              </dd>
            </div>
          </dl>
          <div className='mt-6 border-t border-border pt-6 flex gap-2'>
            <Button href={`/edit/${business.id}`} variant='primary' size='md'>
              Editar empreendimento
            </Button>
            <Button
              onClick={() => setShowDeleteModal(true)}
              variant='danger'
              size='md'
              className='shrink-0'
            >
              Excluir
            </Button>
          </div>
          <ConfirmModal
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            title='Excluir empreendimento'
            message={
              <>
                Tem certeza que deseja excluir o empreendimento{' '}
                <strong className='text-foreground'>{business.name}</strong>?
                Esta ação não pode ser desfeita.
              </>
            }
            confirmLabel='Excluir'
            cancelLabel='Cancelar'
            confirmVariant='danger'
          />
        </section>
      </main>
    </div>
  );
}
