import { Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.jsx";
import { dataProvinsi } from "@/data/data-provinsi.js";
import { cn } from "@/lib/utils.js";

const provinsi = dataProvinsi.data;

export default function WeatherPage() {
  const [cityName, setCityName] = useState("Jakarta");
  const [namaProvinsi, setNamaProvinsi] = useState("");
  const [namaKota, setNamaKota] = useState("");
  const [kotaData, setKotaData] = useState([]);
  const [weatherData, setWeatherData] = useState(null); // State untuk menyimpan data cuaca
  const apiKey = "3f0837f03aab493880ecc11f2aeb6bcc"; // OpenWeather API Key

  const optionsWeather = {
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName},ID&appid=${apiKey}&units=metric`,
  };

  const fetchDataWeather = () => {
    axios
        .request(optionsWeather)
        .then((res) => {
          setWeatherData(res.data);
        })
        .catch((err) => console.error(err));
  };

  const fetchDataCity = () => {
    if (namaKota) {
      axios
          .get(`https://api.openweathermap.org/data/2.5/find`, {
            params: {
              q: `${namaKota},ID`,
              type: "like",
              appid: apiKey,
            },
          })
          .then((res) => {
            setKotaData(res.data.list);
          })
          .catch((err) => console.error(err));
    }
  };

  // Debounce effect for city search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (namaKota) {
        fetchDataCity();
      }
    }, 500); // Delay search API call by 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [namaKota]);

  return (
      <div className={"flex flex-col gap-5"}>
        <Dialog>
          <DialogTrigger>
            <Button variant={"secondary"} className={"flex gap-1"}>
              <MapPin /> {cityName === "" ? "Pilih Lokasi" : cityName}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className={"flex flex-col gap-5 items-center"}>
              <DialogTitle>Pilih Lokasi Anda</DialogTitle>

              <div className={"w-full flex flex-col gap-3"}>
                {/* Provinsi Selector */}
                <select
                    className="border p-2 rounded w-full"
                    value={namaProvinsi}
                    onChange={(e) => {
                      setNamaProvinsi(e.target.value);
                      setKotaData([]); // Clear city data when changing province
                    }}
                >
                  <option value="">Pilih Provinsi</option>
                  {provinsi.map((prov) => (
                      <option key={prov.code} value={prov.name}>
                        {prov.name}
                      </option>
                  ))}
                </select>

                {/* Kota Search Input */}
                <input
                    type="text"
                    className="border p-2 rounded w-full"
                    placeholder="Cari Kota..."
                    value={namaKota}
                    onChange={(e) => setNamaKota(e.target.value)}
                />

                {/* Kota List */}
                <ul className="border rounded w-full max-h-48 overflow-auto">
                  {kotaData.length === 0 ? (
                      <li className="p-2 text-gray-500">Kota tidak ditemukan!</li>
                  ) : (
                      kotaData.map((kota) => (
                          <li
                              key={kota.id}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setNamaKota(kota.name);
                                setCityName(kota.name);
                                fetchDataWeather();
                              }}
                          >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    namaKota === kota.name ? "opacity-100" : "opacity-0"
                                )}
                            />
                            {kota.name}
                          </li>
                      ))
                  )}
                </ul>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Tampilan Cuaca */}
        <div className={"flex flex-col text-center"}>
          {weatherData ? (
              <>
            <span className={"text-8xl font-bold ml-8"}>
              {Math.round(weatherData.main.temp)}°C
            </span>
                <span className={"text-xl"}>
              {weatherData.weather[0].description}
            </span>
                <div className={"text-lg mt-4"}>
                  <p>Kecepatan Angin: {weatherData.wind.speed} m/s</p>
                  <p>Kelembapan: {weatherData.main.humidity}%</p>
                  <p>Tekanan Udara: {weatherData.main.pressure} hPa</p>
                </div>
              </>
          ) : (
              <span>Memuat data cuaca...</span>
          )}
        </div>
      </div>
  );
}
