import type { LoaderFunctionArgs } from '@remix-run/node';
import { defer } from '@remix-run/node';
import { Await, Link, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import PageHeader from '~/components/PageHeader';
import { JournalsTableSkeleton } from '~/components/Skeletons';
import JournalSearch from '~/components/journals/JournalSearch';
import JournalTable from '~/components/journals/JournalTable';
import { TablePagination } from '~/components/table/TablePagination';
import { Button } from '~/components/ui/button';
import { getJournals } from '~/model/journal/journal.server';
import { requireUserView } from '~/utils/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  console.log('params', url.searchParams);
  const user = await requireUserView(request);
  const query = url.searchParams.get('query');
  const currencies = url.searchParams.get('currency')?.split(',') ?? undefined;
  const pageSize = url.searchParams.has('pageSize')
    ? parseInt(url.searchParams.get('pageSize')!)
    : undefined;
  const page = url.searchParams.has('page')
    ? parseInt(url.searchParams.get('page')!)
    : undefined;
  const journals = getJournals(user, query, currencies, pageSize, page);
  return defer({ journals });
};

export default function JournalsIndex() {
  const { journals } = useLoaderData<typeof loader>();

  return (
    <>
      <PageHeader>
        <PageHeader.Title>My Journals</PageHeader.Title>
        <PageHeader.Subtitle>
          These are your current journals
        </PageHeader.Subtitle>
        <PageHeader.Action>
          <Button asChild>
            <Link to="./new">Add a new journal</Link>
          </Button>
        </PageHeader.Action>
      </PageHeader>
      <JournalSearch />
      <Suspense fallback={<JournalsTableSkeleton />}>
        <Await resolve={journals}>
          {(journals) => (
            <>
              <JournalTable journals={journals.data} />
              <TablePagination {...journals.pagination} />
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
