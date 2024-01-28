import React, { Suspense } from "react";
import Loading from "./loading";
import Page from "./page";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div>Sub Header</div>
      <Suspense fallback={<Loading />}>
        <Page />
      </Suspense>
    </section>
  );
};

export default layout;
