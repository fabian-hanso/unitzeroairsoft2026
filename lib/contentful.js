// lib/contentful.ts
import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchEntries(contentType) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}

export async function fetchMembers(contentType) {
  const entries = await client.getEntries({
    content_type: contentType,
    order: -sys.createdAt,
  });
  return entries.items;
}

export async function fetchPostBySlug(slug) {
  const entries = await client.getEntries({
    content_type: "blogpost",
    "fields.slug": slug,
    limit: 1,
  });
  return entries.items[0];
}

export async function fetchAllSlugs() {
  const entries = await client.getEntries({
    content_type: "blogpost",
    select: "fields.slug",
  });
  return entries.items.map((item) => item.fields.slug);
}
