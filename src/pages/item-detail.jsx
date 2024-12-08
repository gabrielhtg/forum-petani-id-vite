import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@/env.js";
import { formatRupiah } from "@/services/format-rupiah.js";

export default function ItemDetail() {
  const { id } = useParams();
  // const item = dataMarketplace.find((item) => item.id === parseInt(id));
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProduct(response.data.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts().then();
  }, [id]);

  if (!product) return <p>Item tidak ditemukan</p>;

  const {
    nama,
    picture,
    description,
    harga,
    lokasi,
    whatsapp_number,
    uploader_id,
  } = product;

  // Pesan template yang akan muncul di WhatsApp
  const templateMessage =
    "Halo, saya tertarik dengan produk ini yang ada di Forum Tani ID. Apakah produk ini masih tersedia?";
  const encodedMessage = encodeURIComponent(templateMessage);

  const handleChatClick = () => {
    const waLink = `https://wa.me/${whatsapp_number}?text=${encodedMessage}`;
    window.open(waLink, "_blank");
  };

  return (
    <div className="flex w-full justify-center px-4 bg-white rounded-lg">
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <img
            src={`${apiUrl}/${picture}`}
            alt={nama}
            className="w-full h-auto rounded-md object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col gap-4 justify-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            {nama}
          </h2>

          <p className="text-2xl md:text-3xl text-red-500 font-bold">
            {formatRupiah(harga)},-
          </p>

          <div className="text-gray-500 text-sm md:text-base mt-2">
            <p>
              Dijual oleh:{" "}
              <span className="font-medium text-gray-800">{uploader_id}</span>
            </p>
            <p>
              Lokasi:{" "}
              <span className="font-medium text-gray-800">{lokasi}</span>
            </p>
          </div>

          <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
            {description}
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
