import React from 'react';
import Card from '../UI/Card';
import FuelIcon from '../Icons/FuelIcon';
import LocationIcon from '../Icons/LocationIcon';
import PlaneIcon from '../Icons/PlaneIcon';

const ResultsDisplay = ({ results }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const MetricCard = ({ title, value, unit, icon: Icon, color = "#5948DB" }) => (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium text-${color}-700`}>{title}</p>
          <p className={`text-2xl font-bold text-[#5948DB]`}>
            {formatNumber(value)}
            <span className={`text-lg font-normal text-${color}-700 ml-1`}>{unit}</span>
          </p>
        </div>
        <Icon className={`w-8 h-8 text-${color}-600`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Calculation Results</h2>
        <p className="text-gray-600">Complete fuel consumption analysis for your flight</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Distance"
          value={results.distance.km}
          unit="km"
          icon={LocationIcon}
          color="#5948DB"
        />
        <MetricCard
          title="Fuel Required"
          value={results.fuel.kg}
          unit="kg"
          icon={FuelIcon}
          color="#5948DB"
        />
        <MetricCard
          title="Flight Time"
          value={`${results.flightTime.hours}h ${results.flightTime.minutes}m`}
          unit=""
          icon={PlaneIcon}
          color="#5948DB"
        />
        <MetricCard
          title="Estimated Cost"
          value={results.cost.usd}
          unit="USD"
          icon={FuelIcon}
          color="#5948DB"
        />
      </div>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Distance Details */}
        <Card title="Distance Analysis">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Kilometers</span>
              <span className="font-semibold text-[#5948DB]">{formatNumber(results.distance.km)} km</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Miles</span>
              <span className="font-semibold text-[#5948DB]">{formatNumber(results.distance.miles)} mi</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Nautical Miles</span>
              <span className="font-semibold text-[#5948DB]">{formatNumber(results.distance.nauticalMiles)} nmi</span>
            </div>
          </div>
        </Card>

        {/* Fuel Details */}
        <Card title="Fuel Consumption">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Kilograms</span>
              <span className="font-semibold text-[#5948DB]">{formatNumber(results.fuel.kg)} kg</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Liters</span>
              <span className="font-semibold text-[#5948DB]">{formatNumber(results.fuel.liters)} L</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Gallons (US)</span>
              <span className="font-semibold text-[#5948DB]">{formatNumber(results.fuel.gallons)} gal</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Pounds</span>
              <span className="font-semibold text-[#5948DB]">{formatNumber(results.fuel.pounds)} lbs</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Environmental Impact */}
      <Card title="Environmental Impact">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-red-800 mb-2">CO₂ Emissions</h4>
            <p className="text-3xl font-bold text-red-900">
              {formatNumber(results.emissions.co2Kg)} 
              <span className="text-lg font-normal text-red-700 ml-1">kg</span>
            </p>
            <p className="text-sm text-red-600 mt-1">
              ({formatNumber(results.emissions.co2Tons)} tons)
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-[#5948DB] mb-2">Aircraft Efficiency</h4>
            <p className="text-2xl font-bold text-[#3E31B4]">
              {results.aircraft.efficiency}
            </p>
            <p className="text-sm text-[#7A6EF0] mt-1">
              {results.aircraft.fuelRate} kg/km consumption rate
            </p>
          </div>
        </div>
      </Card>

      {/* Aircraft Information */}
      <Card title="Aircraft Details">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-3">{results.aircraft.icon}</span>
            <div>
              <h4 className="text-lg font-semibold text-black">{results.aircraft.name}</h4>
              <p className="text-gray-500">{results.aircraft.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Category</p>
              <p className="text-gray-900">{results.aircraft.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Max Range</p>
              <p className="text-gray-900">{results.aircraft.maxRange}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Capacity</p>
              <p className="text-gray-900">{results.aircraft.passengers}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">Examples:</p>
            <p className="text-gray-600">{results.aircraft.examples.join(', ')}</p>
          </div>
        </div>
      </Card>

      {/* Calculation Info */}
      <div className="text-center text-sm text-gray-500">
        <p>Calculated on {new Date(results.calculatedAt).toLocaleString()}</p>
       
      </div>
    </div>
  );
};

export default ResultsDisplay;
