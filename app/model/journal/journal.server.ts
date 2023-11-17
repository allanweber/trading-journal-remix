import { ObjectId } from 'mongodb';
import mongoClient from '~/lib/mongodb';
import { getDbName } from '~/utils/session.server';
import type { UserView } from '../User';
import { Paginated, Pagination } from '../pagination';
import type { Journal } from './Journal';

const COLLECTION = 'journals';

export async function getJournals(
  user: UserView,
  term?: string | null,
  currencies?: string[],
  pageSize: number = 10,
  pageNumber: number = 1
): Promise<Paginated<Journal>> {
  const dbName = getDbName(user.email);
  const client = await mongoClient;

  let query = {};
  if (term) {
    query = { name: { $regex: term, $options: 'i' } };
  }

  if (currencies && currencies.length > 0) {
    query = { ...query, currency: { $in: currencies } };
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const [
    {
      total: [total = 0],
      journals,
    },
  ] = await client
    .db(dbName)
    .collection(COLLECTION)
    .aggregate([
      { $match: query },
      {
        $facet: {
          total: [{ $group: { _id: 1, count: { $sum: 1 } } }],
          journals: [
            { $sort: { startDate: -1 } },
            { $skip: pageSize * (pageNumber - 1) },
            { $limit: pageSize },
          ],
        },
      },
      {
        $project: {
          total: '$total.count',
          journals: '$journals',
        },
      },
    ])
    .toArray();

  return new Paginated(journals, new Pagination(pageSize, pageNumber, total));
}

export async function getJournal(
  user: UserView,
  journalId: string
): Promise<Journal> {
  const dbName = getDbName(user.email);
  const client = await mongoClient;

  const journal = await client
    .db(dbName)
    .collection(COLLECTION)
    .findOne<Journal>({ _id: new ObjectId(journalId) });

  if (!journal) {
    throw Error(`Journal ${journalId} not found`);
  }

  return journal;
}
