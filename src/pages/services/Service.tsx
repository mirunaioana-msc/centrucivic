import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Card from '../../common/components/card/Card';
import FeedbackForm from '../../common/components/feedback-form/FeedbackForm';
import Loading from '../../common/components/loading/Loading';
import CivicCenterServiceContent from '../../common/components/service-content/ServiceContent';
import ShapeWrapper from '../../common/components/shape-wrapper/ShapeWrapper';
import { useService } from '../../services/service/Services.queries';
import ListError from '../../common/components/list-error/ListError';
import Breadcrumbs from '../../common/components/breadcrumbs/Breadcrumbs';

const Service = () => {
  const { t } = useTranslation('services');
  const { serviceId } = useParams();
  const { data, isLoading, error, refetch } = useService(serviceId as string);

  return (
    <ShapeWrapper>
      <>
        <Breadcrumbs />
        {isLoading && <Loading />}
        {error && <ListError retry={refetch}>{t('details.errors.get')}</ListError>}
        {!isLoading && !error && (
          <>
            <div className="xl:px-60 px-4 lg:pt-20 pt-10">
              <Card>{data && <CivicCenterServiceContent service={data} />}</Card>
            </div>
            <FeedbackForm />
          </>
        )}
      </>
    </ShapeWrapper>
  );
};

export default Service;
