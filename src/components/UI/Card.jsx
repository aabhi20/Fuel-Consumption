import React from 'react';

const Card = ({ 
  title, 
  children, 
  className = '',
  headerClassName = '',
  bodyClassName = ''
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ${className} `}>
      {title && (
        <div className={`px-6 py-4 border-b border-gray-100 bg-gray-50 ${headerClassName}`}>
          <h3 className="text-lg font-semibold text-black">{title}</h3>
        </div>
      )}
      <div className={`p-6 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
