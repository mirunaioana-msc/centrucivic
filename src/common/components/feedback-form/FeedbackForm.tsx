import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ChipSelection from '../chip-selection/ChipSelection';
import ContactInputField from '../contact-input-field/ContactInputField';
import Textarea from '../textarea/Textarea';
import { FeedbackFormConfig } from './configs/FeedbackForm.config';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { useErrorToast } from '../../hooks/useToast';
import { useSendServiceFeedback } from '../../../services/public/PublicApi.queries';
import { useParams } from 'react-router-dom';

const FeedbackForm = () => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const { t } = useTranslation(['feedback_form', 'common']);
  const { id: serviceId } = useParams();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const sendServiceFeedback = useSendServiceFeedback();

  const onSendFeedback = (data: any) => {
    sendServiceFeedback.mutate(
      { id: serviceId as string, data },
      {
        onSuccess: () => {
          reset();
          setShowSuccess(true);
        },
        onError: () => {
          useErrorToast(t('send_error'));
        },
      },
    );
  };

  return (
    <div className="w-full lg:px-60 px-10 py-10">
      {!showSuccess && (
        <div className="flex flex-col xl:gap-x-36 gap-x-20 gap-y-8 border-2 border-yellow-500 rounded-3xl shadow-card bg-white">
          <div className="px-8 mt-10">
            <p className="subtitle mb-8">{t('title')}</p>
            <p className="article mt-8">{t('subtitle')}</p>
          </div>
          <div className="flex flex-1 flex-col px-8 pb-8 sm:gap-y-6 gap-y-3">
            <form className="flex flex-col sm:gap-y-6 gap-y-3 w-full xl:w-1/2">
              <Controller
                key={FeedbackFormConfig.name.key}
                name={FeedbackFormConfig.name.key}
                rules={FeedbackFormConfig.name.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ContactInputField
                      config={{
                        ...FeedbackFormConfig.name.config,
                        name: FeedbackFormConfig.name.key,
                        error: errors[FeedbackFormConfig.name.key]?.message,
                        defaultValue: value,
                        onChange: onChange,
                      }}
                    />
                  );
                }}
              />
              <Controller
                key={FeedbackFormConfig.interactionDate.key}
                name={FeedbackFormConfig.interactionDate.key}
                rules={FeedbackFormConfig.interactionDate.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ContactInputField
                      config={{
                        ...FeedbackFormConfig.interactionDate.config,
                        name: FeedbackFormConfig.interactionDate.key,
                        error: errors[FeedbackFormConfig.interactionDate.key]?.message,
                        defaultValue: value,
                        onChange: onChange,
                      }}
                    />
                  );
                }}
              />
              <Controller
                key={FeedbackFormConfig.message.key}
                name={FeedbackFormConfig.message.key}
                rules={FeedbackFormConfig.message.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Textarea
                      config={{
                        ...FeedbackFormConfig.message.config,
                        name: FeedbackFormConfig.message.key,
                        error: errors[FeedbackFormConfig.message?.key]?.message,
                        defaultValue: value,
                        onChange: onChange,
                      }}
                    />
                  );
                }}
              />
              <Controller
                key={FeedbackFormConfig.rating.key}
                name={FeedbackFormConfig.rating.key}
                rules={FeedbackFormConfig.rating.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ChipSelection
                      {...FeedbackFormConfig.rating.config}
                      values={[1, 2, 3, 4, 5]}
                      defaultItems={value}
                      error={errors[FeedbackFormConfig.rating.key]?.message?.toString()}
                      onItemChange={onChange}
                      readonly={false}
                    ></ChipSelection>
                  );
                }}
              />
            </form>
            <button type="button" className="yellow-button" onClick={handleSubmit(onSendFeedback)}>
              {t('send', { ns: 'common' })}
            </button>
          </div>
        </div>
      )}
      {showSuccess && (
        <div className="flex-1 flex flex-col items-center justify-center mb-10">
          <CheckCircleIcon className="sm:w-24 w-12 mb-6 text-green" />
          <p className="subtitle">{t('contact_message_1', { ns: 'common' })}</p>
          <p className="body-text">{t('contact_message_2', { ns: 'common' })}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
