import type { ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { NumberInput, TextInput } from '@tremor/react';
import CancelLink from '~/components/CancelLink';
import CurrencySelect from '~/components/CurrencySelect';
import FormLabel from '~/components/FormLabel';
import PageHeader from '~/components/PageHeader';
import PrimaryButton from '~/components/PrimaryButton';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  console.log(body);
  // const project = await createProject(body);
  // return redirect(`/projects/${project.id}`);
  return null;
}

export default function NewJournal() {
  // const actionData = useActionData<typeof action>();
  return (
    <main className="max-w-lg mx-auto pt-5 px-4">
      <div className="space-y-6">
        <PageHeader>
          <PageHeader.Title>Add a new journal</PageHeader.Title>
        </PageHeader>

        <div className="mt-10 sm:mt-0">
          <div className="mt-5 md:mt-0 ">
            <Form method="POST" autoComplete="off">
              <div className="shadow  sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid sm:gap-6 md:gap-6">
                    <div className="col-span-12">
                      <FormLabel htmlFor="name">Journal Name</FormLabel>
                      <TextInput
                        name="name"
                        id="name"
                        placeholder="Input the name of your journal"
                        className="mt-1"
                      />
                    </div>

                    <div className="col-span-12">
                      <FormLabel htmlFor="description">
                        Journal Description
                      </FormLabel>
                      <TextInput
                        name="description"
                        id="description"
                        placeholder="Input the description of your journal"
                        className="mt-1"
                      />
                    </div>

                    <div className="col-span-12">
                      <FormLabel htmlFor="initialBalance">
                        Journal Initial Balance
                      </FormLabel>
                      <NumberInput
                        name="initialBalance"
                        id="initialBalance"
                        placeholder="99.99"
                        enableStepper={false}
                        className="mt-1"
                      />
                    </div>

                    <div className="col-span-12">
                      <FormLabel htmlFor="currency">Journal Currency</FormLabel>
                      <CurrencySelect
                        name="currency"
                        id="currency"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <div className="flex justify-end">
                    <CancelLink to="/trading/journals">Cancel</CancelLink>
                    <span className="ml-3">
                      <PrimaryButton>Save Journal</PrimaryButton>
                    </span>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
