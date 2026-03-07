'use client';

import type { Resolver, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { businessSchema, BusinessFormData } from '@/libs/schema';
import { SECTORS } from '@/constants/business';
import { BusinessStatus } from '@/types/business';
import { Button } from '@/components/ui/Button';

interface Props {
  initialData?: BusinessFormData;
  onSubmit: SubmitHandler<BusinessFormData>;
}

export function BusinessForm({ initialData, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema) as Resolver<BusinessFormData>,
    defaultValues: (initialData ?? {
      status: BusinessStatus.ACTIVE,
    }) as BusinessFormData,
  });

  const inputClass =
    'mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground transition-colors placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';
  const labelClass = 'block text-sm font-medium text-foreground';
  const errorClass = 'mt-1 text-xs text-sc-red';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-5 rounded-lg border border-border bg-background p-6 shadow-sm'
    >
      <div>
        <label className={labelClass}>Nome do Empreendimento</label>
        <input {...register('name')} className={inputClass} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className={labelClass}>Responsável</label>
          <input {...register('manager')} className={inputClass} />
          {errors.manager && (
            <p className={errorClass}>{errors.manager.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Município (SC)</label>
          <input
            {...register('city')}
            placeholder='Ex: Florianópolis'
            className={inputClass}
          />
          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className={labelClass}>Segmento</label>
          <select {...register('sector')} className={inputClass}>
            <option value=''>Selecione...</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.sector && (
            <p className={errorClass}>{errors.sector.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Contato (E-mail)</label>
          <input {...register('contact')} className={inputClass} />
          {errors.contact && (
            <p className={errorClass}>{errors.contact.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Status</label>
        <div className='mt-2 flex gap-6'>
          <label className='flex cursor-pointer items-center gap-2 text-sm text-foreground'>
            <input
              type='radio'
              value={BusinessStatus.ACTIVE}
              {...register('status')}
              className='h-4 w-4 accent-accent'
            />
            Ativo
          </label>
          <label className='flex cursor-pointer items-center gap-2 text-sm text-foreground'>
            <input
              type='radio'
              value={BusinessStatus.INACTIVE}
              {...register('status')}
              className='h-4 w-4 accent-accent'
            />
            Inativo
          </label>
        </div>
      </div>

      <div className='pt-2'>
        <Button
          type='submit'
          disabled={isSubmitting}
          className='w-full'
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Empreendimento'}
        </Button>
      </div>
    </form>
  );
}
