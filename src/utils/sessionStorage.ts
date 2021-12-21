import { SESSION_STORAGE_KEYS } from "../constants";

const dafaultValues = {
  formComplete: false,
  displayName: '',
  personalAddress: '',
  personaPhone: '',
  companyName: '',
  companyAddress: '',
  companyPhone: '',
};

export const setFormData = <T>(data: T) => {
  sessionStorage.setItem(SESSION_STORAGE_KEYS.STEPPER_FORM_DATA, JSON.stringify(data));
};

export const getFormData = () => {
  const rawFormData = sessionStorage.getItem(SESSION_STORAGE_KEYS.STEPPER_FORM_DATA);

  if (!rawFormData) {
    return dafaultValues;
  }

  return JSON.parse(rawFormData);
}

export const clearFormData = () => {
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.STEPPER_FORM_DATA);
}