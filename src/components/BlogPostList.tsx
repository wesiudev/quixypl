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
    <div className="mt-12">
      <h3 className="text-black font-coco text-xl font-bold">
        Interesujesz się pracą zdalną, biznesem lub AI? Sprawdź naszego bloga!
      </h3>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4">
        {currentPosts?.map((post: any, i: number) => (
          <Link
            href={`/blog/${post.url}`}
            key={i}
            title={`Przejdź do artykułu ${post.title}`}
            className="rounded-lg group relative aspect-square h-max flex flex-col duration-300 ease-in-out"
          >
            <div className="w-full overflow-hidden flex items-start rounded-lg">
              <Image
                src={post.primaryImage}
                width={512}
                height={512}
                alt={`Obrazek ${post.title}`}
                className="absolute inset-0 object-cover w-full h-full rounded-lg"
              />
            </div>
            <h2 className="rounded-lg hover:shadow-sm group-hover:shadow-primary group-hover:scale-x-105 group-hover:bg-primary/100 bg-black/50 duration-300 absolute bottom-3 left-3 right-3 text-sm mt-3 text-white font-light text-left px-3 py-1 font-coco">
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
