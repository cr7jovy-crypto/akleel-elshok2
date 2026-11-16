import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Crown,
  Download,
  Feather,
  HelpCircle,
  MessageSquareText,
  ScrollText,
  Sparkles,
} from 'lucide-react';
import { LastReadPosition, SectionId } from '../types';
import { NT_BOOKS } from '../data/newTestament';

interface HomeSectionProps {
  onNavigate: (section: SectionId) => void;
  onOpenChapter: (bookId: string, chapter: number) => void;
  lastRead: LastReadPosition | null;
  onInstallClick: () => void;
  isInstalled: boolean;
}

const DIRECTORY_ITEMS: {
  id: SectionId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'bible',
    title: 'الكتاب المقدس',
    subtitle: 'العهد الجديد كاملاً · ٢٧ سفراً أوفلاين',
    icon: BookOpen,
  },
  {
    id: 'katamars',
    title: 'القطمارس والسنكسار',
    subtitle: 'القراءات اليومية وسير القديسين',
    icon: Calendar,
  },
  {
    id: 'verses',
    title: 'الآيات والتأملات',
    subtitle: 'مختارات كتابية مع شروحات روحية',
    icon: Sparkles,
  },
  {
    id: 'stories',
    title: 'قصص العهد الجديد',
    subtitle: 'معجزات وأمثال الرب يسوع',
    icon: ScrollText,
  },
  {
    id: 'acts',
    title: 'سفر أعمال الرسل',
    subtitle: '٢٨ إصحاحاً · تاريخ الكنيسة الأولى',
    icon: Feather,
  },
  {
    id: 'tafasir',
    title: 'التفاسير والشروحات',
    subtitle: 'تأملات آبائية وتفسير النصوص',
    icon: MessageSquareText,
  },
  {
    id: 'quiz',
    title: 'مسابقات الاختبار',
    subtitle: 'أسئلة تفاعلية لاختبار معرفتك',
    icon: HelpCircle,
  },
  {
    id: 'about',
    title: 'عن التطبيق',
    subtitle: 'رسالة إكليل الشوك والعمل بدون إنترنت',
    icon: Crown,
  },
];

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigate,
  onOpenChapter,
  lastRead,
  onInstallClick,
  isInstalled,
}) => {
  const [heroImgError, setHeroImgError] = useState(false);
  const [emblemImgError, setEmblemImgError] = useState(false);

  const lastBook = lastRead ? NT_BOOKS.find((b) => b.id === lastRead.bookId) : null;

  return (
    <div className="space-y-12">
      {/* Editorial Sanctuary Hero */}
      <section className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
        <div className="flex flex-col justify-between rounded-2xl border border-[#25221c] bg-[#12110e] p-6 sm:p-8 lg:col-span-7">
          <div>
            <div className="flex items-center gap-4">
              {!emblemImgError ? (
                <img
                  src="/src/assets/images/crown_emblem_1794832401284.jpg"
                  alt="شعار إكليل الشوك"
                  referrerPolicy="no-referrer"
                  onError={() => setEmblemImgError(true)}
                  className="h-14 w-14 rounded-xl border border-[#d4af37]/30 object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#1c1810] text-[#f5d67b]">
                  <Crown className="h-7 w-7" />
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-[#b5afa2]">
                  العهد الجديد · يعمل بدون إنترنت
                </p>
                <h1 className="font-scripture mt-1 text-3xl font-bold text-[#f5d67b] sm:text-4xl">
                  إكليل الشوك
                </h1>
              </div>
            </div>

            <div className="my-6 border-t border-[#24211b]" />

            <p className="text-xs font-medium text-[#d4af37]">
              تأمل اليوم · يوحنا ١٩ : ٣٠
            </p>
            <blockquote className="font-scripture mt-3 text-3xl leading-relaxed text-[#ffe9a8] sm:text-4xl">
              «قَدْ أُكْمِلَ»
            </blockquote>
            <p className="mt-3 max-w-xl text-sm leading-loose text-[#c7c0b2] sm:text-base">
              اقرأ وتأمل في محبة المسيح وتضحيته على الصليب. تصفح أسفار العهد الجديد، القراءات الكنسية اليومية، والتفاسير الروحية في أي وقت حتى دون اتصال بالإنترنت.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('bible')}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3 text-sm font-bold text-[#0a0a0a] transition-colors duration-150 hover:bg-[#f5d67b] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5d67b]"
            >
              <span>افتح العهد الجديد</span>
              <ArrowLeft className="h-4 w-4" />
            </button>

            {lastBook && lastRead ? (
              <button
                type="button"
                onClick={() => onOpenChapter(lastBook.id, lastRead.chapter)}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#322d23] bg-[#191713] px-5 py-3 text-sm font-medium text-[#f5d67b] transition-colors duration-150 hover:border-[#d4af37]/50 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>متابعة: {lastBook.name} ({lastRead.chapter})</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onOpenChapter('john', 19)}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#322d23] bg-[#191713] px-5 py-3 text-sm font-medium text-[#f5d67b] transition-colors duration-150 hover:border-[#d4af37]/50 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>اقرأ يوحنا ١٩</span>
              </button>
            )}
          </div>
        </div>

        <div className="relative min-h-[240px] overflow-hidden rounded-2xl border border-[#25221c] bg-[#12110e] lg:col-span-5">
          {!heroImgError ? (
            <img
              src="/src/assets/images/sanctuary_hero_1794832401543.jpg"
              alt="الكتاب المقدس المفتوح داخل الكنيسة مع أشعة الشمس الذهبية"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgError(true)}
              className="h-full w-full object-cover lg:h-full"
            />
          ) : (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center bg-gradient-to-br from-[#1f190e] to-[#0d0c0a] p-8 text-center">
              <Crown className="h-12 w-12 text-[#d4af37]/70" />
              <p className="font-scripture mt-3 text-xl text-[#f5d67b]">كلمة الله حية وفعالة</p>
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/25 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-xs font-medium text-[#d4af37]">قراءة الفداء</p>
            <p className="font-scripture mt-1 text-xl text-[#f2ede2]">
              «سِرَاجٌ لِرِجْلِي كَلاَمُكَ وَنُورٌ لِسَبِيلِي»
            </p>
          </div>
        </div>
      </section>

      {/* Sections Directory */}
      <section aria-labelledby="sections-heading">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 id="sections-heading" className="font-scripture text-2xl font-bold text-[#f5d67b]">
              أقسام التطبيق
            </h2>
            <p className="mt-1 text-sm text-[#9e9789]">
              مكتبة روحية وتعليمية متكاملة متاحة للقراءة في أي وقت
            </p>
          </div>
          <p className="text-xs text-[#8e887b] tabular-nums">٨ أقسام رئيسية · ٢٧ سفراً</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DIRECTORY_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="group flex min-h-[116px] flex-col items-start justify-between rounded-2xl border border-[#25221c] bg-[#13120f] p-5 text-right transition-colors duration-150 hover:border-[#d4af37]/45 hover:bg-[#191713] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d1a13] text-[#f5d67b] transition-colors group-hover:bg-[#d4af37]/15">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowLeft className="h-4 w-4 text-[#6f695d] transition-transform duration-150 group-hover:-translate-x-1 group-hover:text-[#f5d67b]" />
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-semibold text-[#f2ede2] group-hover:text-[#f5d67b]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#9e9789]">{item.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* PWA Offline Install Callout */}
      {!isInstalled && (
        <section className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#25221c] bg-[#13120f] p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-scripture text-xl font-bold text-[#f5d67b]">
              تثبيت التطبيق على جهازك
            </h2>
            <p className="mt-1 text-sm text-[#b5afa2]">
              يعمل إكليل الشوك بدون إنترنت بالكامل بعد التثبيت — احفظ العهد الجديد والقراءات اليومية على شاشتك الرئيسية.
            </p>
          </div>
          <button
            type="button"
            onClick={onInstallClick}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-5 py-2.5 text-sm font-bold text-[#0a0a0a] transition-colors duration-150 hover:bg-[#f5d67b] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>تثبيت الآن</span>
          </button>
        </section>
      )}
    </div>
  );
};
