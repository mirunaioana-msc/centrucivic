import { LocationMarkerIcon, SearchIcon, ViewBoardsIcon } from '@heroicons/react/outline';
import i18n from '../../../configs/i18n';
import IconAddon from '../../icon-addon/IconAddon';

export const NGOSearchConfig: Record<string, any> = {
  search: {
    key: 'search',
    rules: {},
    config: {
      type: 'text',
      label: '',
      helperText: '',
      placeholder: i18n.t('common:search.config.search.placeholder'),
      addOn: () => IconAddon({ icon: SearchIcon }),
    },
  },
  locationId: {
    key: 'locationId',
    label: '',
    rules: {},
    placeholder: i18n.t('common:search.config.location.placeholder'),
    addOn: () => IconAddon({ icon: LocationMarkerIcon }),
  },
  domains: {
    key: 'domains',
    rules: {},
    config: {
      placeholder: i18n.t('common:domains'),
    },
    icon: ViewBoardsIcon,
  },
};
