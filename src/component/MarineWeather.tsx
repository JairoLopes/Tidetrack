// src/component/MarineWeather.tsx

import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { Payload as RechartsPayload } from "recharts/types/component/DefaultTooltipContent";
import type { TooltipProps } from "recharts/types/component/Tooltip";

import { FaSpinner, FaSearch, FaLocationArrow } from "react-icons/fa";

import * as L from "leaflet";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import debounce from "../utils/debounce";

const defaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MarineDataPoint {
  time: string;
  date: string;
  wave_height: number;
  sea_surface_temperature: number;
  sea_level_height?: number; // Adicionado: Nível do mar
  wave_direction?: number; // Adicionado: Direção da onda
}

interface LocationInfo {
  country: string;
  state?: string;
  city?: string;
  displayName: string;
}

type UnitSystem = "metric" | "imperial";

const MapClickHandler: React.FC<{
  setCoordinates: (coords: { lat: number; lon: number }) => void;
  setMapZoom: (zoom: number) => void;
}> = React.memo(({ setCoordinates, setMapZoom }) => {
  useMapEvents({
    click: (e: L.LeafletMouseEvent) => {
      setCoordinates({
        lat: parseFloat(e.latlng.lat.toFixed(2)),
        lon: parseFloat(e.latlng.lng.toFixed(2)),
      });
      setMapZoom(5);
    },
  });
  return null;
});

const MarineWeather: React.FC = () => {
  const [data, setData] = useState<MarineDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [coordinates, setCoordinates] = useState(() => {
    const savedCoords = localStorage.getItem("marineWeatherCoords");
    // Correção para o erro de JSON.parse
    if (savedCoords && savedCoords.trim() !== "") {
      try {
        return JSON.parse(savedCoords);
      } catch (e) {
        console.error("Erro ao parsear coordenadas do localStorage:", e);
        return { lat: -8.05, lon: -34.9 }; // Retorna o valor padrão em caso de erro
      }
    }
    return { lat: -8.05, lon: -34.9 }; // Retorna o valor padrão se não houver dados salvos ou forem vazios
  });

  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [mapZoom, setMapZoom] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchingLocation, setSearchingLocation] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [forecastDays, setForecastDays] = useState(1);

  useEffect(() => {
    localStorage.setItem("marineWeatherCoords", JSON.stringify(coordinates));
  }, [coordinates]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const waveHeightUnit =
        unitSystem === "metric" ? "wave_height" : "wave_height_ft";
      const temperatureUnit =
        unitSystem === "metric"
          ? "sea_surface_temperature"
          : "sea_surface_temperature_fahrenheit";
      // Novos parâmetros para a Open-Meteo API
      const seaLevelUnit = "sea_level_height_msl"; // Open-Meteo retorna em metros, não há unidade imperial direta para isso
      const waveDirectionUnit = "wave_direction"; // Direção da onda é sempre em graus

      try {
        const response = await axios.get(
          `https://marine-api.open-meteo.com/v1/marine?latitude=${coordinates.lat}&longitude=${coordinates.lon}&hourly=${waveHeightUnit},${temperatureUnit},${seaLevelUnit},${waveDirectionUnit}&timezone=auto&forecast_days=${forecastDays}`
        );

        const times = response.data.hourly.time;
        const waveHeights = response.data.hourly[waveHeightUnit];
        const temperatures = response.data.hourly[temperatureUnit];
        const seaLevels = response.data.hourly[seaLevelUnit]; // Nível do mar
        const waveDirections = response.data.hourly[waveDirectionUnit]; // Direção da onda

        const formattedData: MarineDataPoint[] = times.map(
          (time: string, index: number) => ({
            time: new Date(time).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            date: new Date(time).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
            }),
            wave_height: waveHeights[index],
            sea_surface_temperature: temperatures[index],
            sea_level_height: seaLevels[index], // Atribuindo nível do mar
            wave_direction: waveDirections[index], // Atribuindo direção da onda
          })
        );
        setData(formattedData);
      } catch (err) {
        setError(
          "Erro ao buscar dados marítimos. Verifique sua conexão ou tente novamente."
        );
        console.error("Erro ao buscar dados marítimos:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchLocationInfo = async () => {
      setLoadingLocation(true);
      setLocationInfo(null);
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.lat}&lon=${coordinates.lon}&zoom=10&addressdetails=1`
        );
        const address = response.data.address;
        const display_name = response.data.display_name;

        const info: LocationInfo = {
          country: address?.country || "Desconhecido",
          state:
            address?.state || address?.province || address?.region || undefined,
          city:
            address?.city ||
            address?.town ||
            address?.village ||
            address?.municipality ||
            undefined,
          displayName: display_name || "Localização desconhecida",
        };
        setLocationInfo(info);
      } catch (err) {
        console.error("Erro ao buscar informações de localização:", err);
        setLocationInfo({
          country: "Desconhecido",
          displayName: "Não foi possível obter informações da localidade.",
        });
      } finally {
        setLoadingLocation(false);
      }
    };

    fetchData();
    fetchLocationInfo();
  }, [coordinates, unitSystem, forecastDays]);

  const performSearch = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        setSearchError("Por favor, digite um local para buscar.");
        return;
      }

      setSearchingLocation(true);
      setSearchError(null);
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            term
          )}&limit=1`,
          {
            headers: {
              "User-Agent": "MarineWeatherApp/1.0 (seu-email@example.com)", // Use seu email ou um identificador único
            },
          }
        );

        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setCoordinates({
            lat: parseFloat(parseFloat(lat).toFixed(2)),
            lon: parseFloat(parseFloat(lon).toFixed(2)),
          });
          setMapZoom(9);
          setSearchTerm("");
          if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
        } else {
          setSearchError("Local não encontrado. Tente ser mais específico.");
        }
      } catch (err) {
        setSearchError(
          "Erro ao buscar local. Verifique sua conexão ou tente novamente."
        );
        console.error("Erro na busca de localização:", err);
      } finally {
        setSearchingLocation(false);
      }
    },
    [
      setCoordinates,
      setMapZoom,
      setSearchError,
      setSearchingLocation,
      setSearchTerm,
      searchInputRef,
    ]
  );

  const debouncedSearchRef = useRef(debounce(performSearch, 500));

  useEffect(() => {
    debouncedSearchRef.current = debounce(performSearch, 500);
  }, [performSearch]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim()) {
      debouncedSearchRef.current(term);
    } else {
      setSearchError(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch(searchTerm);
    }
  };

  const handleLocateMe = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: parseFloat(position.coords.latitude.toFixed(2)),
            lon: parseFloat(position.coords.longitude.toFixed(2)),
          });
          setMapZoom(9);
          setLoading(false);
          setError(null);
        },
        (geoError) => {
          console.error("Erro ao obter localização:", geoError);
          setError(
            "Não foi possível obter sua localização atual. Por favor, permita o acesso à geolocalização ou digite um local."
          );
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Seu navegador não suporta a Geolocation API.");
      setLoading(false);
    }
  };

  const formatValue: TooltipProps<number, string>["formatter"] = (
    value: number,
    _name: string,
    props: RechartsPayload<number, string>
  ) => {
    if (props.dataKey === ("wave_height" as keyof MarineDataPoint)) {
      return [`${value.toFixed(2)} ${waveUnitLabel}`, "Altura da Onda"];
    }
    if (
      props.dataKey === ("sea_surface_temperature" as keyof MarineDataPoint)
    ) {
      return [`${value.toFixed(2)} ${tempUnitLabel}`, "Temperatura da Água"];
    }
    if (props.dataKey === ("sea_level_height" as keyof MarineDataPoint)) {
      return [`${value.toFixed(2)} m`, "Nível do Mar (MSL)"]; // Nível do mar é sempre em metros na Open-Meteo
    }
    if (props.dataKey === ("wave_direction" as keyof MarineDataPoint)) {
      return [`${value.toFixed(0)}°`, "Direção da Onda (°)"];
    }
    return value;
  };

  const formatLabel: TooltipProps<number, string>["labelFormatter"] = (
    label: string,
    payload: readonly RechartsPayload<number, string>[]
  ) => {
    if (payload && payload.length > 0 && payload[0].payload) {
      const dataPoint = payload[0].payload as MarineDataPoint;
      return `${dataPoint.time} - ${dataPoint.date}`;
    }
    return label;
  };

  const overallLoading = loading || loadingLocation;

  if (overallLoading && data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
        <FaSpinner className="animate-spin w-10 h-10 text-blue-500 mb-4" />
        <span className="text-xl font-semibold">
          Carregando dados marítimos...
        </span>
        <p className="text-gray-400 mt-2">Isso pode levar alguns segundos.</p>
      </div>
    );
  }

  if (error && data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white p-4">
        <p className="text-red-500 text-center text-2xl font-bold mb-6">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  const waveUnitLabel = unitSystem === "metric" ? "m" : "ft";
  const tempUnitLabel = unitSystem === "metric" ? "°C" : "°F";

  return (
    <main className="p-6 pt-25 bg-gray-900 min-h-screen text-white font-sans">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-400 drop-shadow-md">
        Monitoramento Marítimo Global
      </h1>
      <p className="text-md text-gray-300 max-w-3xl mx-auto mb-8 text-center leading-relaxed">
        Este painel interativo utiliza a{" "}
        <a
          className="underline text-blue-400 hover:text-blue-300 transition-colors"
          href="https://open-meteo.com/en/docs/marine-weather-api"
          target="_blank"
          rel="noopener noreferrer"
        >
          API Marine Weather da Open-Meteo
        </a>{" "}
        e a{" "}
        <a
          className="underline text-blue-400 hover:text-blue-300 transition-colors"
          href="https://nominatim.openstreetmap.org/ui/reverse.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          API Nominatim da OpenStreetMap
        </a>{" "}
        para informações de localização.
        <br />
        <span className="font-semibold text-gray-200">
          Clique em qualquer ponto do mapa abaixo
        </span>{" "}
        para explorar a altura das ondas e a temperatura da água para a área
        selecionada.
      </p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 text-center border border-gray-700 transition-all duration-300 hover:border-blue-600">
        <h2 className="text-2xl font-bold mb-3 text-green-300">
          Buscar Localidade
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Ex: Rio de Janeiro, Tokyo Bay, Mediterrâneo"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 w-full sm:w-2/3 md:w-1/2 transition-colors duration-200"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            disabled={searchingLocation}
          />
          <button
            onClick={() => performSearch(searchTerm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={searchingLocation}
          >
            {searchingLocation ? (
              <FaSpinner className="animate-spin w-5 h-5 mr-2" />
            ) : (
              <FaSearch className="w-5 h-5 mr-2" />
            )}
            {searchingLocation ? "Buscando..." : "Buscar no Mapa"}
          </button>
          <button
            onClick={handleLocateMe}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={overallLoading}
          >
            <FaLocationArrow className="w-5 h-5 mr-2" />
            Minha Localização
          </button>
        </div>
        {searchError && (
          <p className="text-red-400 text-sm mt-3">{searchError}</p>
        )}
      </div>
      <hr className="my-8 border-gray-700" />
      <div className="w-full h-96 mb-8 rounded-lg overflow-hidden border-2 border-blue-500 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <MapContainer
          key={`${coordinates.lat}-${coordinates.lon}-${mapZoom}`}
          center={[coordinates.lat, coordinates.lon]}
          zoom={mapZoom}
          minZoom={2}
          maxZoom={12}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coordinates.lat, coordinates.lon]} />
          <MapClickHandler
            setCoordinates={setCoordinates}
            setMapZoom={setMapZoom}
          />
        </MapContainer>
      </div>
      <hr className="my-8 border-gray-700" />
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-gray-700 transition-all duration-300 hover:border-blue-600">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-300 mb-4 md:mb-0">
            Localidade Selecionada
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="unitSystem"
                className="text-gray-300 font-semibold"
              >
                Unidades:
              </label>
              <select
                id="unitSystem"
                value={unitSystem}
                onChange={(e) => setUnitSystem(e.target.value as UnitSystem)}
                className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              >
                <option value="metric">Métrico (°C, m)</option>
                <option value="imperial">Imperial (°F, ft)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="forecastDays"
                className="text-gray-300 font-semibold"
              >
                Previsão:
              </label>
              <select
                id="forecastDays"
                value={forecastDays}
                onChange={(e) => setForecastDays(parseInt(e.target.value))}
                className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              >
                {[...Array(7)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} dia{i + 1 > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loadingLocation ? (
          <div className="flex justify-center items-center py-2 text-gray-400">
            <FaSpinner className="animate-spin w-5 h-5 text-blue-400 mr-2" />
            <span>Buscando informações da localidade...</span>
          </div>
        ) : locationInfo ? (
          <div className="text-gray-300 text-lg">
            <p className="mb-1">
              <span className="font-semibold text-white">País:</span>{" "}
              {locationInfo.country}
            </p>
            {locationInfo.state && (
              <p className="mb-1">
                <span className="font-semibold text-white">Estado/Região:</span>{" "}
                {locationInfo.state}
              </p>
            )}
            {locationInfo.city && (
              <p className="mb-1">
                <span className="font-semibold text-white">Cidade:</span>{" "}
                {locationInfo.city}
              </p>
            )}
            <p className="text-sm text-gray-400 mt-3 italic">
              Coordenadas:{" "}
              <span className="font-mono font-semibold">
                {coordinates.lat}, {coordinates.lon}
              </span>
            </p>
            <p className="text-sm text-gray-400 mt-3 italic">
              Dados para:{" "}
              <span className="font-mono">
                {new Date().toLocaleDateString("pt-BR")} (Horário local:{" "}
                {Intl.DateTimeFormat().resolvedOptions().timeZone})
              </span>
            </p>
          </div>
        ) : (
          <p className="text-gray-400 text-lg">
            Nenhuma informação detalhada de localidade disponível para este
            ponto.
          </p>
        )}
      </div>
      <hr className="my-8 border-gray-700" />
      {overallLoading && !error && (
        <div className="bg-blue-900 bg-opacity-30 rounded-lg p-3 text-center text-blue-200 flex items-center justify-center mb-8">
          <FaSpinner className="animate-spin w-5 h-5 mr-2" />
          <span>Atualizando dados...</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 transition-all duration-300 hover:border-blue-600">
          <h2 className="text-2xl font-bold mb-2 text-blue-300">
            Altura das Ondas ({waveUnitLabel})
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Eixo X: Horário da previsão | Eixo Y: Altura em {waveUnitLabel}
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis
                dataKey="time"
                tick={{ fill: "#ccc", fontSize: 12 }}
                label={{
                  value: "Horário",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#ccc",
                }}
                tickFormatter={(value, index) => {
                  const dataPoint = data[index];
                  return forecastDays > 1
                    ? `${dataPoint.time}\n${dataPoint.date}`
                    : value;
                }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "#ccc" }}
                domain={[0, "dataMax"]}
                label={{
                  value: `Altura (${waveUnitLabel})`,
                  angle: -90,
                  position: "insideLeft",
                  fill: "#ccc",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#555",
                  borderRadius: "8px",
                  color: "#fff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                }}
                labelStyle={{ color: "#eee", fontWeight: "bold" }}
                formatter={formatValue}
                labelFormatter={formatLabel}
                itemStyle={{ color: "#3b82f6" }}
              />
              <Line
                type="monotone"
                dataKey="wave_height"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 transition-all duration-300 hover:border-blue-600">
          <h2 className="text-2xl font-bold mb-2 text-orange-300">
            Temperatura da Água ({tempUnitLabel})
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Eixo X: Horário da previsão | Eixo Y: Temperatura em {tempUnitLabel}
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis
                dataKey="time"
                tick={{ fill: "#ccc", fontSize: 12 }}
                label={{
                  value: "Horário",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#ccc",
                }}
                tickFormatter={(value, index) => {
                  const dataPoint = data[index];
                  return forecastDays > 1
                    ? `${dataPoint.time}\n${dataPoint.date}`
                    : value;
                }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "#ccc" }}
                domain={["auto", "auto"]}
                label={{
                  value: `Temperatura (${tempUnitLabel})`,
                  angle: -90,
                  position: "insideLeft",
                  fill: "#ccc",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#555",
                  borderRadius: "8px",
                  color: "#fff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                }}
                labelStyle={{ color: "#eee", fontWeight: "bold" }}
                formatter={formatValue}
                labelFormatter={formatLabel}
                itemStyle={{ color: "#f59e0b" }}
              />
              <Line
                type="monotone"
                dataKey="sea_surface_temperature"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Novo Gráfico: Nível do Mar */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 transition-all duration-300 hover:border-blue-600">
          <h2 className="text-2xl font-bold mb-2 text-green-300">
            Nível do Mar (MSL) (m)
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Eixo X: Horário da previsão | Eixo Y: Nível do mar em metros
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis
                dataKey="time"
                tick={{ fill: "#ccc", fontSize: 12 }}
                label={{
                  value: "Horário",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#ccc",
                }}
                tickFormatter={(value, index) => {
                  const dataPoint = data[index];
                  return forecastDays > 1
                    ? `${dataPoint.time}\n${dataPoint.date}`
                    : value;
                }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "#ccc" }}
                domain={["auto", "auto"]}
                label={{
                  value: `Nível do Mar (m)`,
                  angle: -90,
                  position: "insideLeft",
                  fill: "#ccc",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#555",
                  borderRadius: "8px",
                  color: "#fff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                }}
                labelStyle={{ color: "#eee", fontWeight: "bold" }}
                formatter={formatValue}
                labelFormatter={formatLabel}
                itemStyle={{ color: "#10b981" }}
              />
              <Line
                type="monotone"
                dataKey="sea_level_height"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Novo Gráfico: Direção Média das Ondas */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 transition-all duration-300 hover:border-blue-600">
          <h2 className="text-2xl font-bold mb-2 text-purple-300">
            Direção Média das Ondas (°)
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Eixo X: Horário da previsão | Eixo Y: Direção em graus
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis
                dataKey="time"
                tick={{ fill: "#ccc", fontSize: 12 }}
                label={{
                  value: "Horário",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#ccc",
                }}
                tickFormatter={(value, index) => {
                  const dataPoint = data[index];
                  return forecastDays > 1
                    ? `${dataPoint.time}\n${dataPoint.date}`
                    : value;
                }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "#ccc" }}
                domain={[0, 360]} // Direção em graus de 0 a 360
                label={{
                  value: `Direção (°)`,
                  angle: -90,
                  position: "insideLeft",
                  fill: "#ccc",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#555",
                  borderRadius: "8px",
                  color: "#fff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                }}
                labelStyle={{ color: "#eee", fontWeight: "bold" }}
                formatter={formatValue}
                labelFormatter={formatLabel}
                itemStyle={{ color: "#a855f7" }}
              />
              <Line
                type="monotone"
                dataKey="wave_direction"
                stroke="#a855f7"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <span id="sobre" className="block mb-10"></span>
    </main>
  );
};

export default MarineWeather;
