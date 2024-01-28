import React from "react";
import { IBlogModel } from "./IBlogModel";
import Link from "next/link";

type Props = {};

type RenderProductsProps = {
  blogs: IBlogModel[];
};

const getBlogs = async (): Promise<IBlogModel[]> => {
  const response = await fetch("https://65b5302a41db5efd2867677c.mockapi.io/api/v1/blogs");
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

const RenderBlog: React.FC<RenderProductsProps> = ({ blogs }) => {
  return blogs.map((blog) => (
    <div key={blog.id}>
      <div>
        <span style={{ fontWeight: "bold", marginRight: "15px" }}>{blog.name}</span>
        <Link href={`/blog/${blog.id}`}>Go to read Blog</Link>
      </div>
    </div>
  ));
};

const Page = async ({}: Props) => {
  const blogList: IBlogModel[] = await getBlogs();

  return (
    <div>
      Blog List:
      <RenderBlog blogs={blogList} />
    </div>
  );
};

export default Page;
