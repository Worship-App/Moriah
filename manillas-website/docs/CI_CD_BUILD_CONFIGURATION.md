# Configuración de Build Automático - CI/CD

## Descripción General

El pipeline de CI/CD está configurado para ejecutar un build automático de la aplicación después de que todos los tests pasen exitosamente. Esta configuración garantiza que solo el código validado sea construido y desplegado.

## Flujo de Build Automático

```
Push a GitHub (main/develop)
    ↓
GitHub Actions ejecuta tests (Job 1: test)
    ↓
Si tests pasan ✅
    ↓
Ejecuta build automático (Job 2: build)
    ↓
Analiza tamaño del build
    ↓
Verifica salida del build
    ↓
Sube artefactos para despliegue
```

## Configuración del Job de Build

### Ubicación
`.github/workflows/deploy.yml` - Job: `build`

### Características Principales

1. **Dependencia de Tests**
   - El build solo se ejecuta si el job de tests (`test`) completa exitosamente
   - Configurado con: `needs: test`

2. **Instalación de Dependencias**
   - Usa `npm ci` para instalación limpia y reproducible
   - Aprovecha caché de npm para velocidad

3. **Ejecución del Build**
   - Comando: `npm run build`
   - Usa Vite para compilar la aplicación
   - Genera archivos optimizados en `dist/`

4. **Análisis de Tamaño**
   - Muestra el tamaño total del build
   - Lista los 20 archivos más grandes
   - Ayuda a identificar problemas de tamaño

5. **Verificación de Build**
   - Valida que `index.html` existe en la salida
   - Falla el job si el build está incompleto

6. **Artefactos**
   - Sube el directorio `dist/` como artefacto
   - Disponible para jobs de despliegue
   - Retención: 7 días

## Comandos de Build

### Build Local
```bash
cd manillas-website
npm run build
```

### Preview del Build
```bash
npm run preview
```

## Salida del Build

El build genera los siguientes archivos en `dist/`:

- `index.html` - Página principal
- `assets/*.css` - Estilos compilados y minificados
- `assets/*.js` - JavaScript compilado, minificado y con code splitting

### Tamaños Esperados

- **CSS**: ~74 KB (~11 KB gzipped)
- **JavaScript**: ~900 KB total (~280 KB gzipped)
- **Total**: ~1 MB (~300 KB gzipped)

## Optimizaciones Aplicadas

1. **Minificación**: Todo el código está minificado
2. **Tree Shaking**: Código no usado es eliminado
3. **Code Splitting**: JavaScript dividido en chunks
4. **Compresión**: Archivos optimizados para gzip

## Troubleshooting

### Build Falla en CI

1. Verificar que tests pasen localmente
2. Revisar logs del job de build en GitHub Actions
3. Ejecutar `npm run build` localmente para reproducir

### Build Exitoso pero Artefactos Faltantes

1. Verificar que `dist/` se genera correctamente
2. Revisar configuración de `upload-artifact`
3. Confirmar que `working-directory` es correcto

### Build Muy Grande

1. Revisar análisis de tamaño en logs de CI
2. Identificar archivos grandes innecesarios
3. Considerar lazy loading para componentes grandes
4. Optimizar imágenes y assets

## Variables de Entorno

El build usa las siguientes variables:

- `CI=true` - Indica entorno de CI
- `NODE_VERSION=18` - Versión de Node.js

## Próximos Pasos

Después del build automático:

1. **Staging**: Deploy automático a staging (branch develop)
2. **Production**: Deploy automático a producción (branch main)
3. **Integration Tests**: Tests de integración en staging

## Referencias

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)
- [Workflow File](.github/workflows/deploy.yml)
