/**
 * Servicio de Clases Bootstrap
 * Calcula las clases según el estado y sexo seleccionado
 */

export const getBoxClasses = (state, gender) => {
  let classes = 'card p-5 text-center transition-all ';

  if (state === 'neutral') {
    classes += 'border-secondary';
  } else if (state === 'hover') {
    classes += 'border-warning shadow-lg';
  } else if (state === 'revealed') {
    if (gender === 'Rosa') {
      classes += 'bg-light-pink border-danger shadow-lg';
    } else if (gender === 'Celeste') {
      classes += 'bg-light-blue border-info shadow-lg';
    }
  }

  return classes;
};

export const getThemeClasses = (gender) => {
  if (gender === 'Rosa') {
    return 'bg-light-pink-theme';
  } else if (gender === 'Celeste') {
    return 'bg-light-blue-theme';
  }
  return 'bg-light';
};

export const getAlertClasses = (gender) => {
  if (gender === 'Rosa') {
    return 'alert-danger';
  } else if (gender === 'Celeste') {
    return 'alert-info';
  }
  return 'alert-secondary';
};

export const getEmotionBadge = (mouseY, containerHeight) => {
  const percentage = (mouseY / containerHeight) * 100;

  if (percentage < 33) {
    return { text: '🧘 Tranquilos', color: 'success' };
  } else if (percentage < 66) {
    return { text: '😰 Nervios', color: 'warning' };
  } else {
    return { text: '🎉 ¡YA CASI!', color: 'danger' };
  }
};
