export enum BusinessSector {
  TECHNOLOGY = 'Tecnologia',
  COMMERCE = 'Comércio',
  INDUSTRY = 'Indústria',
  SERVICES = 'Serviços',
  AGRONEGIO = 'Agronegócio',
}

export enum BusinessStatus {
  ACTIVE = 'Ativo',
  INACTIVE = 'Inativo',
}

export interface Business {
  id: string;
  name: string;
  manager: string;
  city: string;
  sector: BusinessSector;
  contact: string;
  status: BusinessStatus;
}
