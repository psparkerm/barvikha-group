/* ============================================================================
 *  БАРВИХА — СИСТЕМА АНОНСОВ И АФИШ
 *  announcements.js
 * ============================================================================
 *
 *  ЧТО ЭТО
 *  -------
 *  Один файл, который подключается на любую страницу сайта и автоматически:
 *    • показывает модальное окно-афишу при первом заходе в сессии
 *    • вставляет компактную кнопку-индикатор в hero (для повторного открытия)
 *    • умеет переключать показ по странице (index / location / moscow / karaoke)
 *    • переиспользует существующую модалку брони openBooking(), передавая
 *      контекст события (заголовок, дата, время)
 *
 *  КАК ПОДКЛЮЧИТЬ К СТРАНИЦЕ
 *  -------------------------
 *  Перед </body> на странице:
 *      <script src="announcements.js" data-page="index"></script>
 *
 *  data-page — какая это страница: 'index' | 'location' | 'moscow' | 'karaoke'.
 *  Используется для фильтрации анонсов по полю pages.
 *
 *  КАК ДОБАВИТЬ НОВЫЙ АНОНС
 *  ------------------------
 *  Допиши новую запись в массив ANNOUNCEMENTS ниже. Шаблон:
 *
 *  {
 *    id:          'unique-key',                 // уникальный ключ (для sessionStorage)
 *    active:      true,                          // показывать или нет
 *    pinned:      false,                         // если true — показывать каждый раз (не запоминать закрытие)
 *    pages:       ['index','location','moscow','karaoke'],  // на каких страницах
 *    image:       'анонсы/announce-30may.jpg',          // путь к фото-постеру (вертикальное предпочтительно)
 *    badge:       'Live · большой экран',        // красная плашка сверху (опц.)
 *    date:        '30 мая · 19:00',              // дата строкой
 *    title:       'Финал Лиги Чемпионов\\nв БАРВИХЕ',  // \\n — перенос строки
 *    vs:          'Арсенал × ПСЖ',               // подзаголовок (опц., для матчей)
 *    description: 'Текст описания события...',
 *    features:    ['Проектор','Кухня','Бар','VIP'],
 *    ctaPrimary:  { text: 'Забронировать стол', action: 'match-booking', date:'2026-05-30', time:'18:30' },
 *    ctaSecondary:{ text: 'Позже', action: 'close' }
 *  }
 *
 *  Допустимые action для кнопок:
 *    'close'          — просто закрыть афишу
 *    'booking'        — открыть стандартную модалку брони openBooking()
 *    'match-booking'  — открыть бронь с предзаполнением даты/времени (date,time у кнопки)
 *    'url'            — открыть внешний URL (url у кнопки)
 *    'tel'            — позвонить (tel у кнопки)
 *
 * ============================================================================ */

const ANNOUNCEMENTS = [
  {
    id: 'ucl-final-2026-may30',
    active: true,
    pinned: false,
    pages: ['index', 'location'],
    image: 'анонсы/announce-30may.jpg',
    badge: 'Live · большой экран',
    date: '30 мая · 19:00',
    title: 'Финал Лиги Чемпионов\nв БАРВИХЕ',
    vs: 'Арсенал × ПСЖ',
    description: 'Главный матч сезона на большом экране. Атмосфера стадиона без толпы: авторская кухня, фирменный бар, кальяны, удобные диваны и VIP-зоны. Бронируйте стол заранее — лучшие места уходят первыми.',
    features: ['Проектор', 'Кухня шефа', 'Бар', 'Кальяны', 'VIP-зоны'],
    ctaPrimary:   { text: 'Забронировать стол', action: 'match-booking', date: '2026-05-30', time: '18:30' },
    ctaSecondary: { text: 'Позже', action: 'close' }
  }
];

/* ========================================================================== */
/* CSS модалки и кнопки-индикатора — объявлено ДО IIFE (иначе TDZ-ошибка)      */
/* ========================================================================== */

const ANN_CSS = `
.ann-modal{position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);display:flex;align-items:center;justify-content:center;padding:1.5rem;opacity:0;pointer-events:none;transition:opacity .45s cubic-bezier(.22,.61,.36,1)}
.ann-modal.on{opacity:1;pointer-events:auto}
.ann-wrap{position:relative;max-width:880px;width:100%;display:grid;grid-template-columns:auto 1fr;gap:0;background:linear-gradient(135deg,#070707,#000);border:1px solid rgba(219,194,120,.32);max-height:calc(100vh - 3rem);overflow:hidden;transform:translateY(28px) scale(.97);transition:transform .55s cubic-bezier(.22,.61,.36,1);box-shadow:0 30px 90px rgba(0,0,0,.85)}
.ann-modal.on .ann-wrap{transform:none}
.ann-wrap::before,.ann-wrap::after{content:'';position:absolute;width:42px;height:42px;pointer-events:none;z-index:3}
.ann-wrap::before{top:-1px;left:-1px;border-top:1.5px solid #DBC278;border-left:1.5px solid #DBC278}
.ann-wrap::after{bottom:-1px;right:-1px;border-bottom:1.5px solid #DBC278;border-right:1.5px solid #DBC278}
.ann-x{position:absolute;top:.85rem;right:.85rem;z-index:5;width:36px;height:36px;background:rgba(0,0,0,.7);border:1px solid rgba(219,194,120,.32);color:#F2EFE6;font-size:1.3rem;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s;font-family:'Baron Neue','Montserrat',sans-serif}
.ann-x:hover{background:rgba(219,194,120,.18);color:#DBC278;border-color:#DBC278}
.ann-img{display:block;width:auto;height:100%;max-height:580px;object-fit:cover;align-self:stretch}
.ann-body{padding:2.8rem 2.6rem;display:flex;flex-direction:column;justify-content:center;gap:.4rem;min-width:0}
.ann-badge{display:inline-flex;align-items:center;gap:.55rem;font-family:'Baron Neue','Montserrat',sans-serif;font-size:.5rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#ff5a5a;padding:.35rem .7rem;border:1px solid rgba(255,90,90,.4);background:rgba(255,90,90,.06);align-self:flex-start;margin-bottom:.9rem}
.ann-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:#ff5a5a;box-shadow:0 0 8px rgba(255,90,90,.7);animation:annPulse 1.4s ease-in-out infinite}
@keyframes annPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
.ann-date{font-family:'Baron Neue','Montserrat',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#DBC278;margin-bottom:.6rem}
.ann-h{font-family:'Baron Neue','Montserrat',sans-serif;font-size:clamp(1.4rem,2.4vw,1.9rem);font-weight:400;letter-spacing:.04em;line-height:1.15;color:#F2EFE6;margin:0 0 .6rem;white-space:pre-line}
.ann-vs{font-family:'Baron Neue','Montserrat',sans-serif;font-size:clamp(1rem,1.8vw,1.2rem);font-weight:400;letter-spacing:.06em;color:#F2EFE6;margin-bottom:.8rem}
.ann-p{font-size:.88rem;color:rgba(242,239,230,.62);line-height:1.7;margin:.3rem 0 1.3rem;max-width:36rem}
.ann-features{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.4rem}
.ann-feat{font-family:'Baron Neue','Montserrat',sans-serif;font-size:.5rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(242,239,230,.62);padding:.4rem .75rem;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.02)}
.ann-cta{display:flex;gap:.6rem;flex-wrap:wrap}
.ann-cta-pri{font-family:'Baron Neue','Montserrat',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#000;background:#DBC278;border:none;padding:1.05rem 1.9rem;cursor:pointer;flex:1;min-width:200px;transition:box-shadow .3s,transform .2s}
.ann-cta-pri:hover{box-shadow:0 0 40px rgba(219,194,120,.35);transform:translateY(-2px)}
.ann-cta-sec{font-family:'Baron Neue','Montserrat',sans-serif;font-size:.6rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(242,239,230,.62);background:transparent;border:1px solid rgba(255,255,255,.06);padding:1.05rem 1.5rem;cursor:pointer;transition:all .25s}
.ann-cta-sec:hover{color:#DBC278;border-color:rgba(219,194,120,.32)}
@media(max-width:768px){
  .ann-modal{padding:.8rem;align-items:flex-start;padding-top:3rem}
  .ann-wrap{grid-template-columns:1fr;max-height:calc(100vh - 4rem);overflow-y:auto}
  .ann-img{max-height:300px;width:100%;object-fit:cover;object-position:center 30%}
  .ann-body{padding:1.6rem 1.3rem 1.6rem}
  .ann-cta{flex-direction:column}
  .ann-cta-pri,.ann-cta-sec{width:100%}
}
.ann-indicator{display:inline-flex;align-items:center;gap:.6rem;margin-top:1.6rem;padding:.6rem 1.2rem;background:rgba(219,194,120,.08);border:1px solid rgba(219,194,120,.32);font-family:'Baron Neue','Montserrat',sans-serif;font-size:.58rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#DBC278;cursor:pointer;transition:all .3s;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.ann-indicator::before{content:'';width:6px;height:6px;border-radius:50%;background:#ff5a5a;box-shadow:0 0 8px rgba(255,90,90,.7);animation:annPulse 1.6s ease-in-out infinite}
.ann-indicator:hover{background:rgba(219,194,120,.15);border-color:#DBC278;color:#F2EFE6;transform:translateY(-1px)}
.ann-indicator span{position:relative;top:1px}
`;

/* ========================================================================== */
/* Реализация — не редактировать ниже без необходимости                       */
/* ========================================================================== */

(function () {
  const cur  = document.currentScript;
  const page = (cur && cur.dataset && cur.dataset.page) ? cur.dataset.page : '';

  // Фильтр активных анонсов для текущей страницы
  const active = ANNOUNCEMENTS.filter(a =>
    a.active && (!page || !a.pages || a.pages.includes(page))
  );
  if (!active.length) return;

  // Берём первый (приоритетный)
  const ann = active[0];

  // Если на странице уже есть захардкоженная модалка с этим id — не дублируем
  if (document.getElementById('annModal')) return;

  // Инжектим CSS
  if (!document.getElementById('ann-css')) {
    document.head.insertAdjacentHTML('beforeend', '<style id="ann-css">' + ANN_CSS + '</style>');
  }

  // Инжектим HTML модалки
  document.body.insertAdjacentHTML('beforeend', buildModalHTML(ann));

  // Вставляем кнопку-индикатор в hero (если он есть)
  const hero = document.querySelector('.hero-inner, .loc-hero-inner, .kar-hero-inner, .hero-content, .hero-text, .hero > .wrap, .hero > .container');
  if (hero && !hero.querySelector('.ann-indicator')) {
    const label = ann.vs && ann.date ? (ann.vs + ' · ' + ann.date)
                                     : (ann.date || ann.title.replace(/\n/g, ' '));
    const btn = document.createElement('button');
    btn.className = 'ann-indicator';
    btn.setAttribute('aria-label', 'Анонс: ' + ann.title.replace(/\n/g, ' '));
    btn.innerHTML = '<span>' + label + ' →</span>';
    btn.addEventListener('click', annOpen);
    hero.appendChild(btn);
  }

  // ESC закрывает
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const m = document.getElementById('annModal');
    if (m && m.classList.contains('on')) annClose();
  });

  // Авто-открытие
  function shouldAutoOpen() {
    if (ann.pinned) return true;
    try { return sessionStorage.getItem('_bv_ann_' + ann.id + '_closed') !== '1'; }
    catch (e) { return true; }
  }
  if (shouldAutoOpen()) {
    if (document.readyState === 'complete') setTimeout(annOpen, 900);
    else window.addEventListener('load', () => setTimeout(annOpen, 900));
  }

  // Экспортим в глобал для onclick из HTML
  window.annOpen   = annOpen;
  window.annClose  = annClose;
  window.annAction = annAction;

  // === функции ===

  function annOpen() {
    const m = document.getElementById('annModal');
    if (!m) return;
    m.classList.add('on');
    document.body.style.overflow = 'hidden';
  }

  function annClose() {
    const m = document.getElementById('annModal');
    if (!m) return;
    m.classList.remove('on');
    document.body.style.overflow = '';
    try { sessionStorage.setItem('_bv_ann_' + ann.id + '_closed', '1'); } catch (e) {}
  }

  function annAction(which) {
    const cfg = which === 'primary' ? ann.ctaPrimary : ann.ctaSecondary;
    if (!cfg) return annClose();
    switch (cfg.action) {
      case 'close':
        annClose();
        break;
      case 'booking':
        annClose();
        setTimeout(() => {
          if (typeof openBooking === 'function') openBooking();
          else fallbackBook();
        }, 350);
        break;
      case 'match-booking':
        annClose();
        setTimeout(() => {
          if (typeof openBooking === 'function') {
            openBooking({
              match: true,
              announcement: ann,
              prefillDate: cfg.date || null,
              prefillTime: cfg.time || null
            });
          } else {
            fallbackBook();
          }
        }, 350);
        break;
      case 'url':
        if (cfg.url) window.open(cfg.url, '_blank');
        annClose();
        break;
      case 'tel':
        if (cfg.tel) window.location.href = 'tel:' + cfg.tel;
        break;
      default:
        annClose();
    }
  }

  function fallbackBook() {
    // На странице нет openBooking — открываем Telegram-бот с подставленным текстом
    const txt = encodeURIComponent(
      'Бронь на событие: ' + ann.title.replace(/\n/g, ' ') +
      (ann.date ? '\nДата: ' + ann.date : '') +
      '\nИмя:\nТелефон:\nКоличество гостей:'
    );
    window.open('https://t.me/BARVIKHAGROUP?text=' + txt, '_blank');
  }

  function buildModalHTML(a) {
    const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    return [
      '<div class="ann-modal" id="annModal" onclick="if(event.target===this)annClose()">',
      '  <div class="ann-wrap">',
      '    <button class="ann-x" onclick="annClose()" aria-label="Закрыть">×</button>',
      '    <img class="ann-img" src="' + esc(a.image) + '" alt="' + esc(a.title.replace(/\n/g, ' ')) + '"/>',
      '    <div class="ann-body">',
      a.badge       ? '      <span class="ann-badge">' + esc(a.badge) + '</span>' : '',
      a.date        ? '      <div class="ann-date">' + esc(a.date) + '</div>' : '',
      '      <h3 class="ann-h">' + esc(a.title) + '</h3>',
      a.vs          ? '      <div class="ann-vs">' + esc(a.vs) + '</div>' : '',
      a.description ? '      <p class="ann-p">' + esc(a.description) + '</p>' : '',
      (a.features && a.features.length)
        ? '      <div class="ann-features">' + a.features.map(f => '<span class="ann-feat">' + esc(f) + '</span>').join('') + '</div>'
        : '',
      '      <div class="ann-cta">',
      a.ctaPrimary   ? '        <button class="ann-cta-pri" onclick="annAction(\'primary\')">'   + esc(a.ctaPrimary.text)   + '</button>' : '',
      a.ctaSecondary ? '        <button class="ann-cta-sec" onclick="annAction(\'secondary\')">' + esc(a.ctaSecondary.text) + '</button>' : '',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].filter(Boolean).join('\n');
  }
})();
