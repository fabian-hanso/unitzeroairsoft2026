"use client";

import BlogEntry from "./BlogEntry/BlogEntry";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function BlogOverview({ posts }: any) {
  console.log(posts);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              <span className="font-semibold text-blue">Unit Zero</span>{" "}
              Neuigkeiten
            </h2>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post: any) => (
            <BlogEntry post={post} key={post.fields.slug} />
          ))}
        </div>
      </div>
    </div>
  );
}
