import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {apiUrl} from "@/env.js";
import {useToast} from "@/hooks/use-toast.js";
import {Toaster} from "@/components/ui/toaster.jsx";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const { toast } = useToast()

    // Fungsi handle login
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/login`, {
                username: username,
                password: password
            });

            localStorage.setItem('token', response.data.token)
            navigate("/")
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Oppps...",
                description: "Kredensial tidak tepat!",
            })
            console.error("Login gagal:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex h-[calc(100vh-8vh)] lg:h-screen w-full items-center justify-center p-5">
            <Card className={'w-full max-w-md'}>
                <CardHeader>
                    <CardTitle className={'flex flex-col items-center justify-center'}>
                        <img src={'src/assets/logo/logo_tunas_nusantara.png'} alt={'logo'} width={80} height={80}/>
                        ForumTaniID
                    </CardTitle>
                    <CardDescription className={'text-center'}>
                        Masuk sekarang untuk menggunakan ForumTaniID
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className={'flex flex-col gap-3 w-full'}>
                        <div className={'flex flex-col gap-3 w-full'}>
                            <Input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className={'flex flex-col gap-3 w-full'}>
                        <Button className={'w-full'} onClick={handleLogin}>
                            Masuk
                        </Button>
                        <Button variant={'secondary'} className={'w-full'} asChild={true}>
                            <Link to={'/register'}>Daftar</Link>
                        </Button>
                        <Button variant={'link'} className={'w-full'} asChild={true}>
                            <Link to={'/forgot-password'}>Lupa kata sandi?</Link>
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <Toaster/>
        </div>
    )
}