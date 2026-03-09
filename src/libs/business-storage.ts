import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { Business } from '@/types/business';
import { mockBusinesses } from '@/mocks/business';

const isVercel = process.env.VERCEL === '1';
const DATA_DIR = isVercel ? '/tmp/data' : path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'businesses.json');
const BUNDLED_FILE = path.join(process.cwd(), 'data', 'businesses.json');

export async function readBusinesses(): Promise<Business[]> {
  try {
    const raw = await readFile(FILE_PATH, 'utf-8');
    return JSON.parse(raw) as Business[];
  } catch {
    let initial: Business[] = mockBusinesses;
    if (isVercel) {
      try {
        const raw = await readFile(BUNDLED_FILE, 'utf-8');
        initial = JSON.parse(raw) as Business[];
      } catch {}
    }
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(FILE_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
}

export async function writeBusinesses(list: Business[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(list, null, 2));
}
