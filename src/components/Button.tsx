interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  textOnly?: boolean;
  className?: string;
}

export default function Button({
  children,
  textOnly,
  className,
  ...props
}: ButtonProps) {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
