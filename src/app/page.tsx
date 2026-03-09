import { Button } from '@/components/ui/Button';
import { BusinessList } from '@/components/layout/BusinessList';
import { PageHeader } from '@/components/layout/PageHeader';

export default function Home() {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <PageHeader
        title='Empreendimentos SC'
        description='Cadastro de empreendimentos em Santa Catarina'
        action={<Button href='/new'>Novo Empreendimento</Button>}
      />

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
