import BlogOverview from "@/components/BlogOverview/BlogOverview";
import { fetchEntries } from "@/lib/contentful";

export default async function Home() {
  const posts = await fetchEntries("blogpost");

  return (
    <div className="bg-gray-50">
      <BlogOverview posts={posts} />
    </div>
  );
}
