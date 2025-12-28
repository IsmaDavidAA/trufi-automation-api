# 📊 Cómo Ver los Reportes de Tests

## 🎯 Reporte HTML Principal

El reporte HTML se genera automáticamente después de ejecutar los tests:

**Ubicación:** `api-automation/reports/test-report.html`

### Cómo Abrirlo:

#### Opción 1: Desde el Explorador de Archivos
1. Navega a la carpeta `api-automation/reports/`
2. Haz doble click en `test-report.html`
3. Se abrirá en tu navegador predeterminado

#### Opción 2: Desde PowerShell/CMD
```powershell
# Desde la raíz del proyecto
Start-Process "api-automation\reports\test-report.html"

# O desde api-automation
cd api-automation
Start-Process "reports\test-report.html"
```

#### Opción 3: Desde el código
```powershell
# Abrir directamente
Invoke-Item "api-automation\reports\test-report.html"
```

## 📈 Qué Verás en el Reporte

El reporte HTML incluye:
- ✅ Resumen general de tests (pasados/fallidos)
- ✅ Lista detallada de cada test
- ✅ Tiempos de ejecución
- ✅ Stack traces de errores (si hay)
- ✅ Estadísticas de cobertura

## 🔄 Generar Nuevo Reporte

Cada vez que ejecutas:
```bash
npm test
```

Se genera un nuevo reporte que sobrescribe el anterior en `reports/test-report.html`

## 📁 Otros Reportes

### Reporte de Cobertura
Si ejecutas:
```bash
npm run test:coverage
```

Los reportes de cobertura estarán en:
- `coverage/index.html` - Reporte HTML de cobertura
- `coverage/lcov-report/index.html` - Reporte detallado LCOV

## 💡 Tip

Puedes agregar un script en `package.json` para abrir el reporte automáticamente:

```json
{
  "scripts": {
    "test:open-report": "Start-Process reports/test-report.html"
  }
}
```

Luego ejecutas:
```bash
npm run test:open-report
```

