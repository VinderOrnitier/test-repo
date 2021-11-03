import * as yup from 'yup';
import { REGEX } from '../constants';

export const StepperPersonalSchema = yup.object().shape({
  personalAddress: yup.string().required('Address is required').max(56),
  personaPhone: yup.string().required("Phone is required").matches(REGEX.PHONE_NUMBER, "Invalid phone number"),
});

export const StepperCompanySchema = yup.object().shape({
  companyName: yup.string()
    .required("Company name is required")
    .test('alphabets', 'Name must only contain alphabets', (value: any) => {
      return REGEX.NAME_FIELD.test(value);
    }),
  companyAddress: yup.string().required('Address is required').max(56),
  companyPhone: yup.string().required("Phone is required").matches(REGEX.PHONE_NUMBER, "Invalid phone number"),
});
