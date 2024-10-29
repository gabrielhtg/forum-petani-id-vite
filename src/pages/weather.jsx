import {MapPin} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function WeatherPage () {
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [error, setError] = useState(null);
    const options = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/3.0/onecall?lat=-6.20&lon=106.81&appid=1d913eadf2e413c0ce6137fea0bcd655',
    };


    useEffect(() => {
        const fetchData = () => {
            axios
                .request(options)
                .then(res => console.log(res.data))
                .catch(err => console.error(err));
        }

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setCoordinates({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                        setError(null); // Reset error jika berhasil
                    },
                    (err) => {
                        setError("Izin lokasi tidak diberikan atau terjadi kesalahan.");
                    }
                );
            } else {
                setError("Geolocation tidak didukung oleh browser Anda.");
            }
        };

        fetchData()
        getLocation()
    }, [])



    return (
        <div className={'flex flex-col gap-5'}>
            <Button variant={'secondary'} className={'flex gap-1'}>
                <MapPin/> Sitoluama
            </Button>

            <div className={'flex flex-col'}>
                <span className={'text-6xl'}>23</span>
                <span>Rain</span>
            </div>

            <div>
                {coordinates.lat && coordinates.lng ? (
                    <p>
                        Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
                    </p>
                ) : (
                    <p>Koordinat belum tersedia</p>
                )}
            </div>
        </div>
    )
}