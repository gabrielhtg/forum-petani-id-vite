/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  ThumbsUp,
  ExternalLink,
  SendHorizontal,
  KeyRound,
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
import { Link } from "react-router-dom";
import { apiUrl } from "@/env.js";
import { getUserInitials } from "@/services/getUserInitials.js";
import { formatPostDate } from "@/services/formatPostDate.js";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.jsx";

export default function ForumPost(props) {
  const data = props.props;

  return (
    <div className="flex flex-col border shadow-sm max-w-2xl rounded-lg p-5 gap-5">
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
          <CarouselContent className={"flex items-center"}>
            {data.images.map((image, index) => (
              <CarouselItem key={index}>
                <img
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
        <Button variant="ghost" className="flex-1">
          <span className="flex items-center gap-1">
            <ThumbsUp /> {10}
          </span>
          <span className={"hidden md:block"}>Like</span>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="flex-1">
              <span className="flex items-center gap-1">
                <MessageCircle /> {10}
              </span>
              <span className={"hidden md:block"}>Comment</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl overflow-y-scroll max-h-[calc(100vh-90px)]">
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
                      <CarouselItem key={index} className={"flex items-center"}>
                        <img
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
                <Button variant="ghost" className="flex-1">
                  <span className="flex items-center gap-1">
                    <ThumbsUp fill="blue" /> {10}
                  </span>
                  <span className={"hidden md:block"}>Like</span>
                </Button>

                <Button variant="ghost" className="flex-1">
                  <span className="flex items-center gap-1">
                    <MessageCircle /> {10}
                  </span>
                  <span className={"hidden md:block"}>Comment</span>
                </Button>

                <Button variant="ghost" className="flex-1">
                  <ExternalLink />
                  Share
                </Button>
              </div>

              <hr />

              {/*<div className="comments-section">*/}
              {/*  {comments.map((comment, index) => (*/}
              {/*    <div*/}
              {/*      key={index}*/}
              {/*      className="flex gap-3 items-center mb-2 bg-slate-100 p-3 rounded-lg"*/}
              {/*    >*/}
              {/*      <Avatar>*/}
              {/*        <AvatarImage src="https://i.pravatar.cc/150" />*/}
              {/*        <AvatarFallback>{comment.name[0]}</AvatarFallback>*/}
              {/*      </Avatar>*/}
              {/*      <div className="comment-content">*/}
              {/*        <span className="font-bold">{comment.name}</span>*/}
              {/*        <p>{comment.content}</p>*/}
              {/*        <span className="text-slate-500">{comment.date}</span>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  ))}*/}
              {/*</div>*/}

              <div className="flex gap-3 items-center">
                <Avatar>
                  {data.foto_profil == null ? (
                    <AvatarImage src={`${apiUrl}/${data.foto_profil}`} />
                  ) : (
                    ""
                  )}
                  <AvatarFallback>{getUserInitials(data.name)}</AvatarFallback>
                </Avatar>
                <Input type="text" placeholder="Tulis disini..." />
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
        <Input type="text" placeholder="Tulis disini..." />
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
      </div>
    </div>
  );
}
