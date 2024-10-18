import dayjs from 'dayjs';

export const formatedDate = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY, HH:mm');
};
