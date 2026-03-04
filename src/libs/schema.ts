import { z } from 'zod';
import { BusinessSector, BusinessStatus } from '@/types/business';

export const businessSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  manager: z.string().min(2, 'Informe o nome do responsável'),
  city: z.string().min(2, 'Selecione um município de SC'),
  sector: z.enum(Object.values(BusinessSector), {
    message: 'Selecione um segmento válido',
  }),
  contact: z
    .string()
    .email('Informe um email válido')
    .or(z.string().min(8, 'Informe um método de contato válido')),
  status: z
    .enum(Object.values(BusinessStatus), {
      message: 'Selecione um status válido',
    })
    .default(BusinessStatus.ACTIVE),
});

export type BusinessFormData = z.output<typeof businessSchema>;
