import { mockBusinesses } from '@/mocks/business';
import { BusinessCard } from '@/components/layout/BusinessCard';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <header className='border-b border-border bg-sc-green-pale/30'>
        <div className='mx-auto max-w-5xl px-6 py-8 sm:px-8'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
            <div className='border-l-4 border-accent pl-4'>
              <h1 className='text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>
                Empreendimentos SC
              </h1>
              <p className='mt-1 text-sm text-muted sm:text-base'>
                Cadastro de empreendimentos em Santa Catarina
              </p>
            </div>
            <Link
              href='/new'
              className='inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
            >
              Novo Empreendimento
            </Link>
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-5xl px-6 py-8 sm:px-8'>
        <section aria-labelledby='list-heading'>
          <h2 id='list-heading' className='sr-only'>
            Lista de empreendimentos
          </h2>
          <p className='mb-6 text-sm text-muted'>
            {mockBusinesses.length} empreendimento
            {mockBusinesses.length !== 1 ? 's' : ''} cadastrado
            {mockBusinesses.length !== 1 ? 's' : ''}
          </p>
          <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {mockBusinesses.map((business) => (
              <li key={business.id}>
                <BusinessCard business={business} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
