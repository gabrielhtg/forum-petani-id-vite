import ForumPost from "@/components/custom/forum-post.jsx";

export default function HomePage () {
    return (
        <div className={'flex w-full flex-col items-center gap-5'}>
            <ForumPost/>
            <ForumPost/>
        </div>
    )
}