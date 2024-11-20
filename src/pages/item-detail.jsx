import { useParams } from "react-router-dom";
import { dataMarketplace } from "@/data/data-marketplace.js";
import { Button } from "@/components/ui/button.jsx";
import { Phone } from "lucide-react";

export default function ItemDetail() {
  const { id } = useParams();
  const item = dataMarketplace.find((item) => item.id === parseInt(id));

  if (!item) return <p>Item tidak ditemukan</p>;

  const { gambar, nama_produk, harga, nama_toko, lokasi } = item;

  // Pesan template yang akan muncul di WhatsApp
  const templateMessage =
    "Halo, saya tertarik dengan produk ini yang ada di Forum Tani ID. Apakah produk ini masih tersedia?";
  const encodedMessage = encodeURIComponent(templateMessage);


  const handleChatClick = () => {
    const waNumber = "6281264856003"; 
    const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    window.open(waLink, "_blank"); 
  };

  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
  
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <img
            src={gambar}
            alt={nama_produk}
            className="w-full h-auto rounded-md object-cover"
          />
        </div>


        <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col gap-4 justify-center">
  
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            {nama_produk}
          </h2>

   
          <p className="text-2xl md:text-3xl text-red-500 font-bold">{harga}</p>

  
          <div className="text-gray-500 text-sm md:text-base mt-2">
            <p>
              Dijual oleh:{" "}
              <span className="font-medium text-gray-800">{nama_toko}</span>
            </p>
            <p>
              Lokasi:{" "}
              <span className="font-medium text-gray-800">{lokasi}</span>
            </p>
          </div>

        
          <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
            Deskripsi: Produk ini merupakan {nama_produk.toLowerCase()} yang
            diproduksi dengan kualitas terbaik, sesuai untuk berbagai jenis
            tanaman dan lingkungan perkebunan. Dapatkan produk ini dari toko{" "}
            {nama_toko} yang berlokasi di {lokasi}.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button onClick={handleChatClick}>
              <Phone size={20} /> Chat Penjual
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
