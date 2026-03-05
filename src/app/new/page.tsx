'use client';

import Link from 'next/link';
import { BusinessForm } from '@/components/forms/BusinessForm';

export default function NewBusinessPage() {
  const handleSave = (_data: unknown) => {
    console.log('dados aqui');
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-sc-green-pale/30">
        <div className="mx-auto max-w-5xl px-6 py-6 sm:px-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
          >
            <span aria-hidden>←</span>
            Voltar à tela inicial
          </Link>
          <div className="border-l-4 border-accent pl-4">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Cadastrar Empreendimento Catarinense
            </h1>
            <p className="mt-1 text-sm text-muted sm:text-base">
              Preencha os dados do empreendimento em Santa Catarina
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8 sm:px-8">
        <BusinessForm onSubmit={handleSave} />
      </main>
    </div>
  );
}
