import ForumPost from "@/components/custom/forum-post.jsx";
import { dataForYou } from "@/data/foryou-data";
export default function HomePage() {
  return (
    <div className={"flex w-full flex-col items-center gap-5"}>
      {dataForYou.map((item, index) => (
        <ForumPost props={item} key={index} />
      ))}
    </div>
  );
}