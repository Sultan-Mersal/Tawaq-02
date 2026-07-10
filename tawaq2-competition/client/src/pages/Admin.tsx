// ============================================================
// Admin Page - لوحة المشرف
// Design: Dark Tournament Theme with admin controls
// ============================================================

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { aliasLeaderboard, weeklyRewards, pointSources } from '@/lib/data';
import { Settings, Plus, Minus, Eye, Shield, Trophy, BarChart3, Lock, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const adminPassword = '1234'; // Demo password

const chartData = aliasLeaderboard.slice(0, 8).map(item => ({
  name: item.alias,
  نقاط: item.points,
}));

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedAlias, setSelectedAlias] = useState('');
  const [pointsToAdd, setPointsToAdd] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'points' | 'tools' | 'weekly'>('overview');

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      toast.success('تم تسجيل الدخول كمشرف');
    } else {
      toast.error('كلمة المرور غير صحيحة');
    }
  };

  const handleAddPoints = () => {
    if (!selectedAlias) { toast.error('اختر اسماً مستعاراً'); return; }
    if (pointsToAdd === 0) { toast.error('أدخل عدد النقاط'); return; }
    toast.success(`تم ${pointsToAdd > 0 ? 'إضافة' : 'خصم'} ${Math.abs(pointsToAdd)} نقطة من "${selectedAlias}"`);
  };

  if (!isAuthenticated) {
    return (
      <AppLayout pageTitle="لوحة المشرف">
        <div className="container py-12 flex items-center justify-center min-h-[60vh]">
          <div
            className="w-full max-w-sm rounded-2xl p-8"
            style={{
              background: 'linear-gradient(135deg, #1B2E45, #243B55)',
              border: '1px solid rgba(247,148,29,0.2)',
            }}
          >
            <div className="text-center mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, #F7941D, #FFB347)' }}
              >
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-black text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                لوحة المشرف
              </h2>
              <p className="text-sm text-gray-400 mt-1" style={{ fontFamily: 'Tajawal' }}>
                أدخل كلمة المرور للوصول
              </p>
            </div>
            <div className="space-y-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="كلمة المرور"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: 'Tajawal',
                  direction: 'rtl',
                }}
              />
              <button onClick={handleLogin} className="tawaq-btn-primary w-full py-3">
                دخول
              </button>
              <p className="text-xs text-center text-gray-600" style={{ fontFamily: 'Tajawal' }}>
                كلمة المرور التجريبية: 1234
              </p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout pageTitle="لوحة المشرف">
      {/* Header */}
      <div
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, #0D1B2A 0%, #1B2E45 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="container flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Settings className="w-6 h-6" style={{ color: '#F7941D' }} />
              <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                لوحة المشرف
              </h1>
            </div>
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Tajawal' }}>
              إدارة كاملة للمسابقة والنقاط والأدوات
            </p>
          </div>
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: '#4CAF5020', border: '1px solid #4CAF5040', color: '#4CAF50', fontFamily: 'Tajawal' }}
          >
            ✓ مشرف نشط
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { key: 'overview', label: 'نظرة عامة', icon: <BarChart3 className="w-4 h-4" /> },
            { key: 'points', label: 'إدارة النقاط', icon: <Zap className="w-4 h-4" /> },
            { key: 'tools', label: 'الأدوات', icon: <Shield className="w-4 h-4" /> },
            { key: 'weekly', label: 'الجوائز الأسبوعية', icon: <Trophy className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex-shrink-0"
              style={{
                background: activeTab === tab.key ? '#F7941D' : 'rgba(255,255,255,0.06)',
                color: activeTab === tab.key ? '#0D1B2A' : '#ccc',
                fontFamily: 'Noto Kufi Arabic',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Chart */}
            <div className="tawaq-card p-5">
              <h3 className="font-bold text-white mb-4" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                ترتيب الأسماء المستعارة — رسم بياني
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: '#8FA3B8', fontSize: 11, fontFamily: 'Noto Kufi Arabic' }} />
                  <YAxis tick={{ fill: '#8FA3B8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: '#1B2E45', border: '1px solid rgba(247,148,29,0.3)', borderRadius: '8px', color: '#fff' }}
                    labelStyle={{ fontFamily: 'Noto Kufi Arabic', color: '#F7941D' }}
                  />
                  <Bar dataKey="نقاط" fill="#F7941D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Real Rankings (Admin Only) */}
            <div className="tawaq-card overflow-hidden">
              <div className="flex items-center gap-2 p-4 border-b border-white/6">
                <Eye className="w-5 h-5" style={{ color: '#F7941D' }} />
                <h3 className="font-bold text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                  الترتيب الحقيقي (للمشرف فقط)
                </h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full mr-auto"
                  style={{ background: '#F7941D20', color: '#F7941D', fontFamily: 'Tajawal' }}
                >
                  سري
                </span>
              </div>
              <div className="divide-y divide-white/4">
                {[
                  { name: 'أحمد محمد', alias: 'الصقر', points: 1250, rank: 1 },
                  { name: 'خالد عبدالله', alias: 'البرق', points: 1180, rank: 2 },
                  { name: 'محمد سالم', alias: 'الذئب', points: 1050, rank: 3 },
                  { name: 'عبدالرحمن علي', alias: 'الأسد', points: 980, rank: 4 },
                  { name: 'يوسف إبراهيم', alias: 'النسر', points: 920, rank: 5 },
                ].map((player) => (
                  <div key={player.name} className="flex items-center gap-4 px-4 py-3 hover:bg-white/3 transition-colors">
                    <span className="w-6 text-center text-sm font-bold text-gray-500" style={{ fontFamily: 'Tajawal' }}>
                      {player.rank}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                        {player.name}
                      </p>
                      <p className="text-xs text-gray-400" style={{ fontFamily: 'Tajawal' }}>
                        الاسم المستعار: {player.alias}
                      </p>
                    </div>
                    <span className="font-bold" style={{ color: '#F7941D', fontFamily: 'Tajawal' }}>
                      {player.points.toLocaleString('ar')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Points Tab */}
        {activeTab === 'points' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="tawaq-card p-5">
              <h3 className="font-bold text-white mb-4" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                إضافة / خصم نقاط
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block" style={{ fontFamily: 'Tajawal' }}>
                    اختر الاسم المستعار
                  </label>
                  <select
                    value={selectedAlias}
                    onChange={(e) => setSelectedAlias(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-white outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: 'Noto Kufi Arabic',
                    }}
                  >
                    <option value="" style={{ background: '#1B2E45' }}>-- اختر --</option>
                    {aliasLeaderboard.map(a => (
                      <option key={a.alias} value={a.alias} style={{ background: '#1B2E45' }}>
                        {a.alias} ({a.points} نقطة)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block" style={{ fontFamily: 'Tajawal' }}>
                    عدد النقاط (سالب للخصم)
                  </label>
                  <input
                    type="number"
                    value={pointsToAdd}
                    onChange={(e) => setPointsToAdd(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl text-white outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: 'Tajawal',
                    }}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setPointsToAdd(Math.abs(pointsToAdd)); handleAddPoints(); }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                    style={{ background: '#4CAF5020', border: '1px solid #4CAF5040', color: '#4CAF50', fontFamily: 'Noto Kufi Arabic' }}
                  >
                    <Plus className="w-4 h-4" />
                    إضافة
                  </button>
                  <button
                    onClick={() => { setPointsToAdd(-Math.abs(pointsToAdd)); handleAddPoints(); }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                    style={{ background: '#F4433620', border: '1px solid #F4433640', color: '#F44336', fontFamily: 'Noto Kufi Arabic' }}
                  >
                    <Minus className="w-4 h-4" />
                    خصم
                  </button>
                </div>
              </div>
            </div>

            {/* Point Sources Reference */}
            <div className="tawaq-card p-5">
              <h3 className="font-bold text-white mb-4" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                مصادر النقاط المرجعية
              </h3>
              <div className="space-y-3">
                {pointSources.map((source) => (
                  <div key={source.category} className="rounded-xl p-3"
                    style={{ background: `${source.color}10`, border: `1px solid ${source.color}25` }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span>{source.icon}</span>
                      <span className="font-bold text-sm text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                        {source.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {source.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${source.color}20`, color: source.color, fontFamily: 'Tajawal' }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="tawaq-card p-5">
            <h3 className="font-bold text-white mb-4" style={{ fontFamily: 'Noto Kufi Arabic' }}>
              إدارة الأدوات
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'منح أداة لاعب', icon: '🎁', action: () => toast.success('تم منح الأداة') },
                { label: 'تجميد الأدوات', icon: '❄️', action: () => toast.info('تم تجميد الأدوات مؤقتاً') },
                { label: 'كشف هوية', icon: '👁️', action: () => toast.success('تم كشف الهوية') },
                { label: 'تعديل الترتيب', icon: '📊', action: () => toast.info('وضع تعديل الترتيب') },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={action.action}
                  className="flex items-center gap-3 p-4 rounded-xl text-right transition-all hover:bg-white/8"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="font-bold text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Weekly Tab */}
        {activeTab === 'weekly' && (
          <div className="space-y-4">
            <div className="tawaq-card p-5">
              <h3 className="font-bold text-white mb-4" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                إدارة الجوائز الأسبوعية
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {weeklyRewards.map((reward) => (
                  <div
                    key={reward.rank}
                    className="rounded-xl p-4"
                    style={{ background: `${reward.color}10`, border: `1px solid ${reward.color}30` }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-black"
                        style={{ background: reward.color, color: '#0D1B2A', fontFamily: 'Noto Kufi Arabic' }}
                      >
                        {reward.rank}
                      </div>
                      <span className="font-bold" style={{ color: reward.color, fontFamily: 'Noto Kufi Arabic' }}>
                        {reward.title}
                      </span>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {reward.prizes.map((prize) => (
                        <li key={prize} className="text-xs text-gray-300" style={{ fontFamily: 'Tajawal' }}>
                          • {prize}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => toast.success(`تم منح جائزة المركز ${reward.rank}`)}
                      className="w-full py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90"
                      style={{ background: `${reward.color}25`, color: reward.color, border: `1px solid ${reward.color}40`, fontFamily: 'Noto Kufi Arabic' }}
                    >
                      منح الجائزة
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
