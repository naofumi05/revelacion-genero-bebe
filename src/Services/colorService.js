/**
 * Servicio de Colores
 * Genera códigos de color según el género
 */

export const getGenderColor = (gender) => {
  if (gender === 'Rosa') {
    return '#FFB6C1';
  } else if (gender === 'Celeste') {
    return '#87CEEB';
  }
  return '#f8f9fa';
};

export const getGenderBgStyle = (gender) => {
  if (gender === 'Rosa') {
    return { background: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)' };
  } else if (gender === 'Celeste') {
    return { background: 'linear-gradient(135deg, #87CEEB 0%, #ADD8E6 100%)' };
  }
  return { background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' };
};

export const getTextColor = (gender) => {
  if (gender === 'Rosa') {
    return '#c71585';
  } else if (gender === 'Celeste') {
    return '#00008b';
  }
  return '#000000';
};
