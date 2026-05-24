/* ============================================================================
 *  BARVIKHA — ЕДИНЫЙ ФАЙЛ ДАННЫХ САЙТА
 *  data.js
 * ============================================================================
 *
 *  ЧТО ЭТО
 *  -------
 *  Единый источник правды для всего сайта сети премиум-кальянных «Барвиха».
 *  Все данные о заведениях, меню, КБЖУ и фичах собраны здесь в одном месте.
 *  Файл консолидирует данные, ранее разбросанные по 4 HTML-файлам:
 *    - location.html  → LOC_DATA, MENU, KBZU_DATA
 *    - index.html     → BV_LOCATIONS, FEATS
 *    - karaoke.html   → KAR_POINTS
 *    - moscow.html    → список 17 заведений Москвы (msk_*)
 *
 *  Сайт статический, без сборщиков и модулей, поэтому данные публикуются
 *  в глобальную область через объект window.BARVIKHA.
 *
 *  КАК ПОДКЛЮЧИТЬ
 *  --------------
 *  В <head> или перед закрывающим </body> любой страницы:
 *      <script src="data.js"></script>
 *  Затем в коде страницы:
 *      const { venues, menu, kbzu, features, meta } = window.BARVIKHA;
 *
 *  СТРУКТУРА window.BARVIKHA
 *  -------------------------
 *    venues   — массив ВСЕХ заведений сети (см. формат записи ниже)
 *    menu     — меню: { hookahs, food, bar, drinks } → категории → блюда
 *    kbzu     — справочник КБЖУ блюд (вес + ккал/Б/Ж/У) по имени блюда
 *    features — словарь фич/направлений заведений (кальяны, кухня, VIP и т.п.)
 *    meta     — сводка по сети (кол-во заведений, городов, год основания и т.п.)
 *
 *  КАК ДОБАВИТЬ НОВОЕ ЗАВЕДЕНИЕ
 *  ----------------------------
 *  Достаточно добавить ОДНУ запись в массив `venues`. Шаблон:
 *
 *    {
 *      key:          'msk_newpoint',                  // уникальный ID (латиница)
 *      slug:         'newpoint',                      // slug для menuUrl
 *      name:         'Новое Заведение',               // отображаемое имя
 *      city:         'Москва',                        // город
 *      address:      'ул. Примерная, 1',              // полный адрес
 *      metro:        'Метро · 5 мин · выход 1',       // метро/как добраться
 *      coords:       [55.7558, 37.6173],              // [широта, долгота]
 *      hoursWeekday: '12:00 — 03:00',                 // часы Пн–Чт, Вс
 *      hoursWeekend: '12:00 — 06:00',                 // часы Пт–Сб
 *      status:       'open',                          // 'open' | 'soon'
 *      openDate:     null,                            // для 'soon': напр. 'Q2 2026'
 *      features:     ['karaoke','vip','veranda'],     // массив фич (см. ниже)
 *      vipRooms:     5,                               // число VIP-комнат или null
 *      phone:        '+7 (999) 000-00-00',            // телефон
 *      menuUrl:      'https://menu.barvikhagroup.ru/newpoint',
 *      photos:       []                               // массив путей к фото
 *    }
 *
 *  Допустимые значения features (нормализованный набор):
 *    'karaoke'    — караоке-зал / приватная караоке-сцена
 *    'vip'        — VIP-комнаты / приватные салоны
 *    'veranda'    — летняя веранда / терраса / руфтоп
 *    '24h'        — круглосуточный режим работы
 *    'live_music' — живая музыка
 *    'dj'         — DJ-сеты
 *    'projector'  — проекторы / трансляции спортивных событий
 *    'panorama'   — панорамные окна / видовое расположение
 *    'ps5'        — игровые консоли (PlayStation)
 *    'photographer' — штатный фотограф
 *
 *  Поля со значением null / '' и пометкой "// TODO: уточнить данные" означают,
 *  что данные пока отсутствуют в исходниках и должны быть уточнены у владельца.
 * ==========================================================================*/

(function () {
  'use strict';

  /* ---------------------------------------------------------------------------
   *  VENUES — ВСЕ ЗАВЕДЕНИЯ СЕТИ
   *  Источники: LOC_DATA (location.html), BV_LOCATIONS (index.html),
   *  KAR_POINTS (karaoke.html), moscow.html, список menu-ссылок menu.barvikhagroup.ru
   * ------------------------------------------------------------------------- */
  const venues = [

    /* ═══ МОСКВА — 17 РЕАЛЬНЫХ ТОЧЕК ═══ */

    {
      key: 'msk_krylatskoe',
      slug: 'barvixa-lounge-krylatskoe',
      name: 'Крылатское',
      city: 'Москва',
      address: 'Осенний бул., 7к1 · ТЦ «Матрица», 2 этаж',
      metro: 'Крылатское · 1 мин · выход 2',
      coords: [55.7547, 37.4181],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['live_music', 'karaoke', 'projector', 'panorama', 'ps5'],
      vipRooms: 5,
      phone: '+7 (925) 830-80-01',
      menuUrl: 'https://menu.barvikhagroup.ru/barvixa-lounge-krylatskoe',
      photos: []
    },
    {
      key: 'msk_otradnoe',
      slug: 'otradnoe',
      name: 'Отрадное',
      city: 'Москва',
      address: 'Алтуфьевское ш., 24к1 · ТЦ «Улей», 2 этаж',
      metro: 'Отрадное · 16 мин · выход 7',
      coords: [55.8629, 37.6024],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['live_music', 'projector', 'panorama', 'ps5', 'photographer'],
      vipRooms: 3,
      phone: '+7 (926) 713-40-01',
      menuUrl: 'https://menu.barvikhagroup.ru/otradnoe',
      photos: []
    },
    {
      key: 'msk_teplystan',
      slug: 'tepliy-stan',
      name: 'Тёплый Стан',
      city: 'Москва',
      address: 'Новоясеневский пр., 1 · ТЦ «Спектр», 3 этаж',
      metro: 'Тёплый стан · 1 мин · выход 5',
      coords: [55.6195, 37.4881],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['dj', 'veranda', 'ps5'],
      vipRooms: 2,
      phone: '+7 (925) 771-60-01',
      menuUrl: 'https://menu.barvikhagroup.ru/tepliy-stan',
      photos: []
    },
    {
      key: 'msk_marino',
      slug: 'marino',
      name: 'Марьино',
      city: 'Москва',
      address: 'ул. Люблинская, 92к2 · ТАЦ, 2 этаж',
      metro: 'Марьино · 11 мин · выход 5',
      coords: [55.6504, 37.7458],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['live_music', 'dj', 'karaoke', 'projector', 'ps5', 'photographer'],
      vipRooms: 5,
      phone: '+7 (926) 677-20-01',
      menuUrl: 'https://menu.barvikhagroup.ru/marino',
      photos: []
    },
    {
      key: 'msk_cska',
      slug: 'cska',
      name: 'ЦСКА',
      city: 'Москва',
      address: 'ул. Полины Осипенко, 14А',
      metro: 'ЦСКА · 11 мин · выход 2',
      coords: [55.7785, 37.5304],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 02:30',
      status: 'open',
      openDate: null,
      features: ['live_music', 'panorama', 'ps5', 'photographer', 'veranda'],
      vipRooms: 9,
      phone: '+7 (925) 818-10-01',
      menuUrl: 'https://menu.barvikhagroup.ru/cska',
      photos: []
    },
    {
      key: 'msk_mitino',
      slug: 'mitino',
      name: 'Митино',
      city: 'Москва',
      address: 'Пятницкое ш., 3 · ТЦ «Пятница», 3 этаж',
      metro: 'Волоколамская · 3 мин · выход 2',
      coords: [55.8489, 37.3621],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['dj', 'projector', 'panorama'],
      vipRooms: 9,
      phone: '+7 (968) 887-70-01',
      menuUrl: 'https://menu.barvikhagroup.ru/mitino',
      photos: []
    },
    {
      key: 'msk_yugozapadnaya',
      slug: 'iugo-zapadnaia',
      name: 'Юго-Западная',
      city: 'Москва',
      address: 'Ленинский пр., 146 · ГК «Аструс», 33 этаж',
      metro: 'Юго-Западная · 13–15 мин · выход 1 или 2',
      coords: [55.6634, 37.4838],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['live_music', 'karaoke', 'projector', 'panorama', 'ps5', 'photographer'],
      vipRooms: 5,
      phone: '+7 (910) 009-30-01',
      menuUrl: 'https://menu.barvikhagroup.ru/iugo-zapadnaia',
      photos: []
    },
    {
      key: 'msk_ramenki',
      slug: 'ramenki',
      name: 'Раменки',
      city: 'Москва',
      address: 'Мичуринский пр., 9к5 · 2 этаж · вход с лицевой стороны',
      metro: 'Раменки · 5 мин · выход 7',
      coords: [55.6970, 37.5050],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['live_music', 'panorama', 'ps5', 'photographer'],
      vipRooms: 4,
      phone: '+7 (925) 060-20-01',
      menuUrl: 'https://menu.barvikhagroup.ru/ramenki',
      photos: []
    },
    {
      key: 'msk_krasnaya',
      slug: 'krasnaia-ploshchad',
      name: 'Красная Площадь',
      city: 'Москва',
      address: 'Ветошный пер., 13 · −1 этаж · между Никольским пассажем и ГУМом',
      metro: 'Площадь Революции · 5 мин · выход 10',
      coords: [55.7558, 37.6213],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['dj', 'karaoke', 'projector', 'ps5'],
      vipRooms: 11,
      phone: '+7 (999) 113-30-01',
      menuUrl: 'https://menu.barvikhagroup.ru/krasnaia-ploshchad',
      photos: []
    },
    {
      key: 'msk_mendeleevskaya',
      slug: 'mendeleevskaia',
      name: 'Менделеевская',
      city: 'Москва',
      address: 'ул. Тихвинская, 2 · вход с Перуновского переулка',
      metro: 'Менделеевская · 5–7 мин · выход 4',
      coords: [55.7919, 37.6010],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['dj', 'karaoke', 'veranda', 'ps5'],
      vipRooms: 10,
      phone: '+7 (968) 000-30-01',
      menuUrl: 'https://menu.barvikhagroup.ru/mendeleevskaia',
      photos: []
    },
    {
      key: 'msk_kievskaya',
      slug: 'kievskaia',
      name: 'Киевская',
      city: 'Москва',
      address: 'ул. Киевская, 2 · ТГК «Киевский», 12 этаж',
      metro: 'Киевская · 2 мин · выход 5',
      coords: [55.7458, 37.5670],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['dj', 'projector', 'panorama', 'ps5'],
      vipRooms: 18,
      phone: '+7 (999) 796-91-11',
      menuUrl: 'https://menu.barvikhagroup.ru/kievskaia',
      photos: []
    },
    {
      key: 'msk_seligerskaya',
      slug: 'seligerskaia',
      name: 'Селигерская',
      city: 'Москва',
      address: 'Дмитровское ш., 85 · БЦ «РТС», 1 этаж',
      metro: 'Селигерская · 5 мин · выход 3 или 4',
      coords: [55.8839, 37.5430],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['live_music', 'projector', 'panorama', 'photographer', 'ps5'],
      vipRooms: 3,
      phone: '+7 (999) 997-30-01',
      menuUrl: 'https://menu.barvikhagroup.ru/seligerskaia',
      photos: []
    },
    {
      key: 'msk_city',
      slug: 'moskva-siti',
      name: 'Москва-Сити',
      city: 'Москва',
      address: 'Пресненская наб., 4 с.1 · рядом с ТЦ «Галерея Эволюция»',
      metro: 'Деловой центр · 3 мин · выход 4 или 5',
      coords: [55.7494, 37.5378],
      hoursWeekday: 'круглосуточно',
      hoursWeekend: 'круглосуточно',
      status: 'open',
      openDate: null,
      features: ['24h', 'dj', 'panorama', 'ps5'],
      vipRooms: 3,
      phone: '+7 (999) 66-77-001',
      menuUrl: 'https://menu.barvikhagroup.ru/moskva-siti',
      photos: []
    },
    {
      key: 'msk_baumanskaya',
      slug: 'baumanskaia',
      name: 'Бауманская',
      city: 'Москва',
      address: 'Нижняя Красносельская, 35 с.59 · «Гастроферма», 6 этаж',
      metro: 'Бауманская · 6 мин',
      coords: [55.7807, 37.6783],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['dj', 'panorama', 'ps5'],
      vipRooms: 5,
      phone: '+7 (999) 772-20-01',
      menuUrl: 'https://menu.barvikhagroup.ru/baumanskaia',
      photos: []
    },
    {
      key: 'msk_paveletskaya',
      slug: 'paveletskaia',
      name: 'Павелецкая',
      city: 'Москва',
      address: 'Дербеневская наб., 7 с.7 · ДК «Новоспасский»',
      metro: 'Павелецкая (Зелёная) · 15 мин',
      coords: [55.7280, 37.6510],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['dj', 'projector', 'veranda', 'ps5'],
      vipRooms: 6,
      phone: '+7 (999) 773-30-01',
      menuUrl: 'https://menu.barvikhagroup.ru/paveletskaia',
      photos: []
    },
    {
      key: 'msk_kolomenskaya',
      slug: 'kolomenskaia',
      name: 'Коломенская',
      city: 'Москва',
      address: 'пр. Андропова, 22 · ТЦ «Нора», 2 этаж',
      metro: 'Коломенская · 5 мин · выход 6',
      coords: [55.6810, 37.6650],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['live_music', 'ps5', 'photographer'],
      vipRooms: 2,
      phone: '+7 (999) 982-20-01',
      menuUrl: 'https://menu.barvikhagroup.ru/kolomenskaia',
      photos: []
    },
    {
      key: 'msk_rublyovka',
      slug: 'rublevka',
      name: 'Рублёвка',
      city: 'Москва',
      address: 'МО, Одинцовский р-н, Рублёво-Успенское ш., д. Борки, 19, 2 этаж',
      metro: 'м. Молодёжная · маршрутка 121 до Борки',
      coords: [55.7530, 37.2670],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['veranda', 'ps5'],
      vipRooms: 1,
      phone: '+7 (996) 967-20-01',
      menuUrl: 'https://menu.barvikhagroup.ru/rublevka',
      photos: []
    },

    /* ═══ САНКТ-ПЕТЕРБУРГ ═══ */

    {
      key: 'spb',
      slug: 'nevskii',
      name: 'Невский',
      city: 'Санкт-Петербург',
      address: 'Невский пр., 26 · вход с Малой Конюшенной, 2 этаж',
      metro: 'Невский проспект · 1 мин · выход на канал Грибоедова',
      coords: [59.9367, 30.3260],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: ['live_music', 'projector', 'ps5'],
      vipRooms: null, // в LOC_DATA указано «несколько» — TODO: уточнить точное число VIP-комнат
      phone: '+7 (966) 007-70-01',
      menuUrl: 'https://menu.barvikhagroup.ru/nevskii',
      photos: []
    },

    /* ═══ МАХАЧКАЛА ═══ */

    {
      key: 'makhachkala',
      slug: 'maxackala',
      name: 'Махачкала',
      city: 'Махачкала',
      address: 'пр. Расула Гамзатова, 12',
      metro: '', // TODO: уточнить данные (метро/как добраться — в Махачкале нет метро)
      coords: [42.9849, 47.5047],
      hoursWeekday: '12:00 — 03:00',
      hoursWeekend: '12:00 — 06:00',
      status: 'open',
      openDate: null,
      features: [], // TODO: уточнить данные (фичи заведения отсутствуют в LOC_DATA)
      vipRooms: null, // TODO: уточнить данные
      phone: '+7 (800) 201-27-81',
      menuUrl: 'https://menu.barvikhagroup.ru/maxackala',
      photos: []
    },

    /* ═══ СКОРО ОТКРЫТИЕ ═══ */

    {
      key: 'saratov',
      slug: 'barvixa-lounge-saratov',
      name: 'Саратов',
      city: 'Саратов',
      address: '', // TODO: уточнить данные
      metro: '', // TODO: уточнить данные
      coords: [51.5331, 46.0342],
      hoursWeekday: '', // TODO: уточнить данные
      hoursWeekend: '', // TODO: уточнить данные
      status: 'soon',
      openDate: 'Q2 2026',
      features: [], // TODO: уточнить данные
      vipRooms: null, // TODO: уточнить данные
      phone: '', // TODO: уточнить данные
      menuUrl: 'https://menu.barvikhagroup.ru/barvixa-lounge-saratov',
      photos: []
    },
    {
      key: 'nn',
      slug: 'niznii-novgorod',
      name: 'Нижний Новгород',
      city: 'Нижний Новгород',
      address: '', // TODO: уточнить данные
      metro: '', // TODO: уточнить данные
      coords: [56.3268, 44.0066],
      hoursWeekday: '', // TODO: уточнить данные
      hoursWeekend: '', // TODO: уточнить данные
      status: 'soon',
      openDate: 'Q2 2026',
      features: [], // TODO: уточнить данные
      vipRooms: null, // TODO: уточнить данные
      phone: '', // TODO: уточнить данные
      menuUrl: 'https://menu.barvikhagroup.ru/niznii-novgorod',
      photos: []
    },
    {
      key: 'penza',
      slug: 'penza',
      name: 'Пенза',
      city: 'Пенза',
      address: '', // TODO: уточнить данные
      metro: '', // TODO: уточнить данные
      coords: [53.1959, 45.0185],
      hoursWeekday: '', // TODO: уточнить данные
      hoursWeekend: '', // TODO: уточнить данные
      status: 'soon',
      openDate: 'Q3 2026',
      features: ['karaoke'], // караоке заявлено в KAR_POINTS (karaoke.html), вместимость до 30 гостей
      vipRooms: null, // TODO: уточнить данные
      phone: '', // TODO: уточнить данные
      menuUrl: 'https://menu.barvikhagroup.ru/penza',
      photos: []
    },
    {
      key: 'yerevan',
      slug: 'erevan',
      name: 'Ереван',
      city: 'Ереван',
      address: '', // TODO: уточнить данные
      metro: '', // TODO: уточнить данные
      coords: [40.1772, 44.5126],
      hoursWeekday: '', // TODO: уточнить данные
      hoursWeekend: '', // TODO: уточнить данные
      status: 'soon',
      openDate: 'Q3 2026',
      features: [], // TODO: уточнить данные
      vipRooms: null, // TODO: уточнить данные
      phone: '', // TODO: уточнить данные
      menuUrl: 'https://menu.barvikhagroup.ru/erevan',
      photos: []
    },
    {
      key: 'tashkent',
      slug: 'taskent',
      name: 'Ташкент',
      city: 'Ташкент',
      address: '', // TODO: уточнить данные
      metro: '', // TODO: уточнить данные
      coords: [41.3111, 69.2797],
      hoursWeekday: '', // TODO: уточнить данные
      hoursWeekend: '', // TODO: уточнить данные
      status: 'soon',
      openDate: 'Q4 2026',
      features: [], // TODO: уточнить данные
      vipRooms: null, // TODO: уточнить данные
      phone: '', // TODO: уточнить данные
      menuUrl: 'https://menu.barvikhagroup.ru/taskent',
      photos: []
    },
    {
      key: 'tula',
      slug: '', // TODO: уточнить данные — Тулы НЕТ в списке menu-ссылок menu.barvikhagroup.ru
      name: 'Тула',
      city: 'Тула',
      address: '', // TODO: уточнить данные
      metro: '', // TODO: уточнить данные
      coords: [54.1933, 37.6172],
      hoursWeekday: '', // TODO: уточнить данные
      hoursWeekend: '', // TODO: уточнить данные
      status: 'soon',
      openDate: 'Q2 2026',
      features: [], // TODO: уточнить данные
      vipRooms: null, // TODO: уточнить данные
      phone: '', // TODO: уточнить данные
      menuUrl: '', // TODO: уточнить данные (slug для menu.barvikhagroup.ru отсутствует)
      photos: []
    },

    /* ═══ ЗАВЕДЕНИЯ ИЗ СПИСКА MENU-ССЫЛОК, ОТСУТСТВУЮЩИЕ В LOC_DATA ═══
     * Эти точки есть на menu.barvikhagroup.ru, но не упоминаются ни в одном
     * из 4 HTML-файлов. Все поля кроме name/slug/city/menuUrl требуют уточнения. */

    {
      // TODO: уточнить данные
      key: 'msk_arka',
      slug: 'arka',
      name: 'Арка',
      city: 'Москва',
      address: '',
      metro: '',
      coords: null,
      hoursWeekday: '',
      hoursWeekend: '',
      status: 'open', // TODO: уточнить статус (open/soon)
      openDate: null,
      features: [],
      vipRooms: null,
      phone: '',
      menuUrl: 'https://menu.barvikhagroup.ru/arka',
      photos: []
    },
    {
      // TODO: уточнить данные
      key: 'msk_domodedovo',
      slug: 'domodedovo',
      name: 'Домодедово',
      city: 'Москва', // Домодедово — городской округ Московской области; уточнить, относить ли к Москве
      address: '',
      metro: '',
      coords: null,
      hoursWeekday: '',
      hoursWeekend: '',
      status: 'open', // TODO: уточнить статус (open/soon)
      openDate: null,
      features: [],
      vipRooms: null,
      phone: '',
      menuUrl: 'https://menu.barvikhagroup.ru/domodedovo',
      photos: []
    },
    {
      // TODO: уточнить данные
      key: 'msk_likerka',
      slug: 'likerka',
      name: 'Ликёрка',
      city: 'Москва', // TODO: уточнить город (возможно «Ликёрка Лофт» в Туле)
      address: '',
      metro: '',
      coords: null,
      hoursWeekday: '',
      hoursWeekend: '',
      status: 'open', // TODO: уточнить статус (open/soon)
      openDate: null,
      features: [],
      vipRooms: null,
      phone: '',
      menuUrl: 'https://menu.barvikhagroup.ru/likerka',
      photos: []
    }
  ];

  /* ---------------------------------------------------------------------------
   *  MENU — МЕНЮ СЕТИ
   *  Источник: MENU (location.html).
   *  Структура: 4 раздела → массив категорий { c, items }
   *    c     — название категории
   *    items — массив блюд:
   *      name   — название
   *      price  — цена (строка, как в меню)
   *      desc   — краткое описание (может отсутствовать)
   *      weight — вес/объём порции 'v' (может отсутствовать)
   *      photo  — путь к фото
   * ------------------------------------------------------------------------- */
  const menu = {

    /* ── КАЛЬЯНЫ ── */
    hookahs: [
      {
        c: 'Авторское предложение · 7 000 ₽',
        items: [
          { name: 'Tropicana Mama', price: '7 000 ₽', desc: 'Чаша: ананас · в колбе: пюре маракуйя, малина, киви, мята', weight: null, photo: 'фото старое кухни/кальян 1.jpeg' },
          { name: 'Black Edition', price: '7 000 ₽', desc: 'Чаша: гранат · ежевика, ананас. сок, лайм, чипсы апельсина, мята', weight: null, photo: 'фото старое кухни/кальян 1.jpeg' },
          { name: 'One More Please', price: '7 000 ₽', desc: 'Чаша: ананас · ванильное мороженое, кокос, малина, фисташки', weight: null, photo: 'фото старое кухни/кальян 1.jpeg' },
          { name: 'Du Barry', price: '7 000 ₽', desc: 'Чаша: гранат · малина, клубничное мороженое, Raffaello', weight: null, photo: 'фото старое кухни/кальян 1.jpeg' },
          { name: 'Dolce Vita', price: '7 000 ₽', desc: 'Чаша: ананас · шоколадное мороженое, Oreo, корица, мята', weight: null, photo: 'фото старое кухни/кальян 1.jpeg' }
        ]
      },
      {
        c: 'Основное меню',
        items: [
          { name: 'Кальян Барвиха', price: '20 000 ₽', desc: 'Чаша: грейпфрут / ананас / гранат · табак по желанию · колба арбуз или тыква', weight: null, photo: 'фото старое кухни/кальян 1.jpeg' },
          { name: 'Кальян на чаше', price: '3 700 ₽', desc: 'Классическая чаша · любой табак (кроме Perfume)', weight: null, photo: 'фото старое кухни/кальян 1.jpeg' },
          { name: 'Кальян на фрукте', price: '4 200 ₽', desc: 'Чаша: грейпфрут / ананас / гранат · любой табак (кроме Perfume)', weight: null, photo: 'фото старое кухни/кальян 1.jpeg' },
          { name: 'Perfume на чаше', price: '5 500 ₽', desc: 'Классическая чаша · любой табак с добавлением Perfume', weight: null, photo: 'фото старое кухни/кальян 1.jpeg' },
          { name: 'Perfume на фрукте', price: '6 500 ₽', desc: 'Чаша на фрукте · любой табак с добавлением Perfume', weight: null, photo: 'фото старое кухни/кальян 1.jpeg' }
        ]
      }
    ],

    /* ── КУХНЯ ── */
    food: [
      {
        c: 'Салаты',
        items: [
          { name: 'Классический Цезарь с креветками', price: '1 290 ₽', desc: 'Романо · соус цезарь · креветки · черри · сухарики · пармезан', weight: '250 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Классический Цезарь с курицей', price: '990 ₽', desc: 'Романо · куриная грудка · сухарики · черри · пармезан', weight: '230 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Оливье со слабосолёным лососем', price: '890 ₽', desc: 'Лосось с/с · картофель · морковь · горошек · огурцы', weight: '237 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Оливье с куриной грудкой', price: '520 ₽', desc: 'Куриная грудка · картофель · морковь · яйцо · огурцы', weight: '222 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Салат с печёной свёклой и копчёной уткой', price: '690 ₽', desc: 'Свёкла · апельсиновый соус · выбитый сыр · утиная грудка · шпинат', weight: '232 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Салат по-деревенски с копчёной сметаной', price: '550 ₽', desc: 'Томаты · огурцы · редис · лук · укроп · сметана с жидким дымом', weight: '262 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Салат греческий', price: '990 ₽', desc: 'Томаты · огурцы · перец · брынза · маслины · крем-чиз', weight: '304 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Баклажан темпура с узбекскими томатами', price: '850 ₽', desc: 'Баклажан темпура · фисташки · соус Sweet Chile', weight: '452 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Тёплый салат с мясом бычка Primebeef', price: '990 ₽', desc: 'Ростбиф · мини картофель · соус из тунца · фасоль · черри', weight: '235 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Руккола с креветками, клубникой и пармезаном', price: '1 400 ₽', desc: 'Авокадо · креветки · клубника · бальзамик · пармезан', weight: '250 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Гриль-салат с морепродуктами и соусом дашикомбу', price: '1 300 ₽', desc: 'Кабачки · баклажан · перец · креветки · кальмар · икра тобико', weight: '365 г', photo: 'фото старое кухни/кухня 3.jpeg' }
        ]
      },
      {
        c: 'RAW',
        items: [
          { name: 'Тартар из лосося', price: '1 290 ₽', desc: 'Лосось · соус юдзу · соус шисо · авокадо', weight: '152 г', photo: 'фото старое кухни/кухня 4.jpeg' },
          { name: 'Тартар из тунца', price: '950 ₽', desc: 'Тунец красный · заправка цитрон · лук резанец', weight: '115 г', photo: 'фото старое кухни/кухня 4.jpeg' },
          { name: 'Тартар из говядины классический', price: '1 050 ₽', desc: 'Говядина · бородинский · перепелиное яйцо · горчица · каперсы', weight: '160 г', photo: 'фото старое кухни/кухня 4.jpeg' }
        ]
      },
      {
        c: 'Закуски',
        items: [
          { name: 'Брускетта с лососем', price: '990 ₽', desc: 'Санчос · лосось с/с · креметте · юдзу · икра масаго', weight: '183 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Брускетта с лососем спайси', price: '990 ₽', desc: 'Санчос · лосось · кимчи · авокадо · горчичный соус', weight: '235 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Брускетта с ростбифом', price: '990 ₽', desc: 'Санчос · ростбиф · ореховый соус · печёные перец, баклажан, кабачок', weight: '181 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Мясная тарелка', price: '1 700 ₽', desc: 'Утиная грудка · ростбиф · брезаола · вяленые томаты · оливки', weight: '180 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Мясная тарелка халяль', price: '1 000 ₽', desc: 'Сервелат халяль · колбаса казы · султанская · халяль с сыром', weight: '215 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Сырная тарелка', price: '1 700 ₽', desc: 'Блю чиз · монтазио с трюфелем · пармезан · бри · виноград · мёд', weight: '326 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Овощной сет с соусом', price: '1 100 ₽', desc: 'Огурцы · морковь · перец · сельдерей · руккола · соус Блю Чиз', weight: '755 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Оливки', price: '690 ₽', desc: 'Гигантские · тимьян · розмарин · соус шрирача', weight: '120 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Маслины Каламата', price: '690 ₽', desc: 'Греческие чёрные маслины с косточкой', weight: '100 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Закуска с сельдью', price: '590 ₽', desc: 'Сельдь · бородинский · яйцо · мини картофель · масло сливочное', weight: '280 г', photo: 'фото старое кухни/кухня 5.jpeg' }
        ]
      },
      {
        c: 'Горячие закуски',
        items: [
          { name: 'Попкорн из креветок', price: '1 090 ₽', desc: 'Креветка · темпура · миндаль · икра тобико · креми спайси', weight: '244 г', photo: 'фото старое кухни/кухня 6.jpeg' },
          { name: 'Попкорн из курицы', price: '590 ₽', desc: 'Куриная грудка · темпура · соус терияки · майонез кимчи', weight: '262 г', photo: 'фото старое кухни/кухня 6.jpeg' },
          { name: 'Сырные палочки с брусничным соусом', price: '590 ₽', desc: 'Хрустящие палочки · домашний брусничный соус', weight: '211 г', photo: 'фото старое кухни/кухня 6.jpeg' }
        ]
      },
      {
        c: 'Стейки',
        items: [
          { name: 'Стейк Миньон Латинская Америка', price: '2 300 ₽', desc: 'С зелёным сливочным маслом', weight: '200 г', photo: 'фото старое кухни/кухня 6.jpeg' },
          { name: 'Стейк Рибай Primebeef Black Angus', price: '1 490 ₽', desc: '200 дней зернового откорма · с зелёным маслом', weight: 'за 100 г', photo: 'фото старое кухни/кухня 6.jpeg' },
          { name: 'Стейк Стриплойн Primebeef Black Angus', price: '1 100 ₽', desc: '200 дней зернового откорма · с зелёным маслом', weight: 'за 100 г', photo: 'фото старое кухни/кухня 6.jpeg' },
          { name: 'Стейк Денвер Primebeef Black Angus', price: '1 900 ₽', desc: '200 дней зернового откорма · с зелёным маслом', weight: '250 г', photo: 'фото старое кухни/кухня 6.jpeg' }
        ]
      },
      {
        c: 'Горячее',
        items: [
          { name: 'Стейк из лосося со шпинатом и шампиньонами', price: '1 690 ₽', desc: 'Лосось · терияки · мидии · черри · лимон', weight: '265 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Гречка с креветками', price: '850 ₽', desc: 'Креветка · гречка · кинза · сливочное масло · пармезан', weight: '225 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Куриное бедро с булгуром', price: '890 ₽', desc: 'Бедро куриное · булгур · перечный соус', weight: '220 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Куриный стейк тандури', price: '1 150 ₽', desc: 'Куриная грудка · маринад тандури · брюссельская капуста · черри', weight: '330 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Шницель куриный', price: '1 390 ₽', desc: 'Куриная грудка · соус деми глас · сухари панко · яблоко', weight: '230 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Цыплёнок на гриле с узбекскими томатами', price: '1 590 ₽', desc: 'Цыплёнок корнишон · томаты розовые · соус терияки', weight: '452 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Котлетки из индейки с пюре', price: '1 100 ₽', desc: 'Соус на выбор: грибной, брусничный или кетчуп', weight: '340 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Щёчки бычка с пюре и соусом Коги', price: '1 400 ₽', desc: 'Томлёные щёчки · картофельное пюре · соус коги · лук порей фри', weight: '330 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Говядина в азиатском стиле с рисом', price: '1 490 ₽', desc: 'Вырезка · рис · перец · сельдерей · шампиньоны · арахис', weight: '389 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Говяжьи рёбра копчёные с соусом из еловых шишек', price: '1 590 ₽', desc: 'Копчёные рёбра · морковное пюре · соус деми глас с шишками', weight: '321 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Брискет с пюре васаби и соусом из тыквы', price: '1 790 ₽', desc: 'Запечённый брискет · пюре с васаби · тыквенный соус', weight: '260 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Бефстроганов с картофельным пюре', price: '1 300 ₽', desc: 'Говяжья вырезка · сливочный соус · шампиньоны · пюре', weight: '360 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Каша из топора', price: '790 ₽', desc: 'Тушёнка говядина · гречка · лук · сливочное масло · кинза · чеснок', weight: '365 г', photo: 'фото старое кухни/кухня 7.jpeg' }
        ]
      },
      {
        c: 'Паста',
        items: [
          { name: 'Паппарделле с лососем и красной икрой', price: '990 ₽', desc: 'Лосось · сливки · икра красная · пармезан', weight: '211 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Лапша с курицей и креветками вок', price: '850 ₽', desc: 'Кокосовый вок · бонито · соус терияки · удон', weight: '265 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Фетучини с куриным бедром терияки', price: '690 ₽', desc: 'Фетучини и фунчёза · куриное бедро · терияки · кунжут', weight: '288 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Лингвини карбонара', price: '790 ₽', desc: 'Бекон · сливки · яичный соус · пармезан', weight: '218 г', photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Пенне с ростбифом в трюфельном соусе', price: '1 150 ₽', desc: 'Ростбиф · сливки · трюфель · вяленые томаты · пармезан', weight: '228 г', photo: 'фото старое кухни/кухня 7.jpeg' }
        ]
      },
      {
        c: 'Соусы · 170 ₽',
        items: [
          { name: 'Кетчуп', price: '170 ₽', desc: null, weight: null, photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Майонез', price: '170 ₽', desc: null, weight: null, photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Свитчили', price: '170 ₽', desc: null, weight: null, photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Брусничный', price: '170 ₽', desc: null, weight: null, photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Кисло-сладкий', price: '170 ₽', desc: null, weight: null, photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Сырный', price: '170 ₽', desc: null, weight: null, photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Барбекю', price: '170 ₽', desc: null, weight: null, photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Блю-чиз', price: '170 ₽', desc: null, weight: null, photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Шрирача', price: '170 ₽', desc: null, weight: null, photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Бальзамический', price: '170 ₽', desc: null, weight: null, photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Перечный', price: '170 ₽', desc: null, weight: null, photo: 'фото старое кухни/кухня 5.jpeg' }
        ]
      },
      {
        c: 'Бургеры',
        items: [
          { name: 'Бургер «Барвиха»', price: '1 390 ₽', desc: 'Двойная котлета · коньячный соус · крем из белых грибов', weight: '562 г', photo: 'фото старое кухни/кухня 6.jpeg' },
          { name: 'Бургер «Классика»', price: '950 ₽', desc: 'Мраморная говядина · медово-горчичный · чеддер', weight: '400 г', photo: 'фото старое кухни/кухня 6.jpeg' },
          { name: 'Бургер «Сырный»', price: '1 150 ₽', desc: 'Мраморная говядина · бекон · яйцо · чеддер', weight: '515 г', photo: 'фото старое кухни/кухня 6.jpeg' },
          { name: 'Бургер с камамбером и брусникой', price: '1 350 ₽', desc: 'Говядина · камамбер · брусничный соус · романо', weight: '504 г', photo: 'фото старое кухни/кухня 6.jpeg' },
          { name: 'Бургер с рваной говядиной, манго и халапеньо', price: '1 590 ₽', desc: 'Шея говяжья · манго · халапеньо · чеддер · барбекю', weight: '400 г', photo: 'фото старое кухни/кухня 6.jpeg' },
          { name: 'Бургер с хрустящим цыплёнком', price: '690 ₽', desc: 'Хрустящий цыплёнок · майонез свитчили · чеддер · барбекю', weight: '348 г', photo: 'фото старое кухни/кухня 6.jpeg' }
        ]
      },
      {
        c: 'Бургеры халяль',
        items: [
          { name: 'Халяль бургер «Классика»', price: '1 050 ₽', desc: 'Мраморная говядина · медово-горчичный соус', weight: '400 г', photo: 'фото старое кухни/кухня 6.jpeg' },
          { name: 'Халяль бургер «Сырный»', price: '1 250 ₽', desc: 'Мраморная говядина · яйцо · чеддер', weight: '475 г', photo: 'фото старое кухни/кухня 6.jpeg' }
        ]
      },
      {
        c: 'Япония · Роллы',
        items: [
          { name: 'Ролл Барвиха', price: '1 590 ₽', desc: 'Краб · лосось · тунец · икра нерки · авокадо · манго · золото', weight: '167 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Ролл Филадельфия', price: '1 390 ₽', desc: 'Лосось · огурцы · креметте', weight: '256 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Ролл Калифорния с лососем', price: '950 ₽', desc: 'Лосось · огурцы · креметте · авокадо · тобико', weight: '224 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Ролл Калифорния с креветкой', price: '990 ₽', desc: 'Тигровая креветка · огурцы · авокадо · креметте · тобико', weight: '220 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Ролл Калифорния с крабом', price: '1 490 ₽', desc: 'Краб роза · огурцы · креметте · авокадо · тобико', weight: '204 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Ролл с авокадо и лососем', price: '690 ₽', desc: 'Лосось · авокадо · креметте · унаги · кунжут', weight: '178 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Ролл опалённый лосось с апельсином', price: '850 ₽', desc: 'Лосось · креметте · апельсин · икра тобико', weight: '212 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Ролл креветка темпура', price: '950 ₽', desc: 'Креветка · авокадо · темпура · унаги · соус Том Ям с масаго', weight: '286 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Тёплый ролл с креветкой и лососем', price: '850 ₽', desc: 'Лосось · креветка · креметте · сухари · унаги · кунжут', weight: '271 г', photo: 'фото старое кухни/десерт 2.jpeg' }
        ]
      },
      {
        c: 'Гунканы',
        items: [
          { name: 'Гункан кани', price: '280 ₽', desc: 'Краб снежный · икра тобико · майонез кимчи', weight: '71 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Гункан магуро', price: '380 ₽', desc: 'Тунец · кунжут · майонез кимчи', weight: '68 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Гункан сяке', price: '450 ₽', desc: 'Лосось · кунжут · майонез кимчи', weight: '68 г', photo: 'фото старое кухни/десерт 2.jpeg' }
        ]
      },
      {
        c: 'Поке',
        items: [
          { name: 'Поке с креветкой', price: '1 050 ₽', desc: 'Креветка · кукуруза · ореховый соус · эдамаме · чука', weight: '363 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Поке с лососем', price: '1 100 ₽', desc: 'Лосось · кукуруза · мисо · ореховый · эдамаме · редис', weight: '273 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Поке с лососем спайси', price: '1 150 ₽', desc: 'Лосось · битые огурцы · кимчи · авокадо · эдамаме · чука', weight: '323 г', photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Поке с тунцом', price: '990 ₽', desc: 'Тунец · авокадо · эдамаме · лимонный кимчи · свитчили', weight: '273 г', photo: 'фото старое кухни/десерт 2.jpeg' }
        ]
      },
      {
        c: 'Римская пицца',
        items: [
          { name: 'Пицца Барвиха', price: '890 ₽', desc: 'Окорок · пепперони · бекон · салями · моцарелла', weight: '332 г', photo: 'фото старое кухни/кухня 4.jpeg' },
          { name: 'Пицца Маргарита', price: '600 ₽', desc: 'Моцарелла · базилик · томатный соус', weight: '260 г', photo: 'фото старое кухни/кухня 4.jpeg' },
          { name: 'Пицца Пепперони халяль', price: '890 ₽', desc: 'Моцарелла · сервелат пепперони · томатный соус', weight: '320 г', photo: 'фото старое кухни/кухня 4.jpeg' },
          { name: 'Пицца Цезарь', price: '1 190 ₽', desc: 'Куриная грудка · романо · черри · соус цезарь · пармезан', weight: '362 г', photo: 'фото старое кухни/кухня 4.jpeg' },
          { name: 'Пицца Четыре сыра', price: '890 ₽', desc: 'Джерси Блю · пармезан · моцарелла · чеддер', weight: '260 г', photo: 'фото старое кухни/кухня 4.jpeg' },
          { name: 'Пицца Халяль', price: '990 ₽', desc: 'Сервелат крымский · итальянская с сыром · султанская · барбекю', weight: '450 г', photo: 'фото старое кухни/кухня 4.jpeg' }
        ]
      },
      {
        c: 'Супы',
        items: [
          { name: 'Борщ халяль', price: '690 ₽', desc: 'Свекольный фреш · говядина · сметана · бородинский · чесночное масло', weight: '382 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Суп куриный', price: '590 ₽', desc: 'Куриный бульон · фетучини · перепелиное яйцо · укроп', weight: '370 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Том ям с морепродуктами', price: '1 100 ₽', desc: 'Креветка · кальмар · кокос · лимонграсс · лайм · кинза', weight: '386 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Суп тыквенный с креветкой', price: '750 ₽', desc: 'Тыквенное пюре · креветки · сливки · семена тыквы', weight: '400 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Крем-суп грибной капучино со сливками', price: '690 ₽', desc: 'Грибы · сливки · вешенки фри · трюфельная нота', weight: '307 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Сырный суп с гриссини', price: '790 ₽', desc: 'Плавленый сыр · сливки · гриссини · трюфельное масло', weight: '355 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Хлеб с ароматным маслом', price: '390 ₽', desc: 'На выбор: санчес / итальянский / гречишный / бородинский', weight: '241 г', photo: 'фото старое кухни/кухня 5.jpeg' }
        ]
      },
      {
        c: 'Гарниры',
        items: [
          { name: 'Овощи на гриле', price: '750 ₽', desc: 'Баклажан · перец · томаты · кабачки · шампиньоны · прованские травы', weight: '230 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Гречка с грибами', price: '250 ₽', desc: 'Гречка · шампиньоны · лук шалот', weight: '185 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Пюре картофельное', price: '300 ₽', desc: 'Со сливочным маслом и молоком', weight: '150 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Мини картофель', price: '300 ₽', desc: 'Запечённый · чесночная паста · зелень', weight: '130 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Картофель фри', price: '390 ₽', desc: 'Хрустящий картофель фри', weight: '130 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Батат фри', price: '490 ₽', desc: 'Хрустящий батат', weight: '120 г', photo: 'фото старое кухни/кухня 3.jpeg' }
        ]
      },
      {
        c: 'Десерты',
        items: [
          { name: 'Тирамису', price: '690 ₽', desc: 'Маскарпоне · кофейная пропитка · какао · фирменный рецепт шефа', weight: '153 г', photo: 'фото старое кухни/десерт 1.jpeg' },
          { name: 'Шоколадный фондан', price: '690 ₽', desc: 'Горький шоколад 70% · соус манго · ванильное мороженое · золотая пудра', weight: '171 г', photo: 'фото старое кухни/десерт 1.jpeg' },
          { name: 'Чизкейк', price: '690 ₽', desc: 'Сливочный сыр · солёная карамель · клубника · морковная пыль', weight: '187 г', photo: 'фото старое кухни/десерт 1.jpeg' },
          { name: 'Медовик', price: '690 ₽', desc: 'Мёд · сливки · клубника · голубика · фисташки', weight: '287 г', photo: 'фото старое кухни/десерт 1.jpeg' },
          { name: 'Фруктовая тарелка', price: '1 600 ₽', desc: 'Виноград · апельсины · яблоки · груши · киви · ананасы · мята', weight: '773 г', photo: 'фото старое кухни/десерт 1.jpeg' }
        ]
      },
      {
        c: 'Сезонное предложение',
        items: [
          { name: 'Салат с тунцом и трюфельной заправкой', price: '990 ₽', desc: 'Тунец · фасоль · картофель беби · перепелиное яйцо · трюфель', weight: null, photo: 'фото старое кухни/кухня 4.jpeg' },
          { name: 'Севиче из лосося', price: '750 ₽', desc: 'Лосось · авокадо · томаты кимчи · фурикакэ васаби', weight: null, photo: 'фото старое кухни/кухня 4.jpeg' },
          { name: 'Закуска с паштетом из говяжьей печени', price: '550 ₽', desc: 'Паштет · санчос · карамелизованный лук · грецкий орех', weight: null, photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Томаты кимчи', price: '490 ₽', desc: 'Свежие черри в маринаде кимчи · кинза', weight: null, photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Жюльен с морепродуктами', price: '790 ₽', desc: 'Гребешок · кальмар · креветка · моцарелла · сливки', weight: null, photo: 'фото старое кухни/кухня 6.jpeg' },
          { name: 'Стейк из говяжьей печени', price: '890 ₽', desc: 'Печень · картофельное пюре · вишнёвый соус · лук порей фри', weight: null, photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Судак с пюре из цветной капусты и брокколи', price: '1 290 ₽', desc: 'Судак · батат · крем брокколи · крем цветная капуста · унаги', weight: null, photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Булгур с уткой и соусом демиглас', price: '750 ₽', desc: 'Утка конфи · булгур · сливки · смородина · кедровый орех · пармезан', weight: null, photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Орзо с ростбифом', price: '990 ₽', desc: 'Орзо · сливки · ростбиф · деми глас · икра нерки · грецкий орех', weight: null, photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Ролл с бататом', price: '590 ₽', desc: 'Запечённый батат · креметте · икра тобико · огурец', weight: null, photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Ролл с жареным лососем', price: '890 ₽', desc: 'Жареный лосось · ореховый соус · креметте · унаги · кунжут', weight: null, photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Ролл с тунцом', price: '890 ₽', desc: 'Тунец · томаты · огурцы · авокадо · соус Том Ям с масаго', weight: null, photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Крем-брюле', price: '550 ₽', desc: 'Классический крем-брюле · клубника · мята · голубика', weight: '150 г', photo: 'фото старое кухни/десерт 1.jpeg' }
        ]
      },
      {
        c: 'Постное меню',
        items: [
          { name: 'Большой зелёный салат', price: '1 100 ₽', desc: 'Авокадо · кабачки · морковь · шпинат · латук · мангольд', weight: null, photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Салат со шпинатом, киноа, сельдереем и яблоком', price: '590 ₽', desc: 'Заправка на кунжутном масле · миндаль', weight: null, photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Цветная капуста с соусом из кокосового молока и карри', price: '590 ₽', desc: 'Запечённая капуста · кокос · карри', weight: null, photo: 'фото старое кухни/кухня 7.jpeg' },
          { name: 'Рис с овощами', price: '300 ₽', desc: 'Рис · перец · кабачки · лук · морковь · соевый соус', weight: null, photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Ролл овощной', price: '600 ₽', desc: 'Романо · огурцы · перец · авокадо · печёные овощи · унаги', weight: null, photo: 'фото старое кухни/десерт 2.jpeg' },
          { name: 'Суп из корнеплодов', price: '590 ₽', desc: 'Сезонные корнеплоды · сухарики', weight: null, photo: 'фото старое кухни/кухня 5.jpeg' }
        ]
      },
      {
        c: 'Правильное питание · с КБЖУ',
        items: [
          { name: 'Стейк лосося с лимоном', price: '1 500 ₽', desc: 'Лосось на пару с лимоном', weight: '120/50 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Стейк тунца с лимоном', price: '1 200 ₽', desc: 'Тунец на пару с лимоном', weight: '120/50 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Кальмар на пару с лимоном', price: '690 ₽', desc: 'Кальмар на пару с лимоном', weight: '105/50 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Креветки на пару', price: '1 300 ₽', desc: 'С лимоном', weight: '150 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Куриная грудка на пару', price: '490 ₽', desc: 'Чистый белок без добавок', weight: '150 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Медальоны из говядины на пару', price: '1 800 ₽', desc: 'Говяжья вырезка на пару', weight: '150 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Гречка отварная', price: '250 ₽', desc: null, weight: '150 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Бурый рис отварной', price: '500 ₽', desc: null, weight: '150 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Брокколи на пару', price: '390 ₽', desc: null, weight: '127 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Цветная капуста на пару', price: '250 ₽', desc: null, weight: '127 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Брюссельская капуста на пару', price: '250 ₽', desc: null, weight: '127 г', photo: 'фото старое кухни/кухня 3.jpeg' },
          { name: 'Соус Цацики', price: '170 ₽', desc: 'Греческий соус с йогуртом и огурцом', weight: '50 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Соус Чесночный', price: '170 ₽', desc: 'Сметанный с чесноком и укропом', weight: '50 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Соус Сальса', price: '200 ₽', desc: 'Из свежих томатов', weight: '50 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Соус Томатный', price: '170 ₽', desc: 'Из томлёных томатов', weight: '50 г', photo: 'фото старое кухни/кухня 5.jpeg' },
          { name: 'Королевские финики', price: '390 ₽', desc: 'Сладкий полезный десерт', weight: '2 шт · 60 г', photo: 'фото старое кухни/десерт 1.jpeg' },
          { name: 'Королевские финики с грецким орехом', price: '550 ₽', desc: 'Финики · грецкий орех · золото', weight: '70 г', photo: 'фото старое кухни/десерт 1.jpeg' }
        ]
      }
    ],

    /* ── БАР (алкоголь, коктейли, вино) ── */
    bar: [
      {
        c: "Author's Cocktails · 1 100 ₽",
        items: [
          { name: 'French', price: '1 100 ₽', desc: 'Просекко · джин · лайм · бузина · киви · мята', weight: '150 мл', photo: 'фото бар старое/бар 2.jpeg' },
          { name: 'Rose Glasses', price: '1 100 ₽', desc: 'Джин · лимон · личи · роза · малина', weight: '390 мл', photo: 'фото бар старое/бар 2.jpeg' },
          { name: 'Up Your Cool', price: '1 100 ₽', desc: 'Джин · крыжовник · яблоко · алоэ вера · тоник', weight: '390 мл', photo: 'фото бар старое/бар 2.jpeg' },
          { name: 'Dominant', price: '1 100 ₽', desc: 'Водка · сливочный ликёр · сливки · макадамия · шоколад', weight: '200 мл', photo: 'фото бар старое/бар 2.jpeg' },
          { name: 'Last Word', price: '1 100 ₽', desc: 'Джин · лимон · красный базилик · ваниль', weight: '200 мл', photo: 'фото бар старое/бар 2.jpeg' },
          { name: 'Drink, Drink, Drink', price: '1 100 ₽', desc: 'Джин · мандарин · лимон · юдзу · тоник', weight: '390 мл', photo: 'фото бар старое/бар 2.jpeg' },
          { name: 'Electric Blue', price: '1 100 ₽', desc: 'Джин · лайм · лаванда · голубая малина · чай чанг шу', weight: '290 мл', photo: 'фото бар старое/бар 2.jpeg' },
          { name: 'Drunk Duchess Pear', price: '1 100 ₽', desc: 'Бурбон · лимонад дюшес · лимон · груша', weight: '500 мл', photo: 'фото бар старое/бар 3.jpeg' },
          { name: 'The Master and Margarita', price: '1 100 ₽', desc: 'Серебряная текила · апельсиновый ликёр · лайм · гибискус', weight: '180 мл', photo: 'фото бар старое/бар 3.jpeg' },
          { name: 'Aperol Flip', price: '1 100 ₽', desc: 'Апероль · просекко · лимон · малина', weight: '180 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'The Mafia', price: '1 100 ₽', desc: 'Джин · малина · лайм · сироп малины', weight: '160 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Sunset', price: '1 100 ₽', desc: 'Белый ром · гуава · лайм · фиалка · клубника', weight: '230 мл', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Pina Colada', price: '1 100 ₽', desc: 'Белый и тёмный ром · ананас · кокос · ириска · сливки', weight: '350 мл', photo: 'фото бар старое/бар 5.jpeg' }
        ]
      },
      {
        c: 'Classic Cocktails · 950 ₽',
        items: [
          { name: 'Aperol Spritz', price: '950 ₽', desc: 'Апероль · просекко · содовая · апельсин', weight: '350 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Bellini', price: '950 ₽', desc: 'Просекко · персиковый ликёр · персиковое пюре · лимон', weight: '150 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Pornstar Martini', price: '950 ₽', desc: 'Просекко · водка · ваниль · маракуйя · лимон', weight: '300 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Glintvegn on White Wine', price: '950 ₽', desc: 'Белое вино · мёд · яблоко · апельсин · корица · кардамон', weight: '250 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Glintvegn on Red Wine', price: '950 ₽', desc: 'Красное вино · мёд · яблоко · апельсин · корица · кардамон', weight: '250 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Old Fashioned', price: '950 ₽', desc: 'Бурбон · ангостура · тростниковый сахар · вишня', weight: '190 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'New York Sour', price: '950 ₽', desc: 'Бурбон · красное вино · лимон · сахар', weight: '200 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Whiskey & Cola', price: '950 ₽', desc: 'Купажированный виски · кола · лимон', weight: '290 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Cuba Libre', price: '950 ₽', desc: 'Золотой ром · кола · лайм', weight: '290 мл', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Mojito', price: '950 ₽', desc: 'Светлый ром · лайм · мята · сахар · содовая', weight: '390 мл', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Mojito Strawberry', price: '950 ₽', desc: 'Светлый ром · клубника · лайм · мята · содовая', weight: '390 мл', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Mai Thai', price: '950 ₽', desc: 'Золотой и тёмный ром · апельсиновый ликёр · ананас · миндаль', weight: '250 мл', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Daiquiri', price: '950 ₽', desc: 'Светлый ром · сахар · лайм', weight: '100 мл', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Cosmopolitan', price: '950 ₽', desc: 'Водка · апельсиновый ликёр · сахар · морс · лимон', weight: '130 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Paloma', price: '950 ₽', desc: 'Серебряная текила · грейпфрут · клубника · лайм', weight: '300 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Forever Orange', price: '950 ₽', desc: 'Серебряная текила · маракуйя · сахарный сироп · лайм', weight: '300 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Margarita', price: '950 ₽', desc: 'Серебряная текила · апельсиновый ликёр · лайм · соль', weight: '100 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Negroni', price: '950 ₽', desc: 'Джин · красный вермут · ликёр Кампари', weight: '200 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Gin & Tonic', price: '950 ₽', desc: 'Джин · тоник · лимон', weight: '290 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Long Island', price: '950 ₽', desc: 'Водка · ром · текила · джин · апельс. ликёр · кола · лимон', weight: '500 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Martini Bianco & Tonic', price: '950 ₽', desc: 'Белый вермут · тоник · лимон', weight: '320 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Martini Rosso & Tonic', price: '950 ₽', desc: 'Красный вермут · тоник · апельсин', weight: '320 мл', photo: 'фото бар старое/бар 4.jpeg' },
          { name: 'Martini Fiero & Tonic', price: '950 ₽', desc: 'Розовый вермут · тоник · апельсин', weight: '320 мл', photo: 'фото бар старое/бар 4.jpeg' }
        ]
      },
      {
        c: 'Белое вино',
        items: [
          { name: 'Loco Cimbali Chardonnay', price: '1 100 / 5 500 ₽', desc: 'Россия, Крым · сухое', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Pradio Priara Pinot Grigio', price: '1 200 / 6 000 ₽', desc: 'Италия · сухое', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Chenin Blanc Simonsig', price: '1 100 / 5 500 ₽', desc: 'Южная Африка, Вестерн Кейп · п/сухое', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Paddle Creek Sauvignon Blanc', price: '1 200 / 6 000 ₽', desc: 'Новая Зеландия · сухое', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: "Le Grand Noir Winemaker's Selection Chardonnay", price: '5 000 ₽', desc: 'Франция · сухое', weight: '0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Nastl Gruner Veltliner Klassik', price: '6 000 ₽', desc: 'Австрия · сухое', weight: '0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Herederos del Marques de Riscal Verdejo', price: '6 500 ₽', desc: 'Испания · сухое', weight: '0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Staraya Doroga Na Dganhot White Usadba Mezyb', price: '7 000 ₽', desc: 'Россия, Кубань · сухое', weight: '0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Riesling Galitskiy & Galitskiy', price: '7 500 ₽', desc: 'Россия, Кубань · сухое', weight: '0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Jean-Marc Brocard Chablis', price: '12 000 ₽', desc: 'Франция · сухое', weight: '0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Nik Weis St. Urbans-Hof Mosel Riesling', price: '8 000 ₽', desc: 'Германия · п/сухое', weight: '0.75 л', photo: 'фото бар старое/бар 6.jpeg' }
        ]
      },
      {
        c: 'Красное вино',
        items: [
          { name: 'Luigi Bosca Malbec', price: '1 100 / 5 500 ₽', desc: 'Аргентина, Мендоса · сухое', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Petrichor Red Shumrinka', price: '1 100 / 5 500 ₽', desc: 'Россия, Кубань · сухое', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Le Grand Noir Pinot Noir', price: '1 100 / 5 500 ₽', desc: 'Франция, Лангедок-Руссильон · сухое', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Primasole Primitivo Cielo', price: '1 100 / 5 500 ₽', desc: 'Италия · п/сухое', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Matsu El Picaro', price: '5 500 ₽', desc: 'Испания, Кастилия и Леон · сухое', weight: '0.75 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'South Vertical Cabernet Franc Reserve Chateau de Talu', price: '7 000 ₽', desc: 'Россия, Кубань · сухое', weight: '0.75 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Cote Rocheuse The Red Book, Chapter 2', price: '7 000 ₽', desc: 'Россия, Кубань · сухое', weight: '0.75 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Tenacity McLaren Vale / Barossa Valley Shiraz', price: '7 500 ₽', desc: 'Австралия, Южная Австралия · сухое', weight: '0.75 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Nipozzano Frescobaldi Chianti Rufina Reserva', price: '9 000 ₽', desc: 'Италия · сухое', weight: '0.75 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Crab & More Zinfandel', price: '5 500 ₽', desc: 'США, Калифорния · п/сухое', weight: '0.75 л', photo: 'фото бар старое/бар 7.jpeg' }
        ]
      },
      {
        c: 'Розовое вино',
        items: [
          { name: 'Flamingo Nikolaev & Sons', price: '850 / 4 250 ₽', desc: 'Россия, Кубань · сухое', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Nastl Zweigelt Rose', price: '1 100 / 5 500 ₽', desc: 'Австрия · сухое', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 6.jpeg' }
        ]
      },
      {
        c: 'Игристое вино',
        items: [
          { name: 'Prosecco Passaparola DOC, Dry', price: '1 100 / 5 500 ₽', desc: 'Италия, Венето · брют', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Grande Cuvee 1531 Cremant de Limoux Rose', price: '1 350 / 7 000 ₽', desc: 'Франция, Лангедок-Руссильон · брют', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Lambrusco Aleotti', price: '800 / 4 000 ₽', desc: 'Италия · п/сладкое', weight: '150 мл / 0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Cava Castell Llord', price: '5 500 ₽', desc: 'Испания · брют', weight: '0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Asti Bruni', price: '5 500 ₽', desc: 'Италия, Пьемонт · сладкое', weight: '0.75 л', photo: 'фото бар старое/бар 6.jpeg' }
        ]
      },
      {
        c: 'Шампанское',
        items: [
          { name: 'Alain Bailly Petronille', price: '12 000 ₽', desc: 'Франция, Шампань · брют', weight: '0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Moët & Chandon Imperial Brut', price: '16 500 ₽', desc: 'Франция, Шампань · брют', weight: '0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Follement Rose Beurton Et Fils', price: '19 000 ₽', desc: 'Франция, Шампань · брют', weight: '0.75 л', photo: 'фото бар старое/бар 6.jpeg' }
        ]
      },
      {
        c: 'Виски · 50 мл',
        items: [
          { name: 'Jim Beam', price: '750 ₽', desc: 'Bourbon · США · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Bushmills Original', price: '750 ₽', desc: 'Blended · Ирландия · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Jameson', price: '800 ₽', desc: 'Blended · Ирландия · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: "Jack Daniel's", price: '850 ₽', desc: 'Tennessee · США · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Chivas Regal Extra 12 YO', price: '1 300 ₽', desc: 'Blended · Шотландия · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Glenfiddich 12 YO', price: '1 350 ₽', desc: 'Single Malt · Шотландия · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Macallan Double Cask 12 YO', price: '2 500 ₽', desc: 'Single Malt · Шотландия · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Macallan Double Cask 18 YO', price: '6 500 ₽', desc: 'Single Malt · Шотландия · 43%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' }
        ]
      },
      {
        c: 'Коньяк · 50 мл',
        items: [
          { name: 'Hennessy VS', price: '1 250 ₽', desc: 'Франция · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'H by Hine VSOP', price: '1 350 ₽', desc: 'Франция · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Hennessy VSOP', price: '1 700 ₽', desc: 'Франция · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Hennessy XO', price: '5 500 ₽', desc: 'Франция · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' }
        ]
      },
      {
        c: 'Водка · 50 мл',
        items: [
          { name: 'Onegin', price: '600 ₽', desc: 'Россия · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Mamont', price: '600 ₽', desc: 'Россия · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Beluga Noble', price: '600 ₽', desc: 'Россия · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' }
        ]
      },
      {
        c: 'Настойки · 50 мл',
        items: [
          { name: 'Beluga Noble Botanicals Pear and Linden', price: '650 ₽', desc: 'Россия · 30%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Onegin Gourmet', price: '650 ₽', desc: 'Россия · 20% · вишня, яблоко, рябина, смородина', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' }
        ]
      },
      {
        c: 'Джин · 50 мл',
        items: [
          { name: 'Edinburgh Gin Gooseberry & Elderflower', price: '650 ₽', desc: 'Шотландия · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Drumshanbo Gunpowder Irish Gin', price: '850 ₽', desc: 'Ирландия · 43%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Bombay Sapphire', price: '850 ₽', desc: 'Великобритания · 47%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Aqva Lvce Dry Gin', price: '900 ₽', desc: 'Италия · 47%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' }
        ]
      },
      {
        c: 'Текила · 50 мл',
        items: [
          { name: 'El Tequileno Blanco', price: '750 ₽', desc: 'Мексика, Халиско · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'El Tequileno Reposado', price: '850 ₽', desc: 'Мексика, Халиско · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Jose Cuervo 1800 Blanco', price: '850 ₽', desc: 'Мексика, Халиско · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Cenote Blanco', price: '1 250 ₽', desc: 'Мексика, Халиско · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' }
        ]
      },
      {
        c: 'Ром · 50 мл',
        items: [
          { name: 'Takamaka Blanc', price: '650 ₽', desc: 'Сейшельские острова · 38%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Takamaka Dark Spiced', price: '650 ₽', desc: 'Сейшельские острова · 38%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Matusalem Gran Reserva 15 YO', price: '750 ₽', desc: 'Доминиканская Республика · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Takamaka Extra Noir', price: '800 ₽', desc: 'Сейшельские острова · 43%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Diplomatico Botucal Reserva Exclusiva', price: '1 200 ₽', desc: 'Венесуэла · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Zacapa Centenario Solera Gran Reserva 23 YO', price: '1 700 ₽', desc: 'Гватемала · 40%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' }
        ]
      },
      {
        c: 'Ликёры · 50 мл',
        items: [
          { name: 'Baileys', price: '650 ₽', desc: 'Ирландия · 17%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Jagermeister', price: '650 ₽', desc: 'Германия · 35%', weight: '50 мл', photo: 'фото бар старое/бар 1.jpeg' }
        ]
      },
      {
        c: 'Вермут · 100 мл',
        items: [
          { name: 'Martini Bianco', price: '600 ₽', desc: 'Италия · 15%', weight: '100 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Martini Rosso', price: '600 ₽', desc: 'Италия · 16%', weight: '100 мл', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Martini Fiero', price: '600 ₽', desc: 'Италия · 16%', weight: '100 мл', photo: 'фото бар старое/бар 1.jpeg' }
        ]
      },
      {
        c: 'Пиво',
        items: [
          { name: 'Spaten', price: '700 ₽', desc: 'Светлый лагер · 5.2% · хмель, цитрус, травы', weight: '0.5 л', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Franziskaner Hefe-Weissbier', price: '700 ₽', desc: 'Светлое нефильтрованное · 5.0% · фруктовые ноты', weight: '0.5 л', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Abbe Brune', price: '700 ₽', desc: 'Тёмный эль · 6.5% · кофе, шоколад, яблоки', weight: '0.5 л', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Corona Extra', price: '700 ₽', desc: 'Лагер · Мексика · 4.5%', weight: '0.33 л', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Stella Artois (безалкогольное)', price: '650 ₽', desc: 'Светлое безалкогольное · солод и хмелевая горчинка', weight: '0.44 л', photo: 'фото бар старое/бар 1.jpeg' }
        ]
      },
      {
        c: 'Сидр',
        items: [
          { name: 'Royal Apple Demi-Sec', price: '1 250 ₽', desc: 'Яблочный · полусухой · 5.0% · Беларусь', weight: '0.75 л', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Royal Apple Demi-Sweet', price: '700 ₽', desc: 'Яблочный · полусладкий · 5.0% · Беларусь', weight: '0.33 л', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Royal With Pear', price: '700 ₽', desc: 'Грушевый · полусладкий · 5.0% · Беларусь', weight: '0.33 л', photo: 'фото бар старое/бар 1.jpeg' }
        ]
      }
    ],

    /* ── НАПИТКИ (чай, кофе, лимонады, смузи, безалкогольное) ── */
    drinks: [
      {
        c: 'Авторские чаи · 1 400 ₽ · 0.8 л',
        items: [
          { name: 'Слива, маракуйя, саган-дайля', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Да Хун Пао и персик', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Виноградный глинтвейн', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Марокканский чай', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Мандарин, базилик, пряности', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Груша, ваниль, корица', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Ананас, облепиха, мёд Люй Я Бао', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Облепиха, имбирь, мёд', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Имбирь, лимон, малина', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Имбирь и лимон', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Вишня, каркаде, шу пуэр', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Вишня, клубника, лимон', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Киви и клубника', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Клубника и базилик', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Клубника и малина', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Киви и яблоко', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Манго и маракуйя', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Грейпфрут и клубника', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Гранат, мёд, саган-дайля', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Ежевика и груша', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Алоэ энд гузберри', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Масала', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Чёрная смородина', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Лесные ягоды', price: '1 400 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' }
        ]
      },
      {
        c: 'Премиум · Чайная церемония · 1 500 ₽',
        items: [
          { name: 'Уи Да Хун Пао первый сорт', price: '1 500 ₽', desc: 'Бодрящий', weight: null, photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Лао Ча Тоу', price: '1 500 ₽', desc: 'Бодрящий', weight: null, photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Многолетний дикорастущий пуэр шу', price: '1 500 ₽', desc: 'Бодрящий', weight: null, photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Пуэр шен Хайвань Лао Тун Чжи', price: '1 500 ₽', desc: 'Бодрящий', weight: null, photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Гуань Инь Ван', price: '1 500 ₽', desc: 'Релаксант', weight: null, photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Тай Пин Хоу Куй', price: '1 500 ₽', desc: 'Релаксант', weight: null, photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Люй Я Бао', price: '1 500 ₽', desc: 'Релаксант', weight: null, photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'G.A.B.A.', price: '1 500 ₽', desc: 'Релаксант', weight: null, photo: 'фото бар старое/бар 7.jpeg' }
        ]
      },
      {
        c: 'Классические чаи · 850 ₽ · 0.8 л',
        items: [
          { name: 'Пуэр Шу Юннань 2010', price: '850 ₽', desc: 'Бодрящий', weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Шен Пуэр рассыпной 2010', price: '850 ₽', desc: 'Бодрящий', weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Да Хун Пао', price: '850 ₽', desc: 'Бодрящий', weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Ассам', price: '850 ₽', desc: 'Бодрящий', weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Те Гуань Инь Мао Ча', price: '850 ₽', desc: 'Релаксант', weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Лун Цзин', price: '850 ₽', desc: 'Релаксант', weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Моли Чжень Ло (жасминовый улун)', price: '850 ₽', desc: 'Релаксант', weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Най Сян Цзин Сюань (молочный улун)', price: '850 ₽', desc: 'Релаксант', weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Бай Му Дань (белый пион)', price: '850 ₽', desc: 'Релаксант', weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Лань Гуй Жень (женьшеневый улун)', price: '850 ₽', desc: 'Релаксант', weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' }
        ]
      },
      {
        c: 'Цветочные чаи · 1 000 ₽ · 0.8 л',
        items: [
          { name: 'Чёрный с добавками', price: '1 000 ₽', desc: 'Мята · чабрец · гвоздика · бергамот', weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Зелёный с добавками', price: '1 000 ₽', desc: 'Мята · чабрец · лаванда · ромашка', weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Лун Цзин · мята · хризантема · лаванда', price: '1 000 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Молочный улун и гибискус', price: '1 000 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Шу пуэр · лемонграсс · гибискус', price: '1 000 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Ромашка и лаванда', price: '1 000 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Ромашка', price: '1 000 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Гречишный', price: '1 000 ₽', desc: null, weight: '0.8 л', photo: 'фото бар старое/бар 7.jpeg' }
        ]
      },
      {
        c: 'Холодные чаи',
        items: [
          { name: 'Персик · лимон · каркаде', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 7.jpeg' },
          { name: 'Киви · лайм · молочный улун', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 7.jpeg' }
        ]
      },
      {
        c: 'Кофе',
        items: [
          { name: 'Эспрессо', price: '350 ₽', desc: null, weight: '0.03 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Эспрессо двойной', price: '400 ₽', desc: null, weight: '0.06 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Американо', price: '400 ₽', desc: null, weight: '0.2 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Капучино', price: '550 ₽', desc: null, weight: '0.35 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Капучино с топпингом', price: '600 ₽', desc: null, weight: '0.35 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Латте', price: '550 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Латте с топпингом', price: '600 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Раф', price: '600 ₽', desc: null, weight: '0.35 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Гляссе', price: '550 ₽', desc: null, weight: '0.35 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Какао классический', price: '550 ₽', desc: null, weight: '0.35 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Какао с маршмэллоу', price: '600 ₽', desc: null, weight: '0.35 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Капучино айс', price: '550 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Латте айс', price: '550 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Matcha N-Shake (латте)', price: '650 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Молоко / Сливки', price: '50 ₽', desc: null, weight: '0.05 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Альтернативное молоко', price: '100 ₽', desc: null, weight: null, photo: 'фото бар старое/бар 6.jpeg' }
        ]
      },
      {
        c: 'Авторские лимонады · 0.5 / 1 л · 650 / 1 300 ₽',
        items: [
          { name: 'Манго и маракуйя', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Тархун и лайм', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Алоэ · крыжовник · лайм', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Ананас · клубника · личи', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Ананас · кокос · лайм', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Грейпфрут · груша · клубника', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Киви · яблоко · фейхоа', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Киви · клубника · лайм', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Клубника · базилик · лайм', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Вишня · клюква · лайм', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Ежевика · крыжовник · черника · лайм', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Мохито чёрная смородина', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Мохито клубника и малина', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Малина и маракуйя', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Клубника и малина', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Клюква и чёрная смородина', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Апельсин и лимон', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Яблоко и лайм', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Огурец и розмарин', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Ананас', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Груша', price: '650 / 1 300 ₽', desc: null, weight: '0.5 / 1 л', photo: 'фото бар старое/бар 5.jpeg' }
        ]
      },
      {
        c: 'Соки и вода',
        items: [
          { name: 'Swell ананас', price: '450 ₽', desc: 'Стекло', weight: '0.25 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Rich в ассортименте', price: '450 ₽', desc: 'Яблоко · вишня · томат · персик · апельсин', weight: '0.2 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Сок свежевыжатый', price: '800 / 950 ₽', desc: 'Апельсин · яблоко · грейпфрут · морковь', weight: '0.3 / 0.5 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Сок свежевыжатый ананасовый', price: '1 200 / 1 600 ₽', desc: null, weight: '0.3 / 0.5 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'San Benedetto', price: '600 / 1 100 ₽', desc: 'С газом / без · стекло', weight: '0.25 / 0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Baikal Pearl', price: '550 / 950 ₽', desc: 'Без газа · стекло', weight: '0.25 / 0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Baikal Reserve', price: '550 / 950 ₽', desc: 'С газом · стекло', weight: '0.25 / 0.75 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Coca-Cola', price: '550 ₽', desc: null, weight: '0.33 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Coca-Cola Zero', price: '550 ₽', desc: null, weight: '0.33 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Sprite', price: '550 ₽', desc: null, weight: '0.33 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Fanta', price: '550 ₽', desc: null, weight: '0.33 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Rich Tonic', price: '550 ₽', desc: 'Indian / Bitter Lemon', weight: '0.33 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Red Bull', price: '600 ₽', desc: 'Энергетический напиток', weight: '0.25 л', photo: 'фото бар старое/бар 6.jpeg' },
          { name: 'Red Bull Sugarfree', price: '600 ₽', desc: 'Энергетический напиток', weight: '0.25 л', photo: 'фото бар старое/бар 6.jpeg' }
        ]
      },
      {
        c: 'Смузи · 0.5 л · на молоке / соке · 750 / 850 ₽',
        items: [
          { name: 'Лесные ягоды', price: '750 / 850 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Вишня · клубника · банан', price: '750 / 850 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Малина · ежевика · ананас', price: '750 / 850 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Малина · груша · манго', price: '750 / 850 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Киви и яблоко', price: '750 / 850 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Маракуйя и клубника', price: '750 / 850 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' }
        ]
      },
      {
        c: 'Молочные коктейли · 0.5 л · 750 ₽',
        items: [
          { name: 'Клубника', price: '750 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Банан', price: '750 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Ваниль', price: '750 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Карамель', price: '750 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Сникерс', price: '750 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Орео', price: '750 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Баунти', price: '750 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' },
          { name: 'Шоколад', price: '750 ₽', desc: null, weight: '0.5 л', photo: 'фото бар старое/бар 5.jpeg' }
        ]
      },
      {
        c: 'Закуски и сладости',
        items: [
          { name: 'Вяленое мясо', price: '450 ₽', desc: 'Курица · индейка · страус · говядина · свинина · оленина · конина · кролик', weight: '50 г', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Арахис солёный', price: '550 ₽', desc: null, weight: '150 г', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Микс орешков с пармезаном и крекеры с васаби', price: '720 ₽', desc: 'Миндаль · кешью · фисташки · нут с пармезаном · крекеры с васаби', weight: '100 г', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Миндаль в специях', price: '720 ₽', desc: null, weight: '100 г', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Кешью в специях', price: '720 ₽', desc: null, weight: '80 г', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Микс орешки в специях', price: '720 ₽', desc: 'Арахис · миндаль · кешью', weight: '75 г', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Чипсы в ассортименте', price: '350 ₽', desc: null, weight: '70 г', photo: 'фото бар старое/бар 1.jpeg' },
          { name: 'Вафельные шарики в шоколаде', price: '720 ₽', desc: null, weight: '100 г', photo: 'фото старое кухни/десерт 1.jpeg' },
          { name: 'Миндаль в шоколаде / Трюфель в какао', price: '720 ₽', desc: null, weight: '100 г', photo: 'фото старое кухни/десерт 1.jpeg' },
          { name: 'Фундук в молочном шоколаде', price: '720 ₽', desc: null, weight: '100 г', photo: 'фото старое кухни/десерт 1.jpeg' },
          { name: 'Мороженое (шарики)', price: '500 ₽', desc: 'Ваниль · шоколад · клубника', weight: null, photo: 'фото старое кухни/десерт 1.jpeg' }
        ]
      }
    ]
  };

  /* ---------------------------------------------------------------------------
   *  KBZU — СПРАВОЧНИК КБЖУ БЛЮД
   *  Источник: KBZU_DATA (location.html).
   *  Ключ — название блюда (или его часть). Значение:
   *    weight   — вес порции
   *    calories — калорийность (ккал)
   *    protein  — белки (г)
   *    fat      — жиры (г)
   *    carbs    — углеводы (г)
   *  Часть блюд содержит только weight — КБЖУ для них в исходниках не указано.
   * ------------------------------------------------------------------------- */
  const kbzu = {
    // Салаты
    'Цезарь с креветками':           { weight: '250 г', calories: '521', protein: '24,77', fat: '41,82', carbs: '26,21' },
    'Цезарь с курицей':              { weight: '230 г', calories: '478', protein: '28,80', fat: '36,95', carbs: '14,40' },
    'Оливье со слабосолёным лососем':{ weight: '237 г', calories: '643', protein: '34,79', fat: '46,46', carbs: '21,02' },
    'Оливье с куриной грудкой':      { weight: '222 г', calories: '460', protein: '17,29', fat: '31,24', carbs: '21,85' },
    'Салат с печёной свёклой':       { weight: '232 г', calories: '532', protein: '13,42', fat: '40,18', carbs: '18,80' },
    'Салат по-деревенски':           { weight: '262 г', calories: null,  protein: null,    fat: null,    carbs: null },
    'Салат греческий':               { weight: '304 г', calories: '396', protein: '13,22', fat: '30,57', carbs: '14,38' },
    'Баклажан темпура':              { weight: '452 г', calories: '803', protein: '45,33', fat: '59,21', carbs: '17,72' },
    'Тёплый салат с мясом бычка':    { weight: '235 г', calories: '408', protein: '17,25', fat: '30,86', carbs: '10,48' },
    'Руккола с креветками':          { weight: '250 г', calories: '381', protein: '15,98', fat: '27,74', carbs: '18,12' },
    'Гриль-салат с морепродуктами':  { weight: '365 г', calories: '329', protein: '22,86', fat: '12,73', carbs: '26,21' },
    // RAW
    'Тартар из лосося':              { weight: '152 г', calories: '547', protein: '20,01', fat: '25,84', carbs: '13,01' },
    'Тартар из тунца':               { weight: '115 г', calories: '247', protein: '18,72', fat: '16,98', carbs: '2,17' },
    'Тартар из говядины':            { weight: '160 г', calories: '379', protein: '17,76', fat: '27,22', carbs: '13,61' },
    // Закуски
    'Брускетта с лососем':           { weight: '183 г', calories: '406', protein: '15,81', fat: '26,96', carbs: '24,54' },
    'Брускетта с лососем спайси':    { weight: '235 г', calories: '595', protein: '16,10', fat: '25,86', carbs: '29,98' },
    'Брускетта с ростбифом':         { weight: '181 г', calories: '430', protein: '19,68', fat: '26,21', carbs: '27,16' },
    'Закуска с сельдью':             { weight: '280 г', calories: '503', protein: '18,99', fat: '30,90', carbs: '37,01' },
    'Мясная тарелка халяль':         { weight: '215 г', calories: '655', protein: '32,90', fat: '45,64', carbs: '5,83' },
    'Мясная тарелка':                { weight: '180 г', calories: '414', protein: '42,52', fat: '18,84', carbs: '17,46' },
    'Овощной сет':                   { weight: '755 г', calories: '533', protein: '18,15', fat: '32,67', carbs: '45,17' },
    'Сырная тарелка':                { weight: '326 г', calories: '1102',protein: '55,57', fat: '71,21', carbs: '61,82' },
    'Маслины Каламата':              { weight: '100 г', calories: '376', protein: '18,25', fat: '25,28', carbs: '5,70' },
    'Оливки':                        { weight: '120 г', calories: '376', protein: '1,13',  fat: '38,34', carbs: '9,10' },
    // Горячие закуски
    'Попкорн из креветок':           { weight: '244 г', calories: '558', protein: '26,85', fat: '31,79', carbs: '45,77' },
    'Попкорн из курицы':             { weight: '262 г', calories: '534', protein: '27,55', fat: '23,74', carbs: '41,37' },
    'Сырные палочки':                { weight: '211 г', calories: '814', protein: '22,30', fat: '52,69', carbs: '56,16' },
    // Стейки
    'Стейк Миньон':                  { weight: '205 г', calories: '472', protein: '30,06', fat: '38,88', carbs: '0,87' },
    'Стейк Рибай':                   { weight: '100 г', calories: '293', protein: '47,97', fat: '52,03', carbs: '0' },
    'Стейк Стриплойн':               { weight: '100 г', calories: '230', protein: '16',    fat: '18',    carbs: '0,16' },
    'Стейк Денвер':                  { weight: '295 г', calories: '904', protein: '44,01', fat: '87,34', carbs: '3,89' },
    // Горячее
    'Стейк из лосося со шпинатом':   { weight: '265 г', calories: '469', protein: '17,09', fat: '31,24', carbs: '25,40' },
    'Гречка с креветками':           { weight: '225 г', calories: '286', protein: '21,96', fat: '14,28', carbs: '34,78' },
    'Куриное бедро с булгуром':      { weight: '220 г', calories: null,  protein: null,    fat: null,    carbs: null },
    'Куриный стейк тандури':         { weight: '330 г', calories: '774', protein: '57,68', fat: '9,83',  carbs: '31,44' },
    'Шницель куриный':               { weight: '230 г', calories: '608', protein: '27,73', fat: '17,18', carbs: '37,21' },
    'Цыплёнок на гриле':             { weight: '452 г', calories: '803', protein: '45,33', fat: '59,21', carbs: '17,72' },
    'Котлетки из индейки':           { weight: '340 г', calories: '604', protein: '29,33', fat: '30,82', carbs: '34,91' },
    'Щёчки бычка':                   { weight: '330 г', calories: '499', protein: '38,11', fat: '24,18', carbs: '33,44' },
    'Говядина в азиатском стиле':    { weight: '389 г', calories: '497', protein: '27,43', fat: '12,29', carbs: '65,49' },
    'Говяжьи рёбра копчёные':        { weight: '321 г', calories: '566', protein: '22,58', fat: '47,69', carbs: '12,55' },
    'Брискет':                       { weight: '260 г', calories: '619', protein: '29,85', fat: '50,01', carbs: '11,28' },
    'Бефстроганов':                  { weight: '360 г', calories: '609', protein: '30,98', fat: '40,28', carbs: '27,07' },
    'Каша из топора':                { weight: '365 г', calories: '765', protein: '31,42', fat: '55,97', carbs: '19,40' },
    // Паста
    'Паппарделле с лососем':         { weight: '211 г', calories: '689', protein: '21,21', fat: '53,33', carbs: '12,47' },
    'Лапша с курицей и креветками':  { weight: '265 г', calories: null,  protein: null,    fat: null,    carbs: null },
    'Фетучини с куриным бедром':     { weight: '288 г', calories: '680', protein: '35,98', fat: '28,87', carbs: '67,58' },
    'Лингвини карбонара':            { weight: '218 г', calories: '818', protein: '21,29', fat: '64,37', carbs: '36,72' },
    'Пенне с ростбифом':             { weight: '228 г', calories: '623', protein: '27,77', fat: '57,69', carbs: '45,44' },
    // Бургеры
    'Бургер «Барвиха»':              { weight: '562 г', calories: '1235',protein: '42,14', fat: '85,77', carbs: '69,23' },
    'Бургер «Классика»':             { weight: '400 г', calories: '985', protein: '32,08', fat: '62,98', carbs: '73,56' },
    'Бургер «Сырный»':               { weight: '515 г', calories: '1228',protein: '46,28', fat: '93,58', carbs: '70,36' },
    'Бургер с камамбером':           { weight: '504 г', calories: '1480',protein: '47,28', fat: '103,98',carbs: '91,19' },
    'Бургер с рваной говядиной':     { weight: '400 г', calories: '1085',protein: '38,98', fat: '69,98', carbs: '70,36' },
    'Бургер с хрустящим цыплёнком':  { weight: '348 г', calories: '945', protein: '36,98', fat: '58,98', carbs: '62,36' },
    'Халяль бургер «Классика»':      { weight: '400 г', calories: '1085',protein: '38,98', fat: '69,98', carbs: '70,36' },
    'Халяль бургер «Сырный»':        { weight: '475 г', calories: '1180',protein: '42,28', fat: '76,98', carbs: '74,36' },
    // Япония
    'Ролл Барвиха':                  { weight: '167 г', calories: '263', protein: '12,03', fat: '5,07',  carbs: '40,08' },
    'Ролл Филадельфия':              { weight: '256 г', calories: '449', protein: '25,38', fat: '22,06', carbs: '38,30' },
    'Ролл Калифорния с лососем':     { weight: '224 г', calories: '343', protein: '17,19', fat: '12,48', carbs: '42,44' },
    'Ролл Калифорния с креветкой':   { weight: '220 г', calories: '299', protein: '17,10', fat: '7,02',  carbs: '39,96' },
    'Ролл Калифорния с крабом':      { weight: '204 г', calories: '294', protein: '13,86', fat: '8,57',  carbs: '42,00' },
    'Ролл с авокадо и лососем':      { weight: '178 г', calories: '317', protein: '10,08', fat: '11,86', carbs: '42,34' },
    'Ролл опалённый лосось с апельсином': { weight: '212 г', calories: '369', protein: '14,91', fat: '15,25', carbs: '42,57' },
    'Ролл креветка темпура':         { weight: '286 г', calories: '512', protein: '17,51', fat: '22,55', carbs: '59,67' },
    'Тёплый ролл с креветкой и лососем': { weight: '271 г', calories: '627', protein: '22,85', fat: '17,22', carbs: '94,09' },
    // Гунканы
    'Гункан кани':                   { weight: '71 г',  calories: '132', protein: '8,02',  fat: '6,23',  carbs: '14,36' },
    'Гункан магуро':                 { weight: '68 г',  calories: '135', protein: '9,47',  fat: '4,83',  carbs: '10,34' },
    'Гункан сяке':                   { weight: '68 г',  calories: '159', protein: '8,69',  fat: '9,34',  carbs: '10,68' },
    // Поке
    'Поке с креветкой':              { weight: '363 г', calories: '483', protein: '20,61', fat: '13,07', carbs: '48,99' },
    'Поке с лососем спайси':         { weight: '323 г', calories: '439', protein: '20,46', fat: '29,18', carbs: '27,46' },
    'Поке с лососем':                { weight: '273 г', calories: '431', protein: '18,81', fat: '20,68', carbs: '41,80' },
    'Поке с тунцом':                 { weight: '273 г', calories: '426', protein: '21,28', fat: '18,84', carbs: '42,65' },
    // Пицца
    'Пицца Барвиха':                 { weight: '332 г', calories: '1209',protein: '41,48', fat: '77,02', carbs: '99,82' },
    'Пицца Маргарита':               { weight: '260 г', calories: '996', protein: '30,14', fat: '48,67', carbs: '96,99' },
    'Пицца Пепперони':               { weight: '320 г', calories: '986', protein: '34,14', fat: '56,87', carbs: '98,12' },
    'Пицца Цезарь':                  { weight: '362 г', calories: '862', protein: '49,89', fat: '33,80', carbs: '98,60' },
    'Пицца Четыре сыра':             { weight: '260 г', calories: '962', protein: '37,98', fat: '47,66', carbs: '96,28' },
    'Пицца Халяль':                  { weight: '450 г', calories: '1101',protein: '53,41', fat: '72,21', carbs: '69,23' },
    // Супы
    'Борщ халяль':                   { weight: '382 г', calories: '485', protein: '25,40', fat: '24,83', carbs: '40,43' },
    'Суп куриный':                   { weight: '370 г', calories: '305', protein: '15,49', fat: '17,21', carbs: '27,72' },
    'Том ям с морепродуктами':       { weight: '386 г', calories: '354', protein: '38,35', fat: '17,84', carbs: '16,59' },
    'Суп тыквенный с креветкой':     { weight: '400 г', calories: null,  protein: null,    fat: null,    carbs: null },
    'Крем-суп грибной капучино':     { weight: '307 г', calories: null,  protein: null,    fat: null,    carbs: null },
    'Сырный суп с гриссини':         { weight: '355 г', calories: '426', protein: '12,18', fat: '31,28', carbs: '23,89' },
    'Хлеб с ароматным маслом':       { weight: '241 г', calories: '711', protein: '11,77', fat: '35,14', carbs: '85,90' },
    // Гарниры
    'Овощи на гриле':                { weight: '230 г', calories: '130', protein: '3,35',  fat: '6,41',  carbs: '14,08' },
    'Гречка с грибами':              { weight: '185 г', calories: '132', protein: '4,53',  fat: '3,89',  carbs: '17,47' },
    'Пюре картофельное':             { weight: '150 г', calories: '348', protein: '5,40',  fat: '18,23', carbs: '38,25' },
    'Мини картофель':                { weight: '130 г', calories: '209', protein: '5,69',  fat: '4,10',  carbs: '40,03' },
    'Картофель фри':                 { weight: '130 г', calories: '364', protein: '3,98',  fat: '15,28', carbs: '40,49' },
    'Батат фри':                     { weight: '120 г', calories: '208', protein: '2,88',  fat: '7,79',  carbs: '36,18' },
    // Десерты
    'Тирамису':                      { weight: '153 г', calories: '538', protein: '12,62', fat: '40,18', carbs: '31,73' },
    'Шоколадный фондан':             { weight: '171 г', calories: '550', protein: '9,96',  fat: '35,79', carbs: '44,56' },
    'Чизкейк':                       { weight: '187 г', calories: '608', protein: '9,59',  fat: '42,83', carbs: '45,31' },
    'Медовик':                       { weight: '287 г', calories: '786', protein: '18,68', fat: '29,15', carbs: '91,61' },
    'Фруктовая тарелка':             { weight: '773 г', calories: '638', protein: '15,19', fat: '11,76', carbs: '113,31' },
    'Крем-брюле':                    { weight: '150 г', calories: '430', protein: '6,80',  fat: '28,40', carbs: '34,20' },
    // Правильное питание (КБЖУ из самого меню)
    'Стейк лосося с лимоном':        { weight: '120/50 г', calories: '231,08', protein: '28,05', fat: '11,33', carbs: '1,74' },
    'Стейк тунца с лимоном':         { weight: '120/50 г', calories: '160,64', protein: '27,69', fat: '1,73',  carbs: '2,22' },
    'Кальмар на пару с лимоном':     { weight: '105/50 г', calories: '145,1',  protein: '19,35', fat: '4,46',  carbs: '1,5' },
    'Креветки на пару':              { weight: '150 г', calories: '138',    protein: '22,8',  fat: '1,8',   carbs: '5,55' },
    'Куриная грудка на пару':        { weight: '150 г', calories: '169,5',  protein: '35,4',  fat: '2,85',  carbs: '0' },
    'Медальоны из говядины на пару': { weight: '150 г', calories: '157,8',  protein: '29,7',  fat: '3,75',  carbs: '0' },
    'Гречка отварная':               { weight: '150 г', calories: '82,8',   protein: '3,38',  fat: '0,9',   carbs: '15,37' },
    'Бурый рис отварной':            { weight: '150 г', calories: '151,5',  protein: '6',     fat: '0,45',  carbs: '31,95' },
    'Брокколи на пару':              { weight: '127 г', calories: '35,94',  protein: '3,43',  fat: '0,38',  carbs: '5,97' },
    'Цветная капуста на пару':       { weight: '127 г', calories: '38,1',   protein: '3,05',  fat: '0,38',  carbs: '6,1' },
    'Брюссельская капуста на пару':  { weight: '127 г', calories: '59,69',  protein: '6,1',   fat: '0,51',  carbs: '10,29' },
    'Соус Цацики':                   { weight: '50 г',  calories: '29,32',  protein: '3,26',  fat: '0,8',   carbs: '2,16' },
    'Соус Чесночный':                { weight: '50 г',  calories: '98,53',  protein: '1,39',  fat: '9,14',  carbs: '2,44' },
    'Соус Сальса':                   { weight: '50 г',  calories: '12,33',  protein: '0,33',  fat: '0,01',  carbs: '2,86' },
    'Соус Томатный':                 { weight: '50 г',  calories: '109,09', protein: '3,67',  fat: '1,33',  carbs: '20,45' },
    'Королевские финики':            { weight: '60 г',  calories: '166,2',  protein: '1,08',  fat: '0,3',   carbs: '44,28' },
    'Королевские финики с грецким орехом': { weight: '70 г', calories: '231', protein: '2,46', fat: '6,43', carbs: '45,3' }
  };

  /* ---------------------------------------------------------------------------
   *  FEATURES — НАПРАВЛЕНИЯ / ФИЧИ ЗАВЕДЕНИЙ
   *  Источник: FEATS (index.html).
   *  Описывает крупные продуктовые направления сети, используемые для
   *  модальных окон на главной. Каждая запись:
   *    tag   — короткий ярлык
   *    title — заголовок
   *    desc  — описание
   *    points — массив тезисов
   *    cta   — текст кнопки
   *    href  — куда ведёт кнопка
   * ------------------------------------------------------------------------- */
  const features = {
    drinks: {
      tag: 'Барная карта',
      title: 'Напитки',
      desc: 'Коктейльная карта, разработанная совместно с приглашёнными барменами. Каждая позиция — отдельная история вкуса.',
      points: ['Авторские коктейли — 10+ позиций', 'Безалкогольные версии всех хитов', 'Элитный китайский улун и белый чай', 'Первоклассный крепкий алкоголь', 'Локальные крафтовые позиции', 'Сезонные лимитированные напитки'],
      cta: 'Смотреть меню',
      href: 'location.html'
    },
    hookahs: {
      tag: 'Электрочаша',
      title: 'Кальяны',
      desc: 'Электрическая чаша заменяет уголь: стабильная температура, нет горечи, нет запаха горения. К каждому столу — персональный мастер.',
      points: ['60+ авторских табачных миксов', 'Колбы Wookah и Egeglas — премиум', 'WTO, Darkside, Tangiers, Daily Hookah', 'Стабильная температура без угля', 'Персональный кальянный мастер', 'Кастомный микс под вкус гостя'],
      cta: 'Смотреть меню',
      href: 'location.html'
    },
    food: {
      tag: 'Авторская кухня',
      title: 'Европейская кухня',
      desc: 'Меню шеф-повара разработано так, чтобы не перебивать вкус кальяна, но быть полноценным ужином. Кухня работает до 02:00.',
      points: ['Закуски и снеки для кальяна', 'Горячие блюда от шеф-повара', 'Десерты и авторское мороженое', 'Натуральное вяленое мясо', 'Вегетарианские и безглютеновые опции', 'Сезонное обновление меню'],
      cta: 'Смотреть меню',
      href: 'location.html'
    },
    games: {
      tag: 'Развлечения',
      title: 'Игры',
      desc: 'Для тех, кто хочет не просто отдохнуть, а провести вечер активно. Игровые зоны органично вписаны в атмосферу без лишнего шума.',
      points: ['PlayStation 4 в выделенных зонах', 'Большой выбор настольных игр', 'Мафия, Alias, Активити и другие', 'Квизы и тематические вечера', 'Форматы для больших компаний'],
      cta: 'Забронировать стол',
      href: '#contact'
    },
    vip: {
      tag: 'Приватные комнаты',
      title: 'VIP',
      desc: 'Закрытые комнаты для больших компаний. Свой вход, свой мастер, своя атмосфера. Идеально для праздников и корпоративов.',
      points: ['Вместимость 8–20 человек', 'Приватный вход и отдельная зона', 'Персональный сервис и мастер', 'Система для трансляций внутри', 'Дни рождения и корпоративы', 'Гибкое меню под мероприятие'],
      cta: 'Забронировать VIP',
      href: '#contact'
    },
    streams: {
      tag: 'Прямые эфиры',
      title: 'Трансляции',
      desc: 'Огромные проекторы для прямых трансляций главных спортивных событий планеты. Кальян + матч — это уже традиция.',
      points: ['Все матчи РПЛ и Лиги Чемпионов', 'UFC и профессиональный бокс', 'Формула-1 и MotoGP', 'Хоккей НХЛ и КХЛ', 'Тематические вечера по событиям', 'Атмосфера стадиона без толпы'],
      cta: 'Забронировать стол',
      href: '#contact'
    },
    karaoke: {
      tag: 'Живая сцена',
      title: 'Karaoke & Live',
      desc: 'Приватные комнаты с профессиональным звуком и освещением. Тысячи треков, персональный саундчек и атмосфера настоящего выступления — без посторонних глаз.',
      points: ['Приватные комнаты на 4–20 человек', '10 000+ треков на русском и английском', 'Профессиональный звук и микрофоны', 'Цветовое сценическое освещение', 'Запись вашего выступления по желанию', 'Доступно в большинстве заведений сети'],
      cta: 'Забронировать комнату',
      href: '#contact'
    }
  };

  /* ---------------------------------------------------------------------------
   *  META — СВОДКА ПО СЕТИ
   *  totalVenues   — всего заведений в массиве venues
   *  totalCities   — число уникальных городов
   *  karaokeVenues — число заведений с караоке (feature 'karaoke')
   * ------------------------------------------------------------------------- */
  const meta = {
    totalVenues: venues.length,
    totalCities: new Set(venues.map(function (v) { return v.city; })).size,
    karaokeVenues: venues.filter(function (v) { return v.features.indexOf('karaoke') !== -1; }).length,
    foundedYear: 2017,
    slogan: 'Новый уровень привычного удовольствия'
  };

  /* ---------------------------------------------------------------------------
   *  ЭКСПОРТ В ГЛОБАЛЬНУЮ ОБЛАСТЬ
   * ------------------------------------------------------------------------- */
  window.BARVIKHA = {
    venues: venues,
    menu: menu,
    kbzu: kbzu,
    features: features,
    meta: meta
  };

})();
