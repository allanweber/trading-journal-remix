import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import React from 'react';
import DateTimeDisplay from '~/components/DateTimeDisplay';
import JournalBalanceStatus from '~/components/JournalBalanceStatus';
import PageHeader from '~/components/PageHeader';
import { Button } from '~/components/ui/button';
import { getIcon } from '~/model/currency/currencies';
import { getJournals } from '~/model/journal/journal.server';
import { requireUserView } from '~/utils/session.server';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const user = await requireUserView(request);
  const journals = await getJournals(user);
  return json({ journals });
};

export default function JournalsIndex() {
  const { journals } = useLoaderData<typeof loader>();

  return (
    <main className="py-2 px-4">
      <PageHeader>
        <PageHeader.Title>My Journals</PageHeader.Title>
        <PageHeader.Subtitle>
          These are your current journals
        </PageHeader.Subtitle>
        <PageHeader.Action>
          <Button asChild>
            <Link to="./new">Add a new Journal</Link>
          </Button>
        </PageHeader.Action>
      </PageHeader>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {journals.map((journal) => (
            <li key={journal._id} className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div>
                    <Link to={`./${journal._id}`}>Edit</Link>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 font-bold text-white">
                      {React.createElement(getIcon(journal.currency), {})}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="text-sm font-medium text-blue-500 truncate">
                        {journal.name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="truncate">{journal.description}</span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm">
                          Started on{' '}
                          <DateTimeDisplay onlyDate={true}>
                            {journal.created_at}
                          </DateTimeDisplay>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <JournalBalanceStatus journal={journal} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
