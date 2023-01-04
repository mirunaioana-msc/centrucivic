import React from 'react';

interface ShapeWrapperProps {
  children: React.ReactNode;
}

const ShapeWrapper = ({ children }: ShapeWrapperProps) => {
  return (
    <div className="w-full bg-shape bg-repeat sm:bg-auto bg-contain relative px-10">{children}</div>
  );
};

export default ShapeWrapper;
