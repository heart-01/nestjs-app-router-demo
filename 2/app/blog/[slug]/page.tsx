import React from "react";
import { IBlogModel } from "../IBlogModel";

type Props = {
  params: {
    slug: string;
  };
};

const getBlogById = async (slug: string): Promise<IBlogModel> => {
  const response = await fetch(`https://65b5302a41db5efd2867677c.mockapi.io/api/v1/blogs/${slug}`);
  if (!response.ok) {
    console.log("Something went wrong");
  }
  return response.json();
};

const RenderBlog: React.FC<IBlogModel> = (blog) => {
  return (
    <div key={blog.id}>
      <div>
        ID: {blog.id}
        <div>Blog Name: {blog.name}</div>
        <div>Blog Description: {blog.description}</div>
      </div>
    </div>
  );
};

const Page = async ({ params }: Props) => {
  const blog = await getBlogById(params.slug);
  return <RenderBlog {...blog} />;
};

export default Page;
