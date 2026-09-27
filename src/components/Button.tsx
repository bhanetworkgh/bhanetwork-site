import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'default' | 'ghost' | 'forest';

const CLASS: Record<Variant, string> = {
  primary: 'btn btn-gold',
  default: 'btn',
  ghost: 'btn btn-ghost',
  forest: 'btn btn-forest',
};

export function Button({
  variant = 'default',
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button {...rest} className={`${CLASS[variant]} ${className}`.trim()}>
      {children}
    </button>
  );
}

/** The same shape as a Button, for the places the call to action is a link. */
export function LinkButton({
  href,
  variant = 'primary',
  className = '',
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={`${CLASS[variant]} ${className}`.trim()}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
