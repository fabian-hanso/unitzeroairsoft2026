/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchPostBySlug } from "@/lib/contentful";
import { notFound } from "next/navigation";
import BlogContent from "@/components/BlogContent/BlogContent";
import { formatDate } from "@/helper/dateFormatter";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogDetailPage({ params }: any) {
  const { slug }: any = params;
  const post = await fetchPostBySlug(slug);
  if (!post) return notFound();

  const { headline, content, image, category }: any = post.fields;
  const { createdAt }: any = post.sys;

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto lg:px-8">
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700 pb-20 px-6 lg:px-0">
          <p className="text-base/7 font-semibold text-blue text-center">
            {category.fields.text}
          </p>
          <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-center">
            {headline}
          </h1>
          <p className="text-center mt-2">{formatDate(createdAt)}</p>
        </div>
        <div className="w-full lg:h-[600px] overflow-hidden">
          <img
            src={image.fields.file.url}
            className="w-full h-full object-cover object-center"
            alt="News image"
          />
        </div>
        <BlogContent content={content} />
      </div>
    </div>
  );
}
