import React from 'react';

interface VirtuosoHeaderProps {
  totalItems: number;
  entities: string;
}

const VirtuosoHeader = ({ entities, totalItems }: VirtuosoHeaderProps) => {
  return (
    <p className="title text-center pb-5 sm:pb-10">
      {totalItems > 0 ? `${totalItems} ${entities}` : ''}
    </p>
  );
};

export default VirtuosoHeader;
