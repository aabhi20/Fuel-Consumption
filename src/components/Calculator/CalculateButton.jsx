import React from 'react';
import Button from '../UI/Button';
import FuelIcon from '../Icons/FuelIcon';

const CalculateButton = ({ onClick, loading, disabled }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={onClick}
        loading={loading}
        disabled={disabled}
        size="lg"
        className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[200px]"
      >
        {!loading && (
          <div className="flex items-center">
            <FuelIcon className="w-6 h-6 mr-2" />
            Calculate Fuel
          </div>
        )}
      </Button>
      
      {disabled && (
        <p className="text-sm text-gray-500 text-center max-w-md">
          Please enter source coordinates, destination coordinates, and select an aircraft type to calculate fuel consumption.
        </p>
      )}
    </div>
  );
};

export default CalculateButton;
