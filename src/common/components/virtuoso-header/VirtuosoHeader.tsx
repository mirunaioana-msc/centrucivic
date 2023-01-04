import React from 'react';

interface VirtuosoHeaderProps {
  totalItems: number;
  entities: string;
}

const VirtuosoHeader = ({ entities, totalItems }: VirtuosoHeaderProps) => {
  return (
    <p className="title text-center py-5 sm:py-10">
      {totalItems > 0 ? `${totalItems} ${entities}` : ''}
    </p>
  );
};

export default VirtuosoHeader;
