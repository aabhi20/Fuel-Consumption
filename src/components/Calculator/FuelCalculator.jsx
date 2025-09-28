import React, { useState } from "react";
import LocationInput from "./LocationInput";
import AircraftSelector from "./AircraftSelector";
import CalculateButton from "./CalculateButton";
import ResultsDisplay from "./ResultsDisplay";
import Card from "../UI/Card";
import useFuelCalculation from "../hooks/useFuelCalculation";

const FuelCalculator = () => {
  const [sourceCoords, setSourceCoords] = useState({
    lat: "",
    lng: "",
    cityName: "",
  });
  const [destCoords, setDestCoords] = useState({
    lat: "",
    lng: "",
    cityName: "",
  });
  const [selectedAircraft, setSelectedAircraft] = useState("");

  // ... rest of component stays the same

  const { results, loading, errors, calculateFuel, clearResults } =
    useFuelCalculation();

  const handleCalculate = () => {
    calculateFuel(sourceCoords, destCoords, selectedAircraft);
  };

  const handleReset = () => {
    setSourceCoords({ lat: "", lng: "" });
    setDestCoords({ lat: "", lng: "" });
    setSelectedAircraft("");
    clearResults();
  };

  const isFormValid =
    sourceCoords.lat &&
    sourceCoords.lng &&
    destCoords.lat &&
    destCoords.lng &&
    selectedAircraft;

  return (
    <div className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] mx-auto space-y-8">
      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Flight Route" className="h-fit">
          <div className="space-y-6">
            <LocationInput
              label="Source Airport"
              placeholder="Enter source coordinates"
              coords={sourceCoords}
              onChange={setSourceCoords}
              error={
                errors.source ? Object.values(errors.source).join(", ") : ""
              }
            />
            <LocationInput
              label="Destination Airport"
              placeholder="Enter destination coordinates"
              coords={destCoords}
              onChange={setDestCoords}
              error={
                errors.destination
                  ? Object.values(errors.destination).join(", ")
                  : ""
              }
            />
          </div>
        </Card>

        <Card title="Aircraft Selection" className="h-fit">
          <AircraftSelector
            selectedAircraft={selectedAircraft}
            onSelect={setSelectedAircraft}
          />
          {errors.aircraft && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{errors.aircraft}</p>
            </div>
          )}
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <CalculateButton
          onClick={handleCalculate}
          loading={loading}
          disabled={!isFormValid}
        />

        {(results || Object.keys(errors).length > 0) && (
          <button
            onClick={handleReset}
            className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Reset Calculator
          </button>
        )}
      </div>

      {/* Error Display */}
      {errors.general && (
        <Card className="border-red-200 bg-red-50">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
            <p className="text-red-700">{errors.general}</p>
          </div>
        </Card>
      )}

      {/* Results Section */}
      {results && <ResultsDisplay results={results} />}
    </div>
  );
};

export default FuelCalculator;
