import i18n from '../configs/i18n';
import { IService } from '../interfaces/Service.interface';
import { formatDateMonthYear } from './Format.helper';

const translations = {
  starting_with: i18n.t('services:details.period_starting_with'),
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

export const formatBeneficiaries = (item: IService) => {
  return item?.beneficiaries.map((b) => b.name).join(', ');
};
