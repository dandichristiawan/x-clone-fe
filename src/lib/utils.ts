import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function timeDifference(current: any, previous: any) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + 's';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + 'm';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + 'h';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + 'd';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + 'mo';
  } else {
    return Math.round(elapsed / msPerYear) + 'y';
  }
}

export function twitterTimestamp(isoString: string | undefined) {
  const date = new Date(isoString ?? '');
  const now = new Date();
  const relativeTime = timeDifference(now, date);
  const formattedDate = formatDateWithYear(isoString);

  return `${relativeTime} · ${formattedDate}`;
}

export function formatDateList(isoString: string) {
  const date = new Date(isoString);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  return `${month} ${day}`;
}

function formatDateWithYear(isoString: string | undefined) {
  const date = new Date(isoString ?? '');
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

export function formatDateJoined(isoString: string | undefined) {
  const date = new Date(isoString ?? '');
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${year}`;
}
