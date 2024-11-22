import { Card } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Phone, MapPin, Plus } from "lucide-react";
import {dataMarketplace} from "@/data/data-marketplace.js";
import {Truncate} from "@re-dev/react-truncate";
import {useNavigate} from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";

export default function Marketplace() {
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  const handleCardClick = (id) => {
    navigate(`/marketplace/${id}`); // Gunakan navigate untuk berpindah halaman
  };

  return (
    <div className={"flex w-full items-center p-1 md:p-5 gap-3 md:gap-5 flex-wrap justify-center"}>
      <div className={"w-full min-h-[120px] border rounded-2xl p-5 text-xl flex flex-col items-start"}>
        Punya Barang yang Ingin Dijual?
        <Dialog>
          <DialogTrigger>
            <Button className={"mt-3"}> <Plus />Tambahkan Produk</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mau menambahkan apa?</DialogTitle>
              <DialogDescription>
                <div className="grid w-full items-center gap-1.5 mt-3">
                  <Label htmlFor="input-produk">Nama Produk</Label>
                  <Input type="text" id="input-produk" placeholder="Ex: Pupuk Organik"/>
                </div>

                <div className="grid w-full items-center gap-1.5 mt-3">
                  <Label htmlFor="input-foto-produk">Foto Produk</Label>
                  <Input id="input-foto-produk" type="file"/>
                </div>

                <div className="grid w-full gap-1.5 mt-3">
                  <Label htmlFor="input-deskripsi">Deskripsi Produk</Label>
                  <Textarea placeholder="Ex: Pupuk Organik merupakan pupuk yang dapat menyuburkan tanaman"
                            id="input-deskripsi"/>
                </div>

                <div className="grid w-full items-center gap-1.5 mt-3">
                  <Label htmlFor="input-harga">Harga Produk (Rp)</Label>
                  <Input min={0} type="number" id="input-harga" placeholder="Ex: 10000"/>
                </div>

                <div className="grid w-full items-center gap-1.5 mt-3">
                  <Label htmlFor="input-lokasi">Lokasi</Label>
                  <Input type="text" id="input-lokasi" placeholder="Ex: Kota Medan"/>
                </div>

                <div className="grid w-full items-center gap-1.5 mt-3">
                  <Label htmlFor="input-nomor">Nomor WhatsApp</Label>
                  <Input type="text" id="input-nomor" placeholder="Ex: 0823456789"/>
                </div>

                <Button className={"mt-3"}>Submit</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

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
              loading={'lazy'}
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
