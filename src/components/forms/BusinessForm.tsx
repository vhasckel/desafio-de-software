'use client';

import type { Resolver, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { businessSchema, BusinessFormData } from '@/libs/schema';
import { SECTORS } from '@/constants/business';
import { BusinessStatus } from '@/types/business';

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
    'w-full p-2 border border-border rounded mt-1 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent';
  const labelClass = 'block text-sm font-medium text-foreground';
  const errorClass = 'text-sc-red text-xs mt-1';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 max-w-2xl bg-sc-green-pale/30 border border-sc-green/20 p-6 rounded-lg shadow-md'
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
        <div className='flex gap-4 mt-2'>
          <label className='flex items-center gap-2 text-foreground cursor-pointer'>
            <input
              type='radio'
              value='active'
              {...register('status')}
              className='accent-accent'
            />{' '}
            Ativo
          </label>
          <label className='flex items-center gap-2 text-foreground cursor-pointer'>
            <input
              type='radio'
              value='inactive'
              {...register('status')}
              className='accent-accent'
            />{' '}
            Inativo
          </label>
        </div>
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full bg-accent text-white py-2 rounded font-bold hover:bg-accent-hover disabled:bg-muted disabled:cursor-not-allowed transition-colors'
      >
        {isSubmitting ? 'Salvando...' : 'Salvar Empreendimento'}
      </button>
    </form>
  );
}
