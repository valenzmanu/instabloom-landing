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
  const classes = `inline-flex items-center justify-center gap-2 rounded-full border border-champagne bg-champagne px-6 py-3 text-sm uppercase tracking-[0.2em] text-espresso transition hover:bg-champagne/90 hover:shadow-soft ${className}`;

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
