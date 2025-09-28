import React from "react";
import Card from "../UI/Card";
import FuelIcon from "../Icons/FuelIcon";
import LocationIcon from "../Icons/LocationIcon";
import PlaneIcon from "../Icons/PlaneIcon";

const ResultsDisplay = ({ results }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const MetricCard = ({
    title,
    value,
    unit,
    icon: Icon,
    color = "#5948DB",
  }) => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-[2.5vw] sm:p-[2vw] md:p-[1.5vw] lg:p-[1.2vw]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[2.8vw] sm:text-[2vw] md:text-[1.4vw] lg:text-[1.1vw] font-medium text-blue-700">
            {title}
          </p>
          <p className="text-[4.5vw] sm:text-[3.5vw] md:text-[2.5vw] lg:text-[1.9vw] font-bold text-[#5948DB]">
            {formatNumber(value)}
            <span className="text-[3.2vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.4vw] font-normal text-blue-700 ml-[0.8vw] sm:ml-[0.6vw] md:ml-[0.4vw] lg:ml-[0.3vw]">
              {unit}
            </span>
          </p>
        </div>
        <Icon className="w-[6vw] h-[6vw] sm:w-[4.5vw] sm:h-[4.5vw] md:w-[3.5vw] md:h-[3.5vw] lg:w-[2.8vw] lg:h-[2.8vw] text-blue-600" />
      </div>
    </div>
  );

  return (
    <div className="space-y-[4.5vw] sm:space-y-[3.5vw] md:space-y-[2.5vw] lg:space-y-[2vw]">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-[5.5vw] sm:text-[4vw] md:text-[2.8vw] lg:text-[2.2vw] font-bold text-gray-900 mb-[1.5vw] sm:mb-[1.2vw] md:mb-[0.8vw] lg:mb-[0.6vw]">
          Calculation Results
        </h2>
        <p className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-600">
          Complete fuel consumption analysis for your flight
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[3vw] sm:gap-[2.5vw] md:gap-[1.8vw] lg:gap-[1.4vw]">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[4.5vw] sm:gap-[3.5vw] md:gap-[2.5vw] lg:gap-[2vw]">
        {/* Distance Details */}
        <Card title="Distance Analysis">
          <div className="space-y-[2.2vw] sm:space-y-[1.8vw] md:space-y-[1.2vw] lg:space-y-[1vw]">
            <div className="flex justify-between items-center py-[1.5vw] sm:py-[1.2vw] md:py-[0.8vw] lg:py-[0.6vw] border-b border-gray-100">
              <span className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-600">
                Kilometers
              </span>
              <span className="font-semibold text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-[#5948DB]">
                {formatNumber(results.distance.km)} km
              </span>
            </div>
            <div className="flex justify-between items-center py-[1.5vw] sm:py-[1.2vw] md:py-[0.8vw] lg:py-[0.6vw] border-b border-gray-100">
              <span className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-600">
                Miles
              </span>
              <span className="font-semibold text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-[#5948DB]">
                {formatNumber(results.distance.miles)} mi
              </span>
            </div>
            <div className="flex justify-between items-center py-[1.5vw] sm:py-[1.2vw] md:py-[0.8vw] lg:py-[0.6vw]">
              <span className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-600">
                Nautical Miles
              </span>
              <span className="font-semibold text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-[#5948DB]">
                {formatNumber(results.distance.nauticalMiles)} nmi
              </span>
            </div>
          </div>
        </Card>

        {/* Fuel Details */}
        <Card title="Fuel Consumption">
          <div className="space-y-[2.2vw] sm:space-y-[1.8vw] md:space-y-[1.2vw] lg:space-y-[1vw]">
            <div className="flex justify-between items-center py-[1.5vw] sm:py-[1.2vw] md:py-[0.8vw] lg:py-[0.6vw] border-b border-gray-100">
              <span className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-600">
                Kilograms
              </span>
              <span className="font-semibold text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-[#5948DB]">
                {formatNumber(results.fuel.kg)} kg
              </span>
            </div>
            <div className="flex justify-between items-center py-[1.5vw] sm:py-[1.2vw] md:py-[0.8vw] lg:py-[0.6vw] border-b border-gray-100">
              <span className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-600">
                Liters
              </span>
              <span className="font-semibold text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-[#5948DB]">
                {formatNumber(results.fuel.liters)} L
              </span>
            </div>
            <div className="flex justify-between items-center py-[1.5vw] sm:py-[1.2vw] md:py-[0.8vw] lg:py-[0.6vw] border-b border-gray-100">
              <span className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-600">
                Gallons (US)
              </span>
              <span className="font-semibold text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-[#5948DB]">
                {formatNumber(results.fuel.gallons)} gal
              </span>
            </div>
            <div className="flex justify-between items-center py-[1.5vw] sm:py-[1.2vw] md:py-[0.8vw] lg:py-[0.6vw]">
              <span className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-600">
                Pounds
              </span>
              <span className="font-semibold text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-[#5948DB]">
                {formatNumber(results.fuel.pounds)} lbs
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Environmental Impact */}
      <Card title="Environmental Impact">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[4.5vw] sm:gap-[3.5vw] md:gap-[2.5vw] lg:gap-[2vw]">
          <div className="bg-red-50 border border-red-200 rounded-lg p-[3.2vw] sm:p-[2.5vw] md:p-[2vw] lg:p-[1.6vw]">
            <h4 className="text-[3.8vw] sm:text-[2.8vw] md:text-[2.2vw] lg:text-[1.7vw] font-semibold text-red-800 mb-[1.5vw] sm:mb-[1.2vw] md:mb-[0.8vw] lg:mb-[0.6vw]">
              CO₂ Emissions
            </h4>
            <p className="text-[6vw] sm:text-[4.5vw] md:text-[3.5vw] lg:text-[2.8vw] font-bold text-red-900">
              {formatNumber(results.emissions.co2Kg)}
              <span className="text-[3.8vw] sm:text-[2.8vw] md:text-[2.2vw] lg:text-[1.7vw] font-normal text-red-700 ml-[0.8vw] sm:ml-[0.6vw] md:ml-[0.4vw] lg:ml-[0.3vw]">
                kg
              </span>
            </p>
            <p className="text-[2.8vw] sm:text-[2vw] md:text-[1.6vw] lg:text-[1.2vw] text-red-600 mt-[0.8vw] sm:mt-[0.6vw] md:mt-[0.4vw] lg:mt-[0.3vw]">
              ({formatNumber(results.emissions.co2Tons)} tons)
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-[3.2vw] sm:p-[2.5vw] md:p-[2vw] lg:p-[1.6vw]">
            <h4 className="text-[3.8vw] sm:text-[2.8vw] md:text-[2.2vw] lg:text-[1.7vw] font-semibold text-[#5948DB] mb-[1.5vw] sm:mb-[1.2vw] md:mb-[0.8vw] lg:mb-[0.6vw]">
              Aircraft Efficiency
            </h4>
            <p className="text-[5.2vw] sm:text-[3.8vw] md:text-[3vw] lg:text-[2.4vw] font-bold text-[#3E31B4]">
              {results.aircraft.efficiency}
            </p>
            <p className="text-[2.8vw] sm:text-[2vw] md:text-[1.6vw] lg:text-[1.2vw] text-[#7A6EF0] mt-[0.8vw] sm:mt-[0.6vw] md:mt-[0.4vw] lg:mt-[0.3vw]">
              {results.aircraft.fuelRate} kg/km consumption rate
            </p>
          </div>
        </div>
      </Card>

      {/* Aircraft Information */}
      <Card title="Aircraft Details">
        <div className="bg-gray-50 rounded-lg p-[3.2vw] sm:p-[2.5vw] md:p-[2vw] lg:p-[1.6vw]">
          <div className="flex items-center mb-[2.5vw] sm:mb-[2vw] md:mb-[1.5vw] lg:mb-[1.2vw]">
            <span className="text-[5.2vw] sm:text-[3.8vw] md:text-[3vw] lg:text-[2.4vw] mr-[2.5vw] sm:mr-[2vw] md:mr-[1.5vw] lg:mr-[1.2vw]">
              {results.aircraft.icon}
            </span>
            <div>
              <h4 className="text-[3.8vw] sm:text-[2.8vw] md:text-[2.2vw] lg:text-[1.7vw] font-semibold text-black">
                {results.aircraft.name}
              </h4>
              <p className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-500">
                {results.aircraft.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[3.2vw] sm:gap-[2.5vw] md:gap-[2vw] lg:gap-[1.6vw] mt-[3.2vw] sm:mt-[2.5vw] md:mt-[2vw] lg:mt-[1.6vw]">
            <div>
              <p className="text-[2.8vw] sm:text-[2vw] md:text-[1.6vw] lg:text-[1.2vw] font-medium text-gray-700">
                Category
              </p>
              <p className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-900">
                {results.aircraft.category}
              </p>
            </div>
            <div>
              <p className="text-[2.8vw] sm:text-[2vw] md:text-[1.6vw] lg:text-[1.2vw] font-medium text-gray-700">
                Max Range
              </p>
              <p className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-900">
                {results.aircraft.maxRange}
              </p>
            </div>
            <div>
              <p className="text-[2.8vw] sm:text-[2vw] md:text-[1.6vw] lg:text-[1.2vw] font-medium text-gray-700">
                Capacity
              </p>
              <p className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-900">
                {results.aircraft.passengers}
              </p>
            </div>
          </div>

          <div className="mt-[3.2vw] sm:mt-[2.5vw] md:mt-[2vw] lg:mt-[1.6vw]">
            <p className="text-[2.8vw] sm:text-[2vw] md:text-[1.6vw] lg:text-[1.2vw] font-medium text-gray-700">
              Examples:
            </p>
            <p className="text-[3.2vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] text-gray-600">
              {results.aircraft.examples.join(", ")}
            </p>
          </div>
        </div>
      </Card>

      {/* Calculation Info */}
      <div className="text-center text-[2.8vw] sm:text-[2vw] md:text-[1.6vw] lg:text-[1.2vw] text-gray-500">
        <p>Calculated on {new Date(results.calculatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
