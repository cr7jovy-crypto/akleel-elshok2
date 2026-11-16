import React from 'react';
import { BookOpen, Calendar, HelpCircle, Home, Sparkles } from 'lucide-react';
import { SectionId } from '../types';

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onInstallClick: () => void;
  isInstalled: boolean;
}

const DESKTOP_LINKS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'bible', label: 'العهد الجديد' },
  { id: 'katamars', label: 'القطمارس' },
  { id: 'stories', label: 'القصص والتفاسير' },
  { id: 'quiz', label: 'المسابقة' },
];

const MOBILE_TABS: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'home', label: 'الرئيسية', icon: Home },
  { id: 'bible', label: 'الكتاب', icon: BookOpen },
  { id: 'katamars', label: 'القطمارس', icon: Calendar },
  { id: 'verses', label: 'الآيات', icon: Sparkles },
  { id: 'quiz', label: 'المسابقة', icon: HelpCircle },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  onInstallClick,
  isInstalled,
}) => {
  const isBibleActive = activeSection === 'bible' || activeSection === 'acts';
  const isEditorialActive = activeSection === 'stories' || activeSection === 'tafasir' || activeSection === 'verses';

  return (
    <>
      {/* Desktop Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 border-b border-[#25221c] bg-[#0a0a0a]/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="font-scripture text-xl font-bold tracking-wide text-[#f5d67b] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af37]"
          >
            إكليل الشوك
          </button>

          {/* Zone 2: Concise single-line nav links */}
          <nav aria-label="التنقل الرئيسي" className="hidden md:flex items-center gap-6 text-sm font-medium">
            {DESKTOP_LINKS.map((link) => {
              const isActive =
                activeSection === link.id ||
                (link.id === 'bible' && isBibleActive) ||
                (link.id === 'stories' && isEditorialActive);
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className={`relative py-2 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af37] ${
                    isActive
                      ? 'text-[#f5d67b]'
                      : 'text-[#b5afa2] hover:text-[#f2ede2]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-[#d4af37]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single primary action */}
          <div className="flex items-center shrink-0">
            {!isInstalled ? (
              <button
                type="button"
                onClick={onInstallClick}
                className="min-h-[40px] rounded-lg bg-[#d4af37] px-4 py-2 text-xs font-semibold text-[#0a0a0a] transition-colors duration-150 hover:bg-[#f5d67b] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5d67b]"
              >
                تثبيت التطبيق
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="min-h-[40px] rounded-lg border border-[#322d23] bg-[#141310] px-4 py-2 text-xs font-medium text-[#f5d67b] transition-colors duration-150 hover:border-[#d4af37]/50 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
              >
                عن التطبيق
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Tab Bar (under 15% height cap) */}
      <nav
        aria-label="شريط التنقل السفلي"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[#25221c] bg-[#0d0c0a]/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-5 h-16 items-center">
          {MOBILE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              activeSection === tab.id ||
              (tab.id === 'bible' && isBibleActive) ||
              (tab.id === 'verses' && (activeSection === 'stories' || activeSection === 'tafasir'));
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.id)}
                className={`flex min-h-[44px] flex-col items-center justify-center gap-1 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#d4af37] ${
                  isActive ? 'text-[#f5d67b]' : 'text-[#8e887b] hover:text-[#f2ede2]'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[11px] font-medium whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
