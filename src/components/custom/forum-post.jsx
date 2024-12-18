/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  ThumbsUp,
  Trash2,
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast.js";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";

export default function ForumPost(props) {
  const data = props.props;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(data.total_comments);
  const [comment, setComment] = useState(JSON.parse(data.comments));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isUsernameExist] = useState(localStorage.getItem("username"));
  const [postDisabled] = useState(false);
  const [editCaption, setEditCaption] = useState(data.caption);
  const isLogin = useSelector((state) => state.userData.value.username);
  const userData = useSelector((state) => state.userData.value);

  useEffect(() => {
    setLikeCount(data.total_likes);
    setCommentCount(data.total_comments);

    const username = localStorage.getItem("username");

    if (username) {
      const userLiked = data.liked_users.includes(username);
      setLiked(userLiked);
    }
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
      console.log(error);
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

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/posts/${data.post_id}`,
        {
          caption: editCaption,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col border shadow-sm w-full max-w-2xl rounded-lg p-5 gap-5 bg-white">
      <div id="post-header" className="flex justify-between">
        <div className={"flex gap-3 items-center"}>
          <Avatar>
            <AvatarImage
              className={"object-cover"}
              src={`${apiUrl}/${data.foto_profil}`}
            />
            <AvatarFallback>{getUserInitials(data.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link to={`profile/${data.username}`}>
              <span className="font-bold">{data.name}</span>
            </Link>
            <span className="text-slate-500">
              {formatPostDate(data.post_created_at)}
            </span>
          </div>
        </div>

        {data.username === isLogin ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild={true}>
                <Dialog>
                  <DialogTrigger className={"w-full"}>
                    <Button
                      variant={"ghost"}
                      className={"w-full justify-start px-2"}
                    >
                      <PencilLine className="mr-2" size={16} />
                      Edit
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-2xl max-h-[calc(100vh-165px)] overflow-y-scroll">
                    <DialogHeader>
                      <DialogTitle>Buat Postingan Baru</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 mt-4">
                      <textarea
                        onChange={(e) => {
                          setEditCaption(e.target.value);
                        }}
                        className="border rounded-lg p-3 w-full text-sm focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Tulis sesuatu di sini..."
                        rows="5"
                      >
                        {editCaption}
                      </textarea>

                      <div className="flex justify-end items-center mt-4">
                        <Button onClick={handleUpdate} disabled={postDisabled}>
                          <SendHorizontal className="mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>

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
        {isUsernameExist ? (
          <Button variant="ghost" className={`flex-1`} onClick={handleLike}>
            <span className="flex items-center gap-1">
              <ThumbsUp fill={liked === true ? "blue" : "none"} />
              {likeCount}
            </span>
            <span className="hidden md:block">Like</span>
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className={`flex-1`} onClick={handleLike}>
                <span className="flex items-center gap-1">
                  <ThumbsUp fill={liked === true ? "blue" : "none"} />
                  {likeCount}
                </span>
                <span className="hidden md:block">Like</span>
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
                    <AvatarImage
                      className={"object-cover"}
                      src={`${apiUrl}/${data.foto_profil}`}
                    />
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
                {isUsernameExist ? (
                  <Button
                    variant="ghost"
                    className={`flex-1`}
                    onClick={handleLike}
                  >
                    <span className="flex items-center gap-1">
                      <ThumbsUp fill={liked === true ? "blue" : "none"} />
                      {likeCount}
                    </span>
                    <span className="hidden md:block">Like</span>
                  </Button>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`flex-1`}
                        onClick={handleLike}
                      >
                        <span className="flex items-center gap-1">
                          <ThumbsUp fill={liked === true ? "blue" : "none"} />
                          {likeCount}
                        </span>
                        <span className="hidden md:block">Like</span>
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

                <Button variant="ghost" className="flex-1">
                  <span className="flex items-center gap-1">
                    <MessageCircle /> {commentCount}
                  </span>
                  <span className={"hidden md:block"}>Comment</span>
                </Button>

                {/*<Button variant="ghost" className="flex-1">*/}
                {/*  <ExternalLink />*/}
                {/*  Share*/}
                {/*</Button>*/}
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
                        <AvatarImage
                          className={"object-cover"}
                          src={`${apiUrl}/${comment.commenter_foto_profil}`}
                        />
                        <AvatarFallback>
                          {getUserInitials(comment.commenter_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="comment-content">
                        <Link to={`/profile/${comment.commenter_username}`}>
                          <span className="font-bold">
                            {comment.commenter_name}
                          </span>
                        </Link>
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
                  <AvatarImage
                    className={"object-cover"}
                    src={`${apiUrl}/${userData.foto_profil}`}
                  />
                  <AvatarFallback>
                    {getUserInitials(userData.name)}
                  </AvatarFallback>
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

        {/*<Button variant="ghost" className="flex-1">*/}
        {/*  <ExternalLink />*/}
        {/*  <span className={"hidden md:block"}>Share</span>*/}
        {/*</Button>*/}
      </div>

      <hr />

      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage
            className={"object-cover"}
            src={`${apiUrl}/${userData.foto_profil}`}
          />
          <AvatarFallback>{getUserInitials(userData.name)}</AvatarFallback>
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
