import ForumPost from "@/components/custom/forum-post.jsx";
import CreatePost from "@/components/custom/create-post.jsx";
import { dataForYou } from "@/data/foryou-data";

export default function HomePage() {
  // Ambil data pengguna untuk komponen CreatePost
  const userData = {
    name: "Gerry", // Sesuaikan dengan nama pengguna
    avatar: "https://i.pravatar.cc/150?u=gerry",
    user_initial: "G",
  };

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {/* Komponen CreatePost di bagian atas */}
      <CreatePost data={userData} />

      {/* Postingan lainnya */}
      {dataForYou.map((item, index) => (
        <ForumPost props={item} key={index} />
      ))}
    </div>
  );
}
