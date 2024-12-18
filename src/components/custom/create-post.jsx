import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KeyRound, SendHorizontal, Trash2 } from "lucide-react";
import axios from "axios";
import { apiUrl } from "@/env.js";
import { getUserInitials } from "@/services/getUserInitials.js";
import { setPosts } from "@/services/postsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast.js";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea.jsx";
import Compressor from "compressorjs";

export default function CreatePost() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [caption, setCaption] = useState("");
  // const userData = JSON.parse(localStorage.getItem("userData"));
  const userData = useSelector((state) => state.userData.value);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [postDisabled, setPostDisabled] = useState(false);

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
        setPostDisabled(true);
        return false;
      }
      // if (file.size > 3 * 1024 * 1024) {
      //   // 2MB
      //   setError("Ukuran file maksimal 2MB.");
      //   setPostDisabled(true);
      //   return false;
      // }
      return true;
    });

    if (validFiles.length > 10) {
      setError("Maksimal gambar 10");
      setPostDisabled(true);
      setImages((prevImages) => [...prevImages, ...validFiles]);
    }

    // Reset error jika tidak ada masalah
    if (validFiles.length > 0) {
      setError("");
      setPostDisabled("");
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
      setPostDisabled(true);
      return;
    }

    const formData = new FormData();

    const compressedImages = await Promise.all(
      images.map((image) => {
        return new Promise((resolve, reject) => {
          new Compressor(image, {
            quality: 0.3,
            success(res) {
              resolve(res);
            },
            error(err) {
              reject(err);
            },
          });
        });
      }),
    );

    compressedImages.forEach((compressedImage) => {
      formData.append("files", compressedImage);
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
      if (error.status === 401) {
        setOpen(true);
      }
      console.log("Error uploading file:", error);
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
      className="flex justify-center gap-3 border rounded-lg max-w-4xl p-5 shadow-sm bg-white w-full"
    >
      <div className={"flex flex-col w-full"}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                Masuk atau Buat Akun Sekarang!
              </DialogTitle>
              <DialogDescription>
                <div className="flex justify-center flex-col w-full items-center mt-5 gap-3">
                  <div className="border w-24 h-24 rounded-full flex items-center justify-center text-4xl">
                    <KeyRound />
                  </div>
                  <p>
                    Kamu tidak bisa melakukan aksi ini karena belum masuk. Ayooo
                    masuk sekarang juga!!
                  </p>
                  <div className="flex w-full gap-3 mt-3">
                    <Button asChild className="flex-1">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild className="flex-1">
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <h3 className="font-bold text-lg">Buat Postingan Baru</h3>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage
              className={"object-cover"}
              src={`${apiUrl}/${userData.foto_profil}`}
            />
            <AvatarFallback>{getUserInitials(userData.name)}</AvatarFallback>
          </Avatar>
          <Dialog>
            <DialogTrigger className={"mt-5"} asChild>
              <Textarea
                type="text"
                rows={4}
                placeholder={`Apa yang Anda pikirkan, ${localStorage.getItem("name")}?`}
                className="cursor-pointer"
              />
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[calc(100vh-165px)] overflow-y-scroll">
              <DialogHeader>
                <DialogTitle>Buat Postingan Baru</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 mt-4">
                <Textarea
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                  className="border rounded-lg p-3 w-full text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Tulis sesuatu di sini..."
                  rows="5"
                />

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
                  <Button onClick={handleUpload} disabled={postDisabled}>
                    <SendHorizontal className="mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
