import React, { useState } from "react";
import { aircraftTypes } from "../../data/aircraftData";
import PlaneIcon from "../Icons/PlaneIcon";

const AircraftSelector = ({ selectedAircraft, onSelect }) => {
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (aircraftId) => {
    setShowDetails((prev) => ({
      ...prev,
      [aircraftId]: !prev[aircraftId],
    }));
  };

  const getEfficiencyColor = (efficiency) => {
    switch (efficiency) {
      case "High":
        return "text-green-600 bg-green-100";
      case "Good":
        return "text-blue-600 bg-blue-100";
      case "Moderate":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-[3vw] sm:space-y-[2.1vw] md:space-y-[1.2vw] lg:space-y-[0.9vw]">
      {/* Header */}
      <div className="flex items-center mb-[3vw] sm:mb-[2.1vw] md:mb-[1.2vw] lg:mb-[0.9vw]">
        <PlaneIcon className="w-[5vw] h-[5vw] sm:w-[3.5vw] sm:h-[3.5vw] md:w-[2vw] md:h-[2vw] lg:w-[1.5vw] lg:h-[1.5vw] text-blue-600 mr-[2vw] sm:mr-[1.4vw] md:mr-[0.8vw] lg:mr-[0.6vw]" />
        <h4 className="text-[4vw] sm:text-[2.8vw] md:text-[1.6vw] lg:text-[1.2vw] font-medium text-gray-900">
          Select Aircraft Type
        </h4>
      </div>

      {/* Aircraft Cards */}
      <div className="space-y-[3vw] sm:space-y-[2.1vw] md:space-y-[1.2vw] lg:space-y-[0.9vw]">
        {Object.entries(aircraftTypes).map(([key, aircraft]) => (
          <div key={key} className="relative">
            <div
              className={`
                cursor-pointer rounded-lg border-2 transition-all duration-200
                p-[4vw] sm:p-[2.8vw] md:p-[1.6vw] lg:p-[1.2vw]
                ${
                  selectedAircraft === key
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }
              `}
              onClick={() => onSelect(key)}
            >
              {/* Main Card Content */}
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  {/* Aircraft Icon */}
                  <div className="text-[6vw] sm:text-[4.2vw] md:text-[2.4vw] lg:text-[1.8vw] mr-[3vw] sm:mr-[2.1vw] md:mr-[1.2vw] lg:mr-[0.9vw]">
                    {aircraft.icon}
                  </div>

                  {/* Aircraft Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-[2vw] sm:gap-[1.4vw] md:gap-[0.8vw] lg:gap-[0.6vw] mb-[1vw] sm:mb-[0.7vw] md:mb-[0.4vw] lg:mb-[0.3vw] flex-wrap">
                      <h5 className="text-[3.5vw] sm:text-[2.4vw] md:text-[1.4vw] lg:text-[1.1vw] font-semibold text-gray-900">
                        {aircraft.name}
                      </h5>
                      <span
                        className={`px-[2vw] sm:px-[1.4vw] md:px-[0.8vw] lg:px-[0.6vw] py-[0.5vw] sm:py-[0.35vw] md:py-[0.2vw] lg:py-[0.15vw] text-[2.5vw] sm:text-[1.75vw] md:text-[1vw] lg:text-[0.8vw] font-medium rounded-full ${getEfficiencyColor(
                          aircraft.efficiency
                        )}`}
                      >
                        {aircraft.efficiency}
                      </span>
                    </div>
                    <p className="text-[3.2vw] sm:text-[2.2vw] md:text-[1.3vw] lg:text-[1vw] text-gray-600 mb-[1vw] sm:mb-[0.7vw] md:mb-[0.4vw] lg:mb-[0.3vw]">
                      {aircraft.description}
                    </p>
                    <p className="text-[3.2vw] sm:text-[2.2vw] md:text-[1.3vw] lg:text-[1vw] text-gray-500">
                      <strong>Fuel Rate:</strong> {aircraft.fuelRate} kg/km
                    </p>
                  </div>
                </div>

                {/* Selection Indicator */}
                <div
                  className={`
                  flex items-center justify-center flex-shrink-0 ml-[3vw] sm:ml-[2.1vw] md:ml-[1.2vw] lg:ml-[0.9vw] rounded-full border-2
                  w-[6vw] h-[6vw] sm:w-[4.2vw] sm:h-[4.2vw] md:w-[2.4vw] md:h-[2.4vw] lg:w-[1.8vw] lg:h-[1.8vw]
                  ${
                    selectedAircraft === key
                      ? "border-[#5948DB] bg-[#5948DB]"
                      : "border-gray-300"
                  }
                `}
                >
                  {selectedAircraft === key && (
                    <div className="w-[3vw] h-[3vw] sm:w-[2.1vw] sm:h-[2.1vw] md:w-[1.2vw] md:h-[1.2vw] lg:w-[0.9vw] lg:h-[0.9vw] bg-white rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Details Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDetails(key);
                }}
                className="mt-[3vw] sm:mt-[2.1vw] md:mt-[1.2vw] lg:mt-[0.9vw] text-[3.2vw] sm:text-[2.2vw] md:text-[1.3vw] lg:text-[1vw] text-[#5948DB] hover:text-[#4B3FC4] font-medium transition-colors duration-200"
              >
                {showDetails[key] ? "Hide Details" : "Show Details"}
              </button>
            </div>

            {/* Expandable Details */}
            {showDetails[key] && (
              <div className="mt-[2vw] sm:mt-[1.4vw] md:mt-[0.8vw] lg:mt-[0.6vw] ml-[4vw] sm:ml-[2.8vw] md:ml-[1.6vw] lg:ml-[1.2vw] p-[4vw] sm:p-[2.8vw] md:p-[1.6vw] lg:p-[1.2vw] bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[3vw] sm:gap-[2.1vw] md:gap-[1.2vw] lg:gap-[0.9vw] text-[3.2vw] sm:text-[2.2vw] md:text-[1.3vw] lg:text-[1vw]">
                  <div>
                    <p className="font-medium text-gray-700 mb-[1vw] sm:mb-[0.7vw] md:mb-[0.4vw] lg:mb-[0.3vw]">
                      Max Range
                    </p>
                    <p className="text-gray-600">{aircraft.maxRange}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-[1vw] sm:mb-[0.7vw] md:mb-[0.4vw] lg:mb-[0.3vw]">
                      Capacity
                    </p>
                    <p className="text-gray-600">{aircraft.passengers}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-[1vw] sm:mb-[0.7vw] md:mb-[0.4vw] lg:mb-[0.3vw]">
                      Category
                    </p>
                    <p className="text-gray-600">{aircraft.category}</p>
                  </div>
                </div>
                <div className="mt-[3vw] sm:mt-[2.1vw] md:mt-[1.2vw] lg:mt-[0.9vw]">
                  <p className="font-medium text-gray-700 mb-[1vw] sm:mb-[0.7vw] md:mb-[0.4vw] lg:mb-[0.3vw]">
                    Examples:
                  </p>
                  <p className="text-gray-600 text-[3.2vw] sm:text-[2.2vw] md:text-[1.3vw] lg:text-[1vw]">
                    {aircraft.examples.join(", ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selection Summary */}
      {selectedAircraft && (
        <div className="mt-[4vw] sm:mt-[2.8vw] md:mt-[1.6vw] lg:mt-[1.2vw] p-[4vw] sm:p-[2.8vw] md:p-[1.6vw] lg:p-[1.2vw] bg-white border border-[#5948DB] rounded-lg">
          <div className="flex items-center">
            <div className="w-[3vw] h-[3vw] sm:w-[2.1vw] sm:h-[2.1vw] md:w-[1.2vw] md:h-[1.2vw] lg:w-[0.9vw] lg:h-[0.9vw] bg-[#5948DB] rounded-full mr-[2vw] sm:mr-[1.4vw] md:mr-[0.8vw] lg:mr-[0.6vw] flex-shrink-0"></div>
            <p className="text-[3.2vw] sm:text-[2.2vw] md:text-[1.3vw] lg:text-[1vw] text-[#5948DB] font-medium">
              <strong>Selected:</strong> {aircraftTypes[selectedAircraft].name}{" "}
              - {aircraftTypes[selectedAircraft].fuelRate} kg/km fuel
              consumption
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AircraftSelector;
