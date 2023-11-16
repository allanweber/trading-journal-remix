import type { LoaderFunctionArgs } from '@remix-run/node';
import { defer } from '@remix-run/node';
import { Await, Link, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import PageHeader from '~/components/PageHeader';
import { JournalsTableSkeleton } from '~/components/Skeletons';
import JournalTable from '~/components/journals/JournalTable';
import { Button } from '~/components/ui/button';
import { getJournals } from '~/model/journal/journal.server';
import { requireUserView } from '~/utils/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // const url = new URL(request.url);
  // console.log('params', url.searchParams);
  const user = await requireUserView(request);
  const journals = getJournals(user);
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
            <Link to="./new">Add a new Journal</Link>
          </Button>
        </PageHeader.Action>
      </PageHeader>
      <Suspense fallback={<JournalsTableSkeleton />}>
        <Await resolve={journals}>
          {(journals) => <JournalTable journals={journals} />}
        </Await>
      </Suspense>
    </>
  );
}
