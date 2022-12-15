import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactConfig } from './configs/Contact.config';
import { Controller, useForm } from 'react-hook-form';
import Textarea from '../../common/components/textarea/Textarea';
import ContactInputField from '../../common/components/contact-input-field/ContactInputField';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { useErrorToast } from '../../common/hooks/useToast';
import { useSendContactMailMutation } from '../../services/public/PublicApi.queries';
import { MAIL_APP_TYPE } from '../../common/constants/MailAppType.constants';

const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const sendContactMailMutation = useSendContactMailMutation();
  const { t } = useTranslation(['contact', 'common']);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSendMail = async (data: any) => {
    sendContactMailMutation.mutate(
      { type: MAIL_APP_TYPE.CIVIC_CENTER, ...data },
      {
        onSuccess: () => {
          reset();
          setShowSuccess(true);
        },
        onError: () => {
          console.log(data);
          useErrorToast(t('send_error'));
        },
      },
    );
  };

  return (
    <div className="flex flex-col w-full xl:px-60 sm:px-20 px-10 lg:py-20 py-10">
      <div className="flex lg:flex-row flex-col xl:gap-x-36 gap-x-20 gap-y-10">
        <div className="flex-1">
          <p className="title">{t('title')}</p>
          <p className="body-text">{t('paragraph_1')}</p>
          <br />
          <p className="body-text">{t('paragraph_2')}</p>
        </div>
        {!showSuccess && (
          <div className="flex flex-1 flex-col sm:gap-y-6 gap-y-3">
            <form className="flex flex-col sm:gap-y-6 gap-y-3">
              <Controller
                key={ContactConfig.sender.key}
                name={ContactConfig.sender.key}
                rules={ContactConfig.sender.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ContactInputField
                      config={{
                        ...ContactConfig.sender.config,
                        name: ContactConfig.sender.key,
                        error: errors[ContactConfig.sender.key]?.message,
                        defaultValue: value,
                        onChange: onChange,
                      }}
                    />
                  );
                }}
              />
              <Controller
                key={ContactConfig.from.key}
                name={ContactConfig.from.key}
                rules={ContactConfig.from.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ContactInputField
                      config={{
                        ...ContactConfig.from.config,
                        name: ContactConfig.from.key,
                        error: errors[ContactConfig.from?.key]?.message,
                        defaultValue: value,
                        onChange: onChange,
                      }}
                    />
                  );
                }}
              />
              <Controller
                key={ContactConfig.text.key}
                name={ContactConfig.text.key}
                rules={ContactConfig.text.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Textarea
                      config={{
                        ...ContactConfig.text.config,
                        name: ContactConfig.text.key,
                        error: errors[ContactConfig.text?.key]?.message,
                        defaultValue: value,
                        onChange: onChange,
                      }}
                    />
                  );
                }}
              />
            </form>
            <button type="button" className="yellow-button" onClick={handleSubmit(onSendMail)}>
              {t('send', { ns: 'common' })}
            </button>
          </div>
        )}
        {showSuccess && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <CheckCircleIcon className="sm:w-24 w-12 mb-6 text-green" />
            <p className="subtitle">{t('contact_message_1', { ns: 'common' })}</p>
            <p className="body-text">{t('contact_message_2', { ns: 'common' })}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
