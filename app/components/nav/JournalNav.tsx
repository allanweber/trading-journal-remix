import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from '@remix-run/react';
import clsx from 'clsx';
import type { UserView } from '~/model/User';
import Logo from './Logo';
import NotificationsButton from './NotificationsButton';
import Profile from './Profile';

const navigation = [
  {
    name: 'Dashboard',
    href: '/trading',
  },
  { name: 'Journals', href: '/trading/journals' },
  { name: 'Entries', href: '/trading/entries' },
  {
    name: 'Strategies',
    href: '/trading/strategies',
  },
  {
    name: 'Calendar',
    href: '/trading/calendar',
  },
  {
    name: 'Insights',
    href: '/trading/insights',
  },
];

export default function JournalNav({ user }: { user: UserView }) {
  const location = useLocation();
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open, close }) => (
        <>
          <div className="px-4">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Logo />
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={clsx(
                        item.href === location.pathname
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                      aria-current={
                        item.href === location.pathname ? 'page' : undefined
                      }
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NotificationsButton />
                <Profile user={user} />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  onClick={() => close()}
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    item.href === location.pathname
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={
                    item.href === location.pathname ? 'page' : undefined
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
