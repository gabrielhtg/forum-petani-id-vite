import { Card } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { MapPin } from "lucide-react";
import { Truncate } from "@re-dev/react-truncate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "@/env.js";
import { Toaster } from "@/components/ui/toaster.jsx";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast.js";
import { formatRupiah } from "@/services/format-rupiah.js";

export default function YourProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const username = localStorage.getItem("username");

  const handleCardClick = (id) => {
    navigate(`/marketplace/${id}`);
  };

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/products/sort/uploaded-by-me/${username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setProducts(response.data.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchUserProducts().then();
  }, [username, navigate]);

  return (
    <div
      className={
        "flex w-full items-center p-1 md:p-5 gap-3 md:gap-5 flex-wrap justify-center"
      }
    >
      <div
        className={
          "w-full min-h-[120px] border rounded-2xl py-5 px-5 xl:px-48 text-xl flex justify-center items-center bg-white"
        }
      >
        <span className={"font-bold text-4xl"}>Produk yang Anda Unggah</span>
      </div>

      {products.length > 0 ? (
        products.map((item, index) => (
          <Card
            key={index}
            className={
              "flex flex-col w-[150px] md:w-full max-w-[250px] p-5 gap-3"
            }
            onClick={() => handleCardClick(item.id)}
          >
            <div>
              <img
                className={"w-full aspect-square object-cover"}
                src={`${apiUrl}/${item.picture}`}
                alt={item.nama}
                width={500}
                height={500}
                loading={"lazy"}
              />
            </div>

            <div className={"flex flex-col"}>
              <Truncate
                lines={1}
                ellipsis={<span>...</span>}
                onTruncate={(didTruncate) => {
                  console.log(didTruncate);
                }}
              >
                <span className={"text-gray-500 font-extralight"}>
                  {item.nama}
                </span>
              </Truncate>
              <span
                className={"font-bold text-sm"}
              >{`${formatRupiah(item.harga)},-`}</span>
            </div>

            <div>
              <span className={"text-gray-500 text-sm flex items-center gap-1"}>
                <MapPin size={16} /> {item.lokasi}
              </span>
            </div>
          </Card>
        ))
      ) : (
        <div
          className={
            "flex w-full items-center justify-center h-[calc(100vh-500px)] font-bold text-xl gap-5 flex-col"
          }
        >
          <img
            src="src/assets/home/petani.png"
            alt="gambar-petani"
            className={"h-48"}
          />
          Belum ada produk tersedia!
        </div>
      )}

      <Toaster />
    </div>
  );
}
