import React, { useEffect, useState } from "react";
import BlogDetails from "../components/BlogDetails";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const { user } = useAuthContext();


  // takes all blogs from server when you open the page
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!response.ok) {
          throw new Error('Unable to fetch blog details');
        }

        const json = await response.json();
        setBlogs(json);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlogs();
  }, [user]);

  return (
    <div className="home">
      <div className="blogs">
        {blogs &&
          blogs.map((blog) => (
            <BlogDetails key={blog._id} blog={blog} user={user} />
          ))}
      </div>
    </div>
  );
};

export default Home;