const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const navLinks = [...document.querySelectorAll('.nav-link')];

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});


// ==============================
// AÑO ACTUAL
// ==============================

const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}


// ==============================
// REVEAL AL HACER SCROLL
// ==============================

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


// ==============================
// MENÚ ACTIVO SEGÚN SECCIÓN
// ==============================

const sections = [
  ...document.querySelectorAll('main section[id]')
];

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, {
  rootMargin: '-40% 0px -50% 0px',
  threshold: 0
});

sections.forEach(section => {
  sectionObserver.observe(section);
});


// ==============================
// FORMULARIO DE CONTACTO
// ==============================

const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(
    `Contacto desde portfolio - ${name}`
  );

  const body = encodeURIComponent(
    `Hola Facundo,\n\n${message}\n\nNombre: ${name}\nEmail: ${email}`
  );

  window.location.href =
    `mailto:faculabarthe13@gmail.com?subject=${subject}&body=${body}`;
});


// ==============================
// GALERÍAS DE PROYECTOS
// ==============================

const galleries = {

  // Lugares Full Stack
  lugares: [
    {
      src: 'assets/lugares-dashboard.png',
      caption:
        'Panel de gestión, creación de lugares e integración con Google Places'
    },
    {
      src: 'assets/lugares-mis-lugares.png',
      caption:
        'Mis lugares, favoritos, categorías y estadísticas'
    },
    {
      src: 'assets/lugares-login.png',
      caption:
        'Inicio de sesión'
    }
  ],

  // Sistema de vuelos y pasajes
  vuelos: [
    {
      src: 'assets/vuelos/vuelos-1.png',
      caption:
        'Listado general de vuelos disponibles'
    },
    {
      src: 'assets/vuelos/vuelos-2.png',
      caption:
        'Búsqueda de vuelos por código IATA'
    },
    {
      src: 'assets/vuelos/vuelos-3.png',
      caption:
        'Compra de pasaje y selección de equipaje'
    },
    {
      src: 'assets/vuelos/vuelos-4.png',
      caption:
        'Registro de cliente ocasional'
    }
  ]

};


// ==============================
// ELEMENTOS DEL MODAL
// ==============================

const galleryModal =
  document.getElementById('galleryModal');

const galleryImage =
  document.getElementById('galleryImage');

const galleryCaption =
  document.getElementById('galleryCaption');

const galleryCounter =
  document.getElementById('galleryCounter');

const galleryClose =
  document.getElementById('galleryClose');

const galleryPrev =
  document.getElementById('galleryPrev');

const galleryNext =
  document.getElementById('galleryNext');

const galleryButtons =
  document.querySelectorAll('[data-gallery]');


// ==============================
// ESTADO DE LA GALERÍA
// ==============================

let currentGallery = 'lugares';
let currentGalleryIndex = 0;


// ==============================
// MOSTRAR IMAGEN ACTUAL
// ==============================

function renderGallery() {

  const galleryItems =
    galleries[currentGallery];

  if (!galleryItems) return;

  const item =
    galleryItems[currentGalleryIndex];

  if (!item) return;

  galleryImage.src = item.src;
  galleryImage.alt = item.caption;

  galleryCaption.textContent =
    item.caption;

  galleryCounter.textContent =
    `${currentGalleryIndex + 1} / ${galleryItems.length}`;
}


// ==============================
// ABRIR GALERÍA
// ==============================

function openGallery(galleryName, index = 0) {

  if (!galleries[galleryName]) return;

  currentGallery = galleryName;
  currentGalleryIndex = index;

  renderGallery();

  galleryModal.classList.add('open');

  galleryModal.setAttribute(
    'aria-hidden',
    'false'
  );

  document.body.classList.add(
    'modal-open'
  );
}


// ==============================
// CERRAR GALERÍA
// ==============================

function closeGallery() {

  galleryModal.classList.remove('open');

  galleryModal.setAttribute(
    'aria-hidden',
    'true'
  );

  document.body.classList.remove(
    'modal-open'
  );
}


// ==============================
// CAMBIAR IMAGEN
// ==============================

function moveGallery(direction) {

  const galleryItems =
    galleries[currentGallery];

  if (!galleryItems) return;

  currentGalleryIndex =
    (
      currentGalleryIndex +
      direction +
      galleryItems.length
    ) % galleryItems.length;

  renderGallery();
}


// ==============================
// BOTONES "VER GALERÍA"
// ==============================

galleryButtons.forEach(button => {

  button.addEventListener('click', () => {

    const galleryName =
      button.dataset.gallery;

    openGallery(
      galleryName,
      0
    );

  });

});


// ==============================
// BOTÓN CERRAR
// ==============================

galleryClose?.addEventListener(
  'click',
  closeGallery
);


// ==============================
// FLECHA IZQUIERDA
// ==============================

galleryPrev?.addEventListener(
  'click',
  () => {
    moveGallery(-1);
  }
);


// ==============================
// FLECHA DERECHA
// ==============================

galleryNext?.addEventListener(
  'click',
  () => {
    moveGallery(1);
  }
);


// ==============================
// CERRAR TOCANDO EL FONDO
// ==============================

galleryModal?.addEventListener(
  'click',
  event => {

    if (event.target === galleryModal) {
      closeGallery();
    }

  }
);


// ==============================
// TECLADO
// ==============================

document.addEventListener(
  'keydown',
  event => {

    if (
      !galleryModal ||
      !galleryModal.classList.contains('open')
    ) {
      return;
    }

    if (event.key === 'Escape') {
      closeGallery();
    }

    if (event.key === 'ArrowLeft') {
      moveGallery(-1);
    }

    if (event.key === 'ArrowRight') {
      moveGallery(1);
    }

  }
);