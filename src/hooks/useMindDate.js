import React from 'react';
import parseISO from 'date-fns/parseISO';

const useMinDate = (data) => {
  const [minDate, setMinDate] = React.useState(new Date());

  React.useEffect(() => {
    if (data.length) {
      const toDay = new Date();
      const latestDate = data[0].dateStop || data[0].dateStart;
      const date = parseISO(latestDate);
      date.setDate(date.getDate() + 1);

      if (toDay > date) {
        setMinDate(toDay);
      } else {
        setMinDate(date);
      }
    }
  }, [data]);

  return minDate;
};

export default useMinDate;
