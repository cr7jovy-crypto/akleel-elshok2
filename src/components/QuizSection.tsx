import React, { useState } from 'react';
import { Award, CheckCircle2, ChevronLeft, RotateCcw, XCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/spiritualContent';

interface QuizSectionProps {
  bestScore: number;
  onUpdateBestScore: (score: number) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  bestScore,
  onUpdateBestScore,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];
  const total = QUIZ_QUESTIONS.length;
  const hasAnswered = selectedOption !== null;
  const isCorrect = selectedOption === currentQuestion.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    if (idx === currentQuestion.correctIndex) {
      const nextScore = score + 1;
      setScore(nextScore);
      if (nextScore > bestScore) {
        onUpdateBestScore(nextScore);
      }
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 >= total) {
      setFinished(true);
    } else {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#25221c] pb-5">
        <div>
          <p className="text-xs font-medium text-[#d4af37]">
            اختبر معلوماتك الكتابية · العهد الجديد
          </p>
          <h1 className="font-scripture mt-1 text-3xl font-bold text-[#f5d67b]">
            مسابقات الاختبار
          </h1>
        </div>
        <p className="text-xs text-[#b5afa2] tabular-nums">
          أعلى نتيجة محفوظة: {bestScore} / {total}
        </p>
      </div>

      {finished ? (
        <section className="mx-auto max-w-xl rounded-2xl border border-[#322c1f] bg-[#13120f] p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1f1a10] text-[#f5d67b]">
            <Award className="h-8 w-8" />
          </div>
          <h2 className="font-scripture mt-4 text-3xl font-bold text-[#f5d67b]">
            اكتملت المسابقة
          </h2>
          <p className="mt-3 text-lg font-semibold text-[#f2ede2] tabular-nums">
            نتيجتك: {score} من {total}
          </p>
          <p className="mt-2 text-sm text-[#b5afa2]">
            {score >= 8
              ? 'ممتاز! معرفة رائعة بأسفار العهد الجديد.'
              : score >= 5
                ? 'جيد جداً! واصل القراءة والتأمل في كلمة الله.'
                : 'بداية طيبة! تصفح العهد الجديد والقصص وجرب المسابقة مجدداً.'}
          </p>

          <button
            type="button"
            onClick={handleRestart}
            className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3 text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-[#f5d67b] cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>إعادة المسابقة</span>
          </button>
        </section>
      ) : (
        <section className="mx-auto max-w-2xl rounded-2xl border border-[#25221c] bg-[#13120f] p-6 sm:p-8">
          <div className="flex items-center justify-between text-xs text-[#b5afa2] tabular-nums">
            <span>
              السؤال {currentIdx + 1} من {total}
            </span>
            <span className="text-[#d4af37]">النقاط: {score}</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#211e18]">
            <div
              className="h-full bg-[#d4af37] transition-all duration-200"
              style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
            />
          </div>

          <h2 className="font-scripture mt-6 text-2xl font-bold leading-relaxed text-[#f2ede2]">
            {currentQuestion.question}
          </h2>

          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isOptionCorrect = idx === currentQuestion.correctIndex;

              let stateClass =
                'border-[#2b2720] bg-[#181612] text-[#f2ede2] hover:border-[#d4af37]/50';
              if (hasAnswered) {
                if (isOptionCorrect) {
                  stateClass = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200';
                } else if (isSelected) {
                  stateClass = 'border-rose-500/60 bg-rose-950/40 text-rose-200';
                } else {
                  stateClass = 'border-[#24211b] bg-[#14120f] text-[#787166]';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`flex min-h-[52px] w-full items-center justify-between rounded-xl border px-4 py-3 text-right text-sm font-medium transition-colors cursor-pointer disabled:cursor-default ${stateClass}`}
                >
                  <span>{opt}</span>
                  {hasAnswered && isOptionCorrect && (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  )}
                  {hasAnswered && isSelected && !isOptionCorrect && (
                    <XCircle className="h-5 w-5 shrink-0 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {hasAnswered && (
            <div className="mt-6 border-t border-[#24211b] pt-5">
              <p className="text-sm font-semibold text-[#f5d67b]">
                {isCorrect ? 'إجابة صحيحة' : 'إجابة غير صحيحة'} · {currentQuestion.reference}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#c7c0b2]">
                {currentQuestion.explanation}
              </p>

              <button
                type="button"
                onClick={handleNext}
                className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-[#f5d67b] cursor-pointer"
              >
                <span>{currentIdx + 1 >= total ? 'عرض النتيجة النهائية' : 'السؤال التالي'}</span>
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
