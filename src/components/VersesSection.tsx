import React, { useMemo, useState } from 'react';
import { Check, Copy, Heart, RefreshCw } from 'lucide-react';
import { CURATED_VERSES, CuratedVerse } from '../data/spiritualContent';

interface VersesSectionProps {
  favoriteVerseIds: string[];
  onToggleFavoriteVerse: (id: string) => void;
}

const THEMES: ('الكل' | CuratedVerse['theme'])[] = [
  'الكل',
  'الفداء',
  'المحبة',
  'القوة',
  'السلام',
  'الرجاء',
];

export const VersesSection: React.FC<VersesSectionProps> = ({
  favoriteVerseIds,
  onToggleFavoriteVerse,
}) => {
  const [activeTheme, setActiveTheme] = useState<'الكل' | CuratedVerse['theme']>('الكل');
  const [featuredIndex, setFeaturedIndex] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredVerses = useMemo(() => {
    if (activeTheme === 'الكل') return CURATED_VERSES;
    return CURATED_VERSES.filter((v) => v.theme === activeTheme);
  }, [activeTheme]);

  const featuredVerse = CURATED_VERSES[featuredIndex % CURATED_VERSES.length];

  const handleNextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % CURATED_VERSES.length);
  };

  const handleCopy = async (verse: CuratedVerse) => {
    try {
      await navigator.clipboard.writeText(`${verse.text} (${verse.ref})`);
      setCopiedId(verse.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-[#25221c] pb-5">
        <p className="text-xs font-medium text-[#d4af37]">تأملات يومية · مختارات العهد الجديد</p>
        <h1 className="font-scripture mt-1 text-3xl font-bold text-[#f5d67b]">
          الآيات والتأملات
        </h1>
      </div>

      {/* Featured Interactive Verse Spotlight */}
      <section className="rounded-2xl border border-[#322c1f] bg-[#14120e] p-6 text-center sm:p-10">
        <p className="text-xs font-medium text-[#d4af37]">
          {featuredVerse.theme} · {featuredVerse.ref}
        </p>
        <blockquote className="font-scripture mx-auto mt-4 max-w-2xl text-2xl leading-loose text-[#ffe9a8] sm:text-3xl">
          {featuredVerse.text}
        </blockquote>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#c7c0b2]">
          {featuredVerse.reflection}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleNextFeatured}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#d4af37] px-5 py-2.5 text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-[#f5d67b] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            <span>آية جديدة</span>
          </button>

          <button
            type="button"
            onClick={() => handleCopy(featuredVerse)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#322d23] bg-[#1a1813] px-5 py-2.5 text-sm font-medium text-[#f5d67b] transition-colors hover:border-[#d4af37]/50 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copiedId === featuredVerse.id ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span>{copiedId === featuredVerse.id ? 'تم النسخ' : 'نسخ الآية'}</span>
          </button>
        </div>
      </section>

      {/* Theme Filters */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="موضوعات الآيات">
        {THEMES.map((theme) => (
          <button
            key={theme}
            type="button"
            role="tab"
            aria-selected={activeTheme === theme}
            onClick={() => setActiveTheme(theme)}
            className={`min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTheme === theme
                ? 'bg-[#d4af37] text-[#0a0a0a]'
                : 'border border-[#2b2720] bg-[#13120f] text-[#b5afa2] hover:text-[#f2ede2]'
            }`}
          >
            {theme}
          </button>
        ))}
      </div>

      {/* Verses List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredVerses.map((verse) => {
          const isFav = favoriteVerseIds.includes(verse.id);
          return (
            <article
              key={verse.id}
              className="flex flex-col justify-between rounded-2xl border border-[#25221c] bg-[#13120f] p-6"
            >
              <div>
                <p className="text-xs text-[#d4af37]">
                  {verse.theme} · {verse.ref}
                </p>
                <p className="font-scripture mt-3 text-xl leading-loose text-[#f2ede2]">
                  {verse.text}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#9e9789]">
                  {verse.reflection}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2 border-t border-[#221f19] pt-3">
                <button
                  type="button"
                  onClick={() => onToggleFavoriteVerse(verse.id)}
                  aria-label={isFav ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                  className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    isFav
                      ? 'bg-[#261f12] text-[#f5d67b]'
                      : 'text-[#9e9789] hover:bg-[#1b1914] hover:text-[#f2ede2]'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                  <span>{isFav ? 'مفضلة' : 'تفضيل'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(verse)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#9e9789] transition-colors hover:bg-[#1b1914] hover:text-[#f2ede2] cursor-pointer"
                >
                  {copiedId === verse.id ? (
                    <Check className="h-4 w-4 text-[#f5d67b]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copiedId === verse.id ? 'نُسخت' : 'نسخ'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
