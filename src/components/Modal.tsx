import { useEffect, useRef, type ReactNode } from 'react';
import { Icon } from './Icon';

/**
 * A modal panel. Escape or a click on the backdrop closes it; focus moves in
 * on open, stays inside while it is open, and returns to where it was on
 * close. The page behind does not scroll.
 */
export function Modal({
  label,
  closeLabel,
  onClose,
  className = '',
  children,
}: {
  label: string;
  closeLabel: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={panel}
        className={`modal ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
      >
        <button type="button" className="icon-btn modal-close" onClick={onClose}>
          <Icon name="close" size={18} />
          <span className="sr-only">{closeLabel}</span>
        </button>
        {children}
      </div>
    </div>
  );
}
