# Estilos Globales - Documentación

## Descripción General

Este directorio contiene todos los estilos globales y configuración de diseño para la página web de manillas. La estética es **premium, elegante y profesional** con una paleta de colores basada en tonos dorados, plateados, negros y blancos.

## Archivos

### 1. `globals.css`
Archivo principal que importa todas las dependencias de estilos y define los estilos base globales.

**Contenido:**
- Importación de variables CSS y animaciones
- Directivas de Tailwind CSS (@tailwind)
- Reset de estilos base
- Estilos de tipografía
- Componentes reutilizables (botones, tarjetas, badges, alertas)
- Utilidades de layout y espaciado
- Estilos responsivos
- Estilos de scrollbar y selección

### 2. `variables.css`
Define todas las variables CSS personalizadas para colores, espaciado, tipografía, sombras y transiciones.

**Secciones principales:**
- **Colores primarios:** Negro (#1a1a1a) y Oro (#d4af37)
- **Colores de texto:** Variaciones de gris para legibilidad
- **Colores semánticos:** Éxito, advertencia, error, información
- **Espaciado:** Escala de espacios desde xs hasta 4xl
- **Tipografía:** Tamaños de fuente, pesos y alturas de línea
- **Sombras:** Desde sombras sutiles hasta sombras premium con tinte dorado
- **Bordes redondeados:** Escala de border-radius
- **Transiciones:** Duraciones predefinidas (fast, base, slow)
- **Z-index:** Valores para capas de elementos

### 3. `animations.css`
Define todas las animaciones y efectos de transición personalizados.

**Animaciones disponibles:**
- **Fade:** fadeIn, fadeOut
- **Slide:** slideInUp, slideInDown, slideInLeft, slideInRight
- **Scale:** scaleIn, scaleOut
- **Pulse & Shimmer:** pulse, shimmer
- **Bounce:** bounce, bounceIn
- **Rotate:** spin, rotateIn
- **Glow:** glow, glowText
- **Hover Effects:** hover-lift, hover-scale, hover-gold
- **Smooth Transitions:** transition-smooth, transition-smooth-fast, transition-smooth-slow

## Paleta de Colores Premium

### Colores Principales

| Color | Hex | Uso |
|-------|-----|-----|
| **Negro Profundo** | #1a1a1a | Color primario, texto principal |
| **Oro Premium** | #d4af37 | Color secundario, acentos, botones |
| **Blanco Crema** | #f5f5f1 | Fondo, color de acento |
| **Gris Claro** | #e0e0e0 | Bordes, divisores |
| **Gris Oscuro** | #666666 | Texto secundario |

### Variaciones de Color

Cada color principal tiene variaciones de luz/oscuridad:
- `primary-50` a `primary-900` (Negro)
- `secondary-50` a `secondary-900` (Oro)
- `accent-50` a `accent-900` (Blanco/Crema)

### Colores Semánticos

| Estado | Color | Hex |
|--------|-------|-----|
| **Éxito** | Verde | #16a34a |
| **Advertencia** | Naranja | #ea580c |
| **Error** | Rojo | #dc2626 |
| **Información** | Azul | #0284c7 |

## Tipografía

### Fuentes
- **Sans-serif:** Inter (principal), system-ui, -apple-system
- **Serif:** Playfair Display (opcional para títulos premium)

### Tamaños de Fuente
```
xs:   0.75rem   (12px)
sm:   0.875rem  (14px)
base: 1rem      (16px)
lg:   1.125rem  (18px)
xl:   1.25rem   (20px)
2xl:  1.5rem    (24px)
3xl:  1.875rem  (30px)
4xl:  2.25rem   (36px)
5xl:  3rem      (48px)
```

### Pesos de Fuente
- Light: 300
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Espaciado

Escala de espaciado consistente:
```
xs:   0.25rem  (4px)
sm:   0.5rem   (8px)
md:   1rem     (16px)
lg:   1.5rem   (24px)
xl:   2rem     (32px)
2xl:  3rem     (48px)
3xl:  4rem     (64px)
4xl:  5rem     (80px)
```

## Sombras

### Sombras Estándar
- `shadow-sm`: Sombra muy sutil
- `shadow-md`: Sombra media
- `shadow-lg`: Sombra grande
- `shadow-xl`: Sombra extra grande
- `shadow-2xl`: Sombra máxima

### Sombras Premium
- `shadow-premium`: Sombra con tinte dorado (para elementos destacados)
- `shadow-premium-dark`: Sombra oscura (para elementos sobre fondo claro)

## Componentes Reutilizables

### Botones
```html
<!-- Botón primario (Negro) -->
<button class="btn btn-primary">Botón Primario</button>

<!-- Botón secundario (Oro) -->
<button class="btn btn-secondary">Botón Secundario</button>

<!-- Botón outline -->
<button class="btn btn-outline">Botón Outline</button>

<!-- Botón ghost -->
<button class="btn btn-ghost">Botón Ghost</button>

<!-- Tamaños -->
<button class="btn btn-sm">Pequeño</button>
<button class="btn btn-lg">Grande</button>

<!-- Ancho completo -->
<button class="btn btn-block">Ancho Completo</button>
```

### Tarjetas
```html
<div class="card">
  <div class="card-header">
    <h3>Título de la Tarjeta</h3>
  </div>
  <div class="card-body">
    Contenido de la tarjeta
  </div>
  <div class="card-footer">
    Pie de la tarjeta
  </div>
</div>
```

### Badges
```html
<span class="badge badge-primary">Primario</span>
<span class="badge badge-secondary">Secundario</span>
<span class="badge badge-success">Éxito</span>
<span class="badge badge-error">Error</span>
<span class="badge badge-warning">Advertencia</span>
```

### Alertas
```html
<div class="alert alert-success">Mensaje de éxito</div>
<div class="alert alert-error">Mensaje de error</div>
<div class="alert alert-warning">Mensaje de advertencia</div>
<div class="alert alert-info">Mensaje de información</div>
```

## Animaciones

### Uso de Animaciones
```html
<!-- Fade in -->
<div class="animate-fade-in">Contenido</div>

<!-- Slide in -->
<div class="animate-slide-in-up">Contenido</div>

<!-- Scale in -->
<div class="animate-scale-in">Contenido</div>

<!-- Bounce -->
<div class="animate-bounce">Contenido</div>

<!-- Glow -->
<div class="animate-glow">Contenido</div>

<!-- Hover effects -->
<div class="hover-lift">Levanta al pasar el mouse</div>
<div class="hover-scale">Escala al pasar el mouse</div>
<div class="hover-gold">Cambia a oro al pasar el mouse</div>
```

## Configuración de Tailwind CSS

La configuración de Tailwind se encuentra en `tailwind.config.js` en la raíz del proyecto.

### Características Principales
- Paleta de colores personalizada con variaciones
- Tipografía personalizada
- Sombras premium
- Animaciones personalizadas
- Transiciones suaves

### Extensiones
Todos los estilos personalizados se agregan bajo `theme.extend` para mantener compatibilidad con Tailwind.

## Responsividad

Los estilos son completamente responsivos con breakpoints:
- **Mobile:** < 480px
- **Tablet:** 480px - 768px
- **Desktop:** > 768px

### Clases Responsivas
```html
<!-- Ocultar en móvil -->
<div class="hidden md:block">Solo en desktop</div>

<!-- Mostrar solo en móvil -->
<div class="md:hidden">Solo en móvil</div>

<!-- Grid responsivo -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- Contenido -->
</div>
```

## Modo Oscuro (Opcional)

El archivo `variables.css` incluye soporte para modo oscuro usando `prefers-color-scheme: dark`.

Para habilitar, agregar a `tailwind.config.js`:
```javascript
darkMode: 'media', // o 'class'
```

## Mejores Prácticas

1. **Usar variables CSS:** Siempre usar variables CSS en lugar de valores hardcodeados
2. **Usar clases de utilidad:** Preferir clases de Tailwind sobre CSS personalizado
3. **Mantener consistencia:** Usar la escala de espaciado y colores definida
4. **Animaciones sutiles:** Las animaciones deben ser suaves y no distraer
5. **Accesibilidad:** Asegurar suficiente contraste de color y legibilidad

## Ejemplo de Uso Completo

```html
<section class="section bg-accent">
  <div class="container">
    <h2 class="section-title text-primary">Título Premium</h2>
    <p class="section-subtitle">Subtítulo elegante</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
      <div class="card animate-fade-in">
        <h3>Tarjeta 1</h3>
        <p>Contenido de la tarjeta</p>
        <button class="btn btn-secondary mt-lg">Acción</button>
      </div>
      <!-- Más tarjetas -->
    </div>
  </div>
</section>
```

## Recursos

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Web Design Best Practices](https://www.nngroup.com/articles/web-design-best-practices/)
