import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Card from '../../common/components/card/Card';
import FeedbackForm from '../../common/components/feedback-form/FeedbackForm';
import Loading from '../../common/components/loading/Loading';
import CivicCenterServiceContent from '../../common/components/service-content/ServiceContent';
import { useService } from '../../services/service/Services.queries';
import ListError from '../../common/components/list-error/ListError';
import Breadcrumbs from '../../common/components/breadcrumbs/Breadcrumbs';
import { AxiosError } from 'axios';

const Service = () => {
  const { t } = useTranslation('services');
  const { serviceId } = useParams();
  const { data, isLoading, error, refetch } = useService(serviceId as string);

  return (
    <div className="w-full bg-gray-100">
      <div className="wrapper pt-5">
        <Breadcrumbs />
        <>
          {isLoading && <Loading />}
          {error && (
            <ListError
              retry={(error as AxiosError)?.response?.status === 404 ? undefined : refetch}
            >
              {t(
                `details.errors.get${
                  (error as AxiosError)?.response?.status === 404 ? '_404' : ''
                }`,
              )}
            </ListError>
          )}
          {!isLoading && !error && (
            <>
              <Card>{data && <CivicCenterServiceContent service={data} />}</Card>
              <FeedbackForm serviceId={serviceId as string} />
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Service;
