"use client";
import React, { useState } from "react";
import Link from "next/link";
import Pagination from "./pagination/Pagination";
import Image from "next/image";

const BlogPostList = ({ posts }: { posts: any }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Initially, 6 items per page

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowMore = () => {
    setItemsPerPage((prev) => prev + 6); // Load 6 more talents each time the button is clicked
  };

  const indexOfLastIdea = currentPage * itemsPerPage;
  const currentIdeas = posts?.slice(0, indexOfLastIdea);

  return (
    <div className="mt-12">
      <h3 className="text-black font-coco text-xl font-bold">Aktualności</h3>
      <div className="mt-6 grid sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4">
        {currentIdeas?.map((post: any, i: number) => (
          <Link
            href={`/news/${post.url}`}
            key={i}
            title={`Przejdź do artykułu ${post.title}`}
            className="group relative aspect-square h-max flex flex-col duration-300 ease-in-out"
          >
            <div className="w-full overflow-hidden flex items-start ">
              <Image
                style={{ boxShadow: "0px 0px 4px #077777" }}
                src={post.primaryImage}
                width={512}
                height={512}
                alt={`Obrazek ${post.title}`}
                className=" absolute inset-0 object-cover w-full h-full "
              />
            </div>
            <h2 className="bg-primary group-hover:bg-cta border-black duration-300 absolute bottom-0 left-0 right-0 text-sm mt-3 text-white font-extralight text-left p-1 font-coco">
              {post.title}
            </h2>
          </Link>
        ))}
      </div>

      {/* Render Pagination Component */}
      <Pagination
        onShowMore={handleShowMore}
        totalItems={posts?.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogPostList;
