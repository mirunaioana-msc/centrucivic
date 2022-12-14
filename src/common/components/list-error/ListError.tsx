import React from 'react';
import { RefreshIcon } from '@heroicons/react/solid';

interface ListErrorProps {
  children: string;
  retry?: () => void;
}

const ListError = ({ children, retry }: ListErrorProps) => (
  <div className="p-10 flex flex-col items-center justify-center">
    <p className="text-center p-2">{children}</p>
    {retry && <RefreshIcon onClick={retry} className="w-8 h-8 m-4" />}
  </div>
);

export default ListError;
