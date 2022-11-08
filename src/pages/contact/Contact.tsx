import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactConfig } from './configs/Contact.config';
import { Controller, useForm } from 'react-hook-form';
import Textarea from '../../common/components/textarea/Textarea';
import ContactInputField from '../../common/components/contact-input-field/ContactInputField';
import { CheckCircleIcon } from '@heroicons/react/outline';

const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(false);
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

  const onSendMail = () => {
    console.log('Not yet implemented');
    reset();
    setShowSuccess(false);
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
                key={ContactConfig.name.key}
                name={ContactConfig.name.key}
                rules={ContactConfig.name.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ContactInputField
                      config={{
                        ...ContactConfig.name.config,
                        name: ContactConfig.name.key,
                        error: errors[ContactConfig.name.key]?.message,
                        defaultValue: value,
                        onChange: onChange,
                      }}
                    />
                  );
                }}
              />
              <Controller
                key={ContactConfig.email.key}
                name={ContactConfig.email.key}
                rules={ContactConfig.email.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ContactInputField
                      config={{
                        ...ContactConfig.email.config,
                        name: ContactConfig.email.key,
                        error: errors[ContactConfig.email?.key]?.message,
                        defaultValue: value,
                        onChange: onChange,
                      }}
                    />
                  );
                }}
              />
              <Controller
                key={ContactConfig.message.key}
                name={ContactConfig.message.key}
                rules={ContactConfig.message.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Textarea
                      config={{
                        ...ContactConfig.message.config,
                        name: ContactConfig.message.key,
                        error: errors[ContactConfig.message?.key]?.message,
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
            <CheckCircleIcon className="sm:w-24 w-12 mb-6" />
            <p className="subtitle">{t('contact_message_1', { ns: 'common' })}</p>
            <p className="body-text">{t('contact_message_2', { ns: 'common' })}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
