import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { Business } from '@/types/business';
import { mockBusinesses } from '@/mocks/business';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'businesses.json');

export async function readBusinesses(): Promise<Business[]> {
  try {
    const raw = await readFile(FILE_PATH, 'utf-8');
    return JSON.parse(raw) as Business[];
  } catch {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(FILE_PATH, JSON.stringify(mockBusinesses, null, 2));
    return mockBusinesses;
  }
}

export async function writeBusinesses(list: Business[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(list, null, 2));
}
