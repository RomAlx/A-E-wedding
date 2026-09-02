/**
 * Единственный источник текстов, адресов и ссылок.
 * Правится вручную. Каждое место — один раз в `places`.
 */

export type TimelineIcon = 'users' | 'heart' | 'camera' | 'utensils'

/** Мок-ссылки — замените на свои URL Яндекс.Карт */
const MAP = {
  zags: 'https://yandex.ru/maps/-/CTTpJOMT',
  portaRossa: 'https://yandex.ru/maps/-/CTTpNWNV',
  routeWalk: 'https://yandex.ru/maps/-/CTTpvZ8J',
  chistyePrudy: 'https://yandex.ru/maps/-/CTTtUD2f',
  pokrovka: 'https://yandex.ru/maps/-/CTTpRVyG',
  sadBaumana: 'https://yandex.ru/maps/-/CTTpVBMV',
  coffeeKiosk: 'https://yandex.ru/maps/-/CTTt48mY',
  coffeeBlack: 'https://yandex.ru/maps/-/CTTtAL3n',
  coffeeSchool: 'https://yandex.ru/maps/-/CTTtEVpA',
  coffeeBM: 'https://yandex.ru/maps/-/CTTtI02r',
} as const

/** Канонические места — address/mapUrl правятся только здесь */
export const places = {
  zags: {
    name: 'ЗАГС — Дворец бракосочетания № 1',
    address: 'Малый Харитоньевский перереулок 10с1',
    mapUrl: MAP.zags,
    directions:
      'м. «Чистые пруды» (5 мин пешком), м. «Красные ворота» (~10 мин). Вход со двора через арку.',
  },
  chistyePrudy: {
    name: 'Чистопрудный бульвар',
    address: 'Аллея у прудов',
    mapUrl: MAP.chistyePrudy,
  },
  pokrovka: {
    name: 'Покровка',
    address: 'Одна из самых популярных улиц Москвы',
    mapUrl: MAP.pokrovka,
  },
  sadBaumana: {
    name: 'Сад им. Баумана',
    address: 'Современный городской сад',
    mapUrl: MAP.sadBaumana,
  },
  portaRossa: {
    name: 'Ресторан «Порта Росса»',
    address: 'Каланчёвский тупик 9с2',
    mapUrl: MAP.portaRossa,
    directions: 'м. «Красные ворота» (~7 мин), м. «Комсомольская» (~10 мин).',
  },
} as const

export type PlaceId = keyof typeof places

export interface TimelineEvent {
  time: string
  title: string
  details?: string
  icon: TimelineIcon
  /** Ссылка на `places` — address/mapUrl не дублируются */
  placeId?: PlaceId
  ctaLabel?: string
  ctaHref?: string
}

export interface RoutePoint {
  /** Подпись на маршруте (может отличаться от places.*.name) */
  name: string
  placeId: PlaceId
}

export interface CoffeeShop {
  name: string
  address: string
  note: string
  mapUrl: string
}

export const config = {
  siteUrl: 'https://romalx.github.io/A-E-wedding',
  siteName: 'A&E',

  coupleDisplay: 'Артём & Екатерина',
  dateDisplay: '16 октября 2026',
  dateShort: '16.10.2026',
  /** Сбор гостей, Москва (UTC+3). Оффсет +03:00 обязателен — иначе будет локальное время браузера. */
  countdownTarget: '2026-10-16T10:00:00+03:00',

  meta: {
    title: 'A&E',
    description: 'Мы женимся! Будем рады видеть вас 16 октября 2026 в Москве.',
    ogImage: 'hero.jpeg',
  },

  labels: {
    openInMaps: 'Открыть в Яндекс.Картах',
  },

  hero: {
    image: 'hero.jpeg',
    // \n после «!» — перенос на сайте (white-space: pre-line)
    tagline: 'Мы женимся!',
    ctaLabel: 'Смотреть расписание',
    ctaHref: '#timeline',
  },

  timeline: [
    {
      time: '9:15',
      title: 'Сбор гостей в ЗАГСе',
      details: 'Дворец бракосочетания № 1',
      icon: 'users' as TimelineIcon,
      placeId: 'zags',
    },
    {
      time: '9:30',
      title: 'Начало церемонии',
      icon: 'heart' as TimelineIcon,
    },
    {
      time: '10:30 – 13:00',
      title: 'Фотосессия молодоженов',
      icon: 'camera' as TimelineIcon,
      ctaLabel: 'А чем заняться?',
      ctaHref: '#what-to-do',
    },
    {
      time: '13:00',
      title: 'Обед',
      details: 'Ресторан «Порта Росса»',
      icon: 'utensils' as TimelineIcon,
      placeId: 'portaRossa',
    },
  ] satisfies TimelineEvent[],

  whatToDo: {
    title: 'Маршрут прогулки',
    lines: [
      'У вас будет примерно 2.5 часа свободного времени.',
      'От ЗАГСа выйти на Чистопрудный бульвар, прогуляться вдоль прудов, дальше по Покровке в сторону Красных ворот — к обеду в «Порта Росса» или устроиться где-нибудь в тепле с кофе.',
    ],
    route: {
      mapUrl: MAP.routeWalk,
      routeButtonLabel: 'Маршрут пешком в Яндекс.Картах',
      points: [
        { name: 'ЗАГС', placeId: 'zags' },
        { name: 'Чистопрудный бульвар', placeId: 'chistyePrudy' },
        { name: 'Покровка', placeId: 'pokrovka' },
        { name: 'Сад им. Баумана', placeId: 'sadBaumana' },
        { name: 'Порта Росса', placeId: 'portaRossa' },
      ] satisfies RoutePoint[],
    },
    coffee: {
      subtitle: 'Кофейни по пути',
      emptyMessage: 'Скоро добавим любимые места ☕',
      shops: [
        {
          name: 'Kiosk 1936',
          address: 'Чистопрудный бульвар, 12к4',
          note: 'Милая кофейня напротив прудов',
          mapUrl: MAP.coffeeKiosk,
        },
        {
          name: 'Black Milk',
          address: 'Старосадский переулок, 6/12с1',
          note: 'Уютная кофейня с приглушенным светом',
          mapUrl: MAP.coffeeBM,
        },
        {
          name: 'Кооператив черный',
          address: 'Лялин пер., 5, стр. 1',
          note: 'Для любителей черного кофе',
          mapUrl: MAP.coffeeBlack,
        },
        {
          name: 'Школьник',
          address: 'ул. Земляной Вал, 12/7с1, Москва',
          note: 'Просторная кофейня на садовом кольце',
          mapUrl: MAP.coffeeSchool,
        },
      ] satisfies CoffeeShop[],
    },
  },

  venues: {
    title: 'Адреса',
    /** Места с directions — только id из `places` */
    placeIds: ['zags', 'portaRossa'] as const satisfies readonly PlaceId[],
  },
}

export function getPlace(id: PlaceId) {
  return places[id]
}
