import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Search,
} from 'lucide-react';
import {
  BibleBook,
  BookCategory,
  CATEGORY_LABELS,
  getChapterContent,
  getFullTextChaptersForBook,
  NT_BOOKS,
} from '../data/newTestament';

interface BibleSectionProps {
  selectedBookId: string;
  selectedChapter: number | null;
  onSelectBook: (bookId: string) => void;
  onSelectChapter: (bookId: string, chapter: number | null) => void;
  actsOnlyMode?: boolean;
  bookmarks: string[];
  onToggleBookmark: (key: string) => void;
}

type FontScale = 'sm' | 'md' | 'lg';

export const BibleSection: React.FC<BibleSectionProps> = ({
  selectedBookId,
  selectedChapter,
  onSelectBook,
  onSelectChapter,
  actsOnlyMode = false,
  bookmarks,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | BookCategory>('all');
  const [fontScale, setFontScale] = useState<FontScale>('md');
  const [copied, setCopied] = useState(false);

  const activeBook: BibleBook = useMemo(() => {
    if (actsOnlyMode) {
      return NT_BOOKS.find((b) => b.id === 'acts') ?? NT_BOOKS[0];
    }
    return NT_BOOKS.find((b) => b.id === selectedBookId) ?? NT_BOOKS[0];
  }, [actsOnlyMode, selectedBookId]);

  const filteredBooks = useMemo(() => {
    return NT_BOOKS.filter((book) => {
      const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        book.name.includes(searchQuery.trim()) ||
        book.author.includes(searchQuery.trim());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  const fullTextChapters = useMemo(
    () => getFullTextChaptersForBook(activeBook.name),
    [activeBook.name]
  );

  const currentChapterNumber = selectedChapter ?? 1;
  const chapterContent = useMemo(
    () => getChapterContent(activeBook, currentChapterNumber),
    [activeBook, currentChapterNumber]
  );

  const bookmarkKey = `${activeBook.id}:${currentChapterNumber}`;
  const isBookmarked = bookmarks.includes(bookmarkKey);

  const handleCopyChapter = async () => {
    const text = `${chapterContent.title}\n\n${chapterContent.verses.join('\n')}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const fontSizeClass =
    fontScale === 'sm'
      ? 'text-base leading-loose'
      : fontScale === 'lg'
        ? 'text-xl sm:text-2xl leading-[2.2]'
        : 'text-lg sm:text-xl leading-[2.05]';

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#25221c] pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium text-[#d4af37]">
            {actsOnlyMode
              ? 'سفر التاريخ الكنسي · ٢٨ إصحاحاً · كتبه لوقا البشير'
              : 'العهد الجديد · ٢٧ سفراً · متاح بدون إنترنت'}
          </p>
          <h1 className="font-scripture mt-1 text-3xl font-bold text-[#f5d67b]">
            {actsOnlyMode ? 'سفر أعمال الرسل' : 'الكتاب المقدس — العهد الجديد'}
          </h1>
        </div>

        {selectedChapter !== null && !actsOnlyMode && (
          <button
            type="button"
            onClick={() => onSelectChapter(activeBook.id, null)}
            className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-xl border border-[#322d23] bg-[#141310] px-4 py-2 text-xs font-medium text-[#f5d67b] hover:border-[#d4af37]/50 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
            <span>العودة لاختيار الإصحاح</span>
          </button>
        )}
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Books List Column (hidden in Acts-only mode) */}
        {!actsOnlyMode && (
          <aside className="space-y-4 lg:col-span-4">
            <div className="rounded-2xl border border-[#25221c] bg-[#13120f] p-4">
              <label htmlFor="search-books" className="sr-only">
                ابحث في الأسفار
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#8e887b]" />
                <input
                  id="search-books"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث باسم السفر..."
                  className="min-h-[44px] w-full rounded-xl border border-[#2b2720] bg-[#0c0b09] pr-10 pl-3 text-sm text-[#f2ede2] placeholder-[#787166] focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5" role="tablist" aria-label="تصنيف الأسفار">
                {(Object.keys(CATEGORY_LABELS) as ('all' | BookCategory)[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={categoryFilter === cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      categoryFilter === cat
                        ? 'bg-[#d4af37] text-[#0a0a0a] font-semibold'
                        : 'bg-[#1a1814] text-[#b5afa2] hover:text-[#f2ede2]'
                    }`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-[480px] space-y-2 overflow-y-auto pl-1">
              {filteredBooks.length === 0 ? (
                <div className="rounded-2xl border border-[#25221c] bg-[#13120f] p-6 text-center text-sm text-[#9e9789]">
                  لا توجد أسفار مطابقة لبحثك.
                </div>
              ) : (
                filteredBooks.map((book) => {
                  const isSelected = book.id === activeBook.id;
                  const bookFullCount = getFullTextChaptersForBook(book.name).length;
                  return (
                    <button
                      key={book.id}
                      type="button"
                      onClick={() => {
                        onSelectBook(book.id);
                        onSelectChapter(book.id, null);
                      }}
                      className={`flex min-h-[56px] w-full items-center justify-between rounded-xl border px-4 py-3 text-right transition-colors duration-150 cursor-pointer ${
                        isSelected
                          ? 'border-[#d4af37]/60 bg-[#1c1912] text-[#f5d67b]'
                          : 'border-[#25221c] bg-[#13120f] text-[#f2ede2] hover:border-[#3b3529]'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold">{book.name}</p>
                        <p className="mt-0.5 text-xs text-[#8e887b]">
                          {book.categoryLabel}
                          {bookFullCount > 0 ? ` · ${bookFullCount} نص كامل` : ''}
                        </p>
                      </div>
                      <span className="text-xs text-[#b5afa2] tabular-nums">
                        {book.chapters} إصحاح
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </aside>
        )}

        {/* Chapters & Reading Pane */}
        <div className={actsOnlyMode ? 'lg:col-span-12' : 'lg:col-span-8'}>
          {selectedChapter === null ? (
            <div className="rounded-2xl border border-[#25221c] bg-[#13120f] p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-[#d4af37]">
                    {activeBook.categoryLabel} · {activeBook.author}
                  </p>
                  <h2 className="font-scripture mt-1 text-2xl font-bold text-[#f5d67b] sm:text-3xl">
                    سفر {activeBook.name}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#c7c0b2]">
                    {activeBook.theme}
                  </p>
                </div>
                <p className="text-xs text-[#9e9789] tabular-nums">
                  {activeBook.chapters} إصحاحاً
                </p>
              </div>

              <div className="my-5 border-t border-[#24211b]" />

              <div className="rounded-xl bg-[#0e0d0b] p-4">
                <p className="font-scripture text-lg leading-relaxed text-[#ffe9a8]">
                  {activeBook.keyVerse}
                </p>
                <p className="mt-1 text-xs text-[#d4af37]">{activeBook.keyVerseRef}</p>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#f2ede2]">اختر الإصحاح للقراءة</h3>
                  {fullTextChapters.length > 0 && (
                    <p className="text-xs text-[#9e9789]">
                      الإصحاحات المميزة باللون الذهبي متوفرة بالنص الكتابي الكامل أوفلاين
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-9">
                  {Array.from({ length: activeBook.chapters }, (_, i) => i + 1).map((ch) => {
                    const hasFull = fullTextChapters.includes(ch);
                    const isMarked = bookmarks.includes(`${activeBook.id}:${ch}`);
                    return (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => onSelectChapter(activeBook.id, ch)}
                        className={`relative flex min-h-[44px] items-center justify-center rounded-xl border text-sm font-semibold tabular-nums transition-colors duration-150 cursor-pointer ${
                          hasFull
                            ? 'border-[#d4af37]/50 bg-[#1f1a10] text-[#f5d67b] hover:bg-[#d4af37] hover:text-[#0a0a0a]'
                            : 'border-[#29251d] bg-[#181612] text-[#d7d0c1] hover:border-[#443d30] hover:text-[#f5d67b]'
                        }`}
                      >
                        {ch}
                        {isMarked && (
                          <span
                            aria-label="محفوظ في المفضلة"
                            className="absolute top-1 left-1 h-1.5 w-1.5 rounded-full bg-[#f5d67b]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <article className="rounded-2xl border border-[#25221c] bg-[#13120f] p-6 sm:p-8">
              {/* Reading Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#24211b] pb-4">
                <div>
                  <p className="text-xs text-[#d4af37]">
                    {chapterContent.isFullText
                      ? 'النص الكتابي الكامل · متاح أوفلاين'
                      : 'ملخص الإصحاح والمحور الروحي'}
                  </p>
                  <h2 className="font-scripture mt-1 text-2xl font-bold text-[#f5d67b]">
                    {chapterContent.title}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Font Size Controls */}
                  <div className="flex items-center rounded-lg border border-[#2b2720] bg-[#0e0d0b] p-0.5">
                    {(['sm', 'md', 'lg'] as FontScale[]).map((size, idx) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setFontScale(size)}
                        aria-label={`حجم الخط ${idx === 0 ? 'صغير' : idx === 1 ? 'متوسط' : 'كبير'}`}
                        className={`min-h-[36px] min-w-[36px] rounded-md px-2 text-xs font-medium transition-colors cursor-pointer ${
                          fontScale === size
                            ? 'bg-[#d4af37] text-[#0a0a0a] font-bold'
                            : 'text-[#b5afa2] hover:text-[#f2ede2]'
                        }`}
                      >
                        {idx === 0 ? 'أ-' : idx === 1 ? 'أ' : 'أ+'}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleBookmark(bookmarkKey)}
                    aria-label={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ الإصحاح'}
                    className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isBookmarked
                        ? 'border-[#d4af37]/60 bg-[#231d10] text-[#f5d67b]'
                        : 'border-[#2b2720] bg-[#181612] text-[#c7c0b2] hover:text-[#f2ede2]'
                    }`}
                  >
                    <Bookmark className="h-4 w-4" />
                    <span>{isBookmarked ? 'محفوظ' : 'حفظ'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyChapter}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#2b2720] bg-[#181612] px-3 py-1.5 text-xs font-medium text-[#c7c0b2] transition-colors hover:text-[#f2ede2] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copied ? <Check className="h-4 w-4 text-[#f5d67b]" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
                  </button>
                </div>
              </div>

              {/* Scripture Column (optimal 65-75ch measure) */}
              <div className="mx-auto my-8 max-w-2xl space-y-5">
                {chapterContent.verses.map((verse, idx) => (
                  <p key={idx} className={`font-scripture text-[#f2ede2] ${fontSizeClass}`}>
                    {verse}
                  </p>
                ))}
              </div>

              {/* Study Note */}
              <div className="mx-auto max-w-2xl border-t border-[#24211b] pt-5">
                <div className="flex items-start gap-3 text-sm leading-relaxed text-[#b5afa2]">
                  <BookOpen className="mt-1 h-4 w-4 shrink-0 text-[#d4af37]" />
                  <p>{chapterContent.studyNote}</p>
                </div>
              </div>

              {/* Chapter Pagination */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#24211b] pt-5">
                <button
                  type="button"
                  disabled={currentChapterNumber <= 1}
                  onClick={() => onSelectChapter(activeBook.id, currentChapterNumber - 1)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#2b2720] bg-[#181612] px-4 py-2 text-xs font-medium text-[#f2ede2] transition-colors hover:border-[#d4af37]/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>الإصحاح السابق</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectChapter(activeBook.id, null)}
                  className="min-h-[44px] rounded-xl px-4 py-2 text-xs font-medium text-[#d4af37] hover:underline cursor-pointer"
                >
                  قائمة الإصحاحات ({currentChapterNumber} / {activeBook.chapters})
                </button>

                <button
                  type="button"
                  disabled={currentChapterNumber >= activeBook.chapters}
                  onClick={() => onSelectChapter(activeBook.id, currentChapterNumber + 1)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#2b2720] bg-[#181612] px-4 py-2 text-xs font-medium text-[#f2ede2] transition-colors hover:border-[#d4af37]/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>الإصحاح التالي</span>
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
};
