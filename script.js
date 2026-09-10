// ==============================
// MENÚ MOBILE
// ==============================

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const navLinks = [...document.querySelectorAll('.nav-link')];

menuToggle?.addEventListener('click', () => {
  const open = mainNav?.classList.toggle('open');

  menuToggle.setAttribute(
    'aria-expanded',
    String(Boolean(open))
  );
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mainNav?.classList.remove('open');

    menuToggle?.setAttribute(
      'aria-expanded',
      'false'
    );
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

const revealElements =
  document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'visible'
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add('visible');
  });

}


// ==============================
// MENÚ ACTIVO SEGÚN SECCIÓN
// ==============================

const sections = [
  ...document.querySelectorAll(
    'main section[id]'
  )
];

if ('IntersectionObserver' in window) {

  const sectionObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          navLinks.forEach(link => {

            const isActive =
              link.getAttribute('href') ===
              `#${entry.target.id}`;

            link.classList.toggle(
              'active',
              isActive
            );

          });

        });

      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0
      }
    );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

}


// ==============================
// FORMULARIO DE CONTACTO
// ==============================

const contactForm =
  document.getElementById('contactForm');

contactForm?.addEventListener(
  'submit',
  event => {

    event.preventDefault();

    const name =
      document
        .getElementById('name')
        ?.value
        .trim();

    const email =
      document
        .getElementById('email')
        ?.value
        .trim();

    const message =
      document
        .getElementById('message')
        ?.value
        .trim();

    if (!name || !email || !message) {
      return;
    }

    const subject =
      encodeURIComponent(
        `Contacto desde portfolio - ${name}`
      );

    const body =
      encodeURIComponent(
`Hola Facundo,

${message}

Nombre: ${name}
Email: ${email}`
      );

    const mailto =
      `mailto:faculabarthe13@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailto;

  }
);


// ==============================
// GALERÍAS DE PROYECTOS
// ==============================

const galleries = {

  // Lugares Full Stack

  lugares: [

    {
      src:
        'assets/lugares-dashboard.png',

      caption:
        'Panel de gestión, creación de lugares e integración con Google Places'
    },

    {
      src:
        'assets/lugares-mis-lugares.png',

      caption:
        'Mis lugares, favoritos, categorías y estadísticas'
    },

    {
      src:
        'assets/lugares-login.png',

      caption:
        'Inicio de sesión'
    }

  ],


  // Sistema de vuelos y pasajes

  vuelos: [

    {
      src:
        'assets/vuelos/vuelos-1.png',

      caption:
        'Listado general de vuelos disponibles'
    },

    {
      src:
        'assets/vuelos/vuelos-2.png',

      caption:
        'Búsqueda de vuelos por código IATA'
    },

    {
      src:
        'assets/vuelos/vuelos-3.png',

      caption:
        'Compra de pasaje y selección de equipaje'
    },

    {
      src:
        'assets/vuelos/vuelos-4.png',

      caption:
        'Registro de cliente ocasional'
    }

  ]

};


// ==============================
// ELEMENTOS DEL MODAL
// ==============================

const galleryModal =
  document.getElementById(
    'galleryModal'
  );

const galleryImage =
  document.getElementById(
    'galleryImage'
  );

const galleryCaption =
  document.getElementById(
    'galleryCaption'
  );

const galleryCounter =
  document.getElementById(
    'galleryCounter'
  );

const galleryClose =
  document.getElementById(
    'galleryClose'
  );

const galleryPrev =
  document.getElementById(
    'galleryPrev'
  );

const galleryNext =
  document.getElementById(
    'galleryNext'
  );

const galleryButtons =
  document.querySelectorAll(
    '[data-gallery]'
  );


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

  if (
    !galleryItems ||
    !galleryImage ||
    !galleryCaption ||
    !galleryCounter
  ) {
    return;
  }

  const item =
    galleryItems[currentGalleryIndex];

  if (!item) {
    return;
  }

  galleryImage.src =
    item.src;

  galleryImage.alt =
    item.caption;

  galleryCaption.textContent =
    item.caption;

  galleryCounter.textContent =
    `${currentGalleryIndex + 1} / ${galleryItems.length}`;

}


// ==============================
// ABRIR GALERÍA
// ==============================

function openGallery(
  galleryName,
  index = 0
) {

  if (
    !galleryModal ||
    !galleries[galleryName]
  ) {
    return;
  }

  currentGallery =
    galleryName;

  currentGalleryIndex =
    index;

  renderGallery();

  galleryModal.classList.add(
    'open'
  );

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

  if (!galleryModal) {
    return;
  }

  galleryModal.classList.remove(
    'open'
  );

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

  if (!galleryItems) {
    return;
  }

  currentGalleryIndex =
    (
      currentGalleryIndex +
      direction +
      galleryItems.length
    ) %
    galleryItems.length;

  renderGallery();

}


// ==============================
// BOTONES "VER GALERÍA"
// ==============================

galleryButtons.forEach(button => {

  button.addEventListener(
    'click',
    () => {

      const galleryName =
        button.dataset.gallery;

      if (!galleryName) {
        return;
      }

      openGallery(
        galleryName,
        0
      );

    }
  );

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

    if (
      event.target ===
      galleryModal
    ) {
      closeGallery();
    }

  }
);


// ==============================
// CONTROLES CON TECLADO
// ==============================

document.addEventListener(
  'keydown',
  event => {

    if (
      !galleryModal ||
      !galleryModal
        .classList
        .contains('open')
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