import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div>Sub Header</div>
      {children}
    </section>
  );
};

export default layout;
