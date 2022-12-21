import i18n from '../configs/i18n';
import { AgeCategory } from '../enums/AgeCategory.enum';
import { IService } from '../interfaces/Service.interface';
import { formatDateMonthYear } from './Format.helper';

const translations = {
  starting_with: i18n.t('service_details:details.period_starting_with'),
};

const AgeCategoriesMapper = {
  [AgeCategory['0_18']]: '0-18',
  [AgeCategory['18_25']]: '18-25',
  [AgeCategory['25_35']]: '25-35',
  [AgeCategory['35_60']]: '35-60',
  [AgeCategory.OVER_60]: '>60',
};

export const calculatePeriod = (item: IService) => {
  if (item?.endDate) {
    const endDate = formatDateMonthYear(item.endDate);
    const startDate = formatDateMonthYear(item?.startDate);
    return `${startDate} - ${endDate}`;
  } else {
    const startDate = formatDateMonthYear(item?.startDate);
    return `${translations.starting_with} ${startDate}`;
  }
};

export const dataToCsv = (items: { id: number; name: string }[]): string => {
  return items ? items.map((item) => item.name).join(', ') : '';
};

export const formatAgeCategories = (item: IService) => {
  return item?.ageCategories.map((ageCategory) => AgeCategoriesMapper[ageCategory]).join(', ');
};
