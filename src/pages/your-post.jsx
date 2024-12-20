import ForumPost from "@/components/custom/forum-post.jsx";
import { useEffect, useState } from "react";
import { apiUrl } from "@/env.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/services/postsSlice.js";

export default function YourPost() {
  const navigate = useNavigate();
  const postsData = useSelector((state) => state.posts.value);
  const dispatch = useDispatch();
  const [username] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/posts/all/byMe/${username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        for (const e of response.data.data) {
          const postImageResponse = await axios.get(
            `${apiUrl}/api/posts/pictures/${e.post_id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );

          e.images = postImageResponse.data.data;
        }

        dispatch(setPosts(response.data.data));
      } catch (err) {
        if (err.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchPosts().then();
  }, [dispatch, navigate, username]);

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {/*{loginData ? <CreatePost /> : ""}*/}

      {postsData.length > 0 ? (
        postsData.map((item, index) => <ForumPost props={item} key={index} />)
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
