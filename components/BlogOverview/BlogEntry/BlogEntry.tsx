/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatDate } from "@/helper/dateFormatter";

function BlogEntry({ post }: any) {
  return (
    <a
      href={"news/" + post.fields.slug}
      className="flex flex-col items-start justify-between group"
    >
      <div className="relative w-full">
        <img
          alt="Blogpost Thumbnail"
          src={post.fields.image.fields.file.url}
          className="aspect-video w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
      </div>
      <div className="max-w-xl">
        <div className="mt-4 flex items-center gap-x-4 text-xs">
          <time dateTime="" className="text-gray-500">
            {formatDate(post.sys.createdAt)}
          </time>
          <div className="relative z-10 rounded-full bg-blue px-3 py-1.5 font-medium text-white group-hover:bg-blue/80">
            {post.fields.category.fields.text}
          </div>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <div>{post.fields.headline}</div>
          </h3>
          <p className="mt-3 text-xs line-clamp-3 text-gray-600">
            {post.fields.description}
          </p>
        </div>
      </div>
    </a>
  );
}

export default BlogEntry;
