/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  ThumbsUp,
  Trash2,
  ExternalLink,
  SendHorizontal,
  PencilLine,
  KeyRound,
  MoreVertical,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "@/env.js";
import { getUserInitials } from "@/services/getUserInitials.js";
import { formatPostDate } from "@/services/formatPostDate.js";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.jsx";
import axios from "axios";
import { setPosts } from "@/services/postsSlice.js";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast.js";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { useDropzone } from "react-dropzone";

export default function ForumPost(props) {
  const data = props.props;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount] = useState(data.total_comments);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isUsernameExist] = useState(localStorage.getItem("username"));
  const [error, setError] = useState("");
  const [postDisabled, setPostDisabled] = useState(false);
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Hanya file gambar yang diperbolehkan.");
        setPostDisabled(true);
        return false;
      }
      if (file.size > 3 * 1024 * 1024) {
        // 2MB
        setError("Ukuran file maksimal 2MB.");
        setPostDisabled(true);
        return false;
      }
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

  useEffect(() => {
    setLikeCount(data.total_likes);

    // Cek apakah pengguna telah like
    const userLiked = data.liked_users.includes(
      localStorage.getItem("username"),
    );
    setLiked(userLiked);
  }, [data]);

  const handleLike = async () => {
    try {
      await axios.post(
        `${apiUrl}/api/like`,
        {
          userId: localStorage.getItem("username"),
          postId: data.post_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      // Toggle status like dan jumlah like
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

      fetchPosts();
    } catch (error) {
      console.error("Error saat memberi like:", error);
      alert(
        error.response?.data?.message || "Terjadi kesalahan saat memberi like",
      );
    }
  };

  const addComment = async () => {
    try {
      await axios.post(
        `${apiUrl}/api/comment`,
        {
          user_id: localStorage.getItem("username"),
          post_id: data.post_id,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setContent("");
      fetchPosts();
      toast({
        title: "Success",
        description: "Berhasil memberikan komentar!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Success",
        description: "Berhasil dipost!",
      });
      console.error("Error saat memberi comment:", error);
      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan saat memberi comment",
      );
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${apiUrl}/api/posts/${data.post_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast({
        title: "Success",
        description: "Berhasil menghapus post!!",
      });

      fetchPosts().then();
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
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

  const removeFile = (fileToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((file) => file.path !== fileToRemove.path),
    );
  };

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
      if (err.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex flex-col border shadow-sm w-full max-w-2xl rounded-lg p-5 gap-5">
      <div id="post-header" className="flex justify-between">
        <div className={"flex gap-3 items-center"}>
          <Avatar>
            {data.foto_profil == null ? (
              <AvatarImage src={`${apiUrl}/${data.foto_profil}`} />
            ) : (
              ""
            )}
            <AvatarFallback>{getUserInitials(data.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold">{data.name}</span>
            <span className="text-slate-500">
              {formatPostDate(data.post_created_at)}
            </span>
          </div>
        </div>

        {data.username === localStorage.getItem("username") ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog>
                <DialogTrigger asChild={true}>
                  <DropdownMenuItem>
                    <PencilLine className="mr-2" size={16} />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>

                <DialogContent className="sm:max-w-2xl max-h-[calc(100vh-165px)] overflow-y-scroll">
                  <DialogHeader>
                    <DialogTitle>Buat Postingan Baru</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 mt-4">
                      <textarea
                          // onChange={(e) => {
                          //   setCaption(e.target.value);
                          // }}
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
                      <Button
                          // onClick={handleUpload}
                          disabled={postDisabled}
                      >
                        <SendHorizontal className="mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <DropdownMenuItem
                onClick={() => handleDeletePost(data.post_id)} // Fungsi untuk delete post
              >
                <span className={"text-red-600"}>
                  <Trash2 className="mr-2" size={16} />
                </span>
                <span className={"text-red-600"}>Hapus</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          ""
        )}
      </div>

      <div id="post-content" className="flex w-full flex-col gap-2">
        <div>
          <p>{data.caption}</p>
        </div>
        <Carousel>
          <CarouselContent>
            {data.images.map((image, index) => (
              <CarouselItem
                key={index}
                className={"flex items-center bg-gray-100"}
              >
                <img
                  className={"w-full"}
                  src={`${apiUrl}/${image.path}`}
                  alt={`post-image-${index}`}
                  loading="lazy"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div id="post-reaction" className="flex w-full justify-evenly">
        <Button variant="ghost" className={`flex-1`} onClick={handleLike}>
          <span className="flex items-center gap-1">
            <ThumbsUp fill={liked ? "blue" : "none"} />
            {likeCount}
          </span>
          <span className="hidden md:block">Like</span>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="flex-1">
              <span className="flex items-center gap-1">
                <MessageCircle /> {commentCount}
              </span>
              <span className={"hidden md:block"}>Comment</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[calc(100vh-90px)]">
            <div className="flex flex-col max-w-2xl gap-5">
              <div id="post-header" className="flex gap-3 items-center">
                <Avatar>
                  {data.foto_profil == null ? (
                    <AvatarImage src={`${apiUrl}/${data.foto_profil}`} />
                  ) : (
                    ""
                  )}
                  <AvatarFallback>{getUserInitials(data.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-bold">{data.name}</span>
                  <span className="text-slate-500">
                    {formatPostDate(data.post_created_at)}
                  </span>
                </div>
              </div>

              <div id="post-content" className="flex flex-col gap-2">
                <div>
                  <p>{data.caption}</p>
                </div>
                <Carousel>
                  <CarouselContent>
                    {data.images.map((image, index) => (
                      <CarouselItem
                        key={index}
                        className={"flex items-center bg-gray-100"}
                      >
                        <img
                          className={"w-full"}
                          src={`${apiUrl}/${image.path}`}
                          alt={`post-image-${index}`}
                          loading="lazy"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>

              <div id="post-reaction" className="flex w-full justify-evenly">
                <Button
                  variant="ghost"
                  className={`flex-1`}
                  onClick={handleLike}
                >
                  <span className="flex items-center gap-1">
                    <ThumbsUp fill={liked ? "blue" : "none"} />
                    {likeCount}
                  </span>
                  <span className="hidden md:block">Like</span>
                </Button>

                <Button variant="ghost" className="flex-1">
                  <span className="flex items-center gap-1">
                    <MessageCircle /> {commentCount}
                  </span>
                  <span className={"hidden md:block"}>Comment</span>
                </Button>

                <Button variant="ghost" className="flex-1">
                  <ExternalLink />
                  Share
                </Button>
              </div>

              <hr />

              {data.comments.includes('"comment_id": null') ? (
                ""
              ) : (
                <div className="comments-section">
                  {JSON.parse(data.comments).map((comment, index) => (
                    <div
                      key={index}
                      className="flex gap-3 items-center mb-2 bg-slate-100 p-3 rounded-lg"
                    >
                      <Avatar>
                        <AvatarImage src={`${apiUrl}/${data.foto_profil}`} />
                        <AvatarFallback>
                          {getUserInitials(comment.commenter_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="comment-content">
                        <span className="font-bold">
                          {comment.commenter_name}
                        </span>
                        <p>{comment.comment_text}</p>
                        <span className="text-slate-500">
                          {formatPostDate(comment.comment_created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 items-center">
                <Avatar>
                  {data.foto_profil == null ? (
                    <AvatarImage src={`${apiUrl}/${data.foto_profil}`} />
                  ) : (
                    ""
                  )}
                  <AvatarFallback>{getUserInitials(data.name)}</AvatarFallback>
                </Avatar>
                <Input
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  type="text"
                  placeholder="Tulis disini..."
                />
                {isUsernameExist ? (
                  <Button onClick={addComment}>
                    <SendHorizontal />
                  </Button>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <SendHorizontal />
                      </Button>
                    </DialogTrigger>
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
                              Kamu tidak bisa melakukan aksi ini karena belum
                              masuk. Ayooo masuk sekarang juga!!
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
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" className="flex-1">
          <ExternalLink />
          <span className={"hidden md:block"}>Share</span>
        </Button>
      </div>

      <hr />

      <div className="flex gap-3 items-center">
        <Avatar>
          {data.foto_profil == null ? (
            <AvatarImage src={`${apiUrl}/${data.foto_profil}`} />
          ) : (
            ""
          )}
          <AvatarFallback>{getUserInitials(data.name)}</AvatarFallback>
        </Avatar>
        <Input
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          type="text"
          placeholder="Tulis disini..."
        />
        {isUsernameExist ? (
          <Button onClick={addComment}>
            <SendHorizontal />
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <SendHorizontal />
              </Button>
            </DialogTrigger>
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
                      Kamu tidak bisa melakukan aksi ini karena belum masuk.
                      Ayooo masuk sekarang juga!!
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
        )}
      </div>
    </div>
  );
}
