import { format } from 'date-fns';
import { PaginatedEntity } from '../interfaces/PaginatedEntity.interface';
import { ISelectData } from './Nomenclature.helper';

export const formatDateYear = (value: Date | string | null): string =>
  value ? format(new Date(value), 'dd MMM yyyy') : '';

export const formatDateDot = (value: Date | string | null): string =>
  value ? format(new Date(value), 'dd.MM.yyyy') : '';

export const formatDate = (value: Date | string | null): string =>
  value ? format(new Date(value), 'dd MMM') : '';

export const mapCitiesToSelect = (item: any): ISelectData => ({
  value: item?.id,
  label: `${item.name}, jud. ${item.county?.name}`,
});

export const mapPagesToItems = <T>(pages?: PaginatedEntity<T>[]): T[] => {
  const items: T[] = [];
  pages?.forEach((page) => items.push(...page.items));
  return items;
};

export const openInNewTab = (url: string): void => {
  // Temporary - TO REMOVE after fixing http addon on input
  if (!url.includes('http')) {
    url = `https://${url}`;
  }
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export const formatDateMonthYear = (value: Date | string): string =>
  format(new Date(value), 'dd MMM y');

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_REGEX = /^(?!.*[ ]{2})[a-zA-Z-\săîâșțĂÎÂȘȚ]*$/;
