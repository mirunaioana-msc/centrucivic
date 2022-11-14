import i18n from '../../../common/configs/i18n';
import { EMAIL_REGEX, NAME_REGEX } from '../../../common/helpers/Format.helper';

const translations = {
  sender: {
    required: i18n.t('contact:form.name.required'),
    max: i18n.t('contact:form.name.max'),
    min: i18n.t('contact:form.name.min'),
    invalid: i18n.t('contact:form.name.invalid'),
    label: i18n.t('contact:form.name.label'),
  },
  from: {
    required: i18n.t('contact:form.email.required'),
    max: i18n.t('contact:form.email.max'),
    min: i18n.t('contact:form.email.min'),
    invalid: i18n.t('contact:form.email.invalid'),
    label: i18n.t('contact:form.email.label'),
  },
  text: {
    required: i18n.t('contact:form.message.required'),
    max: i18n.t('contact:form.message.max'),
    min: i18n.t('contact:form.message.min'),
    label: i18n.t('contact:form.message.label'),
  },
};

export const ContactConfig: Record<string, any> = {
  sender: {
    key: 'sender',
    rules: {
      required: {
        value: true,
        message: translations.sender.required,
      },
      maxLength: {
        value: 100,
        message: translations.sender.max,
      },
      minLength: {
        value: 3,
        message: translations.sender.min,
      },
      pattern: {
        value: NAME_REGEX,
        message: translations.sender.invalid,
      },
    },
    config: {
      type: 'text',
      label: translations.sender.label,
      helperText: '',
      placeholder: '',
    },
  },
  from: {
    key: 'from',
    rules: {
      required: {
        value: true,
        message: translations.from.required,
      },
      maxLength: {
        value: 100,
        message: translations.from.max,
      },
      minLength: {
        value: 3,
        message: translations.from.min,
      },
      pattern: {
        value: EMAIL_REGEX,
        message: translations.from.invalid,
      },
    },
    config: {
      type: 'text',
      label: translations.from.label,
      helperText: '',
      placeholder: '',
    },
  },
  text: {
    key: 'text',
    rules: {
      required: {
        value: true,
        message: translations.text.required,
      },
      maxLength: {
        value: 250,
        message: translations.text.max,
      },
    },
    config: {
      type: 'text',
      label: translations.text.label,
      helperText: '',
      placeholder: '',
    },
  },
};
