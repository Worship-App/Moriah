# Guía Rápida: Despliegue a Staging

## ¿Qué es Staging?

Staging es un ambiente de prueba que replica producción. Te permite validar cambios antes de desplegarlos a los usuarios finales.

## Configuración Inicial (Solo una vez)

### 1. Obtener IDs de Vercel

```bash
cd manillas-website
npx vercel link
```

Esto creará `.vercel/project.json` con:
- `orgId` → Copia este valor
- `projectId` → Copia este valor

### 2. Obtener Token de Vercel

1. Ve a https://vercel.com/account/tokens
2. Click en "Create Token"
3. Dale un nombre (ej: "GitHub Actions")
4. Copia el token generado

### 3. Configurar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Agrega estos secrets:

| Secret Name | Valor | Descripción |
|------------|-------|-------------|
| `VERCEL_TOKEN` | Token de paso 2 | Token de autenticación |
| `VERCEL_ORG_ID` | orgId de paso 1 | ID de organización |
| `VERCEL_PROJECT_ID` | projectId de paso 1 | ID del proyecto |
| `STAGING_API_URL` | (opcional) | URL del API de staging |

## Uso Diario

### Desplegar a Staging

```bash
# 1. Crea tu rama feature
git checkout -b feature/mi-funcionalidad

# 2. Haz tus cambios
# ... edita archivos ...

# 3. Commit
git add .
git commit -m "feat: mi nueva funcionalidad"

# 4. Merge a develop
git checkout develop
git pull origin develop
git merge feature/mi-funcionalidad

# 5. Push (esto activa el despliegue)
git push origin develop
```

### Ver el Despliegue

1. Ve a GitHub > Actions
2. Busca tu workflow
3. Click en "Deploy to Staging"
4. La URL estará en el resumen

### Validar en Staging

1. Abre la URL de staging
2. Prueba tu funcionalidad
3. Verifica que todo funciona
4. Si hay problemas, corrige y repite

### Desplegar a Producción

```bash
# Solo después de validar en staging
git checkout main
git pull origin main
git merge develop
git push origin main
```

## Flujo Visual

```
feature/mi-funcionalidad
    ↓ (merge)
develop
    ↓ (push)
GitHub Actions
    ↓
Tests + Build
    ↓
Deploy to Staging ✅
    ↓
Integration Tests
    ↓
(validar manualmente)
    ↓ (merge)
main
    ↓ (push)
Deploy to Production 🚀
```

## Troubleshooting Rápido

### "Secrets not configured"
→ Verifica que agregaste los 3 secrets requeridos en GitHub

### "Build failed"
→ Ejecuta `npm run build` localmente para ver el error

### "Tests failed"
→ Ejecuta `npm run test` localmente para ver qué falló

### "Deployment failed"
→ Revisa los logs en GitHub Actions > Deploy to Staging

## Variables de Entorno en Staging

Staging usa estas variables automáticamente:

```
VITE_ENVIRONMENT=staging
VITE_ENABLE_ANALYTICS=false
VITE_API_URL=<tu-api-staging>
```

## Comandos Útiles

```bash
# Ver estado de Git
git status

# Ver ramas
git branch -a

# Actualizar develop
git checkout develop && git pull origin develop

# Ver logs del último commit
git log -1

# Ver diferencias antes de commit
git diff
```

## Recursos

- **Documentación completa:** `docs/STAGING_DEPLOYMENT_CONFIGURATION.md`
- **Guía de despliegue:** `DEPLOYMENT_GUIDE.md`
- **Workflow:** `.github/workflows/deploy.yml`

## Preguntas Frecuentes

**¿Cuánto tarda el despliegue?**
→ Aproximadamente 3-5 minutos

**¿Puedo desplegar sin hacer merge a develop?**
→ No, solo push a develop activa staging

**¿Qué pasa si los tests fallan?**
→ El despliegue no se ejecuta

**¿Puedo ver logs de la aplicación en staging?**
→ Sí, en el dashboard de Vercel

**¿Staging afecta a producción?**
→ No, son ambientes completamente separados
