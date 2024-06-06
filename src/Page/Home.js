import React from "react";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Blogs from "../components/Blogs";

function Home(){
    return(
        <div className="py-24 px-[25px]">
          <Header/>
          <div className=' mx-auto max-w-[720px]'>
            <Blogs/>
            <Pagination/>
          </div>
        </div>
    )
}

export default Home;