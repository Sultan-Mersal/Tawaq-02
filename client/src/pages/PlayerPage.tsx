// ============================================================
// PlayerPage - صفحة اللاعب الشخصية
// Design: Dark Tournament Theme
// ============================================================

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { currentPlayerData, aliasLeaderboard } from '@/lib/data';
import { Zap, Shield, Eye, TrendingUp, Target, RefreshCw, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-400" style={{ fontFamily: 'Tajawal' }}>{label}</span>
        <span className="text-xs font-bold text-white" style={{ fontFamily: 'Tajawal' }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function PlayerPage() {
  const player = currentPlayerData;
  const [aliases, setAliases] = useState(player.aliases);
  const [totalPoints] = useState(player.totalPoints);
  const [distributeMode, setDistributeMode] = useState(false);
  const [tempPoints, setTempPoints] = useState(player.aliases.map(a => a.points));

  const handleDistribute = () => {
    const total = tempPoints.reduce((a, b) => a + b, 0);
    if (total !== totalPoints) {
      toast.error(`مجموع النقاط يجب أن يساوي ${totalPoints} نقطة`);
      return;
    }
    setAliases(aliases.map((a, i) => ({ ...a, points: tempPoints[i] })));
    setDistributeMode(false);
    toast.success('تم توزيع النقاط بنجاح!');
  };

  const getRankForAlias = (aliasName: string) => {
    const found = aliasLeaderboard.findIndex(a => a.alias === aliasName);
    return found >= 0 ? found + 1 : '-';
  };

  return (
    <AppLayout pageTitle="صفحتي التنافسية">
      <div className="container py-6 space-y-6">
        {/* Profile Header */}
        <div
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1B2E45, #243B55)',
            border: '1px solid rgba(247,148,29,0.2)',
          }}
        >
          <div className="absolute top-0 left-0 w-48 h-48 rounded-full opacity-5"
            style={{ background: '#F7941D', transform: 'translate(-30%, -30%)' }} />
          <div className="relative flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #F7941D, #FFB347)', color: '#0D1B2A', fontFamily: 'Noto Kufi Arabic' }}
            >
              أ
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-white mb-1" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                {player.realName}
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold"
                  style={{ background: '#F7941D20', border: '1px solid #F7941D40', color: '#F7941D', fontFamily: 'Noto Kufi Arabic' }}>
                  <Zap className="w-3.5 h-3.5" />
                  {totalPoints.toLocaleString('ar')} نقطة إجمالية
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#ccc', fontFamily: 'Tajawal' }}>
                  <Shield className="w-3.5 h-3.5" />
                  {player.ownedTools.length} أدوات
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Aliases Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="tawaq-card overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" style={{ color: '#F7941D' }} />
                  <h2 className="font-bold text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                    أسمائي المستعارة
                  </h2>
                </div>
                <button
                  onClick={() => setDistributeMode(!distributeMode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style={{
                    background: distributeMode ? '#F7941D' : '#F7941D20',
                    color: distributeMode ? '#0D1B2A' : '#F7941D',
                    border: '1px solid #F7941D40',
                    fontFamily: 'Noto Kufi Arabic',
                  }}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {distributeMode ? 'إلغاء' : 'توزيع النقاط'}
                </button>
              </div>

              <div className="p-4 space-y-3">
                {aliases.map((alias, i) => {
                  const rank = getRankForAlias(alias.name);
                  const pct = Math.round((alias.points / totalPoints) * 100);
                  return (
                    <div
                      key={alias.name}
                      className="rounded-xl p-4"
                      style={{
                        background: 'linear-gradient(135deg, rgba(247,148,29,0.08), rgba(247,148,29,0.04))',
                        border: '1px solid rgba(247,148,29,0.15)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm"
                            style={{
                              background: i === 0
                                ? 'linear-gradient(135deg, #FFD700, #FFA500)'
                                : i === 1
                                  ? 'linear-gradient(135deg, #C0C0C0, #A8A8A8)'
                                  : 'linear-gradient(135deg, #CD7F32, #A0522D)',
                              color: '#0D1B2A',
                              fontFamily: 'Noto Kufi Arabic',
                            }}
                          >
                            {['أ', 'ب', 'ج'][i]}
                          </div>
                          <div>
                            <p className="font-bold text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                              {alias.name}
                            </p>
                            <p className="text-xs text-gray-400" style={{ fontFamily: 'Tajawal' }}>
                              المركز #{rank} في الترتيب العام
                            </p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="font-black text-lg" style={{ color: '#F7941D', fontFamily: 'Tajawal' }}>
                            {alias.points.toLocaleString('ar')}
                          </p>
                          <p className="text-xs text-gray-500" style={{ fontFamily: 'Tajawal' }}>
                            {pct}% من إجماليك
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: i === 0
                              ? 'linear-gradient(90deg, #FFD700, #FFA500)'
                              : i === 1
                                ? 'linear-gradient(90deg, #C0C0C0, #A8A8A8)'
                                : 'linear-gradient(90deg, #CD7F32, #A0522D)',
                          }}
                        />
                      </div>

                      {/* Distribute Controls */}
                      {distributeMode && (
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => {
                              const newPoints = [...tempPoints];
                              if (newPoints[i] >= 10) newPoints[i] -= 10;
                              setTempPoints(newPoints);
                            }}
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                            style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#F7941D' }}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="flex-1 text-center">
                            <span className="font-bold text-white" style={{ fontFamily: 'Tajawal' }}>
                              {tempPoints[i].toLocaleString('ar')} نقطة
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              const newPoints = [...tempPoints];
                              newPoints[i] += 10;
                              setTempPoints(newPoints);
                            }}
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                            style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#F7941D' }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

                {distributeMode && (
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleDistribute}
                      className="tawaq-btn-primary flex-1 py-2.5 text-sm"
                    >
                      حفظ التوزيع
                    </button>
                    <button
                      onClick={() => {
                        setTempPoints(player.aliases.map(a => a.points));
                        setDistributeMode(false);
                      }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors hover:bg-white/8"
                      style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#ccc', fontFamily: 'Noto Kufi Arabic' }}
                    >
                      إلغاء
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Guess System */}
            <div className="tawaq-card overflow-hidden">
              <div className="flex items-center gap-2 p-4 border-b border-white/6">
                <Eye className="w-5 h-5" style={{ color: '#F7941D' }} />
                <h2 className="font-bold text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                  نظام التخمين
                </h2>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'Tajawal' }}>
                  حاول معرفة صاحب اسم مستعار. إذا أصبت حصلت على مكافأة، وإذا أخطأت خسرت نقاطاً.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl p-3" style={{ background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.2)' }}>
                    <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Tajawal' }}>إذا أصبت</p>
                    <p className="font-bold text-green-400 text-sm" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                      +50 نقطة مكافأة
                    </p>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Tajawal' }}>+ كشف الهوية</p>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: 'rgba(244,67,54,0.1)', border: '1px solid rgba(244,67,54,0.2)' }}>
                    <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Tajawal' }}>إذا أخطأت</p>
                    <p className="font-bold text-red-400 text-sm" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                      -30 نقطة
                    </p>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Tajawal' }}>أو خسارة أداة</p>
                  </div>
                </div>
                <button
                  onClick={() => toast.info('سيتم تفعيل نظام التخمين قريباً')}
                  className="tawaq-btn-primary w-full mt-4 py-2.5 text-sm"
                >
                  بدء التخمين
                </button>
              </div>
            </div>
          </div>

          {/* Stats Column */}
          <div className="space-y-4">
            {/* Personal Stats */}
            <div className="tawaq-card p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4" style={{ color: '#F7941D' }} />
                <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                  إحصائياتي
                </h3>
              </div>
              <div className="space-y-3">
                <StatBar label="الحضور" value={player.stats.attendance} color="linear-gradient(90deg, #4CAF50, #66BB6A)" />
                <StatBar label="الحفظ" value={player.stats.memorization} color="linear-gradient(90deg, #2196F3, #42A5F5)" />
                <StatBar label="القراءة" value={player.stats.reading} color="linear-gradient(90deg, #F7941D, #FFB347)" />
                <StatBar label="التلخيص" value={player.stats.summary} color="linear-gradient(90deg, #9C27B0, #BA68C8)" />
              </div>
            </div>

            {/* Activity Stats */}
            <div className="tawaq-card p-4">
              <h3 className="font-bold text-white text-sm mb-3" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                نشاط التنافس
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'نقاط مكتسبة', value: player.stats.pointsEarned.toLocaleString('ar'), color: '#4CAF50' },
                  { label: 'نقاط مفقودة', value: player.stats.pointsLost.toLocaleString('ar'), color: '#F44336' },
                  { label: 'كشف آخرين', value: player.stats.revealedOthers, color: '#F7941D' },
                  { label: 'انكشافي', value: player.stats.revealedBy, color: '#9C27B0' },
                  { label: 'أدوات مستخدمة', value: player.stats.toolsUsed, color: '#2196F3' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-1">
                    <span className="text-xs text-gray-400" style={{ fontFamily: 'Tajawal' }}>{stat.label}</span>
                    <span className="text-sm font-bold" style={{ color: stat.color, fontFamily: 'Tajawal' }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Owned Tools */}
            <div className="tawaq-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4" style={{ color: '#F7941D' }} />
                <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                  أدواتي
                </h3>
              </div>
              {player.ownedTools.length > 0 ? (
                <div className="space-y-2">
                  {player.ownedTools.map((tool) => (
                    <div
                      key={tool}
                      className="flex items-center justify-between px-3 py-2 rounded-lg"
                      style={{ background: 'rgba(247,148,29,0.08)', border: '1px solid rgba(247,148,29,0.15)' }}
                    >
                      <span className="text-sm text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>{tool}</span>
                      <button
                        onClick={() => toast.info(`استخدام: ${tool}`)}
                        className="text-xs px-2 py-1 rounded transition-colors hover:bg-orange-500/20"
                        style={{ color: '#F7941D', fontFamily: 'Tajawal' }}
                      >
                        استخدام
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 text-center py-3" style={{ fontFamily: 'Tajawal' }}>
                  لا توجد أدوات حالياً
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
