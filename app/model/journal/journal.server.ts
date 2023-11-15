import { promises as fs } from 'fs';
import type { Journal } from './Journal';

export async function getJournals(request: Request): Promise<Journal[]> {
  const fileContents = await loadMock();

  return JSON.parse(fileContents);
}

export async function getJournal(
  request: Request,
  journalId: string
): Promise<Journal> {
  const fileContents = await loadMock();
  const journals: Journal[] = JSON.parse(fileContents);
  return journals.find((journal) => journal.id === journalId)!;
}

async function loadMock() {
  const jsonDirectory = __dirname + '/../mock';
  // Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + '/journals.json',
    'utf8'
  );
  return fileContents;
}
