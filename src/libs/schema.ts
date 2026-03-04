import { z } from 'zod';

export const businessSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  manager: z.string().min(2, 'Informe o nome do responsável'),
  city: z.string().min(2, 'Selecione um município de SC'),
  sector: z.enum(
    ['Tecnologia', 'Comércio', 'Indústria', 'Serviços', 'Agronegócio'],
    { message: 'Selecione um segmento válido' },
  ),
  contact: z
    .string()
    .email('Informe um email válido')
    .or(z.string().min(8, 'Informe um método de contato válido')),
  status: z.enum(['active', 'inactive']).default('active'),
});

export type BusinessFormData = z.output<typeof businessSchema>;
