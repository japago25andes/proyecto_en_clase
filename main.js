/* ==========================================================================
   MILLONARIOS FC · SITIO DE HINCHAS
   main.js — Datos e interactividad (JavaScript vanilla, sin librerías)
   Autor: John Alexander Pardo González
   --------------------------------------------------------------------------
   ÍNDICE
   01. DATOS  ← aquí se actualiza todo el contenido (partidos, tabla, etc.)
   02. Utilidades
   03. Tema claro / oscuro
   04. Preloader
   05. Header, progreso de scroll y botón volver arriba
   06. Menú móvil
   07. Enlace activo según la sección visible
   08. Animaciones al hacer scroll (reveal)
   09. Contadores animados
   10. Próximo partido y cuenta regresiva
   11. Últimos resultados
   12. Noticias
   13. Plantilla (pestañas, filtros y ficha)
   14. Tabla de posiciones
   15. Galería (visor)
   16. Tienda
   17. Formulario "Únete a la hinchada"
   18. Imágenes que no cargan
   19. Inicio
   ========================================================================== */

'use strict';

/* ==========================================================================
   01. DATOS
   --------------------------------------------------------------------------
   Datos reales verificados al 16 de octubre de 2026.
   Para actualizar la página solo hay que editar este objeto.
   - Fechas en formato ISO con zona horaria de Colombia (-05:00).
   - Las imágenes van en la raíz del repositorio, al mismo nivel que index.html.
   - Si una imagen no existe, la página muestra un respaldo azul automáticamente.
   ========================================================================== */
const DATA = {
  club: 'Millonarios',

  /* Próximos partidos (se muestra el primero que aún no se ha jugado).
     Agrega aquí los siguientes cuando se confirmen fecha y hora. */
  partidos: [
    {
      fecha: '2026-10-17T18:00:00-05:00',
      competicion: 'Liga BetPlay 2026-II',
      jornada: 'Fecha 15',
      local: 'Millonarios',
      visitante: 'Jaguares de Córdoba',
      siglaRival: 'JAG',
      estadio: 'Estadio El Campín, Bogotá'
    },
    {
      fecha: '2026-10-20T20:30:00-05:00',
      competicion: 'Liga BetPlay 2026-II',
      jornada: 'Fecha 13 (aplazada)',
      local: 'Millonarios',
      visitante: 'Once Caldas',
      siglaRival: 'ONC',
      estadio: 'Estadio El Campín, Bogotá'
    }
  ],

  /* Últimos resultados (del más reciente al más antiguo) */
  resultados: [
    { fecha: '2026-10-09', competicion: 'Liga BetPlay · Fecha 14', local: 'Fortaleza', visitante: 'Millonarios', golesLocal: 1, golesVisitante: 1 },
    { fecha: '2026-10-03', competicion: 'Copa BetPlay · Octavos (ida)', local: 'Barranquilla', visitante: 'Millonarios', golesLocal: 1, golesVisitante: 1 },
    { fecha: '2026-09-30', competicion: 'Liga BetPlay', local: 'Independiente Medellín', visitante: 'Millonarios', golesLocal: 2, golesVisitante: 2 },
    { fecha: '2026-09-25', competicion: 'Liga BetPlay', local: 'Atlético Nacional', visitante: 'Millonarios', golesLocal: 1, golesVisitante: 1 },
    { fecha: '2026-09-19', competicion: 'Liga BetPlay', local: 'Millonarios', visitante: 'Boyacá Chicó', golesLocal: 3, golesVisitante: 0 }
  ],

  /* Noticias (la primera sale destacada). Los enlaces llevan al sitio oficial. */
  noticias: [
    {
      titulo: 'Nueva fecha para el duelo ante Once Caldas',
      resumen: 'El partido aplazado de la fecha 13 se jugará el martes 20 de octubre a las 8:30 p. m. en El Campín.',
      fecha: '2026-10-14',
      categoria: 'Partido',
      imagen: 'noticia-1.jpg',
      enlace: 'https://millonarios.com.co/informacion-importante-millonarios-vs-once-caldas/'
    },
    {
      titulo: 'Punto de visitante ante Fortaleza',
      resumen: 'El Embajador empató 1-1 en la fecha 14 de la Liga y sigue en zona de clasificación.',
      fecha: '2026-10-09',
      categoria: 'Liga',
      imagen: 'noticia-2.jpg',
      enlace: 'https://millonarios.com.co/los-embajadores-sumaron-un-punto-ante-fortaleza/'
    },
    {
      titulo: 'Galería: octavos de Copa frente a Barranquilla',
      resumen: 'Las mejores fotos del partido de ida de los octavos de final de la Copa BetPlay.',
      fecha: '2026-10-03',
      categoria: 'Copa',
      imagen: 'noticia-3.jpg',
      enlace: 'https://millonarios.com.co/octavos-de-final-copa-galeria-frente-a-barranquilla/'
    },
    {
      titulo: 'La Sub-20 terminó su camino en la Supercopa Juvenil',
      resumen: 'El equipo juvenil se despidió del torneo. Lee el balance completo en el sitio oficial.',
      fecha: null,
      categoria: 'Fútbol base',
      imagen: 'noticia-4.jpg',
      enlace: 'https://millonarios.com.co/millonarios-sub-20-cerro-su-camino-en-la-supercopa-juvenil/'
    }
  ],

  /* Plantilla. posicion: 'arquero' | 'defensa' | 'volante' | 'delantero' | null
     dorsal: número o null (si es null se muestra la sigla de la posición).
     foto: nombre del archivo; si no existe se muestran las iniciales. */
  plantilla: {
    masculino: {
      tecnico: 'Alberto Gamero',
      jugadores: [
        { nombre: 'Javier Burrai',          posicion: 'arquero',   dorsal: null, edad: 36, foto: 'jugador-burrai.jpg' },
        { nombre: 'James Aguirre',          posicion: 'arquero',   dorsal: null, edad: 34, foto: 'jugador-aguirre.jpg' },

        { nombre: 'Stiven Barreiro',        posicion: 'defensa',   dorsal: null, edad: 32, foto: 'jugador-barreiro.jpg' },
        { nombre: 'Darwin Cortés',          posicion: 'defensa',   dorsal: null, edad: null, foto: 'jugador-cortes.jpg' },
        { nombre: 'Jhomier Guerrero',       posicion: 'defensa',   dorsal: null, edad: 25, foto: 'jugador-guerrero.jpg' },
        { nombre: 'Sebastián Valencia',     posicion: 'defensa',   dorsal: null, edad: 30, foto: 'jugador-valencia.jpg' },
        { nombre: 'Cristian Uparela',       posicion: 'defensa',   dorsal: null, edad: 19, foto: 'jugador-uparela.jpg' },
        { nombre: 'Carlos Sarabia',         posicion: 'defensa',   dorsal: null, edad: 21, foto: 'jugador-sarabia.jpg' },
        { nombre: 'Sergio Mosquera',        posicion: 'defensa',   dorsal: null, edad: 32, foto: 'jugador-mosquera.jpg' },
        { nombre: 'Alex Moreno Paz',        posicion: 'defensa',   dorsal: null, edad: 24, foto: 'jugador-moreno.jpg' },
        { nombre: 'Samuel Martín',          posicion: 'defensa',   dorsal: null, edad: 20, foto: 'jugador-martin.jpg' },
        { nombre: 'Andrés Llinás',          posicion: 'defensa',   dorsal: null, edad: 29, foto: 'jugador-llinas.jpg' },
        { nombre: 'Danovis Banguero',       posicion: 'defensa',   dorsal: null, edad: 36, foto: 'jugador-banguero.jpg' },
        { nombre: 'Jorge Arias',            posicion: 'defensa',   dorsal: null, edad: 33, foto: 'jugador-arias.jpg' },

        { nombre: 'Leonai Souza',           posicion: 'volante',   dorsal: null, edad: 31, foto: 'jugador-souza.jpg' },
        { nombre: 'Stiven Vega',            posicion: 'volante',   dorsal: null, edad: 28, foto: 'jugador-vega.jpg' },
        { nombre: 'Rodrigo Ureña',          posicion: 'volante',   dorsal: null, edad: 33, foto: 'jugador-urena.jpg' },
        { nombre: 'David Macalister Silva', posicion: 'volante',   dorsal: null, edad: 39, foto: 'jugador-silva.jpg' },
        { nombre: 'Darwin Quintero',        posicion: 'volante',   dorsal: null, edad: 39, foto: 'jugador-quintero.jpg' },
        { nombre: 'Mateo García',           posicion: 'volante',   dorsal: null, edad: 28, foto: 'jugador-garcia.jpg' },
        { nombre: 'Francisco Chaverra',     posicion: 'volante',   dorsal: null, edad: 26, foto: 'jugador-chaverra.jpg' },

        { nombre: 'Daniel Ruiz',            posicion: 'delantero', dorsal: null, edad: 25, foto: 'jugador-ruiz.jpg' },
        { nombre: 'Andrey Estupiñán',       posicion: 'delantero', dorsal: null, edad: 32, foto: 'jugador-estupinan.jpg' },
        { nombre: 'Rodrigo Contreras',      posicion: 'delantero', dorsal: null, edad: 30, foto: 'jugador-contreras.jpg' },
        { nombre: 'Leonardo Castro',        posicion: 'delantero', dorsal: null, edad: 34, foto: 'jugador-castro.jpg' },
        { nombre: 'Brayan Campaz',          posicion: 'delantero', dorsal: null, edad: null, foto: 'jugador-campaz.jpg' },
        { nombre: 'Julián Angulo',          posicion: 'delantero', dorsal: null, edad: 24, foto: 'jugador-angulo.jpg' }
      ]
    },
    femenino: {
      tecnico: null,
      /* El sitio oficial no publica la posición de cada jugadora:
         complétala en "posicion" para que funcionen los filtros. */
      jugadores: [
        'Saray Rodríguez', 'Michel Lugo', 'Daniela Gamboa', 'Laura Tamayo', 'Sara Pineda',
        'Mariana Benavides', 'Alejandra Aroca', 'Karina Valencia', 'Liana Salazar', 'Slendy Quintero',
        'Melissa Herrera', 'Angie Castañeda', 'Ledys Calvo', 'Laura Bolaño', 'Isabela Sánchez',
        'Kelly Restrepo', 'Rocío Olaya', 'Sandra Ibargüen', 'Lina Gómez', 'Eudis Garrido', 'Diana Celis'
      ].map((nombre) => ({ nombre, posicion: null, dorsal: null, edad: null, foto: null }))
    }
  },

  /* Tabla de posiciones */
  tabla: {
    torneo: 'Liga BetPlay 2026-II',
    actualizada: 'Actualizada al 9 de octubre de 2026 · fecha 14 en curso',
    clasifican: 8,
    equipos: [
      { nombre: 'América de Cali',          sigla: 'AME', pj: 12, g: 8, e: 3, p: 1, dg: 17,  pts: 27 },
      { nombre: 'Deportivo Cali',           sigla: 'CAL', pj: 12, g: 7, e: 3, p: 2, dg: 11,  pts: 24 },
      { nombre: 'Atlético Nacional',        sigla: 'NAC', pj: 11, g: 7, e: 2, p: 2, dg: 11,  pts: 23 },
      { nombre: 'Atlético Bucaramanga',     sigla: 'BUC', pj: 11, g: 6, e: 5, p: 0, dg: 10,  pts: 23 },
      { nombre: 'Millonarios',              sigla: 'MIL', pj: 14, g: 5, e: 7, p: 2, dg: 7,   pts: 22 },
      { nombre: 'Santa Fe',                 sigla: 'SFE', pj: 12, g: 6, e: 4, p: 2, dg: 7,   pts: 22 },
      { nombre: 'Independiente Medellín',   sigla: 'DIM', pj: 12, g: 6, e: 2, p: 4, dg: 3,   pts: 20 },
      { nombre: 'Deportes Tolima',          sigla: 'TOL', pj: 13, g: 5, e: 5, p: 3, dg: 2,   pts: 20 },
      { nombre: 'Cúcuta Deportivo',         sigla: 'CUC', pj: 12, g: 4, e: 3, p: 5, dg: -4,  pts: 15 },
      { nombre: 'Llaneros',                 sigla: 'LLA', pj: 12, g: 4, e: 2, p: 6, dg: -1,  pts: 14 },
      { nombre: 'Águilas Doradas',          sigla: 'AGU', pj: 11, g: 3, e: 5, p: 3, dg: -1,  pts: 14 },
      { nombre: 'Once Caldas',              sigla: 'ONC', pj: 12, g: 3, e: 4, p: 5, dg: -1,  pts: 13 },
      { nombre: 'Internacional de Bogotá',  sigla: 'INT', pj: 13, g: 2, e: 7, p: 4, dg: -4,  pts: 13 },
      { nombre: 'Boyacá Chicó',             sigla: 'CHI', pj: 11, g: 3, e: 3, p: 5, dg: -8,  pts: 12 },
      { nombre: 'Fortaleza',                sigla: 'FOR', pj: 13, g: 1, e: 8, p: 4, dg: -5,  pts: 11 },
      { nombre: 'Alianza',                  sigla: 'ALI', pj: 12, g: 3, e: 2, p: 7, dg: -12, pts: 11 },
      { nombre: 'Junior',                   sigla: 'JUN', pj: 11, g: 2, e: 3, p: 6, dg: -4,  pts: 9 },
      { nombre: 'Deportivo Pasto',          sigla: 'PAS', pj: 12, g: 2, e: 3, p: 7, dg: -9,  pts: 9 },
      { nombre: 'Deportivo Pereira',        sigla: 'PER', pj: 11, g: 1, e: 5, p: 5, dg: -10, pts: 8 },
      { nombre: 'Jaguares de Córdoba',      sigla: 'JAG', pj: 11, g: 1, e: 4, p: 6, dg: -9,  pts: 7 }
    ]
  },

  /* Tienda (precios de referencia tomados de la tienda oficial; null = consultar) */
  tienda: [
    {
      nombre: 'Kit Conmemorativo 80 Años',
      etiqueta: '80 años',
      precio: 199900,
      imagen: 'kit-80.jpg',
      enlace: 'https://tiendamillonarios.com.co/products/polo-hombre-conmemorativa-80-anos-mfc'
    },
    {
      nombre: 'Camiseta local 2026',
      etiqueta: 'Local',
      precio: null,
      imagen: 'camiseta-local.jpg',
      enlace: 'https://tiendamillonarios.com.co/'
    },
    {
      nombre: 'Camiseta visitante 2026',
      etiqueta: 'Visitante',
      precio: null,
      imagen: 'camiseta-visitante.jpg',
      enlace: 'https://tiendamillonarios.com.co/'
    },
    {
      nombre: 'Tercera camiseta 2026',
      etiqueta: 'Nueva',
      precio: null,
      imagen: 'camiseta-alterna.jpg',
      enlace: 'https://tiendamillonarios.com.co/collections/tercera-2026'
    },
    {
      nombre: 'Membresía Hincha Embajador Dorado',
      etiqueta: 'HED',
      precio: 149900,
      imagen: null,
      enlace: 'https://tiendamillonarios.com.co/collections/hed'
    }
  ]
};


/* ==========================================================================
   02. UTILIDADES
   ========================================================================== */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Escapa texto para insertarlo de forma segura en HTML */
const esc = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));

/** Ícono del sprite SVG del index.html */
const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#${id}"/></svg>`;

/** Iniciales de un nombre: "Rodrigo Contreras" → "RC" */
const initials = (name) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

const ZONA = 'America/Bogota';

const fmtFechaLarga = new Intl.DateTimeFormat('es-CO', {
  weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', timeZone: ZONA
});
const fmtFechaCorta = new Intl.DateTimeFormat('es-CO', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: ZONA
});
const fmtPrecio = new Intl.NumberFormat('es-CO', {
  style: 'currency', currency: 'COP', maximumFractionDigits: 0
});

/** Convierte "2026-10-09" en una fecha a mediodía de Colombia (evita saltos de día) */
const parseDia = (iso) => new Date(`${iso}T12:00:00-05:00`);

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const POSICIONES = {
  arquero:   { nombre: 'Arquero',   sigla: 'ARQ' },
  defensa:   { nombre: 'Defensa',   sigla: 'DEF' },
  volante:   { nombre: 'Volante',   sigla: 'VOL' },
  delantero: { nombre: 'Delantero', sigla: 'DEL' }
};


/* ==========================================================================
   03. TEMA CLARO / OSCURO
   ========================================================================== */
const THEME_KEY = 'millos-theme';

const storage = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* sin almacenamiento disponible */ }
  }
};

function applyTheme(theme) {
  const root = document.documentElement;
  const button = $('#theme-toggle');
  const isDark = theme === 'dark';

  root.dataset.theme = theme;
  $('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#030b24' : '#0b2a8c');

  if (button) {
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
}

function initTheme() {
  const saved = storage.get(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  $('#theme-toggle')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storage.set(THEME_KEY, next);
  });
}


/* ==========================================================================
   04. PRELOADER
   ========================================================================== */
function initPreloader() {
  const preloader = $('#preloader');
  if (!preloader) return;

  const start = performance.now();
  let hidden = false;

  const hide = () => {
    if (hidden) return;
    hidden = true;
    // Se muestra al menos 600 ms para que la animación no parpadee
    const wait = Math.max(0, 600 - (performance.now() - start));
    setTimeout(() => {
      preloader.classList.add('is-hidden');
      setTimeout(() => preloader.remove(), 700);
    }, wait);
  };

  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide, { once: true });

  // Por si alguna imagen tarda demasiado
  setTimeout(hide, 3500);
}


/* ==========================================================================
   05. HEADER, PROGRESO DE SCROLL Y BOTÓN VOLVER ARRIBA
   ========================================================================== */
function initScrollEffects() {
  const header = $('#header');
  const progress = $('#scroll-progress');
  const toTop = $('#to-top');
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    header?.classList.toggle('is-scrolled', y > 40);
    toTop?.classList.toggle('is-visible', y > window.innerHeight * 0.8);
    progress?.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}


/* ==========================================================================
   06. MENÚ MÓVIL
   ========================================================================== */
function initMobileNav() {
  const nav = $('#nav');
  const toggle = $('#nav-toggle');
  if (!nav || !toggle) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    document.body.classList.toggle('no-scroll', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (open) $('.nav__link', nav)?.focus();
  };

  const isOpen = () => nav.classList.contains('is-open');

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Cerrar al elegir una sección
  $$('a', nav).forEach((link) => link.addEventListener('click', () => setOpen(false)));

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Cerrar al tocar fuera del menú
  document.addEventListener('click', (e) => {
    if (isOpen() && !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });

  // Si se agranda la ventana con el menú abierto, se cierra
  window.matchMedia('(min-width: 1181px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}


/* ==========================================================================
   07. ENLACE ACTIVO SEGÚN LA SECCIÓN VISIBLE
   ========================================================================== */
function initActiveLink() {
  const links = $$('.nav__link');
  const sections = links
    .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((section) => observer.observe(section));
}


/* ==========================================================================
   08. ANIMACIONES AL HACER SCROLL (REVEAL)
   ========================================================================== */
let revealObserver = null;

function initReveal() {
  // Esta clase activa en el CSS el estado oculto inicial de [data-reveal]
  document.documentElement.classList.add('js');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    $$('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  observeReveal(document);
}

/** Observa los [data-reveal] de un contenedor (sirve para contenido generado) */
function observeReveal(scope) {
  const items = $$('[data-reveal]:not(.is-visible)', scope);

  if (!revealObserver) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  items.forEach((el) => {
    // Escalonado: cada hermano aparece un poco después del anterior
    const siblings = $$(':scope > [data-reveal]', el.parentElement);
    const index = siblings.indexOf(el);
    if (index > 0) el.style.setProperty('--delay', `${Math.min(index, 6) * 0.08}s`);
    revealObserver.observe(el);
  });
}


/* ==========================================================================
   09. CONTADORES ANIMADOS
   ========================================================================== */
function animateCount(el) {
  const target = Number(el.dataset.count) || 0;

  if (reduceMotion) {
    el.textContent = target;
    return;
  }

  const duration = 1600;
  const start = performance.now();
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const frame = (now) => {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * easeOut(t));
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function initCounters() {
  const counters = $$('[data-count]');

  if (!('IntersectionObserver' in window)) {
    counters.forEach((el) => { el.textContent = el.dataset.count; });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach((el) => observer.observe(el));
}


/* ==========================================================================
   10. PRÓXIMO PARTIDO Y CUENTA REGRESIVA
   ========================================================================== */
const DURACION_PARTIDO = 2 * 60 * 60 * 1000; // 2 horas: tiempo que se muestra "en juego"
let countdownTimer = null;

/** Devuelve el partido en juego o el siguiente por jugar */
function getNextMatch() {
  const now = Date.now();
  return DATA.partidos
    .map((p) => ({ ...p, time: new Date(p.fecha).getTime() }))
    .filter((p) => p.time + DURACION_PARTIDO > now)
    .sort((a, b) => a.time - b.time)[0] || null;
}

function teamMarkup(name, tag, sigla) {
  const isMillos = name === DATA.club;
  const logo = isMillos
    ? `<img class="team__logo" src="escudo.png" alt="" width="88" height="88">`
    : `<span class="team__badge" aria-hidden="true">${esc(sigla || initials(name))}</span>`;

  return `
    ${logo}
    <span class="team__name">${esc(name)}</span>
    <span class="team__tag">${esc(tag)}</span>`;
}

function renderMatch() {
  const match = getNextMatch();
  const teams = $$('.match-card__teams .team');
  const countdown = $('#countdown');
  const live = $('#countdown-live');

  if (!match) {
    // No hay partidos cargados en DATA.partidos
    $('#match-competition').textContent = 'Agenda azul';
    $('#match-date').textContent = 'Próximo partido por confirmar';
    $('#match-venue').textContent = 'Consulta el calendario oficial';
    $('#match-round').textContent = '';
    if (teams[1]) teams[1].innerHTML = teamMarkup('Por definir', 'Rival', '?');
    countdown.hidden = true;
    live.hidden = true;
    return;
  }

  const fecha = new Date(match.fecha);

  $('#match-competition').textContent = match.competicion;
  $('#match-round').textContent = match.jornada || '';
  $('#match-venue').textContent = match.estadio;

  const dateEl = $('#match-date');
  dateEl.dateTime = match.fecha;
  dateEl.textContent = capitalize(fmtFechaLarga.format(fecha));

  if (teams.length === 2) {
    const sigla = match.siglaRival;
    teams[0].innerHTML = teamMarkup(match.local, 'Local', match.local === DATA.club ? 'MIL' : sigla);
    teams[1].innerHTML = teamMarkup(match.visitante, 'Visitante', match.visitante === DATA.club ? 'MIL' : sigla);
  }

  startCountdown(match);
}

function startCountdown(match) {
  const countdown = $('#countdown');
  const live = $('#countdown-live');
  const units = {
    days: $('[data-unit="days"]', countdown),
    hours: $('[data-unit="hours"]', countdown),
    minutes: $('[data-unit="minutes"]', countdown),
    seconds: $('[data-unit="seconds"]', countdown)
  };

  clearInterval(countdownTimer);

  const setUnit = (el, value) => {
    const text = String(value).padStart(2, '0');
    if (el.textContent === text) return;
    el.textContent = text;
    if (!reduceMotion) {
      el.classList.remove('is-tick');
      void el.offsetWidth; // reinicia la animación
      el.classList.add('is-tick');
    }
  };

  const tick = () => {
    const diff = match.time - Date.now();

    if (diff <= 0) {
      // Partido en juego
      countdown.hidden = true;
      live.hidden = false;

      // Terminado: se pasa al siguiente partido
      if (diff + DURACION_PARTIDO <= 0) {
        clearInterval(countdownTimer);
        renderMatch();
      }
      return;
    }

    countdown.hidden = false;
    live.hidden = true;

    const s = Math.floor(diff / 1000);
    setUnit(units.days, Math.floor(s / 86400));
    setUnit(units.hours, Math.floor((s % 86400) / 3600));
    setUnit(units.minutes, Math.floor((s % 3600) / 60));
    setUnit(units.seconds, s % 60);
  };

  tick();
  countdownTimer = setInterval(tick, 1000);
}


/* ==========================================================================
   11. ÚLTIMOS RESULTADOS
   ========================================================================== */
function renderResults() {
  const list = $('#results-list');
  if (!list) return;

  const LETRA = { win: 'G', draw: 'E', loss: 'P' };
  const TEXTO = { win: 'Victoria', draw: 'Empate', loss: 'Derrota' };

  list.innerHTML = DATA.resultados.map((r) => {
    const millosLocal = r.local === DATA.club;
    const propios = millosLocal ? r.golesLocal : r.golesVisitante;
    const rival = millosLocal ? r.golesVisitante : r.golesLocal;
    const outcome = propios > rival ? 'win' : propios < rival ? 'loss' : 'draw';

    return `
      <li class="result">
        <span class="result__badge result__badge--${outcome}" title="${TEXTO[outcome]}">
          ${LETRA[outcome]}<span class="sr-only"> (${TEXTO[outcome]})</span>
        </span>
        <span class="result__teams">
          ${esc(r.local)} vs ${esc(r.visitante)}
          <span class="result__meta">${esc(r.competicion)} · ${fmtFechaCorta.format(parseDia(r.fecha))}</span>
        </span>
        <span class="result__score" aria-label="Marcador ${r.golesLocal} a ${r.golesVisitante}">
          ${r.golesLocal} - ${r.golesVisitante}
        </span>
      </li>`;
  }).join('');
}


/* ==========================================================================
   12. NOTICIAS
   ========================================================================== */
function renderNews() {
  const grid = $('#news-grid');
  if (!grid) return;

  grid.innerHTML = DATA.noticias.map((n, i) => {
    const fecha = n.fecha
      ? `<time class="news-card__date" datetime="${esc(n.fecha)}">${fmtFechaCorta.format(parseDia(n.fecha))}</time>`
      : '';

    return `
      <article class="news-card${i === 0 ? ' news-card--featured' : ''}" data-reveal>
        <a class="news-card__link" href="${esc(n.enlace)}" target="_blank" rel="noopener">
          <div class="news-card__media">
            <span class="news-card__tag">${esc(n.categoria)}</span>
            <img src="${esc(n.imagen)}" alt="" loading="lazy" data-fallback="MFC">
          </div>
          <div class="news-card__body">
            ${fecha}
            <h3 class="news-card__title">${esc(n.titulo)}</h3>
            <p class="news-card__excerpt">${esc(n.resumen)}</p>
            <span class="news-card__more">Leer en el sitio oficial ${icon('i-arrow-right')}</span>
          </div>
        </a>
      </article>`;
  }).join('');

  observeReveal(grid);
}


/* ==========================================================================
   13. PLANTILLA (PESTAÑAS, FILTROS Y FICHA)
   ========================================================================== */
const squadState = { equipo: 'masculino', posicion: 'todos' };

function renderSquad() {
  const grid = $('#squad-grid');
  const coach = $('#squad-coach');
  const team = DATA.plantilla[squadState.equipo];
  if (!grid || !team) return;

  coach.innerHTML = team.tecnico ? `Director técnico: <strong>${esc(team.tecnico)}</strong>` : '';

  const jugadores = squadState.posicion === 'todos'
    ? team.jugadores
    : team.jugadores.filter((j) => j.posicion === squadState.posicion);

  if (!jugadores.length) {
    grid.innerHTML = `<p class="squad__empty">Aún no hay jugadores cargados para este filtro.</p>`;
    return;
  }

  const etiqueta = squadState.equipo === 'femenino' ? 'Jugadora' : 'Jugador';

  grid.innerHTML = jugadores.map((j, i) => {
    const pos = POSICIONES[j.posicion];
    const numero = j.dorsal ?? (pos ? pos.sigla : '');
    const index = team.jugadores.indexOf(j);

    return `
      <button class="player-card" type="button" style="--i:${i}" data-player="${index}"
              aria-label="Ver ficha de ${esc(j.nombre)}">
        <div class="player-card__photo">
          ${j.foto ? `<img src="${esc(j.foto)}" alt="" loading="lazy" data-player-photo>` : ''}
          ${j.foto ? '' : `<span class="player-card__initials" aria-hidden="true">${esc(initials(j.nombre))}</span>`}
          ${numero !== '' ? `<span class="player-card__number" aria-hidden="true">${esc(numero)}</span>` : ''}
        </div>
        <div class="player-card__info">
          <span class="player-card__pos">${esc(pos ? pos.nombre : etiqueta)}</span>
          <h3 class="player-card__name">${esc(j.nombre)}</h3>
          ${j.edad ? `<span class="player-card__nat">${j.edad} años</span>` : ''}
        </div>
      </button>`;
  }).join('');

  // Si la foto no existe, se cambian por las iniciales
  $$('[data-player-photo]', grid).forEach((img) => {
    const swap = () => {
      const name = img.closest('.player-card').querySelector('.player-card__name').textContent;
      img.insertAdjacentHTML('afterend', `<span class="player-card__initials" aria-hidden="true">${esc(initials(name))}</span>`);
      img.remove();
    };
    if (img.complete && img.naturalWidth === 0) swap();
    else img.addEventListener('error', swap, { once: true });
  });
}

function initSquad() {
  const tabs = $$('.tabs__btn');
  const tablist = $('.tabs');
  const filters = $$('#squad-filters .chip');
  const grid = $('#squad-grid');

  const selectTab = (tab) => {
    squadState.equipo = tab.dataset.team;
    squadState.posicion = 'todos';

    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
    });
    tablist.dataset.active = squadState.equipo;
    grid.setAttribute('aria-labelledby', tab.id);

    filters.forEach((f) => {
      const active = f.dataset.position === 'todos';
      f.classList.toggle('is-active', active);
      f.setAttribute('aria-pressed', String(active));
    });

    renderSquad();
  };

  tabs.forEach((tab, i) => {
    tab.tabIndex = i === 0 ? 0 : -1;
    tab.addEventListener('click', () => selectTab(tab));

    // Navegación con flechas (patrón accesible de pestañas)
    tab.addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      let next = i;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      tabs[next].focus();
      selectTab(tabs[next]);
    });
  });

  filters.forEach((chip) => {
    chip.addEventListener('click', () => {
      squadState.posicion = chip.dataset.position;
      filters.forEach((f) => {
        const active = f === chip;
        f.classList.toggle('is-active', active);
        f.setAttribute('aria-pressed', String(active));
      });
      renderSquad();
    });
  });

  // Abrir ficha (delegación de eventos)
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.player-card');
    if (card) openPlayerModal(Number(card.dataset.player));
  });

  renderSquad();
}

function openPlayerModal(index) {
  const modal = $('#player-modal');
  const team = DATA.plantilla[squadState.equipo];
  const j = team?.jugadores[index];
  if (!modal || !j) return;

  const pos = POSICIONES[j.posicion];
  const photo = $('#player-modal-photo');

  photo.innerHTML = `<span class="player-card__initials" aria-hidden="true">${esc(initials(j.nombre))}</span>`;
  if (j.foto) {
    const img = new Image();
    img.alt = j.nombre;
    img.onload = () => { photo.innerHTML = ''; photo.appendChild(img); };
    img.src = j.foto;
  }

  $('#player-modal-number').textContent = j.dorsal ?? (pos ? pos.sigla : '');
  $('#player-modal-name').textContent = j.nombre;
  $('#player-modal-position').textContent = pos ? pos.nombre : (squadState.equipo === 'femenino' ? 'Jugadora' : 'Jugador');

  const datos = [
    ['Equipo', squadState.equipo === 'femenino' ? 'Millonarios Femenino' : 'Millonarios Masculino'],
    ['Posición', pos ? pos.nombre : 'Por confirmar'],
    ['Edad', j.edad ? `${j.edad} años` : 'Por confirmar'],
    ['Dorsal', j.dorsal ?? 'Por confirmar']
  ];
  $('#player-modal-data').innerHTML = datos
    .map(([dt, dd]) => `<dt>${esc(dt)}</dt><dd>${esc(dd)}</dd>`)
    .join('');

  openDialog(modal);
}


/* ==========================================================================
   14. TABLA DE POSICIONES
   ========================================================================== */
function renderStandings() {
  const body = $('#standings-body');
  if (!body) return;

  const { torneo, actualizada, clasifican, equipos } = DATA.tabla;

  // Orden por puntos y luego diferencia de gol (empates mantienen el orden de los datos)
  const ordenados = [...equipos].sort((a, b) => b.pts - a.pts || b.dg - a.dg);

  $('#standings-tournament').textContent = torneo;
  $('#standings-updated').textContent = actualizada;

  body.innerHTML = ordenados.map((t, i) => {
    const pos = i + 1;
    const isMillos = t.nombre === DATA.club;
    const clases = [pos <= clasifican ? 'is-zone' : '', isMillos ? 'is-millos' : '']
      .filter(Boolean).join(' ');
    const badge = isMillos
      ? `<img src="escudo.png" alt="">`
      : esc(t.sigla);
    const dg = t.dg > 0 ? `+${t.dg}` : t.dg;

    return `
      <tr${clases ? ` class="${clases}"` : ''}${isMillos ? ' aria-current="true"' : ''}>
        <td class="table__pos">${pos}</td>
        <td class="table__team">
          <span class="team-cell">
            <span class="team-cell__badge" aria-hidden="true">${badge}</span>
            <span class="team-cell__name">${esc(t.nombre)}</span>
          </span>
        </td>
        <td>${t.pj}</td>
        <td class="hide-sm">${t.g}</td>
        <td class="hide-sm">${t.e}</td>
        <td class="hide-sm">${t.p}</td>
        <td>${dg}</td>
        <td class="table__pts">${t.pts}</td>
      </tr>`;
  }).join('');
}


/* ==========================================================================
   15. GALERÍA (VISOR)
   ========================================================================== */
function openDialog(dialog) {
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  document.body.classList.add('no-scroll');
}

function closeDialog(dialog) {
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
}

function initDialogs() {
  $$('dialog').forEach((dialog) => {
    // Botones de cerrar
    $$('[data-close]', dialog).forEach((btn) =>
      btn.addEventListener('click', () => closeDialog(dialog)));

    // Clic en el fondo oscuro
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) closeDialog(dialog);
    });

    // Al cerrar (también con Escape) se libera el scroll
    dialog.addEventListener('close', () => {
      if (!$('dialog[open]')) document.body.classList.remove('no-scroll');
    });
  });
}

function initGallery() {
  const lightbox = $('#lightbox');
  const buttons = $$('.gallery__btn');
  if (!lightbox || !buttons.length) return;

  const img = $('#lightbox-img');
  const caption = $('#lightbox-caption');
  const counter = $('#lightbox-counter');

  const items = buttons.map((btn) => {
    const source = $('img', btn);
    return {
      src: source.getAttribute('src'),
      alt: source.alt,
      caption: btn.closest('figure')?.querySelector('figcaption')?.textContent || source.alt
    };
  });

  let current = 0;

  const show = (index) => {
    current = (index + items.length) % items.length;
    const item = items[current];

    // Reinicia la animación y el respaldo de la imagen anterior
    img.parentElement.classList.remove('fallback');
    delete img.dataset.broken;
    img.removeAttribute('style');
    img.style.animation = 'none';
    void img.offsetWidth;
    img.style.animation = '';

    img.src = item.src;
    img.alt = item.alt;
    caption.textContent = item.caption;
    counter.textContent = `${current + 1} / ${items.length}`;
  };

  buttons.forEach((btn, i) => btn.addEventListener('click', () => {
    show(i);
    openDialog(lightbox);
  }));

  $('#lightbox-prev').addEventListener('click', () => show(current - 1));
  $('#lightbox-next').addEventListener('click', () => show(current + 1));

  // Teclado
  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Deslizar en celular
  let touchX = null;
  lightbox.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });
}


/* ==========================================================================
   16. TIENDA
   ========================================================================== */
function renderShop() {
  const grid = $('#shop-grid');
  if (!grid) return;

  grid.innerHTML = DATA.tienda.map((p) => `
    <article class="product" data-reveal>
      <div class="product__media${p.imagen ? '' : ' fallback'}" data-fallback="${esc(p.etiqueta || 'MFC')}">
        ${p.etiqueta ? `<span class="product__tag">${esc(p.etiqueta)}</span>` : ''}
        ${p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.nombre)}" loading="lazy" data-fallback="${esc(p.etiqueta || 'MFC')}">` : ''}
      </div>
      <div class="product__body">
        <h3 class="product__name">${esc(p.nombre)}</h3>
        <p class="product__price">${p.precio ? fmtPrecio.format(p.precio) : 'Ver precio'}</p>
        <a class="btn btn--ghost btn--block" href="${esc(p.enlace)}" target="_blank" rel="noopener">
          ${icon('i-shirt')} Ver en la tienda oficial
        </a>
      </div>
    </article>`).join('');

  observeReveal(grid);
}


/* ==========================================================================
   17. FORMULARIO "ÚNETE A LA HINCHADA"
   (sitio estático: no envía datos a ningún servidor, solo valida y confirma)
   ========================================================================== */
function initJoinForm() {
  const form = $('#join-form');
  if (!form) return;

  const success = $('#join-success');
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    'join-name': (el) => {
      const value = el.value.trim();
      if (!value) return 'Escribe tu nombre.';
      if (value.length < 2) return 'El nombre debe tener al menos 2 letras.';
      return '';
    },
    'join-email': (el) => {
      const value = el.value.trim();
      if (!value) return 'Escribe tu correo.';
      if (!EMAIL_RE.test(value)) return 'Revisa el formato del correo (ej: nombre@correo.com).';
      return '';
    },
    'join-since': (el) => (el.value ? '' : 'Elige una opción.'),
    'join-terms': (el) => (el.checked ? '' : 'Debes aceptar para continuar.')
  };

  const validate = (el) => {
    const message = rules[el.id](el);
    const field = el.closest('.field');
    const error = $(`#${el.id}-error`);

    field.classList.toggle('is-invalid', Boolean(message));
    field.classList.toggle('is-valid', !message && el.type !== 'checkbox');
    el.setAttribute('aria-invalid', String(Boolean(message)));
    if (error) {
      error.textContent = message;
      el.setAttribute('aria-describedby', error.id);
    }
    return !message;
  };

  Object.keys(rules).forEach((id) => {
    const el = $(`#${id}`);
    // Valida al salir del campo y corrige en vivo si ya tenía error
    el.addEventListener('blur', () => validate(el));
    el.addEventListener(el.tagName === 'SELECT' || el.type === 'checkbox' ? 'change' : 'input', () => {
      if (el.closest('.field').classList.contains('is-invalid')) validate(el);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.hidden = true;

    const fields = Object.keys(rules).map((id) => $(`#${id}`));
    const results = fields.map(validate);
    const firstInvalid = fields[results.indexOf(false)];

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const nombre = $('#join-name').value.trim().split(' ')[0];
    $('span', success).textContent = `¡Bienvenido(a) a la hinchada azul, ${nombre}! 💙`;
    success.hidden = false;

    form.reset();
    $$('.field', form).forEach((f) => f.classList.remove('is-valid', 'is-invalid'));
  });
}


/* ==========================================================================
   18. IMÁGENES QUE NO CARGAN
   Si falta un archivo, se oculta la imagen rota y el contenedor muestra un
   fondo azul con un texto (el alt o data-fallback de la imagen).
   ========================================================================== */
function handleBrokenImage(img) {
  if (img.dataset.broken || img.hasAttribute('data-player-photo')) return;
  img.dataset.broken = 'true';

  // Escudo en el header, preloader o partido: solo se oculta
  if (img.closest('.brand, .preloader, .team, .team-cell__badge')) {
    img.style.visibility = 'hidden';
    return;
  }

  const label = img.dataset.fallback ?? img.alt;
  if (!label) {
    img.style.display = 'none'; // p. ej. el hero, que ya tiene fondo azul
    return;
  }

  const parent = img.parentElement;
  parent.classList.add('fallback');
  parent.dataset.fallback = label;
}

function initImageFallbacks() {
  // Errores que ocurran desde ahora (también en contenido generado)
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') handleBrokenImage(e.target);
  }, true);

  // Imágenes que ya fallaron antes de que corriera este script
  $$('img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) handleBrokenImage(img);
  });
}


/* ==========================================================================
   19. INICIO
   ========================================================================== */
function init() {
  initTheme();
  initPreloader();
  initImageFallbacks();
  initReveal(); // antes de pintar, para que el contenido generado también se anime

  renderMatch();
  renderResults();
  renderNews();
  initSquad();
  renderStandings();
  renderShop();

  initCounters();
  initScrollEffects();
  initMobileNav();
  initActiveLink();
  initDialogs();
  initGallery();
  initJoinForm();

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
}

// El script se carga con "defer", así que el HTML ya está listo
init();
