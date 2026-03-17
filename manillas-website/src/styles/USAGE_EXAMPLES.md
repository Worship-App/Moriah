# Ejemplos de Uso de Estilos Globales

Este documento proporciona ejemplos prácticos de cómo usar los estilos globales, variables CSS y componentes reutilizables en la aplicación.

## Tabla de Contenidos

1. [Colores](#colores)
2. [Tipografía](#tipografía)
3. [Espaciado](#espaciado)
4. [Componentes](#componentes)
5. [Animaciones](#animaciones)
6. [Responsive Design](#responsive-design)
7. [Ejemplos Completos](#ejemplos-completos)

---

## Colores

### Usando Variables CSS

```css
/* En archivos CSS */
.my-element {
  background-color: var(--color-primary);
  color: var(--color-accent);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-premium);
}
```

### Usando Tailwind CSS

```html
<!-- Colores primarios -->
<div class="bg-secondary-900 text-accent-50">Fondo negro, texto blanco</div>

<!-- Colores secundarios (oro) -->
<div class="bg-primary-500 text-secondary-900">Fondo oro, texto negro</div>

<!-- Colores semánticos -->
<div class="bg-green-100 text-green-700">Éxito</div>
<div class="bg-red-100 text-red-700">Error</div>
<div class="bg-yellow-100 text-yellow-700">Advertencia</div>
```

### Usando el archivo colors.js

```javascript
import { colors, colorAliases, withOpacity } from '@/utils/colors';

// Acceder a colores específicos
const primaryColor = colors.primary[500]; // #d4af37
const blackColor = colors.secondary[900]; // #1a1a1a

// Usar aliases
const brandColor = colorAliases.brand; // #1a1a1a
const brandGold = colorAliases.brandGold; // #d4af37

// Aplicar opacidad
const goldWithOpacity = withOpacity(colors.primary[500], 0.5);
```

---

## Tipografía

### Tamaños de Fuente

```html
<!-- Usando clases de Tailwind -->
<h1 class="text-4xl font-bold">Título Principal (36px)</h1>
<h2 class="text-3xl font-semibold">Subtítulo (30px)</h2>
<h3 class="text-2xl font-semibold">Sección (24px)</h3>
<p class="text-base font-normal">Párrafo normal (16px)</p>
<small class="text-sm">Texto pequeño (14px)</small>

<!-- Usando variables CSS -->
<h1 style="font-size: var(--font-size-4xl); font-weight: var(--font-weight-bold);">
  Título con Variables
</h1>
```

### Pesos de Fuente

```html
<!-- Light -->
<p class="font-light">Texto ligero (300)</p>

<!-- Normal -->
<p class="font-normal">Texto normal (400)</p>

<!-- Medium -->
<p class="font-medium">Texto medio (500)</p>

<!-- Semibold -->
<p class="font-semibold">Texto semibold (600)</p>

<!-- Bold -->
<p class="font-bold">Texto bold (700)</p>
```

### Altura de Línea

```html
<p class="leading-tight">Altura de línea ajustada (1.2)</p>
<p class="leading-normal">Altura de línea normal (1.5)</p>
<p class="leading-relaxed">Altura de línea relajada (1.75)</p>
```

---

## Espaciado

### Márgenes

```html
<!-- Margen superior -->
<div class="mt-md">Margen superior medio (1rem)</div>
<div class="mt-lg">Margen superior grande (1.5rem)</div>

<!-- Margen inferior -->
<div class="mb-md">Margen inferior medio (1rem)</div>
<div class="mb-lg">Margen inferior grande (1.5rem)</div>

<!-- Margen en ambos lados -->
<div class="my-lg">Margen vertical grande (1.5rem)</div>
```

### Padding

```html
<!-- Padding uniforme -->
<div class="p-md">Padding medio (1rem)</div>
<div class="p-lg">Padding grande (1.5rem)</div>

<!-- Padding horizontal y vertical -->
<div class="px-lg py-md">Padding horizontal grande, vertical medio</div>
```

### Gap (en grillas y flexbox)

```html
<!-- Gap en grilla -->
<div class="grid grid-cols-3 gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Gap en flexbox -->
<div class="flex gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## Componentes

### Botones

```html
<!-- Botón Primario (Negro) -->
<button class="btn btn-primary">
  Botón Primario
</button>

<!-- Botón Secundario (Oro) -->
<button class="btn btn-secondary">
  Botón Secundario
</button>

<!-- Botón Outline -->
<button class="btn btn-outline">
  Botón Outline
</button>

<!-- Botón Ghost -->
<button class="btn btn-ghost">
  Botón Ghost
</button>

<!-- Tamaños -->
<button class="btn btn-primary btn-sm">Pequeño</button>
<button class="btn btn-primary">Normal</button>
<button class="btn btn-primary btn-lg">Grande</button>

<!-- Ancho completo -->
<button class="btn btn-primary btn-block">Ancho Completo</button>

<!-- Deshabilitado -->
<button class="btn btn-primary" disabled>Deshabilitado</button>
```

### Tarjetas

```html
<!-- Tarjeta básica -->
<div class="card">
  <h3>Título de la Tarjeta</h3>
  <p>Contenido de la tarjeta</p>
</div>

<!-- Tarjeta con estructura completa -->
<div class="card">
  <div class="card-header">
    <h3>Título</h3>
  </div>
  <div class="card-body">
    <p>Contenido principal de la tarjeta</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-secondary">Acción</button>
  </div>
</div>

<!-- Tarjeta con hover effect -->
<div class="card hover-lift">
  <h3>Tarjeta Interactiva</h3>
  <p>Se levanta al pasar el mouse</p>
</div>
```

### Badges

```html
<!-- Badge Primario -->
<span class="badge badge-primary">Primario</span>

<!-- Badge Secundario -->
<span class="badge badge-secondary">Secundario</span>

<!-- Badge Éxito -->
<span class="badge badge-success">Éxito</span>

<!-- Badge Error -->
<span class="badge badge-error">Error</span>

<!-- Badge Advertencia -->
<span class="badge badge-warning">Advertencia</span>
```

### Alertas

```html
<!-- Alerta de Éxito -->
<div class="alert alert-success">
  ✓ Operación completada exitosamente
</div>

<!-- Alerta de Error -->
<div class="alert alert-error">
  ✗ Ocurrió un error al procesar la solicitud
</div>

<!-- Alerta de Advertencia -->
<div class="alert alert-warning">
  ⚠ Por favor, revisa esta información
</div>

<!-- Alerta de Información -->
<div class="alert alert-info">
  ℹ Información importante para ti
</div>
```

---

## Animaciones

### Animaciones de Entrada

```html
<!-- Fade In -->
<div class="animate-fade-in">
  Aparece suavemente
</div>

<!-- Slide In Up -->
<div class="animate-slide-in-up">
  Desliza hacia arriba
</div>

<!-- Slide In Down -->
<div class="animate-slide-in-down">
  Desliza hacia abajo
</div>

<!-- Slide In Left -->
<div class="animate-slide-in-left">
  Desliza desde la izquierda
</div>

<!-- Slide In Right -->
<div class="animate-slide-in-right">
  Desliza desde la derecha
</div>

<!-- Scale In -->
<div class="animate-scale-in">
  Escala desde pequeño
</div>

<!-- Bounce In -->
<div class="animate-bounce-in">
  Rebota al entrar
</div>

<!-- Rotate In -->
<div class="animate-rotate-in">
  Rota al entrar
</div>
```

### Animaciones Continuas

```html
<!-- Pulse -->
<div class="animate-pulse">
  Pulsa continuamente
</div>

<!-- Pulse Lento -->
<div class="animate-pulse-slow">
  Pulsa lentamente
</div>

<!-- Shimmer (Brillo) -->
<div class="animate-shimmer">
  Efecto de brillo
</div>

<!-- Bounce -->
<div class="animate-bounce">
  Rebota continuamente
</div>

<!-- Spin (Girar) -->
<div class="animate-spin">
  Gira continuamente
</div>

<!-- Glow (Brillo) -->
<div class="animate-glow">
  Brilla con efecto dorado
</div>

<!-- Glow Text -->
<h2 class="animate-glow-text">
  Texto con brillo dorado
</h2>
```

### Efectos al Pasar el Mouse

```html
<!-- Hover Lift (Se levanta) -->
<div class="hover-lift p-lg bg-white rounded-lg">
  Se levanta al pasar el mouse
</div>

<!-- Hover Scale (Escala) -->
<div class="hover-scale p-lg bg-white rounded-lg">
  Escala al pasar el mouse
</div>

<!-- Hover Gold (Cambia a oro) -->
<p class="hover-gold">
  Cambia a oro al pasar el mouse
</p>
```

### Transiciones Suaves

```html
<!-- Transición rápida -->
<div class="transition-smooth-fast">
  Transición rápida (150ms)
</div>

<!-- Transición normal -->
<div class="transition-smooth">
  Transición normal (300ms)
</div>

<!-- Transición lenta -->
<div class="transition-smooth-slow">
  Transición lenta (500ms)
</div>
```

---

## Responsive Design

### Breakpoints

```html
<!-- Ocultar en móvil, mostrar en desktop -->
<div class="hidden md:block">
  Solo visible en desktop
</div>

<!-- Mostrar solo en móvil -->
<div class="md:hidden">
  Solo visible en móvil
</div>

<!-- Mostrar en tablet y desktop -->
<div class="hidden sm:block">
  Visible en tablet y desktop
</div>
```

### Grid Responsivo

```html
<!-- 1 columna en móvil, 2 en tablet, 3 en desktop -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
  <div class="card">Tarjeta 1</div>
  <div class="card">Tarjeta 2</div>
  <div class="card">Tarjeta 3</div>
</div>

<!-- 1 columna en móvil, 4 en desktop -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

### Tipografía Responsiva

```html
<!-- Tamaño diferente según pantalla -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">
  Título Responsivo
</h1>

<!-- Padding diferente según pantalla -->
<div class="p-md md:p-lg lg:p-2xl">
  Contenido con padding responsivo
</div>
```

---

## Ejemplos Completos

### Ejemplo 1: Sección de Productos

```html
<section class="section bg-accent">
  <div class="container">
    <!-- Título de sección -->
    <h2 class="section-title text-primary">
      Nuestros Productos Premium
    </h2>
    <p class="section-subtitle">
      Descubre nuestra colección exclusiva de manillas
    </p>

    <!-- Grid de productos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
      <!-- Tarjeta de producto -->
      <div class="card animate-fade-in hover-lift">
        <img src="product.jpg" alt="Producto" class="w-full rounded-lg mb-lg" />
        <h3 class="text-lg font-semibold text-primary">Manilla Dorada</h3>
        <p class="text-sm text-light mb-md">Oro 18k premium</p>
        <div class="flex-between mb-lg">
          <span class="text-2xl font-bold text-secondary">$299</span>
          <span class="badge badge-success">En Stock</span>
        </div>
        <button class="btn btn-secondary btn-block">Ver Detalles</button>
      </div>
      <!-- Más tarjetas -->
    </div>
  </div>
</section>
```

### Ejemplo 2: Formulario de Contacto

```html
<section class="section bg-white">
  <div class="container max-w-2xl">
    <h2 class="section-title">Contáctanos</h2>

    <form class="space-y-lg">
      <!-- Campo de nombre -->
      <div>
        <label class="block text-sm font-semibold mb-sm">Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre completo"
          class="w-full px-lg py-md border border-border rounded-md focus:border-secondary focus:ring-2 focus:ring-secondary/20"
        />
      </div>

      <!-- Campo de email -->
      <div>
        <label class="block text-sm font-semibold mb-sm">Email</label>
        <input
          type="email"
          placeholder="tu@email.com"
          class="w-full px-lg py-md border border-border rounded-md focus:border-secondary focus:ring-2 focus:ring-secondary/20"
        />
      </div>

      <!-- Campo de mensaje -->
      <div>
        <label class="block text-sm font-semibold mb-sm">Mensaje</label>
        <textarea
          rows="5"
          placeholder="Tu mensaje aquí..."
          class="w-full px-lg py-md border border-border rounded-md focus:border-secondary focus:ring-2 focus:ring-secondary/20"
        ></textarea>
      </div>

      <!-- Botones -->
      <div class="flex gap-md">
        <button type="submit" class="btn btn-secondary flex-1">
          Enviar Mensaje
        </button>
        <button type="reset" class="btn btn-outline flex-1">
          Limpiar
        </button>
      </div>
    </form>
  </div>
</section>
```

### Ejemplo 3: Header Premium

```html
<header class="bg-primary text-accent sticky top-0 z-fixed shadow-lg">
  <div class="container">
    <div class="flex-between py-lg">
      <!-- Logo -->
      <div class="flex-center gap-md">
        <img src="logo.svg" alt="Logo" class="h-8" />
        <span class="text-xl font-bold">Manillas Premium</span>
      </div>

      <!-- Navegación -->
      <nav class="hidden md:flex gap-xl">
        <a href="/" class="hover-gold transition-smooth">Inicio</a>
        <a href="/catalog" class="hover-gold transition-smooth">Catálogo</a>
        <a href="/about" class="hover-gold transition-smooth">Sobre Nosotros</a>
        <a href="/contact" class="hover-gold transition-smooth">Contacto</a>
      </nav>

      <!-- Botón CTA -->
      <button class="btn btn-secondary hidden md:block">
        Comprar Ahora
      </button>

      <!-- Menú móvil -->
      <button class="md:hidden text-accent">
        ☰
      </button>
    </div>
  </div>
</header>
```

### Ejemplo 4: Footer

```html
<footer class="bg-primary text-accent py-3xl">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-2xl mb-2xl">
      <!-- Información -->
      <div>
        <h4 class="font-bold mb-lg">Manillas Premium</h4>
        <p class="text-sm text-light">
          Artesanía de calidad premium con diseño elegante y moderno.
        </p>
      </div>

      <!-- Enlaces -->
      <div>
        <h4 class="font-bold mb-lg">Enlaces</h4>
        <ul class="space-y-sm text-sm">
          <li><a href="/" class="hover-gold">Inicio</a></li>
          <li><a href="/catalog" class="hover-gold">Catálogo</a></li>
          <li><a href="/about" class="hover-gold">Sobre Nosotros</a></li>
        </ul>
      </div>

      <!-- Contacto -->
      <div>
        <h4 class="font-bold mb-lg">Contacto</h4>
        <ul class="space-y-sm text-sm">
          <li><a href="mailto:info@manillas.com" class="hover-gold">info@manillas.com</a></li>
          <li><a href="https://wa.me/1234567890" class="hover-gold">WhatsApp</a></li>
        </ul>
      </div>

      <!-- Redes Sociales -->
      <div>
        <h4 class="font-bold mb-lg">Síguenos</h4>
        <div class="flex gap-md">
          <a href="#" class="hover-gold">Instagram</a>
          <a href="#" class="hover-gold">Facebook</a>
          <a href="#" class="hover-gold">TikTok</a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="border-t border-secondary/20 pt-lg text-center text-sm text-light">
      <p>&copy; 2024 Manillas Premium. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>
```

---

## Consejos y Mejores Prácticas

1. **Consistencia:** Siempre usa las variables CSS y clases definidas
2. **Accesibilidad:** Asegura suficiente contraste de color
3. **Performance:** Evita animaciones excesivas
4. **Responsividad:** Prueba en múltiples dispositivos
5. **Mantenibilidad:** Documenta cambios personalizados

---

## Recursos Adicionales

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Web Accessibility](https://www.w3.org/WAI/)
