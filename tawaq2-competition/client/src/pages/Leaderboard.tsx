// ============================================================
// Leaderboard Page - لوحة الترتيب
// Design: Dark Tournament Theme with podium + full rankings
// ============================================================

import AppLayout from '@/components/AppLayout';
import { aliasLeaderboard, weekStats, weeklyRewards } from '@/lib/data';
import { Trophy, TrendingUp, ArrowUp, ArrowDown, Minus, Shield, Zap, Star } from 'lucide-react';

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <ArrowUp className="w-3.5 h-3.5 text-green-400" />;
  if (trend === 'down') return <ArrowDown className="w-3.5 h-3.5 text-red-400" />;
  return <Minus className="w-3.5 h-3.5 text-gray-500" />;
}

function getRankStyle(rank: number) {
  if (rank === 1) return { bg: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#0D1B2A', glow: '#FFD70040' };
  if (rank === 2) return { bg: 'linear-gradient(135deg, #C0C0C0, #A8A8A8)', color: '#0D1B2A', glow: '#C0C0C040' };
  if (rank === 3) return { bg: 'linear-gradient(135deg, #CD7F32, #A0522D)', color: '#fff', glow: '#CD7F3240' };
  return { bg: 'rgba(255,255,255,0.08)', color: '#fff', glow: 'transparent' };
}

export default function Leaderboard() {
  const top3 = aliasLeaderboard.slice(0, 3);
  const maxPoints = aliasLeaderboard[0].points;

  return (
    <AppLayout pageTitle="لوحة الترتيب">
      {/* Header Banner */}
      <div
        className="relative overflow-hidden py-8"
        style={{
          background: 'linear-gradient(135deg, #0D1B2A 0%, #1B2E45 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663323706349/2kD9EDv64EXXMbrLeRwUa6/leaderboard-bg-C7VXEpe5V9kxgGWggp5hQG.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-7 h-7" style={{ color: '#F7941D' }} />
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
              لوحة الترتيب
            </h1>
          </div>
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'Tajawal' }}>
            الأسبوع {weekStats.week} — ترتيب الأسماء المستعارة فقط
          </p>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Podium Top 3 */}
        <div className="tawaq-card p-6">
          <h2 className="text-center font-bold text-white mb-6 text-lg" style={{ fontFamily: 'Noto Kufi Arabic' }}>
            🏆 المراكز الثلاثة الأولى
          </h2>
          <div className="flex items-end justify-center gap-4 mb-6">
            {/* 2nd Place */}
            <div className="flex flex-col items-center flex-1 max-w-[140px]">
              <div className="text-3xl mb-2">🥈</div>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black mb-3"
                style={{ background: getRankStyle(2).bg, color: getRankStyle(2).color, fontFamily: 'Noto Kufi Arabic' }}
              >
                2
              </div>
              <div
                className="w-full rounded-t-xl flex flex-col items-center py-4 px-2"
                style={{ background: 'linear-gradient(180deg, #C0C0C020, #C0C0C010)', border: '1px solid #C0C0C030', minHeight: '80px' }}
              >
                <p className="font-bold text-white text-center text-sm" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                  {top3[1]?.alias}
                </p>
                <p className="text-sm mt-1 font-bold" style={{ color: '#C0C0C0', fontFamily: 'Tajawal' }}>
                  {top3[1]?.points.toLocaleString('ar')}
                </p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center flex-1 max-w-[160px]">
              <div className="text-4xl mb-2">👑</div>
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mb-3 animate-pulse-orange"
                style={{ background: getRankStyle(1).bg, color: getRankStyle(1).color, fontFamily: 'Noto Kufi Arabic', boxShadow: '0 0 30px #FFD70050' }}
              >
                1
              </div>
              <div
                className="w-full rounded-t-xl flex flex-col items-center py-5 px-2"
                style={{ background: 'linear-gradient(180deg, #FFD70020, #FFD70010)', border: '1px solid #FFD70040', minHeight: '100px' }}
              >
                <p className="font-bold text-white text-center" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                  {top3[0]?.alias}
                </p>
                <p className="text-base mt-1 font-black" style={{ color: '#FFD700', fontFamily: 'Tajawal' }}>
                  {top3[0]?.points.toLocaleString('ar')}
                </p>
                <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'Tajawal' }}>نقطة</p>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center flex-1 max-w-[140px]">
              <div className="text-3xl mb-2">🥉</div>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black mb-3"
                style={{ background: getRankStyle(3).bg, color: getRankStyle(3).color, fontFamily: 'Noto Kufi Arabic' }}
              >
                3
              </div>
              <div
                className="w-full rounded-t-xl flex flex-col items-center py-4 px-2"
                style={{ background: 'linear-gradient(180deg, #CD7F3220, #CD7F3210)', border: '1px solid #CD7F3230', minHeight: '60px' }}
              >
                <p className="font-bold text-white text-center text-sm" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                  {top3[2]?.alias}
                </p>
                <p className="text-sm mt-1 font-bold" style={{ color: '#CD7F32', fontFamily: 'Tajawal' }}>
                  {top3[2]?.points.toLocaleString('ar')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Full Rankings */}
          <div className="lg:col-span-2 tawaq-card overflow-hidden">
            <div className="flex items-center gap-2 p-4 border-b border-white/6">
              <TrendingUp className="w-5 h-5" style={{ color: '#F7941D' }} />
              <h2 className="font-bold text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                الترتيب الكامل
              </h2>
            </div>
            <div className="divide-y divide-white/4">
              {aliasLeaderboard.map((item, i) => {
                const rank = i + 1;
                const rankStyle = getRankStyle(rank);
                const pct = Math.round((item.points / maxPoints) * 100);
                return (
                  <div
                    key={item.alias}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-white/3 transition-colors"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {/* Rank */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0"
                      style={{ background: rankStyle.bg, color: rankStyle.color, fontFamily: 'Noto Kufi Arabic' }}
                    >
                      {rank}
                    </div>

                    {/* Name + Bar */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                          {item.alias}
                        </span>
                        <TrendIcon trend={item.trend} />
                        {item.tools > 0 && (
                          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded"
                            style={{ background: '#F7941D15', border: '1px solid #F7941D30' }}>
                            <Shield className="w-3 h-3" style={{ color: '#F7941D' }} />
                            <span className="text-xs" style={{ color: '#F7941D', fontFamily: 'Tajawal' }}>{item.tools}</span>
                          </div>
                        )}
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background: rank === 1
                              ? 'linear-gradient(90deg, #FFD700, #FFA500)'
                              : rank === 2
                                ? 'linear-gradient(90deg, #C0C0C0, #A8A8A8)'
                                : rank === 3
                                  ? 'linear-gradient(90deg, #CD7F32, #A0522D)'
                                  : 'linear-gradient(90deg, #F7941D, #FFB347)',
                          }}
                        />
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-left flex-shrink-0">
                      <p className="font-bold text-white text-sm" style={{ fontFamily: 'Tajawal' }}>
                        {item.points.toLocaleString('ar')}
                      </p>
                      <p className="text-xs text-gray-500" style={{ fontFamily: 'Tajawal' }}>نقطة</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Rewards */}
          <div className="space-y-4">
            <div className="tawaq-card overflow-hidden">
              <div className="flex items-center gap-2 p-4 border-b border-white/6">
                <Star className="w-4 h-4" style={{ color: '#F7941D' }} />
                <h2 className="font-bold text-white text-sm" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                  جوائز الأسبوع
                </h2>
              </div>
              <div className="p-4 space-y-4">
                {weeklyRewards.map((reward) => (
                  <div
                    key={reward.rank}
                    className="rounded-xl p-3"
                    style={{
                      background: `${reward.color}10`,
                      border: `1px solid ${reward.color}30`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-black"
                        style={{ background: reward.color, color: '#0D1B2A', fontFamily: 'Noto Kufi Arabic' }}
                      >
                        {reward.rank}
                      </div>
                      <span className="font-bold text-sm" style={{ color: reward.color, fontFamily: 'Noto Kufi Arabic' }}>
                        {reward.title}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {reward.prizes.map((prize) => (
                        <li key={prize} className="flex items-center gap-2 text-xs text-gray-300" style={{ fontFamily: 'Tajawal' }}>
                          <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: reward.color }} />
                          {prize}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Week Stats */}
            <div className="tawaq-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4" style={{ color: '#F7941D' }} />
                <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                  إحصائيات الأسبوع
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'الأكثر صعوداً', value: weekStats.topGainer, icon: '📈' },
                  { label: 'الأكثر غموضاً', value: weekStats.mostMysterious, icon: '🌫️' },
                  { label: 'أكثر أدوات', value: weekStats.mostToolsUsed, icon: '⚡' },
                  { label: 'الأكثر كشفاً', value: weekStats.mostRevealed, icon: '👁️' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{stat.icon}</span>
                      <span className="text-xs text-gray-400" style={{ fontFamily: 'Tajawal' }}>{stat.label}</span>
                    </div>
                    <span className="text-xs font-bold text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
