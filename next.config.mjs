/**
 * CSP — пока только Report-Only: нарушения пишутся в консоль, но ничего не
 * блокируется. Разрешены домены Метрики (+Вебвизор), Яндекс.Карт/отзывов и
 * SmartCaptcha. 'unsafe-inline' в script-src нужен для inline-скриптов Next и
 * счётчика Метрики. Перед переводом в enforce — собрать отчёты с прода.
 */
const YANDEX = [
  'https://*.yandex.ru',
  'https://*.yandex.com',
  'https://*.yandex.net',
  'https://yandex.ru',
  'https://yastatic.net',
  'https://*.yastatic.net',
  'https://smartcaptcha.yandexcloud.net'
].join(' ')

const CSP_REPORT_ONLY = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: ${YANDEX}`,
  `style-src 'self' 'unsafe-inline' ${YANDEX}`,
  `img-src 'self' data: blob: ${YANDEX}`,
  `font-src 'self' data: ${YANDEX}`,
  `connect-src 'self' ${YANDEX} wss://*.yandex.ru wss://*.yandex.com`,
  `frame-src blob: ${YANDEX}`,
  `child-src blob: ${YANDEX}`,
  `worker-src 'self' blob:`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join('; ')

/**
 * Карта кликов / карта ссылок / Вебвизор открывают сайт во фрейме интерфейса
 * Метрики — X-Frame-Options там ломает просмотр. Как в справке Метрики:
 * SAMEORIGIN для всех, кроме запросов с Referer интерфейса Метрики/Вебвизора.
 */
const METRIKA_REFERER =
  '^https?://([^/]+\\.)?(metrika\\.yandex\\.(ru|by|kz|uz|com)|metrica\\.yandex\\.(com|com\\.tr)|webvisor\\.com)(/.*)?$'

/**
 * /images и /icons лежат в public/ и адресуются по фиксированному имени
 * (часть путей — из контента админки). Файлы уже менялись без смены имени
 * (icon-vk.svg — 3 раза), поэтому immutable на год здесь опасен: умеренный
 * кеш на сутки + неделя stale-while-revalidate. Тяжёлые картинки (hero, care,
 * kids) импортируются и уходят в /_next/static/media с хешем и годовым кешем.
 */
const STATIC_CACHE = 'public, max-age=86400, stale-while-revalidate=604800'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()'
  },
  { key: 'Content-Security-Policy-Report-Only', value: CSP_REPORT_ONLY }
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/:path*',
        missing: [{ type: 'header', key: 'referer', value: METRIKA_REFERER }],
        headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }]
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }]
      },
      {
        source: '/icons/:path*',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }]
      }
    ]
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [{ loader: '@svgr/webpack', options: { icon: true } }]
      },
    )
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp']
  }
};

export default nextConfig;
