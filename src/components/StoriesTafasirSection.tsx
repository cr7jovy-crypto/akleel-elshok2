import React, { useState } from 'react';
import { ArrowLeft, BookOpen, ScrollText } from 'lucide-react';
import { NT_STORIES, TAFASIR_LIST } from '../data/spiritualContent';

interface StoriesTafasirSectionProps {
  initialTab: 'stories' | 'tafasir';
  onOpenChapter: (bookId: string, chapter: number) => void;
}

export const StoriesTafasirSection: React.FC<StoriesTafasirSectionProps> = ({
  initialTab,
  onOpenChapter,
}) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'tafasir'>(initialTab);
  const [imgError, setImgError] = useState(false);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="space-y-8">
      {/* Editorial Header Split */}
      <div className="grid grid-cols-1 items-stretch gap-6 rounded-2xl border border-[#25221c] bg-[#13120f] p-6 sm:p-8 lg:grid-cols-12">
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <p className="text-xs font-medium text-[#d4af37]">
              التعليم المسيحي · قصص وشروحات العهد الجديد
            </p>
            <h1 className="font-scripture mt-2 text-3xl font-bold text-[#f5d67b]">
              {activeTab === 'stories' ? 'قصص ومعجزات العهد الجديد' : 'التفاسير والشروحات الروحية'}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-loose text-[#c7c0b2]">
              تأملات مبسطة ومعمقة في أحداث الإنجيل وأمثاله وآياته المحورية، لربط كلمة الله بالحياة اليومية.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="القصص والتفاسير">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'stories'}
              onClick={() => setActiveTab('stories')}
              className={`min-h-[44px] rounded-xl px-5 py-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'stories'
                  ? 'bg-[#d4af37] text-[#0a0a0a]'
                  : 'border border-[#2b2720] bg-[#1a1814] text-[#c7c0b2] hover:text-[#f2ede2]'
              }`}
            >
              قصص العهد الجديد
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'tafasir'}
              onClick={() => setActiveTab('tafasir')}
              className={`min-h-[44px] rounded-xl px-5 py-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'tafasir'
                  ? 'bg-[#d4af37] text-[#0a0a0a]'
                  : 'border border-[#2b2720] bg-[#1a1814] text-[#c7c0b2] hover:text-[#f2ede2]'
              }`}
            >
              التفاسير والشروحات
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#25221c] bg-[#0d0c0a] lg:col-span-5">
          {!imgError ? (
            <img
              src="/src/assets/images/manuscript_stories_1794832402497.jpg"
              alt="مخطوطة قديمة ومصباح زيت وغصن زيتون"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-52 w-full object-cover lg:h-full"
            />
          ) : (
            <div className="flex h-52 items-center justify-center bg-[#18150f] text-[#d4af37] lg:h-full">
              <ScrollText className="h-12 w-12 opacity-60" />
            </div>
          )}
        </div>
      </div>

      {activeTab === 'stories' ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {NT_STORIES.map((story) => (
            <article
              key={story.id}
              className="flex flex-col justify-between rounded-2xl border border-[#25221c] bg-[#13120f] p-6"
            >
              <div>
                <p className="text-xs font-medium text-[#d4af37]">{story.ref}</p>
                <h2 className="font-scripture mt-2 text-2xl font-bold text-[#f2ede2]">
                  {story.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-[#ffe9a8]/90">{story.summary}</p>
                <p className="mt-3 text-sm leading-loose text-[#c7c0b2]">{story.narrative}</p>
              </div>

              <div className="mt-6 border-t border-[#221f19] pt-4">
                <p className="text-xs leading-relaxed text-[#f5d67b]">
                  الدرس الروحي: {story.lesson}
                </p>
                <button
                  type="button"
                  onClick={() => onOpenChapter(story.bookId, story.chapter)}
                  className="mt-4 inline-flex min-h-[40px] items-center gap-2 text-xs font-semibold text-[#f5d67b] hover:underline cursor-pointer"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>اقرأ الإصحاح في العهد الجديد</span>
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {TAFASIR_LIST.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[#25221c] bg-[#13120f] p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-scripture text-2xl font-bold text-[#f5d67b]">
                  {item.title}
                </h2>
                <span className="text-xs font-medium text-[#d4af37]">{item.ref}</span>
              </div>

              <blockquote className="font-scripture mt-3 text-xl leading-relaxed text-[#ffe9a8]">
                {item.verse}
              </blockquote>

              <div className="my-4 border-t border-[#221f19]" />

              <p className="max-w-3xl text-sm leading-loose text-[#d7d0c1] sm:text-base">
                {item.explanation}
              </p>

              <p className="mt-4 text-xs leading-relaxed text-[#f5d67b] sm:text-sm">
                التطبيق العملي: {item.application}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
