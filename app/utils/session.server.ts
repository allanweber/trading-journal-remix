import { redirect } from '@remix-run/node';
import type { UserView } from '~/model/User';

export async function requireUserView(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
): Promise<UserView> {
  const user: UserView = {
    name: 'Tom Cook',
    email: 'a.cassianoweber@gmail.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };
  if (!user) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return user;
}
