import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.jsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.jsx";
import { cn } from "@/lib/utils.js";
import { dataProvinsi } from "@/data/data-provinsi.js";

const provinsi = dataProvinsi.data;

export default function WeatherPage() {
  const [cityName, setCityName] = useState("Jakarta");
  const [open, setOpen] = React.useState(false);
  const [namaProvinsi, setNamaProvinsi] = React.useState("");
  const [kodeProvinsi, setKodeProvinsi] = React.useState("");
  const [cityData, setCityData] = React.useState();

  const optionsWeather = {
    method: "GET",
    // url: 'https://api.openweathermap.org/data/2.5/weather?lat=2.3860291&lon=99.1467961&appid=3f0837f03aab493880ecc11f2aeb6bcc',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName},ID&appid=3f0837f03aab493880ecc11f2aeb6bcc`,
  };

  const optionsKota = {
    method: "GET",
    url: `https://wilayah.id/api/regencies/${kodeProvinsi}.json`,
  };

  const fetchDataWeather = () => {
    axios
      .request(optionsWeather)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  const fetchDataCity = () => {
    axios
      .request(optionsKota)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDataCity();
  });

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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {namaProvinsi
                      ? provinsi.find((e) => e.name === namaProvinsi)?.name
                      : "Provinsi"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Cari provinsi ..." />
                    <CommandList>
                      <CommandEmpty>Provinsi tidak ditemukan!</CommandEmpty>
                      <CommandGroup>
                        {provinsi.map((e) => (
                          <CommandItem
                            key={e.code}
                            value={e.name}
                            onSelect={(currentValue) => {
                              setNamaProvinsi(
                                currentValue === namaProvinsi
                                  ? ""
                                  : currentValue
                              );
                              setOpen(false);

                              setKodeProvinsi(e.code);

                              console.log(kodeProvinsi);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                namaProvinsi === e.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {e.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {namaProvinsi
                      ? provinsi.find((e) => e.name === namaProvinsi)?.name
                      : "Provinsi"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Cari provinsi ..." />
                    <CommandList>
                      <CommandEmpty>Provinsi tidak ditemukan!</CommandEmpty>
                      <CommandGroup>
                        {provinsi.map((e) => (
                          <CommandItem
                            key={e.code}
                            value={e.name}
                            onSelect={(currentValue) => {
                              setNamaProvinsi(
                                currentValue === namaProvinsi
                                  ? ""
                                  : currentValue
                              );
                              setOpen(false);

                              setKodeProvinsi(e.code);

                              console.log(kodeProvinsi);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                namaProvinsi === e.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {e.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover> */}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className={"flex flex-col text-center"}>
        <span className={"text-8xl font-bold ml-8"}>23°</span>
        <span>Rain</span>
      </div>
    </div>
  );
}
