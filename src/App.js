import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom";
import Home from "./Page/Home";
import BlogPage from "./Page/BlogPage";
import CategoryPage from "./Page/CategoryPage";
import TagPage from "./Page/TagPage";

export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams, setSearchParams ]= useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;

    if(location.pathname.includes("tags")){
      //Then we need to show the Tags Page
      const tag= location.pathname.split("/").at(-1).replace("-"," ");
      fetchBlogPosts(Number(page),tag);
    }
    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replace("-"," ");
      fetchBlogPosts(Number(page), null, category);
    }
    else{
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blog/:blogId" element={<BlogPage/>}/>
        <Route path="/tags/:tag" element={<TagPage/>}/>
        <Route path="/categories/:category" element={<CategoryPage/>}/>
      </Routes>
    </>
  );
}
