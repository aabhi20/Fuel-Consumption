export const aircraftTypes = {
  regional: {
    name: 'Regional Aircraft',
    category: 'Small',
    fuelRate: 1.5, // kg/km
    examples: ['ATR 42/72', 'Bombardier CRJ', 'Embraer E-Jet'],
    icon: '🛩️',
    efficiency: 'High',
    description: 'Small aircraft for short regional flights',
    maxRange: '1,500 km',
    passengers: '50-100'
  },
  narrowbody: {
    name: 'Commercial Jet',
    category: 'Medium',
    fuelRate: 3.2, // kg/km  
    examples: ['Boeing 737', 'Airbus A320', 'Boeing 757'],
    icon: '✈️',
    efficiency: 'Good',
    description: 'Standard commercial aircraft for domestic flights',
    maxRange: '5,000 km',
    passengers: '120-200'
  },
  widebody: {
    name: 'Wide-body Jet', 
    category: 'Large',
    fuelRate: 4.8, // kg/km
    examples: ['Boeing 777', 'Airbus A330', 'Boeing 787'],
    icon: '🛫',
    efficiency: 'Moderate',
    description: 'Large aircraft for international long-haul flights',
    maxRange: '15,000 km',
    passengers: '250-400'
  },
  cargo: {
    name: 'Cargo Aircraft',
    category: 'Heavy',
    fuelRate: 12.6, // kg/km
    examples: ['Boeing 747F', 'Airbus A330F', 'Boeing 777F'],
    icon: '🚛',
    efficiency: 'Low',
    description: 'Heavy freight aircraft for cargo transport',
    maxRange: '8,000 km',
    passengers: '0 (Cargo Only)'
  }
};
