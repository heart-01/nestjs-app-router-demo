import React from "react";

type Props = {
  params: {
    slug: Array<string>;
  };
};

const Page = ({ params }: Props) => {
  return <div>
    Slug: {params.slug}
  </div>;
};

export default Page;
