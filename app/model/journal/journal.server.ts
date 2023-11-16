import { ObjectId } from 'mongodb';
import mongoClient from '~/lib/mongodb';
import { getDbName } from '~/utils/session.server';
import type { UserView } from '../User';
import type { Journal } from './Journal';

const COLLECTION = 'journals';

export async function getJournals(user: UserView): Promise<Journal[]> {
  const dbName = getDbName(user.email);
  const client = await mongoClient;

  let query = {};
  const pageSize = 10;
  const pageNumber = 1;
  // if (term) {
  //   query = { name: { $regex: term, $options: 'i' } };
  // }

  // if (currencies && currencies.length > 0) {
  //   query = { ...query, currency: { $in: currencies } };
  // }

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

  return journals;
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
