import React, { useMemo, useState } from 'react';
import { Calendar, UserCheck } from 'lucide-react';
import { KATAMARS_DAYS, SYNAXARIUM_SAINTS } from '../data/spiritualContent';

export const KatamarsSection: React.FC = () => {
  const [selectedDayId, setSelectedDayId] = useState<string>(KATAMARS_DAYS[0].id);

  const formattedDate = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date());
    } catch {
      return new Date().toLocaleDateString('ar');
    }
  }, []);

  const currentReading = useMemo(
    () => KATAMARS_DAYS.find((d) => d.id === selectedDayId) ?? KATAMARS_DAYS[0],
    [selectedDayId]
  );

  return (
    <div className="space-y-8">
      <div className="border-b border-[#25221c] pb-5">
        <p className="text-xs font-medium text-[#d4af37]">{formattedDate}</p>
        <h1 className="font-scripture mt-1 text-3xl font-bold text-[#f5d67b]">
          القطمارس والسنكسار
        </h1>
        <p className="mt-2 text-sm text-[#9e9789]">
          القراءات الكنسية اليومية وسير القديسين والشهداء للتأمل والتعليم
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="أيام القراءات">
        {KATAMARS_DAYS.map((day) => (
          <button
            key={day.id}
            type="button"
            role="tab"
            aria-selected={day.id === selectedDayId}
            onClick={() => setSelectedDayId(day.id)}
            className={`min-h-[44px] rounded-xl px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              day.id === selectedDayId
                ? 'bg-[#d4af37] text-[#0a0a0a]'
                : 'border border-[#2b2720] bg-[#13120f] text-[#c7c0b2] hover:border-[#d4af37]/40 hover:text-[#f2ede2]'
            }`}
          >
            {day.dayName}
          </button>
        ))}
      </div>

      {/* Readings Grid */}
      <section className="rounded-2xl border border-[#25221c] bg-[#13120f] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#24211b] pb-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#d4af37]" />
            <h2 className="font-scripture text-2xl font-bold text-[#f5d67b]">
              {currentReading.dayName}
            </h2>
          </div>
          <p className="text-xs text-[#b5afa2]">{currentReading.occasion}</p>
        </div>

        <dl className="mt-6 space-y-6">
          {[
            { label: 'المزمور', text: currentReading.psalm, ref: currentReading.psalmRef },
            { label: 'الإنجيل المقدس', text: currentReading.gospel, ref: currentReading.gospelRef },
            { label: 'رسالة البولس', text: currentReading.pauline, ref: currentReading.paulineRef },
            { label: 'الكاثوليكون', text: currentReading.catholic, ref: currentReading.catholicRef },
            { label: 'الإبركسيس (أعمال الرسل)', text: currentReading.praxis, ref: currentReading.praxisRef },
          ].map((item, idx) => (
            <div
              key={item.label}
              className={idx !== 0 ? 'border-t border-[#221f19] pt-5' : ''}
            >
              <dt className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-semibold text-[#d4af37]">{item.label}</span>
                <span className="text-xs text-[#9e9789]">{item.ref}</span>
              </dt>
              <dd className="font-scripture mt-2 max-w-2xl text-xl leading-loose text-[#f2ede2]">
                «{item.text}»
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Synaxarium Saints */}
      <section aria-labelledby="synaxarium-heading" className="space-y-4">
        <div>
          <h2 id="synaxarium-heading" className="font-scripture text-2xl font-bold text-[#f5d67b]">
            السنكسار — سير القديسين والشهداء
          </h2>
          <p className="mt-1 text-sm text-[#9e9789]">
            شهادات حية للإيمان والثبات عبر تاريخ الكنيسة
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SYNAXARIUM_SAINTS.map((saint) => (
            <article
              key={saint.id}
              className="flex flex-col justify-between rounded-2xl border border-[#25221c] bg-[#13120f] p-6"
            >
              <div>
                <p className="text-xs text-[#d4af37]">{saint.commemoration}</p>
                <div className="mt-2 flex items-center gap-2">
                  <UserCheck className="h-4 w-4 shrink-0 text-[#f5d67b]" />
                  <h3 className="font-scripture text-xl font-bold text-[#f2ede2]">
                    {saint.name}
                  </h3>
                </div>
                <p className="mt-0.5 text-xs text-[#9e9789]">{saint.title}</p>
                <p className="mt-4 text-sm leading-loose text-[#d7d0c1]">{saint.biography}</p>
              </div>
              <p className="mt-5 border-t border-[#221f19] pt-3 text-xs leading-relaxed text-[#f5d67b]">
                {saint.prayer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
