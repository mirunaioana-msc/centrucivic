import i18n from '../../../common/configs/i18n';
import { EMAIL_REGEX, NAME_REGEX } from '../../../common/helpers/Format.helper';

const translations = {
  name: {
    required: i18n.t('contact:form.name.required'),
    max: i18n.t('contact:form.name.max'),
    min: i18n.t('contact:form.name.min'),
    invalid: i18n.t('contact:form.name.invalid'),
    label: i18n.t('contact:form.name.label'),
  },
  email: {
    required: i18n.t('contact:form.email.required'),
    max: i18n.t('contact:form.email.max'),
    min: i18n.t('contact:form.email.min'),
    invalid: i18n.t('contact:form.email.invalid'),
    label: i18n.t('contact:form.email.label'),
  },
  message: {
    required: i18n.t('contact:form.message.required'),
    max: i18n.t('contact:form.message.max'),
    min: i18n.t('contact:form.message.min'),
    label: i18n.t('contact:form.message.label'),
  },
};

export const ContactConfig: Record<string, any> = {
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
  email: {
    key: 'email',
    rules: {
      required: {
        value: true,
        message: translations.email.required,
      },
      maxLength: {
        value: 100,
        message: translations.email.max,
      },
      minLength: {
        value: 3,
        message: translations.email.min,
      },
      pattern: {
        value: EMAIL_REGEX,
        message: translations.email.invalid,
      },
    },
    config: {
      type: 'text',
      label: translations.email.label,
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
        value: 250,
        message: translations.message.max,
      },
      minLength: {
        value: 50,
        message: translations.message.min,
      },
    },
    config: {
      type: 'text',
      label: translations.message.label,
      helperText: '',
      placeholder: '',
    },
  },
};
