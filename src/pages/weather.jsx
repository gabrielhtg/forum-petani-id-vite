import { MapPin } from "lucide-react";
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
import { capitalize } from "@/services/capitalize.js";

export default function WeatherPage() {
  const [cityName, setCityName] = useState("Jakarta");
  const [namaKota, setNamaKota] = useState("");
  const [kotaData, setKotaData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "3f0837f03aab493880ecc11f2aeb6bcc";

  const fetchDataWeather = (lat, lon) => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat,
          lon,
          appid: apiKey,
          units: "metric",
          lang: "id",
        },
      })
      .then((res) => {
        setWeatherData(res.data);
        setCityName(res.data.name);
      })
      .catch((err) => console.error(err));
  };

  const fetchDataCity = () => {
    if (namaKota) {
      axios
        .get("https://api.openweathermap.org/data/2.5/find", {
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

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchDataWeather(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocationWeather(); // Dapatkan cuaca berdasarkan lokasi saat ini saat komponen pertama kali di-render
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (namaKota) {
        fetchDataCity();
      }
    }, 500);

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
                        fetchDataWeather(kota.coord.lat, kota.coord.lon);
                      }}
                    >
                      <div
                        className={
                          namaKota.toLowerCase() === kota.name.toLowerCase()
                            ? "opacity-100"
                            : "opacity-0"
                        }
                      >
                        {kota.name}
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Tampilan Cuaca */}
      <div
        className={
          "flex flex-col text-center items-center justify-center h-[calc(100vh-165px)]"
        }
      >
        {weatherData ? (
          <>
            <span className={"text-8xl font-bold ml-8"}>
              {Math.round(weatherData.main.temp)}°C
            </span>
            <span className={"text-xl"}>
              {capitalize(weatherData.weather[0].description)}
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
