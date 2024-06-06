import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { baseUrl } from "../baseUrl";
import Header from "../components/Header";
import BlogDetails from "../components/BlogDetails";
import Spinner from "../components/Spinner";

function BlogPage(){
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    const[blog, setBlog] =  useState(null);
    const[relatedBlogs, setRelatedBlogs] = useState([]);
    const location =  useLocation();
    const navigation = useNavigate();
    const {setLoading, loading} = useContext(AppContext); 

    const blogId = location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs(){
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
        try{
            const res= await fetch(url);
            const data= await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);

        }
        catch(error){
            console.log("Error");
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    useEffect(() =>{
        if(blogId){
            fetchRelatedBlogs();
        }
    }, [location.pathname]);
    return(
        <div className='py-24 max-w-2xl mx-auto'>
           <Header/>
           <div className='max-w-[720px] px-[25px] '>
              <button className='mb-6 border-2 rounded-md border-[#dfdfdf] py-1 px-4 hover:bg-[#efefef] transition-all'
               onClick={() => navigation(-1)}
              >
                Back
              </button>
           </div>
           {
            loading ? 
            (<div>
                <div className="min-h-[80vh] w-full flex justify-center items-center">
                   <p className="text-center font-bold text-3xl">No Blogs Found !</p>
                </div>
             </div>   
            ) :
            blog ? 
            (<div className='flex flex-col gap-y-10'>
               <BlogDetails post={blog}/>
               <h2 className='text-3xl font-bold'>Related Blogs</h2>
               {
                relatedBlogs.map( (post) => (
                    <div key={post.id}>
                        <BlogDetails post={post}/>
                    </div>
                ))
               }
            </div>) 
            :
            (<div>
              <p>No Blog Found</p>
            </div>)
           }
        </div>
    )
}

export default BlogPage;