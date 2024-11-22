/* eslint-disable react/prop-types */
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

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat Postingan Baru</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-4">
              <textarea
                className="border rounded-lg p-3 w-full text-sm focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Tulis sesuatu di sini..."
                rows="5"
              ></textarea>
              <div className="flex justify-between items-center">
                <Button variant="outline">Tambah Gambar</Button>
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
