// ============================================================
// Home Page - الصفحة الرئيسية لتواق 2
// Design: Dark Tournament Theme with hero section
// ============================================================

import AppLayout from '@/components/AppLayout';
import { Trophy, Zap, Users, TrendingUp, Star, Shield, Eye, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { aliasLeaderboard, weekStats, recentEvents, pointSources } from '@/lib/data';
import { Link } from 'wouter';

function StatCard({ icon: Icon, label, value, color, sub }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  sub?: string;
}) {
  return (
    <div className="tawaq-card p-4 animate-float-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Tajawal' }}>{label}</p>
          <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Noto Kufi Arabic', color }}>{value}</p>
          {sub && <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Tajawal' }}>{sub}</p>}
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </div>
  );
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <ArrowUp className="w-3.5 h-3.5 text-green-400" />;
  if (trend === 'down') return <ArrowDown className="w-3.5 h-3.5 text-red-400" />;
  return <Minus className="w-3.5 h-3.5 text-gray-500" />;
}

function formatTime(date: Date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `منذ ${mins} دقيقة`;
  const hours = Math.floor(mins / 60);
  return `منذ ${hours} ساعة`;
}

function getEventIcon(type: string) {
  switch (type) {
    case 'points_stolen': return '⚡';
    case 'alias_revealed': return '👁️';
    case 'tool_purchased': return '🛒';
    case 'reward_granted': return '🏆';
    case 'tool_used': return '🔧';
    case 'guess_made': return '🎯';
    default: return '📌';
  }
}

export default function Home() {
  const top3 = aliasLeaderboard.slice(0, 3);
  const rest = aliasLeaderboard.slice(3, 8);

  return (
    <AppLayout pageTitle="الرئيسية">
      {/* Hero Banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0D1B2A 0%, #1B2E45 50%, #0D1B2A 100%)',
          minHeight: '220px',
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663323706349/2kD9EDv64EXXMbrLeRwUa6/hero-bg-ZXEoekAdijFzio57v2Wdvp.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, #0D1B2A 0%, transparent 60%)' }} />

        <div className="relative container py-8 flex items-center justify-between">
          <div className="max-w-lg">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
              style={{ background: '#F7941D20', border: '1px solid #F7941D40', color: '#F7941D', fontFamily: 'Noto Kufi Arabic' }}
            >
              <Zap className="w-3 h-3" />
              الأسبوع الثالث جارٍ الآن
            </div>
            <h1
              className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight"
              style={{ fontFamily: 'Noto Kufi Arabic' }}
            >
              مرحباً بك في{' '}
              <span style={{ color: '#F7941D' }}>تواق 2</span>
            </h1>
            <p className="text-gray-300 text-base mb-4" style={{ fontFamily: 'Tajawal' }}>
              جيل يعلو ... وبالعلم يسمو
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/player">
                <button className="tawaq-btn-primary text-sm px-5 py-2.5">
                  صفحتي التنافسية
                </button>
              </Link>
              <Link href="/leaderboard">
                <button
                  className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-white/10"
                  style={{
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    fontFamily: 'Noto Kufi Arabic',
                  }}
                >
                  لوحة الترتيب
                </button>
              </Link>
            </div>
          </div>

          {/* Logo */}
          <div className="hidden md:block">
            <img
              src="/manus-storage/logo-yraa-tawaq_690a9f0d.png"
              alt="يراع تواق 2"
              className="h-32 w-auto object-contain opacity-90"
            />
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="المشاركون" value={weekStats.totalPlayers} color="#F7941D" sub="مشارك نشط" />
          <StatCard icon={Zap} label="النقاط الموزعة" value={weekStats.totalPointsDistributed.toLocaleString('ar')} color="#4CAF50" sub="هذا الأسبوع" />
          <StatCard icon={TrendingUp} label="الأكثر صعوداً" value={weekStats.topGainer} color="#2196F3" sub="هذا الأسبوع" />
          <StatCard icon={Eye} label="الأكثر غموضاً" value={weekStats.mostMysterious} color="#9C27B0" sub="لم يُكشف بعد" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard Preview */}
          <div className="lg:col-span-2">
            <div className="tawaq-card overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" style={{ color: '#F7941D' }} />
                  <h2 className="font-bold text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                    لوحة الترتيب
                  </h2>
                </div>
                <Link href="/leaderboard">
                  <button className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-white/8"
                    style={{ color: '#F7941D', fontFamily: 'Tajawal', border: '1px solid #F7941D30' }}>
                    عرض الكل
                  </button>
                </Link>
              </div>

              {/* Top 3 */}
              <div className="grid grid-cols-3 gap-3 p-4">
                {/* 2nd */}
                <div className="flex flex-col items-center pt-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black mb-2"
                    style={{ background: 'linear-gradient(135deg, #C0C0C0, #A8A8A8)', color: '#0D1B2A', fontFamily: 'Noto Kufi Arabic' }}>
                    2
                  </div>
                  <p className="text-sm font-bold text-white text-center" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                    {top3[1]?.alias}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#C0C0C0', fontFamily: 'Tajawal' }}>
                    {top3[1]?.points.toLocaleString('ar')} نقطة
                  </p>
                </div>
                {/* 1st */}
                <div className="flex flex-col items-center">
                  <div className="text-2xl mb-1">👑</div>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black mb-2 animate-pulse-orange"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#0D1B2A', fontFamily: 'Noto Kufi Arabic' }}>
                    1
                  </div>
                  <p className="text-sm font-bold text-white text-center" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                    {top3[0]?.alias}
                  </p>
                  <p className="text-xs mt-1 font-bold" style={{ color: '#FFD700', fontFamily: 'Tajawal' }}>
                    {top3[0]?.points.toLocaleString('ar')} نقطة
                  </p>
                </div>
                {/* 3rd */}
                <div className="flex flex-col items-center pt-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black mb-2"
                    style={{ background: 'linear-gradient(135deg, #CD7F32, #A0522D)', color: '#0D1B2A', fontFamily: 'Noto Kufi Arabic' }}>
                    3
                  </div>
                  <p className="text-sm font-bold text-white text-center" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                    {top3[2]?.alias}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#CD7F32', fontFamily: 'Tajawal' }}>
                    {top3[2]?.points.toLocaleString('ar')} نقطة
                  </p>
                </div>
              </div>

              {/* Rest */}
              <div className="px-4 pb-4 space-y-2">
                {rest.map((item, i) => (
                  <div
                    key={item.alias}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-white/5"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className="w-6 text-center text-sm font-bold text-gray-500" style={{ fontFamily: 'Tajawal' }}>
                      {i + 4}
                    </span>
                    <div className="flex-1">
                      <span className="text-sm font-bold text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                        {item.alias}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendIcon trend={item.trend} />
                      <span className="text-sm text-gray-300" style={{ fontFamily: 'Tajawal' }}>
                        {item.points.toLocaleString('ar')}
                      </span>
                    </div>
                    {item.tools > 0 && (
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{item.tools}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Recent Events */}
            <div className="tawaq-card overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/6">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: '#F7941D' }} />
                  <h2 className="font-bold text-white text-sm" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                    آخر الأحداث
                  </h2>
                </div>
                <Link href="/events">
                  <button className="text-xs text-gray-400 hover:text-orange-400 transition-colors" style={{ fontFamily: 'Tajawal' }}>
                    الكل
                  </button>
                </Link>
              </div>
              <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                {recentEvents.slice(0, 5).map((event, i) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/4 transition-colors"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <span className="text-base flex-shrink-0 mt-0.5">{getEventIcon(event.type)}</span>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-300 leading-relaxed" style={{ fontFamily: 'Tajawal' }}>
                        {event.description}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: 'Tajawal' }}>
                        {formatTime(event.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Point Sources */}
            <div className="tawaq-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4" style={{ color: '#F7941D' }} />
                <h2 className="font-bold text-white text-sm" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                  مصادر النقاط
                </h2>
              </div>
              <div className="space-y-2">
                {pointSources.map((source) => (
                  <div key={source.category} className="flex items-center gap-2">
                    <span className="text-base">{source.icon}</span>
                    <span className="text-xs text-gray-300 flex-1" style={{ fontFamily: 'Tajawal' }}>
                      {source.category}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: source.color }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Program Ad */}
        <div className="tawaq-card overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-white/6">
            <img
              src="/manus-storage/logo-tawaq2_0eab904d.png"
              alt="تواق 2"
              className="h-8 w-auto"
            />
            <div>
              <h3 className="font-bold text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                برنامج تواق 2 — برنامج علمي تأسيسي تربوي
              </h3>
              <p className="text-xs text-gray-400" style={{ fontFamily: 'Tajawal' }}>
                علمي · ثقافي · ترفيهي · تنافسي
              </p>
            </div>
          </div>
          <div className="p-4">
            <img
              src="/manus-storage/ad-tawaq2_9c4e5fff.jpg"
              alt="إعلان تواق 2"
              className="w-full max-w-lg mx-auto rounded-xl object-contain"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
