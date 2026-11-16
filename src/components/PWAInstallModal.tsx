import React from 'react';
import { CheckCircle2, Download, ExternalLink, Share, X } from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  isIOS: boolean;
  isInIframe: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  isIOS,
  isInIframe,
  onClose,
}) => {
  if (!isOpen) return null;

  const standaloneUrl = typeof window !== 'undefined' ? window.location.origin : '/';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-2xl border border-[#2d2920] bg-[#141310] p-6 text-right shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/pwa-192x192.png"
              alt="أيقونة إكليل الشوك"
              className="h-12 w-12 rounded-xl border border-[#d4af37]/30 object-cover"
            />
            <div>
              <h3 id="pwa-modal-title" className="font-scripture text-2xl font-bold text-[#f5d67b]">
                تثبيت إكليل الشوك
              </h3>
              <p className="text-xs text-[#9e9789]">تطبيق ويب تقدمي · يعمل بدون إنترنت</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#9e9789] hover:bg-[#1e1c17] hover:text-[#f2ede2] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="my-4 border-t border-[#24211b]" />

        {isInIframe && !isIOS && (
          <div className="mb-4 space-y-3 rounded-xl border border-[#352f22] bg-[#1b1812] p-4 text-sm leading-relaxed text-[#e6dfd1]">
            <p>
              لإظهار نافذة التثبيت المباشر على هاتفك أو جهازك بضغطة واحدة، افتح التطبيق في نافذة متصفح مستقلة خارج وضع المعاينة:
            </p>
            <a
              href={standaloneUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-2.5 text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-[#f5d67b]"
            >
              <ExternalLink className="h-4 w-4" />
              <span>فتح التطبيق للتثبيت المباشر</span>
            </a>
          </div>
        )}

        {isIOS ? (
          <div className="space-y-3 text-sm leading-relaxed text-[#d7d0c1]">
            <p>لتثبيت التطبيق على آيفون أو آيباد كبرنامج مستقل:</p>
            <ol className="list-decimal space-y-2 pr-5 text-[#f2ede2]">
              <li className="flex items-center gap-2">
                <span>اضغط على زر المشاركة</span>
                <Share className="inline h-4 w-4 text-[#f5d67b]" />
                <span>في شريط متصفح Safari.</span>
              </li>
              <li>مرر للأسفل واختر «إضافة إلى الشاشة الرئيسية» (Add to Home Screen).</li>
              <li>اضغط «إضافة» ليظهر تطبيق إكليل الشوك على شاشتك.</li>
            </ol>
          </div>
        ) : (
          <div className="space-y-3 text-sm leading-relaxed text-[#d7d0c1]">
            <p>خطوات التثبيت اليدوية في Chrome أو Edge:</p>
            <ol className="list-decimal space-y-2 pr-5 text-[#f2ede2]">
              <li>
                اضغط على أيقونة التثبيت{' '}
                <Download className="inline h-4 w-4 text-[#f5d67b]" /> في شريط العنوان أو افتح قائمة المتصفح (⋮).
              </li>
              <li>اختر «تثبيت التطبيق» (Install App) أو «إضافة إلى الشاشة الرئيسية».</li>
            </ol>
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 text-xs text-[#9e9789]">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d4af37]" />
          <span>ملف manifest.json وأيقونات 192 و 512 والتخزين أوفلاين مفعلة بالكامل.</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 min-h-[44px] w-full rounded-xl border border-[#322d23] bg-[#1a1814] px-4 py-2.5 text-sm font-semibold text-[#f5d67b] transition-colors hover:border-[#d4af37]/50 cursor-pointer"
        >
          إغلاق
        </button>
      </div>
    </div>
  );
};
