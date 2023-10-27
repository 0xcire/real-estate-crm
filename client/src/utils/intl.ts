import { parseISO } from 'date-fns';
import { removeTimeZone } from '.';

export const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const number = new Intl.NumberFormat();

export const dateIntl = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'short',
});

export const formatDateString = (dateString: string): string => {
  return dateIntl.format(parseISO(removeTimeZone(dateString)));
};
