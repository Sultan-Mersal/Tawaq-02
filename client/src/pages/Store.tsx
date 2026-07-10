// ============================================================
// Store Page - متجر الأدوات
// Design: Dark Tournament Theme with tool cards
// ============================================================

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { tools } from '@/lib/data';
import { ShoppingBag, Zap, Filter } from 'lucide-react';
import { toast } from 'sonner';

const rarityConfig = {
  common: { label: 'عادي', color: '#9E9E9E', bg: '#9E9E9E15' },
  rare: { label: 'نادر', color: '#2196F3', bg: '#2196F315' },
  legendary: { label: 'أسطوري', color: '#FFD700', bg: '#FFD70015' },
};

const categoryConfig = {
  defense: { label: 'دفاع', icon: '🛡️', color: '#4CAF50' },
  attack: { label: 'هجوم', icon: '⚡', color: '#F44336' },
  utility: { label: 'أداة', icon: '🔧', color: '#2196F3' },
  special: { label: 'خاص', icon: '✨', color: '#9C27B0' },
};

export default function Store() {
  const [playerPoints] = useState(1250);
  const [filter, setFilter] = useState<'all' | 'defense' | 'attack' | 'utility' | 'special'>('all');
  const [purchasedTools, setPurchasedTools] = useState<string[]>([]);

  const filteredTools = filter === 'all' ? tools : tools.filter(t => t.category === filter);

  const handleBuy = (tool: typeof tools[0]) => {
    if (playerPoints < tool.cost) {
      toast.error('نقاطك غير كافية لشراء هذه الأداة');
      return;
    }
    if (purchasedTools.includes(tool.id)) {
      toast.info('لديك هذه الأداة بالفعل');
      return;
    }
    setPurchasedTools([...purchasedTools, tool.id]);
    toast.success(`تم شراء "${tool.name}" بنجاح! 🎉`);
  };

  return (
    <AppLayout pageTitle="متجر الأدوات">
      {/* Header */}
      <div
        className="relative overflow-hidden py-6"
        style={{
          background: 'linear-gradient(135deg, #0D1B2A 0%, #1B2E45 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663323706349/2kD9EDv64EXXMbrLeRwUa6/tools-bg-7N6FAdTUSXNfsLEhGXSLnY.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <ShoppingBag className="w-6 h-6" style={{ color: '#F7941D' }} />
                <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                  متجر الأدوات
                </h1>
              </div>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'Tajawal' }}>
                اشترِ الأدوات بنقاطك أو احصل عليها كمكافآت
              </p>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ background: '#F7941D20', border: '1px solid #F7941D40' }}
            >
              <Zap className="w-4 h-4" style={{ color: '#F7941D' }} />
              <span className="font-black text-lg" style={{ color: '#F7941D', fontFamily: 'Noto Kufi Arabic' }}>
                {playerPoints.toLocaleString('ar')}
              </span>
              <span className="text-xs text-gray-400" style={{ fontFamily: 'Tajawal' }}>نقطة</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          {[
            { key: 'all', label: 'الكل', icon: '🎮' },
            { key: 'defense', label: 'دفاع', icon: '🛡️' },
            { key: 'attack', label: 'هجوم', icon: '⚡' },
            { key: 'utility', label: 'أداة', icon: '🔧' },
            { key: 'special', label: 'خاص', icon: '✨' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all flex-shrink-0"
              style={{
                background: filter === f.key ? '#F7941D' : 'rgba(255,255,255,0.06)',
                color: filter === f.key ? '#0D1B2A' : '#ccc',
                border: filter === f.key ? 'none' : '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'Noto Kufi Arabic',
              }}
            >
              <span>{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool, i) => {
            const rarity = rarityConfig[tool.rarity];
            const category = categoryConfig[tool.category];
            const isPurchased = purchasedTools.includes(tool.id);
            const canAfford = playerPoints >= tool.cost;

            return (
              <div
                key={tool.id}
                className="tawaq-card overflow-hidden flex flex-col"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* Rarity Badge */}
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: rarity.bg, color: rarity.color, border: `1px solid ${rarity.color}30`, fontFamily: 'Tajawal' }}
                  >
                    {rarity.label}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${category.color}15`, color: category.color, fontFamily: 'Tajawal' }}
                  >
                    {category.icon} {category.label}
                  </span>
                </div>

                {/* Tool Icon */}
                <div className="flex items-center justify-center py-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${rarity.color}20, ${rarity.color}10)`,
                      border: `1px solid ${rarity.color}30`,
                      boxShadow: tool.rarity === 'legendary' ? `0 0 20px ${rarity.color}30` : undefined,
                    }}
                  >
                    {tool.icon}
                  </div>
                </div>

                {/* Tool Info */}
                <div className="px-4 pb-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-white mb-1" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed flex-1 mb-3" style={{ fontFamily: 'Tajawal' }}>
                    {tool.description}
                  </p>

                  {/* Price + Buy */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" style={{ color: '#F7941D' }} />
                      <span className="font-black" style={{ color: '#F7941D', fontFamily: 'Tajawal' }}>
                        {tool.cost.toLocaleString('ar')}
                      </span>
                    </div>
                    <button
                      onClick={() => handleBuy(tool)}
                      disabled={isPurchased}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                      style={{
                        background: isPurchased
                          ? 'rgba(76,175,80,0.2)'
                          : canAfford
                            ? 'linear-gradient(135deg, #F7941D, #FFB347)'
                            : 'rgba(255,255,255,0.06)',
                        color: isPurchased ? '#4CAF50' : canAfford ? '#0D1B2A' : '#666',
                        cursor: isPurchased ? 'default' : canAfford ? 'pointer' : 'not-allowed',
                        fontFamily: 'Noto Kufi Arabic',
                      }}
                    >
                      {isPurchased ? '✓ مشترى' : canAfford ? 'شراء' : 'غير كافٍ'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rules */}
        <div className="tawaq-card p-5">
          <h3 className="font-bold text-white mb-3" style={{ fontFamily: 'Noto Kufi Arabic' }}>
            قواعد المتجر
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🎯', title: '70% إنجاز', desc: 'معظم نقاطك تأتي من الإنجازات العلمية' },
              { icon: '⚖️', title: '30% تنافس', desc: 'الأدوات وسيلة تحفيز، ليست الهدف الأساسي' },
              { icon: '👨‍🏫', title: 'إشراف المشرف', desc: 'للمشرف حق تعديل أي نتيجة حفاظاً على العدالة' },
            ].map((rule) => (
              <div
                key={rule.title}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-xl flex-shrink-0">{rule.icon}</span>
                <div>
                  <p className="font-bold text-white text-sm mb-1" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                    {rule.title}
                  </p>
                  <p className="text-xs text-gray-400" style={{ fontFamily: 'Tajawal' }}>
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
