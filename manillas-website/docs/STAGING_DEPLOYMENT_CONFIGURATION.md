# Configuración de Despliegue a Staging

## Descripción General

El despliegue a staging está configurado para ejecutarse automáticamente cuando se hace push a la rama `develop`. Este ambiente permite validar cambios antes de desplegarlos a producción.

## Características del Despliegue a Staging

### 1. Trigger Automático
- Se ejecuta solo en la rama `develop`
- Se activa con cada push a esta rama
- Requiere que los tests y el build pasen exitosamente

### 2. Ambiente de Staging
- **Nombre del ambiente:** staging
- **URL:** Se genera automáticamente por Vercel
- **Alias:** staging-manillas.vercel.app (configurable)

### 3. Variables de Entorno

El despliegue a staging utiliza variables de entorno específicas:

```yaml
VITE_API_URL: URL del API de staging (configurable en secrets)
VITE_ENVIRONMENT: staging
VITE_ENABLE_ANALYTICS: false (deshabilitado en staging)
```

### 4. Proceso de Despliegue

```
Push a rama develop
    ↓
Ejecutar tests (Job 1)
    ↓
Construir aplicación (Job 2)
    ↓
Desplegar a Vercel Staging (Job 3)
    ↓
Ejecutar tests de integración (Job 5)
```

## Configuración Requerida

### Secrets de GitHub

Los siguientes secrets deben estar configurados en el repositorio:

1. **VERCEL_TOKEN** (requerido)
   - Token de autenticación de Vercel
   - Obtener en: https://vercel.com/account/tokens

2. **VERCEL_ORG_ID** (requerido)
   - ID de la organización en Vercel
   - Obtener ejecutando `vercel link`

3. **VERCEL_PROJECT_ID** (requerido)
   - ID del proyecto en Vercel
   - Obtener ejecutando `vercel link`

4. **STAGING_API_URL** (opcional)
   - URL del API de staging
   - Por defecto: https://api-staging.example.com

### Cómo Configurar Secrets

1. Ve a tu repositorio en GitHub
2. Settings > Secrets and variables > Actions
3. Click en "New repository secret"
4. Agrega cada secret con su nombre y valor

## Características Implementadas

### 1. Deployment Summary
Después de cada despliegue exitoso, se genera un resumen que incluye:
- URL del despliegue
- Rama y commit
- Próximos pasos

### 2. Notificaciones de Estado
- Comentarios automáticos en Pull Requests con la URL de staging
- Commit status checks que muestran el estado del despliegue
- Resumen visible en la pestaña Actions

### 3. Tests de Integración Automáticos
- Se ejecutan automáticamente después del despliegue
- Validan que la aplicación funciona correctamente en staging
- Reportan el estado como commit status

### 4. Manejo de Errores
- Si el despliegue falla, se notifica el estado
- Los logs están disponibles en GitHub Actions
- El commit status muestra el error

## Uso del Despliegue a Staging

### Desplegar Cambios a Staging

```bash
# 1. Crear una rama feature
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commits
git add .
git commit -m "feat: agregar nueva funcionalidad"

# 3. Hacer merge a develop
git checkout develop
git merge feature/nueva-funcionalidad

# 4. Push a GitHub
git push origin develop

# El pipeline se ejecutará automáticamente
```

### Verificar el Despliegue

1. Ve a la pestaña "Actions" en GitHub
2. Busca el workflow correspondiente a tu commit
3. Revisa el job "Deploy to Staging"
4. La URL de staging estará en el resumen del job

### Validar en Staging

1. Accede a la URL de staging
2. Prueba la funcionalidad implementada
3. Verifica que todo funciona correctamente
4. Si hay problemas, corrige y haz push nuevamente

## Diferencias entre Staging y Producción

| Característica | Staging | Producción |
|---------------|---------|------------|
| Rama | develop | main |
| Analytics | Deshabilitado | Habilitado |
| Tests de Integración | Sí | No |
| URL | staging-manillas.vercel.app | manillas.vercel.app |
| Ambiente | staging | production |

## Troubleshooting

### El despliegue falla

**Problema:** El job "Deploy to Staging" falla

**Soluciones:**
1. Verifica que los secrets estén configurados correctamente
2. Revisa que el token de Vercel sea válido
3. Consulta los logs del job en GitHub Actions
4. Verifica que el build pasó exitosamente

### Los tests de integración fallan

**Problema:** El job "Integration Tests" falla

**Soluciones:**
1. Accede a la URL de staging manualmente
2. Verifica que la aplicación cargue correctamente
3. Revisa los logs de los tests
4. Ejecuta los tests localmente con la URL de staging

### La URL de staging no funciona

**Problema:** La URL generada no es accesible

**Soluciones:**
1. Verifica que el despliegue se completó exitosamente
2. Espera unos minutos (puede tardar en propagarse)
3. Revisa el dashboard de Vercel
4. Verifica que no hay errores en los logs de Vercel

## Mejoras Futuras

### 1. Preview Deployments para PRs
- Desplegar automáticamente cada PR a una URL única
- Permite revisar cambios antes de hacer merge

### 2. Smoke Tests
- Agregar tests básicos que validen funcionalidad crítica
- Ejecutar después del despliegue

### 3. Performance Monitoring
- Agregar Lighthouse CI para medir performance
- Validar métricas en cada despliegue

### 4. Rollback Automático
- Si los tests de integración fallan, hacer rollback
- Notificar al equipo del problema

### 5. Notificaciones Slack
- Enviar notificaciones a Slack cuando se despliega
- Incluir URL y estado del despliegue

## Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [GitHub Actions - Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments)
- [Vercel Action](https://github.com/amondnet/vercel-action)

## Soporte

Si encuentras problemas:
1. Revisa esta documentación
2. Consulta los logs en GitHub Actions
3. Revisa el dashboard de Vercel
4. Contacta al equipo de desarrollo
