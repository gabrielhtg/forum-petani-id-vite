import { Card } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { MapPin, Plus } from "lucide-react";
import { Truncate } from "@re-dev/react-truncate";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import axios from "axios";
import { apiUrl } from "@/env.js";
import { useToast } from "@/hooks/use-toast.js";
import { useEffect, useState } from "react";
import { formatRupiah } from "@/services/format-rupiah.js";
import { ProductsSkeleton } from "@/components/custom/products-skeleton.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";

export default function Marketplace() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [nama, setNama] = useState("");
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState("");
  const [harga, setHarga] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = (id) => {
    navigate(`/marketplace/${id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducts(response.data.data);

        setShowProducts(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts().then();
  }, []);

  const handleCreateProduct = async () => {
    console.log(picture);
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("picture", picture);
    formData.append("description", description);
    formData.append("harga", harga);
    formData.append("lokasi", lokasi);
    formData.append("whatsapp_number", whatsappNumber);
    formData.append("uploader_id", localStorage.getItem("username"));

    try {
      const response = await axios.post(`${apiUrl}/api/products`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast({
        title: "Success",
        description: response.data.data,
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oppps...",
        description: error.response.data.message,
      });
    }
  };

  return (
    <div
      className={
        "flex w-full items-center p-1 md:p-5 gap-3 md:gap-5 flex-wrap justify-center"
      }
    >
      <div
        className={
          "w-full min-h-[120px] border rounded-2xl py-5 px-5 xl:px-48 text-xl flex justify-between items-center bg-white  "
        }
      >
        <div className={"flex flex-col items-start"}>
          <span className={"font-bold text-4xl"}>
            Punya Barang yang Ingin Dijual?
          </span>
          <Dialog>
            <Button className={"mt-3"} asChild={true}>
              <DialogTrigger>
                <Plus />
                Tambahkan Produk
              </DialogTrigger>
            </Button>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Mau menambahkan apa?</DialogTitle>
                <DialogDescription className={"text-black!"}>
                  <div className="grid w-full items-center gap-1.5 mt-3">
                    <Label htmlFor="input-produk">Nama Produk</Label>
                    <Input
                      onChange={(e) => {
                        setNama(e.target.value);
                      }}
                      type="text"
                      id="input-produk"
                      placeholder="Ex: Pupuk Organik"
                    />
                  </div>

                  <div className="grid w-full items-center gap-1.5 mt-3">
                    <Label htmlFor="input-foto-produk">Foto Produk</Label>
                    <Input
                      onChange={(e) => {
                        setPicture(e.target.files[0]);
                      }}
                      id="input-foto-produk"
                      type="file"
                    />
                  </div>

                  <div className="grid w-full gap-1.5 mt-3">
                    <Label htmlFor="input-deskripsi">Deskripsi Produk</Label>
                    <Textarea
                      max={1000}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      placeholder="Ex: Pupuk Organik merupakan pupuk yang dapat menyuburkan tanaman"
                      id="input-deskripsi"
                    />
                  </div>

                  <div className="grid w-full items-center gap-1.5 mt-3">
                    <Label htmlFor="input-harga">Harga Produk (Rp)</Label>
                    <Input
                      onChange={(e) => {
                        setHarga(e.target.value);
                      }}
                      min={0}
                      type="number"
                      id="input-harga"
                      placeholder="Ex: 10000"
                    />
                  </div>

                  <div className="grid w-full items-center gap-1.5 mt-3">
                    <Label htmlFor="input-lokasi">Lokasi</Label>
                    <Input
                      onChange={(e) => {
                        setLokasi(e.target.value);
                      }}
                      type="text"
                      id="input-lokasi"
                      placeholder="Ex: Kota Medan"
                    />
                  </div>

                  <div className="grid w-full items-center gap-1.5 mt-3">
                    <Label htmlFor="input-nomor">Nomor WhatsApp</Label>
                    <Input
                      onChange={(e) => {
                        setWhatsappNumber(e.target.value);
                      }}
                      type="text"
                      id="input-nomor"
                      placeholder="Ex: 0823456789"
                    />
                  </div>

                  <Button className={"mt-3"} onClick={handleCreateProduct}>
                    Submit
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          {!imageLoaded && (
            <Skeleton
              className={"w-36 lg:w-52 xl:w-72 aspect-square rounded-full"}
            />
          )}

          <img
            className={"w-36 lg:w-52 xl:w-72"}
            src={"src/assets/marketplace/asset1.jpg"}
            alt={"logo"}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        </div>
      </div>

      {showProducts ? (
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
                alt={"petani"}
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
                  {" "}
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
        <>
          <ProductsSkeleton />
          <ProductsSkeleton />
          <ProductsSkeleton />
          <ProductsSkeleton />
          <ProductsSkeleton />
          <ProductsSkeleton />
          <ProductsSkeleton />
          <ProductsSkeleton />
          <ProductsSkeleton />
          <ProductsSkeleton />
          <ProductsSkeleton />
          <ProductsSkeleton />
          <ProductsSkeleton />
        </>
      )}
    </div>
  );
}
