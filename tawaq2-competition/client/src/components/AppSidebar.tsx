// ============================================================
// AppSidebar - الشريط الجانبي الرئيسي لتواق 2
// Design: Dark navy sidebar with orange accents
// ============================================================

import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import {
  Trophy, Users, ShoppingBag, LayoutDashboard,
  Activity, Settings, ChevronLeft, Zap, Star, BookOpen
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'الرئيسية', icon: LayoutDashboard },
  { href: '/leaderboard', label: 'لوحة الترتيب', icon: Trophy },
  { href: '/player', label: 'صفحتي', icon: Users },
  { href: '/store', label: 'متجر الأدوات', icon: ShoppingBag },
  { href: '/events', label: 'سجل الأحداث', icon: Activity },
  { href: '/admin', label: 'لوحة المشرف', icon: Settings },
];

interface AppSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AppSidebar({ isOpen, onToggle }: AppSidebarProps) {
  const [location] = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full z-40 transition-all duration-300 ease-out',
          'flex flex-col',
          isOpen ? 'w-64' : 'w-16',
          'lg:relative lg:translate-x-0'
        )}
        style={{
          background: 'linear-gradient(180deg, #0D1B2A 0%, #111F30 50%, #0D1B2A 100%)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-white/6">
          {isOpen ? (
            <div className="flex items-center gap-3 animate-float-up">
              <img
                src="/manus-storage/logo-tawaq2_0eab904d.png"
                alt="تواق 2"
                className="h-10 w-auto object-contain"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #F7941D, #FFB347)' }}>
              <Star className="w-4 h-4 text-white" />
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-white/8 transition-colors text-gray-400 hover:text-white"
          >
            <ChevronLeft className={cn('w-4 h-4 transition-transform duration-300', !isOpen && 'rotate-180')} />
          </button>
        </div>

        {/* Week Badge */}
        {isOpen && (
          <div className="mx-3 mt-3 px-3 py-2 rounded-lg animate-float-up"
            style={{ background: 'linear-gradient(135deg, #F7941D20, #F7941D10)', border: '1px solid #F7941D30' }}>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" style={{ color: '#F7941D' }} />
              <span className="text-sm font-bold" style={{ color: '#F7941D', fontFamily: 'Noto Kufi Arabic' }}>
                الأسبوع الثالث
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">24 مشارك نشط</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, #F7941D25, #F7941D15)'
                      : undefined,
                    border: isActive ? '1px solid #F7941D30' : '1px solid transparent',
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  <Icon
                    className={cn('w-5 h-5 flex-shrink-0 transition-colors', isActive ? '' : 'group-hover:text-orange-400')}
                    style={{ color: isActive ? '#F7941D' : undefined }}
                  />
                  {isOpen && (
                    <span
                      className="text-sm font-medium truncate"
                      style={{ fontFamily: 'Noto Kufi Arabic' }}
                    >
                      {item.label}
                    </span>
                  )}
                  {isActive && isOpen && (
                    <div
                      className="mr-auto w-1.5 h-1.5 rounded-full"
                      style={{ background: '#F7941D' }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom - Program Info */}
        {isOpen && (
          <div className="p-3 border-t border-white/6">
            <div className="flex items-center gap-2 px-2 py-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <BookOpen className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-400 truncate" style={{ fontFamily: 'Tajawal' }}>
                  برنامج يراع التأسيسي
                </p>
                <p className="text-xs font-bold truncate" style={{ color: '#F7941D', fontFamily: 'Noto Kufi Arabic' }}>
                  جيل يعلو وبالعلم يسمو
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
