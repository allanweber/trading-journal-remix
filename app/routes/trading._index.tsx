import { Link } from '@remix-run/react';
import PageHeader from '~/components/PageHeader';

import { Col, Grid } from '@tremor/react';
import { Button } from '~/components/ui/button';

export default function Dashboard() {
  return (
    <main className="py-2 px-4">
      <PageHeader>
        <PageHeader.Title>Dashboard</PageHeader.Title>
        <PageHeader.Subtitle>
          Check out how each of your journals are performing
        </PageHeader.Subtitle>
        <PageHeader.Action>
          <Button asChild>
            <Link to="./entries">Add/Change trades</Link>
          </Button>
        </PageHeader.Action>
      </PageHeader>
      <Grid
        numItems={1}
        numItemsSm={2}
        numItemsMd={3}
        numItemsLg={4}
        className="gap-2"
      >
        <Col></Col>
        <Col>
          <Button>Test</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Grid>
    </main>
  );
}
