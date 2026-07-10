// ============================================================
// تواق 2 - بيانات تجريبية للموقع
// ============================================================

export interface Player {
  id: string;
  realName: string;
  aliases: Alias[];
  totalPoints: number;
  stats: PlayerStats;
}

export interface Alias {
  id: string;
  name: string;
  points: number;
  isRevealed: boolean;
  rank?: number;
  tools: string[];
}

export interface PlayerStats {
  attendance: number;
  memorization: number;
  reading: number;
  summary: number;
  pointsEarned: number;
  pointsLost: number;
  revealedOthers: number;
  revealedBy: number;
  toolsUsed: number;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  rarity: 'common' | 'rare' | 'legendary';
  category: 'defense' | 'attack' | 'utility' | 'special';
}

export interface Event {
  id: string;
  type: 'tool_used' | 'points_stolen' | 'alias_revealed' | 'tool_purchased' | 'reward_granted' | 'guess_made';
  description: string;
  timestamp: Date;
  actor?: string;
  target?: string;
}

export interface WeeklyReward {
  rank: number;
  title: string;
  prizes: string[];
  color: string;
}

// ترتيب الأسماء المستعارة
export const aliasLeaderboard: { alias: string; points: number; trend: 'up' | 'down' | 'stable'; tools: number }[] = [
  { alias: 'الصقر', points: 1250, trend: 'up', tools: 3 },
  { alias: 'البرق', points: 1180, trend: 'up', tools: 2 },
  { alias: 'الذئب', points: 1050, trend: 'stable', tools: 1 },
  { alias: 'الأسد', points: 980, trend: 'down', tools: 4 },
  { alias: 'النسر', points: 920, trend: 'up', tools: 2 },
  { alias: 'الفارس', points: 870, trend: 'down', tools: 1 },
  { alias: 'الرعد', points: 840, trend: 'stable', tools: 3 },
  { alias: 'الجبل', points: 790, trend: 'up', tools: 0 },
  { alias: 'الريح', points: 750, trend: 'down', tools: 2 },
  { alias: 'الشعلة', points: 720, trend: 'stable', tools: 1 },
];

// الأدوات المتاحة
export const tools: Tool[] = [
  {
    id: '1',
    name: 'درع الحماية',
    description: 'يحمي الاسم المستعار من الكشف وبعض الأدوات',
    cost: 150,
    icon: '🛡️',
    rarity: 'common',
    category: 'defense',
  },
  {
    id: '2',
    name: 'الدرع الذهبي',
    description: 'يحمي من السرقة والتخمين والكشف لفترة محددة',
    cost: 400,
    icon: '🏆',
    rarity: 'legendary',
    category: 'defense',
  },
  {
    id: '3',
    name: 'سرقة النقاط',
    description: 'سرقة نسبة من نقاط اسم مستعار آخر',
    cost: 200,
    icon: '⚡',
    rarity: 'rare',
    category: 'attack',
  },
  {
    id: '4',
    name: 'تحويل النقاط',
    description: 'تحويل النقاط بين أسمائك المستعارة',
    cost: 100,
    icon: '🔄',
    rarity: 'common',
    category: 'utility',
  },
  {
    id: '5',
    name: 'إعادة التوزيع',
    description: 'إعادة توزيع كامل للنقاط بين الأسماء الثلاثة',
    cost: 180,
    icon: '⚖️',
    rarity: 'common',
    category: 'utility',
  },
  {
    id: '6',
    name: 'تغيير الاسم',
    description: 'استبدال الاسم المستعار باسم جديد',
    cost: 120,
    icon: '✏️',
    rarity: 'common',
    category: 'utility',
  },
  {
    id: '7',
    name: 'أداة الحصر',
    description: 'تقلل عدد الاحتمالات عند التخمين',
    cost: 250,
    icon: '🔍',
    rarity: 'rare',
    category: 'special',
  },
  {
    id: '8',
    name: 'كشف جزئي',
    description: 'يعرض معلومة عن صاحب الاسم المستعار',
    cost: 300,
    icon: '👁️',
    rarity: 'rare',
    category: 'special',
  },
  {
    id: '9',
    name: 'المرآة',
    description: 'تعكس أثر الأداة على مستخدمها',
    cost: 350,
    icon: '🪞',
    rarity: 'rare',
    category: 'defense',
  },
  {
    id: '10',
    name: 'قنبلة التخمين',
    description: 'تمنح محاولات كشف متعددة في وقت واحد',
    cost: 500,
    icon: '💣',
    rarity: 'legendary',
    category: 'attack',
  },
];

// سجل الأحداث
export const recentEvents: Event[] = [
  {
    id: '1',
    type: 'points_stolen',
    description: 'اسم مستعار سرق 45 نقطة من "الجبل"',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '2',
    type: 'alias_revealed',
    description: 'تم كشف هوية "الريح" بنجاح!',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
  },
  {
    id: '3',
    type: 'tool_purchased',
    description: 'تم شراء "الدرع الذهبي" بـ 400 نقطة',
    timestamp: new Date(Date.now() - 18 * 60 * 1000),
  },
  {
    id: '4',
    type: 'reward_granted',
    description: '"الصقر" حصل على مكافأة المركز الأول الأسبوعي',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
  },
  {
    id: '5',
    type: 'tool_used',
    description: 'تم استخدام "أداة الحصر" ضد "الأسد"',
    timestamp: new Date(Date.now() - 32 * 60 * 1000),
  },
  {
    id: '6',
    type: 'guess_made',
    description: 'محاولة تخمين فاشلة — خسارة 30 نقطة',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: '7',
    type: 'points_stolen',
    description: 'اسم مستعار سرق 60 نقطة من "الشعلة"',
    timestamp: new Date(Date.now() - 55 * 60 * 1000),
  },
  {
    id: '8',
    type: 'tool_purchased',
    description: 'تم شراء "قنبلة التخمين" بـ 500 نقطة',
    timestamp: new Date(Date.now() - 70 * 60 * 1000),
  },
];

// الجوائز الأسبوعية
export const weeklyRewards: WeeklyReward[] = [
  {
    rank: 1,
    title: 'المركز الأول',
    prizes: ['نقاط إضافية (200 نقطة)', 'درع ذهبي', 'أداة سرقة', 'أداة نادرة'],
    color: '#FFD700',
  },
  {
    rank: 2,
    title: 'المركز الثاني',
    prizes: ['نقاط إضافية (120 نقطة)', 'أداة حصر', 'تغيير اسم مجاني'],
    color: '#C0C0C0',
  },
  {
    rank: 3,
    title: 'المركز الثالث',
    prizes: ['نقاط إضافية (80 نقطة)', 'تحويل نقاط مجاني', 'أداة كشف جزئي'],
    color: '#CD7F32',
  },
];

// مصادر النقاط
export const pointSources = [
  { category: 'البرنامج القرآني', items: ['الحضور', 'الحفظ', 'المراجعة', 'الاختبارات'], icon: '📖', color: '#4CAF50' },
  { category: 'تحفة الأطفال', items: ['الحفظ', 'التطبيق', 'الاختبارات'], icon: '📚', color: '#2196F3' },
  { category: 'الأربعون النووية', items: ['الحفظ', 'التسميع'], icon: '📜', color: '#9C27B0' },
  { category: 'البرنامج العلمي', items: ['العقيدة', 'الحديث', 'اللغة العربية'], icon: '🎓', color: '#FF9800' },
  { category: 'القراءة', items: ['إنهاء الكتب', 'التلخيصات'], icon: '📕', color: '#F44336' },
  { category: 'السلوك والانضباط', items: ['الالتزام', 'المبادرة', 'حسن المشاركة'], icon: '⭐', color: '#FFD700' },
  { category: 'البرامج والأنشطة', items: ['الثقافي', 'المهاري', 'الرياضي'], icon: '🏃', color: '#00BCD4' },
];

// إحصائيات اللاعب الحالي (تجريبية)
export const currentPlayerData = {
  realName: 'أحمد محمد',
  totalPoints: 1250,
  aliases: [
    { name: 'الصقر', points: 500, rank: 1 },
    { name: 'البرق', points: 450, rank: 2 },
    { name: 'الذئب', points: 300, rank: 3 },
  ],
  stats: {
    attendance: 95,
    memorization: 88,
    reading: 72,
    summary: 65,
    pointsEarned: 1350,
    pointsLost: 100,
    revealedOthers: 3,
    revealedBy: 1,
    toolsUsed: 7,
  },
  ownedTools: ['درع الحماية', 'تحويل النقاط'],
};

// إحصائيات الأسبوع
export const weekStats = {
  week: 3,
  totalPlayers: 24,
  totalPointsDistributed: 18500,
  topGainer: 'الصقر',
  mostMysterious: 'الغيم',
  mostToolsUsed: 'البرق',
  mostRevealed: 'الريح',
};
