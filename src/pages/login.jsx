import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";

export default function LoginPage() {
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
                        <Input type="text" placeholder="Username"/>
                        <Input type="password" placeholder="Password"/>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className={'flex flex-col gap-3 w-full'}>
                        <Button className={'w-full'} asChild={true}>
                            <Link to={'/'}>Masuk</Link>
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
        </div>
    )
}