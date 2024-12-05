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
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { getUserInitials } from "@/services/getUserInitials.js";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState("");
  const [currentUsername] = useState(localStorage.getItem("username"));

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
        console.log(`${apiUrl}/${currentUser.foto_profil}`);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData().then();
  }, [currentUsername]);

  return (
    <div
      className={
        "flex flex-col items-center justify-center gap-3 md:gap-5 p-5 h-[calc(100vh-100px)] bg-white rounded-lg"
      }
    >
      <Avatar className={"w-24 h-24 md:w-60 md:h-60"}>
        <AvatarImage src={`${apiUrl}/${currentUser.foto_profil}`} />
        <AvatarFallback>{getUserInitials(currentUser.name)}</AvatarFallback>
      </Avatar>

      <span className={"font-bold text-xl md:text-4xl"}>
        {currentUser.name}
      </span>

      <div className={"w-[270px] md:w-auto"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className={"font-bold"}>Email</TableCell>
              <TableCell>{currentUser.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={"font-bold lg:w-32"}>Username</TableCell>
              <TableCell>{currentUser.username}</TableCell>
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
              <TableCell className={"font-bold"}>Nomor Telepon</TableCell>
              <TableCell>{currentUser.nomor_telepon}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={"font-bold"}>Pekerjaan</TableCell>
              <TableCell>{currentUser.pekerjaan}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={"font-bold"}>Bergabung Pada</TableCell>
              <TableCell>{formatProfileDate(currentUser.updated_at)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Button asChild={true}>
        <Link to={"/profile/edit"}>
          <Pencil /> Edit
        </Link>
      </Button>
    </div>
  );
}
