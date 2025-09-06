# Árbol 3D Frondoso - Versión Refactorizada

Este proyecto presenta una animación 3D de un árbol frondoso creado con Three.js, ahora refactorizado en una arquitectura modular y mantenible.

## 🏗️ Arquitectura del Proyecto

### Estructura de Archivos

```
02-Viernes-5-Sep/
├── index.html          # Archivo principal HTML
├── main.css            # Estilos CSS
├── arbol.js            # Aplicación principal refactorizada
├── Tree.js             # Clase para crear y gestionar el árbol 3D
├── SceneManager.js     # Gestión de escena, cámara y renderer
├── Lighting.js         # Configuración de iluminación
├── TextureLoader.js    # Carga y gestión de texturas
├── textura/
│   └── t1.png         # Textura del árbol
└── README.md          # Documentación del proyecto
```

## 📦 Componentes Modulares

### 1. TreeApp (arbol.js)
- **Propósito**: Clase principal que orquesta toda la aplicación
- **Responsabilidades**:
  - Inicialización de componentes
  - Coordinación entre módulos
  - API pública para control externo

### 2. Tree (Tree.js)
- **Propósito**: Crea y gestiona el árbol 3D con múltiples capas de esferas
- **Características**:
  - Configuración personalizable de capas y esferas
  - Material con textura o fallback
  - Animación de rotación
  - Gestión de memoria (dispose)

### 3. SceneManager (SceneManager.js)
- **Propósito**: Gestiona la escena Three.js, cámara y renderer
- **Funcionalidades**:
  - Configuración automática de canvas
  - Manejo de redimensionamiento de ventana
  - Loop de animación
  - Gestión de memoria

### 4. Lighting (Lighting.js)
- **Propósito**: Configuración completa del sistema de iluminación
- **Tipos de luz**:
  - Luz direccional desde arriba (con sombras)
  - Luz puntual azul frontal
  - Luz ambiente suave
- **Controles**: Intensidad, color, encendido/apagado

### 5. TextureLoader (TextureLoader.js)
- **Propósito**: Carga segura de texturas con manejo de errores
- **Características**:
  - Callbacks de éxito y error
  - Material por defecto como fallback
  - Configuración personalizable de materiales

## 🚀 Uso

### Inicialización Básica
```javascript
const app = new TreeApp();
```

### Control de Configuración del Árbol
```javascript
// Cambiar configuración del árbol
app.updateTreeConfig({
    layers: 4,
    spheresPerLayer: 16,
    baseRadius: 2.0
});
```

### Control de Iluminación
```javascript
// Cambiar intensidad de luz
app.updateLightIntensity('topLight', 1.5);

// Alternar luz
app.toggleLight('frontLight', false);

// Cambiar color
app.lighting.updateLightColor('frontLight', '#ff0000');
```

### Limpieza de Memoria
```javascript
app.dispose(); // Limpia todos los recursos
```

## 🎨 Características del Árbol

- **3 capas** de esferas con **14 esferas por capa**
- **Radio base** de 1.6 unidades que se reduce hacia arriba
- **Variación aleatoria** en posición y altura para naturalidad
- **Punta** en la parte superior
- **Animación** de rotación continua
- **Material** con textura o fallback a MeshNormalMaterial

## 💡 Ventajas de la Refactorización

1. **Separación de Responsabilidades**: Cada clase tiene una función específica
2. **Mantenibilidad**: Código más fácil de leer y modificar
3. **Reutilización**: Componentes pueden ser reutilizados en otros proyectos
4. **Testabilidad**: Cada módulo puede ser probado independientemente
5. **Extensibilidad**: Fácil agregar nuevas características
6. **Gestión de Memoria**: Métodos dispose() para limpiar recursos
7. **Manejo de Errores**: Fallbacks y manejo robusto de errores

## 🔧 Configuración

### Dependencias
- Three.js 0.160.1
- GSAP 3.13.0 (incluido pero no utilizado actualmente)

### Requisitos del Servidor
Debido a las políticas CORS, es necesario servir los archivos desde un servidor web local:
```bash
python3 -m http.server 8000
# o
npx serve .
```

## 📝 Notas de Desarrollo

- El código mantiene la funcionalidad original pero con mejor estructura
- Se agregaron comentarios JSDoc para mejor documentación
- Se implementó manejo de errores robusto
- Se optimizó la gestión de memoria con métodos dispose()
- Se agregó soporte para redimensionamiento de ventana
