# 🎉 Aplicación de Revelación de Género del Bebé

Una aplicación interactiva y emocionante creada con **React** y **Bootstrap** para celebrar el momento especial de la revelación del género del bebé.

## 📋 Contenido del Proyecto

### Estructura de Carpetas

```
src/
├── UI/                          # Capa de Presentación (Componentes)
│   ├── components/              # Componentes React
│   │   ├── EventForm.jsx        # Formulario de configuración
│   │   ├── EventForm.css
│   │   ├── SurpriseBox.jsx      # Caja sorpresa interactiva
│   │   ├── SurpriseBox.css
│   │   ├── MouseSensor.jsx      # Sensor de emociones (mouse)
│   │   ├── MouseSensor.css
│   │   ├── Confetti.jsx         # Efecto de confeti
│   │   ├── Confetti.css
│   │   ├── ResetButton.jsx      # Botón reiniciar
│   │   └── ResetButton.css
│   └── pages/                   # Páginas principales
│       ├── WelcomePage.jsx      # Página de bienvenida
│       └── WelcomePage.css
├── Services/                    # Capa de Lógica de Negocio
│   ├── validationService.js     # Validaciones del formulario
│   ├── classesService.js        # Cálculo de clases Bootstrap
│   ├── colorService.js          # Manejo de colores por género
│   └── confettiService.js       # Generación de confeti
├── App.jsx                      # Componente principal
├── App.css
├── main.jsx
└── index.css
```

## 🎯 Características Principales

### ✅ Requisitos Implementados

#### 1. **Arquitectura en Capas** ✓
- **UI (Presentación)**: Componentes React en `src/UI/`
  - `components/`: Componentes reutilizables
  - `pages/`: Páginas principales
- **Services (Lógica)**: Utilidades en `src/Services/`
  - Validaciones
  - Cálculo de clases CSS
  - Manejo de colores
  - Generación de efectos

#### 2. **Bootstrap Implementado** ✓
- Layout responsivo con `Container`, `Row`, `Col`
- Componentes: `Card`, `Button`, `Alert`, `Form`, `Badge`
- Sistema de grid responsive
- Componentes React Bootstrap

#### 3. **6+ Eventos Diferentes** ✓

| Evento | Componente | Descripción |
|--------|-----------|-------------|
| `onChange` | EventForm | Cambio en input del nombre del bebé |
| `onSubmit` | EventForm | Envío del formulario |
| `onClick` | SurpriseBox/ResetButton | Click en botones (Revelar, Reiniciar) |
| `onMouseEnter` | SurpriseBox | Pasar mouse sobre caja sorpresa |
| `onMouseLeave` | SurpriseBox | Salir con mouse de caja sorpresa |
| `onMouseMove` | MouseSensor | Movimiento del mouse en sensor (Cambio en tiempo real: X/Y) |

#### 4. **useEffect (3+ con propósitos distintos)** ✓

```javascript
// useEffect 1: INICIALIZACIÓN
React.useEffect(() => {
  // Al cargar: setear estado inicial (tema neutral, mensaje por defecto)
  document.body.style.backgroundColor = '#f8f9fa';
}, []);

// useEffect 2: SINCRONIZACIÓN VISUAL
React.useEffect(() => {
  // Cuando cambia isRevealed o genderSelected:
  // Actualizar fondo según género (Rosa/Celeste)
  if (isRevealed && genderSelected) {
    const style = getGenderBgStyle(genderSelected);
    document.body.style.background = style.background;
  }
}, [isRevealed, genderSelected]);

// useEffect 3: TEMPORIZADO
React.useEffect(() => {
  // Al revelar: mostrar confeti y alerta por 3 segundos, luego ocultar
  if (isRevealed && genderSelected) {
    const confettiElements = createConfetti(genderSelected);
    setConfetti(confettiElements);
    const timer = setTimeout(() => {
      setConfetti([]);
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [isRevealed, genderSelected]);
```

## 🎨 Funcionalidades Detalladas

### A) Formulario "Evento"
- **Input**: Nombre del bebé (obligatorio)
- **Select**: Sexo seleccionado (Rosa/Celeste) - obligatorio
- **Botón**: Guardar configuración
- **Validaciones** (en `validationService.js`):
  - Nombre no vacío
  - Género seleccionado obligatorio
  - Mensajes de error dinámicos

### B) Zona "Caja Sorpresa"
- Inicialmente muestra: "Pasa el mouse y luego revela"
- **Comportamiento**:
  - `onMouseEnter`: Cambia a estilo "tensión" (border-warning, shadow-lg)
  - `onMouseLeave`: Vuelve a estilo neutral
  - `onClick` (Revelar):
    - Fondo cambia a Rosa o Celeste con gradiente
    - Muestra Alert con resultado
    - Genera confeti animado
    - Dura 3 segundos

### C) Panel "Movimiento del Mouse" (Sensor de Emociones)
- **Captura**: X/Y con `onMouseMove`
- **Visualización**: "X: ___ | Y: ___"
- **Badge de Emociones** (cambia según posición Y):
  - Y baja (0-33%) → "🧘 Tranquilos" (Verde)
  - Y media (33-66%) → "😰 Nervios" (Amarillo)
  - Y alta (66-100%) → "🎉 ¡YA CASI!" (Rojo)

### D) Botón Reiniciar
- Limpia el formulario
- Vuelve a tema neutral
- Oculta alertas/confeti
- Resetea X/Y

### E) Página de Bienvenida
- Mensaje llamativo con emojis animados
- Descripción de características
- Botón "Comenzar la Aventura" con transición suave

## 🎭 Animaciones y Micro-interacciones

### Página de Bienvenida
- ✨ Título con degradado animado (pulse)
- 🚀 Emojis flotantes con animación
- 🎯 Efectos hover en cards
- 📦 Botón con pulse continuo
- 🔄 Transición fade-out al comenzar

### Formulario
- 📋 Entrada suave desde arriba
- 🖱️ Efectos hover en inputs
- ⚠️ Animación en errores
- ✅ Botón con shadow dinámico

### Caja Sorpresa
- 🎁 Emoji rebota infinitamente
- 🖱️ Border warning al hover
- 💥 Escala y rotación al revelar
- ✨ Confeti cayendo (50 partículas)
- 🎊 Alert con animación de entrada

### Sensor de Emociones
- 📊 Coordenadas con efecto pulse
- 🎖️ Badge con transición suave
- 🎨 Colores que cambian según posición
- 🖱️ Efecto sutil de hover

### Botón Reiniciar
- 🔄 Efecto pulse al hover
- 📌 Transformación Y en click
- 💫 Sombra dinámica

## 🚀 Instalación y Uso

### Requisitos
- Node.js >= 16
- npm o yarn

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Compilar para Producción
```bash
npm run build
```

## 📦 Dependencias

- **React**: Framework UI
- **Bootstrap**: Framework CSS
- **React Bootstrap**: Componentes Bootstrap para React
- **Vite**: Build tool y dev server

## 📝 Eventos Implementados (Resumen)

1. ✅ **onChange** - Input nombre en formulario
2. ✅ **onSubmit** - Formulario de configuración
3. ✅ **onClick** - Botón Revelar y Reiniciar
4. ✅ **onMouseEnter** - Caja sorpresa
5. ✅ **onMouseLeave** - Caja sorpresa
6. ✅ **onMouseMove** - Sensor de emociones
7. ✅ **Estilos dinámicos** - Clases Bootstrap cambian en tiempo real

## 🎯 Objetivo Completado

✨ Una aplicación completa, interactiva y delightful para celebrar la revelación del género del bebé con:
- ✅ Arquitectura limpia y escalable
- ✅ Componentes reutilizables
- ✅ Múltiples interacciones
- ✅ Animaciones suaves y llamativas
- ✅ Responsiva en todos los dispositivos
- ✅ Validaciones robustas
- ✅ Experiencia de usuario excepcional

## 👨‍💻 Autor

Creado con ❤️ para celebrar momentos especiales.

---

**¡Que disfrutes tu momento de revelación! 🎉👶✨**
