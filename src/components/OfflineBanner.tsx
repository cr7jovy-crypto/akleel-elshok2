import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="border-b border-amber-500/25 bg-[#1b160c] px-4 py-2 text-center text-xs text-[#f5d67b]"
    >
      <span className="inline-flex items-center gap-2">
        <WifiOff className="h-3.5 w-3.5 shrink-0" />
        <span>أنت تتصفح الآن بدون اتصال بالإنترنت — جميع النصوص والقراءات المحفوظة متاحة للعمل أوفلاين.</span>
      </span>
    </div>
  );
};
