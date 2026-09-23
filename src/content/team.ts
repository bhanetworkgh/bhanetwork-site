/**
 * The "Meet the team" section on Home.
 *
 * Photos live in public/team/<slug>.<ext> and are turned into WebP at build
 * time (scripts/images.mjs); a member with no photo gets a circular monogram.
 * Names and roles appear exactly as written here, in this order.
 */

export const team = {
  heading: 'Meet the team',
  sub: 'Six builders and a founder, building in the open.',
  members: [
    { slug: 'jason-bays', name: 'Jason Bays', role: 'Founder & Principal' },
    { slug: 'destiny-arupi', name: 'Destiny Arupi', role: 'Engine Steward' },
    { slug: 'jeganathan', name: 'Jeganathan', role: 'Senior Architect' },
    { slug: 'kaiqi-yang', name: 'Kaiqi Yang', role: 'Advanced Builder, Automation' },
    { slug: 'ahad', name: 'Ahad', role: 'Advanced Builder, Customer Service Twin' },
    { slug: 'hardik-bhatt', name: 'Hardik Bhatt', role: 'AI Systems Builder, vFarm Product' },
    { slug: 'kavin-g-n', name: 'Kavin G N', role: 'Advanced Builder, vFarm Vision & IoT' },
  ],
};
