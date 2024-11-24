/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SendHorizontal } from "lucide-react";

export default function CreatePost({ data }) {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    setImages((prev) => [...prev, ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      id="create-post"
      className="flex flex-col gap-3 border rounded-lg p-5 shadow-sm bg-white max-w-2xl w-full"
    >
      <h3 className="font-bold text-lg">Buat Postingan Baru</h3>
      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={data.avatar} />
          <AvatarFallback>{data.user_initial}</AvatarFallback>
        </Avatar>
        <Dialog>
          <DialogTrigger asChild>
            <Input
              type="text"
              placeholder={`Apa yang Anda pikirkan, ${data.name}?`}
              className="cursor-pointer"
            />
          </DialogTrigger>

          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Buat Postingan Baru</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-4">
              {/* Input Teks */}
              <textarea
                className="border rounded-lg p-3 w-full text-sm focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Tulis sesuatu di sini..."
                rows="5"
              ></textarea>

              {/* Area Drag & Drop */}
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                <p>Drag & drop gambar di sini, atau klik untuk memilih</p>
              </div>

              {/* Area Gambar */}
              {images.length > 0 && (
                <div
                  className="grid grid-cols-3 gap-3 mt-4 p-2 border rounded-lg overflow-y-auto"
                  style={{ maxHeight: "200px" }}
                >
                  {images.map((image, index) => (
                    <div
                      key={image.preview}
                      className="relative w-full h-36 border rounded overflow-hidden group"
                    >
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full p-1 opacity-80 hover:opacity-100 focus:ring-2 focus:ring-red-300"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Tombol Posting */}
              <div className="flex justify-end items-center mt-4">
                <Button>
                  <SendHorizontal className="mr-2" />
                  Posting
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
