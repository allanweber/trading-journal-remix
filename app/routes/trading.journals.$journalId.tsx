import { PlusIcon } from '@heroicons/react/24/solid';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import PageHeader from '~/components/PageHeader';
import { Button } from '~/components/ui/button';
import { getJournal } from '~/model/journal/journal.server';

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { journalId } = params;
  const journal = await getJournal(request, journalId!);
  return json({ journal });
};

export default function EditJournal() {
  const { journal } = useLoaderData<typeof loader>();
  return (
    <main className="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
      <form>
        <div className="space-y-6">
          <PageHeader>
            <PageHeader.Title>Edit {journal.name}</PageHeader.Title>
          </PageHeader>

          <div>
            <label
              htmlFor="project-name"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="project-name"
                id="project-name"
                className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                defaultValue="Project Nero"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={3}
                className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
                defaultValue={''}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <label
                htmlFor="add-team-members"
                className="block text-sm font-medium text-gray-700"
              >
                Add Team Members
              </label>
              <p id="add-team-members-helper" className="sr-only">
                Search by email address
              </p>
              <div className="flex">
                <div className="flex-grow">
                  <input
                    type="text"
                    name="add-team-members"
                    id="add-team-members"
                    className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Email address"
                    aria-describedby="add-team-members-helper"
                  />
                </div>
                <span className="ml-3">
                  <button
                    type="button"
                    className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    <PlusIcon
                      className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>Add</span>
                  </button>
                </span>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              className="mt-1 block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end">
            <span className="mr-2">
              <Button asChild variant="outline" className="w-[200px]">
                <Link to="/trading/journals">Cancel</Link>
              </Button>
            </span>
            <span>
              <Button className="w-[200px]">Create this project</Button>
            </span>
          </div>
        </div>
      </form>
    </main>
  );
}
