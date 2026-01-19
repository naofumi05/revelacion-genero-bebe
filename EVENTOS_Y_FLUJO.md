# 📚 Documentación Técnica - Eventos y Flujo

## Eventos Implementados (7 en total)

### 1. onChange - Input Nombre
**Componente:** `EventForm.jsx`
**Propósito:** Capturar cambios en el input del nombre del bebé
**Código:**
```javascript
const handleNameChange = (e) => {
  setName(e.target.value);
};

<Form.Control
  type="text"
  onChange={handleNameChange}
  value={name}
/>
```
**Efecto:** Actualiza el estado `name` en tiempo real

---

### 2. onSubmit - Formulario
**Componente:** `EventForm.jsx`
**Propósito:** Validar y enviar los datos del formulario
**Código:**
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  const validation = validateForm(name, gender);
  if (!validation.isValid) {
    setErrors(validation);
    return;
  }
  onSubmit({ name, gender });
};

<Form onSubmit={handleSubmit}>
```
**Efecto:** Valida datos y llama a callback `onSubmit` con datos validados

---

### 3. onClick - Botón Revelar
**Componente:** `SurpriseBox.jsx`
**Propósito:** Activar la revelación del género
**Código:**
```javascript
const handleReveal = () => {
  console.log('Evento: onClick - Revelación activada');
  setIsRevealed(true);
  setBoxState('revealed');
};

<Button onClick={onReveal}>🎊 Revelar Género 🎊</Button>
```
**Efecto:** Cambia `isRevealed` a true, dispara useEffect 3 (confeti)

---

### 4. onMouseEnter - Caja Sorpresa
**Componente:** `SurpriseBox.jsx`
**Propósito:** Cambiar el estado de la caja al pasar el mouse
**Código:**
```javascript
<Card
  onMouseEnter={onMouseEnter}
  className={`surprise-box ${getBoxClasses(state, gender)}`}
>
```
**Efecto:** Cambia `boxState` a 'hover', aplicando clase warning de Bootstrap

---

### 5. onMouseLeave - Caja Sorpresa
**Componente:** `SurpriseBox.jsx`
**Propósito:** Volver al estado neutral al salir del mouse
**Código:**
```javascript
<Card
  onMouseLeave={onMouseLeave}
  className={`surprise-box ${getBoxClasses(state, gender)}`}
>
```
**Efecto:** Cambia `boxState` a 'neutral', removiendo clases especiales

---

### 6. onMouseMove - Sensor de Emociones
**Componente:** `MouseSensor.jsx`
**Propósito:** Capturar la posición X/Y del mouse para el sensor
**Código:**
```javascript
const handleMouseMove = (e) => {
  if (containerRef.current) {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseX(Math.round(x));
    setMouseY(Math.round(y));
  }
};

<Card.Body onMouseMove={handleMouseMove} ref={containerRef}>
```
**Efecto:** Actualiza coordenadas en tiempo real y Badge de emoción

---

### 7. Estilos Dinámicos - Cambios en Tiempo Real
**Componentes:** `SurpriseBox.jsx`, `MouseSensor.jsx`
**Propósito:** Cambiar clases Bootstrap según el estado
**Ejemplos:**

#### SurpriseBox - Clases Dinámicas
```javascript
const getBoxClasses = (state, gender) => {
  let classes = 'card p-5 text-center transition-all ';
  
  if (state === 'neutral') {
    classes += 'border-secondary';
  } else if (state === 'hover') {
    classes += 'border-warning shadow-lg';  // ← Cambio en tiempo real
  } else if (state === 'revealed') {
    classes += gender === 'Rosa' 
      ? 'bg-light-pink border-danger shadow-lg'
      : 'bg-light-blue border-info shadow-lg';
  }
  return classes;
};
```

#### MouseSensor - Badge Dinámico
```javascript
const emotionData = getEmotionBadge(mouseY, containerHeight);

<Badge bg={emotionData.color}>{emotionData.text}</Badge>
```

---

## useEffect (3 con Propósitos Distintos)

### useEffect 1: Inicialización
**Ubicación:** `App.jsx`
**Dependencias:** `[]` (Solo se ejecuta al montar)
**Propósito:** Configurar estado inicial
```javascript
React.useEffect(() => {
  console.log('useEffect 1: Inicialización - cargando tema neutral');
  document.body.style.backgroundColor = '#f8f9fa';
  return () => {
    document.body.style.backgroundColor = '';
  };
}, []);
```
**Efecto:** 
- Al cargar: Fondo gris neutro
- Al desmontar: Limpia el fondo

---

### useEffect 2: Sincronización Visual
**Ubicación:** `App.jsx`
**Dependencias:** `[isRevealed, genderSelected]`
**Propósito:** Sincronizar el fondo con el género revelado
```javascript
React.useEffect(() => {
  console.log('useEffect 2: Sincronización visual');
  if (isRevealed && genderSelected) {
    const style = getGenderBgStyle(genderSelected);
    document.body.style.background = style.background;
    document.body.style.transition = 'background 1s ease-in-out';
  }
}, [isRevealed, genderSelected]);
```
**Efecto:**
- Se ejecuta cuando cambia el estado de revelación
- Aplica gradiente de color según género (Rosa/Celeste)

---

### useEffect 3: Temporizado
**Ubicación:** `App.jsx`
**Dependencias:** `[isRevealed, genderSelected]`
**Propósito:** Mostrar confeti por 3 segundos
```javascript
React.useEffect(() => {
  if (isRevealed && genderSelected) {
    console.log('useEffect 3: Temporizado - confeti por 3 segundos');
    const confettiElements = createConfetti(genderSelected);
    setConfetti(confettiElements);
    setShowAlert(true);

    const timer = setTimeout(() => {
      setConfetti([]);
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);  // Cleanup
  }
}, [isRevealed, genderSelected]);
```
**Efecto:**
- Genera 50 partículas de confeti
- Muestra alerta con resultado
- Limpia después de 3 segundos
- Limpia timeout si se desmonta antes

---

## Flujo de Interacción

```
1. Usuario ve WelcomePage
   └─> Click "Comenzar la Aventura" → handleStartEvent() → showWelcome = false

2. EventForm se muestra
   ├─> onChange → handleNameChange() → actualiza 'name'
   ├─> onChange → handleGenderChange() → actualiza 'gender'
   └─> onSubmit → handleFormSubmit() → valida → establece baby y gender

3. Cuando hay baby y gender:
   ├─> SurpriseBox aparece
   │   ├─> onMouseEnter → setBoxState('hover') → aplica border-warning
   │   ├─> onMouseLeave → setBoxState('neutral') → quita warning
   │   └─> onClick (Revelar) → setIsRevealed(true)
   │       └─> Dispara useEffect 2 → fondo cambio color
   │           └─> Dispara useEffect 3 → confeti 3 seg
   │
   ├─> MouseSensor aparece
   │   └─> onMouseMove → captura X/Y → actualiza Badge de emoción
   │
   └─> ResetButton aparece
       └─> onClick → handleReset() → limpia todo

4. useEffect 3 (después de 3 segundos)
   └─> setConfetti([]) → quita confeti
   └─> setShowAlert(false) → quita alerta
```

---

## Servicios (Capa de Lógica)

### validationService.js
```javascript
✓ validateBabyName(name) → Boolean
✓ validateGenderSelection(gender) → Boolean
✓ validateForm(name, gender) → { isValid, nameError, genderError }
```

### classesService.js
```javascript
✓ getBoxClasses(state, gender) → String (clases Bootstrap)
✓ getThemeClasses(gender) → String
✓ getAlertClasses(gender) → String
✓ getEmotionBadge(mouseY, containerHeight) → { text, color }
```

### colorService.js
```javascript
✓ getGenderColor(gender) → Hex Color
✓ getGenderBgStyle(gender) → { background: gradient }
✓ getTextColor(gender) → Hex Color
```

### confettiService.js
```javascript
✓ createConfetti(gender) → Array de objetos confeti con:
  - id, left, delay, duration, color, size
```

---

## Resumen de Estados

| Estado | Tipo | Propósito |
|--------|------|-----------|
| `showWelcome` | Boolean | Controla visibilidad de WelcomePage |
| `babyName` | String | Nombre del bebé |
| `genderSelected` | String | 'Rosa' \| 'Celeste' |
| `boxState` | String | 'neutral' \| 'hover' \| 'revealed' |
| `isRevealed` | Boolean | Si se ha revelado el género |
| `showAlert` | Boolean | Mostrar alerta de resultado |
| `confetti` | Array | Partículas de confeti |
| `mouseCoords` | Object | { x, y } coordenadas del mouse |

---

**Documentación completada: 18/01/2026**
