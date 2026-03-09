import Link from 'next/link';

interface PageHeaderProps {
  title: React.ReactNode;
  description: React.ReactNode;
  showBackLink?: boolean;
  action?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  showBackLink = false,
  action,
}: PageHeaderProps) {
  return (
    <header className='border-b border-border bg-sc-green-pale/30'>
      <div
        className={`mx-auto max-w-5xl px-6 sm:px-8 ${
          showBackLink ? 'py-6' : 'py-8'
        }`}
      >
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div className='min-w-0 flex-1'>
            {showBackLink && (
              <Link
                href='/'
                className='mb-4 inline-flex items-center gap-1.5 rounded text-sm text-muted transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
              >
                <span aria-hidden>←</span>
                Voltar à tela inicial
              </Link>
            )}
            <div className='border-l-4 border-accent pl-4'>
              <h1 className='text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>
                {title}
              </h1>
              <p className='mt-1 text-sm text-muted sm:text-base'>
                {description}
              </p>
            </div>
          </div>
          {action != null ? (
            <div className='shrink-0'>{action}</div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
