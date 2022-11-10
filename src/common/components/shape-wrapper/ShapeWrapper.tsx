import React from 'react';

interface ShapeWrapperProps {
  children: React.ReactNode;
}

const ShapeWrapper = ({ children }: ShapeWrapperProps) => {
  return <div className="w-full h-fit bg-repeat sm:bg-auto bg-contain">{children}</div>;
};

export default ShapeWrapper;
