import React from "react";

type Props = {
  params: {
    slug: string;
    id: string;
  };
};

const Page = ({ params }: Props) => {
  return <div>
    Slug: {params.slug}
    Id: {params.id}
  </div>;
};

export default Page;
