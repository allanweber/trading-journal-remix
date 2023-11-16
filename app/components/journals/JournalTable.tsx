import { Link, useNavigate } from '@remix-run/react';
import { EditIcon, TrashIcon } from 'lucide-react';
import { type Journal } from '~/model/journal/Journal';
import DateTimeDisplay from '../DateTimeDisplay';
import JournalBalanceStatus from '../JournalBalanceStatus';
import { Separator } from '../ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export default function JournalTable({ journals }: { journals: Journal[] }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="md:hidden rounded-md border min-w-full">
        {journals?.map((journal) => (
          <div key={journal._id}>
            <div
              className="hover:bg-slate-200"
              onClick={() => navigate(`/trading/journals/${journal._id}`)}
            >
              <div className="mb-2 w-full rounded-md p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-medium">{journal.name}</p>
                </div>
                <div>
                  <p className="text-sm">{journal.description}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>
                      <DateTimeDisplay onlyDate>
                        {journal.created_at}
                      </DateTimeDisplay>
                    </p>
                  </div>
                  <div className="flex justify-end mb-2">
                    <JournalBalanceStatus journal={journal} />
                  </div>
                </div>
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
      <div className="hidden rounded-md border min-w-full md:table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Current Balance</TableHead>
              <TableHead className="w-[100px]">Currency</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journals && journals.length ? (
              journals.map((journal) => (
                <TableRow key={journal._id}>
                  <TableCell className="font-medium">
                    <Link to={`/trading/journals/${journal._id}`}>
                      {journal.name}
                    </Link>
                  </TableCell>
                  <TableCell>{journal.description}</TableCell>
                  <TableCell>
                    <DateTimeDisplay onlyDate>
                      {journal.created_at}
                    </DateTimeDisplay>
                  </TableCell>
                  <TableCell className="text-right">
                    <JournalBalanceStatus journal={journal} />
                  </TableCell>
                  <TableCell>{journal.currency}</TableCell>
                  <TableCell className="text-right">
                    <div className="max-w-[45px] flex justify-between">
                      <Link to={`/trading/journals/${journal._id}`}>
                        <EditIcon className="h-4 w-4" />
                      </Link>
                      <Link to={`/trading/journals/${journal._id}`}>
                        <TrashIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No journals found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
