import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import JournalNav from '~/components/nav/JournalNav';
import { requireUserView } from '~/utils/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUserView(request);
  if (!user) {
    throw new Response('Unauthorized', { status: 401 });
  }
  return json({ user });
};

export default function TradingJournal() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>
      <JournalNav user={user} />
      <div className="flex-1 space-y-4 p-2 md:p-4 pt-2 md:pt-6">
        <Outlet />
      </div>
    </>
  );
}
