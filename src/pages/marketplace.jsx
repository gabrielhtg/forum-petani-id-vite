import { Card } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Phone, MapPin } from "lucide-react";
import {dataMarketplace} from "@/data/data-marketplace.js";
import {Truncate} from "@re-dev/react-truncate";
import {useNavigate} from "react-router-dom";

export default function Marketplace() {
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  const handleCardClick = (id) => {
    navigate(`/marketplace/${id}`); // Gunakan navigate untuk berpindah halaman
  };

  return (
    <div className={"flex w-full items-center p-1 md:p-5 gap-3 md:gap-5 flex-wrap justify-center"}>
      {dataMarketplace.map((item, index) => (
        <Card
          key={index}
          className={
            "flex flex-col w-[150px] md:w-full max-w-[250px] p-5 gap-3"
          }
          onClick={() => handleCardClick(item.id)}
        >
          <div>
            <img
              className={"w-full"}
              src={item.gambar}
              alt={"petani"}
              width={500}
              height={500}
            />
          </div>

          <div className={'flex flex-col'}>
            <Truncate
                lines={2}
                ellipsis={
                  <span>...</span>
                }
                onTruncate={(didTruncate) => {
                  console.log(didTruncate)
                }}
            >
              <span className={"text-gray-500 font-extralight"}> {item.nama_produk}</span>
            </Truncate>
            <span className={"font-bold text-sm"}>{item.harga}</span>
          </div>

          <div>
            <Button className={"text-xs flex gap-1"}>
              <Phone size={6}/> Chat <span className={"hidden md:flex"}>Penjual</span>
            </Button>
            <span
              className={"text-gray-500 text-sm flex mt-3 items-center gap-1"}
            >
              <MapPin size={16} /> {item.lokasi}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
