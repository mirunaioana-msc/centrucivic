import React from 'react';
import ShapeWrapper from '../../common/components/shape-wrapper/ShapeWrapper';
import { ORGANIZATIONS } from '../../common/constants/nomenclature.constants';
import OrganizationsList from './components/OrganizationsList';

const Organizations = () => {
  return (
    <ShapeWrapper>
      <OrganizationsList
        organizations={ORGANIZATIONS.items}
        total={ORGANIZATIONS.meta.itemCount}
      ></OrganizationsList>
    </ShapeWrapper>
  );
};

export default Organizations;
