# Tarea 7.1.4: Configuración de Despliegue a Staging

## Resumen

Se ha configurado exitosamente el despliegue automático a staging en el pipeline de CI/CD de GitHub Actions. El despliegue se ejecuta automáticamente cuando se hace push a la rama `develop` y despliega la aplicación a un ambiente de staging en Vercel.

## Cambios Implementados

### 1. Mejoras en el Job de Staging Deployment

**Archivo:** `.github/workflows/deploy.yml`

#### Configuración de Variables de Entorno
Se agregaron variables de entorno específicas para el ambiente de staging:

```yaml
env:
  VITE_API_URL: ${{ secrets.STAGING_API_URL || 'https://api-staging.example.com' }}
  VITE_ENVIRONMENT: staging
  VITE_ENABLE_ANALYTICS: false
```

#### Alias de Dominio
Se configuró un alias personalizado para staging:

```yaml
alias-domains: staging-manillas.vercel.app
```

#### Deployment Summary
Se agregó un paso que genera un resumen del despliegue:

```yaml
- name: Create deployment summary
  run: |
    echo "## 🚀 Staging Deployment Successful" >> $GITHUB_STEP_SUMMARY
    echo "**Environment:** Staging" >> $GITHUB_STEP_SUMMARY
    echo "**URL:** ${{ steps.deploy.outputs.preview-url }}" >> $GITHUB_STEP_SUMMARY
    echo "**Branch:** ${{ github.ref_name }}" >> $GITHUB_STEP_SUMMARY
    echo "**Commit:** ${{ github.sha }}" >> $GITHUB_STEP_SUMMARY
```

#### Notificaciones de Estado
Se agregó notificación de estado del despliegue:

```yaml
- name: Notify deployment status
  if: always()
  uses: actions/github-script@v7
  with:
    script: |
      const status = '${{ job.status }}' === 'success' ? 'success' : 'failure';
      github.rest.repos.createCommitStatus({
        owner: context.repo.owner,
        repo: context.repo.repo,
        sha: context.sha,
        state: status,
        target_url: '${{ steps.deploy.outputs.preview-url }}',
        description: 'Staging deployment ' + status,
        context: 'deployment/staging'
      })
```

### 2. Mejoras en Integration Tests

Se actualizó el job de tests de integración para:
- Usar la URL correcta del despliegue de staging
- Configurar variables de entorno apropiadas
- Generar un resumen de los resultados de tests


### 3. Documentación Creada

#### STAGING_DEPLOYMENT_CONFIGURATION.md
Documento completo que explica:
- Características del despliegue a staging
- Variables de entorno configuradas
- Proceso de despliegue paso a paso
- Configuración de secrets requeridos
- Guía de uso y troubleshooting
- Diferencias entre staging y producción

#### Actualización de DEPLOYMENT_GUIDE.md
Se actualizó la guía de despliegue para incluir:
- Descripción mejorada del job de staging
- Nuevo secret opcional STAGING_API_URL
- Referencias a la nueva documentación

## Características Implementadas

### ✅ Despliegue Automático
- Se ejecuta automáticamente en push a rama `develop`
- Requiere que tests y build pasen exitosamente
- Despliega a Vercel con configuración de staging

### ✅ Variables de Entorno
- `VITE_API_URL`: URL del API (configurable)
- `VITE_ENVIRONMENT`: Identificador del ambiente (staging)
- `VITE_ENABLE_ANALYTICS`: Analytics deshabilitado en staging

### ✅ Notificaciones y Resúmenes
- Resumen del despliegue en GitHub Actions
- Comentarios automáticos en Pull Requests
- Commit status checks para seguimiento

### ✅ Tests de Integración
- Se ejecutan automáticamente después del despliegue
- Validan que la aplicación funciona en staging
- Reportan resultados como commit status

### ✅ Manejo de Errores
- Notificaciones de estado siempre se ejecutan
- Logs detallados disponibles en GitHub Actions
- Commit status muestra éxito o fallo

## Flujo de Despliegue a Staging

```
1. Developer hace push a rama develop
   ↓
2. GitHub Actions ejecuta tests y linting
   ↓
3. Si tests pasan, construye la aplicación
   ↓
4. Si build es exitoso, despliega a Vercel Staging
   ↓
5. Genera resumen con URL de staging
   ↓
6. Ejecuta tests de integración en staging
   ↓
7. Reporta estado final del despliegue
```

## Configuración Requerida

### Secrets de GitHub (Requeridos)
1. `VERCEL_TOKEN` - Token de autenticación de Vercel
2. `VERCEL_ORG_ID` - ID de la organización en Vercel
3. `VERCEL_PROJECT_ID` - ID del proyecto en Vercel

### Secrets Opcionales
4. `STAGING_API_URL` - URL del API de staging (opcional)

### Cómo Configurar
1. Ve a Settings > Secrets and variables > Actions
2. Click en "New repository secret"
3. Agrega cada secret con su valor correspondiente

## Uso

### Desplegar a Staging

```bash
# Hacer cambios en una rama feature
git checkout -b feature/nueva-funcionalidad
git add .
git commit -m "feat: nueva funcionalidad"

# Merge a develop
git checkout develop
git merge feature/nueva-funcionalidad

# Push para activar el despliegue
git push origin develop
```

### Verificar el Despliegue

1. Ve a la pestaña "Actions" en GitHub
2. Busca el workflow de tu commit
3. Revisa el job "Deploy to Staging"
4. La URL estará en el resumen del job

## Validación

### ✅ Criterios Cumplidos

1. **Despliegue automático configurado**
   - Se ejecuta en push a rama `develop`
   - Despliega a Vercel staging

2. **Variables de entorno configuradas**
   - VITE_API_URL (configurable)
   - VITE_ENVIRONMENT (staging)
   - VITE_ENABLE_ANALYTICS (false)

3. **Se ejecuta después de tests**
   - Requiere que job "test" pase
   - Requiere que job "build" pase

4. **Ambiente de staging configurado**
   - Usa GitHub Environments
   - URL del despliegue disponible
   - Alias personalizado configurado

## Próximos Pasos

### Configuración Inicial
1. Configurar los secrets en GitHub
2. Ejecutar `vercel link` para obtener IDs
3. Hacer push a develop para probar el despliegue

### Mejoras Futuras (Opcionales)
1. Preview deployments para cada PR
2. Smoke tests específicos para staging
3. Performance monitoring con Lighthouse CI
4. Rollback automático si tests fallan
5. Notificaciones a Slack

## Referencias

- **Documentación detallada:** `docs/STAGING_DEPLOYMENT_CONFIGURATION.md`
- **Guía de despliegue:** `DEPLOYMENT_GUIDE.md`
- **Workflow file:** `.github/workflows/deploy.yml`

## Notas Técnicas

### Diferencias con Producción
- Staging usa preview deployments de Vercel
- Producción usa deployment con flag `--prod`
- Analytics deshabilitado en staging
- Tests de integración solo en staging

### Seguridad
- Secrets nunca se exponen en logs
- Variables de entorno inyectadas en build time
- Tokens de Vercel con permisos mínimos necesarios

## Conclusión

La configuración de despliegue a staging está completa y lista para usar. El pipeline desplegará automáticamente a staging cuando se haga push a la rama `develop`, ejecutará tests de integración, y proporcionará notificaciones del estado del despliegue.
