import * as yup from 'yup';
import { REGEX } from '../constants';

const ProjectCreateSchema = yup.object().shape({
  projectName: yup.string()
    .required("Company name is required")
    .test('alphabets', 'Name must only contain alphabets', (value: any) => {
      return REGEX.NAME_FIELD.test(value);
    }),
  projectDetails: yup.string().optional().max(256, 'Details must be at most 256 characters'),
  projectCategory: yup.string().required('Category is required'),
  dueDate: yup.string().required('Please select date'),
  assignTo: yup.array().min(1, "Pick at least 1 person (use CTRL or SHIFT for multiple choice)"),
});

export default ProjectCreateSchema;