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

export default function ForumPost(props) {
  const data = props.props;
  console.log(props);
  return (
    <div
      className={
        "flex flex-col border shadow-sm max-w-2xl rounded-lg p-5 gap-5"
      }
    >
      <div id={"post-header"} className={"flex gap-3 items-center"}>
        <Avatar>
          <AvatarImage src={data.avatar} />
          <AvatarFallback>{data.user_initial}</AvatarFallback>
        </Avatar>
        <div className={"flex flex-col"}>
          <span className={"font-bold"}>{data.name}</span>
          <span className={"text-slate-500"}>{data.post_date}</span>
        </div>
      </div>

      <div id={"post-content"} className={"flex flex-col gap-2"}>
        <div>
          <p>{data.post_content}</p>
        </div>
        <img src={data.content_image} alt="post-image" />
      </div>

      <div id={"post-reaction"} className={"flex w-full justify-evenly"}>
        <Button variant={"ghost"} className={"flex-1"}>
          <ThumbsUp />
          Like
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"} className={"flex-1"}>
              <MessageCircle />
              Comment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <div className={"flex flex-col max-w-2xl gap-5"}>
              <div id={"post-header"} className={"flex gap-3 items-center"}>
                <Avatar>
                  <AvatarImage src={data.avatar} />
                  <AvatarFallback>{data.user_initial}</AvatarFallback>
                </Avatar>
                <div className={"flex flex-col"}>
                  <span className={"font-bold"}>{data.name}</span>
                  <span className={"text-slate-500"}>{data.post_date}</span>
                </div>
              </div>

              <div id={"post-content"} className={"flex flex-col gap-2"}>
                <div>
                  <p>{data.post_content}</p>
                </div>
                <img src={data.content_image} alt="post-image" />
              </div>

              <div
                id={"post-reaction"}
                className={"flex w-full justify-evenly"}
              >
                <Button variant={"ghost"} className={"flex-1"}>
                  <ThumbsUp fill="blue" />
                  Like
                </Button>

                <Button variant={"ghost"} className={"flex-1"}>
                  <MessageCircle />
                  Comment
                </Button>

                <Button variant={"ghost"} className={"flex-1"}>
                  <ExternalLink />
                  Share
                </Button>
              </div>

              <hr />

              <div className={"flex gap-3 items-center"}>
                <Avatar>
                  <AvatarImage src={data.avatar} />
                  <AvatarFallback>{data.user_initial}</AvatarFallback>
                </Avatar>
                <Input type={"text"} placeholder={"Tulis disini..."} />
                <Dialog>
                  <DialogTrigger asChild={true}>
                    <Button>
                      <SendHorizontal />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className={"text-center"}>
                        Masuk atau Buat Akun Sekarang!
                      </DialogTitle>
                      <DialogDescription>
                        <div
                          className={
                            "flex justify-center flex-col w-full items-center mt-5 gap-3"
                          }
                        >
                          <div
                            className={
                              "border w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                            }
                          >
                            <KeyRound />
                          </div>
                          <p>
                            Kamu tidak bisa melakukan aksi ini karena belum
                            masuk. Ayooo masuk sekarang juga!!
                          </p>
                          <div className={"flex w-full gap-3 mt-3"}>
                            <Button asChild={true} className={"flex-1"}>
                              <Link to={"/login"}>Login</Link>
                            </Button>

                            <Button asChild={true} className={"flex-1"}>
                              <Link to={"/register"}>Register</Link>
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

        <Button variant={"ghost"} className={"flex-1"}>
          <ExternalLink />
          Share
        </Button>
      </div>

      <hr />

      <div className={"flex gap-3 items-center"}>
        <Avatar>
          <AvatarImage src={data.avatar} />
          <AvatarFallback>{data.user_initial}</AvatarFallback>
        </Avatar>
        <Input type={"text"} placeholder={"Tulis disini..."} />
        <Dialog>
          <DialogTrigger asChild={true}>
            <Button>
              <SendHorizontal />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={"text-center"}>
                Masuk atau Buat Akun Sekarang!
              </DialogTitle>
              <DialogDescription>
                <div
                  className={
                    "flex justify-center flex-col w-full items-center mt-5 gap-3"
                  }
                >
                  <div
                    className={
                      "border w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                    }
                  >
                    <KeyRound />
                  </div>
                  <p>
                    Kamu tidak bisa melakukan aksi ini karena belum masuk. Ayooo
                    masuk sekarang juga!!
                  </p>
                  <div className={"flex w-full gap-3 mt-3"}>
                    <Button asChild={true} className={"flex-1"}>
                      <Link to={"/login"}>Login</Link>
                    </Button>

                    <Button asChild={true} className={"flex-1"}>
                      <Link to={"/register"}>Register</Link>
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
