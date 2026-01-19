# 📦 Estructura Completa del Proyecto

## Árbol de Directorios

```
app-revelacion/
├── .github/
│   └── copilot-instructions.md          (Instrucciones del proyecto)
│
├── .gitignore
├── eslint.config.js
├── index.html                           (HTML principal)
├── package.json                         (Dependencias)
├── package-lock.json
├── vite.config.js                       (Configuración Vite)
│
├── public/                              (Assets estáticos)
├── dist/                                (Compilado para producción)
│
├── README.md                            (Documentación principal)
├── EVENTOS_Y_FLUJO.md                   (Este archivo)
│
└── src/
    ├── main.jsx                         (Punto de entrada)
    ├── App.jsx                          (Componente raíz)
    ├── App.css                          (Estilos globales)
    ├── index.css                        (Estilos base)
    │
    ├── UI/                              ⭐ CAPA DE PRESENTACIÓN
    │   ├── components/                  (Componentes reutilizables)
    │   │   ├── EventForm.jsx            (Formulario configuración)
    │   │   ├── EventForm.css
    │   │   ├── SurpriseBox.jsx          (Caja sorpresa)
    │   │   ├── SurpriseBox.css
    │   │   ├── MouseSensor.jsx          (Sensor emociones)
    │   │   ├── MouseSensor.css
    │   │   ├── Confetti.jsx             (Confeti)
    │   │   ├── Confetti.css
    │   │   ├── ResetButton.jsx          (Botón reinicio)
    │   │   └── ResetButton.css
    │   │
    │   └── pages/                       (Páginas principales)
    │       ├── WelcomePage.jsx          (Bienvenida)
    │       └── WelcomePage.css
    │
    ├── Services/                        ⭐ CAPA DE LÓGICA
    │   ├── validationService.js         (Validaciones)
    │   ├── classesService.js            (Clases dinámicas)
    │   ├── colorService.js              (Colores y gradientes)
    │   └── confettiService.js           (Generación confeti)
    │
    └── assets/                          (Imágenes/recursos)
```

## Archivos y Responsabilidades

### 🎯 CAPA UI (Presentación)

#### Componentes

**EventForm.jsx / EventForm.css**
- ✅ Formulario de configuración del evento
- ✅ Input para nombre del bebé (onChange)
- ✅ Select para género (onChange)
- ✅ Botón guardar (onSubmit)
- ✅ Validación con mensajes de error
- 🎨 Estilos: degradado, animación slideInUp

**SurpriseBox.jsx / SurpriseBox.css**
- ✅ Caja sorpresa interactiva
- ✅ Manejo onMouseEnter/onMouseLeave
- ✅ Botón revelar (onClick)
- ✅ Visualización de resultado
- ✅ Alert con resultado del género
- 🎨 Estilos: bounce, scaleIn, shadow dinámico

**MouseSensor.jsx / MouseSensor.css**
- ✅ Captura onMouseMove (X/Y)
- ✅ Muestra coordenadas en tiempo real
- ✅ Badge dinámico según posición (Verde/Amarillo/Rojo)
- ✅ Uso de getEmotionBadge() del servicio
- 🎨 Estilos: pulse en coordenadas, transiciones suaves

**Confetti.jsx / Confetti.css**
- ✅ Renderiza partículas de confeti
- ✅ Animación de caída (keyframes confetti-fall)
- ✅ Colores dinámicos según género
- 🎨 Estilos: rotación y movimiento

**ResetButton.jsx / ResetButton.css**
- ✅ Botón para reiniciar evento
- ✅ Click handler (onClick)
- ✅ Estados hover
- 🎨 Estilos: pulse, transformaciones

#### Páginas

**WelcomePage.jsx / WelcomePage.css**
- ✅ Página de bienvenida
- ✅ Emojis animados (float, pulse)
- ✅ Descripción del evento
- ✅ Botón "Comenzar la Aventura"
- ✅ Transición fade-out
- 🎨 Estilos: degradado, animaciones, responsive

---

### 🧠 CAPA SERVICES (Lógica de Negocio)

**validationService.js**
```javascript
Funciones:
  • validateBabyName(name)         → Valida nombre no vacío
  • validateGenderSelection(gender) → Valida género es Rosa/Celeste
  • validateForm(name, gender)     → Valida todo + retorna errores
```
Uso: EventForm.jsx

**classesService.js**
```javascript
Funciones:
  • getBoxClasses(state, gender)  → Clases Bootstrap dinámicas
  • getThemeClasses(gender)       → Tema según género
  • getAlertClasses(gender)       → Variante alert
  • getEmotionBadge(mouseY, h)    → Badge con estado emocional
```
Uso: SurpriseBox.jsx, MouseSensor.jsx, App.jsx

**colorService.js**
```javascript
Funciones:
  • getGenderColor(gender)       → Color hexadecimal
  • getGenderBgStyle(gender)     → Gradiente completo
  • getTextColor(gender)         → Color texto
```
Uso: App.jsx (background), componentes varios

**confettiService.js**
```javascript
Funciones:
  • createConfetti(gender)       → Genera 50 partículas confeti
```
Uso: App.jsx (useEffect 3)

---

### 🔧 COMPONENTES PRINCIPALES

**App.jsx**
- ✅ Componente raíz que orquesta todo
- ✅ Gestión de estados principales
- ✅ 3 useEffect implementados
- ✅ Handlers para todos los eventos
- ✅ Renderiza WelcomePage o interfaz principal
- ✅ Integra todos los componentes

**App.css**
- Estilos globales de tema
- Clases para colores Rosa/Celeste
- Transiciones suaves
- Estilos responsive

**main.jsx**
- Punto de entrada de la aplicación
- Importa Bootstrap CSS
- Renderiza App en #root

**index.css**
- Estilos base del navegador
- Tipografía
- Reset CSS
- Scrollbar personalizado

---

## Eventos Mapeados

| Evento | Archivo | Línea | Handler |
|--------|---------|-------|---------|
| onChange | EventForm.jsx | ~25 | handleNameChange |
| onSubmit | EventForm.jsx | ~35 | handleSubmit |
| onClick | SurpriseBox.jsx | ~45 | onReveal |
| onMouseEnter | SurpriseBox.jsx | ~30 | onMouseEnter |
| onMouseLeave | SurpriseBox.jsx | ~31 | onMouseLeave |
| onMouseMove | MouseSensor.jsx | ~20 | handleMouseMove |
| - | SurpriseBox.jsx | - | getBoxClasses (estilos dinámicos) |

---

## useEffect Mapeados

| useEffect | Archivo | Línea | Propósito | Deps |
|-----------|---------|-------|-----------|------|
| 1 | App.jsx | ~30 | Inicialización | [] |
| 2 | App.jsx | ~40 | Sincronización visual | [isRevealed, genderSelected] |
| 3 | App.jsx | ~50 | Temporizado (confeti 3s) | [isRevealed, genderSelected] |

---

## Flujo de Datos

```
App.jsx (Estado Global)
├── showWelcome
├── babyName
├── genderSelected
├── boxState
├── isRevealed
├── showAlert
├── confetti
└── mouseCoords

WelcomePage (Solo lectura) → onClick: handleStartEvent
    ↓
EventForm → onChange: setName/setGender
         → onSubmit: handleFormSubmit
    ↓
SurpriseBox → onMouseEnter: setBoxState('hover')
           → onMouseLeave: setBoxState('neutral')
           → onClick: handleReveal
    ↓
MouseSensor → onMouseMove: updateCoords
    ↓
useEffect 2 → Sincroniza background (isRevealed)
    ↓
useEffect 3 → Crea confeti (3 segundos)
    ↓
ResetButton → onClick: handleReset → limpia todo
```

---

## Dependencias NPM

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "bootstrap": "^5.x",
    "react-bootstrap": "^2.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "vite": "^5.x"
  }
}
```

---

## Cómo Ejecutar

### Instalación
```bash
cd app-revelacion
npm install
```

### Desarrollo (con HMR)
```bash
npm run dev
# Abre http://localhost:5173
```

### Producción
```bash
npm run build
npm run preview  # (opcional) previsualizar compilado
```

---

## Notas Técnicas

✅ **Arquitectura Limpia**: Separación clara entre UI y Services
✅ **Reusabilidad**: Componentes independientes y reutilizables
✅ **Rendimiento**: useEffect optimizados con dependencias
✅ **Accesibilidad**: Semántica HTML, contraste adecuado
✅ **Responsivo**: Bootstrap grid system
✅ **Animaciones**: CSS keyframes suaves (60fps)
✅ **Mantenibilidad**: Código comentado y bien organizado

---

**Documentación: 18/01/2026 - Completa ✅**
