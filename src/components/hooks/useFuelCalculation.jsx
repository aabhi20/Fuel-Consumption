import { useState } from 'react';
import { 
  calculateDistance, 
  calculateFuelConsumption, 
  calculateFlightTime,
  calculateEmissions,
  calculateFuelCost 
} from '../../Utils/calculations';
import { validateCoordinates, validateAircraftSelection } from '../../Utils/validation';
import { aircraftTypes } from '../../data/aircraftData';

const useFuelCalculation = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const calculateFuel = async (sourceCoords, destCoords, selectedAircraft) => {
    setLoading(true);
    setErrors({});
    
    try {
      // Validate inputs
      const sourceValidation = validateCoordinates(sourceCoords);
      const destValidation = validateCoordinates(destCoords);
      const aircraftValidation = validateAircraftSelection(selectedAircraft);
      
      if (!sourceValidation.isValid || !destValidation.isValid || !aircraftValidation.isValid) {
        setErrors({
          source: sourceValidation.errors,
          destination: destValidation.errors,
          aircraft: aircraftValidation.error
        });
        setLoading(false);
        return;
      }

      // Convert coordinates to numbers
      const source = {
        lat: parseFloat(sourceCoords.lat),
        lng: parseFloat(sourceCoords.lng)
      };
      const destination = {
        lat: parseFloat(destCoords.lat),
        lng: parseFloat(destCoords.lng)
      };

      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Calculate results
      const distance = calculateDistance(source, destination);
      const aircraft = aircraftTypes[selectedAircraft];
      const fuel = calculateFuelConsumption(distance, aircraft.fuelRate);
      const flightTime = calculateFlightTime(distance, selectedAircraft);
      const emissions = calculateEmissions(fuel.kg);
      const cost = calculateFuelCost(fuel.kg);
      
      const calculationResults = {
        distance: {
          km: Math.round(distance * 100) / 100,
          miles: Math.round(distance * 0.621371 * 100) / 100,
          nauticalMiles: Math.round(distance * 0.539957 * 100) / 100
        },
        fuel,
        flightTime,
        emissions,
        cost,
        aircraft: aircraft,
        route: {
          source: source,
          destination: destination
        },
        calculatedAt: new Date().toISOString()
      };
      
      setResults(calculationResults);
      
    } catch (error) {
      setErrors({ general: 'Failed to calculate fuel consumption. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setErrors({});
  };

  return {
    results,
    loading,
    errors,
    calculateFuel,
    clearResults
  };
};

export default useFuelCalculation;
