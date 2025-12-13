import React, { useState, useEffect, useRef } from "react";
import { X, Loader2, MapPin } from "lucide-react";

interface City {
  name: string;
  country: string;
}

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
  wrapperClassName?: string;
}
const EUROPEAN_COUNTRY_CODES = [
  "AL",
  "AD",
  "AT",
  "BY",
  "BE",
  "BA",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FO",
  "FI",
  "FR",
  "DE",
  "GI",
  "GR",
  "HU",
  "IS",
  "IE",
  "IM",
  "IT",
  "XK",
  "LV",
  "LI",
  "LT",
  "LU",
  "MK",
  "MT",
  "MD",
  "MC",
  "ME",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "RU",
  "SM",
  "RS",
  "SK",
  "SI",
  "ES",
  "SE",
  "CH",
  "TR",
  "UA",
  "GB",
  "VA",
  "AX",
  "GG",
  "JE",
  "SJ",
];

export const CityAutocomplete: React.FC<CityAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "City",
  inputClassName = "outline-none text-gray-900 w-full bg-transparent placeholder-gray-400 font-medium",
  wrapperClassName = "w-full relative",
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodedQuery}&count=100&language=en&format=json`
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Strictly filter results to only include European countries
        // Ensure country_code exists and normalize to uppercase for comparison
        const europeanCities = (data.results || []).filter(
          (item: any) =>
            item.country_code &&
            EUROPEAN_COUNTRY_CODES.includes(item.country_code.toUpperCase())
        );
        const mappedCities: City[] = europeanCities
          .slice(0, 5)
          .map((item: any) => ({
            name: item.name,
            country: item.country,
          }));

        setSuggestions(mappedCities);
        setIsOpen(true);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (!value && query) {
        fetchCities();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, value]);

  const handleSelect = (city: City) => {
    onChange(city.name);
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
  };

  const clearSelection = () => {
    onChange("");
    setQuery("");
  };

  const handleEdit = () => {
    setQuery(value);
    onChange("");
  };

  if (value) {
    return (
      <div className={wrapperClassName}>
        <div className="flex items-center gap-1 bg-green-100 text-[#2F34A2] px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap w-fit">
          <span onClick={handleEdit} className="cursor-pointer hover:underline">
            {value}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearSelection();
            }}
            className="hover:text-[#A22F2F] ml-1 focus:outline-none"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={wrapperClassName}>
      <div className="flex items-center w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen && e.target.value.length >= 2) setIsOpen(true);
          }}
          placeholder={placeholder}
          className={inputClassName}
          autoFocus
        />
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin text-gray-400 flex-shrink-0" />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-xl border border-gray-100 mt-2 py-1 z-50 max-h-60 overflow-y-auto">
          {suggestions.map((city, idx) => (
            <button
              key={`${city.name}-${idx}`}
              onClick={() => handleSelect(city)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 group transition-colors"
            >
              <MapPin className="w-4 h-4 text-gray-400 group-hover:text-[#2F34A2]" />
              <span className="text-gray-700 font-medium">{city.name}</span>
              <span className="text-gray-400 text-xs ml-auto">
                {city.country}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
