// ============================================================
// AppHeader - الشريط العلوي لتواق 2
// Design: Dark navy with orange accents
// ============================================================

import { Menu, Bell, User, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AppHeaderProps {
  onMenuToggle: () => void;
  pageTitle: string;
}

export default function AppHeader({ onMenuToggle, pageTitle }: AppHeaderProps) {
  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-4 py-3"
      style={{
        background: 'rgba(13, 27, 42, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Left: Menu + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-white/8 transition-colors text-gray-400 hover:text-white lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1
            className="text-base font-bold text-white"
            style={{ fontFamily: 'Noto Kufi Arabic' }}
          >
            {pageTitle}
          </h1>
          <p className="text-xs text-gray-500" style={{ fontFamily: 'Tajawal' }}>
            برنامج تواق 2 التنافسي
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Points Badge */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #F7941D20, #F7941D10)',
            border: '1px solid #F7941D30',
          }}
        >
          <Zap className="w-3.5 h-3.5" style={{ color: '#F7941D' }} />
          <span
            className="text-sm font-bold"
            style={{ color: '#F7941D', fontFamily: 'Noto Kufi Arabic' }}
          >
            1,250 نقطة
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-white/8 transition-colors text-gray-400 hover:text-white">
          <Bell className="w-5 h-5" />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: '#F7941D' }}
          />
        </button>

        {/* Profile */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/8 transition-colors"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              background: 'linear-gradient(135deg, #F7941D, #FFB347)',
              color: '#0D1B2A',
              fontFamily: 'Noto Kufi Arabic',
            }}
          >
            أ
          </div>
          <span className="hidden sm:block text-sm text-gray-300" style={{ fontFamily: 'Tajawal' }}>
            أحمد
          </span>
        </button>
      </div>
    </header>
  );
}
