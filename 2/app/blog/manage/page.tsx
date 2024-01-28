import React from "react";
import { headers } from "next/headers";
import { IBlogModel } from "../IBlogModel";
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
        <Link href={`/blog/manage/edit/${blog.id}`}>Go to edit Blog</Link>
      </div>
    </div>
  ));
};

const Page = async ({}: Props) => {
  const headerRequest = headers();
  const user = headerRequest.get("user") ? JSON.parse(headerRequest.get("user")!) : null;
  const blogList: IBlogModel[] = await getBlogs();

  return (
    <>
      <div>Manage Blog</div>
      <div>{user.email}</div>
      <RenderBlog blogs={blogList} />
    </>
  );
};

export default Page;
