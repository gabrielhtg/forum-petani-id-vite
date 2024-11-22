import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {apiUrl} from "@/env.js";
import {useToast} from "@/hooks/use-toast.js";
import {ToastAction} from "@/components/ui/toast.jsx";
import {Toaster} from "@/components/ui/toaster.jsx";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [nomorTelepone, setNomorTelepone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {toast} = useToast()

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/users`, {
        email: email,
        nama: nama,
        username: username,
        password:password,
        pekerjaan: pekerjaan,
        nomorTelepon: nomorTelepone,
        confirmPassword: confirmPassword
      });

      toast({
        title: "Success",
        description: response.data.data,
        action: <ToastAction asChild altText="Ayo masuk sekarang!">
          <Link to="/login">Ayo masuk sekarang!</Link>
        </ToastAction>
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oppps...",
        description: error.response.data.data,
      })
      console.error("Login gagal:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8vh)] lg:h-screen w-full items-center justify-center p-5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex flex-col items-center justify-center">
            <img
              src="src/assets/logo/logo_tunas_nusantara.png"
              alt="logo"
              width={80}
              height={80}
            />
            ForumTaniID
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 w-full">
            <Input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email" />
            <Input onChange={(e)=>{setNama(e.target.value)}} type="text" placeholder="Nama Lengkap" />
            <Input onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="Username" />
            <Input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
            <Input onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" placeholder="Confirm Password" />
            <Input onChange={(e)=>{setPekerjaan(e.target.value)}} type="text" placeholder="Pekerjaan" />
            <Input onChange={(e)=>{setNomorTelepone(e.target.value)}} type="text" placeholder="Nomor Telepon" />

          </div>
        </CardContent>
        <CardFooter>
          <div className={"flex flex-col gap-3 w-full"}>
            <Button className={"w-full"} onClick={handleRegister}>
             Daftar
            </Button>
            <Button variant={"secondary"} className={"w-full"} asChild={true}>
              <Link to={"/login"}>Kembali ke Login</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Toaster/>
    </div>
  );
}
