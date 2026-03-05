import { Business, BusinessStatus } from '@/types/business';

export function BusinessCard({ business }: { business: Business }) {
  return (
    <article className="group relative rounded-lg border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-semibold tracking-tight text-foreground">
            {business.name}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {business.city}
          </p>
          <p className="mt-0.5 text-xs text-muted/80">
            {business.manager}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
            business.status === BusinessStatus.ACTIVE
              ? 'bg-sc-green-pale text-sc-green'
              : 'bg-sc-red/10 text-sc-red'
          }`}
        >
          {business.status}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
        <span className="text-xs text-muted">{business.sector}</span>
        <span className="text-border">·</span>
        <a
          href={`mailto:${business.contact}`}
          className="truncate text-xs text-accent hover:text-accent-hover hover:underline"
        >
          {business.contact}
        </a>
      </div>
    </article>
  );
}
