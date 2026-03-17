# Implementación de Componentes Comunes Reutilizables

## Resumen

Se han creado y mejorado 4 componentes comunes reutilizables para el proyecto manillas-website. Estos componentes proporcionan funcionalidad esencial para la interfaz de usuario y son utilizados en toda la aplicación.

## Componentes Implementados

### 1. Button Component
**Ubicación:** `src/components/Common/Button.jsx`

**Características:**
- 4 variantes: primary, secondary, outline, ghost
- 3 tamaños: sm, md, lg
- Estados: normal, hover, active, disabled, focus
- Estilos premium con sombras y transiciones suaves
- Accesibilidad completa (focus rings, keyboard support)
- Soporte para props personalizados (type, className, etc.)

**Variantes:**
- **primary**: Fondo negro con hover dorado (CTA principal)
- **secondary**: Fondo dorado con hover más oscuro
- **outline**: Transparente con borde negro
- **ghost**: Transparente con efecto hover

**Ejemplo de uso:**
```jsx
<Button variant="primary" size="lg">Comprar ahora</Button>
<Button variant="outline" size="md">Cancelar</Button>
<Button variant="secondary" disabled>Deshabilitado</Button>
```

### 2. Modal Component
**Ubicación:** `src/components/Common/Modal.jsx`

**Características:**
- Overlay con fondo oscuro semi-transparente
- Animación suave de entrada (slide-in-up)
- Cierre mediante: botón X, click en backdrop, tecla Escape
- 4 tamaños: sm, md, lg, xl
- Soporte para acciones personalizadas
- Prevención de scroll del body cuando está abierto
- Estilos premium con sombras

**Props:**
- `isOpen`: boolean - Controla visibilidad
- `onClose`: function - Callback al cerrar
- `title`: string - Título del modal
- `children`: ReactNode - Contenido
- `actions`: ReactNode - Botones de acción (opcional)
- `size`: string - Tamaño del modal (default: 'md')

**Ejemplo de uso:**
```jsx
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Confirmar acción"
  actions={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirmar</Button>
    </>
  }
>
  ¿Estás seguro de que deseas continuar?
</Modal>
```

### 3. Loading Component
**Ubicación:** `src/components/Common/Loading.jsx`

**Características:**
- Spinner animado con estilos premium
- Mensaje de carga personalizable
- Modo normal (inline) y pantalla completa
- Animación suave y continua
- Colores premium (oro y negro)

**Props:**
- `message`: string - Mensaje de carga (default: 'Cargando...')
- `fullScreen`: boolean - Modo pantalla completa (default: false)

**Ejemplo de uso:**
```jsx
<Loading message="Cargando productos..." />
<Loading fullScreen={true} message="Por favor espera..." />
```

### 4. ErrorBoundary Component
**Ubicación:** `src/components/Common/ErrorBoundary.jsx`

**Características:**
- Captura errores de React en componentes hijos
- UI amigable para mostrar errores
- Botones de acción: "Intentar de nuevo" e "Ir al inicio"
- Muestra detalles del error en modo desarrollo
- Logging automático de errores
- Estilos premium con gradiente de fondo

**Ejemplo de uso:**
```jsx
<ErrorBoundary>
  <MiComponente />
</ErrorBoundary>
```

## Paleta de Colores Premium

Los componentes utilizan la paleta de colores premium definida en `tailwind.config.js`:

- **Primary (Oro)**: #d4af37 - Color secundario principal
- **Secondary (Negro)**: #1a1a1a - Color primario principal
- **Accent (Crema)**: #f5f5f1 - Color de acento
- **Success**: #16a34a
- **Warning**: #ea580c
- **Error**: #dc2626
- **Info**: #0284c7

## Estilos y Animaciones

### Animaciones Disponibles
- `fade-in`: Desvanecimiento suave
- `slide-in-up`: Deslizamiento hacia arriba
- `slide-in-down`: Deslizamiento hacia abajo
- `slide-in-left`: Deslizamiento hacia la izquierda
- `slide-in-right`: Deslizamiento hacia la derecha
- `pulse-slow`: Pulso lento
- `shimmer`: Efecto de brillo

### Sombras Premium
- `shadow-md`: Sombra mediana
- `shadow-lg`: Sombra grande
- `shadow-2xl`: Sombra extra grande
- `shadow-premium`: Sombra con tono dorado
- `shadow-premium-dark`: Sombra con tono negro

## Testing

Se han creado tests completos para todos los componentes usando Vitest y React Testing Library.

### Cobertura de Tests

**Button Component (16 tests)**
- Renderización con diferentes variantes y tamaños
- Estados deshabilitados
- Interacciones (click, keyboard)
- Accesibilidad (focus rings, keyboard support)

**Modal Component (18 tests)**
- Renderización condicional
- Diferentes tamaños
- Interacciones (close button, backdrop, Escape key)
- Acciones personalizadas
- Accesibilidad
- Manejo de overflow del body

**Loading Component (15 tests)**
- Renderización con mensaje personalizado
- Estilos y animaciones
- Modo pantalla completa
- Manejo de mensajes vacíos

**ErrorBoundary Component (10 tests)**
- Captura de errores
- UI de error
- Interacciones (retry, home button)
- Logging de errores
- Modo desarrollo

**Total: 59 tests - Todos pasando ✓**

## Ejecución de Tests

```bash
# Ejecutar todos los tests de componentes comunes
npm test -- src/components/Common --run

# Ejecutar tests en modo watch
npm test -- src/components/Common

# Ejecutar un test específico
npm test -- src/components/Common/Button.test.jsx --run
```

## Accesibilidad

Todos los componentes cumplen con estándares de accesibilidad:

- **Button**: Focus rings, keyboard navigation, proper button semantics
- **Modal**: ARIA attributes, keyboard support (Escape), focus management
- **Loading**: Semantic HTML, proper text contrast
- **ErrorBoundary**: Proper error messaging, action buttons with clear labels

## Reutilización en el Proyecto

Los componentes están disponibles para importar desde `src/components/Common`:

```jsx
import { Button, Modal, Loading, ErrorBoundary } from '@/components/Common'

// O importar individualmente
import Button from '@/components/Common/Button'
```

## Mejoras Realizadas

### Button
- ✅ Agregadas variantes ghost
- ✅ Mejorados estilos premium con sombras
- ✅ Agregado soporte para prop `type`
- ✅ Mejorada accesibilidad con focus rings
- ✅ Agregado gap entre elementos

### Modal
- ✅ Agregada animación de entrada
- ✅ Soporte para diferentes tamaños
- ✅ Agregado soporte para acciones personalizadas
- ✅ Mejorada accesibilidad con ARIA attributes
- ✅ Agregado manejo de Escape key
- ✅ Prevención de scroll del body

### Loading
- ✅ Mejorado spinner con estilos premium
- ✅ Agregado modo pantalla completa
- ✅ Mejorada animación del spinner
- ✅ Agregado soporte para mensaje personalizado

### ErrorBoundary
- ✅ Mejorados estilos con gradiente
- ✅ Agregado icono de error
- ✅ Mejorados botones de acción
- ✅ Agregado soporte para modo desarrollo
- ✅ Mejorada accesibilidad

## Próximos Pasos

1. Integrar componentes en páginas existentes
2. Crear historias de Storybook para documentación visual
3. Agregar más variantes según necesidades del proyecto
4. Implementar temas personalizables (dark mode, etc.)

## Archivos Creados/Modificados

- ✅ `src/components/Common/Button.jsx` - Mejorado
- ✅ `src/components/Common/Modal.jsx` - Mejorado
- ✅ `src/components/Common/Loading.jsx` - Mejorado
- ✅ `src/components/Common/ErrorBoundary.jsx` - Mejorado
- ✅ `src/components/Common/index.js` - Nuevo
- ✅ `src/components/Common/Button.test.jsx` - Nuevo
- ✅ `src/components/Common/Modal.test.jsx` - Nuevo
- ✅ `src/components/Common/Loading.test.jsx` - Nuevo
- ✅ `src/components/Common/ErrorBoundary.test.jsx` - Nuevo
