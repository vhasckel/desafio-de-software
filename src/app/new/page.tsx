'use client';

import { BusinessForm } from '@/components/forms/BusinessForm';

export default function NewBusinessPage() {
  const handleSave = (_data: unknown) => {
    console.log('dados aqui');
  };
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <main className="w-full max-w-2xl">
        <div className="border-l-4 border-accent pl-4 mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Cadastrar Empreendimento Catarinense
          </h1>
          <p className="text-muted text-sm mt-1">
            Preencha os dados do empreendimento em Santa Catarina
          </p>
        </div>
        <BusinessForm onSubmit={handleSave} />
      </main>
    </div>
  );
}
