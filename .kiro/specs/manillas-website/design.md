# Documento de Diseño Técnico - Página Web de Manillas

## Overview

La página web de manillas es una aplicación web responsiva que funciona como vitrina digital para un emprendimiento premium de manillas. El sistema debe presentar un catálogo de productos, información sobre el emprendimiento, y facilitar múltiples canales de contacto con potenciales clientes.

**Objetivos principales:**
- Presentar un catálogo de 4 productos con información detallada
- Proporcionar experiencia premium y profesional
- Facilitar contacto a través de múltiples canales (WhatsApp, email, formulario)
- Garantizar rendimiento rápido (< 3 segundos de carga)
- Ser completamente responsivo en todos los dispositivos

**Usuarios objetivo:**
- Clientes potenciales interesados en manillas premium
- Usuarios en dispositivos móviles, tablets y computadoras de escritorio

---

## Architecture

### Arquitectura General

La aplicación seguirá una arquitectura de **Single Page Application (SPA)** con componentes reutilizables, optimizada para rendimiento y SEO.

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (SPA)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React/Vue.js Components                             │  │
│  │  ├─ Layout (Header, Navigation, Footer)              │  │
│  │  ├─ Pages (Home, Catalog, About, Contact)            │  │
│  │  ├─ Product Components (Card, Detail, Gallery)       │  │
│  │  └─ Forms (Contact Form)                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  State Management (Context API / Zustand)            │  │
│  │  ├─ Product Data                                     │  │
│  │  ├─ Filter/Search State                              │  │
│  │  └─ UI State                                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Services Layer                                      │  │
│  │  ├─ Product Service                                  │  │
│  │  ├─ Contact Service                                  │  │
│  │  └─ Analytics Service                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend API                              │
│  ├─ Contact Form Endpoint (POST /api/contact)               │
│  ├─ Product Data Endpoint (GET /api/products)               │
│  └─ Email Service Integration                               │
└─────────────────────────────────────────────────────────────┘
```

### Stack Tecnológico Recomendado

**Frontend:**
- **Framework:** React 18+ o Vue 3 (React recomendado por ecosistema)
- **Build Tool:** Vite (rendimiento superior a Webpack)
- **State Management:** Zustand o Context API
- **Styling:** Tailwind CSS (utilidad-first, rendimiento optimizado)
- **Image Optimization:** Next.js Image o Sharp
- **Form Handling:** React Hook Form + Zod (validación)
- **Routing:** React Router v6

**Backend:**
- **Runtime:** Node.js con Express.js o Fastify
- **Email Service:** SendGrid, Mailgun, o Nodemailer
- **Database:** MongoDB o PostgreSQL (para almacenar contactos)
- **Hosting:** Vercel, Netlify (frontend) + Heroku/Railway (backend)

**DevOps & Tools:**
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry para error tracking
- **Analytics:** Google Analytics 4
- **Performance:** Lighthouse CI

---

## Components and Interfaces

### Estructura de Componentes

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── Pages/
│   │   ├── Home.jsx
│   │   ├── Catalog.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── Product/
│   │   ├── ProductCard.jsx
│   │   ├── ProductGallery.jsx
│   │   ├── ProductInfo.jsx
│   │   └── ProductFilters.jsx
│   ├── Forms/
│   │   ├── ContactForm.jsx
│   │   └── FormField.jsx
│   └── Common/
│       ├── Button.jsx
│       ├── Modal.jsx
│       ├── Loading.jsx
│       └── ErrorBoundary.jsx
├── services/
│   ├── productService.js
│   ├── contactService.js
│   └── analyticsService.js
├── store/
│   ├── productStore.js
│   ├── filterStore.js
│   └── uiStore.js
├── hooks/
│   ├── useProducts.js
│   ├── useFilters.js
│   └── useContactForm.js
├── utils/
│   ├── constants.js
│   ├── validators.js
│   └── formatters.js
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── animations.css
└── App.jsx
```

### Componentes Principales

#### 1. Header & Navigation
- Logo del emprendimiento
- Menú de navegación principal (Inicio, Catálogo, Sobre Nosotros, Contacto)
- Indicador de sección activa
- Menú hamburguesa responsivo para móvil

#### 2. Product Card
- Imagen del producto
- Nombre y precio
- Descripción breve
- Estado de disponibilidad
- Botón para ver detalles

#### 3. Product Detail View
- Galería de imágenes con zoom
- Información completa del producto
- Materiales y especificaciones
- Disponibilidad
- Botón de contacto

#### 4. Product Filters
- Filtro por tipo de manilla
- Filtro por color
- Filtro por rango de precio
- Filtro por materiales
- Búsqueda por texto

#### 5. Contact Form
- Campo nombre (requerido)
- Campo email (requerido, validado)
- Campo asunto (requerido)
- Campo mensaje (requerido)
- Botón enviar
- Validación en tiempo real

#### 6. Footer
- Información de contacto
- Enlaces a redes sociales
- Copyright
- Enlaces rápidos

---

## Data Models

### Modelo de Producto

```javascript
{
  id: string,                    // UUID único
  name: string,                  // Nombre del producto
  description: string,           // Descripción detallada
  price: number,                 // Precio en moneda local
  currency: string,              // Código de moneda (COP, USD, etc.)
  type: string,                  // Tipo de manilla (brazalete, pulsera, etc.)
  colors: string[],              // Array de colores disponibles
  materials: string[],           // Array de materiales (oro, plata, etc.)
  images: {
    thumbnail: string,           // URL imagen pequeña
    main: string,                // URL imagen principal
    gallery: string[]            // URLs de galería
  },
  availability: {
    inStock: boolean,            // Disponibilidad
    quantity: number             // Cantidad disponible
  },
  featured: boolean,             // Mostrar en inicio
  createdAt: ISO8601,            // Fecha de creación
  updatedAt: ISO8601             // Fecha de actualización
}
```

### Modelo de Contacto

```javascript
{
  id: string,                    // UUID único
  name: string,                  // Nombre del contacto
  email: string,                 // Email del contacto
  subject: string,               // Asunto del mensaje
  message: string,               // Contenido del mensaje
  status: string,                // Estado (pending, sent, read)
  createdAt: ISO8601,            // Fecha de creación
  readAt: ISO8601 | null         // Fecha de lectura
}
```

### Modelo de Configuración

```javascript
{
  businessName: string,          // Nombre del emprendimiento
  businessDescription: string,   // Descripción breve
  about: {
    history: string,             // Historia del emprendimiento
    mission: string,             // Misión
    values: string[],            // Valores
    team: string                 // Información del equipo
  },
  contact: {
    email: string,               // Email de contacto
    whatsapp: string,            // Número WhatsApp
    phone: string                // Teléfono
  },
  socialMedia: {
    instagram: string,           // URL Instagram
    facebook: string,            // URL Facebook
    tiktok: string,              // URL TikTok
    linkedin: string             // URL LinkedIn
  },
  branding: {
    primaryColor: string,        // Color primario (hex)
    secondaryColor: string,      // Color secundario (hex)
    accentColor: string,         // Color de acento (hex)
    fontFamily: string           // Familia tipográfica
  }
}
```

---

## User Flows

### Flujo 1: Exploración de Catálogo

```
Usuario accede a la página
    ↓
Ve página de inicio con productos destacados
    ↓
Hace clic en "Ver Catálogo"
    ↓
Ve todos los 4 productos en grid
    ↓
Aplica filtros (color, precio, material)
    ↓
Catálogo se actualiza mostrando solo productos que coinciden
    ↓
Hace clic en un producto
    ↓
Ve vista detallada con galería de imágenes
    ↓
Puede hacer zoom en imágenes
    ↓
Ve información completa y disponibilidad
```

### Flujo 2: Contacto por WhatsApp

```
Usuario ve producto de interés
    ↓
Hace clic en botón "Contactar por WhatsApp"
    ↓
Se abre WhatsApp con número del emprendimiento
    ↓
Usuario puede enviar mensaje
```

### Flujo 3: Envío de Formulario de Contacto

```
Usuario accede a sección "Contacto"
    ↓
Completa formulario (nombre, email, asunto, mensaje)
    ↓
Hace clic en "Enviar"
    ↓
Sistema valida campos
    ↓
Si hay errores, muestra mensajes de error
    ↓
Si es válido, envía email al emprendimiento
    ↓
Muestra mensaje de confirmación al usuario
    ↓
Formulario se limpia
```

### Flujo 4: Búsqueda de Productos

```
Usuario accede a catálogo
    ↓
Escribe en barra de búsqueda
    ↓
Sistema busca en nombre y descripción
    ↓
Resultados se muestran en < 1 segundo
    ↓
Usuario puede hacer clic en resultado
```

---

## Performance Considerations

### Optimizaciones de Carga

1. **Image Optimization**
   - Usar formatos modernos (WebP con fallback a JPEG)
   - Implementar lazy loading para imágenes
   - Generar múltiples tamaños (thumbnail, medium, large)
   - Comprimir imágenes sin perder calidad visual

2. **Code Splitting**
   - Dividir código por rutas (React Router lazy loading)
   - Cargar componentes bajo demanda
   - Separar vendor bundles

3. **Caching**
   - Service Worker para caché offline
   - Cache headers en CDN
   - Caché de productos en localStorage

4. **Minificación y Bundling**
   - Minificar CSS, JS, HTML
   - Tree shaking para eliminar código no usado
   - Usar Vite para build rápido

5. **Métricas de Rendimiento**
   - First Contentful Paint (FCP) < 1.5s
   - Largest Contentful Paint (LCP) < 2.5s
   - Cumulative Layout Shift (CLS) < 0.1
   - Time to Interactive (TTI) < 3s

### Optimizaciones de Búsqueda y Filtrado

- Implementar búsqueda client-side para 4 productos (sin necesidad de backend)
- Usar índices en memoria para búsqueda rápida
- Debounce en búsqueda (300ms)
- Caché de resultados de filtros

---

## Security Considerations

### Frontend Security

1. **Validación de Entrada**
   - Validar todos los campos del formulario
   - Sanitizar entrada de usuario
   - Usar Zod para validación de esquemas

2. **CSRF Protection**
   - Implementar tokens CSRF en formularios
   - Validar origen de requests

3. **XSS Prevention**
   - Escapar contenido dinámico
   - Usar Content Security Policy (CSP)
   - Evitar innerHTML, usar textContent

4. **HTTPS**
   - Forzar HTTPS en producción
   - Usar HSTS headers

### Backend Security

1. **Rate Limiting**
   - Limitar requests a endpoint de contacto
   - Prevenir spam de formularios

2. **Input Validation**
   - Validar email con regex y verificación
   - Validar longitud de campos
   - Sanitizar contenido

3. **Email Verification**
   - Verificar que email es válido
   - Implementar captcha (reCAPTCHA v3)

4. **Data Protection**
   - Encriptar datos sensibles en tránsito (HTTPS)
   - No almacenar contraseñas
   - Cumplir GDPR/CCPA

---

## Error Handling

### Errores de Frontend

1. **Errores de Carga de Datos**
   - Mostrar mensaje amigable si falla carga de productos
   - Botón para reintentar
   - Fallback a datos locales si es posible

2. **Errores de Formulario**
   - Validación en tiempo real
   - Mensajes de error específicos por campo
   - Indicación visual de campos inválidos

3. **Errores de Red**
   - Detectar desconexión
   - Mostrar mensaje de error
   - Opción de reintentar

4. **Errores de Navegador**
   - Error boundary para capturar errores de React
   - Logging a Sentry
   - Página de error 404/500

### Errores de Backend

1. **Validación**
   - Retornar 400 Bad Request con detalles
   - Mensajes de error claros

2. **Autenticación/Autorización**
   - Retornar 401/403 apropiadamente

3. **Errores del Servidor**
   - Retornar 500 con mensaje genérico
   - Loguear detalles internamente

---

## Testing Strategy

### Unit Testing

**Herramientas:** Vitest + React Testing Library

**Cobertura:**
- Componentes individuales (Card, Form, Filter)
- Funciones de utilidad (validadores, formateadores)
- Hooks personalizados
- Servicios

**Ejemplos de tests:**
- Renderización correcta de componentes
- Validación de formularios
- Filtrado de productos
- Manejo de errores

### Property-Based Testing

**Herramientas:** fast-check

**Configuración:** Mínimo 100 iteraciones por propiedad

**Propiedades a validar:**
- Búsqueda retorna solo productos relevantes
- Filtros retornan solo productos que coinciden
- Validación de email rechaza emails inválidos
- Galería de imágenes carga todas las imágenes

### Integration Testing

**Herramientas:** Cypress o Playwright

**Escenarios:**
- Flujo completo de exploración de catálogo
- Envío de formulario de contacto
- Navegación entre secciones
- Responsividad en diferentes dispositivos

### Performance Testing

**Herramientas:** Lighthouse CI, WebPageTest

**Métricas:**
- Tiempo de carga < 3 segundos
- Búsqueda < 1 segundo
- Lighthouse score > 90

### Browser Compatibility Testing

**Navegadores:** Chrome, Firefox, Safari, Edge

**Herramientas:** BrowserStack o Sauce Labs

---

## Deployment Strategy

### Hosting

- **Frontend:** Vercel o Netlify (automático con cada push a main)
- **Backend:** Railway, Heroku, o AWS Lambda
- **CDN:** Cloudflare para caché global

### CI/CD Pipeline

```
Push a GitHub
    ↓
GitHub Actions ejecuta tests
    ↓
Si tests pasan, ejecuta build
    ↓
Si build es exitoso, despliega a staging
    ↓
Ejecuta tests de integración en staging
    ↓
Si todo pasa, despliega a producción
```

### Monitoreo

- Sentry para error tracking
- Google Analytics para comportamiento de usuarios
- Uptime monitoring (UptimeRobot)
- Performance monitoring (Vercel Analytics)

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Catalog displays exactly 4 products

*For any* page load, the catalog view should render exactly 4 product cards in the DOM.

**Validates: Requirements 1.1**

### Property 2: All required product fields are displayed

*For any* product in the catalog, the rendered product card should contain all required fields: name, description, price, images, and materials.

**Validates: Requirements 1.3**

### Property 3: Filtered results only contain matching products

*For any* filter criteria applied (type, color, price range, materials), all returned products should match the selected criteria.

**Validates: Requirements 3.2**

### Property 4: Search returns relevant results

*For any* search query, all returned products should contain the search term in either the product name or description.

**Validates: Requirements 3.3**

### Property 5: Product detail view contains all required information

*For any* product selected, the detail view should display: multiple images, complete description, price, materials, and availability status.

**Validates: Requirements 2.2**

### Property 6: Contact form validates required fields

*For any* form submission with missing required fields (name, email, subject, message), the form should reject the submission and display error messages for each missing field.

**Validates: Requirements 6.2, 6.3**

### Property 7: Valid contact form is submitted successfully

*For any* contact form with all required fields completed and valid email format, submitting the form should send the message to the backend and display a success confirmation.

**Validates: Requirements 6.4, 6.5**

### Property 8: Navigation menu contains all required sections

*For any* page load, the navigation menu should contain links to all required sections: Inicio, Catálogo, Sobre Nosotros, and Contacto.

**Validates: Requirements 9.1**

### Property 9: Active menu item is visually indicated

*For any* page, the navigation menu should visually indicate which section is currently active.

**Validates: Requirements 9.4**

### Property 10: Home page contains all required elements

*For any* home page load, the page should display: banner with featured image, business description, featured products, and call-to-action buttons.

**Validates: Requirements 10.1, 10.2**

### Property 11: Footer is present on all pages

*For any* page in the application, the footer should be rendered with contact information, social media links, and copyright notice.

**Validates: Requirements 11.1, 11.2**

### Property 12: Contact channels are accessible from multiple sections

*For any* page, contact information (WhatsApp, email, social media links) should be accessible from at least two different locations (header/footer or dedicated contact section).

**Validates: Requirements 5.5**

### Property 13: Page is responsive on all device sizes

*For any* viewport size (mobile: 320px, tablet: 768px, desktop: 1024px+), the page should render correctly without horizontal scrolling and all interactive elements should be accessible.

**Validates: Requirements 7.1, 7.2, 7.3, 7.4**

### Property 14: Email link has correct format

*For any* email contact link, the href attribute should be a valid mailto: link with the correct business email address.

**Validates: Requirements 5.3**

### Property 15: WhatsApp link has correct format

*For any* WhatsApp contact link, the href attribute should be a valid WhatsApp link with the correct business phone number.

**Validates: Requirements 5.2**

### Property 16: About section contains all required content

*For any* About Us page load, the page should display: business history, mission, values, and team information.

**Validates: Requirements 4.2**

### Property 17: Product availability status is clearly displayed

*For any* product, the availability status (in stock or out of stock) should be clearly visible and accurate.

**Validates: Requirements 2.4**

### Property 18: Images load and are viewable in high resolution

*For any* product detail view, all product images should load successfully and be viewable in high resolution through a gallery or zoom feature.

**Validates: Requirements 2.3**

### Property 19: Search results appear within 1 second

*For any* search query on a catalog with 4 products, the search results should be displayed within 1 second of user input.

**Validates: Requirements 3.4**

### Property 20: Page loads completely within 3 seconds

*For any* page load on standard internet connection, the page should be fully loaded and interactive within 3 seconds.

**Validates: Requirements 1.2, 10.4, 12.1**

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Setup proyecto React + Vite
- [ ] Configurar Tailwind CSS
- [ ] Crear estructura de carpetas
- [ ] Implementar Layout base (Header, Footer, Navigation)

### Phase 2: Product Catalog (Week 2-3)
- [ ] Crear modelo de datos de productos
- [ ] Implementar ProductCard component
- [ ] Implementar ProductDetail component
- [ ] Crear ProductGallery con zoom

### Phase 3: Filtering & Search (Week 3-4)
- [ ] Implementar ProductFilters component
- [ ] Crear lógica de filtrado
- [ ] Implementar búsqueda por texto
- [ ] Optimizar rendimiento de búsqueda

### Phase 4: Contact & Forms (Week 4-5)
- [ ] Implementar ContactForm component
- [ ] Crear validación de formularios
- [ ] Integrar con backend de email
- [ ] Implementar mensajes de confirmación

### Phase 5: Pages & Content (Week 5-6)
- [ ] Crear página Home
- [ ] Crear página About Us
- [ ] Crear página Contact
- [ ] Implementar navegación entre páginas

### Phase 6: Optimization & Testing (Week 6-7)
- [ ] Optimizar imágenes
- [ ] Implementar lazy loading
- [ ] Crear unit tests
- [ ] Crear integration tests
- [ ] Optimizar performance

### Phase 7: Deployment (Week 7-8)
- [ ] Configurar CI/CD
- [ ] Desplegar a staging
- [ ] Testing en producción
- [ ] Monitoreo y ajustes finales

