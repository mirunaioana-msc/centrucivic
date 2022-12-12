import { LocationMarkerIcon, SearchIcon, UserGroupIcon, ViewBoardsIcon } from "@heroicons/react/outline";
import i18n from "../../../configs/i18n";
import { AgeCategories } from "../../../enums/AgeCategory.enum";
import IconAddon from "../../icon-addon/IconAddon";


export const ServiceSearchConfig: Record<string, any> = {
  search: {
    key: 'search',
    rules: {
    },
    config: {
      type: 'text',
      label: '',
      helperText: '',
      placeholder: i18n.t("service_search:config.search.placeholder"),
      addOn: () => IconAddon({ icon: SearchIcon })
    },
  },
  locationId: {
    key: 'locationId',
    label: '',
    rules: {
    },
    placeholder: i18n.t('service_search:config.location.placeholder'),
    addOn: () => IconAddon({ icon: LocationMarkerIcon })
  },
  start: {
    key: 'start',
    rules: {
    },
    placeholder: i18n.t('service_search:config.start.placeholder'),
  },
  end: {
    key: 'end',
    rules: {
    },
    placeholder: i18n.t('service_search:config.end.placeholder'),
  },
  ageCategories: {
    key: 'ageCategories',
    rules: {},
    config: {
      collection: [...AgeCategories],
      placeholder: i18n.t('service_search:config.ageCategories.placeholder')
    },
    icon: UserGroupIcon,
  },
  domains: {
    key: 'domains',
    rules: {
    },
    config: {
      placeholder: i18n.t('service_search:config.domains.placeholder')
    },
    icon: ViewBoardsIcon
  },
}