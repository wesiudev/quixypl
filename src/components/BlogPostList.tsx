"use client";
import React, { useState } from "react";
import Link from "next/link";
import Pagination from "./pagination/Pagination";
import { polishToEnglish } from "../../utils/polishToEnglish";
import Image from "next/image";

const BlogPostList = ({ posts }: { posts: any }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Customize this value as needed

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
      <h3 className="text-primary">wszystkie posty:</h3>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {currentPosts?.map((post: any, i: number) => (
          <Link
            href={`/blog/${post.url}`}
            key={i}
            title={`Przejdź do artykułu ${post.title}`}
            className="group relative aspect-square h-max flex flex-col hover:bg-[#74B901] hover:bg-opacity-30 hover:p-1 duration-300 ease-in-out"
            style={{ boxShadow: "0px 0px 5px #000000" }}
          >
            <div className="w-full overflow-hidden flex items-start">
              <Image
                src={post.primaryImage}
                width={512}
                height={512}
                alt={`Obrazek ${post.title}`}
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            <h2
              style={{ boxShadow: "0px 0px 5px #000000" }}
              className="group-hover:bg-gray-300 bg-gray-200 duration-300 absolute bottom-3 left-3 right-3 text-base lg:text-xl mt-3 text-black font-light text-left px-3 py-1"
            >
              {post.title}
            </h2>
          </Link>
        ))}
      </div>

      {/* Render Pagination Component */}
      <Pagination
        totalItems={posts?.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogPostList;
