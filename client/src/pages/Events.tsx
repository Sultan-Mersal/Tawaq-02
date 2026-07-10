// ============================================================
// Events Page - سجل الأحداث
// Design: Dark Tournament Theme with live feed
// ============================================================

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { recentEvents } from '@/lib/data';
import { Activity, Filter } from 'lucide-react';

const eventTypeConfig = {
  tool_used: { label: 'أداة مستخدمة', icon: '🔧', color: '#2196F3' },
  points_stolen: { label: 'سرقة نقاط', icon: '⚡', color: '#F44336' },
  alias_revealed: { label: 'كشف هوية', icon: '👁️', color: '#9C27B0' },
  tool_purchased: { label: 'شراء أداة', icon: '🛒', color: '#4CAF50' },
  reward_granted: { label: 'منح مكافأة', icon: '🏆', color: '#FFD700' },
  guess_made: { label: 'محاولة تخمين', icon: '🎯', color: '#F7941D' },
};

function formatTime(date: Date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'الآن';
  if (mins < 60) return `منذ ${mins} دقيقة`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `منذ ${hours} ساعة`;
  return `منذ ${Math.floor(hours / 24)} يوم`;
}

// Generate more events for the page
const allEvents = [
  ...recentEvents,
  {
    id: '9',
    type: 'alias_revealed' as const,
    description: 'تم كشف هوية "الغيم" — حصل الكاشف على مكافأة كبرى!',
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
  },
  {
    id: '10',
    type: 'reward_granted' as const,
    description: '"البرق" حصل على جائزة المركز الثاني الأسبوعي',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '11',
    type: 'tool_used' as const,
    description: 'تم استخدام "المرآة" — انعكست السرقة على مستخدمها',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: '12',
    type: 'tool_purchased' as const,
    description: 'تم شراء "كشف جزئي" بـ 300 نقطة',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: '13',
    type: 'points_stolen' as const,
    description: 'اسم مستعار سرق 80 نقطة من "النسر"',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '14',
    type: 'guess_made' as const,
    description: 'محاولة تخمين ناجحة — تم كشف "الفارس"!',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];

export default function Events() {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = filterType === 'all'
    ? allEvents
    : allEvents.filter(e => e.type === filterType);

  return (
    <AppLayout pageTitle="سجل الأحداث">
      {/* Header */}
      <div
        className="py-6"
        style={{
          background: 'linear-gradient(135deg, #0D1B2A 0%, #1B2E45 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="container">
          <div className="flex items-center gap-3 mb-1">
            <Activity className="w-6 h-6" style={{ color: '#F7941D' }} />
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
              سجل الأحداث
            </h1>
          </div>
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'Tajawal' }}>
            جميع العمليات داخل المسابقة — بدون كشف هوية اللاعبين الحقيقيين
          </p>
        </div>
      </div>

      <div className="container py-6 space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {Object.entries(eventTypeConfig).map(([type, config]) => {
            const count = allEvents.filter(e => e.type === type).length;
            return (
              <div
                key={type}
                className="tawaq-card p-3 text-center cursor-pointer transition-all"
                onClick={() => setFilterType(filterType === type ? 'all' : type)}
                style={{
                  border: filterType === type ? `1px solid ${config.color}50` : undefined,
                  background: filterType === type ? `${config.color}10` : undefined,
                }}
              >
                <div className="text-xl mb-1">{config.icon}</div>
                <div className="font-black text-lg" style={{ color: config.color, fontFamily: 'Tajawal' }}>{count}</div>
                <div className="text-xs text-gray-500" style={{ fontFamily: 'Tajawal' }}>{config.label}</div>
              </div>
            );
          })}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-gray-500" />
          <button
            onClick={() => setFilterType('all')}
            className="px-4 py-1.5 rounded-lg text-sm font-bold transition-all"
            style={{
              background: filterType === 'all' ? '#F7941D' : 'rgba(255,255,255,0.06)',
              color: filterType === 'all' ? '#0D1B2A' : '#ccc',
              fontFamily: 'Noto Kufi Arabic',
            }}
          >
            الكل ({allEvents.length})
          </button>
          {Object.entries(eventTypeConfig).map(([type, config]) => (
            <button
              key={type}
              onClick={() => setFilterType(filterType === type ? 'all' : type)}
              className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all"
              style={{
                background: filterType === type ? `${config.color}` : 'rgba(255,255,255,0.06)',
                color: filterType === type ? '#fff' : '#ccc',
                fontFamily: 'Tajawal',
              }}
            >
              {config.icon} {config.label}
            </button>
          ))}
        </div>

        {/* Events Feed */}
        <div className="tawaq-card overflow-hidden">
          <div className="divide-y divide-white/4">
            {filtered.map((event, i) => {
              const config = eventTypeConfig[event.type as keyof typeof eventTypeConfig];
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-4 px-4 py-4 hover:bg-white/3 transition-colors"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: `${config.color}15`, border: `1px solid ${config.color}25` }}
                  >
                    {config.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200 leading-relaxed" style={{ fontFamily: 'Tajawal' }}>
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${config.color}15`, color: config.color, fontFamily: 'Tajawal' }}
                      >
                        {config.label}
                      </span>
                      <span className="text-xs text-gray-600" style={{ fontFamily: 'Tajawal' }}>
                        {formatTime(event.timestamp)}
                      </span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="text-xs text-gray-600 flex-shrink-0" style={{ fontFamily: 'Tajawal' }}>
                    {event.timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="tawaq-card p-12 text-center">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-400" style={{ fontFamily: 'Tajawal' }}>لا توجد أحداث من هذا النوع</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
