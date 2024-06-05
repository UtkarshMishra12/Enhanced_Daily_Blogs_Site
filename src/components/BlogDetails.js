import React from "react";
import { NavLink } from "react-router-dom";

function BlogDetails({post}){
    return(
        <div lassName='p-4 rounded-lg shadow-xl bg-[#dfdfdf] hover:scale-[1.02] transition-all duration-300'>
            <NavLink to={`/blog/${post.id}`}>
                <span>{post.title}</span>
            </NavLink>
            <p>
                By
                <span>{post.author}</span>
                On{" "}
                <NavLink to={`/categories/${post.category.replaceAll(" ","-")}`} >
                    <span>{post.category}</span>
                </NavLink>
            </p>
            <p>Posted on {post.date}</p>
            <p>{post.content}</p>
            <div>
                {
                    post.tags.map( (tag, index) => (
                        <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}>
                            <span>{`#${tag}`}</span>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    )
}

export default BlogDetails;