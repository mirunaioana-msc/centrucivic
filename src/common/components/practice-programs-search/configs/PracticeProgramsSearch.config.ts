import { LocationMarkerIcon, SearchIcon } from "@heroicons/react/solid";
import i18n from "../../../configs/i18n";
import { WorkingHours } from "../../../enums/WorkingHours.enum";
import IconAddon from "../../icon-addon/IconAddon";


export const PracticeProgramsSearchConfig: Record<string, any> = {
  search: {
    key: 'search',
    rules: {
    },
    config: {
      type: 'text',
      label: '',
      helperText: '',
      placeholder: i18n.t("practice-programs-search:config.search.placeholder"),
      addOn: () => IconAddon({ icon: SearchIcon })
    },
  },
  locationId: {
    key: 'locationId',
    label: '',
    rules: {
    },
    placeholder: i18n.t('practice-programs-search:config.location.placeholder'),
    addOn: () => IconAddon({ icon: LocationMarkerIcon })
  },
  faculties: {
    key: 'faculties',
    rules: {
    },
    placeholder: i18n.t('practice-programs-search:config.faculties.placeholder'),
  },
  start: {
    key: 'start',
    rules: {
    },
    placeholder: i18n.t('practice-programs-search:config.start.placeholder'),
  },
  end: {
    key: 'end',
    rules: {
    },
    placeholder: i18n.t('practice-programs-search:config.end.placeholder'),
  },
  workingHours: {
    key: 'workingHours',
    rules: {},
    config: {
      collection: [...WorkingHours],
      placeholder: i18n.t('practice-programs-search:config.workingHours.placeholder')
    },
  },
  domains: {
    key: 'domains',
    rules: {
    },
    config: {
      placeholder: i18n.t('practice-programs-search:config.domains.placeholder')
    },
  },
}