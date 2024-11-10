import {useParams} from "react-router-dom";
import {dataMarketplace} from "@/data/data-marketplace.js";
import {Button} from "@/components/ui/button.jsx";
import { Phone } from "lucide-react";


export default function ItemDetail() {
    const { id } = useParams();
    const item = dataMarketplace.find((item) => item.id === parseInt(id));

    if (!item) return <p>Item tidak ditemukan</p>;

    const { gambar, nama_produk, harga, nama_toko, lokasi } = item;

    return (
        <div className="flex w-full justify-center px-4">
            <div className="flex flex-col md:flex-row w-full overflow-hidden">
                {/* Bagian Kiri: Gambar Produk */}
                <div className="w-full md:w-1/2 p-4 md:p-8">
                    <img src={gambar} alt={nama_produk} className="w-full h-auto rounded-md object-cover" />
                </div>

                {/* Bagian Kanan: Detail Produk */}
                <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col gap-4 justify-center">
                    {/* Nama Produk */}
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{nama_produk}</h2>

                    {/* Harga Produk */}
                    <p className="text-2xl md:text-3xl text-red-500 font-bold">{harga}</p>

                    {/* Informasi Toko dan Lokasi */}
                    <div className="text-gray-500 text-sm md:text-base mt-2">
                        <p>Dijual oleh: <span className="font-medium text-gray-800">{nama_toko}</span></p>
                        <p>Lokasi: <span className="font-medium text-gray-800">{lokasi}</span></p>
                    </div>

                    {/* Deskripsi Produk */}
                    <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
                        Deskripsi: Produk ini merupakan {nama_produk.toLowerCase()} yang diproduksi dengan kualitas
                        terbaik, sesuai untuk berbagai jenis tanaman dan lingkungan perkebunan. Dapatkan produk ini dari
                        toko {nama_toko} yang berlokasi di {lokasi}.
                    </p>

                    {/* Tombol Interaksi */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <Button>
                            <Phone size={20}/> Chat Penjual
                        </Button>
                        {/*<Button*/}
                        {/*    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto">*/}
                        {/*    <ShoppingCart size={20}/> Tambah ke Keranjang*/}
                        {/*</Button>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

