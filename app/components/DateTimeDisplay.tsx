import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Case, Default, Switch } from '~/utils/conditionalRendering';

export default function DateTimeDisplay({
  children,
  onlyDate = false,
}: {
  children: string | number | Date;
  onlyDate?: boolean;
}) {
  const [date, setDt] = useState<String>();
  const [time, setTime] = useState<String>();

  useEffect(() => {
    setDt(dayjs(children).format('MMM D YYYY').toLocaleUpperCase());
  }, [children]);

  useEffect(() => {
    setTime(dayjs(children).format('ddd, hh:mm A').toLocaleUpperCase());
  }, [children]);

  return (
    <time dateTime={children.toString()}>
      <span className="text-gray-900">
        <Switch>
          <Case condition={onlyDate}>{date}</Case>
          <Default>{`${date} at ${time}`}</Default>
        </Switch>
      </span>
    </time>
  );
}
