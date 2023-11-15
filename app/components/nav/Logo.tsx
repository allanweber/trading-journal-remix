import { Link } from '@remix-run/react';

export default function Logo() {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/home">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg"
          alt="Trading Journal"
        />
      </Link>
    </div>
  );
}
