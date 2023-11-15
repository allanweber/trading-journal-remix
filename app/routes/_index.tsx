import { redirect, type MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async () => {
  const userSession = undefined; //await getUserSessionOrWhatever();

  if (!userSession) {
    return redirect('/home');
  } else {
    return redirect('/trading');
  }
};
