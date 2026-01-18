import type { ReactNode } from "react";

const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        {children}
      </div>
    </section>
  );
};

export default Section;
