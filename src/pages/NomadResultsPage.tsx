import React, { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Map, { Source, Layer, type MapRef } from "react-map-gl";
import { Navbar } from "../components/Navbar";
import {
  ArrowRight,
  Clock,
  Plane,
  Loader2,
  Briefcase,
  Plus,
  Minus,
  ChevronDown,
  User,
  Baby,
  Smile,
} from "lucide-react";
import { useCurrencyStore } from "../store/useCurrencyStore";
import type { NomadSearchState, PassengerConfig } from "../types";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2FtaW1hc2xhbiIsImEiOiJjbWd0b3lrMWswNmU4MmlyMXNiZWZoODBhIn0.5EzekljQe-2FzlekVqdBbg";
const NINJA_API_KEY = "e4xnCfNmp1alZJtp5UmTgg==qmlXHXwwoBjr3atC";

interface Coordinates {
  lat: number;
  lng: number;
}

interface FlightSegment {
  from: string;
  to: string;
  date: string;
  duration: string;
  price: number;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
}

interface Itinerary {
  id: string;
  segments: FlightSegment[];
  totalPrice: number;
}

const AirlineLogo: React.FC<{ name: string }> = ({ name }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchLogo = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/logo?name=${encodeURIComponent(name)}`,
          {
            headers: { "X-Api-Key": NINJA_API_KEY },
          }
        );
        if (!response.ok) throw new Error("API Error");

        const data = await response.json();
        if (data && data.length > 0 && data[0].image) {
          if (isMounted) setLogoUrl(data[0].image);
        } else {
          if (isMounted) setError(true);
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLogo();
    return () => {
      isMounted = false;
    };
  }, [name]);

  if (loading)
    return (
      <div className="w-full h-full bg-gray-50 animate-pulse rounded-md" />
    );
  if (error || !logoUrl) return <Plane className="w-6 h-6 text-[#2F34A2]" />;

  return (
    <img src={logoUrl} alt={name} className="w-full h-full object-contain" />
  );
};

const NomadResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { convertPrice } = useCurrencyStore();
  const mapRef = useRef<MapRef>(null);

  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const passengerDropdownRef = useRef<HTMLDivElement>(null);

  const state = location.state as NomadSearchState;

  const [passengers, setPassengers] = useState<PassengerConfig>(
    state?.passengers || {
      adults: 1,
      children: 0,
      infants: 0,
    }
  );

  const origin = state?.fromCity || "Zürich";
  const dest1 = state?.dest1 || "London";
  const dest2 = state?.dest2 || "Paris";
  const finalDest = state?.endCity || origin;
  const startDateStr =
    state?.startDate || new Date().toISOString().split("T")[0];

  const [coords, setCoords] = useState<Record<string, Coordinates>>({});
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(
    null
  );
  const [loadingMap, setLoadingMap] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        passengerDropdownRef.current &&
        !passengerDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPassengerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updatePassenger = (key: keyof PassengerConfig, delta: number) => {
    setPassengers((prev) => {
      const newValue = prev[key] + delta;
      if (newValue < 0) return prev;
      if (key === "adults" && newValue < 1) return prev;
      return { ...prev, [key]: newValue };
    });
  };

  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  const calculateTotalPrice = (basePrice: number) => {
    const total =
      basePrice * passengers.adults +
      basePrice * 0.8 * passengers.children +
      basePrice * 0.2 * passengers.infants;
    return Math.round(total);
  };

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const calculateFlightData = (
    c1: Coordinates,
    c2: Coordinates,
    basePriceModifier: number
  ) => {
    const dist = getDistanceFromLatLonInKm(c1.lat, c1.lng, c2.lat, c2.lng);
    const hours = dist / 850;
    const totalMinutes = Math.round(hours * 60) + 30;
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;

    const basePrice = 50 + dist * 0.08;
    const price = Math.round(basePrice + basePriceModifier);

    return {
      duration: `${h}h ${m}m`,
      price: price,
      minutes: totalMinutes,
    };
  };

  useEffect(() => {
    const fetchCoordinates = async (city: string) => {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            city
          )}&count=1&language=en&format=json`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return {
            lat: data.results[0].latitude,
            lng: data.results[0].longitude,
          };
        }
      } catch (e) {
        console.error("Failed to geocode", city);
      }
      return null;
    };

    const loadData = async () => {
      setLoadingMap(true);
      const uniqueCities = Array.from(
        new Set([origin, dest1, dest2, finalDest])
      );
      const newCoords: Record<string, Coordinates> = {};

      await Promise.all(
        uniqueCities.map(async (city) => {
          const c = await fetchCoordinates(city);
          if (c) newCoords[city] = c;
        })
      );

      setCoords(newCoords);

      if (
        newCoords[origin] &&
        newCoords[dest1] &&
        newCoords[dest2] &&
        newCoords[finalDest]
      ) {
        const baseDate = new Date(startDateStr);
        const airlines = [
          "Swiss",
          "British Airways",
          "Lufthansa",
          "EasyJet",
          "Air France",
          "KLM",
          "Turkish Airlines",
          "Austrian",
          "Emirates",
          "TAP Portugal",
          "Iberia",
          "Ryanair",
        ];

        const generateRoute = (
          pathCities: string[],
          priceMod: number,
          id: string
        ) => {
          const segments: FlightSegment[] = [];
          let total = 0;

          for (let i = 0; i < pathCities.length - 1; i++) {
            const from = pathCities[i];
            const to = pathCities[i + 1];
            const daysOffset = i * 3;

            const flightDate = new Date(baseDate);
            flightDate.setDate(flightDate.getDate() + daysOffset);

            const randomPriceVar = Math.random() * 40 - 20;
            const data = calculateFlightData(
              newCoords[from],
              newCoords[to],
              priceMod + randomPriceVar
            );

            const randomAirline =
              airlines[Math.floor(Math.random() * airlines.length)];
            const depHour = 6 + Math.floor(Math.random() * 14);
            const depMin = Math.floor(Math.random() * 60);
            const depTime = `${depHour.toString().padStart(2, "0")}:${depMin
              .toString()
              .padStart(2, "0")}`;

            const arrDateObj = new Date(flightDate);
            arrDateObj.setHours(depHour, depMin + data.minutes);
            const arrTime = `${arrDateObj
              .getHours()
              .toString()
              .padStart(2, "0")}:${arrDateObj
              .getMinutes()
              .toString()
              .padStart(2, "0")}`;

            segments.push({
              from,
              to,
              date: flightDate.toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
              }),
              duration: data.duration,
              price: data.price,
              airline: randomAirline,
              flightNumber: `NG-${
                100 +
                parseInt(id.split("-")[1]) +
                i +
                Math.floor(Math.random() * 900)
              }`,
              departureTime: depTime,
              arrivalTime: arrTime,
            });

            total += data.price;
          }

          return {
            id,
            segments,
            totalPrice: total,
          };
        };
        const path1 = [origin, dest1, dest2, finalDest];
        const path2 = [origin, dest2, dest1, finalDest];

        const generatedItineraries = [
          generateRoute(path1, -40, "opt-1"),
          generateRoute(path2, -35, "opt-2"),
          generateRoute(path1, -10, "opt-3"),
          generateRoute(path2, 10, "opt-4"),
          generateRoute(path1, 40, "opt-5"),
        ];

        generatedItineraries.sort((a, b) => a.totalPrice - b.totalPrice);
        setItineraries(generatedItineraries);
        setSelectedItinerary(generatedItineraries[0]);
      }

      setLoadingMap(false);
    };

    loadData();
  }, [origin, dest1, dest2, finalDest, startDateStr]);

  const flightPathGeoJSON = useMemo(() => {
    if (!selectedItinerary) return null;

    const points: number[][] = [];

    selectedItinerary.segments.forEach((seg, i) => {
      if (i === 0) {
        if (coords[seg.from])
          points.push([coords[seg.from].lng, coords[seg.from].lat]);
      }
      if (coords[seg.to]) points.push([coords[seg.to].lng, coords[seg.to].lat]);
    });

    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: points,
      },
    };
  }, [coords, selectedItinerary]);

  const stopsGeoJSON = useMemo(() => {
    if (!selectedItinerary) return null;

    const features = [];
    const locationCounts: Record<string, number> = {};

    const getOffsetCoords = (lng: number, lat: number) => {
      const key = `${lng.toFixed(4)},${lat.toFixed(4)}`;
      const count = locationCounts[key] || 0;
      locationCounts[key] = count + 1;

      if (count > 0) {
        const offsetAmount = 0.5;
        const direction = count % 2 === 0 ? -1 : 1;
        return [lng + offsetAmount * Math.ceil(count / 2) * direction, lat];
      }
      return [lng, lat];
    };

    const firstSeg = selectedItinerary.segments[0];
    if (coords[firstSeg.from]) {
      const c = coords[firstSeg.from];
      const [lng, lat] = getOffsetCoords(c.lng, c.lat);
      features.push({
        type: "Feature",
        geometry: { type: "Point", coordinates: [lng, lat] },
        properties: { label: "1" },
      });
    }

    selectedItinerary.segments.forEach((seg, i) => {
      if (coords[seg.to]) {
        const c = coords[seg.to];
        const [lng, lat] = getOffsetCoords(c.lng, c.lat);
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [lng, lat] },
          properties: { label: String(i + 2) },
        });
      }
    });

    return {
      type: "FeatureCollection",
      features,
    };
  }, [coords, selectedItinerary]);

  const initialViewState = useMemo(() => {
    const allCoords = Object.values(coords);
    if (allCoords.length === 0)
      return { longitude: 8.54, latitude: 47.37, zoom: 4 };

    const avgLat =
      allCoords.reduce((sum, c) => sum + c.lat, 0) / allCoords.length;
    const avgLng =
      allCoords.reduce((sum, c) => sum + c.lng, 0) / allCoords.length;

    return {
      longitude: avgLng,
      latitude: avgLat,
      zoom: 3.5,
    };
  }, [coords]);

  return (
    <div className="h-screen w-full bg-[#F9FAFB] flex flex-col font-sans text-[#111827] overflow-hidden">
      <div className="flex-none">
        <Navbar />
      </div>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative w-full">
        <div className="w-full lg:w-2/5 h-full overflow-y-auto border-r border-gray-200 bg-white p-4 md:p-6 shadow-xl z-10 scrollbar-hide">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <button
                onClick={() => navigate("/")}
                className="text-sm text-gray-500 hover:text-[#2F34A2] mb-4 flex items-center gap-1 transition-colors"
              >
                ← Back to search
              </button>
              <h1 className="text-2xl font-bold text-[#111827]">
                Select your Journey
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Found 5 nomad options starting from {origin}
              </p>
            </div>

            <div
              className="flex flex-col items-end relative"
              ref={passengerDropdownRef}
            >
              <span className="text-xs font-semibold text-gray-500 mb-1">
                Passengers
              </span>

              <button
                onClick={() => setIsPassengerOpen(!isPassengerOpen)}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                {totalPassengers} Passenger{totalPassengers !== 1 ? "s" : ""}
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {isPassengerOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">
                      Passengers
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Adults
                            </p>
                            <p className="text-xs text-gray-500">Over 11</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updatePassenger("adults", -1)}
                            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 disabled:opacity-30"
                            disabled={passengers.adults <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {passengers.adults}
                          </span>
                          <button
                            onClick={() => updatePassenger("adults", 1)}
                            className="p-1 rounded-full hover:bg-gray-100 text-[#2F34A2]"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smile className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Children
                            </p>
                            <p className="text-xs text-gray-500">2 – 11</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updatePassenger("children", -1)}
                            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 disabled:opacity-30"
                            disabled={passengers.children <= 0}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {passengers.children}
                          </span>
                          <button
                            onClick={() => updatePassenger("children", 1)}
                            className="p-1 rounded-full hover:bg-gray-100 text-[#2F34A2]"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Baby className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Infants
                            </p>
                            <p className="text-xs text-gray-500">Under 2</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updatePassenger("infants", -1)}
                            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 disabled:opacity-30"
                            disabled={passengers.infants <= 0}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {passengers.infants}
                          </span>
                          <button
                            onClick={() => updatePassenger("infants", 1)}
                            className="p-1 rounded-full hover:bg-gray-100 text-[#2F34A2]"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <button
                      onClick={() => setIsPassengerOpen(false)}
                      className="w-full bg-[#2F34A2] text-white font-semibold py-2 rounded-lg hover:bg-[#262a85] transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 pb-12">
            {itineraries.map((itinerary, index) => (
              <div
                key={itinerary.id}
                onClick={() => setSelectedItinerary(itinerary)}
                className={`bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer ${
                  selectedItinerary?.id === itinerary.id
                    ? "border-[#2F34A2] ring-1 ring-[#2F34A2]"
                    : "border-gray-200"
                }`}
              >
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-[#2F34A2]">
                      {convertPrice(calculateTotalPrice(itinerary.totalPrice))}
                    </span>
                    <p className="text-xs text-gray-500 font-medium">
                      Total price for all passengers
                    </p>
                  </div>
                  <button className="bg-[#2F34A2] hover:bg-[#262a85] text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-md shadow-[#2F34A2]/20 transition-all flex items-center gap-2">
                    Book this trip <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-2">
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <Plane className="w-3 h-3" />
                      {itinerary.segments.length} Flights
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <Briefcase className="w-3 h-3" />
                      Economy
                    </div>
                  </div>

                  <div className="space-y-4">
                    {itinerary.segments.map((segment, segIdx) => (
                      <div
                        key={segIdx}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                      >
                        <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 p-1.5 flex items-center justify-center shrink-0">
                          <AirlineLogo name={segment.airline} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-gray-900 text-sm">
                              {segment.from} → {segment.to}
                            </span>
                            <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                              {segment.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {segment.departureTime} - {segment.arrivalTime}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span>{segment.airline}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{segment.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block w-3/5 h-full bg-gray-100 relative">
          {loadingMap ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-[#2F34A2]" />
            </div>
          ) : (
            <Map
              ref={mapRef}
              initialViewState={initialViewState}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/light-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
              projection={{ name: "mercator" }}
            >
              {flightPathGeoJSON && (
                <Source
                  id="route"
                  type="geojson"
                  data={flightPathGeoJSON as any}
                >
                  <Layer
                    id="route-line"
                    type="line"
                    paint={{
                      "line-color": "#2F34A2",
                      "line-width": 3,
                      "line-dasharray": [2, 1],
                    }}
                  />
                </Source>
              )}
              {stopsGeoJSON && (
                <Source id="stops" type="geojson" data={stopsGeoJSON as any}>
                  <Layer
                    id="stops-circle"
                    type="circle"
                    paint={{
                      "circle-radius": 12,
                      "circle-color": "#2F34A2",
                      "circle-stroke-width": 2,
                      "circle-stroke-color": "#ffffff",
                    }}
                  />
                  <Layer
                    id="stops-label"
                    type="symbol"
                    layout={{
                      "text-field": ["get", "label"],
                      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
                      "text-size": 12,
                      "text-allow-overlap": true,
                    }}
                    paint={{
                      "text-color": "#ffffff",
                    }}
                  />
                </Source>
              )}
            </Map>
          )}
        </div>
      </main>
    </div>
  );
};

export default NomadResultsPage;
