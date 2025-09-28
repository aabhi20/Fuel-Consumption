import React, { useState, useCallback, useEffect } from "react";
import LocationIcon from "../Icons/LocationIcon";
import Input from "../UI/Input";
import { airportDatabase } from "../../data/airportData";

const LocationInput = ({
  label,
  placeholder,
  coords,
  onChange,
  error = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Free Nominatim API geocoding (no API key required)
  const geocodeCityNominatim = async (cityQuery) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          cityQuery + " airport"
        )}&limit=8&addressdetails=1`,
        {
          headers: {
            "User-Agent": "Aviation-Fuel-Calculator/1.0",
          },
        }
      );

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();

      return data.map((item) => ({
        name: item.display_name.split(",")[0],
        country: item.address?.country || "",
        state: item.address?.state || "",
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        type: "api",
        fullAddress: item.display_name,
      }));
    } catch (error) {
      console.warn(
        "Nominatim API failed, falling back to local database:",
        error
      );
      return [];
    }
  };

  // Search in local airport database
  const searchLocalDatabase = (query) => {
    const searchTerm = query.toLowerCase();
    return airportDatabase
      .filter(
        (airport) =>
          airport.name.toLowerCase().includes(searchTerm) ||
          airport.city.toLowerCase().includes(searchTerm) ||
          airport.country.toLowerCase().includes(searchTerm) ||
          airport.iata?.toLowerCase().includes(searchTerm) ||
          airport.icao?.toLowerCase().includes(searchTerm)
      )
      .slice(0, 8)
      .map((airport) => ({
        name: `${airport.name} (${airport.iata || airport.icao})`,
        city: airport.city,
        country: airport.country,
        lat: airport.lat,
        lng: airport.lng,
        type: "airport",
        iata: airport.iata,
        icao: airport.icao,
      }));
  };

  // Combined search function
  const performSearch = async (query) => {
    setIsLoading(true);
    setSearchError("");

    try {
      // First try local airport database for instant results
      const localResults = searchLocalDatabase(query);

      // Then try Nominatim API for additional results
      const apiResults = await geocodeCityNominatim(query);

      // Combine and deduplicate results
      const combinedResults = [...localResults, ...apiResults];
      const uniqueResults = combinedResults
        .filter(
          (result, index, self) =>
            index ===
            self.findIndex(
              (r) =>
                Math.abs(r.lat - result.lat) < 0.01 &&
                Math.abs(r.lng - result.lng) < 0.01
            )
        )
        .slice(0, 8);

      if (uniqueResults.length > 0) {
        setSuggestions(uniqueResults);
        setShowSuggestions(true);
      } else {
        setSearchError(
          "No locations found. Try searching for a major city or airport name."
        );
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchError("Search failed. Please try again.");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.length >= 2) {
        performSearch(query);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchError("");

    if (value.length >= 2) {
      debouncedSearch(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      // Clear coordinates when search is cleared
      onChange({ lat: "", lng: "" });
      setSelectedCity("");
    }
  };

  const selectLocation = (location) => {
    const displayName =
      location.type === "airport"
        ? `${location.city}, ${location.country} (${location.name})`
        : `${location.name}, ${location.country}`;

    setSearchTerm(displayName);
    setSelectedCity(displayName);
    onChange({
      lat: location.lat.toString(),
      lng: location.lng.toString(),
      cityName: location.name,
      country: location.country,
      type: location.type,
    });
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const clearSelection = () => {
    setSearchTerm("");
    setSelectedCity("");
    onChange({ lat: "", lng: "" });
    setSuggestions([]);
    setShowSuggestions(false);
    setSearchError("");
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".location-search-container")) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="space-y-[4vw] sm:space-y-[2.5vw] md:space-y-[1.5vw] lg:space-y-[1.1vw] relative location-search-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center mb-[3vw] sm:mb-[2vw] md:mb-[1.1vw] lg:mb-[0.8vw]">
          <LocationIcon className="w-[5vw] h-[5vw] sm:w-[3.5vw] sm:h-[3.5vw] md:w-[2vw] md:h-[2vw] lg:w-[1.5vw] lg:h-[1.5vw] text-[#5948DB] mr-[2vw] sm:mr-[1.4vw] md:mr-[0.8vw] lg:mr-[0.6vw]" />
          <h4 className="text-[4vw] sm:text-[2.8vw] md:text-[1.6vw] lg:text-[1.2vw] font-medium text-gray-900">
            {label}
          </h4>
        </div>
        {selectedCity && (
          <button
            onClick={clearSelection}
            className="text-[3.5vw] sm:text-[2.4vw] md:text-[1.4vw] lg:text-[1.1vw] text-red-600 hover:text-red-800 font-medium"
          >
            Clear
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Input
          id={`${label.toLowerCase().replace(" ", "-")}-search`}
          label="Airport or City Name"
          type="text"
          placeholder="e.g., Mumbai, JFK Airport, London Heathrow..."
          value={searchTerm}
          onChange={handleSearchChange}
          error={searchError}
          required
          className="pr-[10vw] sm:pr-[6.5vw] md:pr-[3.5vw] lg:pr-[2.8vw] text-[3.5vw] sm:text-[2.4vw] md:text-[1.4vw] lg:text-[1.1vw]"
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute right-[3vw] sm:right-[2vw] md:right-[1.2vw] lg:right-[0.9vw] top-[12vw] sm:top-[8vw] md:top-[4.8vw] lg:top-[3.8vw] transform -translate-y-1/2">
            <div className="w-[4vw] h-[4vw] sm:w-[2.8vw] sm:h-[2.8vw] md:w-[1.6vw] md:h-[1.6vw] lg:w-[1.2vw] lg:h-[1.2vw] border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-20 w-full mt-[1vw] bg-white border border-gray-300 rounded-lg shadow-xl max-h-[80vw] sm:max-h-[55vw] md:max-h-[32vw] lg:max-h-[25vw] overflow-y-auto">
            {suggestions.map((location, index) => (
              <button
                key={index}
                onClick={() => selectLocation(location)}
                className="w-full px-[4vw] sm:px-[2.8vw] md:px-[1.6vw] lg:px-[1.2vw] py-[3vw] sm:py-[2.1vw] md:py-[1.2vw] lg:py-[0.9vw] text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-blue-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-[2vw] sm:gap-[1.4vw] md:gap-[0.8vw] lg:gap-[0.6vw] mb-[1vw] sm:mb-[0.7vw] md:mb-[0.4vw] lg:mb-[0.3vw]">
                      <p className="font-semibold text-[3.5vw] sm:text-[2.4vw] md:text-[1.4vw] lg:text-[1.1vw] text-gray-900">
                        {location.type === "airport"
                          ? location.city
                          : location.name}
                      </p>
                      {location.type === "airport" && (
                        <span className="px-[2vw] sm:px-[1.4vw] md:px-[0.8vw] lg:px-[0.6vw] py-[0.5vw] sm:py-[0.35vw] md:py-[0.2vw] lg:py-[0.15vw] text-[3vw] sm:text-[2.1vw] md:text-[1.2vw] lg:text-[0.9vw] bg-blue-100 text-blue-700 rounded-full font-medium">
                          {location.iata || location.icao}
                        </span>
                      )}
                    </div>
                    <p className="text-[3.2vw] sm:text-[2.2vw] md:text-[1.3vw] lg:text-[1vw] text-gray-600">
                      {location.type === "airport"
                        ? location.name
                        : location.fullAddress}
                    </p>
                    {location.country && (
                      <p className="text-[3vw] sm:text-[2.1vw] md:text-[1.2vw] lg:text-[0.9vw] text-gray-500 mt-[1vw] sm:mt-[0.7vw] md:mt-[0.4vw] lg:mt-[0.3vw]">
                        📍 {location.state && `${location.state}, `}
                        {location.country}
                      </p>
                    )}
                  </div>
                  <div className="text-[3vw] sm:text-[2.1vw] md:text-[1.2vw] lg:text-[0.9vw] text-gray-400 ml-[3vw] sm:ml-[2.1vw] md:ml-[1.2vw] lg:ml-[0.9vw]">
                    {location.lat.toFixed(2)}, {location.lng.toFixed(2)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Location Display */}
      {coords.lat && coords.lng && (
        <div className="border border-[#5948DB] bg-blue-50 rounded-lg p-[4vw] sm:p-[2.8vw] md:p-[1.6vw] lg:p-[1.2vw]">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-[2vw] sm:mb-[1.4vw] md:mb-[0.8vw] lg:mb-[0.6vw]">
                <div className="w-[3vw] h-[3vw] sm:w-[2.1vw] sm:h-[2.1vw] md:w-[1.2vw] md:h-[1.2vw] lg:w-[0.9vw] lg:h-[0.9vw] bg-[#5948DB] rounded-full mr-[2vw] sm:mr-[1.4vw] md:mr-[0.8vw] lg:mr-[0.6vw]"></div>
                <p className="text-[3.5vw] sm:text-[2.4vw] md:text-[1.4vw] lg:text-[1.1vw] font-semibold text-[#5948DB]">
                  Location Selected
                </p>
              </div>
              <p className="text-[3.5vw] sm:text-[2.4vw] md:text-[1.4vw] lg:text-[1.1vw] text-[#5948DB] mb-[1vw] sm:mb-[0.7vw] md:mb-[0.4vw] lg:mb-[0.3vw]">
                {selectedCity}
              </p>
              <p className="text-[3vw] sm:text-[2.1vw] md:text-[1.2vw] lg:text-[0.9vw] text-[#5948DB]">
                <strong>Coordinates:</strong>{" "}
                {parseFloat(coords.lat).toFixed(4)},{" "}
                {parseFloat(coords.lng).toFixed(4)}
              </p>
            </div>
            <div className="text-green-600">
              <svg
                className="w-[6vw] h-[6vw] sm:w-[4.2vw] sm:h-[4.2vw] md:w-[2.4vw] md:h-[2.4vw] lg:w-[1.8vw] lg:h-[1.8vw]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Helper Text */}
      <div className="border border-blue-200 bg-blue-50 rounded-lg p-[3vw] sm:p-[2.1vw] md:p-[1.2vw] lg:p-[0.9vw]">
        <p className="text-[3.5vw] sm:text-[2.4vw] md:text-[1.4vw] lg:text-[1.1vw] text-[#5948DB]">
          <strong>Search Examples:</strong>
        </p>
        <div className="grid grid-cols-2 gap-[2vw] sm:gap-[1.4vw] md:gap-[0.8vw] lg:gap-[0.6vw] mt-[2vw] sm:mt-[1.4vw] md:mt-[0.8vw] lg:mt-[0.6vw] text-[3vw] sm:text-[2.1vw] md:text-[1.2vw] lg:text-[0.9vw] text-[#5948DB]">
          <div>• Mumbai (city)</div>
          <div>• JFK (airport code)</div>
          <div>• London Heathrow</div>
          <div>• Tokyo Narita</div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-[3vw] sm:p-[2.1vw] md:p-[1.2vw] lg:p-[0.9vw]">
          <p className="text-[3.5vw] sm:text-[2.4vw] md:text-[1.4vw] lg:text-[1.1vw] text-red-700">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default LocationInput;
