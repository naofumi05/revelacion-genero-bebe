/**
 * Servicio de Validaciones
 * Valida los datos del formulario
 */

export const validateBabyName = (name) => {
  return name && name.trim().length > 0;
};

export const validateGenderSelection = (gender) => {
  return gender === 'Rosa' || gender === 'Celeste';
};

export const validateForm = (name, gender) => {
  return {
    isValid: validateBabyName(name) && validateGenderSelection(gender),
    nameError: !validateBabyName(name),
    genderError: !validateGenderSelection(gender)
  };
};
