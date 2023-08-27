import { useEffect, useState } from "react";
import NavScroller from "../HomeComponents/NavScroller";
import FeaturedPost from "../Posts/Posts";
import SpecialPost from "../Posts/SpecialPost";
import DisplayPost from "../HomeComponents/DisplayPost";
import ContainerForRecent from "../HomeComponents/ContainerForRecent";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/CreatePost").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      <NavScroller />
      <main className="container">
        <SpecialPost />
        <div className="row mb-2">
          {posts.length > 0 &&
            posts.map((post) => (
              <FeaturedPost
                key={post.id} // Replace 'id' with the actual unique identifier of the post
                title={post.title}
                description={post.description}
                cover={post.cover}
                time={post.time}
                author={post.author}
                genre={post.genre}
                _id={post._id}
              />
            ))}{" "}
        </div>
        <div className="row g-5">
          <DisplayPost />
          <ContainerForRecent />
        </div>
      </main>
    </>
  );
}
