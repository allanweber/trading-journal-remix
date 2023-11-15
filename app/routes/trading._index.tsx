import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import JournalSelect from '~/components/JournalSelect';
import PageHeader from '~/components/PageHeader';
import PrimaryLink from '~/components/PrimaryLink';
import type { Journal } from '~/model/journal/Journal';
import { getJournals } from '~/model/journal/journal.server';

import { Col, Grid } from '@tremor/react';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const journals = await getJournals(request);
  return json({ journals });
};

export default function Dashboard() {
  const { journals } = useLoaderData<typeof loader>();

  const handleJournalChange = (journal: Journal) => {
    console.log(journal);
  };

  return (
    <main className="py-2 px-4">
      <PageHeader>
        <PageHeader.Title>Dashboard</PageHeader.Title>
        <PageHeader.Subtitle>
          Check out how each of your journals are performing
        </PageHeader.Subtitle>
        <PageHeader.Action>
          <PrimaryLink to="./entries">Add/Change trades</PrimaryLink>
        </PageHeader.Action>
      </PageHeader>
      <Grid
        numItems={1}
        numItemsSm={2}
        numItemsMd={3}
        numItemsLg={4}
        className="gap-2"
      >
        <Col>
          <JournalSelect journals={journals} onChange={handleJournalChange} />
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Grid>
    </main>
  );
}
