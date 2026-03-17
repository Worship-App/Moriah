# Guía de Uso - Componentes Comunes

## Importación

```jsx
// Importar todos los componentes
import { Button, Modal, Loading, ErrorBoundary } from '@/components/Common'

// O importar individualmente
import Button from '@/components/Common/Button'
import Modal from '@/components/Common/Modal'
import Loading from '@/components/Common/Loading'
import ErrorBoundary from '@/components/Common/ErrorBoundary'
```

## Button Component

### Variantes

```jsx
// Primary (Negro con hover dorado) - CTA principal
<Button variant="primary">Comprar ahora</Button>

// Secondary (Dorado con hover más oscuro)
<Button variant="secondary">Agregar al carrito</Button>

// Outline (Borde negro, fondo transparente)
<Button variant="outline">Cancelar</Button>

// Ghost (Transparente con hover sutil)
<Button variant="ghost">Más información</Button>
```

### Tamaños

```jsx
<Button size="sm">Pequeño</Button>
<Button size="md">Mediano (default)</Button>
<Button size="lg">Grande</Button>
```

### Estados

```jsx
// Deshabilitado
<Button disabled>No disponible</Button>

// Con tipo de botón
<Button type="submit">Enviar formulario</Button>
<Button type="reset">Limpiar</Button>

// Con clase personalizada
<Button className="w-full">Ancho completo</Button>
```

### Ejemplos Completos

```jsx
// CTA principal
<Button 
  variant="primary" 
  size="lg"
  onClick={() => navigate('/catalog')}
>
  Ver catálogo
</Button>

// Botón de acción secundaria
<Button 
  variant="secondary" 
  size="md"
  onClick={handleAddToCart}
>
  Agregar al carrito
</Button>

// Botón de cancelación
<Button 
  variant="outline" 
  size="md"
  onClick={() => setIsOpen(false)}
>
  Cancelar
</Button>

// Botón deshabilitado
<Button 
  variant="primary" 
  disabled={!isFormValid}
  type="submit"
>
  Enviar
</Button>
```

## Modal Component

### Uso Básico

```jsx
import { useState } from 'react'
import { Modal, Button } from '@/components/Common'

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Abrir modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmar acción"
      >
        <p>¿Estás seguro de que deseas continuar?</p>
      </Modal>
    </>
  )
}
```

### Con Acciones

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmar eliminación"
  actions={
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(false)}
      >
        Cancelar
      </Button>
      <Button 
        variant="primary" 
        onClick={handleDelete}
      >
        Eliminar
      </Button>
    </>
  }
>
  <p>Esta acción no se puede deshacer.</p>
</Modal>
```

### Diferentes Tamaños

```jsx
<Modal size="sm" isOpen={isOpen} onClose={onClose} title="Pequeño">
  Contenido
</Modal>

<Modal size="md" isOpen={isOpen} onClose={onClose} title="Mediano">
  Contenido
</Modal>

<Modal size="lg" isOpen={isOpen} onClose={onClose} title="Grande">
  Contenido
</Modal>

<Modal size="xl" isOpen={isOpen} onClose={onClose} title="Extra grande">
  Contenido
</Modal>
```

## Loading Component

### Uso Básico

```jsx
import { Loading } from '@/components/Common'

// Mensaje por defecto
<Loading />

// Mensaje personalizado
<Loading message="Cargando productos..." />
```

### Modo Pantalla Completa

```jsx
// Mostrar durante carga de datos
{isLoading ? (
  <Loading fullScreen={true} message="Por favor espera..." />
) : (
  <div>Contenido cargado</div>
)}
```

### En Componentes

```jsx
import { useState, useEffect } from 'react'
import { Loading } from '@/components/Common'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <Loading message="Cargando productos..." />
  }

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

## ErrorBoundary Component

### Envolver la Aplicación

```jsx
// En App.jsx
import { ErrorBoundary } from '@/components/Common'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        {/* Rutas y componentes */}
      </Router>
    </ErrorBoundary>
  )
}
```

### Envolver Secciones Específicas

```jsx
import { ErrorBoundary } from '@/components/Common'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <ErrorBoundary>
        <ProductList />
      </ErrorBoundary>

      <ErrorBoundary>
        <UserProfile />
      </ErrorBoundary>
    </div>
  )
}
```

### Manejo de Errores

El ErrorBoundary captura automáticamente:
- Errores en render
- Errores en lifecycle methods
- Errores en constructores

No captura:
- Event handlers (usar try-catch)
- Código asincrónico (usar try-catch)
- Server-side rendering

## Combinaciones Comunes

### Formulario con Validación

```jsx
import { useState } from 'react'
import { Button, Modal } from '@/components/Common'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await submitForm()
      setShowConfirm(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <Button 
          type="submit" 
          disabled={isSubmitting}
          variant="primary"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>

      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Éxito"
      >
        <p>Tu mensaje ha sido enviado correctamente.</p>
      </Modal>
    </>
  )
}
```

### Galería con Modal

```jsx
import { useState } from 'react'
import { Modal, Button } from '@/components/Common'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <img
            key={image.id}
            src={image.url}
            onClick={() => setSelectedImage(image)}
            className="cursor-pointer"
          />
        ))}
      </div>

      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title}
        size="lg"
      >
        <img src={selectedImage?.url} className="w-full" />
      </Modal>
    </>
  )
}
```

### Confirmación de Acción

```jsx
import { useState } from 'react'
import { Modal, Button } from '@/components/Common'

export default function DeleteButton({ onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <Button 
        variant="outline"
        onClick={() => setShowConfirm(true)}
      >
        Eliminar
      </Button>

      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirmar eliminación"
        actions={
          <>
            <Button 
              variant="outline"
              onClick={() => setShowConfirm(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="primary"
              onClick={() => {
                onDelete()
                setShowConfirm(false)
              }}
            >
              Eliminar
            </Button>
          </>
        }
      >
        <p>Esta acción no se puede deshacer.</p>
      </Modal>
    </>
  )
}
```

## Accesibilidad

Todos los componentes incluyen características de accesibilidad:

### Button
- Focus rings visibles
- Keyboard navigation (Enter, Space)
- Proper button semantics
- Disabled state management

### Modal
- ARIA attributes
- Escape key support
- Focus management
- Backdrop click handling

### Loading
- Semantic HTML
- Proper text contrast
- Clear messaging

### ErrorBoundary
- Error messages
- Action buttons with clear labels
- Proper error logging

## Personalización

### Estilos Personalizados

```jsx
// Agregar clases personalizadas
<Button className="w-full md:w-auto">
  Personalizado
</Button>

// Combinar variantes
<Button 
  variant="primary" 
  size="lg"
  className="rounded-full"
>
  Botón redondeado
</Button>
```

### Temas

Los componentes utilizan variables de Tailwind CSS que pueden ser personalizadas en `tailwind.config.js`:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: { /* colores */ },
      secondary: { /* colores */ },
      accent: { /* colores */ },
    }
  }
}
```

## Mejores Prácticas

1. **Button**: Usa `variant="primary"` para CTAs principales
2. **Modal**: Siempre proporciona un `onClose` handler
3. **Loading**: Usa `fullScreen` solo para operaciones críticas
4. **ErrorBoundary**: Envuelve secciones independientes para mejor aislamiento

## Troubleshooting

### Modal no se cierra con Escape
- Verifica que `isOpen` está correctamente vinculado
- Asegúrate de que `onClose` actualiza el estado

### Button no responde a clicks
- Verifica que no está `disabled`
- Asegúrate de que `onClick` está correctamente definido

### Loading no desaparece
- Verifica que `isLoading` se actualiza correctamente
- Asegúrate de que la promesa se resuelve

### ErrorBoundary no captura errores
- Solo captura errores en render, no en event handlers
- Usa try-catch para errores asincrónico
