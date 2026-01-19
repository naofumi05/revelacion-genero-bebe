/**
 * Servicio de Confeti
 * Genera efecto de confeti animado
 */

export const createConfetti = (gender) => {
  const confettiElements = [];
  const colors = gender === 'Rosa' ? ['#FFB6C1', '#FFC0CB', '#FF69B4'] : ['#87CEEB', '#ADD8E6', '#00BFFF'];

  for (let i = 0; i < 50; i++) {
    confettiElements.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 5 + Math.random() * 15
    });
  }

  return confettiElements;
};
