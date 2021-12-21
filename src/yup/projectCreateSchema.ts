import * as yup from 'yup';

const ProjectCreateSchema = yup.object().shape({
  projectName: yup.string()
    .required("Company name is required")
    .max(56, 'Details must be at most 56 characters'),
  projectDetails: yup.string().optional().max(256, 'Details must be at most 256 characters'),
  projectCategory: yup.string().required('Category is required'),
  dueDate: yup.string().required('Please select date'),
  assignTo: yup.array().min(1, "Pick at least 1 person (use CTRL or SHIFT for multiple choice)"),
});

export default ProjectCreateSchema;