import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Map, { Source, Layer } from "react-map-gl";
import { Navbar } from "../components/Navbar";
import {
  ArrowRight,
  Calendar,
  Clock,
  Plane,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useCurrencyStore } from "../store/useCurrencyStore";
import type { NomadSearchState } from "../types";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2FtaW1hc2xhbiIsImEiOiJjbWd0b3lrMWswNmU4MmlyMXNiZWZoODBhIn0.5EzekljQe-2FzlekVqdBbg";

interface Coordinates {
  lat: number;
  lng: number;
}

const NomadResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { convertPrice } = useCurrencyStore();

  const state = location.state as NomadSearchState;

  const origin = state?.fromCity || "Zürich";
  const dest1 = state?.dest1 || "London";
  const dest2 = state?.dest2 || "Paris";
  const finalDest = state?.endCity || origin;

  const [coords, setCoords] = useState<Record<string, Coordinates>>({});
  const [loadingMap, setLoadingMap] = useState(true);

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

    const loadAllCoords = async () => {
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
      setLoadingMap(false);
    };

    loadAllCoords();
  }, [origin, dest1, dest2, finalDest]);

  const segments = [
    {
      from: origin,
      to: dest1,
      date: "Mon, 12 Oct",
      duration: "2h 15m",
      price: 120,
      airline: "NomadAir",
    },
    {
      from: dest1,
      to: dest2,
      date: "Fri, 16 Oct",
      duration: "1h 45m",
      price: 95,
      airline: "NomadAir",
    },
    {
      from: dest2,
      to: finalDest,
      date: "Tue, 20 Oct",
      duration: "3h 30m",
      price: 180,
      airline: "NomadAir",
    },
  ];

  const totalPrice = segments.reduce((acc, curr) => acc + curr.price, 0);

  const flightPathGeoJSON = useMemo(() => {
    const points = [];
    if (coords[origin]) points.push([coords[origin].lng, coords[origin].lat]);
    if (coords[dest1]) points.push([coords[dest1].lng, coords[dest1].lat]);
    if (coords[dest2]) points.push([coords[dest2].lng, coords[dest2].lat]);
    if (coords[finalDest])
      points.push([coords[finalDest].lng, coords[finalDest].lat]);

    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: points,
      },
    };
  }, [coords, origin, dest1, dest2, finalDest]);

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
        {/* Left Panel - Scrollable */}
        <div className="w-full lg:w-2/5 h-full overflow-y-auto border-r border-gray-200 bg-white p-6 md:p-10 shadow-xl z-10 scrollbar-hide">
          <div className="mb-8">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-500 hover:text-[#2F34A2] mb-4 flex items-center gap-1 transition-colors"
            >
              ← Back to search
            </button>
            <h1 className="text-3xl font-bold text-[#111827]">
              Your Nomad Journey
            </h1>
            <p className="text-gray-500 mt-2">
              3 Flights • 1 Passenger • Economy
            </p>
          </div>

          <div className="relative border-l-2 border-gray-100 ml-4 space-y-12 pb-12">
            {segments.map((segment, index) => (
              <div key={index} className="relative pl-8 group">
                {/* Timeline Dot - Blue */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#2F34A2] group-hover:scale-125 transition-transform z-10"></div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xl font-bold text-[#111827]">
                      {segment.from}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                    <span className="text-xl font-bold text-[#111827]">
                      {segment.to}
                    </span>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#2F34A2]/30 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                          <Plane className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {segment.airline}
                          </p>
                          <p className="text-xs text-gray-400">
                            Flight NG-{100 + index}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-[#2F34A2] text-lg">
                        {convertPrice(segment.price)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{segment.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{segment.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="relative pl-8">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#111827]"></div>
              <h3 className="text-lg font-bold text-[#111827]">
                Trip Complete
              </h3>
              <p className="text-gray-500 text-sm">Welcome to {finalDest}</p>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white pt-6 border-t border-gray-100 mt-6 pb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total Price</span>
              <span className="text-3xl font-bold text-[#111827]">
                {convertPrice(totalPrice)}
              </span>
            </div>
            {/* Booking Button - Blue */}
            <button className="w-full bg-[#2F34A2] hover:bg-[#262a85] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#2F34A2]/20 transition-all flex items-center justify-center gap-2">
              Book entire route <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Panel - Map - Fixed */}
        <div className="hidden lg:block w-3/5 h-full bg-gray-100 relative">
          {loadingMap ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-[#2F34A2]" />
            </div>
          ) : (
            <Map
              initialViewState={initialViewState}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/light-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
              projection={{ name: "mercator" }}
            >
              <Source id="route" type="geojson" data={flightPathGeoJSON as any}>
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
            </Map>
          )}
        </div>
      </main>
    </div>
  );
};

export default NomadResultsPage;
