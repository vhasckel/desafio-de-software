import { Business } from '@/types/business';
import { mockBusinesses } from '@/mocks/business';

export function getBusinessesId(id: string): Business | undefined {
  return mockBusinesses.find((business) => business.id === id);
}

console.log(getBusinessesId('1'));
