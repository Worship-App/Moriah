# Configuración de Enrutamiento - Manillas Website

## Descripción General

Se ha configurado completamente el enrutamiento de la aplicación usando React Router v6 con las siguientes características:

- ✅ Rutas principales configuradas
- ✅ Páginas placeholder implementadas
- ✅ Navegación funcional entre páginas
- ✅ Manejo de rutas no encontradas (404)
- ✅ Transiciones suaves entre páginas

## Rutas Configuradas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Página de inicio con productos destacados |
| `/catalog` | Catalog | Catálogo completo de productos |
| `/about` | About | Información sobre el emprendimiento |
| `/contact` | Contact | Formulario de contacto e información |
| `*` | NotFound | Página 404 para rutas no encontradas |

## Estructura de Enrutamiento

### App.jsx
```jsx
<Router>
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</Router>
```

### Layout.jsx
- Usa `<Outlet />` de React Router para renderizar las páginas
- Envuelve todas las rutas con Header, Footer y animación de fade-in
- Estructura: Header → Main (Outlet) → Footer

### Navigation.jsx
- Componente reutilizable que muestra el menú de navegación
- Usa `useLocation()` para detectar la ruta activa
- Indica visualmente cuál es la sección activa con estilos dinámicos
- Responsive: menú horizontal en desktop, vertical en móvil

## Características Implementadas

### 1. Navegación Funcional
- Links usando `<Link>` de React Router
- Navegación sin recargar la página
- Indicador visual de sección activa

### 2. Manejo de Rutas No Encontradas
- Página 404 personalizada (NotFound.jsx)
- Botón para volver al inicio
- Tracking de página 404 en analytics

### 3. Transiciones Suaves
- Animación `fade-in` al cargar cada página
- Duración: 300ms (configurable en variables.css)
- Mejora la experiencia visual del usuario

### 4. Responsive Design
- Menú hamburguesa en dispositivos móviles
- Navegación horizontal en desktop
- Todos los elementos se adaptan al tamaño de pantalla

## Archivos Modificados/Creados

### Creados:
- `src/pages/NotFound.jsx` - Página 404
- `src/App.test.jsx` - Tests básicos de enrutamiento

### Modificados:
- `src/App.jsx` - Agregada ruta 404 y importación de NotFound
- `src/components/Layout/Layout.jsx` - Agregada animación fade-in

## Testing

Se incluye un test básico en `App.test.jsx` que verifica:
- Renderización de la página Home
- Presencia de todos los elementos del menú de navegación
- Presencia del footer en todas las páginas

Para ejecutar los tests:
```bash
npm test
```

## Uso de la Navegación

### Desde el Código
```jsx
import { Link } from 'react-router-dom'

<Link to="/catalog">Ver Catálogo</Link>
```

### Desde el Componente Navigation
El componente Navigation se usa automáticamente en el Header y Footer, mostrando:
- Menú principal en el Header
- Enlaces rápidos en el Footer

### Indicador de Sección Activa
El menú muestra automáticamente cuál es la sección activa:
- Color: `text-secondary` (dorado)
- Borde inferior: `border-secondary`

## Animaciones

Las transiciones entre páginas usan la clase `animate-fade-in`:
- Duración: 300ms
- Easing: ease-in-out
- Efecto: Fade in suave

Otras animaciones disponibles en `src/styles/animations.css`:
- `animate-slide-in-up`
- `animate-slide-in-down`
- `animate-scale-in`
- `animate-bounce-in`
- Y más...

## Próximos Pasos

1. Implementar rutas dinámicas para detalles de productos (ej: `/product/:id`)
2. Agregar transiciones de página más complejas si es necesario
3. Implementar lazy loading de componentes para optimizar performance
4. Agregar breadcrumbs de navegación si es necesario

## Notas Importantes

- React Router v6 usa `<Outlet />` en lugar de `{children}`
- Las rutas se definen en orden: rutas específicas primero, luego `*` para 404
- El Layout envuelve todas las rutas, por lo que Header y Footer aparecen en todas las páginas
- La navegación es completamente funcional en todos los dispositivos
