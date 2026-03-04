import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Empreendimentos SC
        </h1>
        <p className="text-muted mb-6">
          Cadastro de empreendimentos em Santa Catarina
        </p>
        <Link
          href="/new"
          className="inline-block bg-accent text-white px-6 py-2 rounded font-medium hover:bg-accent-hover transition-colors"
        >
          Novo Empreendimento
        </Link>
      </div>
    </div>
  );
}
