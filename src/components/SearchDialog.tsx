import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { faq, type AnswerPart } from '../content/faq';
import { search } from '../content/site';
import { useLanding } from '../config/landingConfig';
import { Modal } from './Modal';
import { Icon } from './Icon';

interface Entry {
  title: string;
  text: string;
  to: string;
  kind: string;
}

const plain = (parts: AnswerPart[]) => parts.map((p) => (typeof p === 'string' ? p : p.text)).join('');

/** Every place on the site a visitor might be looking for, built from the site's own copy. */
function useIndex(): Entry[] {
  const { config } = useLanding();
  return useMemo(() => {
    const pages: Entry[] = [
      { kind: 'Page', title: 'Home', text: 'Bays Horizon Network, the engine and the farm', to: '/' },
      { kind: 'Page', title: 'vFarm', text: 'Founding Buyer Early Access, P1.0, renders, how it works', to: '/vfarm' },
      { kind: 'Section', title: 'Join Early Access', text: 'sign up early access form vfarm updates', to: '/vfarm#signup' },
      { kind: 'Section', title: 'Team', text: 'the founder and the founding builders', to: '/#team' },
      { kind: 'Section', title: 'FAQ', text: 'questions and answers', to: '/#faq' },
      { kind: 'Page', title: 'Sign in', text: 'vFarm owner account login dashboard', to: '/login' },
      { kind: 'Page', title: 'Privacy', text: 'privacy data what we collect remove my details', to: '/privacy' },
      { kind: 'Page', title: 'Terms', text: 'terms text messages sms customer care stop help', to: '/terms' },
    ];
    const home = faq.items.map((f) => ({ kind: 'Question', title: f.q, text: plain(f.a), to: '/#faq' }));
    const vfarm = (config?.faq ?? []).map((f) => ({ kind: 'vFarm question', title: f.question, text: f.answer, to: '/vfarm#faq' }));
    return [...pages, ...home, ...vfarm];
  }, [config]);
}

function rank(index: Entry[], query: string): Entry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return index.filter((e) => e.kind === 'Page' || e.kind === 'Section');
  return index
    .map((e) => {
      const title = e.title.toLowerCase();
      const text = e.text.toLowerCase();
      let score = 0;
      for (const w of words) {
        if (title.includes(w)) score += 3;
        else if (text.includes(w)) score += 1;
        else return null;
      }
      return { e, score };
    })
    .filter((r): r is { e: Entry; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.e);
}

/** The nav's search: a dialog over the site's pages, sections and questions. */
export function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null);
  /* The dialog focuses its panel on open; take the focus to the field after that. */
  useEffect(() => {
    const id = requestAnimationFrame(() => input.current?.focus());
    return () => cancelAnimationFrame(id);
  }, []);
  const index = useIndex();
  const results = rank(index, query);
  return (
    <Modal label={search.label} closeLabel={search.closeLabel} onClose={onClose} className="search-modal">
      <label className="search-field">
        <Icon name="search" size={20} />
        <span className="sr-only">{search.label}</span>
        <input
          ref={input}
          type="search"
          value={query}
          placeholder={search.placeholder}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      {results.length ? (
        <ul className="search-results">
          {results.map((r) => (
            <li key={`${r.kind}-${r.title}`}>
              <Link to={r.to} className="search-result" onClick={onClose}>
                <span className="search-kind">{r.kind}</span>
                <span className="search-title">{r.title}</span>
                <Icon name="arrowUpRight" size={16} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="search-empty">{search.empty}</p>
      )}
    </Modal>
  );
}
