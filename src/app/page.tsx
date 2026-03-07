import { Button } from '@/components/ui/Button';
import { BusinessList } from '@/components/layout/BusinessList';

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
            <Button href='/new'>
              Novo Empreendimento
            </Button>
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-5xl px-6 py-8 sm:px-8'>
        <section aria-labelledby='list-heading'>
          <h2 id='list-heading' className='sr-only'>
            Lista de empreendimentos
          </h2>
          <BusinessList />
        </section>
      </main>
    </div>
  );
}
