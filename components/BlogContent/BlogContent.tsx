/* eslint-disable @typescript-eslint/no-explicit-any */
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

export const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => (
      <strong className="font-semibold text-gray">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: any) => <em className="italic">{text}</em>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-3xl font-semibold mt-6 mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3 text-blue">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-4 leading-relaxed text-gray-800">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="pl-4">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
      <li className="list-disc text-gray">{children}</li>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal list-inside pl-4 space-y-2">{children}</ol>
    ),
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-2 border-gray pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a
        href={node.data.uri}
        className="text-blue hover:text-blue/80 font-semibold"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, description, title } = node.data.target.fields;
      const url = file.url.startsWith("//") ? `https:${file.url}` : file.url;
      const width = file.details.image?.width || 800;
      const height = file.details.image?.height || 600;

      return (
        <div className="my-8">
          <Image
            src={url}
            width={width}
            height={height}
            alt={description || title || "Bild"}
          />
          {description && (
            <p className="text-sm text-gray-500 mt-2 text-center italic">
              {description}
            </p>
          )}
        </div>
      );
    },
  },
};

export default function BlogContent({ content }: any) {
  return (
    <div className="px-6 pt-10 pb-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        {documentToReactComponents(content, richTextOptions)}
      </div>
    </div>
  );
}
