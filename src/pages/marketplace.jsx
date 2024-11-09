import { Card } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Phone, MapPin } from "lucide-react";

export default function Marketplace() {
  const data = [
    {
      gambar: "src/assets/temp/jualan1.png",
      nama_produk: "Bibit padi unggul kualitas super.",
      harga: "Rp300.000,-",
      nama_toko: "UD. Gabriel",
      lokasi: "Sibolga",
    },
  ];

  return (
    <div className={"flex w-full items-center p-5 gap-5 flex-wrap"}>
      {data.map((item, index) => (
        <Card
          key={index}
          className={
            "flex flex-col w-[160px] md:w-full max-w-[250px] p-5 gap-3"
          }
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

          <div>
            <span className={"text-gray-500 font-extralight block"}>
              {item.nama_produk}
            </span>
            <span className={"font-bold text-sm"}>{item.harga}</span>
          </div>

          <div>
            <Button>
              <span className={"text-xs flex gap-1"}>
                <Phone /> Chat Penjual
              </span>
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
