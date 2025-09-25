// Haversine formula to calculate distance between two points on Earth
export const calculateDistance = (coord1, coord2) => {
  const R = 6371; // Earth's radius in kilometers
  
  const lat1Rad = (coord1.lat * Math.PI) / 180;
  const lat2Rad = (coord2.lat * Math.PI) / 180;
  const deltaLatRad = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const deltaLngRad = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  const a = 
    Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) *
    Math.sin(deltaLngRad / 2) * Math.sin(deltaLngRad / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c; // Distance in kilometers
};

// Calculate fuel consumption based on distance and aircraft type
export const calculateFuelConsumption = (distance, fuelRate) => {
  const totalFuelKg = distance * fuelRate;
  
  return {
    kg: Math.round(totalFuelKg * 100) / 100,
    liters: Math.round(totalFuelKg * 1.35 * 100) / 100, // 1 kg ≈ 1.35 liters
    gallons: Math.round(totalFuelKg * 0.357 * 100) / 100, // 1 kg ≈ 0.357 gallons
    pounds: Math.round(totalFuelKg * 2.205 * 100) / 100 // 1 kg ≈ 2.205 pounds
  };
};

// Calculate estimated flight time (simplified)
// Calculate estimated flight time (simplified)
export const calculateFlightTime = (distance, aircraftType) => {
  const speeds = {
    regional: 450,    // km/h
    narrowbody: 850,  // km/h
    widebody: 900,    // km/h
    cargo: 850       // km/h
  };
  
  // Ensure distance is a valid number
  if (!distance || isNaN(distance) || distance <= 0) {
    return {
      hours: 0,
      minutes: 0,
      totalMinutes: 0
    };
  }
  
  const speed = speeds[aircraftType] || 800;
  const hours = distance / speed;
  
  // Ensure hours is a valid number
  if (isNaN(hours)) {
    return {
      hours: 0,
      minutes: 0,
      totalMinutes: 0
    };
  }
  
  return {
    hours: Math.floor(hours),
    minutes: Math.round((hours % 1) * 60),
    totalMinutes: Math.round(hours * 60)
  };
};


// Calculate CO2 emissions
export const calculateEmissions = (fuelKg) => {
  const co2Factor = 3.16; // kg CO2 per kg of fuel
  return {
    co2Kg: Math.round(fuelKg * co2Factor * 100) / 100,
    co2Tons: Math.round((fuelKg * co2Factor / 1000) * 100) / 100
  };
};

// Calculate estimated fuel cost
export const calculateFuelCost = (fuelKg, pricePerKg = 0.85) => {
  return {
    usd: Math.round(fuelKg * pricePerKg * 100) / 100,
    currency: 'USD'
  };
};
