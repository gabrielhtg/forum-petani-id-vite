import { useCallback, useState } from "react";
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
import { SendHorizontal, Trash2 } from "lucide-react";
import axios from "axios";
import { apiUrl } from "@/env.js";
import { getUserInitials } from "@/services/getUserInitials.js";
import { setPosts } from "@/services/postsSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast.js";

export default function CreatePost() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [caption, setCaption] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      for (const e of response.data.data) {
        const postImageResponse = await axios.get(
          `${apiUrl}/api/posts/pictures/${e.post_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        e.images = postImageResponse.data.data;
      }

      dispatch(setPosts(response.data.data));
    } catch (err) {
      console.log(err);
      // if (err.status === 401) {
      //   navigate("/login");
      // }
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Hanya file gambar yang diperbolehkan.");
        return false;
      }
      if (file.size > 3 * 1024 * 1024) {
        // 2MB
        setError("Ukuran file maksimal 2MB.");
        return false;
      }
      return true;
    });

    // Reset error jika tidak ada masalah
    if (validFiles.length > 0) {
      setError("");
      setImages((prevImages) => [...prevImages, ...validFiles]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeFile = (fileToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((file) => file.path !== fileToRemove.path),
    );
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      setError("Harap pilih setidaknya satu gambar.");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("files", image); // Nama field sesuai dengan backend
    });

    formData.append("caption", caption);
    formData.append("username", localStorage.getItem("username"));

    try {
      await axios.post(`${apiUrl}/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast({
        title: "Success",
        description: "Berhasil dipost!",
      });

      fetchPosts().then();
      setImages([]);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Gagal mengunggah file. Coba lagi.");
    }
  };

  const files = images.map((file) => {
    const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    return (
      <li
        key={file.path}
        className="flex p-3 border rounded-lg justify-between items-center"
      >
        <span>
          {file.name} - {fileSizeInMB} MB
        </span>
        <Button variant="destructive" onClick={() => removeFile(file)}>
          <Trash2 />
        </Button>
      </li>
    );
  });

  return (
    <div
      id="create-post"
      className="flex flex-col gap-3 border rounded-lg p-5 shadow-sm bg-white max-w-2xl w-full"
    >
      <h3 className="font-bold text-lg">Buat Postingan Baru</h3>
      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={`${apiUrl}/${userData.profile_pict}`} />
          <AvatarFallback>{getUserInitials(userData.name)}</AvatarFallback>
        </Avatar>
        <Dialog>
          <DialogTrigger asChild>
            <Input
              type="text"
              placeholder={`Apa yang Anda pikirkan, ${localStorage.getItem("name")}?`}
              className="cursor-pointer"
            />
          </DialogTrigger>

          <DialogContent className="sm:max-w-2xl max-h-[calc(100vh-165px)] overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Buat Postingan Baru</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-4">
              <textarea
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
                className="border rounded-lg p-3 w-full text-sm focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Tulis sesuatu di sini..."
                rows="5"
              ></textarea>

              <section className="container">
                <div
                  {...getRootProps({ className: "dropzone" })}
                  className="border-2 border-dashed p-10 flex justify-center rounded-lg"
                >
                  <input {...getInputProps()} />
                  <p>Geser gambar anda ke sini!</p>
                </div>
                {error && (
                  <p className="text-red-500 mt-2">{error}</p> // Menampilkan pesan error
                )}
                <aside className="mt-3">
                  <h4 className="font-bold">Files</h4>
                  <ul className="mt-3 flex flex-col gap-3">{files}</ul>
                </aside>
              </section>

              <div className="flex justify-end items-center mt-4">
                <Button onClick={handleUpload}>
                  <SendHorizontal className="mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
