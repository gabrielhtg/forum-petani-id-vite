import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {MessageCircle, ThumbsUp, ExternalLink, SendHorizontal} from "lucide-react";
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button.jsx";


export default function ForumPost () {
    return (
        <div className={'flex flex-col border shadow-sm max-w-2xl rounded-lg p-5 gap-5'}>
            <div id={'post-header'} className={'flex gap-3 items-center'}>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className={'flex flex-col'}>
                    <span className={'font-bold'}>Gabriel Cesar Hutagalung</span>
                    <span className={'text-slate-500'}>27 Oktober 2024</span>
                </div>
            </div>

            <div id={'post-content'} className={'flex flex-col'}>
                <div>
                    <p>
                        Hari ini saya sedang mengusir hama yang mengganggu padi saya. Disini saya menggunakan
                        Insektisida Ares 500ml. Hanya dengan 500ml, sudah cukup untuk 2 hektar lahan padi.
                    </p>
                </div>
                <img src="https://acehbesarkab.go.id/media/2022.09/61.jpeg" alt="post-image"/>
            </div>

            <div id={'post-reaction'} className={'flex w-full justify-evenly'}>
                <div className={'flex items-center gap-2'}>
                    <ThumbsUp/>
                    Like
                </div>

                <div className={'flex items-center gap-2'}>
                    <MessageCircle/>
                    Comment
                </div>

                <div className={'flex items-center gap-2'}>
                    <ExternalLink/>
                    Share
                </div>
            </div>

            <hr/>

            <div className={'flex gap-3 items-center'}>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Input type={'text'} placeholder={'Tulis disini...'}/>
                <Button>
                    <SendHorizontal />
                </Button>
            </div>
        </div>
    )
}