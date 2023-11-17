'use client';

import { useSearchParams } from '@remix-run/react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import type { PaginatedParams } from '~/model/pagination';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function TablePagination(props: PaginatedParams) {
  const { pageSize, page, total, totalPages } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const changePageSize = (pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('pageSize', pageSize.toString());
    updatePath(params);
  };

  const nextPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (page + 1).toString());
    updatePath(params);
  };

  const lastPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', totalPages.toString());
    updatePath(params);
  };

  const previousPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (page - 1).toString());
    updatePath(params);
  };

  const firstPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    updatePath(params);
  };

  const updatePath = (params: URLSearchParams) => {
    setSearchParams(params);
  };

  const cantPreviousPage = () => {
    return page === 1;
  };

  const cantNextPage = () => {
    return page === totalPages;
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex flex-1 text-sm text-muted-foreground">
        {total === 0 ? 'none row' : total === 1 ? '1 row' : `${total} rows`}
      </div>
      <div className="flex items-center md:space-x-6 lg:space-x-8">
        <div className="hidden md:flex">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={pageSize?.toString()}
              onValueChange={(value) => changePageSize(parseInt(value, 10))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize?.toString()} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex w-[100px] items-start md:items-center justify-start md:justify-center text-sm font-medium">
          {`Page ${page} of ${totalPages}`}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 flex"
            onClick={() => firstPage()}
            disabled={cantPreviousPage()}
          >
            <span className="sr-only">Got to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => previousPage()}
            disabled={cantPreviousPage()}
          >
            <span className="sr-only">Got to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => nextPage()}
            disabled={cantNextPage()}
          >
            <span className="sr-only">Got to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 flex"
            onClick={() => lastPage()}
            disabled={cantNextPage()}
          >
            <span className="sr-only">Got to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
