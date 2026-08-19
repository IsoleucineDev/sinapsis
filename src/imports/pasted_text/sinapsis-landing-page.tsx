Crea una presentación web interactiva de una sola página (scroll-driven, tipo landing page premium) 
para "Sinapsis", un grupo estudiantil de divulgación científica del Tecnológico de Monterrey 
Campus Toluca (Escuela de Ingeniería y Ciencias - EIC). Usa React + Tailwind CSS + componentes 
animados de la librería React Bits (reactbits.dev) para lograr transiciones y efectos vistosos 
y profesionales, no genéricos.

IDENTIDAD VISUAL
- Paleta principal: azul marino oscuro (#1B2A4A / #16213E) como fondo dominante, con acentos en 
  amarillo/lima pastel (#E8F0A8-ish) y azul cielo claro para secciones alternas.
- Tipografía: sans-serif bold y grande para títulos (estilo display, ej. Poppins/Sora en 900), 
  texto de cuerpo limpio y legible.
- Elementos gráficos recurrentes: líneas de red/globo terráqueo wireframe (network/globe mesh) 
  en las esquinas, motivo de "sinapsis"/neuronas conectadas como ícono de marca.
- Logo del Tec de Monterrey en la esquina superior izquierda de cada sección.

USA DE REACT BITS:
- Un fondo animado tipo "Particles" o "Threads" (líneas de red neuronal) en el hero, sutil y oscuro.
- "Text Reveal" / "Split Text" animado para los títulos de cada sección al hacer scroll.
- "Spotlight Card" o "Tilt Card" para las tarjetas de integrantes y asesores (hover con leve 3D/glow).
- "Marquee" o "Scroll Velocity" para una franja con los eventos/hashtags (#DivulgaciónCientífica, etc).
- "Animated Counter" para métricas si se agregan (ej. número de proyectos, escuelas invitadas).
- Transiciones de entrada tipo "Fade Up" / "Blur In" en cascada para listas de bullets.

ESTRUCTURA DE SECCIONES (en este orden):

1. HERO / PORTADA
   - Logo Tec de Monterrey
   - Título gigante "SINAPSIS"
   - Subtítulo: "Grupo estudiantil de Divulgación Científica"
   - Pills/badges: "Grupo estudiantil" · "Reunión demostrativa"
   - Isotipo de Sinapsis (dos siluetas curvas conectadas por nodos, estilo neuronal) al centro
   - Fondo con red de líneas animada + esfera/toro wireframe decorativo

2. ¿CÓMO SURGIÓ LA IDEA?
   - Texto: "Buscamos hacer divulgación científica sobre lo que hacemos en la EIC"
   - Apoyo visual: mostrar las 5 carreras de la EIC como 5 tarjetas o íconos en fila animada

3. SINAPSIS = DIVULGACIÓN
   - Tarjeta central "SINAPSIS = DIVULGACIÓN" con flechas animadas apuntando hacia abajo a 3 tarjetas:
     "Proyectos" (azul) · "Exposiciones" (coral/rojo) · "Ciencia accesible" (verde lima)

4. ¿CÓMO VAMOS A DIVULGAR?
   - 3 formatos como tarjetas o íconos con hover: Exposiciones · Podcast · Radio

5. ¿QUÉ VAMOS A DIVULGAR? (eventos grandes)
   - Timeline o cards en fila con animación de entrada escalonada:
     a) Feria de Ciencias — presentar eventos grandes, invitar escuelas externas (secundaria y prepa)
     b) Congreso — líneas temáticas por carrera, invitar escuelas externas a participar, 
        ponentes de la EIC y externos
     c) Hackathon — invitar escuelas externas a crear proyectos junto con nosotros (5 carreras)

6. ACTIVIDADES ADICIONALES
   - Lista animada (fade-up en cascada) de actividades continuas:
     • Radio Mexiquense
     • Cápsula "En Consciencia"
     • Asesorías en cohetes con F1025B
     • Evento de cierre conjunto entre F1025B y AAVAT

7. ¿QUÉ NECESITAMOS DE LA EIC?
   - Íconos grandes con micro-animación (bounce/hover) para: Espacios · Materiales · Dinero · 
     Impresión 3D · Corte láser

8. BACKGROUND / TRAYECTORIA
   - Sección de dos columnas: título "Background" grande a la izquierda sobre fondo degradado 
     azul-verde con textura, y a la derecha lista de logros/experiencias con animación de entrada:
     Noche de las Estrellas · Biohack CCM 2024/2025 · Biohack Nacional 2024 · 
     Competencia UAM Azcapotzalco · AAVAT

9. INTEGRANTES
   - Grid de tarjetas con foto circular/redondeada (placeholder si no hay imagen), nombre y cargo, 
     efecto tilt/spotlight al pasar el mouse:
     Javier Tello Vázquez — Presidente
     José Carlos Ramos Martínez — Vicepresidente
     Camila Cejas Palacios — Coordinadora de Proyectos
     Valeria Cervantes Murguía — Responsabilidad Social
     Jesús Villafuerte Castañeda — Comunicación
     Diego García Morales — Finanzas
   - Para Jesús y Diego, agrega una animación de flechas curvas conectando sus tarjetas (como en 
     el diseño original) para sugerir colaboración entre Comunicación y Finanzas.

10. ASESORES
    - Grid de 3 tarjetas con foto, nombre, mismo estilo de hover que integrantes:
      Ángel Rafael Monroy Peláez
      Alan Joel Miralrio Pineda
      Erick Santiago Escobar Aguilar

11. CIERRE / CTA
    - Llamado a la acción: "Únete a Sinapsis" o "Contáctanos", con botón animado (magnetic button 
      o shimmer button de React Bits) y logo de "Divulgación Científica TEC".

INTERACCIÓN Y NAVEGACIÓN
- Scroll suave (smooth scroll) entre secciones con un indicador de progreso lateral tipo dots.
- Animaciones activadas al entrar en viewport (Intersection Observer / scroll-triggered), no todas 
  al cargar.
- Responsive: que se vea bien en mobile con las tarjetas apilándose en columna.

TONO GENERAL: profesional pero dinámico, con esa sensación de "ciencia accesible" — nada acartonado, 
mucho movimiento sutil, buen contraste, y que las animaciones se sientan premium, no genéricas 
de plantilla.