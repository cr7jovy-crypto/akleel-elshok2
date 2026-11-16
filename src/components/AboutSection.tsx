import React, { useState } from 'react';
import { CheckCircle2, Crown, Download, Smartphone, WifiOff } from 'lucide-react';

interface AboutSectionProps {
  onInstallClick: () => void;
  isInstalled: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onInstallClick,
  isInstalled,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="rounded-2xl border border-[#25221c] bg-[#13120f] p-6 sm:p-10">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          {!imgError ? (
            <img
              src="/pwa-512x512.png"
              alt="شعار إكليل الشوك"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-24 w-24 rounded-2xl border border-[#d4af37]/30 object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#1c1810] text-[#f5d67b]">
              <Crown className="h-10 w-10" />
            </div>
          )}

          <div>
            <p className="text-xs font-medium text-[#d4af37]">
              تطبيق مسيحي للكتاب المقدس والتعليم
            </p>
            <h1 className="font-scripture mt-1 text-3xl font-bold text-[#f5d67b]">
              إكليل الشوك
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#c7c0b2]">
              «فَلَمَّا أَخَذَ يَسُوعُ الْخَلَّ قَالَ: قَدْ أُكْمِلَ» — يوحنا ١٩ : ٣٠
            </p>
          </div>
        </div>

        <div className="my-6 border-t border-[#24211b]" />

        <div className="space-y-4 text-sm leading-loose text-[#d7d0c1] sm:text-base">
          <p>
            صُمم تطبيق <strong>إكليل الشوك</strong> ليكون رفيقاً روحياً وتعليمياً هادئاً للقراءة والتأمل في أسفار العهد الجديد السبعة والعشرين، مع قراءات القطمارس والسنكسار، وقصص العهد الجديد، والتفاسير المبسطة، ومسابقات اختبار المعرفة الكتابية.
          </p>
          <p>
            يعمل التطبيق كتطبيق ويب تقدمي (PWA) متوافق مع معايير التثبيت المباشر على الهواتف والحواسيب ومتجر Google Play عبر تقنية Trusted Web Activity، مع حفظ النصوص وموضع القراءة محلياً للعمل بدون إنترنت.
          </p>
        </div>

        <div className="my-6 border-t border-[#24211b]" />

        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-base font-semibold text-[#f5d67b]">
            <Smartphone className="h-4 w-4" />
            <span>جاهزية التثبيت والرفع على Google Play</span>
          </h2>
          <ul className="space-y-2 text-xs leading-relaxed text-[#c7c0b2] sm:text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d4af37]" />
              <span>ملف التعريف الرسمي <code className="text-[#f5d67b]">/manifest.json</code> بالاسم العربي الكامل والاتجاه RTL.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d4af37]" />
              <span>أيقونات PNG عالية الدقة بمقاسات 192×192 و 512×512 (قياسية وMaskable) بالإضافة إلى لقطات الشاشة.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d4af37]" />
              <span>خدمة العمل بدون إنترنت (Service Worker) مع ملف <code className="text-[#f5d67b]">assetlinks.json</code> الجاهز للربط ببصمة تطبيق الأندرويد.</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#24211b] pt-6">
          <div className="flex items-center gap-2 text-xs text-[#b5afa2]">
            <WifiOff className="h-4 w-4 text-[#d4af37]" />
            <span>جاهز للعمل بدون إنترنت بعد أول زيارة</span>
          </div>

          {!isInstalled && (
            <button
              type="button"
              onClick={onInstallClick}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#d4af37] px-5 py-2.5 text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-[#f5d67b] cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>تثبيت التطبيق</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
