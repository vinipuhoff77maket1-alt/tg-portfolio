export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  duration?: string;
  complexity?: string;
  tools: string[];
}

export interface LinkCardItem {
  category: 'ai' | 'motion' | 'stocks' | 'typography';
  title: string;
  desc: string;
  url: string;
  badge?: string;
  tags: string[];
}

export const SHAPE_PROJECTS: ProjectItem[] = [
  {
    id: 'shape-01',
    title: 'Fluid Morphing Transitions',
    description: 'Жидкие морфинг-транзишены для промо-кампании стриминга. Созданы с использованием векторов и эффекта Simple Choker в After Effects.',
    category: 'Шейпы',
    duration: '15 сек',
    complexity: 'Advanced',
    tools: ['After Effects', 'Illustrator']
  },
  {
    id: 'shape-02',
    title: 'Abstract UI Micro-interactions',
    description: 'Коллекция микроанимаций интерфейса для Telegram WebApp: наведение на кнопки, скроллинг списков, анимированные лоадеры.',
    category: 'UX UI',
    duration: '30 сек',
    complexity: 'Medium',
    tools: ['Figma', 'Lottie', 'After Effects']
  },
  {
    id: 'shape-03',
    title: 'Character Rigging and Walk-cycle',
    description: 'Шейповый персонаж с физически корректным циклом ходьбы, сделанный с плагином Duik Angela.',
    category: 'Персонажка',
    duration: '12 сек',
    complexity: 'Expert',
    tools: ['After Effects', 'Duik Angela']
  }
];

export const LOGO_PROJECTS: ProjectItem[] = [
  {
    id: 'logo-01',
    title: 'Neomorphic Cyberpunk Reveal',
    description: 'Анимация логотипа IT конгресса. Использованы глитч-эффекты, сияние, прорисовка сплайнов по контуру и вспышки частиц.',
    category: 'Reveal',
    duration: '6 сек',
    tools: ['After Effects', 'Trapcode Particular']
  },
  {
    id: 'logo-02',
    title: 'Eco Studio Brand Motion',
    description: 'Дружелюбный лого-комплект для студии крафтовой косметики. Плавный весенний рост листьев из центральной точки.',
    category: 'Eco Organic',
    duration: '8 сек',
    tools: ['After Effects', 'Figma']
  },
  {
    id: 'logo-03',
    title: 'Geometric Fold Loop',
    description: 'Вращение и трансформация плоского логотипа в сложную трехмерную структуру за счет умной расстановки ключевых кадров.',
    category: '3D Flat',
    duration: '10 сек',
    tools: ['After Effects', 'Cinema 4D']
  }
];

export const VIDEO_PROJECTS: ProjectItem[] = [
  {
    id: 'video-01',
    title: 'Commercial Ads Reel 2026',
    description: 'Промо-ролик для линейки спортивных умных часов. Профессиональный тайминг, динамический зум, саунд-дизайн и контрастная склейка.',
    category: 'Commercial',
    duration: '35 сек',
    tools: ['Premiere Pro', 'After Effects', 'Audition']
  },
  {
    id: 'video-02',
    title: 'Cinematic Travel Vlog Montage',
    description: 'Монтаж атмосферной нарезки путешествия по Алтаю. Применение кастомных кино-LUT фильтров, плавная стабилизация и звуки окружения.',
    category: 'Vlog',
    duration: '50 сек',
    tools: ['Premiere Pro', 'DaVinci Resolve']
  },
  {
    id: 'video-03',
    title: 'Music Video Glitch Reel',
    description: 'Нарезка музыкального клипа инди-группы. Быстрый ритмичный монтаж, маскирование объектов, эффект пленки и VHS шума.',
    category: 'Music Video',
    duration: '450 сек',
    tools: ['Premiere Pro', 'AE plugins']
  }
];

export const USEFUL_LINKS: LinkCardItem[] = [
  // AI tools
  {
    category: 'ai',
    title: 'Luma Dream Machine',
    desc: 'Нейросеть для генерации ультрареалистичного видео по тексту или референсному изображению. Отличные ракурсы!',
    url: 'https://lumalabs.ai/dream-machine',
    badge: 'Video AI',
    tags: ['Видео', 'AI']
  },
  {
    category: 'ai',
    title: 'Runway Gen-3 Alpha',
    desc: 'Передовой ИИ генератор видеороликов с точным управлением камерой, движением персонажей и физикой объектов.',
    url: 'https://runwayml.com/',
    badge: 'Industry Leader',
    tags: ['Видео', 'AI', 'VFX']
  },
  {
    category: 'ai',
    title: 'Midjourney',
    desc: 'Генерация концепт-артов, мудбордов и высокодетализированных фонов для раскадровок перед началом анимации.',
    url: 'https://www.midjourney.com/',
    badge: 'Creative Art',
    tags: ['Изображения', 'Concept']
  },

  // Motion Design Resources
  {
    category: 'motion',
    title: 'Motion Design School',
    desc: 'Огромный выбор уроков по After Effects, Cinema 4D и блендеру. Полезные скрипты и бесплатные ассеты.',
    url: 'https://motiondesign.school/',
    badge: 'Education',
    tags: ['Уроки', 'AE', 'C4D']
  },
  {
    category: 'motion',
    title: 'Mister Horse',
    desc: 'Скрипт Animation Composer для After Effects. Палочка-выручалочка с тысячами пресетов переходов, оверлеев и звуков.',
    url: 'https://misterhorse.com/',
    badge: 'Must Have plugin',
    tags: ['AE Plugins', 'Пресеты']
  },
  {
    category: 'motion',
    title: 'LottieFiles',
    desc: 'Платформа для анимации Lottie. Скачивайте, делитесь и конвертируйте векторные анимации для веба и интерфейсов.',
    url: 'https://lottiefiles.com/',
    badge: 'UX UI Web',
    tags: ['Lottie', 'JSON', 'Web dev']
  },

  // Stock Websites
  {
    category: 'stocks',
    title: 'Mixkit Video Stock',
    desc: 'Качественные бесплатные стоковые видео футажи, музыкальные подложки, звуковые спецэффекты и шаблоны.',
    url: 'https://mixkit.co/',
    badge: 'Free Stock',
    tags: ['Футажи', 'Звуки', 'Шаблоны']
  },
  {
    category: 'stocks',
    title: 'Envato Elements',
    desc: 'Безлимитная подписка на шаблоны After Effects, графику, 3D элементы, стоковые видео высокого разрешения.',
    url: 'https://elements.envato.com/',
    badge: 'Premium',
    tags: ['AE Templates', '3D', 'Элементы']
  },
  {
    category: 'stocks',
    title: 'OpenGameArt 3D',
    desc: 'Каталог бесплатных 3D моделей и векторов с открытой лицензией CC0 для ваших личных творческих проектов.',
    url: 'https://opengameart.org/',
    badge: 'CC0 Assets',
    tags: ['3D Models', 'CC0']
  },

  // Typography Resources
  {
    category: 'typography',
    title: 'Google Fonts Cyrillic',
    desc: 'Коллекция проверенных, бесплатных системных шрифтов с идеальной поддержкой кириллического алфавита.',
    url: 'https://fonts.google.com/?subset=cyrillic',
    badge: 'Unicode Type',
    tags: ['Кириллица', 'Font family']
  },
  {
    category: 'typography',
    title: 'Typewolf',
    desc: 'Лучший гид по типографике в вебе: тренды шрифтов, примеры сочетаний и рекомендации альтеранитв.',
    url: 'https://www.typewolf.com/',
    badge: 'Visual Trends',
    tags: ['Идеи', 'Инспирация']
  },
  {
    category: 'typography',
    title: 'Fonts In Use',
    desc: 'Огромный независимый архив реального использования шрифтов в плакатах, фильмах, логотипах и играх.',
    url: 'https://fontsinuse.com/',
    badge: 'Real-world designs',
    tags: ['Кейсы', 'Шрифты']
  }
];
