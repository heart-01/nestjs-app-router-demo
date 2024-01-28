"use client";

import { IBlogModel } from "@/app/blog/IBlogModel";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    slug: string;
  };
};

const getBlogById = async (slug: string): Promise<IBlogModel> => {
  const response = await fetch(`https://65b5302a41db5efd2867677c.mockapi.io/api/v1/blogs/${slug}`);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

const Page = ({ params }: Props) => {
  const [blogState, setBlogState] = useState<IBlogModel>({
    id: "",
    name: "",
    description: "",
    createdAt: "",
  });

  const initBlogById = async (slug: string) => {
    try {
      const blogRes: IBlogModel = await getBlogById(slug);
      setBlogState(blogRes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initBlogById(params.slug);
  }, [params.slug]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBlogState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Submitted", blogState);
    try {
      const response = await fetch(`https://65b5302a41db5efd2867677c.mockapi.io/api/v1/blogs/${blogState.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogState),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const blogRes: IBlogModel = await response.json();
      console.log("Form submitted successfully", blogRes);
      setBlogState(blogRes);
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      ID: {blogState.id}
      <div>
        <label htmlFor="name">Blog name:</label>
        <input type="text" name="name" defaultValue={blogState.name} onChange={handleOnChange} />
      </div>
      <div>
        <label htmlFor="description">Blog Description:</label>
        <input type="text" name="description" defaultValue={blogState.description} onChange={handleOnChange} />
      </div>
      <button type="submit">Save blog</button>
    </form>
  );
};

export default Page;
