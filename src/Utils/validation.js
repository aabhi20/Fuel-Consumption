export const validateCoordinates = (coords) => {
  const errors = {};
  
  if (!coords.lat || coords.lat === '') {
    errors.lat = 'Latitude is required';
  } else {
    const lat = parseFloat(coords.lat);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.lat = 'Latitude must be between -90 and 90';
    }
  }
  
  if (!coords.lng || coords.lng === '') {
    errors.lng = 'Longitude is required';
  } else {
    const lng = parseFloat(coords.lng);
    if (isNaN(lng) || lng < -180 || lng > 180) {
      errors.lng = 'Longitude must be between -180 and 180';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateAircraftSelection = (aircraftType) => {
  return {
    isValid: !!aircraftType,
    error: !aircraftType ? 'Please select an aircraft type' : ''
  };
};
