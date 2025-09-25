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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <PlaneIcon className="w-5 h-5 text-blue-600 mr-2" />
        <h4 className="text-base font-medium text-gray-900">
          Select Aircraft Type
        </h4>
      </div>

      {/* Aircraft Cards */}
      <div className="space-y-3">
        {Object.entries(aircraftTypes).map(([key, aircraft]) => (
          <div key={key} className="relative">
            <div
              className={`
                cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
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
                  <div className="text-2xl mr-3">{aircraft.icon}</div>

                  {/* Aircraft Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h5 className="text-lg font-semibold text-gray-900">
                        {aircraft.name}
                      </h5>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getEfficiencyColor(
                          aircraft.efficiency
                        )}`}
                      >
                        {aircraft.efficiency}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {aircraft.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <strong>Fuel Rate:</strong> {aircraft.fuelRate} kg/km
                    </p>
                  </div>
                </div>

                {/* Selection Indicator */}
                <div
                  className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${
                    selectedAircraft === key
                      ? "border-[#5948DB] bg-[#5948DB]"
                      : "border-gray-300"
                  }
                `}
                >
                  {selectedAircraft === key && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Details Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDetails(key);
                }}
                className="mt-3 text-sm text-[#5948DB] hover:text-blue-800 font-medium"
              >
                {showDetails[key] ? "Hide Details" : "Show Details"}
              </button>
            </div>

            {/* Expandable Details */}
            {showDetails[key] && (
              <div className="mt-2 ml-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Max Range</p>
                    <p className="text-gray-600">{aircraft.maxRange}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Capacity</p>
                    <p className="text-gray-600">{aircraft.passengers}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Category</p>
                    <p className="text-gray-600">{aircraft.category}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-700">Examples:</p>
                  <p className="text-gray-600">
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
        <div className="mt-4 p-4 bg-white  border border-[#5948DB] rounded-lg">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#5948DB] rounded-full mr-2"></div>
            <p className="text-sm text-[#5948DB]">
              <strong>Selected:</strong> {aircraftTypes[selectedAircraft].name}{" "}
              -{aircraftTypes[selectedAircraft].fuelRate} kg/km fuel consumption
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AircraftSelector;
