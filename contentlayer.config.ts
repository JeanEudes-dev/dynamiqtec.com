import { defineDocumentType, makeSource } from "contentlayer/source-files";

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: true },
    coverImage: { type: "string", required: false }, // changed to not required
    description: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.(en|fr)\.mdx$/, ""),
    },
    language: {
      type: "string",
      resolve: (doc) => {
        const match = doc._raw.sourceFileName.match(/\.(en|fr)\.mdx$/);
        return match ? match[1] : "";
      },
    },
  },
}));

export default makeSource({ contentDirPath: "posts", documentTypes: [Post] });
