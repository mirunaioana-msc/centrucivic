import i18n from '../../../configs/i18n';
import { NAME_REGEX } from '../../../helpers/Format.helper';

const translations = {
  name: {
    required: i18n.t('feedback_form:config.name.required'),
    max: i18n.t('feedback_form:config.name.max'),
    min: i18n.t('feedback_form:config.name.min'),
    invalid: i18n.t('feedback_form:config.name.invalid'),
    label: i18n.t('feedback_form:config.name.label'),
  },
  interaction_date: {
    required: i18n.t('feedback_form:config.interaction_date.required'),
    max: i18n.t('feedback_form:config.interaction_date.max'),
    label: i18n.t('feedback_form:config.interaction_date.label'),
  },
  message: {
    required: i18n.t('feedback_form:config.message.required'),
    max: i18n.t('feedback_form:config.message.max'),
    label: i18n.t('feedback_form:config.message.label'),
    placeholder: i18n.t('feedback_form:config.message.placeholder'),
  },
  rating: {
    required: i18n.t('feedback_form:config.rating.required'),
    label: i18n.t('feedback_form:config.rating.label'),
    helper: i18n.t('feedback_form:config.rating.helper'),
  },
};

export const FeedbackFormConfig: Record<string, any> = {
  name: {
    key: 'name',
    rules: {
      required: {
        value: true,
        message: translations.name.required,
      },
      maxLength: {
        value: 100,
        message: translations.name.max,
      },
      minLength: {
        value: 3,
        message: translations.name.min,
      },
      pattern: {
        value: NAME_REGEX,
        message: translations.name.invalid,
      },
    },
    config: {
      type: 'text',
      label: translations.name.label,
      helperText: '',
      placeholder: '',
    },
  },
  interactionDate: {
    key: 'interactionDate',
    rules: {
      required: {
        value: true,
        message: translations.interaction_date.required,
      },
      maxLength: {
        value: 30,
        message: translations.interaction_date.max,
      },
    },
    config: {
      type: 'text',
      label: translations.interaction_date.label,
      helperText: '',
      placeholder: '',
    },
  },
  message: {
    key: 'message',
    rules: {
      required: {
        value: true,
        message: translations.message.required,
      },
      maxLength: {
        value: 500,
        message: translations.message.max,
      },
    },
    config: {
      type: 'text',
      label: translations.message.label,
      helperText: '',
      placeholder: translations.message.placeholder,
    },
  },
  rating: {
    key: 'rating',
    rules: {
      required: {
        value: true,
        message: translations.rating.required,
      },
    },
    config: {
      label: translations.rating.label,
      helperText: translations.rating.helper,
    },
  },
};
