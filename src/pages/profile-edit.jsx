import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@/env.js";
import { formatProfileDate } from "@/services/formatProfileDate.js";
import { Input } from "@/components/ui/input.jsx";
import { Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getUserInitials } from "@/services/getUserInitials.js";

export default function EditProfilePage() {
  const [currentUser, setCurrentUser] = useState("");
  const [currentUsername] = useState(localStorage.getItem("username"));
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [nama, setNama] = useState("");
  const [profilePict, setProfilePict] = useState(null);
  const [linkGambar, setLinkGambar] = useState("https://github.com/shadcn.png");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/users/${currentUsername}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        setCurrentUser(response.data.data[0]);
        setUsername(currentUser.username);
        setEmail(currentUser.email);
        setNomorTelepon(currentUser.nomor_telepon);
        setPekerjaan(currentUser.pekerjaan);
        setNama(currentUser.name);
        setProfilePict(currentUser.foto_profil);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData().then();
  }, [
    currentUser.email,
    currentUser.name,
    currentUser.nomor_telepon,
    currentUser.pekerjaan,
    currentUser.total_jawaban,
    currentUser.total_post,
    currentUser.username,
    currentUsername,
  ]);

  const changeImage = () => {
    const file = event.target.files[0];
    if (file) {
      setProfilePict(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className={
        "flex flex-col items-center justify-center gap-5 p-5 h-[calc(100vh-100px)] min-h-[calc(100vh-100px)] bg-white rounded-lg"
      }
    >
      <Avatar className={"w-24 h-24 md:w-60 md:h-60"}>
        <AvatarImage src={profilePict} />
        <AvatarFallback>{getUserInitials(nama)}</AvatarFallback>
      </Avatar>

      <div className={"flex flex-col w-full max-w-lg"}>
        <Input className={"w-full"} onChange={changeImage} type={"file"} />
        <span className={"text-xs ms-2 text-yellow-600"}>
          *Direkomendasikan untuk menggunakan gambar dengan ukuran 1:1 dan &lt;=
          2MB.
        </span>
      </div>

      {/*<div className={"flex flex-col text-center gap-3"}>*/}
      {/*  <span className={"font-bold text-4xl"}>Gabriel Cesar Hutagalung</span>*/}
      {/*  <span className={"text-2xl"}>{currentUser.pekerjaan}</span>*/}
      {/*</div>*/}

      <div className={"max-w-xl w-full"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className={"font-bold"}>Email</TableCell>
              <TableCell>
                <Input value={email} type={"email"} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={"font-bold"}>Nama</TableCell>
              <TableCell>
                <Input value={nama} type={"type"} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={"font-bold lg:w-32"}>Username</TableCell>
              <TableCell>
                <Input value={username} type={"text"} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={"font-bold"}>Nomor Telepon</TableCell>
              <TableCell>
                <Input value={nomorTelepon} type={"type"} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={"font-bold"}>Pekerjaan</TableCell>
              <TableCell>
                <Input value={pekerjaan} type={"type"} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={"font-bold"}>Total Post</TableCell>
              <TableCell>{currentUser.total_post}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={"font-bold"}>
                Total Jawaban / Comment
              </TableCell>
              <TableCell>{currentUser.total_jawaban}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={"font-bold"}>Bergabung Pada</TableCell>
              <TableCell>{formatProfileDate(currentUser.updated_at)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className={"flex gap-3"}>
        <Button>
          <Save /> Save
        </Button>
        <Button variant={"secondary"} asChild={true}>
          <Link to={"/profile"}>
            <ArrowLeft /> Back
          </Link>
        </Button>
      </div>
    </div>
  );
}
