/**
 * A small line-icon set, drawn inline so there is no icon font or extra
 * request. Decorative: every use sits beside text that says the same thing.
 */

const PATHS = {
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z',
  shield: 'M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Zm-3 9 2 2 4-4',
  eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Zm9.5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  sprout: 'M12 21v-9m0 0c0-3.5-2.5-6-6.5-6H4v1.5C4 11 6.5 12 9 12h3Zm0 0c0-3 2-5 5.5-5H20v1.2C20 10.5 18 12 15.5 12H12',
  users:
    'M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20m16 0v-1.5a3.5 3.5 0 0 0-2.5-3.35M15 4.2a3.5 3.5 0 0 1 0 6.6M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
  calendar: 'M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  log: 'M8 6h11M8 12h11M8 18h11M4 6h.01M4 12h.01M4 18h.01',
  leaf: 'M5 19c0-8 5-13 14-14-1 9-6 14-14 14Zm0 0 7-7',
  cube: 'M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm0 0v18M4 7.5l8 4.5 8-4.5',
  layers: 'M12 3 3 8l9 5 9-5-9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5',
  activity: 'M3 12h4l3-8 4 16 3-8h4',
  grid: 'M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-14v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  plus: 'M12 5v14M5 12h14',
  check: 'M5 12.5 10 17l9-10',
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
