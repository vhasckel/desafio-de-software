'use client';

import { useEffect, useState } from 'react';
import { Business } from '@/types/business';
import { getBusinesses } from '@/services/business';
import { BusinessCard } from '@/components/layout/BusinessCard';

export function BusinessList() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBusinesses()
      .then(setBusinesses)
      .catch((e) => setError(e instanceof Error ? e.message : 'Erro ao carregar'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="mb-6 text-sm text-muted">
        Carregando empreendimentos...
      </p>
    );
  }

  if (error) {
    return (
      <p className="mb-6 text-sm text-sc-red">
        {error}
      </p>
    );
  }

  return (
    <>
      <p className='mb-6 text-sm text-muted'>
        {businesses.length} empreendimento
        {businesses.length !== 1 ? 's' : ''} cadastrado
        {businesses.length !== 1 ? 's' : ''}
      </p>
      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {businesses.map((business) => (
          <li key={business.id}>
            <BusinessCard business={business} />
          </li>
        ))}
      </ul>
    </>
  );
}
