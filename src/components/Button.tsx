import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const Button = ({ children, href, className = "", ...props }: ButtonProps) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full border-2 border-champagne bg-champagne px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-espresso shadow-soft transition hover:-translate-y-0.5 hover:bg-champagne/90 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/60 ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
