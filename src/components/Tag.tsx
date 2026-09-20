/**
 * The small pill. On this site it carries one word.
 *
 * Anything in the config marked `"sample": true` renders with this beside it,
 * so placeholder data is never mistaken for a real reading.
 */
export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}

/** Shorthand for the only tag this site uses. Renders nothing when not sampled. */
export function SampleTag({ when = true }: { when?: boolean }) {
  if (!when) return null;
  return <Tag>Sample</Tag>;
}
