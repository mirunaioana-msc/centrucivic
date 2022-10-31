import React from 'react';
import NGOSearch from '../../common/components/ngo-search/NGOSearch';

const NGOList = () => {
  return (
    <section className="w-full">
      <div className="bg-yellow w-full">
        <NGOSearch showFilters={true} />
      </div>
    </section>
  );
};

export default NGOList;
