# Documento de Requisitos - Mejoras Premium Moriah

## Introducción

Este documento define los requisitos para mejorar la plataforma web de Moriah Premium Collection, transformándola en una experiencia de e-commerce completa y profesional. Las mejoras incluyen funcionalidades de engagement (WhatsApp, Instagram, newsletter), optimización de conversión (wishlist, cupones, urgencia), experiencia de usuario mejorada (modo oscuro, búsqueda avanzada, galería 360°), y herramientas de marketing (SEO, Analytics, Pixel de Facebook).

## Glosario

- **Sistema_Web**: La aplicación web de Moriah Premium Collection construida con React + Vite + Tailwind CSS
- **Usuario**: Visitante del sitio web que navega y potencialmente compra productos
- **Producto**: Manilla artesanal premium disponible en el catálogo
- **Administrador**: Persona con permisos para gestionar contenido, cupones y configuraciones
- **Wishlist**: Lista de productos favoritos guardados por el usuario
- **Cupón**: Código promocional que otorga descuento en compras
- **Newsletter**: Sistema de suscripción por email para recibir novedades
- **Feed_Instagram**: Flujo de publicaciones recientes de la cuenta de Instagram de Moriah
- **Loader**: Animación de carga mostrada durante transiciones o carga de contenido
- **Modo_Oscuro**: Tema visual alternativo con colores oscuros para reducir fatiga visual
- **Personalizador**: Herramienta interactiva para customizar manillas en tiempo real
- **Gift_Card**: Tarjeta de regalo digital con valor monetario
- **SEO**: Optimización para motores de búsqueda (Search Engine Optimization)
- **Pixel**: Código de seguimiento para plataformas publicitarias
- **Stock**: Cantidad disponible de un producto específico

## Requisitos

### Requisito 1: Botón Flotante de WhatsApp

**User Story:** Como usuario, quiero acceder rápidamente a WhatsApp para contacto directo, para poder hacer consultas inmediatas sin usar el chatbot.

#### Acceptance Criteria

1. THE Sistema_Web SHALL mostrar un botón flotante de WhatsApp en todas las páginas
2. WHEN el usuario hace clic en el botón de WhatsApp, THE Sistema_Web SHALL abrir WhatsApp con un mensaje predefinido
3. THE Sistema_Web SHALL posicionar el botón flotante en la esquina inferior derecha sin obstruir contenido importante
4. WHILE el usuario navega por el sitio, THE Sistema_Web SHALL mantener el botón visible y accesible
5. THE Sistema_Web SHALL usar el número de teléfono configurado para WhatsApp Business de Moriah

### Requisito 2: Integración de Feed de Instagram

**User Story:** Como usuario, quiero ver las últimas publicaciones de Instagram de Moriah en el sitio web, para conocer las novedades y tendencias de la marca.

#### Acceptance Criteria

1. THE Sistema_Web SHALL mostrar las últimas 6 publicaciones del perfil de Instagram de Moriah
2. WHEN el usuario hace clic en una publicación, THE Sistema_Web SHALL abrir la publicación en Instagram
3. THE Sistema_Web SHALL actualizar el feed cada 24 horas automáticamente
4. IF la API de Instagram no responde, THEN THE Sistema_Web SHALL mostrar un mensaje alternativo sin romper la página
5. THE Sistema_Web SHALL mostrar las imágenes del feed con lazy loading para optimizar rendimiento

### Requisito 3: Animación de Carga Personalizada

**User Story:** Como usuario, quiero ver una animación de carga elegante con el logo de Moriah, para tener una experiencia de marca consistente durante las esperas.

#### Acceptance Criteria

1. WHEN el Sistema_Web está cargando contenido, THE Loader SHALL mostrar el logo dorado de Moriah con animación
2. THE Loader SHALL desaparecer automáticamente cuando el contenido esté listo
3. THE Loader SHALL tener una duración mínima de 500ms para evitar parpadeos
4. THE Loader SHALL usar los colores de la marca (dorado #D4AF37) y mantener el estilo premium
5. WHEN la carga excede 3 segundos, THE Sistema_Web SHALL mostrar un mensaje de progreso adicional

### Requisito 4: Galería de Productos Mejorada

**User Story:** Como usuario, quiero explorar productos con zoom, vista 360° y navegación fluida, para examinar los detalles antes de comprar.

#### Acceptance Criteria

1. WHEN el usuario hace clic en una imagen de producto, THE Sistema_Web SHALL mostrar la imagen en tamaño completo con zoom
2. WHERE el producto tiene imágenes 360°, THE Sistema_Web SHALL permitir rotar la vista arrastrando el mouse o tocando la pantalla
3. THE Sistema_Web SHALL proporcionar un slider con miniaturas para navegar entre múltiples imágenes
4. THE Sistema_Web SHALL soportar gestos táctiles (pinch-to-zoom, swipe) en dispositivos móviles
5. WHEN el usuario hace zoom, THE Sistema_Web SHALL mantener la calidad de imagen sin pixelación hasta 2x de ampliación

### Requisito 5: Sección de Materiales Premium

**User Story:** Como usuario, quiero conocer los materiales premium utilizados en las manillas, para entender la calidad y valor del producto.

#### Acceptance Criteria

1. THE Sistema_Web SHALL incluir una página dedicada a explicar los materiales premium
2. THE Sistema_Web SHALL mostrar imágenes de alta calidad de cada material
3. THE Sistema_Web SHALL describir las propiedades, origen y beneficios de cada material
4. THE Sistema_Web SHALL vincular cada material con los productos que lo utilizan
5. THE Sistema_Web SHALL incluir certificaciones o garantías de autenticidad cuando aplique

### Requisito 6: Modo Oscuro

**User Story:** Como usuario, quiero alternar entre modo claro y oscuro, para reducir la fatiga visual según mis preferencias y condiciones de iluminación.

#### Acceptance Criteria

1. THE Sistema_Web SHALL proporcionar un toggle visible para cambiar entre modo claro y oscuro
2. WHEN el usuario activa el modo oscuro, THE Sistema_Web SHALL aplicar el tema oscuro a todas las páginas
3. THE Sistema_Web SHALL guardar la preferencia del usuario en localStorage
4. WHEN el usuario regresa al sitio, THE Sistema_Web SHALL aplicar automáticamente su preferencia guardada
5. THE Modo_Oscuro SHALL mantener la identidad visual de Moriah con dorado sobre fondos oscuros
6. THE Sistema_Web SHALL asegurar contraste suficiente (WCAG AA) en ambos modos

### Requisito 7: Búsqueda de Productos con Filtros Avanzados

**User Story:** Como usuario, quiero buscar productos con filtros avanzados, para encontrar rápidamente las manillas que se ajustan a mis preferencias.

#### Acceptance Criteria

1. THE Sistema_Web SHALL proporcionar una barra de búsqueda visible en todas las páginas
2. WHEN el usuario escribe en la búsqueda, THE Sistema_Web SHALL mostrar resultados en tiempo real
3. THE Sistema_Web SHALL permitir filtrar por material, color, precio, estilo y disponibilidad
4. WHEN el usuario aplica múltiples filtros, THE Sistema_Web SHALL combinarlos con lógica AND
5. THE Sistema_Web SHALL mostrar el número de resultados encontrados
6. THE Sistema_Web SHALL permitir ordenar resultados por relevancia, precio, popularidad y novedad
7. WHEN no hay resultados, THE Sistema_Web SHALL sugerir productos similares o alternativos

### Requisito 8: Sistema de Wishlist/Favoritos

**User Story:** Como usuario, quiero guardar productos en una lista de favoritos, para revisarlos más tarde y facilitar mi decisión de compra.

#### Acceptance Criteria

1. THE Sistema_Web SHALL mostrar un ícono de corazón en cada tarjeta de producto
2. WHEN el usuario hace clic en el ícono de corazón, THE Sistema_Web SHALL agregar el producto a la Wishlist
3. THE Sistema_Web SHALL guardar la Wishlist en localStorage para usuarios no registrados
4. THE Sistema_Web SHALL mostrar un contador de productos en la Wishlist
5. THE Sistema_Web SHALL proporcionar una página dedicada para ver todos los productos guardados
6. WHEN el usuario elimina un producto de la Wishlist, THE Sistema_Web SHALL actualizar la lista inmediatamente
7. THE Sistema_Web SHALL permitir compartir la Wishlist por URL o redes sociales

### Requisito 9: Newsletter y Suscripción con Incentivo

**User Story:** Como usuario, quiero suscribirme al newsletter con un descuento del 10%, para recibir novedades y obtener un beneficio inmediato.

#### Acceptance Criteria

1. THE Sistema_Web SHALL mostrar un formulario de suscripción al newsletter
2. WHEN el usuario ingresa su email y se suscribe, THE Sistema_Web SHALL enviar un cupón del 10% de descuento
3. THE Sistema_Web SHALL validar que el email tenga formato correcto antes de aceptar la suscripción
4. THE Sistema_Web SHALL prevenir suscripciones duplicadas del mismo email
5. THE Sistema_Web SHALL mostrar un mensaje de confirmación con el código de cupón
6. THE Sistema_Web SHALL integrar con un servicio de email marketing (ej: Mailchimp, SendGrid)
7. IF el servicio de email falla, THEN THE Sistema_Web SHALL guardar la suscripción y reintentar el envío

### Requisito 10: Sistema de Cupones de Descuento

**User Story:** Como usuario, quiero aplicar códigos promocionales en mi compra, para obtener descuentos y ofertas especiales.

#### Acceptance Criteria

1. THE Sistema_Web SHALL proporcionar un campo para ingresar códigos de cupón en el checkout
2. WHEN el usuario ingresa un cupón válido, THE Sistema_Web SHALL aplicar el descuento correspondiente
3. THE Sistema_Web SHALL validar la vigencia, límites de uso y condiciones del cupón
4. WHEN un cupón es inválido o expirado, THE Sistema_Web SHALL mostrar un mensaje de error descriptivo
5. THE Sistema_Web SHALL mostrar el descuento aplicado desglosado en el resumen de compra
6. THE Sistema_Web SHALL permitir solo un cupón por transacción
7. WHERE el Administrador crea cupones, THE Sistema_Web SHALL permitir configurar porcentaje, monto fijo, fecha de expiración y límite de usos

### Requisito 11: Blog de Contenido

**User Story:** Como usuario, quiero leer artículos sobre manillas, tendencias y cuidados, para educarme y conectar más con la marca.

#### Acceptance Criteria

1. THE Sistema_Web SHALL incluir una sección de blog accesible desde el menú principal
2. THE Sistema_Web SHALL mostrar artículos con título, imagen destacada, extracto y fecha de publicación
3. WHEN el usuario hace clic en un artículo, THE Sistema_Web SHALL mostrar el contenido completo
4. THE Sistema_Web SHALL permitir filtrar artículos por categorías (tendencias, cuidados, materiales, estilo)
5. THE Sistema_Web SHALL mostrar artículos relacionados al final de cada post
6. THE Sistema_Web SHALL permitir compartir artículos en redes sociales
7. WHERE el Administrador gestiona el blog, THE Sistema_Web SHALL proporcionar un editor de contenido con formato rich text

### Requisito 12: Optimización SEO Básica

**User Story:** Como administrador, quiero que el sitio esté optimizado para motores de búsqueda, para aumentar la visibilidad orgánica y atraer más visitantes.

#### Acceptance Criteria

1. THE Sistema_Web SHALL incluir meta tags (title, description, keywords) en todas las páginas
2. THE Sistema_Web SHALL generar un sitemap.xml actualizado automáticamente
3. THE Sistema_Web SHALL implementar structured data (Schema.org) para productos y organización
4. THE Sistema_Web SHALL usar URLs semánticas y amigables para SEO
5. THE Sistema_Web SHALL incluir atributos alt descriptivos en todas las imágenes
6. THE Sistema_Web SHALL implementar Open Graph tags para compartir en redes sociales
7. THE Sistema_Web SHALL generar un archivo robots.txt apropiado

### Requisito 13: Integración de Google Analytics

**User Story:** Como administrador, quiero rastrear el comportamiento de usuarios con Google Analytics, para tomar decisiones basadas en datos sobre el sitio.

#### Acceptance Criteria

1. THE Sistema_Web SHALL integrar Google Analytics 4 (GA4)
2. THE Sistema_Web SHALL rastrear pageviews, eventos de navegación y tiempo en página
3. THE Sistema_Web SHALL rastrear eventos personalizados (agregar a wishlist, aplicar cupón, iniciar checkout)
4. THE Sistema_Web SHALL rastrear conversiones y valor de transacciones
5. THE Sistema_Web SHALL respetar las preferencias de cookies y privacidad del usuario
6. WHERE el usuario rechaza cookies de análisis, THE Sistema_Web SHALL deshabilitar el tracking de Analytics

### Requisito 14: Pixel de Facebook e Instagram

**User Story:** Como administrador, quiero instalar el Pixel de Facebook/Instagram, para hacer remarketing y medir la efectividad de campañas publicitarias.

#### Acceptance Criteria

1. THE Sistema_Web SHALL integrar el Meta Pixel (Facebook/Instagram)
2. THE Sistema_Web SHALL rastrear eventos estándar (PageView, ViewContent, AddToCart, Purchase)
3. THE Sistema_Web SHALL enviar parámetros de productos (id, nombre, precio, categoría) con los eventos
4. THE Sistema_Web SHALL rastrear conversiones de campañas publicitarias
5. WHERE el usuario rechaza cookies de marketing, THE Sistema_Web SHALL deshabilitar el Pixel
6. THE Sistema_Web SHALL implementar el Conversion API para mejorar la precisión del tracking

### Requisito 15: Indicadores de Urgencia y Escasez

**User Story:** Como usuario, quiero ver indicadores de stock limitado y ofertas temporales, para tomar decisiones de compra informadas y aprovechar oportunidades.

#### Acceptance Criteria

1. WHEN un producto tiene menos de 5 unidades en Stock, THE Sistema_Web SHALL mostrar "Solo quedan X unidades"
2. WHERE hay una oferta temporal, THE Sistema_Web SHALL mostrar un contador regresivo con la fecha de expiración
3. THE Sistema_Web SHALL actualizar los indicadores de Stock en tiempo real
4. THE Sistema_Web SHALL mostrar badges visuales de "Última unidad", "Oferta por tiempo limitado" o "Más vendido"
5. THE Sistema_Web SHALL usar colores de alerta (rojo/naranja) para indicadores de urgencia sin comprometer el diseño premium
6. WHEN el Stock se agota, THE Sistema_Web SHALL mostrar "Agotado" y ofrecer notificación cuando vuelva a estar disponible

### Requisito 16: Personalizador Visual de Manillas

**User Story:** Como usuario, quiero personalizar manillas en tiempo real con opciones visuales, para crear un producto único que se ajuste a mis preferencias.

#### Acceptance Criteria

1. WHERE un producto es personalizable, THE Sistema_Web SHALL mostrar el botón "Personalizar"
2. WHEN el usuario accede al Personalizador, THE Sistema_Web SHALL mostrar una vista 3D o imagen del producto
3. THE Personalizador SHALL permitir seleccionar material, color, tamaño y grabado personalizado
4. WHEN el usuario cambia una opción, THE Personalizador SHALL actualizar la vista visual en tiempo real
5. THE Personalizador SHALL calcular y mostrar el precio actualizado según las opciones seleccionadas
6. THE Personalizador SHALL validar que las combinaciones de opciones sean válidas
7. WHEN el usuario finaliza la personalización, THE Sistema_Web SHALL agregar el producto customizado al carrito con todas las especificaciones

### Requisito 17: Sistema de Tarjetas de Regalo Digitales

**User Story:** Como usuario, quiero comprar gift cards digitales, para regalar productos de Moriah sin elegir un producto específico.

#### Acceptance Criteria

1. THE Sistema_Web SHALL ofrecer Gift_Cards en denominaciones predefinidas (50, 100, 200, 500)
2. WHEN el usuario compra una Gift_Card, THE Sistema_Web SHALL solicitar email del destinatario y mensaje personalizado
3. THE Sistema_Web SHALL generar un código único de Gift_Card
4. THE Sistema_Web SHALL enviar la Gift_Card por email al destinatario con diseño premium de Moriah
5. WHEN un usuario aplica una Gift_Card en checkout, THE Sistema_Web SHALL validar el código y saldo disponible
6. THE Sistema_Web SHALL permitir usar múltiples Gift_Cards en una sola compra
7. THE Sistema_Web SHALL mostrar el saldo restante después de usar una Gift_Card parcialmente
8. THE Gift_Card SHALL tener una vigencia de 12 meses desde la fecha de compra
9. WHERE el Administrador gestiona Gift_Cards, THE Sistema_Web SHALL mostrar reportes de ventas, canjes y saldos pendientes

## Notas de Implementación

- Todas las funcionalidades deben mantener el diseño premium con tema dorado (#D4AF37)
- La experiencia debe ser responsive y funcionar perfectamente en móviles
- Se debe priorizar el rendimiento y la velocidad de carga
- Las integraciones externas (Instagram, Analytics, Pixel) deben manejar errores gracefully
- El sistema debe ser escalable para futuras funcionalidades
- Se debe implementar un sistema de gestión de consentimiento de cookies (GDPR/CCPA compliant)
