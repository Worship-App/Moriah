# Manillas Website

Página web premium para un emprendimiento de manillas artesanales.

## Stack Tecnológico

- **React 18+** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Vitest** - Testing framework

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

## Build

```bash
npm run build
```

## Testing

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run only property-based tests
npm test -- --grep "Property-Based Tests"

# Run specific test file
npm test src/services/productService.pbt.test.js
```

### Testing Strategy

This project uses a comprehensive testing approach:

- **Unit Tests** - Test individual components and functions (`.test.js` files)
- **Property-Based Tests** - Test universal properties with fast-check (`.pbt.test.js` files)
- **Integration Tests** - Test component interactions

**Documentation:**
- [Property-Based Testing Guide](./docs/PROPERTY_BASED_TESTING.md) - Complete guide
- [Quick Start PBT](./docs/QUICK_START_PBT.md) - Quick reference
- [Test Configuration](./src/test/README.md) - Setup details

## Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Layout/         # Componentes de layout
│   ├── Product/        # Componentes de productos
│   ├── Forms/          # Componentes de formularios
│   └── Common/         # Componentes comunes
├── pages/              # Páginas de la aplicación
├── services/           # Servicios API
├── store/              # Zustand stores
├── hooks/              # Custom hooks
├── utils/              # Utilidades
├── styles/             # Estilos globales
└── test/               # Configuración de tests
```

## Variables de Entorno

Copia `.env.example` a `.env` y configura las variables:

```env
VITE_API_URL=http://localhost:3000/api
VITE_BUSINESS_EMAIL=contacto@manillas.com
VITE_BUSINESS_WHATSAPP=+57XXXXXXXXXX
```

## Características

- ✅ Catálogo de 4 productos
- ✅ Búsqueda y filtrado de productos
- ✅ Vista detallada de productos
- ✅ Formulario de contacto
- ✅ Múltiples canales de contacto (WhatsApp, Email)
- ✅ Diseño responsivo
- ✅ Estética premium
- ✅ Optimización de rendimiento

## Licencia

Todos los derechos reservados © 2024 Manillas Premium
