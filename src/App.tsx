import { useCallback, useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { BibleSection } from './components/BibleSection';
import { HomeSection } from './components/HomeSection';
import { KatamarsSection } from './components/KatamarsSection';
import { Navigation } from './components/Navigation';
import { OfflineBanner } from './components/OfflineBanner';
import { PWAInstallModal } from './components/PWAInstallModal';
import { QuizSection } from './components/QuizSection';
import { StoriesTafasirSection } from './components/StoriesTafasirSection';
import { VersesSection } from './components/VersesSection';
import { usePWAInstall } from './hooks/usePWAInstall';
import { LastReadPosition, SectionId } from './types';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    try {
      const param = new URLSearchParams(window.location.search).get('section') as SectionId | null;
      const valid: SectionId[] = ['home', 'bible', 'katamars', 'verses', 'stories', 'acts', 'tafasir', 'quiz', 'about'];
      return param && valid.includes(param) ? param : 'home';
    } catch {
      return 'home';
    }
  });
  const [selectedBookId, setSelectedBookId] = useState<string>('john');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const [lastRead, setLastRead] = useState<LastReadPosition | null>(() =>
    readStorage<LastReadPosition | null>('eklil_last_read', null)
  );
  const [bookmarks, setBookmarks] = useState<string[]>(() =>
    readStorage<string[]>('eklil_bookmarks', [])
  );
  const [favoriteVerseIds, setFavoriteVerseIds] = useState<string[]>(() =>
    readStorage<string[]>('eklil_fav_verses', [])
  );
  const [bestQuizScore, setBestQuizScore] = useState<number>(() =>
    readStorage<number>('eklil_best_score', 0)
  );

  const [showInstallModal, setShowInstallModal] = useState(false);
  const { isInstallable, isInstalled, isIOS, isInIframe, install } = usePWAInstall();

  useEffect(() => {
    try {
      if (lastRead) {
        localStorage.setItem('eklil_last_read', JSON.stringify(lastRead));
      }
    } catch {
      // Ignore storage quota errors
    }
  }, [lastRead]);

  useEffect(() => {
    try {
      localStorage.setItem('eklil_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // Ignore storage quota errors
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('eklil_fav_verses', JSON.stringify(favoriteVerseIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [favoriteVerseIds]);

  useEffect(() => {
    try {
      localStorage.setItem('eklil_best_score', JSON.stringify(bestQuizScore));
    } catch {
      // Ignore storage quota errors
    }
  }, [bestQuizScore]);

  const handleNavigate = useCallback((section: SectionId) => {
    setActiveSection(section);
    if (section === 'acts') {
      setSelectedBookId('acts');
      setSelectedChapter(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectChapter = useCallback((bookId: string, chapter: number | null) => {
    setSelectedBookId(bookId);
    setSelectedChapter(chapter);
    if (chapter !== null) {
      setLastRead({ bookId, chapter });
    }
  }, []);

  const handleOpenChapterFromAnywhere = useCallback((bookId: string, chapter: number) => {
    setSelectedBookId(bookId);
    setSelectedChapter(chapter);
    setLastRead({ bookId, chapter });
    setActiveSection('bible');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleBookmark = useCallback((key: string) => {
    setBookmarks((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  }, []);

  const handleToggleFavoriteVerse = useCallback((id: string) => {
    setFavoriteVerseIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (isInstallable) {
      const result = await install();
      if (result === 'unavailable') {
        setShowInstallModal(true);
      }
      return;
    }
    setShowInstallModal(true);
  }, [install, isInstallable]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f2ede2] pb-24 md:pb-12">
      <OfflineBanner />
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onInstallClick={handleInstallClick}
        isInstalled={isInstalled}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {activeSection === 'home' && (
          <HomeSection
            onNavigate={handleNavigate}
            onOpenChapter={handleOpenChapterFromAnywhere}
            lastRead={lastRead}
            onInstallClick={handleInstallClick}
            isInstalled={isInstalled}
          />
        )}

        {(activeSection === 'bible' || activeSection === 'acts') && (
          <BibleSection
            selectedBookId={selectedBookId}
            selectedChapter={selectedChapter}
            onSelectBook={setSelectedBookId}
            onSelectChapter={handleSelectChapter}
            actsOnlyMode={activeSection === 'acts'}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeSection === 'katamars' && <KatamarsSection />}

        {activeSection === 'verses' && (
          <VersesSection
            favoriteVerseIds={favoriteVerseIds}
            onToggleFavoriteVerse={handleToggleFavoriteVerse}
          />
        )}

        {(activeSection === 'stories' || activeSection === 'tafasir') && (
          <StoriesTafasirSection
            initialTab={activeSection === 'tafasir' ? 'tafasir' : 'stories'}
            onOpenChapter={handleOpenChapterFromAnywhere}
          />
        )}

        {activeSection === 'quiz' && (
          <QuizSection
            bestScore={bestQuizScore}
            onUpdateBestScore={setBestQuizScore}
          />
        )}

        {activeSection === 'about' && (
          <AboutSection
            onInstallClick={handleInstallClick}
            isInstalled={isInstalled}
          />
        )}
      </main>

      <footer className="mx-auto mt-8 max-w-6xl border-t border-[#201d18] px-4 py-8 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 text-xs text-[#8e887b] sm:flex-row sm:items-center">
          <p>إكليل الشوك · تطبيق الكتاب المقدس والتعليم</p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate('bible')}
              className="hover:text-[#f5d67b] cursor-pointer"
            >
              العهد الجديد
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('tafasir')}
              className="hover:text-[#f5d67b] cursor-pointer"
            >
              التفاسير
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('about')}
              className="hover:text-[#f5d67b] cursor-pointer"
            >
              عن التطبيق
            </button>
          </div>
        </div>
      </footer>

      <PWAInstallModal
        isOpen={showInstallModal}
        isIOS={isIOS}
        isInIframe={isInIframe}
        onClose={() => setShowInstallModal(false)}
      />
    </div>
  );
}
