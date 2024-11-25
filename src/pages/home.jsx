import ForumPost from "@/components/custom/forum-post.jsx";
import CreatePost from "@/components/custom/create-post.jsx";
import { useEffect, useState } from "react";
import { apiUrl } from "@/env.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/posts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setPosts(response.data.data);
      } catch (err) {
        if (err.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchPosts().then();
  }, [navigate, posts]);

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {/* Komponen CreatePost di bagian atas */}
      {localStorage.getItem("username") ? <CreatePost /> : ""}

      {posts.length > 0 ? (
        posts.map((item, index) => <ForumPost props={item} key={index} />)
      ) : (
        <div
          className={
            "flex w-full items-center justify-center h-[calc(100vh-500px)] font-bold text-xl gap-5 flex-col"
          }
        >
          <img
            src="src/assets/home/petani.png"
            alt="gambar-petani"
            className={"h-48"}
          />
          Belum ada postingan tersedia!
        </div>
      )}
    </div>
  );
}
