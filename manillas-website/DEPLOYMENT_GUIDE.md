# Guía de Despliegue - CI/CD Pipeline

## Descripción General

Este proyecto utiliza GitHub Actions para automatizar el proceso de CI/CD (Integración Continua y Despliegue Continuo). El pipeline está configurado para ejecutar tests, construir la aplicación y desplegarla automáticamente a Vercel.

## Flujo del Pipeline

```
Push a GitHub
    ↓
Ejecutar Tests y Linting
    ↓
Construir Aplicación
    ↓
Desplegar a Staging (rama develop) o Producción (rama main)
    ↓
Ejecutar Tests de Integración (solo staging)
```

## Jobs del Pipeline

### 1. Test & Lint
- Ejecuta el linter (ESLint)
- Ejecuta todos los tests unitarios y property-based tests
- Sube reporte de cobertura como artefacto

### 2. Build
- Construye la aplicación con Vite
- Genera los archivos estáticos en `/dist`
- Sube el build como artefacto

### 3. Deploy to Staging
- Se ejecuta solo en la rama `develop`
- Despliega a un ambiente de staging en Vercel
- Configura variables de entorno específicas para staging
- Genera un resumen del despliegue con URL y detalles
- Comenta en PRs con la URL de staging
- Crea notificaciones de estado del despliegue

### 4. Deploy to Production
- Se ejecuta solo en la rama `main`
- Despliega a producción en Vercel
- Crea notificación de despliegue exitoso

### 5. Integration Tests
- Se ejecuta después del despliegue a staging
- Valida que la aplicación funciona correctamente en el ambiente de staging

## Configuración Requerida

### Secrets de GitHub

Para que el pipeline funcione, necesitas configurar los siguientes secrets en tu repositorio de GitHub:

1. **VERCEL_TOKEN**: Token de autenticación de Vercel
   - Ve a: https://vercel.com/account/tokens
   - Crea un nuevo token
   - Copia el token y agrégalo como secret en GitHub

2. **VERCEL_ORG_ID**: ID de tu organización en Vercel
   - Ejecuta `vercel link` en tu proyecto local
   - El ID se guardará en `.vercel/project.json`
   - Copia el valor de `orgId`

3. **VERCEL_PROJECT_ID**: ID del proyecto en Vercel
   - Ejecuta `vercel link` en tu proyecto local
   - El ID se guardará en `.vercel/project.json`
   - Copia el valor de `projectId`

4. **STAGING_API_URL** (opcional): URL del API de staging
   - Si tu aplicación necesita conectarse a un API diferente en staging
   - Por defecto: https://api-staging.example.com

### Cómo agregar secrets en GitHub:

1. Ve a tu repositorio en GitHub
2. Click en "Settings" > "Secrets and variables" > "Actions"
3. Click en "New repository secret"
4. Agrega cada secret con su nombre y valor correspondiente

### Variables de Entorno (Opcional)

Si tu aplicación necesita variables de entorno adicionales, agrégalas en:
- Vercel Dashboard > Project Settings > Environment Variables
- O en el archivo `.env.example` del proyecto

## Estrategia de Branching

### Rama `develop`
- Para desarrollo y testing
- Los commits se despliegan automáticamente a staging
- Permite validar cambios antes de producción

### Rama `main`
- Para código estable y listo para producción
- Los commits se despliegan automáticamente a producción
- Solo hacer merge desde `develop` después de validar en staging

### Pull Requests
- El pipeline ejecuta tests y build en todos los PRs
- Ayuda a detectar problemas antes de hacer merge

## Uso del Pipeline

### Desplegar a Staging

```bash
# Hacer cambios en una rama feature
git checkout -b feature/nueva-funcionalidad

# Hacer commits
git add .
git commit -m "feat: agregar nueva funcionalidad"

# Hacer merge a develop
git checkout develop
git merge feature/nueva-funcionalidad
git push origin develop

# El pipeline automáticamente:
# 1. Ejecuta tests
# 2. Construye la aplicación
# 3. Despliega a staging
# 4. Ejecuta tests de integración
```

### Desplegar a Producción

```bash
# Después de validar en staging
git checkout main
git merge develop
git push origin main

# El pipeline automáticamente:
# 1. Ejecuta tests
# 2. Construye la aplicación
# 3. Despliega a producción
```

## Monitoreo del Pipeline

### Ver el estado del pipeline:
1. Ve a la pestaña "Actions" en tu repositorio de GitHub
2. Verás todos los workflows ejecutándose o completados
3. Click en cualquier workflow para ver detalles

### Notificaciones:
- GitHub enviará notificaciones por email si un workflow falla
- Los commits en GitHub mostrarán checks verdes/rojos

## Troubleshooting

### El pipeline falla en "Test & Lint"
- Revisa los errores de tests o linting
- Ejecuta `npm run test` y `npm run lint` localmente
- Corrige los errores y haz push nuevamente

### El pipeline falla en "Build"
- Revisa los errores de compilación
- Ejecuta `npm run build` localmente
- Verifica que todas las dependencias estén instaladas

### El pipeline falla en "Deploy"
- Verifica que los secrets estén configurados correctamente
- Verifica que el token de Vercel sea válido
- Revisa los logs del job de deploy en GitHub Actions

### El despliegue es exitoso pero la app no funciona
- Verifica las variables de entorno en Vercel
- Revisa los logs de la aplicación en Vercel Dashboard
- Ejecuta los tests de integración manualmente

## Optimizaciones Futuras

### Performance Testing
- Agregar Lighthouse CI para medir performance
- Validar que LCP < 2.5s, FCP < 1.5s, CLS < 0.1

### Security Scanning
- Agregar análisis de dependencias vulnerables
- Implementar SAST (Static Application Security Testing)

### Notificaciones
- Integrar con Slack para notificaciones de despliegue
- Configurar alertas de Sentry para errores en producción

### Rollback Automático
- Implementar rollback automático si los tests de integración fallan
- Mantener versiones anteriores disponibles

## Recursos Adicionales

- [Documentación de GitHub Actions](https://docs.github.com/en/actions)
- [Documentación de Vercel](https://vercel.com/docs)
- [Guía de CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)

## Soporte

Si encuentras problemas con el pipeline:
1. Revisa los logs en GitHub Actions
2. Consulta esta guía de troubleshooting
3. Revisa la documentación de Vercel y GitHub Actions
4. Contacta al equipo de desarrollo
